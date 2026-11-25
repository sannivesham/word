import React from 'react';
import { motion } from 'framer-motion';
import { ACTIVITIES } from '../../data/achievements';
import { SectionHeading } from '../common/SectionHeading';
import { Bot, Cpu, Rocket, Users, CheckCircle } from 'lucide-react';
import { useCursor } from '../../context/CursorContext';

export const AchievementsSection: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();

  const getActivityIcon = (category: string) => {
    switch (category) {
      case 'Robotics & Hardware': return <Bot className="w-5 h-5 text-[#FF604A]" />;
      case 'Academic Foundation': return <Cpu className="w-5 h-5 text-[#242424]" />;
      case 'Product Development': return <Rocket className="w-5 h-5 text-[#FF604A]" />;
      case 'Community Engineering': return <Users className="w-5 h-5 text-[#242424]" />;
      default: return <CheckCircle className="w-5 h-5 text-[#FF604A]" />;
    }
  };

  return (
    <section className="relative py-28 md:py-36 px-6 sm:px-10 md:px-16 bg-[#F7F5F0]">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          number="07"
          category="ACTIVITIES & ENGAGEMENT"
          title="VERIFIED ENGAGEMENTS, TECHNICAL CLUBS & INNOVATION."
          subtitle="Direct involvement in robotics engineering, academic electronics foundations, and independent venture architecture."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ACTIVITIES.map((act, index) => (
            <motion.div
              key={act.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setCursor('hover')}
              onMouseLeave={resetCursor}
              className="p-8 rounded-3xl bg-[#FFFFFF] border border-[#E4E0D8] shadow-xs hover:border-[#FF604A] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E4E0D8]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#F0EEE8] border border-[#E4E0D8] flex items-center justify-center">
                      {getActivityIcon(act.category)}
                    </div>
                    <span className="font-mono text-xs uppercase tracking-wider text-[#FF604A] font-bold">
                      {act.category}
                    </span>
                  </div>

                  <span className="font-mono text-[10px] text-[#77746F]">
                    VERIFIED ACTIVITY
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl text-[#181818] mb-1">
                  {act.title}
                </h3>

                <p className="font-sans text-xs font-semibold text-[#77746F] mb-4">
                  {act.organisation}
                </p>

                <p className="font-sans text-xs md:text-sm text-[#77746F] leading-relaxed mb-6">
                  {act.description}
                </p>

                {/* Highlights */}
                <div className="space-y-2 mb-6">
                  {act.highlights.map((item, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2 text-xs font-sans text-[#242424]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF604A] shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Focus Badge */}
              <div className="pt-4 border-t border-[#E4E0D8] flex items-center justify-between font-mono text-[11px]">
                <span className="text-[#77746F]">Core Focus</span>
                <span className="font-semibold text-[#181818]">{act.focus}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
