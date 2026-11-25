import { create } from 'zustand';

export interface EditorFormattingState {
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  isStrike: boolean;
  textAlign: 'left' | 'center' | 'right' | 'justify';
  headingLevel: 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Normal text
  fontFamily: string;
  fontSize: number; // in pt
  textColor: string;
  highlightColor: string | null;
  isBulletList: boolean;
  isOrderedList: boolean;
  canUndo: boolean;
  canRedo: boolean;
}

export interface DocumentStats {
  wordCount: number;
  characterCount: number;
  characterCountNoSpaces: number;
  paragraphCount: number;
  pageCount: number;
  currentPage: number;
}

interface EditorState {
  isFocused: boolean;
  isReadOnly: boolean;
  formatting: EditorFormattingState;
  stats: DocumentStats;

  // Actions
  setFocused: (isFocused: boolean) => void;
  setReadOnly: (isReadOnly: boolean) => void;
  updateFormatting: (formatting: Partial<EditorFormattingState>) => void;
  updateStats: (stats: Partial<DocumentStats>) => void;
  resetEditorState: () => void;
}

const DEFAULT_FORMATTING: EditorFormattingState = {
  isBold: false,
  isItalic: false,
  isUnderline: false,
  isStrike: false,
  textAlign: 'left',
  headingLevel: 0,
  fontFamily: 'Segoe UI',
  fontSize: 11,
  textColor: '#0F172A',
  highlightColor: null,
  isBulletList: false,
  isOrderedList: false,
  canUndo: false,
  canRedo: false,
};

const DEFAULT_STATS: DocumentStats = {
  wordCount: 0,
  characterCount: 0,
  characterCountNoSpaces: 0,
  paragraphCount: 0,
  pageCount: 1,
  currentPage: 1,
};

export const useEditorStore = create<EditorState>((set) => ({
  isFocused: false,
  isReadOnly: false,
  formatting: DEFAULT_FORMATTING,
  stats: DEFAULT_STATS,

  setFocused: (isFocused) => set({ isFocused }),
  setReadOnly: (isReadOnly) => set({ isReadOnly }),
  updateFormatting: (partial) =>
    set((state) => ({ formatting: { ...state.formatting, ...partial } })),
  updateStats: (partial) =>
    set((state) => ({ stats: { ...state.stats, ...partial } })),
  resetEditorState: () =>
    set({
      isFocused: false,
      formatting: DEFAULT_FORMATTING,
      stats: DEFAULT_STATS,
    }),
}));
