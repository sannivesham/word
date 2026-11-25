import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { PROJECTS } from '../../data/projects';
import { useCursor } from '../../context/CursorContext';
import { useNavigate } from 'react-router-dom';

export const HorizontalShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setCursor, resetCursor } = useCursor();
  const navigate = useNavigate();

  // Scroll tracking within this container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Transform vertical scroll to horizontal translation
  // 4 featured independent projects in horizontal sequence
  const featuredProjects = PROJECTS.filter((p) => p.featured);
  const x = useTransform(scrollYProgress, [0, 1], ['0%', `-${(featuredProjects.length - 1) * 75}%`]);

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-[#181818] text-[#F7F5F0]">
      {/* Sticky viewport frame */}
      <div className="sticky top-0 h-screen flex flex-col justify-between overflow-hidden py-10 px-6 sm:px-10 md:px-16">
        {/* Top Header Row inside Sticky Viewport */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between pb-4 border-b border-[#2C2C2C] relative z-20">
          <div className="flex items-center gap-3 font-mono text-xs text-[#FF604A] tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#FF604A] animate-ping" />
            <span>04 / HORIZONTAL REVEAL</span>
            <span className="hidden sm:inline text-[#77746F]">|</span>
            <span className="hidden sm:inline text-[#77746F]">INDEPENDENT PRODUCTS & VENTURES</span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-[#77746F]">
            <span>SCROLL VERTICALLY TO PAN</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#FF604A]" />
          </div>
        </div>

        {/* Horizontal Track */}
        <div className="relative my-auto w-full overflow-hidden py-6">
          <motion.div style={{ x }} className="flex gap-8 sm:gap-12 w-max items-center">
            {featuredProjects.map((project, idx) => (
              <div
                key={project.id}
                onClick={() => navigate(`/projects/${project.slug}`)}
                onMouseEnter={() => setCursor('view', 'VIEW')}
                onMouseLeave={resetCursor}
                className="w-[85vw] sm:w-[650px] md:w-[750px] lg:w-[820px] rounded-3xl bg-[#202020] border border-[#333333] p-8 md:p-12 cursor-pointer transition-all duration-300 hover:border-[#FF604A] group shadow-2xl relative overflow-hidden shrink-0"
              >
                {/* Background accent glow */}
                <div
                  className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
                  style={{ backgroundColor: project.heroTheme.accent }}
                />

                {/* Top card metadata */}
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#2D2D2D] relative z-10">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-2xl md:text-3xl font-extrabold text-[#FF604A]">
                      0{idx + 1}
                    </span>
                    <span className="w-8 h-[1px] bg-[#333333]" />
                    <span className="font-mono text-xs uppercase tracking-widest text-[#A09D96]">
                      {project.categoryLabel}
                    </span>
                  </div>

                  {project.highlightStat && (
                    <div className="text-right font-mono text-xs">
                      <span className="text-[#FF604A] font-bold block">
                        {project.highlightStat.value}
                      </span>
                      <span className="text-[#77746F] text-[10px]">
                        {project.highlightStat.label}
                      </span>
                    </div>
                  )}
                </div>

                {/* Center Content: Title & Tagline */}
                <div className="relative z-10 space-y-4 mb-8">
                  <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#FAF8F2] group-hover:text-[#FF604A] transition-colors">
                    {project.title}
                  </h3>

                  <p className="font-sans text-sm md:text-base text-[#C0BDB6] max-w-2xl leading-relaxed">
                    {project.tagline}
                  </p>

                  <p className="font-sans text-xs md:text-sm text-[#77746F] max-w-xl line-clamp-2">
                    {project.description}
                  </p>
                </div>

                {/* Bottom Row: Technologies & View Case Study Button */}
                <div className="relative z-10 pt-6 border-t border-[#2D2D2D] flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-[#282828] text-[#D5D2CB] border border-[#3A3A3A]"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-1 text-[11px] font-mono text-[#77746F]">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>

                  <div className="inline-flex items-center gap-2 text-xs font-display font-bold uppercase tracking-wider text-[#FF604A] group-hover:translate-x-1 transition-transform">
                    <span>EXPLORE CASE STUDY</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Progress Bar inside Sticky Viewport */}
        <div className="max-w-7xl mx-auto w-full pt-4 border-t border-[#2C2C2C] flex items-center justify-between font-mono text-xs text-[#77746F] relative z-20">
          <span>PROJECT CATALOGUE</span>
          <div className="w-36 h-1 bg-[#2C2C2C] rounded-full overflow-hidden">
            <motion.div
              style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
              className="h-full bg-[#FF604A]"
            />
          </div>
          <span>CASE STUDIES AVAILABLE</span>
        </div>
      </div>
    </div>
  );
};
