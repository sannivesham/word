import { create } from 'zustand';

export interface ToastNotification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  durationMs?: number;
}

export type ActiveDialog =
  | null
  | { type: 'confirm'; title: string; message: string; onConfirm: () => void; confirmLabel?: string; cancelLabel?: string; isDestructive?: boolean }
  | { type: 'newDocument' }
  | { type: 'about' }
  | { type: 'pageSetup' };

export type ApplicationStatus = 'idle' | 'loading' | 'saving' | 'error';

interface AppState {
  sidebarOpen: boolean;
  activeDialog: ActiveDialog;
  status: ApplicationStatus;
  statusMessage: string | null;
  toasts: ToastNotification[];

  // Actions
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  openDialog: (dialog: NonNullable<ActiveDialog>) => void;
  closeDialog: () => void;
  setStatus: (status: ApplicationStatus, message?: string | null) => void;
  addToast: (toast: Omit<ToastNotification, 'id'>) => string;
  removeToast: (id: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  sidebarOpen: true,
  activeDialog: null,
  status: 'idle',
  statusMessage: null,
  toasts: [],

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  openDialog: (dialog) => set({ activeDialog: dialog }),
  closeDialog: () => set({ activeDialog: null }),
  setStatus: (status, message = null) => set({ status, statusMessage: message }),

  addToast: (toast) => {
    const id = crypto.randomUUID();
    const newToast: ToastNotification = { ...toast, id };
    set((state) => ({ toasts: [...state.toasts, newToast] }));

    const duration = toast.durationMs ?? 4000;
    if (duration > 0) {
      setTimeout(() => {
        set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
      }, duration);
    }
    return id;
  },

  removeToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));
