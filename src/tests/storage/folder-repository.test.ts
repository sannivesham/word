import { describe, it, expect, beforeEach } from 'vitest';
import { folderRepository } from '@/storage/repositories/folder-repository';
import { documentRepository } from '@/storage/repositories/document-repository';
import { deleteEntireDatabase } from '@/storage/database/connection';
import { createDefaultDocument } from '@/editor-engine/document-model/defaults';
import { FolderEntity } from '@/types/document';

describe('FolderRepository', () => {
  beforeEach(async () => {
    await deleteEntireDatabase();
  });

  it('creates, retrieves, and lists folders', async () => {
    const folder: FolderEntity = {
      id: crypto.randomUUID(),
      name: 'Financial Reports',
      parentId: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await folderRepository.create(folder);
    const retrieved = await folderRepository.getById(folder.id);
    expect(retrieved).not.toBeNull();
    expect(retrieved?.name).toBe('Financial Reports');

    const all = await folderRepository.getAll();
    expect(all.length).toBe(1);
  });

  it('unlinks documents when a folder is deleted', async () => {
    const folder: FolderEntity = {
      id: crypto.randomUUID(),
      name: 'Department Docs',
      parentId: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await folderRepository.create(folder);

    const doc = createDefaultDocument({ title: 'Report', folderId: folder.id });
    await documentRepository.create(doc);

    await folderRepository.delete(folder.id);

    const updatedDoc = await documentRepository.getById(doc.id);
    expect(updatedDoc?.folderId).toBeNull();
  });
});
