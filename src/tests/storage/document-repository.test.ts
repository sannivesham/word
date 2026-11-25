import { describe, it, expect, beforeEach } from 'vitest';
import { documentRepository } from '@/storage/repositories/document-repository';
import { deleteEntireDatabase } from '@/storage/database/connection';
import { createDefaultDocument } from '@/editor-engine/document-model/defaults';

describe('DocumentRepository', () => {
  beforeEach(async () => {
    await deleteEntireDatabase();
  });

  it('creates and retrieves a document by ID', async () => {
    const doc = createDefaultDocument({ title: 'Quarterly Report' });
    const saved = await documentRepository.create(doc);
    expect(saved.id).toBe(doc.id);
    expect(saved.title).toBe('Quarterly Report');

    const retrieved = await documentRepository.getById(doc.id);
    expect(retrieved).not.toBeNull();
    expect(retrieved?.title).toBe('Quarterly Report');
    expect(retrieved?.pageSettings.paperSize).toBe('A4');
  });

  it('updates an existing document and updates updatedAt', async () => {
    const doc = createDefaultDocument({ title: 'Initial Draft' });
    await documentRepository.create(doc);

    doc.title = 'Final Draft';
    const updated = await documentRepository.update(doc);
    expect(updated.title).toBe('Final Draft');

    const retrieved = await documentRepository.getById(doc.id);
    expect(retrieved?.title).toBe('Final Draft');
  });

  it('handles soft delete and restore', async () => {
    const doc = createDefaultDocument({ title: 'Temporary File' });
    await documentRepository.create(doc);

    let all = await documentRepository.getAll();
    expect(all.length).toBe(1);

    await documentRepository.softDelete(doc.id);
    all = await documentRepository.getAll();
    expect(all.length).toBe(0);

    const trashed = await documentRepository.getTrashed();
    expect(trashed.length).toBe(1);
    expect(trashed[0]?.id).toBe(doc.id);

    await documentRepository.restore(doc.id);
    all = await documentRepository.getAll();
    expect(all.length).toBe(1);
  });

  it('permanently deletes a document', async () => {
    const doc = createDefaultDocument({ title: 'Ephemeral' });
    await documentRepository.create(doc);

    await documentRepository.permanentlyDelete(doc.id);
    const retrieved = await documentRepository.getById(doc.id);
    expect(retrieved).toBeNull();
  });

  it('searches documents by title substring', async () => {
    await documentRepository.create(createDefaultDocument({ title: 'Alpha Project' }));
    await documentRepository.create(createDefaultDocument({ title: 'Beta Research' }));
    await documentRepository.create(createDefaultDocument({ title: 'Gamma Project' }));

    const searchResults = await documentRepository.search('project');
    expect(searchResults.length).toBe(2);
  });
});
