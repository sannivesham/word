import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  Star,
  Layers,
  FileCheck,
} from 'lucide-react';
import { useDocumentStore } from '@/stores/document-store';
import { useAppStore } from '@/stores/app-store';
import { Button } from '@/components/common/Button';
import { IconButton } from '@/components/common/IconButton';
import { LoadingSpinner } from '@/components/feedback/LoadingSpinner';

export const EditorWorkspaceView: React.FC = () => {
  const { documentId } = useParams<{ documentId: string }>();
  const navigate = useNavigate();
  const { activeDocument, loadDocument, updateTitle, toggleFavorite, saveDocument } =
    useDocumentStore();
  const { addToast } = useAppStore();

  const [titleInput, setTitleInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (documentId) {
      loadDocument(documentId).then((doc) => {
        if (doc) {
          setTitleInput(doc.title);
        }
      });
    }
  }, [documentId, loadDocument]);

  if (!activeDocument) {
    return (
      <div className="flex h-full items-center justify-center">
        <LoadingSpinner size="lg" label="Loading document from IndexedDB..." />
      </div>
    );
  }

  const handleTitleBlur = async () => {
    if (activeDocument && titleInput.trim() && titleInput !== activeDocument.title) {
      await updateTitle(activeDocument.id, titleInput);
      addToast({
        type: 'info',
        message: 'Title updated',
      });
    }
  };

  const handleManualSave = async () => {
    setIsSaving(true);
    await saveDocument(activeDocument);
    setIsSaving(false);
    addToast({
      type: 'success',
      message: 'Document saved to local IndexedDB',
    });
  };

  return (
    <div className="flex h-full flex-col bg-slate-100 dark:bg-slate-950">
      {/* Editor Top Bar */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-2 dark:border-slate-800 dark:bg-slate-900 shadow-xs">
        <div className="flex items-center gap-3">
          <IconButton
            aria-label="Back to documents"
            size="sm"
            onClick={() => navigate('/documents')}
          >
            <ArrowLeft className="h-4 w-4" />
          </IconButton>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              onBlur={handleTitleBlur}
              className="rounded px-2 py-1 text-sm font-bold text-slate-900 hover:bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0E3A99] dark:text-white dark:hover:bg-slate-800 dark:focus:bg-slate-800"
            />
            <IconButton
              aria-label={activeDocument.isFavorite ? 'Unstar' : 'Star'}
              size="xs"
              onClick={() => toggleFavorite(activeDocument.id)}
            >
              <Star
                className={`h-3.5 w-3.5 ${
                  activeDocument.isFavorite
                    ? 'fill-amber-400 text-amber-500'
                    : 'text-slate-400'
                }`}
              />
            </IconButton>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 pr-2 border-r border-slate-200 dark:border-slate-800">
            <Layers className="h-3.5 w-3.5 text-blue-600" />
            <span>
              {activeDocument.pageSettings.paperSize} ({activeDocument.pageSettings.orientation})
            </span>
          </div>

          <Button
            variant="outline"
            size="sm"
            leftIcon={<Save className="h-3.5 w-3.5" />}
            onClick={handleManualSave}
            isLoading={isSaving}
          >
            Save
          </Button>
        </div>
      </div>

      {/* Editor Workspace Canvas (Stage 1 Architectural Shell) */}
      <div className="flex-1 overflow-auto p-8 flex justify-center">
        {/* Virtual Page Placeholder Shell */}
        <div className="w-[794px] min-h-[1123px] bg-white p-12 shadow-page rounded-sm border border-slate-200 dark:bg-slate-900 dark:border-slate-800 dark:shadow-page-dark flex flex-col justify-between">
          <div className="space-y-6">
            <div className="border-b border-blue-100 pb-4 dark:border-slate-800">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#0E3A99] dark:bg-blue-950 dark:text-blue-300">
                <FileCheck className="h-3.5 w-3.5" />
                <span>Stage 1 Document Foundation Active</span>
              </div>
              <h1 className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
                {activeDocument.title}
              </h1>
              <p className="mt-1 text-xs text-slate-400">
                Created: {new Date(activeDocument.createdAt).toLocaleString()} • Last Saved:{' '}
                {new Date(activeDocument.updatedAt).toLocaleString()}
              </p>
            </div>

            <div className="rounded-lg border border-dashed border-slate-300 p-6 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30 space-y-3">
              <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                Document Model & Page Geometry Specifications
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs text-slate-600 dark:text-slate-400">
                <div>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Paper Size: </span>
                  {activeDocument.pageSettings.paperSize}
                </div>
                <div>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Orientation: </span>
                  {activeDocument.pageSettings.orientation}
                </div>
                <div>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Margins (T/R/B/L): </span>
                  {activeDocument.pageSettings.margins.top}mm / {activeDocument.pageSettings.margins.right}mm /{' '}
                  {activeDocument.pageSettings.margins.bottom}mm / {activeDocument.pageSettings.margins.left}mm
                </div>
                <div>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Storage Store: </span>
                  IndexedDB (<code className="font-mono text-[10px]">documents</code>)
                </div>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <p>
                This canvas represents the <strong>Stage 1 Architectural Foundation</strong> of DC Word Doc.
                As outlined in the specification:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>The immutable document schema is initialized and versioned (<code className="font-mono">schemaVersion: 1</code>).</li>
                <li>The Rich Text Editor decision has been completed: <strong>TipTap (ProseMirror)</strong> has been selected for Stage 2 integration.</li>
                <li>The virtual paged layout projection strategy is documented in <code className="font-mono">docs/EDITOR_ENGINE_DECISION.md</code>.</li>
                <li>Real rich-text typing, ribbon toolbars, formatting, and live pagination will be introduced in subsequent stages.</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4 text-center text-[11px] text-slate-400 dark:border-slate-800">
            Damayanti Crest — DC Word Doc Architecture Shell
          </div>
        </div>
      </div>
    </div>
  );
};
