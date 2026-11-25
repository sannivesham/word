import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, FileText } from 'lucide-react';
import { NAV_ITEMS, OWNER_INFO } from '../../data/navigation';
import { useCursor } from '../../context/CursorContext';

interface NavbarProps {
  onResumeClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onResumeClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setCursor, resetCursor } = useCursor();
  const location = useLocation();

  const isCaseStudy = location.pathname.startsWith('/projects');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Section detection on home page
      if (location.pathname === '/' || location.pathname === '') {
        const sections = ['hero', 'about', 'skills', 'projects', 'damayanti-crest', 'experience', 'contact'];
        for (const section of sections) {
          const el = document.getElementById(section);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 200 && rect.bottom >= 200) {
              setActiveSection(section);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (href.startsWith('/#')) {
      if (location.pathname !== '/') {
        window.location.href = href;
        return;
      }
      const id = href.replace('/#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Adaptive theme colors when on dark case-study hero vs off-white home
  const isDarkNavbar = isCaseStudy && !isScrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-4 sm:px-8 md:px-12 ${
          isScrolled
            ? 'bg-[#F7F5F0]/90 backdrop-blur-md border-b border-[#E4E0D8]/80 shadow-sm py-3.5'
            : isDarkNavbar
            ? 'bg-[#181818]/60 backdrop-blur-md border-b border-white/10 py-3.5 text-white'
            : 'bg-transparent text-[#242424]'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Brand Monogram & Name */}
          <a
            href="/#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('/#hero');
            }}
            onMouseEnter={() => setCursor('hover')}
            onMouseLeave={resetCursor}
            className="flex items-center gap-3 group focus-visible:outline-none"
            aria-label="Reshwanth Reddy Homepage"
          >
            <div className="w-10 h-10 rounded-xl bg-[#181818] text-[#F7F5F0] border border-white/20 flex items-center justify-center font-display font-bold text-sm tracking-tight transition-transform duration-300 group-hover:scale-105 shadow-sm relative">
              <span>{OWNER_INFO.monogram}</span>
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#FF604A]" />
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span
                className={`font-display font-bold text-sm tracking-tight transition-colors group-hover:text-[#FF604A] ${
                  isDarkNavbar ? 'text-white' : 'text-[#181818]'
                }`}
              >
                {OWNER_INFO.displayName}
              </span>
              <span
                className={`text-[11px] font-sans tracking-wide ${
                  isDarkNavbar ? 'text-white/60' : 'text-[#77746F]'
                }`}
              >
                Developer & Founder
              </span>
            </div>
          </a>

          {/* Center: Desktop Navigation Pills */}
          <nav
            className={`hidden lg:flex items-center gap-1 px-2 py-1.5 rounded-full backdrop-blur-md shadow-xs border ${
              isDarkNavbar
                ? 'bg-white/10 border-white/15 text-white'
                : 'bg-[#FFFFFF]/70 border-[#E4E0D8] text-[#242424]'
            }`}
          >
            {NAV_ITEMS.map((item) => {
              const sectionId = item.href.replace('/#', '');
              const isActive = !isCaseStudy && activeSection === sectionId;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  onMouseEnter={() => setCursor('hover')}
                  onMouseLeave={resetCursor}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-display font-medium tracking-wide transition-all duration-200 ${
                    isActive
                      ? 'text-[#F7F5F0]'
                      : isDarkNavbar
                      ? 'text-white/80 hover:text-[#FF604A]'
                      : 'text-[#242424] hover:text-[#FF604A]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavBackground"
                      className="absolute inset-0 bg-[#181818] rounded-full -z-10"
                      transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                    />
                  )}
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right: CTA & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            {/* Resume button */}
            <button
              onClick={onResumeClick}
              onMouseEnter={() => setCursor('hover')}
              onMouseLeave={resetCursor}
              className={`hidden sm:inline-flex items-center gap-1.5 text-xs font-display font-semibold px-4 py-2 rounded-full border transition-colors shadow-xs ${
                isDarkNavbar
                  ? 'border-white/20 bg-white/10 text-white hover:border-[#FF604A] hover:text-[#FF604A]'
                  : 'border-[#E4E0D8] bg-[#FFFFFF]/80 hover:border-[#FF604A] hover:text-[#FF604A] text-[#242424]'
              }`}
              aria-label="View or download resume"
            >
              <FileText className="w-3.5 h-3.5 text-[#FF604A]" />
              <span>Resume</span>
            </button>

            {/* Contact Quick Button */}
            <a
              href="/#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('/#contact');
              }}
              onMouseEnter={() => setCursor('hover')}
              onMouseLeave={resetCursor}
              className="inline-flex items-center gap-1.5 text-xs font-display font-semibold px-4 py-2 rounded-full bg-[#FF604A] text-white hover:bg-[#E84E38] transition-all shadow-sm hover:shadow-md hover:shadow-[#FF604A]/20"
            >
              <span>Let's Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-xl transition-colors focus-visible:outline-none ${
                isDarkNavbar
                  ? 'text-white hover:bg-white/10'
                  : 'text-[#242424] hover:bg-[#E4E0D8]/40'
              }`}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#181818] text-[#F7F5F0] flex flex-col justify-between p-8 pt-28 lg:hidden"
          >
            {/* Navigation links */}
            <div className="flex flex-col space-y-6">
              <span className="font-mono text-xs text-[#77746F] tracking-widest uppercase">
                INDEX / NAVIGATION
              </span>
              {NAV_ITEMS.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index }}
                  className="font-display text-3xl font-bold tracking-tight text-[#FAF8F2] hover:text-[#FF604A] flex items-center justify-between group"
                >
                  <span>{item.label}</span>
                  <span className="text-xs font-mono text-[#77746F] group-hover:text-[#FF604A]">
                    0{index + 1}
                  </span>
                </motion.a>
              ))}
            </div>

            {/* Footer inside mobile menu */}
            <div className="pt-8 border-t border-[#2A2A2A] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-sans text-[#77746F]">
              <div>
                <p className="font-semibold text-[#FAF8F2]">{OWNER_INFO.fullName}</p>
                <p>SNIST ECE • Hyderabad, India</p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onResumeClick) onResumeClick();
                  }}
                  className="text-[#FF604A] font-semibold flex items-center gap-1"
                >
                  <FileText className="w-3.5 h-3.5" />
                  View Resume
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
