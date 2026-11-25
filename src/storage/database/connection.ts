import { openDB, IDBPDatabase } from 'idb';
import { DCWordDocDBSchema } from '@/types/storage';
import { migrations } from '../migrations';

export const DB_NAME = 'DCWordDocDB';
export const CURRENT_DB_VERSION = 1;

let dbInstance: IDBPDatabase<DCWordDocDBSchema> | null = null;

/**
 * Retrieves or establishes the singleton connection to DCWordDocDB.
 */
export async function getDatabase(): Promise<IDBPDatabase<DCWordDocDBSchema>> {
  if (dbInstance) {
    return dbInstance;
  }

  dbInstance = await openDB<DCWordDocDBSchema>(DB_NAME, CURRENT_DB_VERSION, {
    upgrade(db, oldVersion, _newVersion, _transaction) {
      for (const migration of migrations) {
        if (oldVersion < migration.version) {
          migration.run(db);
        }
      }
    },
    blocked() {
      console.warn('[DC Word Doc DB] Database upgrade blocked by open tabs.');
    },
    blocking() {
      if (dbInstance) {
        dbInstance.close();
        dbInstance = null;
      }
    },
    terminated() {
      dbInstance = null;
    },
  });

  return dbInstance;
}

/**
 * Closes the active database connection (useful during testing or reset).
 */
export async function closeDatabase(): Promise<void> {
  if (dbInstance) {
    dbInstance.close();
    dbInstance = null;
  }
}

/**
 * Deletes the entire IndexedDB database (caution: removes all local user documents).
 */
export async function deleteEntireDatabase(): Promise<void> {
  await closeDatabase();
  return new Promise((resolve, reject) => {
    const request = indexedDB.deleteDatabase(DB_NAME);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
    request.onblocked = () => {
      console.warn('[DC Word Doc DB] Delete database blocked.');
      resolve();
    };
  });
}
