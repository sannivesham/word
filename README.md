# DC Word Doc

> **Desktop-class, privacy-first word processor web application.**  
> Built by **Damayanti Crest**  
> **Current Stage:** Stage 1 of 15 (Foundation & Architecture)

---

## 1. Overview

**DC Word Doc** is a modern word processing web application designed to bring the power and precision of desktop document editors (such as Microsoft Word) into the browser, while strictly honoring user privacy and data ownership.

In **Stage 1 (Foundation & Architecture)**, we establish a rock-solid, future-proof architectural foundation designed to support all 15 planned engineering stages without requiring structural rewrites.

---

## 2. Key Architectural Foundations Established in Stage 1

- **Privacy-First & Zero-Cloud Guarantee:** No mandatory accounts, zero document telemetry, and 100% offline document persistence using local **IndexedDB** (`DCWordDocDB`).
- **Rich Text Editor Evaluation:** Extensive analysis of TipTap, ProseMirror, Lexical, and Slate. **TipTap on ProseMirror Core** has been selected for its immutable state model, mathematical position mapping, strict schema constraints, and extensible plugin pipeline.
- **Virtual Paged Layout Projection Strategy:** To support true discrete pages (A4, Letter, margins, page breaks, headers/footers) without mutating semantic document content, a hybrid virtual layout projection architecture is defined in `docs/EDITOR_ENGINE_DECISION.md`.
- **Immutable Document Model:** Stored as structured ProseMirror JSON AST with strict `schemaVersion: 1` tracking and forward-compatible migration pipeline.
- **Design Tokens & System:** Tailored Damayanti Crest design system with Navy/Blue brand colors, light/dark themes, CSS variables, and Lucide icons.
- **PWA Ready:** Configured with `vite-plugin-pwa` and Workbox for instant offline shell loading.

---

## 3. Technology Stack

- **Core Framework:** React 19, TypeScript (Strict Mode), Vite 6, React Router 7
- **State Management:** Zustand 5
- **Styling:** Tailwind CSS 3, CSS Variables Design Tokens
- **Local Storage:** IndexedDB with `idb` 8
- **PWA:** Vite PWA Plugin, Workbox
- **Testing:** Vitest 3, React Testing Library 16, Playwright, Fake IndexedDB
- **Code Quality:** ESLint 9 (Flat Config), Prettier, TypeScript strict checks

---

## 4. Project Structure

```text
dc-word-doc/
├── docs/                     # Architectural decision records & specifications
│   ├── ARCHITECTURE.md       # Full system architecture & data flow
│   ├── EDITOR_ENGINE_DECISION.md # Evaluation matrix & pagination strategy
│   ├── DOCUMENT_MODEL.md     # Document entity schemas & AST definition
│   └── LOCAL_STORAGE.md      # IndexedDB topology, stores & migrations
│
├── src/
│   ├── app/                  # App bootstrap, router, providers, shell layout
│   ├── components/           # Reusable UI primitives (Button, Modal, Toast, etc.)
│   ├── editor-engine/        # Document model defaults, migration pipeline
│   ├── features/             # Feature domain placeholders (Dashboard, Docs, Editor, etc.)
│   ├── storage/              # IndexedDB connection, migrations, repositories
│   ├── stores/               # Zustand state stores (app, document, editor, preferences)
│   ├── styles/               # CSS variables, tokens, Tailwind integration
│   ├── types/                # TypeScript domain models & database schemas
│   └── tests/                # Unit, repository, store, and component tests
```

---

## 5. Development & Testing Commands

```bash
# Install dependencies
npm install

# Start local development server (http://localhost:3000)
npm run dev

# Run TypeScript strict type verification
npm run typecheck

# Run ESLint code quality checks
npm run lint

# Run automated Vitest test suite
npm run test

# Build production bundle with PWA assets
npm run build

# Preview production build locally
npm run preview
```

---

## 6. What Is Strictly Out of Scope for Stage 1

As specified in the Stage 1 roadmap:
- Real continuous typing canvas, ribbon toolbars, text formatting, live page slicing, tables, images, DOCX import/export, and PDF export will be introduced progressively across Stages 2 through 15.

---

## 7. License

Copyright © 2026 Damayanti Crest. All rights reserved.
