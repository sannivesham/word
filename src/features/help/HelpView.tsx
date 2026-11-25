import React from 'react';
import { ShieldCheck, BookOpen, Layers, CheckCircle2 } from 'lucide-react';

export const HelpView: React.FC = () => {
  const stages = [
    { num: 1, title: 'Foundation & Architecture', status: 'Completed (Current)' },
    { num: 2, title: 'Core Rich Text Engine & Schema', status: 'Upcoming' },
    { num: 3, title: 'Page Geometry & Print Canvas', status: 'Upcoming' },
    { num: 4, title: 'Virtual Pagination & Page Breaks', status: 'Upcoming' },
    { num: 5, title: 'Ribbon Interface & Formatting', status: 'Upcoming' },
    { num: 6, title: 'Paragraphs, Styles & Alignment', status: 'Upcoming' },
    { num: 7, title: 'Tables & Cell Layout', status: 'Upcoming' },
    { num: 8, title: 'Images, Shapes & Media', status: 'Upcoming' },
    { num: 9, title: 'Headers, Footers & Page Numbers', status: 'Upcoming' },
    { num: 10, title: 'Footnotes, Citations & TOC', status: 'Upcoming' },
    { num: 11, title: 'Document Manager & Folders', status: 'Upcoming' },
    { num: 12, title: 'Templates & Design Gallery', status: 'Upcoming' },
    { num: 13, title: 'DOCX Import & Export Pipeline', status: 'Upcoming' },
    { num: 14, title: 'PDF Export & Print Fidelity', status: 'Upcoming' },
    { num: 15, title: 'Polishing, PWA Offline & Release', status: 'Upcoming' },
  ];

  return (
    <div className="mx-auto max-w-4xl p-6 md:p-8 space-y-8">
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">Help & Architecture</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          DC Word Doc system design, privacy guarantees, and 15-stage engineering roadmap.
        </p>
      </div>

      {/* Privacy Guarantees */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-subtle dark:border-slate-800 dark:bg-slate-900 space-y-3">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
          <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <span>Privacy-First Philosophy</span>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          DC Word Doc is engineered from the ground up to respect user sovereignty and privacy:
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
            <span>No mandatory user accounts or logins</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
            <span>No document telemetry or tracking</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
            <span>100% Local IndexedDB document storage</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
            <span>Offline-capable Progressive Web App</span>
          </li>
        </ul>
      </div>

      {/* Editor Engine Decision Summary */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-subtle dark:border-slate-800 dark:bg-slate-900 space-y-3">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
          <BookOpen className="h-5 w-5 text-[#0E3A99] dark:text-blue-400" />
          <span>Rich Text Editor Architecture Decision</span>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Following our rigorous technical evaluation (detailed in <code className="font-mono">docs/EDITOR_ENGINE_DECISION.md</code>),
          <strong> TipTap on ProseMirror Core</strong> was selected as the engine. It offers pure immutable document state,
          strict schema validation, position-based cursor addressing, rich table manipulation, and an active open-source ecosystem.
        </p>
      </div>

      {/* 15 Stage Roadmap */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-subtle dark:border-slate-800 dark:bg-slate-900 space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
          <Layers className="h-5 w-5 text-[#0E3A99] dark:text-blue-400" />
          <span>DC Word Doc — 15 Stage Roadmap</span>
        </div>
        <div className="space-y-2">
          {stages.map((st) => (
            <div
              key={st.num}
              className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50/50 p-2.5 text-xs dark:border-slate-800 dark:bg-slate-800/40"
            >
              <div className="flex items-center gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-[10px] font-bold text-slate-700 dark:bg-slate-700 dark:text-slate-300">
                  {st.num}
                </span>
                <span className="font-medium text-slate-800 dark:text-slate-200">{st.title}</span>
              </div>
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  st.num === 1
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                }`}
              >
                {st.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
