import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { CursorProvider } from './context/CursorContext';
import { CustomCursor } from './components/common/CustomCursor';
import { SmoothScroll } from './components/common/SmoothScroll';
import { LoadingScreen } from './components/common/LoadingScreen';
import { Navbar } from './components/navigation/Navbar';
import { Footer } from './components/navigation/Footer';
import { Home } from './pages/Home';
import { CaseStudy } from './pages/CaseStudy';
import { NotFound } from './pages/NotFound';

const AppContent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="relative min-h-screen bg-[#F7F5F0] text-[#242424] selection:bg-[#FF604A] selection:text-white">
      {/* 1. Introductory Entrance Animation */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* 2. Interactive Custom Cursor */}
      <CustomCursor />

      {/* 3. Global Floating Navbar */}
      <Navbar onResumeClick={() => setIsResumeModalOpen(true)} />

      {/* 4. Page Routes */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <Home
                isResumeModalOpen={isResumeModalOpen}
                onCloseResumeModal={() => setIsResumeModalOpen(false)}
                onOpenResumeModal={() => setIsResumeModalOpen(true)}
              />
            }
          />
          <Route path="/projects/:slug" element={<CaseStudy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>

      {/* 5. Editorial Footer */}
      <Footer onResumeClick={() => setIsResumeModalOpen(true)} />
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <CursorProvider>
        <SmoothScroll>
          <AppContent />
        </SmoothScroll>
      </CursorProvider>
    </BrowserRouter>
  );
}
