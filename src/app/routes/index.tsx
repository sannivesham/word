import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './Layout';
import { DashboardView } from '@/features/dashboard/DashboardView';
import { DocumentsView } from '@/features/documents/DocumentsView';
import { EditorWorkspaceView } from '@/features/editor/EditorWorkspaceView';
import { TemplatesView } from '@/features/templates/TemplatesView';
import { SettingsView } from '@/features/settings/SettingsView';
import { HelpView } from '@/features/help/HelpView';

export const AppRoutes: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardView />} />
          <Route path="documents" element={<DocumentsView />} />
          <Route path="document/:documentId" element={<EditorWorkspaceView />} />
          <Route path="templates" element={<TemplatesView />} />
          <Route path="settings" element={<SettingsView />} />
          <Route path="help" element={<HelpView />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
