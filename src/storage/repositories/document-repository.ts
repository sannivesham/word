import { getDatabase } from '../database/connection';
import { DocumentEntity } from '@/types/document';
import { migrateDocument } from '@/editor-engine/document-model/migration';

export class DocumentRepository {
  /**
   * Persists a new document entity.
   */
  async create(doc: DocumentEntity): Promise<DocumentEntity> {
    const db = await getDatabase();
    const migrated = migrateDocument(doc);
    await db.put('documents', migrated);
    return migrated;
  }

  /**
   * Retrieves a document by its unique identifier.
   */
  async getById(id: string): Promise<DocumentEntity | null> {
    const db = await getDatabase();
    const raw = await db.get('documents', id);
    if (!raw) return null;
    return migrateDocument(raw);
  }

  /**
   * Updates an existing document entity.
   */
  async update(doc: DocumentEntity): Promise<DocumentEntity> {
    const db = await getDatabase();
    const updatedDoc: DocumentEntity = {
      ...doc,
      updatedAt: new Date().toISOString(),
    };
    const migrated = migrateDocument(updatedDoc);
    await db.put('documents', migrated);
    return migrated;
  }

  /**
   * Retrieves all non-trashed documents, sorted descending by last update.
   */
  async getAll(): Promise<DocumentEntity[]> {
    const db = await getDatabase();
    const all = await db.getAll('documents');
    return all
      .filter((d) => !d.isTrashed)
      .map(migrateDocument)
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }

  /**
   * Retrieves non-trashed documents belonging to a specific folder.
   */
  async getByFolder(folderId: string | null): Promise<DocumentEntity[]> {
    if (!folderId) {
      const all = await this.getAll();
      return all.filter((d) => !d.folderId);
    }
    const db = await getDatabase();
    const all = await db.getAllFromIndex('documents', 'by-folder', folderId);
    return all
      .filter((d) => !d.isTrashed)
      .map(migrateDocument)
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }

  /**
   * Retrieves favorite/starred documents.
   */
  async getFavorites(): Promise<DocumentEntity[]> {
    const db = await getDatabase();
    const all = await db.getAll('documents');
    return all
      .filter((d) => d.isFavorite && !d.isTrashed)
      .map(migrateDocument)
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }

  /**
   * Retrieves trashed documents.
   */
  async getTrashed(): Promise<DocumentEntity[]> {
    const db = await getDatabase();
    const all = await db.getAll('documents');
    return all
      .filter((d) => d.isTrashed)
      .map(migrateDocument)
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }

  /**
   * Performs client-side substring search on document titles.
   */
  async search(query: string): Promise<DocumentEntity[]> {
    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) return this.getAll();
    const all = await this.getAll();
    return all.filter((doc) => doc.title.toLowerCase().includes(cleanQuery));
  }

  /**
   * Soft-deletes a document (moves to trash).
   */
  async softDelete(id: string): Promise<void> {
    const doc = await this.getById(id);
    if (!doc) return;
    doc.isTrashed = true;
    doc.updatedAt = new Date().toISOString();
    await this.update(doc);
  }

  /**
   * Restores a document from trash.
   */
  async restore(id: string): Promise<void> {
    const doc = await this.getById(id);
    if (!doc) return;
    doc.isTrashed = false;
    doc.updatedAt = new Date().toISOString();
    await this.update(doc);
  }

  /**
   * Permanently deletes a document from IndexedDB.
   */
  async permanentlyDelete(id: string): Promise<void> {
    const db = await getDatabase();
    const tx = db.transaction(['documents', 'document_versions'], 'readwrite');
    await tx.objectStore('documents').delete(id);
    // Remove associated versions
    const versionIndex = tx.objectStore('document_versions').index('by-document');
    let cursor = await versionIndex.openCursor(id);
    while (cursor) {
      await cursor.delete();
      cursor = await cursor.continue();
    }
    await tx.done;
  }

  /**
   * Updates the last opened timestamp when a user opens a document.
   */
  async updateLastOpened(id: string): Promise<void> {
    const doc = await this.getById(id);
    if (!doc) return;
    doc.lastOpenedAt = new Date().toISOString();
    const db = await getDatabase();
    await db.put('documents', doc);
  }
}

export const documentRepository = new DocumentRepository();
