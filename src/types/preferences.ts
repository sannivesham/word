/**
 * DC Word Doc — Preferences Domain Types
 * Organization: Damayanti Crest
 */

export type ThemeMode = 'light' | 'dark' | 'system';

export interface EditorViewPreferences {
  showRuler: boolean;
  showLineNumbers: boolean;
  spellCheck: boolean;
  zoomLevel: number;        // Percentage (e.g., 100)
  viewMode: 'paginated' | 'continuous' | 'web';
  autoSaveIntervalMs: number;
}

export interface UserPreferences {
  theme: ThemeMode;
  editor: EditorViewPreferences;
  defaultPaperSize: 'A4' | 'Letter';
  defaultFontFamily: string;
  defaultFontSize: number;
}
