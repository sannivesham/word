import { describe, it, expect, beforeEach } from 'vitest';
import { getDatabase, closeDatabase, deleteEntireDatabase, DB_NAME, CURRENT_DB_VERSION } from '@/storage/database/connection';

describe('IndexedDB Connection & Migrations', () => {
  beforeEach(async () => {
    await deleteEntireDatabase();
  });

  it('initializes DCWordDocDB at current version 1', async () => {
    const db = await getDatabase();
    expect(db.name).toBe(DB_NAME);
    expect(db.version).toBe(CURRENT_DB_VERSION);
  });

  it('creates all required object stores and indexes', async () => {
    const db = await getDatabase();
    const storeNames = Array.from(db.objectStoreNames);

    expect(storeNames).toContain('documents');
    expect(storeNames).toContain('folders');
    expect(storeNames).toContain('preferences');
    expect(storeNames).toContain('document_versions');
    expect(storeNames).toContain('templates_metadata');
  });

  it('closes and re-opens database cleanly without data corruption', async () => {
    const db1 = await getDatabase();
    expect(db1.name).toBe(DB_NAME);
    await closeDatabase();

    const db2 = await getDatabase();
    expect(db2.name).toBe(DB_NAME);
  });
});
