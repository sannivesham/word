import { describe, it, expect, beforeEach } from 'vitest';
import { preferencesRepository, DEFAULT_PREFERENCES } from '@/storage/repositories/preferences-repository';
import { deleteEntireDatabase } from '@/storage/database/connection';

describe('PreferencesRepository', () => {
  beforeEach(async () => {
    await deleteEntireDatabase();
  });

  it('returns default preferences on initial load', async () => {
    const prefs = await preferencesRepository.get();
    expect(prefs.theme).toBe(DEFAULT_PREFERENCES.theme);
    expect(prefs.defaultPaperSize).toBe('A4');
    expect(prefs.editor.showRuler).toBe(true);
  });

  it('persists and updates partial preferences correctly', async () => {
    await preferencesRepository.set({
      theme: 'dark',
      defaultPaperSize: 'Letter',
      editor: {
        ...DEFAULT_PREFERENCES.editor,
        showRuler: false,
      },
    });

    const updated = await preferencesRepository.get();
    expect(updated.theme).toBe('dark');
    expect(updated.defaultPaperSize).toBe('Letter');
    expect(updated.editor.showRuler).toBe(false);
    expect(updated.editor.spellCheck).toBe(true); // Preserves existing values
  });
});
