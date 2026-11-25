import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  Plus,
  Star,
  Trash2,
  Calendar,
  Layers,
} from 'lucide-react';
import { useDocumentStore } from '@/stores/document-store';
import { useAppStore } from '@/stores/app-store';
import { Button } from '@/components/common/Button';
import { IconButton } from '@/components/common/IconButton';
import { SearchInput } from '@/components/common/SearchInput';
import { EmptyState } from '@/components/common/EmptyState';

export const DocumentsView: React.FC = () => {
  const navigate = useNavigate();
  const { documents, loadDocuments, createNewDocument, toggleFavorite, moveToTrash } =
    useDocumentStore();
  const { addToast, openDialog } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadDocuments();
  }, [loadDocuments]);

  const filteredDocs = documents.filter((d) =>
    d.title.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  const handleCreate = async () => {
    const doc = await createNewDocument();
    addToast({
      type: 'success',
      message: `Created "${doc.title}"`,
    });
    navigate(`/document/${doc.id}`);
  };

  const handleDeletePrompt = (docId: string, title: string) => {
    openDialog({
      type: 'confirm',
      title: 'Move Document to Trash',
      message: `Are you sure you want to move "${title}" to trash? You can restore it later.`,
      confirmLabel: 'Move to Trash',
      isDestructive: true,
      onConfirm: async () => {
        await moveToTrash(docId);
        addToast({
          type: 'info',
          message: `Moved "${title}" to trash`,
        });
      },
    });
  };

  return (
    <div className="mx-auto max-w-6xl p-6 md:p-8 space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Document Library</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Stored locally in IndexedDB (<code className="font-mono">DCWordDocDB</code>)
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Plus className="h-4 w-4" />}
            onClick={handleCreate}
          >
            New Document
          </Button>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="max-w-md">
        <SearchInput
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onClear={() => setSearchQuery('')}
        />
      </div>

      {/* Document Grid / List */}
      {filteredDocs.length === 0 ? (
        <EmptyState
          icon={<FileText className="h-6 w-6" />}
          title={searchQuery ? 'No documents match your search' : 'No documents in your library'}
          description={
            searchQuery
              ? 'Try searching for a different keyword or clear the search filter.'
              : 'Create your first document to experience the foundation of DC Word Doc.'
          }
          action={
            !searchQuery ? (
              <Button variant="primary" size="sm" onClick={handleCreate}>
                Create Document
              </Button>
            ) : undefined
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-subtle hover:border-[#0E3A99] hover:shadow-md transition-all dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[#0E3A99] dark:bg-slate-800 dark:text-blue-400">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div>
                      <h3
                        onClick={() => navigate(`/document/${doc.id}`)}
                        className="cursor-pointer text-xs font-bold text-slate-900 hover:text-[#0E3A99] dark:text-white dark:hover:text-blue-400 truncate max-w-[180px]"
                      >
                        {doc.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-0.5">
                        <Layers className="h-3 w-3" />
                        <span>
                          {doc.pageSettings.paperSize} ({doc.pageSettings.orientation})
                        </span>
                      </div>
                    </div>
                  </div>

                  <IconButton
                    aria-label={doc.isFavorite ? 'Unfavorite' : 'Favorite'}
                    size="xs"
                    onClick={() => toggleFavorite(doc.id)}
                  >
                    <Star
                      className={`h-3.5 w-3.5 ${
                        doc.isFavorite ? 'fill-amber-400 text-amber-500' : 'text-slate-400'
                      }`}
                    />
                  </IconButton>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800 text-[10px] text-slate-400">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{new Date(doc.updatedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-[11px]"
                    onClick={() => navigate(`/document/${doc.id}`)}
                  >
                    Open
                  </Button>
                  <IconButton
                    aria-label="Delete document"
                    variant="danger"
                    size="xs"
                    onClick={() => handleDeletePrompt(doc.id, doc.title)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </IconButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
