import React from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import { useAppStore } from '@/stores/app-store';
import { cn } from '@/utils/cn';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useAppStore();

  if (toasts.length === 0) return null;

  const icons = {
    success: <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />,
    error: <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />,
    warning: <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />,
    info: <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />,
  };

  const borders = {
    success: 'border-emerald-500/30 bg-emerald-50/90 dark:bg-emerald-950/80',
    error: 'border-red-500/30 bg-red-50/90 dark:bg-red-950/80',
    warning: 'border-amber-500/30 bg-amber-50/90 dark:bg-amber-950/80',
    info: 'border-blue-500/30 bg-blue-50/90 dark:bg-blue-950/80',
  };

  return (
    <div
      aria-live="polite"
      className="fixed bottom-4 right-4 z-toast flex flex-col gap-2 max-w-sm w-full pointer-events-none"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            'pointer-events-auto flex items-center justify-between rounded-lg border p-3 shadow-lg backdrop-blur-xs transition-all duration-200 animate-in slide-in-from-bottom-2',
            borders[toast.type]
          )}
        >
          <div className="flex items-center gap-2.5">
            <span className="shrink-0">{icons[toast.type]}</span>
            <p className="text-xs font-medium text-slate-800 dark:text-slate-100">{toast.message}</p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="ml-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            aria-label="Dismiss notification"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
