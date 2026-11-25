# Architecture Decision Record: Rich Text Editor Engine & Pagination Strategy

**Document ID:** ADR-001  
**Project:** DC Word Doc  
**Organization:** Damayanti Crest  
**Status:** Approved  
**Author:** Senior Software Architect & Rich Text Editor Specialist  
**Date:** November 2026  

---

## 1. Executive Summary

DC Word Doc is a desktop-class, privacy-first word processor designed for paginated document editing (A4, Letter, custom margins, headers/footers, page numbers, tables, images, and DOCX interoperability). Unlike casual notes or wiki editors that treat documents as continuous vertical streams of text, a true word processor requires discrete pages, accurate print-fidelity geometry, and cross-page selection.

This document records the evaluation of candidate rich-text editor engines—**ProseMirror**, **TipTap**, **Lexical**, and other document engines—and defines our **final selection** and **pagination extension architecture**.

---

## 2. Evaluation Matrix

| Evaluation Criteria | ProseMirror | TipTap (v2/v3) | Lexical (Meta) | Quill / Slate |
| :--- | :--- | :--- | :--- | :--- |
| **Core License** | MIT (Permissive) | MIT (Core), Commercial (Cloud/Collab) | MIT (Permissive) | BSD / MIT |
| **Document Model** | Pure immutable state, JSON serializable, deterministic schema | Wrapper over ProseMirror with unified Extension API | Mutation-based reconciliation, node clones, AST | Delta / Linear AST (fragile table models) |
| **Page-Layout / Pagination Feasibility** | **High** (via Custom NodeViews, Decorations, or Fragment-based Virtual Layout) | **High** (inherits ProseMirror transaction pipeline & custom nodes) | **Medium** (DOM-dependent reconciliation makes synthetic page slicing complex) | **Low** (Deltas do not map well to complex nested page trees) |
| **Tables Support** | `prosemirror-tables` (Industry standard, cell selection, row/col spans) | Built on `prosemirror-tables` with friendly UI wrappers | Lexical Table plugin (basic cell models, complex merge behavior) | Basic or fragile |
| **Lists & Nesting** | Robust schema constraints, strict hierarchy | Built on ProseMirror schema | Good, but complex multi-level indentation edge cases | Prone to cursor glitches |
| **Selection Across Boundaries** | Continuous document positions (`from`, `to`), custom slice selection | Same as ProseMirror | RangeSelection across nodes | Range-based, often loses state |
| **DOCX Import / Export** | Proven ecosystem (`mammoth.js`, `docx`, `prosemirror-docx`) | Seamless compatibility with ProseMirror DOCX tools | Custom exporters required; smaller ecosystem | Minimal |
| **Performance** | Extreme performance (minimal virtual DOM overhead, precise DOM patches) | Excellent (built on ProseMirror) | Excellent (fast reconciliation) | Variable |
| **React Integration** | Low-level imperative view hooks or headless bindings | First-class React component NodeViews and hooks (`@tiptap/react`) | `@lexical/react` | Wrapper components |
| **Long-Term Maintainability** | Maintained by Marijn Haverbeke, used by Google, The New York Times, Atlassian | Actively developed, massive community, full ProseMirror escape hatch | Backed by Meta, rapid iteration, breaking changes historically | Slate has frequent API churn; Quill 2.0 delayed |

---

## 3. Deep Dive Analysis of Candidate Engines

### 3.1 Lexical (Meta)
- **Strengths:** Modern, lightweight, built for React 18/19, fast keystroke reconciliation.
- **Weaknesses:** Lexical's architecture is fundamentally node-based with an internal mutation listener cycle. Implementing true page pagination in Lexical requires intercepting layout passes and splitting paragraphs into multiple text nodes across page boundary nodes. Because Lexical strongly binds node identity to parent nodes in its tree, splitting blocks across artificial page boundaries introduces severe cursor jumping, undo/redo state fragmentation, and complex selection anomalies.
- **Verdict:** Excellent for social, chat, and markdown notes; poorly suited for print-fidelity word processing.

### 3.2 Pure ProseMirror
- **Strengths:** The undeniable gold standard for enterprise document modeling. Its strict position-based addressing (`doc.resolve(pos)`), immutable transformations (`Transform`, `Step`), schema validation, and decoration system (`DecorationSet`) make it mathematically rigorous.
- **Weaknesses:** Highly verbose boilerplate. Building standard UI hooks, command dispatchers, and React node views from scratch requires thousands of lines of foundational glue code.
- **Verdict:** The foundational engine of choice.

