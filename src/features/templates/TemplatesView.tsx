import React from 'react';
import { LayoutTemplate } from 'lucide-react';
import { EmptyState } from '@/components/common/EmptyState';

export const TemplatesView: React.FC = () => {
  return (
    <div className="mx-auto max-w-6xl p-6 md:p-8 space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">Document Templates</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Curated templates for resumes, academic reports, executive summaries, and letters.
        </p>
      </div>

      <EmptyState
        icon={<LayoutTemplate className="h-6 w-6" />}
        title="Templates Architecture Reserved"
        description="The templates metadata store (templates_metadata) is initialized in IndexedDB. Built-in templates and template authoring will be integrated in subsequent stages."
      />
    </div>
  );
};
