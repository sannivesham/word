import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Building2 } from 'lucide-react';
import { PROJECTS } from '../../data/projects';
import type { Project } from '../../data/projects';
import { SectionHeading } from '../common/SectionHeading';
import { useCursor } from '../../context/CursorContext';

export const ProjectsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'independent' | 'organisational'>('all');
  const { setCursor, resetCursor } = useCursor();
  const navigate = useNavigate();

  const independentProjects = PROJECTS.filter((p) => p.category === 'independent');
  const organisationalProjects = PROJECTS.filter((p) => p.category === 'organisational');

  return (
    <section id="projects" className="relative py-28 md:py-36 px-6 sm:px-10 md:px-16 bg-[#F7F5F0]">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          number="04"
          category="PORTFOLIO & ARCHITECTURE"
          title="PRODUCTION SYSTEMS, INDEPENDENT VENTURES & CLIENT PLATFORMS."
          subtitle="A structured showcase of proprietary software applications, cultural digital platforms, and tailored organisational web solutions."
        />

        {/* Category Filter Controls */}
        <div className="flex flex-wrap items-center gap-3 mb-14">
          <button
            onClick={() => setActiveFilter('all')}
            onMouseEnter={() => setCursor('hover')}
            onMouseLeave={resetCursor}
            className={`px-5 py-2.5 rounded-full text-xs font-display font-semibold transition-all ${
              activeFilter === 'all'
                ? 'bg-[#181818] text-[#F7F5F0]'
                : 'bg-[#FFFFFF] text-[#242424] border border-[#E4E0D8] hover:border-[#FF604A]'
            }`}
          >
            All Work ({PROJECTS.length})
          </button>

          <button
            onClick={() => setActiveFilter('independent')}
            onMouseEnter={() => setCursor('hover')}
            onMouseLeave={resetCursor}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-display font-semibold transition-all ${
              activeFilter === 'independent'
                ? 'bg-[#181818] text-[#F7F5F0]'
                : 'bg-[#FFFFFF] text-[#242424] border border-[#E4E0D8] hover:border-[#FF604A]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FF604A]" />
            <span>Independent Ventures ({independentProjects.length})</span>
          </button>

          <button
            onClick={() => setActiveFilter('organisational')}
            onMouseEnter={() => setCursor('hover')}
            onMouseLeave={resetCursor}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-display font-semibold transition-all ${
              activeFilter === 'organisational'
                ? 'bg-[#181818] text-[#F7F5F0]'
                : 'bg-[#FFFFFF] text-[#242424] border border-[#E4E0D8] hover:border-[#FF604A]'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-[#FF604A]" />
            <span>Built for Others ({organisationalProjects.length})</span>
          </button>
        </div>

        {/* Category A Header if viewing all or independent */}
        {(activeFilter === 'all' || activeFilter === 'independent') && (
          <div className="mb-8 pb-4 border-b border-[#E4E0D8] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF604A]" />
              <h3 className="font-display font-bold text-lg md:text-xl text-[#181818]">
                CATEGORY A: INDEPENDENT PRODUCTS AND VENTURES
              </h3>
            </div>
            <span className="font-mono text-xs text-[#77746F]">DAMAYANTI CREST ECOSYSTEM</span>
          </div>
        )}

        {/* Independent Projects Grid */}
        {(activeFilter === 'all' || activeFilter === 'independent') && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {independentProjects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={idx}
                onSelect={() => navigate(`/projects/${project.slug}`)}
              />
            ))}
          </div>
        )}

        {/* Category B Header if viewing all or organisational */}
        {(activeFilter === 'all' || activeFilter === 'organisational') && (
          <>
            <div className="mb-8 pb-4 border-b border-[#E4E0D8] flex items-center justify-between pt-6">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#181818]" />
                <h3 className="font-display font-bold text-lg md:text-xl text-[#181818]">
                  CATEGORY B: BUILT FOR OTHERS. DESIGNED TO MAKE AN IMPACT.
                </h3>
              </div>
              <span className="font-mono text-xs text-[#77746F]">ORGANISATIONAL CLIENT WORK</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {organisationalProjects.map((project, idx) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={idx + 4}
                  compact
                  onSelect={() => navigate(`/projects/${project.slug}`)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: Project;
  index: number;
  compact?: boolean;
  onSelect: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, compact = false, onSelect }) => {
  const { setCursor, resetCursor } = useCursor();

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onClick={onSelect}
      onMouseEnter={() => setCursor('view', 'VIEW')}
      onMouseLeave={resetCursor}
      className={`rounded-3xl bg-[#FFFFFF] border border-[#E4E0D8] p-7 md:p-9 cursor-pointer transition-all duration-300 hover:border-[#FF604A] hover:shadow-xl hover:shadow-[#181818]/5 flex flex-col justify-between group relative overflow-hidden ${
        compact ? 'min-h-[380px]' : 'min-h-[440px]'
      }`}
    >
      {/* Top Card Bar */}
      <div>
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E4E0D8]/70">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-[#FF604A]">
              PROJECT 0{index + 1}
            </span>
            <span className="text-[#E4E0D8]">•</span>
            <span className="font-mono text-[10px] text-[#77746F] uppercase">
              {project.status}
            </span>
          </div>

          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#F0EEE8] text-[#242424]">
            {project.category === 'independent' ? 'Venture' : 'Client Platform'}
          </span>
        </div>

        {/* Project Title & Tagline */}
        <h4 className="font-display font-extrabold text-2xl md:text-3xl text-[#181818] mb-2 group-hover:text-[#FF604A] transition-colors">
          {project.title}
        </h4>

        <p className="font-sans text-xs md:text-sm text-[#FF604A] font-semibold mb-3">
          {project.categoryLabel}
        </p>

        <p className="font-sans text-xs md:text-sm text-[#77746F] leading-relaxed line-clamp-3 mb-6">
          {project.description}
        </p>
      </div>

      {/* Card Bottom: Tech Pills & View CTA */}
      <div className="pt-6 border-t border-[#E4E0D8]/70">
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.slice(0, compact ? 3 : 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#F0EEE8] text-[#242424]"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > (compact ? 3 : 4) && (
            <span className="px-1.5 py-0.5 text-[10px] font-mono text-[#77746F]">
              +{project.technologies.length - (compact ? 3 : 4)}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between font-display text-xs font-bold text-[#181818] group-hover:text-[#FF604A] transition-colors">
          <span className="tracking-wider uppercase">View Case Study</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
        </div>
      </div>
    </motion.div>
  );
};
