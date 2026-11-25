# DC Word Doc — Document Data Model Specification

**Specification Version:** 1.0.0  
**Project:** DC Word Doc  
**Organization:** Damayanti Crest  
**Status:** Approved Architecture  

---

## 1. Overview & Principles

In accordance with professional word processor design (such as OpenXML / DOCX standards and modern desktop-class applications), **DC Word Doc** strictly separates:
1. **Document Metadata & Hierarchy** (ID, Title, Timestamps, Folder, Versions, Favorites).
2. **Page & Section Layout Geometry** (Paper size, Margins, Orientation, Headers/Footers, Page numbers).
3. **Semantic Document Content** (Structured JSON conforming to immutable ProseMirror schema).
4. **Styles & Theme Definition** (Typography hierarchy, paragraph styles, color palettes).

### Core Principles
- **No Plain HTML as Source of Truth:** HTML loses exact word processor semantics (margins, page breaks, cell dimensions, custom metadata). Documents are stored as typed JSON ASTs.
- **Strict Schema Versioning:** Every document entity declares a `schemaVersion` (currently `1`).
- **Migration Pipeline:** A forward-compatible migration pipeline ensures documents created in Stage 1 remain loadable without data loss across future stages (Stage 1 through Stage 15).

---

## 2. Document Entity Schema

```typescript
export interface DocumentEntity {
  /** Unique document UUID v4 */
  id: string;
  
  /** Human-readable document title */
  title: string;
  
  /** Schema version for database migration tracking */
  schemaVersion: number;
  
  /** Document creation timestamp (ISO 8601) */
  createdAt: string;
  
  /** Document last modification timestamp (ISO 8601) */
  updatedAt: string;
  
  /** Document last opened timestamp (ISO 8601) */
  lastOpenedAt: string;
  
  /** Associated folder UUID, or null for root directory */
  folderId: string | null;
  
  /** Favorite / Starred flag for quick access */
  isFavorite: boolean;
  
  /** Soft delete / Trash flag */
  isTrashed: boolean;
  
  /** Page geometry and section layout configuration */
  pageSettings: PageSettings;
  
  /** Styles hierarchy and typography tokens */
  styles: DocumentStyles;
  
  /** Structured document content AST (ProseMirror JSON) */
  content: DocumentContentNode;
  
  /** Document revision / version metadata */
  version: number;
}
```

---

## 3. Page & Section Geometry Schema

```typescript
export type PaperSize = 'A4' | 'Letter' | 'Legal' | 'A3' | 'A5' | 'Custom';
export type PageOrientation = 'portrait' | 'landscape';

export interface PageMargins {
  top: number;    // In millimeters (standard default: 25.4mm = 1 inch)
  right: number;  // In millimeters
  bottom: number; // In millimeters
  left: number;   // In millimeters
}

export interface HeaderFooterConfig {
  headerMargin: number;      // Distance from page top in mm
  footerMargin: number;      // Distance from page bottom in mm
  differentFirstPage: boolean;
  differentOddEven: boolean;
  content?: DocumentContentNode;
}

export interface PageSettings {
  paperSize: PaperSize;
  orientation: PageOrientation;
  customWidth?: number;      // mm (if paperSize === 'Custom')
  customHeight?: number;     // mm (if paperSize === 'Custom')
  margins: PageMargins;
  header: HeaderFooterConfig;
  footer: HeaderFooterConfig;
  pageNumbering: {
    startNumber: number;
    format: 'numeric' | 'roman-lower' | 'roman-upper' | 'alpha-lower' | 'alpha-upper';
    includePageCount: boolean;
  };
}
```

---

## 4. Document Content Node (AST)

Content nodes strictly mirror the ProseMirror/TipTap JSON specification:

```typescript
export interface DocumentContentNode {
  type: string;
  attrs?: Record<string, unknown>;
  content?: DocumentContentNode[];
  marks?: DocumentMark[];
  text?: string;
}

export interface DocumentMark {
  type: 'bold' | 'italic' | 'underline' | 'strike' | 'subscript' | 'superscript' | 'highlight' | 'link' | 'textColor' | 'fontFamily' | string;
  attrs?: Record<string, unknown>;
}
```

---

## 5. Schema Evolution & Migration Strategy

All documents are processed through the `migrateDocument(doc: DocumentEntity): DocumentEntity` function during repository retrieval:

1. **Schema Check:** Inspect `doc.schemaVersion`.
2. **Sequential Upgrades:** If `doc.schemaVersion < CURRENT_SCHEMA_VERSION`, execute sequential transformers (`migrate_v1_to_v2`, etc.).
3. **Data Loss Prevention:** Field additions always have fallback defaults. Deprecated fields are moved to an archive metadata bag rather than discarded immediately.
