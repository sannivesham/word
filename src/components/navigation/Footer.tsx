import React from 'react';
import { ArrowUp, Mail, ExternalLink, FileText } from 'lucide-react';
import { OWNER_INFO, NAV_ITEMS } from '../../data/navigation';
import { useCursor } from '../../context/CursorContext';
import { GithubIcon, LinkedinIcon } from '../common/BrandIcons';

interface FooterProps {
  onResumeClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onResumeClick }) => {
  const currentYear = new Date().getFullYear();
  const { setCursor, resetCursor } = useCursor();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#181818] text-[#F7F5F0] pt-20 pb-12 px-6 sm:px-10 md:px-16 border-t border-[#2A2A2A] overflow-hidden">
      {/* Decorative ambient gradient */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FF604A]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top statement row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 pb-16 border-b border-[#2A2A2A]">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF604A] animate-pulse" />
              <span className="font-mono text-xs tracking-widest text-[#FF604A] uppercase">
                PHILOSOPHY & VISION
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#FAF8F2] max-w-xl">
              DESIGNED WITH INTENTION.
              <br />
              <span className="text-[#FF604A]">BUILT WITH PURPOSE.</span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              onMouseEnter={() => setCursor('hover')}
              onMouseLeave={resetCursor}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#202020] border border-[#333333] hover:border-[#FF604A] text-xs font-display font-semibold tracking-wider uppercase transition-all duration-300 hover:text-[#FF604A] group"
              aria-label="Scroll back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-1 text-[#FF604A]" />
            </button>
          </div>
        </div>

        {/* Middle navigation & details grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-14 border-b border-[#2A2A2A]">
          {/* Col 1: Identity */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#252525] border border-[#3A3A3A] flex items-center justify-center font-display font-bold text-xs text-[#FAF8F2]">
                {OWNER_INFO.monogram}
              </div>
              <span className="font-display font-bold text-base text-[#FAF8F2]">
                {OWNER_INFO.fullName}
              </span>
            </div>
            <p className="font-sans text-xs text-[#77746F] leading-relaxed mb-4">
              {OWNER_INFO.role}
            </p>
            <p className="font-mono text-[11px] text-[#A09D96]">
              {OWNER_INFO.education.degree}
              <br />
              {OWNER_INFO.education.institution}
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#FF604A] mb-4">
              EXPLORE
            </h3>
            <ul className="space-y-2.5 text-xs font-sans">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-[#A09D96] hover:text-[#FAF8F2] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Independent Projects & Ventures */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#FF604A] mb-4">
              INITIATIVES
            </h3>
            <ul className="space-y-2.5 text-xs font-sans text-[#A09D96]">
              <li>
                <a href="/projects/damayanti-crest" className="hover:text-[#FAF8F2] transition-colors">
                  Damayanti Crest
                </a>
              </li>
              <li>
                <a href="/projects/sannivesham" className="hover:text-[#FAF8F2] transition-colors">
                  Sannivesham (సన్నివేశం)
                </a>
              </li>
              <li>
                <a href="/projects/dc-excel" className="hover:text-[#FAF8F2] transition-colors">
                  DC Excel Spreadsheet
                </a>
              </li>
              <li>
                <a href="/projects/dc-word" className="hover:text-[#FAF8F2] transition-colors">
                  DC Word Document
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Connect & Resume */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#FF604A] mb-4">
              CONNECT
            </h3>
            <div className="flex flex-col space-y-3">
              <a
                href={OWNER_INFO.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-[#A09D96] hover:text-[#FF604A] transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub Profile</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>

              <a
                href={OWNER_INFO.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-[#A09D96] hover:text-[#FF604A] transition-colors"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LinkedIn Connect</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>

              <a
                href={`mailto:${OWNER_INFO.social.email}`}
                className="inline-flex items-center gap-2 text-xs text-[#A09D96] hover:text-[#FF604A] transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>{OWNER_INFO.social.email}</span>
              </a>

              <button
                onClick={onResumeClick}
                className="inline-flex items-center gap-2 text-xs text-[#FF604A] font-semibold hover:underline pt-2 text-left"
              >
                <FileText className="w-4 h-4" />
                <span>Inspect Resume</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#77746F]">
          <div>
            © {currentYear} {OWNER_INFO.fullName}. All rights reserved.
          </div>
          <div className="flex items-center gap-3">
            <span>Hyderabad, Telangana, India</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF604A]" />
            <span>Built with React & TypeScript</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
