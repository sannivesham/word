import { getDatabase } from '../database/connection';
import { UserPreferences } from '@/types/preferences';

export const DEFAULT_PREFERENCES: UserPreferences = {
  theme: 'system',
  editor: {
    showRuler: true,
    showLineNumbers: false,
    spellCheck: true,
    zoomLevel: 100,
    viewMode: 'paginated',
    autoSaveIntervalMs: 2000,
  },
  defaultPaperSize: 'A4',
  defaultFontFamily: 'Segoe UI',
  defaultFontSize: 11,
};

const PREFERENCES_KEY = 'user_preferences';

export class PreferencesRepository {
  async get(): Promise<UserPreferences> {
    try {
      const db = await getDatabase();
      const record = await db.get('preferences', PREFERENCES_KEY);
      if (!record || !record.value) {
        return DEFAULT_PREFERENCES;
      }
      return {
        ...DEFAULT_PREFERENCES,
        ...(record.value as Partial<UserPreferences>),
        editor: {
          ...DEFAULT_PREFERENCES.editor,
          ...((record.value as UserPreferences).editor || {}),
        },
      };
    } catch {
      // Fallback gracefully to default preferences if storage unavailable
      return DEFAULT_PREFERENCES;
    }
  }

  async set(prefs: Partial<UserPreferences>): Promise<UserPreferences> {
    const current = await this.get();
    const updated: UserPreferences = {
      ...current,
      ...prefs,
      editor: {
        ...current.editor,
        ...(prefs.editor || {}),
      },
    };

    const db = await getDatabase();
    await db.put('preferences', {
      key: PREFERENCES_KEY,
      value: updated,
      updatedAt: new Date().toISOString(),
    });

    return updated;
  }
}

export const preferencesRepository = new PreferencesRepository();
