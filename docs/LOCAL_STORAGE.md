# DC Word Doc — Local Storage & IndexedDB Architecture

**Specification Version:** 1.0.0  
**Project:** DC Word Doc  
**Organization:** Damayanti Crest  
**Status:** Approved Architecture  

---

## 1. Storage Philosophy & Privacy Guarantee

DC Word Doc adheres to a strict **privacy-first, offline-first** principle:
- **Zero Cloud Dependencies:** All user documents, metadata, settings, and versions are stored locally on the user's device in IndexedDB.
- **No Data Telemetry:** Document content is never transmitted across the network.
- **Service Worker Isolation:** The PWA Service Worker caches only static application shell assets (`.js`, `.css`, `.html`, icons). User document contents are **never** stored in the HTTP Cache API.

---

## 2. Database Topology

- **Database Name:** `DCWordDocDB`
- **Driver / Library:** `idb` (Modern, Promise-based TypeScript wrapper for standard IndexedDB API)
- **Current DB Version:** `1`

### Object Stores & Indexes

| Object Store | Key Path | Indexes | Purpose |
| :--- | :--- | :--- | :--- |
| `documents` | `id` (string) | `folderId`, `updatedAt`, `isFavorite`, `isTrashed` | Primary document entities with full content AST and page layout |
| `folders` | `id` (string) | `parentId`, `updatedAt` | Directory hierarchy for organizing documents |
| `preferences` | `key` (string) | *(None)* | Key-value store for user settings, theme, editor defaults |
| `document_versions` | `id` (string) | `documentId`, `createdAt` | Snapshot history for revision control and undo protection |
| `templates_metadata` | `id` (string) | `category`, `updatedAt` | Metadata and schemas for reusable document templates |

---

## 3. Versioned Migrations Pipeline

The database initialization uses an extensible migration runner:

```typescript
export interface Migration {
  version: number;
  upgrade: (db: IDBPDatabase<DCWordDocDBSchema>, transaction: IDBPTransaction<any, any, 'versionchange'>) => void;
}
```

When upgrading database versions (e.g., from v1 to v2 in subsequent stages), migrations execute sequentially inside a single atomic `versionchange` transaction, guaranteeing zero schema inconsistency.

---

## 4. Repository Abstraction Layer

Components and stores never interface with raw `idb` or `indexedDB` directly. They use strongly-typed repository classes:

1. `DocumentRepository`: CRUD, listing with filters (`folderId`, `favorite`, `trashed`), pagination, search.
2. `FolderRepository`: Hierarchy traversal, folder tree generation, cascade soft-delete.
3. `PreferencesRepository`: Fast retrieval of UI preferences, theme persistence.
4. `VersionRepository`: Snapshot capture, version restoration, purge older snapshots.

### Storage Error Handling & Resilience
- **Quota Exceeded:** Catches `QuotaExceededError` and surfaces friendly non-destructive warning to the user.
- **Transactions:** Write operations use atomic `readwrite` transactions across affected stores.
- **Test Isolation:** Unit and integration tests run against `fake-indexeddb` to guarantee pure isolation without pollution.
