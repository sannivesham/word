import { DocumentEntity } from '@/types/document';
import { CURRENT_DOCUMENT_SCHEMA_VERSION, DEFAULT_PAGE_SETTINGS, DEFAULT_DOCUMENT_STYLES, DEFAULT_INITIAL_CONTENT } from './defaults';

/**
 * Validates and migrates raw JSON loaded from disk or IndexedDB to the current DocumentEntity schema.
 */
export function migrateDocument(raw: unknown): DocumentEntity {
  if (!raw || typeof raw !== 'object') {
    throw new Error('Invalid document data structure: expected an object.');
  }

  const doc = raw as Partial<DocumentEntity>;

  if (!doc.id) {
    throw new Error('Document is missing mandatory unique identifier (id).');
  }

  const now = new Date().toISOString();
  const schemaVersion = typeof doc.schemaVersion === 'number' ? doc.schemaVersion : 1;

  // Clone document data to avoid mutating caller references
  const migrated: DocumentEntity = {
    id: doc.id,
    title: doc.title?.trim() || 'Untitled Document',
    schemaVersion,
    createdAt: doc.createdAt || now,
    updatedAt: doc.updatedAt || now,
    lastOpenedAt: doc.lastOpenedAt || now,
    folderId: doc.folderId ?? null,
    isFavorite: Boolean(doc.isFavorite),
    isTrashed: Boolean(doc.isTrashed),
    pageSettings: doc.pageSettings ? { ...DEFAULT_PAGE_SETTINGS, ...doc.pageSettings } : { ...DEFAULT_PAGE_SETTINGS },
    styles: doc.styles ? { ...DEFAULT_DOCUMENT_STYLES, ...doc.styles } : { ...DEFAULT_DOCUMENT_STYLES },
    content: doc.content && doc.content.type === 'doc' ? doc.content : { ...DEFAULT_INITIAL_CONTENT },
    version: typeof doc.version === 'number' ? doc.version : 1,
  };

  // Step-by-step schema migrations pipeline for future stages
  if (schemaVersion < CURRENT_DOCUMENT_SCHEMA_VERSION) {
    // e.g. if (schemaVersion === 1) { migrated = migrateV1ToV2(migrated); schemaVersion = 2; }
    migrated.schemaVersion = CURRENT_DOCUMENT_SCHEMA_VERSION;
  }

  return migrated;
}
