import React from 'react';
import { Database, Palette, FileText, RotateCcw, Trash2 } from 'lucide-react';
import { usePreferencesStore } from '@/stores/preferences-store';
import { useAppStore } from '@/stores/app-store';
import { deleteEntireDatabase } from '@/storage/database/connection';
import { Select } from '@/components/common/Select';
import { Toggle } from '@/components/common/Toggle';
import { Button } from '@/components/common/Button';

export const SettingsView: React.FC = () => {
  const {
    theme,
    setTheme,
    editor,
    updateEditorPreferences,
    defaultPaperSize,
    resetToDefaults,
  } = usePreferencesStore();
  const { openDialog, addToast } = useAppStore();

  const handleResetStorage = () => {
    openDialog({
      type: 'confirm',
      title: 'Reset Entire Local Database?',
      message:
        'This will permanently delete all local documents, folders, preferences, and version snapshots stored in DCWordDocDB. This action cannot be undone.',
      confirmLabel: 'Delete All Data',
      isDestructive: true,
      onConfirm: async () => {
        try {
          await deleteEntireDatabase();
          addToast({
            type: 'info',
            message: 'Local database reset. Reloading...',
          });
          setTimeout(() => window.location.reload(), 1000);
        } catch {
          addToast({
            type: 'error',
            message: 'Failed to reset database',
          });
        }
      },
    });
  };

  return (
    <div className="mx-auto max-w-4xl p-6 md:p-8 space-y-8">
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">Settings & Preferences</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Configure appearance, default document settings, and local IndexedDB storage.
        </p>
      </div>

      <div className="space-y-6">
        {/* Appearance Section */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-subtle dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 pb-2 dark:border-slate-800">
            <Palette className="h-4 w-4 text-[#0E3A99] dark:text-blue-400" />
            <span>Appearance & Theme</span>
          </div>

          <div className="max-w-xs">
            <Select
              label="Interface Theme"
              value={theme}
              onChange={(e) => setTheme(e.target.value as 'light' | 'dark' | 'system')}
              options={[
                { value: 'system', label: 'System Default' },
                { value: 'light', label: 'Light Theme' },
                { value: 'dark', label: 'Dark Theme' },
              ]}
            />
          </div>
        </div>

        {/* Editor Defaults Section */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-subtle dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 pb-2 dark:border-slate-800">
            <FileText className="h-4 w-4 text-[#0E3A99] dark:text-blue-400" />
            <span>Document Defaults</span>
          </div>

          <div className="space-y-4">
            <div className="max-w-xs">
              <Select
                label="Default Paper Size"
                value={defaultPaperSize}
                onChange={() => {}}
                options={[
                  { value: 'A4', label: 'A4 (210 × 297 mm)' },
                  { value: 'Letter', label: 'Letter (8.5 × 11 in)' },
                ]}
              />
            </div>

            <div className="pt-2 space-y-3">
              <Toggle
                label="Show Horizontal Ruler"
                description="Displays margin and tab stop markers above the page canvas"
                checked={editor.showRuler}
                onChange={(checked) => updateEditorPreferences({ showRuler: checked })}
              />

              <Toggle
                label="Inline Spell Check"
                description="Flags misspelled words using native browser dictionary"
                checked={editor.spellCheck}
                onChange={(checked) => updateEditorPreferences({ spellCheck: checked })}
              />
            </div>
          </div>
        </div>

        {/* Database & Storage Section */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-subtle dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 pb-2 dark:border-slate-800">
            <Database className="h-4 w-4 text-[#0E3A99] dark:text-blue-400" />
            <span>IndexedDB Storage Management</span>
          </div>

          <div className="text-xs text-slate-600 dark:text-slate-400 space-y-2">
            <p>
              <strong>Database Name:</strong> <code className="font-mono">DCWordDocDB</code>
            </p>
            <p>
              <strong>Status:</strong> Active & Connected (Version 1)
            </p>
            <p>
              All documents, revisions, and preferences are stored exclusively on your device.
              No document content is transmitted to external servers.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<RotateCcw className="h-3.5 w-3.5" />}
              onClick={resetToDefaults}
            >
              Reset Preferences
            </Button>
            <Button
              variant="danger"
              size="sm"
              leftIcon={<Trash2 className="h-3.5 w-3.5" />}
              onClick={handleResetStorage}
            >
              Clear Local Database
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
