import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  Plus,
  Database,
  Layers,
  Cpu,
  ShieldCheck,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { useDocumentStore } from '@/stores/document-store';
import { useAppStore } from '@/stores/app-store';
import { Button } from '@/components/common/Button';
import { EmptyState } from '@/components/common/EmptyState';

export const DashboardView: React.FC = () => {
  const navigate = useNavigate();
  const { documents, loadDocuments, createNewDocument } = useDocumentStore();
  const { addToast } = useAppStore();

  useEffect(() => {
    loadDocuments();
  }, [loadDocuments]);

  const handleCreate = async () => {
    const doc = await createNewDocument();
    addToast({
      type: 'success',
      message: `Created "${doc.title}"`,
    });
    navigate(`/document/${doc.id}`);
  };

  const recentDocs = documents.slice(0, 4);

  return (
    <div className="mx-auto max-w-6xl p-6 md:p-8 space-y-8">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0E3A99] via-[#1A3DC7] to-[#0A2566] p-6 text-white shadow-lg md:p-8">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur-md">
            <span>Damayanti Crest</span>
            <span className="opacity-60">•</span>
            <span>Stage 1 of 15</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            DC Word Doc — Foundation & Architecture
          </h1>
          <p className="text-sm text-blue-100 leading-relaxed">
            A professional, desktop-class word processor web application built on privacy-first local
            storage, modern design tokens, structured ProseMirror document models, and a virtual paged layout projection architecture.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <Button
              variant="secondary"
              size="md"
              leftIcon={<Plus className="h-4 w-4 text-[#0E3A99]" />}
              onClick={handleCreate}
              className="bg-white text-[#0E3A99] hover:bg-blue-50 font-semibold"
            >
              Create First Document
            </Button>
            <Button
              variant="outline"
              size="md"
              leftIcon={<BookOpen className="h-4 w-4" />}
              onClick={() => navigate('/help')}
              className="border-white/30 text-white hover:bg-white/10"
            >
              Architecture & Decisions
            </Button>
          </div>
        </div>
      </div>

      {/* Stage 1 Architecture Pillars Overview */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-slate-800 dark:text-slate-200">
          Stage 1 Architectural Pillars
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-subtle dark:border-slate-800 dark:bg-slate-900 space-y-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-[#0E3A99] dark:bg-blue-950 dark:text-blue-400">
              <Cpu className="h-5 w-5" />
            </div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">Editor Engine Decision</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              TipTap over ProseMirror core selected for immutable state, schema rigor, and seamless React bindings.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-subtle dark:border-slate-800 dark:bg-slate-900 space-y-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
              <Layers className="h-5 w-5" />
            </div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">Virtual Paged Layout</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              Print-fidelity pagination projected over semantic document AST via CSS Paged geometry tokens and decorations.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-subtle dark:border-slate-800 dark:bg-slate-900 space-y-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
              <Database className="h-5 w-5" />
            </div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">IndexedDB Storage</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              Strictly local persistence using `DCWordDocDB` with versioned migrations, repositories, and revision snapshots.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-subtle dark:border-slate-800 dark:bg-slate-900 space-y-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">Privacy-First Architecture</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              No mandatory cloud, zero tracking telemetry, offline-capable PWA caching, and complete user ownership.
            </p>
          </div>
        </div>
      </div>

      {/* Recent Documents Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-800 dark:text-slate-200">
            Recent Local Documents
          </h2>
          <Button
            variant="ghost"
            size="sm"
            rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
            onClick={() => navigate('/documents')}
          >
            View All Documents
          </Button>
        </div>

        {recentDocs.length === 0 ? (
          <EmptyState
            icon={<FileText className="h-6 w-6" />}
            title="No documents yet"
            description="Your local IndexedDB is ready. Click below to initialize your first document entity."
            action={
              <Button variant="primary" size="sm" onClick={handleCreate}>
                Create Document
              </Button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentDocs.map((doc) => (
              <div
                key={doc.id}
                onClick={() => navigate(`/document/${doc.id}`)}
                className="group cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-subtle hover:border-[#0E3A99] hover:shadow-md transition-all dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[#0E3A99] dark:bg-slate-800 dark:text-blue-400">
                    <FileText className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] text-slate-400">
                    {new Date(doc.updatedAt).toLocaleDateString()}
                  </span>
                </div>
                <h4 className="mt-3 truncate text-xs font-bold text-slate-900 group-hover:text-[#0E3A99] dark:text-white dark:group-hover:text-blue-400">
                  {doc.title}
                </h4>
                <p className="mt-1 text-[11px] text-slate-400">
                  {doc.pageSettings.paperSize} • {doc.pageSettings.orientation}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
