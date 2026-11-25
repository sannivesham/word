import { getDatabase } from '../database/connection';
import { DocumentVersion, DocumentEntity } from '@/types/document';

export class VersionRepository {
  /**
   * Captures a snapshot of the document at a specific point in time.
   */
  async createSnapshot(doc: DocumentEntity, comment?: string): Promise<DocumentVersion> {
    const db = await getDatabase();
    const existingVersions = await this.getByDocumentId(doc.id);
    const versionNumber = existingVersions.length + 1;

    const version: DocumentVersion = {
      id: crypto.randomUUID(),
      documentId: doc.id,
      title: doc.title,
      createdAt: new Date().toISOString(),
      contentSnapshot: JSON.parse(JSON.stringify(doc.content)),
      versionNumber,
      comment,
    };

    await db.put('document_versions', version);
    return version;
  }

  /**
   * Retrieves all revision snapshots for a document, ordered newest first.
   */
  async getByDocumentId(documentId: string): Promise<DocumentVersion[]> {
    const db = await getDatabase();
    const versions = await db.getAllFromIndex('document_versions', 'by-document', documentId);
    return versions.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  /**
   * Deletes a specific revision version.
   */
  async deleteVersion(id: string): Promise<void> {
    const db = await getDatabase();
    await db.delete('document_versions', id);
  }
}

export const versionRepository = new VersionRepository();
