import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ExternalLink, Download, Layers } from 'lucide-react';
import { getProjectBySlug, PROJECTS } from '../data/projects';
import { MagneticButton } from '../components/common/MagneticButton';
import { useCursor } from '../context/CursorContext';

export const CaseStudy: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { setCursor, resetCursor } = useCursor();

  const project = getProjectBySlug(slug || '');

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#F7F5F0] flex flex-col items-center justify-center p-8 text-center">
        <h1 className="font-display font-extrabold text-4xl text-[#181818] mb-4">
          Case Study Not Found
        </h1>
        <p className="font-sans text-sm text-[#77746F] mb-8">
          The requested project record could not be retrieved from the architecture registry.
        </p>
        <MagneticButton variant="primary" onClick={() => navigate('/#projects')}>
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Showcase</span>
        </MagneticButton>
      </div>
    );
  }

  // Calculate Next Project
  const currentIndex = PROJECTS.findIndex((p) => p.id === project.id);
  const nextIndex = (currentIndex + 1) % PROJECTS.length;
  const nextProject = PROJECTS[nextIndex];

  return (
    <article className="min-h-screen bg-[#F7F5F0] text-[#242424]">
      {/* Dynamic Themed Hero */}
      <header
        style={{
          backgroundColor: project.heroTheme.bg,
          color: project.heroTheme.text,
          borderBottom: `1px solid ${project.heroTheme.subtleBorder}`
        }}
        className="relative pt-28 pb-20 px-6 sm:px-10 md:px-16 transition-colors duration-500 overflow-hidden"
      >
        {/* Ambient background glow */}
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: project.heroTheme.accent }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Back Navigation Bar */}
          <div className="flex items-center justify-between pb-8 mb-8 border-b border-white/10">
            <Link
              to="/#projects"
              onMouseEnter={() => setCursor('hover')}
              onMouseLeave={resetCursor}
              className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase hover:text-[#FF604A] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Work</span>
            </Link>

            <span className="font-mono text-xs opacity-60 uppercase">
              PROJECT 0{project.order} / 0{PROJECTS.length}
            </span>
          </div>

          {/* Project Category & Status Pill */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span
              style={{
                borderColor: project.heroTheme.accent,
                color: project.heroTheme.accent
              }}
              className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider border font-bold"
            >
              {project.categoryLabel}
            </span>

            <span className="px-3 py-1 rounded-full text-xs font-mono uppercase bg-white/10 text-white/80">
              {project.status}
            </span>

            {project.highlightStat && (
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/10 text-white/90">
                {project.highlightStat.value} • {project.highlightStat.label}
              </span>
            )}
          </div>

          {/* Project Title */}
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.05]">
            {project.title}
          </h1>

          {/* Tagline */}
          <p className="font-sans text-lg sm:text-xl md:text-2xl opacity-90 max-w-3xl leading-relaxed mb-10 font-light">
            {project.tagline}
          </p>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/10 text-xs font-mono">
            <div>
              <span className="opacity-50 block mb-1 uppercase tracking-wider">DEVELOPER ROLE</span>
              <span className="font-semibold">{project.role}</span>
            </div>

            <div>
              <span className="opacity-50 block mb-1 uppercase tracking-wider">CLASSIFICATION</span>
              <span className="font-semibold">
                {project.category === 'independent' ? 'Proprietary Venture' : 'Client Solution'}
              </span>
            </div>

            <div>
              <span className="opacity-50 block mb-1 uppercase tracking-wider">PRIMARY STACK</span>
              <span className="font-semibold">{project.technologies.slice(0, 2).join(', ')}</span>
            </div>

            <div>
              <span className="opacity-50 block mb-1 uppercase tracking-wider">LIVE STATUS</span>
              <span className="font-semibold flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: project.isExternalLinkLive ? '#10B981' : '#F59E0B' }}
                />
                {project.isExternalLinkLive ? 'Live Deployment' : 'Active Local Build'}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Case Study Content Body */}
      <main className="py-20 md:py-28 px-6 sm:px-10 md:px-16 max-w-7xl mx-auto space-y-20">
        {/* 1. Project Overview & Narrative */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 font-mono text-xs uppercase tracking-widest text-[#77746F]">
            [01] SYSTEM OVERVIEW
          </div>
          <div className="lg:col-span-8">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-[#181818] mb-6">
              Engineering Architecture & Context
            </h2>
            <p className="font-sans text-base md:text-lg text-[#242424] leading-relaxed mb-6 font-light">
              {project.fullOverview}
            </p>
            <div className="flex flex-wrap gap-2 pt-4">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg text-xs font-mono bg-[#FFFFFF] border border-[#E4E0D8] text-[#181818]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* 2. Problem vs Proposed Solution */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Objective / Problem */}
          <div className="p-8 rounded-3xl bg-[#FFFFFF] border border-[#E4E0D8] shadow-xs">
            <span className="font-mono text-xs text-[#FF604A] uppercase tracking-widest font-bold block mb-3">
              [02] THE OBJECTIVE & CHALLENGE
            </span>
            <h3 className="font-display font-bold text-xl text-[#181818] mb-4">
              Problem Definition
            </h3>
            <p className="font-sans text-sm text-[#77746F] leading-relaxed">
              {project.objective}
            </p>
          </div>

          {/* Solution */}
          <div className="p-8 rounded-3xl bg-[#181818] text-[#F7F5F0] border border-[#2D2D2D] shadow-xl">
            <span className="font-mono text-xs text-[#FF604A] uppercase tracking-widest font-bold block mb-3">
              [03] THE ARCHITECTURAL SOLUTION
            </span>
            <h3 className="font-display font-bold text-xl text-[#FAF8F2] mb-4">
              Implementation Strategy
            </h3>
            <p className="font-sans text-sm text-[#A09D96] leading-relaxed">
              {project.solution}
            </p>
          </div>
        </section>

        {/* 3. Interactive Interface Preview / Architecture Diagram */}
        <section className="rounded-3xl bg-[#FFFFFF] border border-[#E4E0D8] p-8 md:p-12 shadow-sm">
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#E4E0D8]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF604A]" />
              <span className="font-mono text-xs font-bold text-[#181818] uppercase tracking-wider">
                [04] INTERACTIVE MOCKUP & SYSTEM VISUALIZATION
              </span>
            </div>
            <span className="font-mono text-xs text-[#77746F]">INTERFACE ARCHITECTURE</span>
          </div>

          {/* Custom Project Showcase Mockup based on project type */}
          <div className="w-full rounded-2xl bg-[#F0EEE8] border border-[#E4E0D8] p-6 sm:p-10 min-h-[340px] flex flex-col justify-between">
            {project.id === 'dc-excel' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#E4E0D8] pb-3 text-xs font-mono text-[#77746F]">
                  <span className="font-bold text-[#181818]">DC_EXCEL_WORKBOOK_01.XLSX</span>
                  <span>STORAGE: INDEXED_DB (OFFLINE SECURE)</span>
                </div>
                {/* Spreadsheet cell grid simulation */}
                <div className="grid grid-cols-6 gap-1 font-mono text-xs text-center">
                  <div className="bg-[#E4E0D8] p-2 font-bold">#</div>
                  <div className="bg-[#E4E0D8] p-2 font-bold">A [METRIC]</div>
                  <div className="bg-[#E4E0D8] p-2 font-bold">B [Q1 DATA]</div>
                  <div className="bg-[#E4E0D8] p-2 font-bold">C [Q2 DATA]</div>
                  <div className="bg-[#E4E0D8] p-2 font-bold">D [FORMULA]</div>
                  <div className="bg-[#E4E0D8] p-2 font-bold">E [STATUS]</div>

                  <div className="bg-white p-2 text-left font-bold">1</div>
                  <div className="bg-white p-2 text-left">Telemetry Units</div>
                  <div className="bg-white p-2">0.00</div>
                  <div className="bg-white p-2">0.00</div>
                  <div className="bg-white p-2 text-[#FF604A] font-bold">=SUM(B1:C1)</div>
                  <div className="bg-emerald-50 text-emerald-700 p-2 font-bold">ZERO LEAKS</div>

                  <div className="bg-white p-2 text-left font-bold">2</div>
                  <div className="bg-white p-2 text-left">Parsed Records</div>
                  <div className="bg-white p-2">12,450</div>
                  <div className="bg-white p-2">28,900</div>
                  <div className="bg-white p-2 text-[#FF604A] font-bold">=AVERAGE(B2:C2)</div>
                  <div className="bg-emerald-50 text-emerald-700 p-2 font-bold">COMPUTED</div>
                </div>
                <p className="text-xs font-mono text-[#77746F] pt-2">
                  * Live formula evaluation engine executed via client-side worker with zero external cloud dependencies.
                </p>
              </div>
            )}

            {project.id === 'dc-word' && (
              <div className="bg-white p-8 rounded-xl shadow-xs border border-[#E4E0D8] max-w-2xl mx-auto space-y-4 font-serif">
                <div className="flex items-center justify-between pb-3 border-b border-[#E4E0D8] font-mono text-[10px] text-[#77746F]">
                  <span>DC WORD DOCUMENT CANVAS</span>
                  <span>AUTOSAVE ACTIVE</span>
                </div>
                <h3 className="font-display font-bold text-2xl text-[#181818]">
                  Clean Editorial Focus
                </h3>
                <p className="font-sans text-xs text-[#77746F] leading-relaxed">
                  Distraction-free typographic rhythm designed to elevate long-form writing, research publications, and documentation.
                </p>
              </div>
            )}

            {project.id === 'sannivesham' && (
              <div className="p-6 rounded-xl bg-[#2A0E08] text-[#FAF2E6] space-y-4">
                <div className="flex items-center justify-between border-b border-[#5E2818] pb-3 font-mono text-xs text-[#D99A27]">
                  <span>సన్నివేశం (SANNIVESHAM PLATFORM)</span>
                  <span>TELUGU CULTURAL ECOSYSTEM</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs font-display">
                  <div className="p-3 rounded-lg bg-[#3F160D] border border-[#6F2E1E]">ఇతిహాసాలు (Epics)</div>
                  <div className="p-3 rounded-lg bg-[#3F160D] border border-[#6F2E1E]">దేవాలయాలు (Temples)</div>
                  <div className="p-3 rounded-lg bg-[#3F160D] border border-[#6F2E1E]">ధర్మ పరీక్ష (Quiz)</div>
                  <div className="p-3 rounded-lg bg-[#3F160D] border border-[#6F2E1E]">రామకోటి (Japa)</div>
                </div>
              </div>
            )}

            {project.id === 'damayanti-crest' && (
              <div className="p-6 rounded-xl bg-[#171B2B] text-[#FAF8F2] space-y-4">
                <div className="flex items-center justify-between border-b border-[#282F48] pb-3 font-mono text-xs text-[#C5A15D]">
                  <span>DAMAYANTI CREST ARCHITECTURE</span>
                  <span>FOUR CORE PILLARS</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs font-display">
                  <div className="p-3 rounded-lg bg-[#20273D] border border-[#3A456B]">Technologies</div>
                  <div className="p-3 rounded-lg bg-[#20273D] border border-[#3A456B]">Heritage</div>
                  <div className="p-3 rounded-lg bg-[#20273D] border border-[#3A456B]">Publications</div>
                  <div className="p-3 rounded-lg bg-[#20273D] border border-[#3A456B]">Traditions</div>
                </div>
              </div>
            )}

            {project.id !== 'dc-excel' && project.id !== 'dc-word' && project.id !== 'sannivesham' && project.id !== 'damayanti-crest' && (
              <div className="space-y-4 my-auto text-center">
                <div className="w-12 h-12 mx-auto rounded-xl bg-white border border-[#E4E0D8] flex items-center justify-center text-[#FF604A]">
                  <Layers className="w-6 h-6" />
                </div>
                <h4 className="font-display font-bold text-lg text-[#181818]">
                  {project.title} Interface System
                </h4>
                <p className="font-sans text-xs text-[#77746F] max-w-md mx-auto">
                  Architected with responsive mobile layouts, high-performance typography, and scalable component hierarchies.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* 4. Key Functional Features */}
        <section>
          <div className="mb-8 pb-4 border-b border-[#E4E0D8] flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-[#FF604A] font-bold">
              [05] CORE FEATURES & SPECIFICATIONS
            </span>
            <span className="font-mono text-xs text-[#77746F]">
              {project.features.length} MODULES IMPLEMENTED
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.features.map((feat, fIdx) => (
              <div
                key={fIdx}
                className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E4E0D8] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs font-bold text-[#FF604A] block mb-2">
                    0{fIdx + 1}
                  </span>
                  <h4 className="font-display font-bold text-base text-[#181818] mb-2">
                    {feat.title}
                  </h4>
                  <p className="font-sans text-xs text-[#77746F] leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Development Process */}
        <section>
          <div className="mb-8 pb-4 border-b border-[#E4E0D8] flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-[#FF604A] font-bold">
              [06] ENGINEERING LIFECYCLE
            </span>
            <span className="font-mono text-xs text-[#77746F]">STAGED EXECUTION</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {project.process.map((step) => (
              <div
                key={step.step}
                className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E4E0D8] relative"
              >
                <span className="font-mono text-2xl font-extrabold text-[#E4E0D8] block mb-3">
                  {step.step}
                </span>
                <h4 className="font-display font-bold text-sm text-[#181818] mb-2">
                  {step.title}
                </h4>
                <p className="font-sans text-xs text-[#77746F] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Technical Challenges & Architectural Solutions */}
        {project.challenges && project.challenges.length > 0 && (
          <section>
            <div className="mb-8 pb-4 border-b border-[#E4E0D8] flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-widest text-[#FF604A] font-bold">
                [07] TECHNICAL OBSTACLES & RESOLUTIONS
              </span>
              <span className="font-mono text-xs text-[#77746F]">ENGINEERING DEPTH</span>
            </div>

            <div className="space-y-4">
              {project.challenges.map((item, cIdx) => (
                <div
                  key={cIdx}
                  className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E4E0D8] grid grid-cols-1 md:grid-cols-12 gap-6 items-start"
                >
                  <div className="md:col-span-5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#FF604A] font-semibold block mb-1">
                      CHALLENGE 0{cIdx + 1}
                    </span>
                    <h5 className="font-display font-bold text-sm text-[#181818]">
                      {item.challenge}
                    </h5>
                  </div>
                  <div className="md:col-span-7 border-t md:border-t-0 md:border-l border-[#E4E0D8] pt-4 md:pt-0 md:pl-6">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-600 font-semibold block mb-1">
                      ARCHITECTURAL RESOLUTION
                    </span>
                    <p className="font-sans text-xs text-[#77746F] leading-relaxed">
                      {item.solution}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 7. Action Links & Live Status */}
        <section className="p-8 rounded-3xl bg-[#F0EEE8] border border-[#E4E0D8] flex flex-wrap items-center justify-between gap-6">
          <div>
            <span className="font-mono text-xs text-[#77746F] uppercase tracking-widest block mb-1">
              CURRENT ACCESS STATUS
            </span>
            <h4 className="font-display font-bold text-xl text-[#181818]">
              {project.isExternalLinkLive ? 'Live Deployment Accessible' : 'Active Local Architecture'}
            </h4>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {project.isExternalLinkLive && project.previewUrl && project.previewUrl !== '#' ? (
              <a
                href={project.previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF604A] text-white text-xs font-display font-bold hover:bg-[#E84E38] transition-colors shadow-sm"
              >
                <span>OPEN OFFICIAL WEBSITE</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-[#E4E0D8] text-xs font-mono text-[#77746F]">
                <span>Public Deployment Pending</span>
              </span>
            )}

            {project.appUrl && (
              <a
                href={project.appUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#181818] text-white text-xs font-display font-bold hover:bg-[#2A2A2A] transition-colors"
              >
                <Download className="w-4 h-4 text-[#FF604A]" />
                <span>Download Mobile App</span>
              </a>
            )}
          </div>
        </section>

        {/* 8. Next Project Navigation Card */}
        <nav
          onClick={() => navigate(`/projects/${nextProject.slug}`)}
          onMouseEnter={() => setCursor('view', 'NEXT')}
          onMouseLeave={resetCursor}
          className="p-8 md:p-12 rounded-3xl bg-[#181818] text-[#F7F5F0] border border-[#333333] hover:border-[#FF604A] cursor-pointer transition-all duration-300 group flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div>
            <span className="font-mono text-xs text-[#FF604A] uppercase tracking-widest block mb-2">
              UP NEXT // 0{nextProject.order}
            </span>
            <h4 className="font-display font-extrabold text-3xl md:text-4xl text-[#FAF8F2] group-hover:text-[#FF604A] transition-colors">
              {nextProject.title}
            </h4>
            <p className="font-sans text-xs md:text-sm text-[#77746F] mt-1">
              {nextProject.categoryLabel}
            </p>
          </div>

          <div className="w-14 h-14 rounded-full bg-[#242424] border border-[#3A3A3A] flex items-center justify-center group-hover:bg-[#FF604A] group-hover:text-white transition-colors shrink-0">
            <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
          </div>
        </nav>
      </main>
    </article>
  );
};
