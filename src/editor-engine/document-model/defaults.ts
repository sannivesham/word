import { DocumentEntity, DocumentStyles, PageSettings, DocumentContentNode } from '@/types/document';

export const CURRENT_DOCUMENT_SCHEMA_VERSION = 1;

export const DEFAULT_PAGE_SETTINGS: PageSettings = {
  paperSize: 'A4',
  orientation: 'portrait',
  margins: {
    top: 25.4,    // 1 inch in mm
    right: 25.4,
    bottom: 25.4,
    left: 25.4,
  },
  header: {
    margin: 12.7, // 0.5 inch in mm
    differentFirstPage: false,
    differentOddEven: false,
  },
  footer: {
    margin: 12.7,
    differentFirstPage: false,
    differentOddEven: false,
  },
  pageNumbering: {
    startNumber: 1,
    format: 'numeric',
    includePageCount: true,
  },
};

export const DEFAULT_DOCUMENT_STYLES: DocumentStyles = {
  normal: {
    fontFamily: 'Segoe UI, system-ui, sans-serif',
    fontSize: 11,
    lineHeight: 1.15,
    color: '#0F172A',
    spaceAfter: 6,
  },
  heading1: {
    fontFamily: 'Segoe UI, system-ui, sans-serif',
    fontSize: 18,
    lineHeight: 1.25,
    color: '#0E3A99',
    bold: true,
    spaceBefore: 12,
    spaceAfter: 6,
  },
  heading2: {
    fontFamily: 'Segoe UI, system-ui, sans-serif',
    fontSize: 14,
    lineHeight: 1.3,
    color: '#1A3DC7',
    bold: true,
    spaceBefore: 10,
    spaceAfter: 4,
  },
  heading3: {
    fontFamily: 'Segoe UI, system-ui, sans-serif',
    fontSize: 12,
    lineHeight: 1.3,
    color: '#2651E5',
    bold: true,
    spaceBefore: 8,
    spaceAfter: 4,
  },
  title: {
    fontFamily: 'Segoe UI, system-ui, sans-serif',
    fontSize: 24,
    lineHeight: 1.2,
    color: '#0A2566',
    bold: true,
    spaceAfter: 12,
  },
  subtitle: {
    fontFamily: 'Segoe UI, system-ui, sans-serif',
    fontSize: 14,
    lineHeight: 1.3,
    color: '#475569',
    italic: true,
    spaceAfter: 12,
  },
};

export const DEFAULT_INITIAL_CONTENT: DocumentContentNode = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
    },
  ],
};

/**
 * Factory creating a valid, typed DocumentEntity with resilient defaults.
 */
export function createDefaultDocument(overrides?: Partial<DocumentEntity>): DocumentEntity {
  const now = new Date().toISOString();
  return {
    id: overrides?.id || crypto.randomUUID(),
    title: overrides?.title || 'Untitled Document',
    schemaVersion: CURRENT_DOCUMENT_SCHEMA_VERSION,
    createdAt: overrides?.createdAt || now,
    updatedAt: overrides?.updatedAt || now,
    lastOpenedAt: overrides?.lastOpenedAt || now,
    folderId: overrides?.folderId ?? null,
    isFavorite: overrides?.isFavorite ?? false,
    isTrashed: overrides?.isTrashed ?? false,
    pageSettings: overrides?.pageSettings || { ...DEFAULT_PAGE_SETTINGS },
    styles: overrides?.styles || { ...DEFAULT_DOCUMENT_STYLES },
    content: overrides?.content || { ...DEFAULT_INITIAL_CONTENT },
    version: overrides?.version ?? 1,
  };
}
