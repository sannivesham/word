/**
 * DC Word Doc — IndexedDB Storage Schema Types
 * Organization: Damayanti Crest
 */

import { DBSchema } from 'idb';
import { DocumentEntity, FolderEntity, DocumentVersion, TemplateMetadata } from './document';

export interface PreferenceRecord {
  key: string;
  value: unknown;
  updatedAt: string;
}

export interface DCWordDocDBSchema extends DBSchema {
  documents: {
    key: string;
    value: DocumentEntity;
    indexes: {
      'by-folder': string;
      'by-updated': string;
      'by-favorite': number;
      'by-trashed': number;
    };
  };
  folders: {
    key: string;
    value: FolderEntity;
    indexes: {
      'by-parent': string;
      'by-updated': string;
    };
  };
  preferences: {
    key: string;
    value: PreferenceRecord;
  };
  document_versions: {
    key: string;
    value: DocumentVersion;
    indexes: {
      'by-document': string;
      'by-created': string;
    };
  };
  templates_metadata: {
    key: string;
    value: TemplateMetadata;
    indexes: {
      'by-category': string;
      'by-updated': string;
    };
  };
}
