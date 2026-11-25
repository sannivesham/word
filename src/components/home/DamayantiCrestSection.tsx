import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Compass, BookOpen, Flame, Cpu, ExternalLink } from 'lucide-react';
import { ECOSYSTEM_DIVISIONS, DAMAYANTI_INFO } from '../../data/ecosystem';
import { MagneticButton } from '../common/MagneticButton';
import { useCursor } from '../../context/CursorContext';

export const DamayantiCrestSection: React.FC = () => {
  const [activeDivision, setActiveDivision] = useState<string>('technologies');
  const { setCursor, resetCursor } = useCursor();
  const navigate = useNavigate();

  const getDivisionIcon = (id: string) => {
    switch (id) {
      case 'technologies': return <Cpu className="w-5 h-5 text-[#FF604A]" />;
      case 'heritage': return <Compass className="w-5 h-5 text-[#C5A15D]" />;
      case 'publications': return <BookOpen className="w-5 h-5 text-[#9C7A3C]" />;
      case 'traditions': return <Flame className="w-5 h-5 text-[#C07D38]" />;
      default: return <Cpu className="w-5 h-5" />;
    }
  };

  const selectedDivision = ECOSYSTEM_DIVISIONS.find((d) => d.id === activeDivision) || ECOSYSTEM_DIVISIONS[0];

  return (
    <section id="damayanti-crest" className="relative py-28 md:py-36 px-6 sm:px-10 md:px-16 bg-[#181818] text-[#F7F5F0] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C5A15D]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 mb-16 border-b border-[#2C2C2C]">
          <div>
            <div className="flex items-center gap-3 font-mono text-xs text-[#C5A15D] tracking-widest uppercase mb-3">
              <span className="text-[#FF604A] font-bold">[06]</span>
              <span>INDEPENDENT ECOSYSTEM</span>
              <span className="w-12 h-[1px] bg-[#333333]" />
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#FAF8F2] leading-[1.08]">
              BUILDING BEYOND PROJECTS.
            </h2>
          </div>

          <div className="max-w-md">
            <p className="font-sans text-sm md:text-base text-[#A09D96] leading-relaxed">
              Creating a technology ecosystem where ideas become products, platforms and experiences.
            </p>
          </div>
        </div>

        {/* Ecosystem Overview & Interactive 4-Division Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          {/* Left: 5 Cols Division Selectors */}
          <div className="lg:col-span-5 space-y-3">
            <span className="font-mono text-xs tracking-widest text-[#77746F] uppercase block mb-4">
              SELECT AN OPERATIONAL DIVISION
            </span>

            {ECOSYSTEM_DIVISIONS.map((division) => {
              const isActive = division.id === activeDivision;
              return (
                <div
                  key={division.id}
                  onClick={() => setActiveDivision(division.id)}
                  onMouseEnter={() => setCursor('hover')}
                  onMouseLeave={resetCursor}
                  className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between ${
                    isActive
                      ? 'bg-[#252525] border-[#C5A15D] shadow-lg'
                      : 'bg-[#1E1E1E] border-[#2C2C2C] hover:border-[#444444]'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#181818] border border-[#333333] flex items-center justify-center">
                      {getDivisionIcon(division.id)}
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm text-[#FAF8F2]">
                        {division.name}
                      </h4>
                      <p className="font-sans text-[11px] text-[#77746F]">
                        {division.tagline}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`w-2 h-2 rounded-full ${
                      isActive ? 'bg-[#FF604A]' : 'bg-[#333333]'
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* Right: 7 Cols Dynamic Visual & Division Deep-Dive */}
          <div className="lg:col-span-7">
            <motion.div
              key={selectedDivision.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="p-8 md:p-10 rounded-3xl bg-[#202020] border border-[#333333] shadow-2xl relative overflow-hidden"
            >
              {/* Division Header */}
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#2C2C2C]">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#181818] border border-[#333333] flex items-center justify-center">
                    {getDivisionIcon(selectedDivision.id)}
                  </div>
                  <div>
                    <span className="font-mono text-xs uppercase tracking-widest text-[#C5A15D]">
                      DAMAYANTI CREST PILLAR
                    </span>
                    <h3 className="font-display font-extrabold text-2xl text-[#FAF8F2]">
                      {selectedDivision.name}
                    </h3>
                  </div>
                </div>

                <span className="font-mono text-xs text-[#77746F]">
                  ACTIVE INITIATIVE
                </span>
              </div>

              {/* Description */}
              <p className="font-sans text-sm md:text-base text-[#C0BDB6] leading-relaxed mb-8">
                {selectedDivision.description}
              </p>

              {/* Key Initiatives */}
              <div className="mb-8">
                <span className="font-mono text-xs uppercase tracking-widest text-[#77746F] block mb-3">
                  KEY INITIATIVES & ARTIFACTS
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedDivision.keyInitiatives.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-[#181818] border border-[#2E2E2E] flex items-center gap-2 text-xs font-sans text-[#FAF8F2]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF604A] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-[#2C2C2C] flex flex-wrap items-center justify-between gap-4">
                <MagneticButton
                  variant="primary"
                  onClick={() => navigate('/projects/damayanti-crest')}
                  cursorText="EXPLORE"
                  className="px-6 py-3 text-xs"
                >
                  <span>EXPLORE DAMAYANTI CREST</span>
                  <ArrowRight className="w-4 h-4" />
                </MagneticButton>

                <a
                  href="https://damayanti-technologies.github.io/damayanti-crest/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-[#A09D96] hover:text-[#C5A15D] transition-colors"
                >
                  <span>Official Corporate Web Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom 3 Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-[#2C2C2C]">
          {DAMAYANTI_INFO.principles.map((pr, pIdx) => (
            <div key={pIdx} className="p-6 rounded-2xl bg-[#1E1E1E] border border-[#2A2A2A]">
              <span className="font-mono text-xs text-[#FF604A] font-bold block mb-2">
                PRINCIPLE 0{pIdx + 1}
              </span>
              <h4 className="font-display font-bold text-base text-[#FAF8F2] mb-2">
                {pr.title}
              </h4>
              <p className="font-sans text-xs text-[#77746F] leading-relaxed">
                {pr.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
