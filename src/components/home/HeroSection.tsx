import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, MapPin, Sparkles } from 'lucide-react';
import { OWNER_INFO } from '../../data/navigation';
import { MagneticButton } from '../common/MagneticButton';
import { useCursor } from '../../context/CursorContext';

interface HeroSectionProps {
  onExploreClick: () => void;
  onAboutClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick, onAboutClick }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { setCursor, resetCursor } = useCursor();

  // Interactive generative canvas for the experimental visual sculpture
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Nodes for connected geometric structure
    const nodeCount = 28;
    const nodes: { x: number; y: number; vx: number; vy: number; radius: number; color: string }[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 3 + 2,
        color: i % 4 === 0 ? '#FF604A' : '#242424'
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      angle += 0.005;

      // Draw subtle orbital rings
      ctx.save();
      ctx.translate(width / 2, height / 2);
      ctx.rotate(angle);

      ctx.beginPath();
      ctx.ellipse(0, 0, width * 0.35, height * 0.22, Math.PI / 4, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(228, 224, 216, 0.7)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(0, 0, width * 0.28, height * 0.38, -Math.PI / 6, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 96, 74, 0.15)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.restore();

      // Update & draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Move
        node.x += node.vx;
        node.y += node.vy;

        // Bounce
        if (node.x < 10 || node.x > width - 10) node.vx *= -1;
        if (node.y < 10 || node.y > height - 10) node.vy *= -1;

        // Subtle pull toward mouse
        const dx = mouseX - node.x;
        const dy = mouseY - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          node.x += (dx / dist) * 0.5;
          node.y += (dy / dist) * 0.5;
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        // Connect nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const distNodes = Math.hypot(node.x - other.x, node.y - other.y);
          if (distNodes < 110) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle =
              node.color === '#FF604A' || other.color === '#FF604A'
                ? `rgba(255, 96, 74, ${0.35 * (1 - distNodes / 110)})`
                : `rgba(36, 36, 36, ${0.12 * (1 - distNodes / 110)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 px-6 sm:px-10 md:px-16 overflow-hidden bg-[#F7F5F0]"
    >
      {/* Background ambient texture */}
      <div className="absolute inset-0 bg-noise pointer-events-none opacity-60" />

      {/* Top micro metadata bar */}
      <div className="max-w-7xl mx-auto w-full pt-4 relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-[#E4E0D8] pb-4">
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#77746F] uppercase">
          <MapPin className="w-3.5 h-3.5 text-[#FF604A]" />
          <span>{OWNER_INFO.location}</span>
          <span className="text-[#E4E0D8]">•</span>
          <span>{OWNER_INFO.education.institution}</span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#77746F]">
          <span className="w-2 h-2 rounded-full bg-[#FF604A]" />
          <span className="uppercase tracking-widest">ECOSYSTEM BUILDER & DEVELOPER</span>
        </div>
      </div>

      {/* Main hero grid: Oversized Typography Left, Interactive Geometric Sculpture Right */}
      <div className="max-w-7xl mx-auto w-full my-auto py-8 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        {/* Left Column: 7 Cols Typography */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Personal Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#E4E0D8] mb-6 shadow-xs"
          >
            <span className="w-2 h-2 rounded-full bg-[#FF604A]" />
            <span className="font-display font-medium text-xs text-[#242424]">
              Hi, I'm <strong className="text-[#181818]">{OWNER_INFO.displayName}</strong>
            </span>
          </motion.div>

          {/* Main Oversized Editorial Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight text-[#181818] leading-[1.04] mb-6"
          >
            BUILDING DIGITAL
            <br />
            <span className="relative inline-block text-[#181818]">
              EXPERIENCES.
              <span className="absolute -bottom-1 left-0 right-0 h-1 bg-[#FF604A]/30 rounded-full" />
            </span>
            <br />
            TURNING IDEAS
            <br />
            <span className="text-[#FF604A]">INTO REALITY.</span>
          </motion.h1>

          {/* Role badge */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display font-semibold text-xs sm:text-sm md:text-base text-[#181818] uppercase tracking-wider mb-4 border-l-2 border-[#FF604A] pl-3"
          >
            Software Developer <span className="text-[#FF604A]">|</span> App & Web Developer <span className="text-[#FF604A]">|</span> Founder of Damayanti Crest
          </motion.p>

          {/* Supporting paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-sans text-base md:text-lg text-[#77746F] max-w-xl leading-relaxed mb-8"
          >
            {OWNER_INFO.bio}
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              variant="primary"
              onClick={onExploreClick}
              cursorText="EXPLORE"
              className="px-7 py-4 text-sm"
            >
              <span>EXPLORE MY WORK</span>
              <ArrowDown className="w-4 h-4" />
            </MagneticButton>

            <MagneticButton
              variant="outline"
              onClick={onAboutClick}
              className="px-7 py-4 text-sm"
            >
              <span>MORE ABOUT ME</span>
              <ArrowUpRight className="w-4 h-4 text-[#77746F]" />
            </MagneticButton>
          </motion.div>
        </div>

        {/* Right Column: 5 Cols Experimental Generative Sculpture & Interactive Monogram */}
        <div className="lg:col-span-5 relative w-full h-[400px] sm:h-[480px] lg:h-[540px] flex items-center justify-center">
          {/* Canvas for dynamic interactive nodes */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full rounded-3xl cursor-crosshair"
            onMouseEnter={() => setCursor('explore', 'DRAG')}
            onMouseLeave={resetCursor}
          />

          {/* Central Floating Editorial Monogram Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative z-10 w-64 h-64 sm:w-72 sm:h-72 rounded-3xl bg-[#FFFFFF]/85 backdrop-blur-xl border border-[#E4E0D8] p-6 shadow-2xl flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] tracking-widest text-[#77746F] uppercase">
                DIGITAL IDENTITY
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF604A]" />
            </div>

            <div className="text-center my-auto">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-[#181818] text-[#F7F5F0] flex items-center justify-center font-display font-extrabold text-3xl mb-3 shadow-md relative">
                <span>RR</span>
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#FF604A] border-2 border-white" />
              </div>
              <h3 className="font-display font-bold text-sm text-[#181818]">
                DAMAYANTI CREST
              </h3>
              <p className="font-sans text-[11px] text-[#77746F]">
                Ecosystem & Software Labs
              </p>
            </div>

            <div className="pt-3 border-t border-[#E4E0D8]/60 flex items-center justify-between font-mono text-[10px] text-[#77746F]">
              <span>SNIST • ECE</span>
              <span className="text-[#FF604A] font-semibold">HYDERABAD</span>
            </div>
          </motion.div>

          {/* Floating Pill Badges */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-2 right-4 z-20 px-3.5 py-2 rounded-xl bg-[#181818] text-[#F7F5F0] font-mono text-xs shadow-lg border border-[#333333] hidden sm:flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-[#FF604A]" />
            <span>DC Excel • 100% Local</span>
          </motion.div>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="absolute -bottom-4 left-4 z-20 px-3.5 py-2 rounded-xl bg-[#FFFFFF] text-[#242424] font-mono text-xs shadow-lg border border-[#E4E0D8] hidden sm:flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FF604A]" />
            <span>Sannivesham • Cultural Platform</span>
          </motion.div>
        </div>
      </div>

      {/* Bottom Scroll-down indicator */}
      <div className="max-w-7xl mx-auto w-full pt-4 relative z-10 flex items-center justify-between text-xs font-mono text-[#77746F]">
        <button
          onClick={onExploreClick}
          onMouseEnter={() => setCursor('hover')}
          onMouseLeave={resetCursor}
          className="flex items-center gap-2 hover:text-[#FF604A] transition-colors group cursor-pointer"
        >
          <span className="w-6 h-6 rounded-full border border-[#E4E0D8] flex items-center justify-center group-hover:border-[#FF604A]">
            <ArrowDown className="w-3 h-3 text-[#FF604A] group-hover:translate-y-0.5 transition-transform" />
          </span>
          <span className="tracking-widest uppercase">Scroll to Discover</span>
        </button>

        <div className="hidden sm:flex items-center gap-4 text-[11px]">
          <span>PRODUCT BUILDER</span>
          <span className="text-[#FF604A]">•</span>
          <span>FULL-STACK</span>
          <span className="text-[#FF604A]">•</span>
          <span>EMBEDDED SYSTEMS</span>
        </div>
      </div>
    </section>
  );
};