### 3.3 TipTap (v2/v3) on ProseMirror Core
- **Strengths:**
  - TipTap is **not an alternative** to ProseMirror; it is a developer-ergonomic, highly modular TypeScript abstraction built directly on top of ProseMirror.
  - Grants 100% unrestricted access to underlying ProseMirror primitives: `EditorState`, `EditorView`, `Transaction`, `Schema`, `Plugin`, `NodeView`, and `Step`.
  - Rich ecosystem of well-tested extensions: Document, Paragraph, Text, Heading, Bold, Italic, Underline, Strike, TextAlign, FontFamily, FontSize, Table, TableRow, TableCell, TableHeader, Image, History, and DropCursor.
  - Zero commercial dependencies for core offline/local functionality (MIT licensed).
  - Out-of-the-box React bindings (`useEditor`, `EditorContent`, `ReactNodeViewRenderer`).
- **Verdict:** Provides the perfect balance of architectural rigor (ProseMirror's immutable document engine) and developer velocity (TipTap's extension system and React bindings).

---

## 4. The Page-Layout & Pagination Problem

### 4.1 Why Most Web Rich Text Editors Fail at Pagination
Most web editors render content into a single `contenteditable` container (`<div contenteditable="true">`). In a continuous view, browser CSS handles layout automatically. However, in Microsoft Word or Google Docs:
1. A physical page has fixed dimensions (e.g., A4: `210mm x 297mm`, Letter: `8.5in x 11in`).
2. Margins define a printable body area (e.g., `1 inch` / `25.4mm` on all sides).
3. When text exceeds the printable height of Page 1, it must flow onto Page 2.
4. If a paragraph is split, the top lines remain on Page 1 and the remainder flows to Page 2 (handling widow/orphan rules).
5. Headers and footers repeat on each page or vary on the first page / odd-even pages.
6. The user must be able to select text starting in the middle of Page 1 and dragging across page margins into Page 2 seamlessly.

### 4.2 Three Pagination Architectures Analyzed

#### Architecture A: DOM-Slicing Multi-Editor Instances
- *Approach:* Break the document into separate ProseMirror editor instances per page.
- *Fatal Flaw:* Selection cannot cross native `contenteditable` boundaries. Keystrokes causing height changes require transferring blocks between instances, completely breaking undo/redo history and IME input (Chinese, Japanese, accents). Rejected.

#### Architecture B: Node-Level Page Containers in Document Model
- *Approach:* Change document schema so `doc` contains `page` nodes, and `page` contains paragraphs.
- *Fatal Flaw:* The document model should represent *semantic content*, not transient visual layout. A user changing margin size or font size would have to rewrite the entire document AST to redistribute paragraphs across page nodes. This corrupts collaborative editing and document serialization. Rejected.

#### Architecture C (Selected): Single Semantic Model + Virtual Paged Layout Projection
- *Approach:*
  1. The **Document Model** remains pure and semantic: `doc -> (paragraph | heading | table | blockquote | image)*`.
  2. The editor renders inside a unified continuous ProseMirror instance.
  3. A **Virtual Paged Layout Projection Pipeline** calculates visual page breaks:
     - Uses a headless CSS Paged layout worker or `ResizeObserver` DOM measurement pass.
     - Projects page chrome (paper canvas, page margins, drop shadows, page break dividers, headers, and footers) visually around the content.
     - Inserts ProseMirror `Decoration.widget` for visual page gaps and page break breaks without mutating the semantic document model.
     - For print and PDF export, standard CSS `@page` and `@media print` rules ensure exact 1:1 pagination matching the screen layout.

---

## 5. Final Selection & Architectural Decision

### Decision:
1. **Editor Core Engine:** **TipTap (ProseMirror)**.
2. **Document Data Format:** Structured JSON conforming to the ProseMirror Document Schema.
3. **Pagination Model:** **Hybrid Virtual Layout Projection** (Single semantic document state + ProseMirror Widget Decorations + CSS Paged geometry tokens).
4. **License Impact:** 100% Free and Open Source (MIT). No proprietary or paid extensions required.

---

## 6. Implementation Roadmap for Future Stages
- **Stage 1 (Current):** Foundational architecture, document schemas, stores, storage, and interfaces.
- **Stage 2:** Core TipTap/ProseMirror initialization, basic schema, and toolbar foundation.
- **Stage 3:** Page geometry tokens, paper dimensions (A4/Letter), margins, and zoom engine.
- **Stage 4:** Virtual pagination projection extension and visual page break decorations.
- **Stage 5-15:** Advanced formatting, tables spanning pages, images, headers/footers, and DOCX/PDF export.
