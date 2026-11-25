import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Eye, X, GraduationCap, Code2, Briefcase } from 'lucide-react';
import { OWNER_INFO } from '../../data/navigation';
import { PROJECTS } from '../../data/projects';
import { SKILL_CATEGORIES } from '../../data/skills';
import { MagneticButton } from '../common/MagneticButton';
import { useCursor } from '../../context/CursorContext';
import confetti from 'canvas-confetti';

interface ResumeSectionProps {
  isModalOpen?: boolean;
  onCloseModal?: () => void;
  onOpenModal?: () => void;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({
  isModalOpen = false,
  onCloseModal,
  onOpenModal
}) => {
  const [internalModalOpen, setInternalModalOpen] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const { setCursor, resetCursor } = useCursor();

  const isOpen = isModalOpen || internalModalOpen;
  const handleOpen = () => {
    if (onOpenModal) onOpenModal();
    else setInternalModalOpen(true);
  };
  const handleClose = () => {
    if (onCloseModal) onCloseModal();
    else setInternalModalOpen(false);
  };

  const handleDownload = () => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#FF604A', '#181818', '#C5A15D']
    });

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);

    // In local dev, trigger standard print dialog
    window.print();
  };

  return (
    <>
      <section className="relative py-24 md:py-32 px-6 sm:px-10 md:px-16 bg-[#F0EEE8] border-t border-[#E4E0D8]">
        <div className="max-w-7xl mx-auto">
          {/* Header Card */}
          <div className="p-8 md:p-14 rounded-3xl bg-[#FFFFFF] border border-[#E4E0D8] shadow-xs flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl text-left">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF604A]" />
                <span className="font-mono text-xs uppercase tracking-widest text-[#FF604A] font-bold">
                  CURRICULUM VITAE / PROFILE
                </span>
              </div>

              <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#181818] mb-3">
                TECHNICAL RESUME & CREDENTIALS
              </h2>

              <p className="font-sans text-sm md:text-base text-[#77746F] leading-relaxed mb-4">
                Structured overview of formal engineering education at SNIST, software architecture leadership at Damayanti Crest, production applications, and embedded engineering proficiencies.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#77746F]">
                <span>Status: Updated {OWNER_INFO.resume.lastUpdated}</span>
                <span>•</span>
                <span>Format: Web & PDF Ready</span>
                <span>•</span>
                <span>SNIST ECE • Hyderabad</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <MagneticButton
                variant="primary"
                onClick={handleOpen}
                cursorText="INSPECT"
                className="px-6 py-4 text-xs"
              >
                <Eye className="w-4 h-4" />
                <span>PREVIEW RESUME</span>
              </MagneticButton>

              <MagneticButton
                variant="outline"
                onClick={handleDownload}
                className="px-6 py-4 text-xs"
              >
                <Download className="w-4 h-4" />
                <span>{downloadSuccess ? 'PRINTING RESUME...' : 'DOWNLOAD / PRINT'}</span>
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      {/* Full-Screen Interactive Resume Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="resume-title"
            className="fixed inset-0 z-[99990] bg-[#181818]/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#FFFFFF] text-[#242424] w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl border border-[#E4E0D8] overflow-y-auto p-6 sm:p-10 md:p-14 relative"
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                onMouseEnter={() => setCursor('hover')}
                onMouseLeave={resetCursor}
                className="absolute top-6 right-6 p-2 rounded-full bg-[#F0EEE8] hover:bg-[#FF604A] hover:text-white transition-colors"
                aria-label="Close resume preview"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Resume Header */}
              <div className="pb-8 border-b-2 border-[#181818] mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <h1 id="resume-title" className="font-display font-extrabold text-3xl md:text-4xl text-[#181818] tracking-tight">
                      {OWNER_INFO.fullName}
                    </h1>
                    <p className="font-display font-semibold text-sm text-[#FF604A] uppercase tracking-wider mt-1">
                      {OWNER_INFO.role}
                    </p>
                  </div>

                  <div className="text-left sm:text-right font-mono text-xs text-[#77746F] space-y-1">
                    <p>{OWNER_INFO.location}</p>
                    <p>{OWNER_INFO.social.email}</p>
                    <p>{OWNER_INFO.social.github}</p>
                  </div>
                </div>

                <p className="font-sans text-sm text-[#77746F] leading-relaxed">
                  {OWNER_INFO.bio}
                </p>
              </div>

              {/* Education Section */}
              <div className="mb-8">
                <h3 className="font-mono text-xs uppercase tracking-widest text-[#FF604A] font-bold mb-4 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  EDUCATION
                </h3>
                <div className="p-4 rounded-xl bg-[#F7F5F0] border border-[#E4E0D8]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <h4 className="font-display font-bold text-base text-[#181818]">
                      {OWNER_INFO.education.degree}
                    </h4>
                    <span className="font-mono text-xs text-[#77746F]">
                      {OWNER_INFO.education.location}
                    </span>
                  </div>
                  <p className="font-sans text-xs text-[#77746F] mb-2">
                    {OWNER_INFO.education.institution}
                  </p>
                  <p className="font-sans text-xs text-[#242424]">
                    Specialized coursework: Embedded Systems, Microprocessors, Signals & Systems, Digital Signal Processing, Communication Protocols. Active contributor to SNIST Robotics Club.
                  </p>
                </div>
              </div>

              {/* Technical Skills Summary */}
              <div className="mb-8">
                <h3 className="font-mono text-xs uppercase tracking-widest text-[#FF604A] font-bold mb-4 flex items-center gap-2">
                  <Code2 className="w-4 h-4" />
                  TECHNICAL PROFICIENCIES
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                  {SKILL_CATEGORIES.map((cat) => (
                    <div key={cat.id} className="p-3 rounded-lg border border-[#E4E0D8] bg-[#F7F5F0]">
                      <span className="font-display font-bold text-[#181818] block mb-1">
                        {cat.title}
                      </span>
                      <p className="text-[#77746F]">
                        {cat.skills.map(s => s.name).join(' • ')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Core Projects Overview */}
              <div className="mb-8">
                <h3 className="font-mono text-xs uppercase tracking-widest text-[#FF604A] font-bold mb-4 flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  CORE SOFTWARE PROJECTS
                </h3>
                <div className="space-y-4">
                  {PROJECTS.slice(0, 4).map((p) => (
                    <div key={p.id} className="p-4 rounded-xl border border-[#E4E0D8] bg-[#FFFFFF]">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                        <h4 className="font-display font-bold text-sm text-[#181818]">
                          {p.title} — <span className="text-xs font-normal text-[#FF604A]">{p.categoryLabel}</span>
                        </h4>
                        <span className="font-mono text-[11px] text-[#77746F]">{p.role}</span>
                      </div>
                      <p className="font-sans text-xs text-[#77746F] mb-2 leading-relaxed">
                        {p.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {p.technologies.slice(0, 5).map(t => (
                          <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#F0EEE8] text-[#242424]">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer action in modal */}
              <div className="pt-6 border-t border-[#E4E0D8] flex flex-wrap items-center justify-between gap-4">
                <span className="font-mono text-xs text-[#77746F]">
                  Document ID: GRR-CV-2026
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleDownload}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FF604A] text-white text-xs font-display font-bold hover:bg-[#E84E38] transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download / Print PDF</span>
                  </button>
                  <button
                    onClick={handleClose}
                    className="px-5 py-2.5 rounded-full border border-[#E4E0D8] text-xs font-display font-semibold hover:bg-[#F0EEE8] transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
