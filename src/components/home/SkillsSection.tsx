import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SKILL_CATEGORIES } from '../../data/skills';
import { SectionHeading } from '../common/SectionHeading';
import { useCursor } from '../../context/CursorContext';
import { Code, Terminal, Database, Smartphone, Wrench, Cpu, CheckCircle } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');
  const [activeSkillHover, setActiveSkillHover] = useState<string | null>(null);
  const { setCursor, resetCursor } = useCursor();

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'programming': return <Terminal className="w-4 h-4" />;
      case 'frontend': return <Code className="w-4 h-4" />;
      case 'backend': return <Database className="w-4 h-4" />;
      case 'app-dev': return <Smartphone className="w-4 h-4" />;
      case 'dev-tools': return <Wrench className="w-4 h-4" />;
      case 'hardware': return <Cpu className="w-4 h-4" />;
      default: return <Code className="w-4 h-4" />;
    }
  };

  const filteredCategories = selectedCategoryId === 'all'
    ? SKILL_CATEGORIES
    : SKILL_CATEGORIES.filter(c => c.id === selectedCategoryId);

  return (
    <section id="skills" className="relative py-28 md:py-36 px-6 sm:px-10 md:px-16 bg-[#F0EEE8] border-t border-[#E4E0D8]">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          number="03"
          category="TECHNICAL PROFICIENCY"
          title="ENGINEERING CAPABILITIES ACROSS HARDWARE & SOFTWARE."
          subtitle="Honest, demonstrated technical capabilities spanning software development, mobile platforms, and embedded microcontrollers."
        />

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedCategoryId('all')}
              onMouseEnter={() => setCursor('hover')}
              onMouseLeave={resetCursor}
              className={`px-4 py-2 rounded-full text-xs font-display font-semibold transition-all ${
                selectedCategoryId === 'all'
                  ? 'bg-[#181818] text-[#F7F5F0]'
                  : 'bg-[#FFFFFF] text-[#242424] border border-[#E4E0D8] hover:border-[#FF604A]'
              }`}
            >
              All Disciplines ({SKILL_CATEGORIES.length})
            </button>

            {SKILL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategoryId(cat.id)}
                onMouseEnter={() => setCursor('hover')}
                onMouseLeave={resetCursor}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-display font-semibold transition-all ${
                  selectedCategoryId === cat.id
                    ? 'bg-[#181818] text-[#F7F5F0]'
                    : 'bg-[#FFFFFF] text-[#242424] border border-[#E4E0D8] hover:border-[#FF604A]'
                }`}
              >
                {getCategoryIcon(cat.id)}
                <span>{cat.title}</span>
              </button>
            ))}
          </div>

          {/* Active Skill Inspector Pill */}
          {activeSkillHover && (
            <div className="px-3.5 py-1.5 rounded-full bg-[#181818] text-[#F7F5F0] text-xs font-mono hidden md:flex items-center gap-2 animate-fadeIn">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF604A]" />
              <span>Inspecting: {activeSkillHover}</span>
            </div>
          )}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((cat) => (
              <motion.div
                key={cat.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="p-7 rounded-2xl bg-[#FFFFFF] border border-[#E4E0D8] shadow-xs flex flex-col justify-between hover:border-[#FF604A]/60 transition-all duration-300 group"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E4E0D8]">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#F7F5F0] border border-[#E4E0D8] flex items-center justify-center text-[#FF604A]">
                        {getCategoryIcon(cat.id)}
                      </div>
                      <span className="font-mono text-xs font-bold text-[#FF604A]">
                        {cat.number}
                      </span>
                    </div>
                    <span className="font-mono text-[11px] text-[#77746F] uppercase">
                      {cat.subtitle}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-[#181818] mb-2 group-hover:text-[#FF604A] transition-colors">
                    {cat.title}
                  </h3>

                  <p className="font-sans text-xs text-[#77746F] leading-relaxed mb-6">
                    {cat.description}
                  </p>

                  {/* Skills List */}
                  <div className="space-y-3">
                    {cat.skills.map((skill) => (
                      <div
                        key={skill.name}
                        onMouseEnter={() => {
                          setActiveSkillHover(skill.name);
                          setCursor('hover');
                        }}
                        onMouseLeave={() => {
                          setActiveSkillHover(null);
                          resetCursor();
                        }}
                        className="p-3 rounded-xl bg-[#F7F5F0] border border-[#E4E0D8]/70 hover:border-[#FF604A] transition-all cursor-default"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-display font-semibold text-xs text-[#181818]">
                            {skill.name}
                          </span>
                          <div className="flex items-center gap-1">
                            {skill.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-[#E4E0D8] text-[#242424]"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <p className="font-sans text-[11px] text-[#77746F]">
                          {skill.levelDesc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Verification Note */}
                <div className="mt-6 pt-4 border-t border-[#E4E0D8] flex items-center justify-between font-mono text-[10px] text-[#77746F]">
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-[#FF604A]" />
                    Practically Demonstrated
                  </span>
                  <span>SNIST // DC LABS</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
