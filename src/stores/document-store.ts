import { create } from 'zustand';
import { DocumentEntity } from '@/types/document';
import { documentRepository } from '@/storage/repositories/document-repository';
import { createDefaultDocument } from '@/editor-engine/document-model/defaults';

interface DocumentState {
  documents: DocumentEntity[];
  activeDocument: DocumentEntity | null;
  activeFolderId: string | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  loadDocuments: () => Promise<void>;
  loadDocument: (id: string) => Promise<DocumentEntity | null>;
  createNewDocument: (title?: string) => Promise<DocumentEntity>;
  updateActiveDocument: (doc: DocumentEntity) => void;
  saveDocument: (doc: DocumentEntity) => Promise<void>;
  updateTitle: (id: string, title: string) => Promise<void>;
  toggleFavorite: (id: string) => Promise<void>;
  moveToTrash: (id: string) => Promise<void>;
  restoreFromTrash: (id: string) => Promise<void>;
  permanentlyDelete: (id: string) => Promise<void>;
  setActiveFolderId: (folderId: string | null) => void;
}

export const useDocumentStore = create<DocumentState>((set, get) => ({
  documents: [],
  activeDocument: null,
  activeFolderId: null,
  isLoading: false,
  error: null,

  loadDocuments: async () => {
    set({ isLoading: true, error: null });
    try {
      const docs = await documentRepository.getAll();
      set({ documents: docs, isLoading: false });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : 'Failed to load documents',
        isLoading: false,
      });
    }
  },

  loadDocument: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const doc = await documentRepository.getById(id);
      if (doc) {
        await documentRepository.updateLastOpened(id);
      }
      set({ activeDocument: doc, isLoading: false });
      return doc;
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : 'Failed to load document',
        isLoading: false,
      });
      return null;
    }
  },

  createNewDocument: async (title?: string) => {
    const activeFolderId = get().activeFolderId;
    const newDoc = createDefaultDocument({
      title: title || 'Untitled Document',
      folderId: activeFolderId,
    });
    const saved = await documentRepository.create(newDoc);
    set((state) => ({
      documents: [saved, ...state.documents],
      activeDocument: saved,
    }));
    return saved;
  },

  updateActiveDocument: (doc: DocumentEntity) => {
    set({ activeDocument: doc });
  },

  saveDocument: async (doc: DocumentEntity) => {
    const updated = await documentRepository.update(doc);
    set((state) => ({
      activeDocument: state.activeDocument?.id === doc.id ? updated : state.activeDocument,
      documents: state.documents.map((d) => (d.id === doc.id ? updated : d)),
    }));
  },

  updateTitle: async (id: string, title: string) => {
    const doc = await documentRepository.getById(id);
    if (!doc) return;
    doc.title = title.trim() || 'Untitled Document';
    await get().saveDocument(doc);
  },

  toggleFavorite: async (id: string) => {
    const doc = await documentRepository.getById(id);
    if (!doc) return;
    doc.isFavorite = !doc.isFavorite;
    await get().saveDocument(doc);
  },

  moveToTrash: async (id: string) => {
    await documentRepository.softDelete(id);
    set((state) => ({
      documents: state.documents.filter((d) => d.id !== id),
      activeDocument: state.activeDocument?.id === id ? null : state.activeDocument,
    }));
  },

  restoreFromTrash: async (id: string) => {
    await documentRepository.restore(id);
    await get().loadDocuments();
  },

  permanentlyDelete: async (id: string) => {
    await documentRepository.permanentlyDelete(id);
    set((state) => ({
      documents: state.documents.filter((d) => d.id !== id),
      activeDocument: state.activeDocument?.id === id ? null : state.activeDocument,
    }));
  },

  setActiveFolderId: (folderId: string | null) => {
    set({ activeFolderId: folderId });
  },
}));
