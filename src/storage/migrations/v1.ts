import { IDBPDatabase } from 'idb';
import { DCWordDocDBSchema } from '@/types/storage';

export function migrateV1(db: IDBPDatabase<DCWordDocDBSchema>): void {
  // 1. Documents Store
  if (!db.objectStoreNames.contains('documents')) {
    const docStore = db.createObjectStore('documents', { keyPath: 'id' });
    docStore.createIndex('by-folder', 'folderId');
    docStore.createIndex('by-updated', 'updatedAt');
    docStore.createIndex('by-favorite', 'isFavorite');
    docStore.createIndex('by-trashed', 'isTrashed');
  }

  // 2. Folders Store
  if (!db.objectStoreNames.contains('folders')) {
    const folderStore = db.createObjectStore('folders', { keyPath: 'id' });
    folderStore.createIndex('by-parent', 'parentId');
    folderStore.createIndex('by-updated', 'updatedAt');
  }

  // 3. Preferences Store
  if (!db.objectStoreNames.contains('preferences')) {
    db.createObjectStore('preferences', { keyPath: 'key' });
  }

  // 4. Document Versions Store
  if (!db.objectStoreNames.contains('document_versions')) {
    const versionStore = db.createObjectStore('document_versions', { keyPath: 'id' });
    versionStore.createIndex('by-document', 'documentId');
    versionStore.createIndex('by-created', 'createdAt');
  }

  // 5. Templates Metadata Store
  if (!db.objectStoreNames.contains('templates_metadata')) {
    const templateStore = db.createObjectStore('templates_metadata', { keyPath: 'id' });
    templateStore.createIndex('by-category', 'category');
    templateStore.createIndex('by-updated', 'updatedAt');
  }
}
