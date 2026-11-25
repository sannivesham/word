import { create } from 'zustand';
import { ThemeMode, EditorViewPreferences } from '@/types/preferences';
import { preferencesRepository, DEFAULT_PREFERENCES } from '@/storage/repositories/preferences-repository';

interface PreferencesState {
  theme: ThemeMode;
  editor: EditorViewPreferences;
  defaultPaperSize: 'A4' | 'Letter';
  defaultFontFamily: string;
  defaultFontSize: number;
  isLoaded: boolean;

  // Actions
  loadPreferences: () => Promise<void>;
  setTheme: (theme: ThemeMode) => Promise<void>;
  updateEditorPreferences: (prefs: Partial<EditorViewPreferences>) => Promise<void>;
  resetToDefaults: () => Promise<void>;
}

function applyThemeToDOM(theme: ThemeMode) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  const isDark =
    theme === 'dark' ||
    (typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);

  if (isDark) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

export const usePreferencesStore = create<PreferencesState>((set, get) => ({
  ...DEFAULT_PREFERENCES,
  isLoaded: false,

  loadPreferences: async () => {
    const prefs = await preferencesRepository.get();
    applyThemeToDOM(prefs.theme);
    set({
      ...prefs,
      isLoaded: true,
    });
  },

  setTheme: async (theme: ThemeMode) => {
    applyThemeToDOM(theme);
    set({ theme });
    await preferencesRepository.set({ theme });
  },

  updateEditorPreferences: async (partialEditor: Partial<EditorViewPreferences>) => {
    const current = get().editor;
    const updated = { ...current, ...partialEditor };
    set({ editor: updated });
    await preferencesRepository.set({ editor: updated });
  },

  resetToDefaults: async () => {
    applyThemeToDOM(DEFAULT_PREFERENCES.theme);
    set({ ...DEFAULT_PREFERENCES, isLoaded: true });
    await preferencesRepository.set(DEFAULT_PREFERENCES);
  },
}));
