import { describe, it, expect, beforeEach } from 'vitest';
import { usePreferencesStore } from '@/stores/preferences-store';
import { deleteEntireDatabase } from '@/storage/database/connection';

describe('PreferencesStore & Theme System', () => {
  beforeEach(async () => {
    await deleteEntireDatabase();
    await usePreferencesStore.getState().resetToDefaults();
  });

  it('updates theme and sets dark class on document root', async () => {
    const store = usePreferencesStore.getState();
    await store.setTheme('dark');

    expect(usePreferencesStore.getState().theme).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    await store.setTheme('light');
    expect(usePreferencesStore.getState().theme).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('updates editor view preferences', async () => {
    const store = usePreferencesStore.getState();
    await store.updateEditorPreferences({ showRuler: false, zoomLevel: 125 });

    const updated = usePreferencesStore.getState().editor;
    expect(updated.showRuler).toBe(false);
    expect(updated.zoomLevel).toBe(125);
  });
});
