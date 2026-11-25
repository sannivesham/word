import React, { useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  FileText,
  FolderOpen,
  LayoutTemplate,
  Settings,
  HelpCircle,
  Menu,
  Plus,
  Sun,
  Moon,
  Laptop,
} from 'lucide-react';
import { useAppStore } from '@/stores/app-store';
import { usePreferencesStore } from '@/stores/preferences-store';
import { useDocumentStore } from '@/stores/document-store';
import { Button } from '@/components/common/Button';
import { IconButton } from '@/components/common/IconButton';
import { ConfirmationDialog } from '@/components/common/ConfirmationDialog';
import { ToastContainer } from '@/components/feedback/ToastContainer';
import { cn } from '@/utils/cn';

export const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { sidebarOpen, toggleSidebar, activeDialog, closeDialog, addToast } = useAppStore();
  const { theme, setTheme, loadPreferences } = usePreferencesStore();
  const { createNewDocument } = useDocumentStore();

  useEffect(() => {
    loadPreferences();
  }, [loadPreferences]);

  const navLinks = [
    { to: '/', label: 'Home', icon: <FileText className="h-4 w-4" /> },
    { to: '/documents', label: 'Documents', icon: <FolderOpen className="h-4 w-4" /> },
    { to: '/templates', label: 'Templates', icon: <LayoutTemplate className="h-4 w-4" /> },
    { to: '/settings', label: 'Settings', icon: <Settings className="h-4 w-4" /> },
    { to: '/help', label: 'Help', icon: <HelpCircle className="h-4 w-4" /> },
  ];

  const handleCreateDocument = async () => {
    try {
      const doc = await createNewDocument();
      addToast({
        type: 'success',
        message: `Created "${doc.title}"`,
      });
      navigate(`/document/${doc.id}`);
    } catch {
      addToast({
        type: 'error',
        message: 'Could not create new document',
      });
    }
  };

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  const themeIcon = {
    light: <Sun className="h-4 w-4 text-amber-500" />,
    dark: <Moon className="h-4 w-4 text-blue-400" />,
    system: <Laptop className="h-4 w-4 text-slate-400" />,
  }[theme];

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[var(--dc-bg-app)]">
      {/* Top Application Header */}
      <header className="fixed top-0 left-0 right-0 z-header flex h-13 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90">
        <div className="flex items-center gap-3">
          <IconButton
            aria-label="Toggle navigation sidebar"
            onClick={toggleSidebar}
            size="sm"
          >
            <Menu className="h-4 w-4" />
          </IconButton>

          <div
            className="flex items-center gap-2.5 cursor-pointer select-none"
            onClick={() => navigate('/')}
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0E3A99] text-white shadow-xs dark:bg-blue-600">
              <FileText className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">
                  DC Word Doc
                </span>
                <span className="rounded bg-blue-100 px-1 py-0.2 text-[9px] font-semibold text-[#0E3A99] dark:bg-blue-950 dark:text-blue-300">
                  Stage 1
                </span>
              </div>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-none">
                Damayanti Crest
              </p>
            </div>
          </div>
        </div>

        {/* Global Header Actions */}
        <div className="flex items-center gap-2">
          {!location.pathname.startsWith('/document/') && (
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Plus className="h-4 w-4" />}
              onClick={handleCreateDocument}
            >
              New Document
            </Button>
          )}

          <IconButton
            aria-label={`Current theme: ${theme}. Click to change.`}
            onClick={cycleTheme}
            size="sm"
          >
            {themeIcon}
          </IconButton>
        </div>
      </header>

      {/* Main Body Shell */}
      <div className="flex w-full pt-13 h-full">
        {/* Navigation Sidebar */}
        <aside
          className={cn(
            'flex flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 transition-all duration-200 ease-in-out shrink-0 select-none z-30',
            sidebarOpen ? 'w-56' : 'w-14'
          )}
        >
          <div className="flex-1 py-3 px-2 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-md px-3 py-2 text-xs font-medium transition-colors',
                    isActive
                      ? 'bg-blue-50 text-[#0E3A99] dark:bg-blue-950/60 dark:text-blue-400 font-semibold'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200'
                  )
                }
              >
                <span className="shrink-0">{link.icon}</span>
                {sidebarOpen && <span className="truncate">{link.label}</span>}
              </NavLink>
            ))}
          </div>

          {/* Sidebar Footer info */}
          {sidebarOpen && (
            <div className="border-t border-slate-200 p-3 dark:border-slate-800 text-[11px] text-slate-400 dark:text-slate-500">
              <p className="font-medium text-slate-600 dark:text-slate-400">Privacy First</p>
              <p className="text-[10px]">100% Local IndexedDB</p>
            </div>
          )}
        </aside>

        {/* View Content Area */}
        <main className="flex-1 overflow-y-auto bg-[var(--dc-bg-app)]">
          <Outlet />
        </main>
      </div>

      {/* Confirmation Dialog Host */}
      {activeDialog && activeDialog.type === 'confirm' && (
        <ConfirmationDialog
          isOpen={true}
          title={activeDialog.title}
          message={activeDialog.message}
          confirmLabel={activeDialog.confirmLabel}
          cancelLabel={activeDialog.cancelLabel}
          isDestructive={activeDialog.isDestructive}
          onConfirm={() => {
            activeDialog.onConfirm();
            closeDialog();
          }}
          onCancel={closeDialog}
        />
      )}

      {/* Global Toast Container */}
      <ToastContainer />
    </div>
  );
};
