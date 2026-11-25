/**
 * DC Word Doc — Document Domain Types
 * Organization: Damayanti Crest
 */

export type PaperSize = 'A4' | 'Letter' | 'Legal' | 'A3' | 'A5' | 'Custom';
export type PageOrientation = 'portrait' | 'landscape';

export interface PageMargins {
  top: number;    // Millimeters (default: 25.4mm = 1 inch)
  right: number;  // Millimeters
  bottom: number; // Millimeters
  left: number;   // Millimeters
}

export interface HeaderFooterConfig {
  margin: number;             // Distance from page edge in mm
  differentFirstPage: boolean;
  differentOddEven: boolean;
  content?: DocumentContentNode;
}

export interface PageNumberingConfig {
  startNumber: number;
  format: 'numeric' | 'roman-lower' | 'roman-upper' | 'alpha-lower' | 'alpha-upper';
  includePageCount: boolean;
}

export interface PageSettings {
  paperSize: PaperSize;
  orientation: PageOrientation;
  customWidth?: number;       // In mm, only when paperSize === 'Custom'
  customHeight?: number;      // In mm, only when paperSize === 'Custom'
  margins: PageMargins;
  header: HeaderFooterConfig;
  footer: HeaderFooterConfig;
  pageNumbering: PageNumberingConfig;
}

export interface DocumentMark {
  type: string;
  attrs?: Record<string, unknown>;
}

export interface DocumentContentNode {
  type: string;
  attrs?: Record<string, unknown>;
  content?: DocumentContentNode[];
  marks?: DocumentMark[];
  text?: string;
}

export interface StyleDefinition {
  fontFamily: string;
  fontSize: number;       // Points (pt)
  lineHeight: number;     // Multiplier (e.g., 1.15)
  color: string;
  bold?: boolean;
  italic?: boolean;
  spaceBefore?: number;   // Points
  spaceAfter?: number;    // Points
}

export interface DocumentStyles {
  normal: StyleDefinition;
  heading1: StyleDefinition;
  heading2: StyleDefinition;
  heading3: StyleDefinition;
  title: StyleDefinition;
  subtitle: StyleDefinition;
}

export interface DocumentEntity {
  id: string;
  title: string;
  schemaVersion: number;
  createdAt: string;
  updatedAt: string;
  lastOpenedAt: string;
  folderId: string | null;
  isFavorite: boolean;
  isTrashed: boolean;
  pageSettings: PageSettings;
  styles: DocumentStyles;
  content: DocumentContentNode;
  version: number;
}

export interface FolderEntity {
  id: string;
  name: string;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
  color?: string;
}

export interface DocumentVersion {
  id: string;
  documentId: string;
  title: string;
  createdAt: string;
  contentSnapshot: DocumentContentNode;
  versionNumber: number;
  comment?: string;
}

export interface TemplateMetadata {
  id: string;
  name: string;
  description: string;
  category: 'resume' | 'report' | 'letter' | 'essay' | 'blank' | 'custom';
  thumbnailUrl?: string;
  defaultSettings: PageSettings;
  initialContent: DocumentContentNode;
  createdAt: string;
  updatedAt: string;
}
