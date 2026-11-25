import React from 'react';
import { motion } from 'framer-motion';
import { MILESTONES } from '../../data/experience';
import { SectionHeading } from '../common/SectionHeading';
import { Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { useCursor } from '../../context/CursorContext';

export const ExperienceSection: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();

  return (
    <section id="experience" className="relative py-28 md:py-36 px-6 sm:px-10 md:px-16 bg-[#F0EEE8] border-t border-[#E4E0D8]">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          number="05"
          category="PRACTICAL ENGAGEMENT"
          title="CHRONOLOGY OF PRODUCT CREATION & TECHNICAL MILESTONES."
          subtitle="A transparent record of independent product launches, organizational digital systems, and embedded engineering projects."
        />

        {/* Timeline Structure */}
        <div className="relative mt-16">
          {/* Vertical Center/Side Guide Line */}
          <div className="absolute top-0 bottom-0 left-4 md:left-1/2 w-[1px] bg-[#E4E0D8] -translate-x-1/2 hidden sm:block" />

          <div className="space-y-12">
            {MILESTONES.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={item.entity}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Central Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#FFFFFF] border-4 border-[#FF604A] z-10 hidden sm:block shadow-xs" />

                  {/* Empty Side for balance */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Content Card */}
                  <div
                    onMouseEnter={() => setCursor('hover')}
                    onMouseLeave={resetCursor}
                    className={`w-full md:w-1/2 ${
                      isEven ? 'md:pr-12' : 'md:pl-12'
                    }`}
                  >
                    <div className="p-7 md:p-8 rounded-3xl bg-[#FFFFFF] border border-[#E4E0D8] shadow-xs hover:border-[#FF604A] transition-all duration-300">
                      {/* Period & Category Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-[#E4E0D8]">
                        <span className="inline-flex items-center gap-1.5 font-mono text-xs text-[#FF604A] font-bold">
                          <Calendar className="w-3.5 h-3.5" />
                          {item.period}
                        </span>

                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-[#F0EEE8] text-[#242424]">
                          {item.category === 'independent' ? 'Independent Product' : item.category === 'organisational' ? 'Client Platform' : 'Academic Foundation'}
                        </span>
                      </div>

                      {/* Role & Entity */}
                      <h3 className="font-display font-bold text-xl text-[#181818] mb-1">
                        {item.role}
                      </h3>

                      <div className="flex items-center gap-2 text-xs font-mono text-[#77746F] mb-4">
                        <span className="font-semibold text-[#181818]">{item.entity}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#FF604A]" />
                          {item.location}
                        </span>
                      </div>

                      {/* Summary */}
                      <p className="font-sans text-xs md:text-sm text-[#77746F] leading-relaxed mb-5">
                        {item.summary}
                      </p>

                      {/* Deliverables Bullet List */}
                      <div className="space-y-2 mb-6">
                        {item.deliverables.map((deliv, dIdx) => (
                          <div key={dIdx} className="flex items-start gap-2 text-xs font-sans text-[#242424]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FF604A] shrink-0 mt-0.5" />
                            <span>{deliv}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Chips */}
                      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#E4E0D8]">
                        {item.technologies.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#F7F5F0] text-[#77746F] border border-[#E4E0D8]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
