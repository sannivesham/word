import { getDatabase } from '../database/connection';
import { FolderEntity } from '@/types/document';

export class FolderRepository {
  async create(folder: FolderEntity): Promise<FolderEntity> {
    const db = await getDatabase();
    await db.put('folders', folder);
    return folder;
  }

  async getById(id: string): Promise<FolderEntity | null> {
    const db = await getDatabase();
    const folder = await db.get('folders', id);
    return folder || null;
  }

  async getAll(): Promise<FolderEntity[]> {
    const db = await getDatabase();
    return db.getAll('folders');
  }

  async getByParent(parentId: string | null): Promise<FolderEntity[]> {
    if (!parentId) {
      const all = await this.getAll();
      return all.filter((f) => !f.parentId);
    }
    const db = await getDatabase();
    return db.getAllFromIndex('folders', 'by-parent', parentId);
  }

  async update(folder: FolderEntity): Promise<FolderEntity> {
    const db = await getDatabase();
    const updated: FolderEntity = {
      ...folder,
      updatedAt: new Date().toISOString(),
    };
    await db.put('folders', updated);
    return updated;
  }

  async delete(id: string): Promise<void> {
    const db = await getDatabase();
    const tx = db.transaction(['folders', 'documents'], 'readwrite');
    await tx.objectStore('folders').delete(id);

    // Unlink any documents residing in this deleted folder
    const docStore = tx.objectStore('documents');
    let cursor = await docStore.openCursor();
    while (cursor) {
      const doc = cursor.value;
      if (doc.folderId === id) {
        doc.folderId = null;
        await cursor.update(doc);
      }
      cursor = await cursor.continue();
    }
    await tx.done;
  }
}

export const folderRepository = new FolderRepository();
