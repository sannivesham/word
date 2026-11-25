import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Code2, Rocket } from 'lucide-react';
import { OWNER_INFO } from '../../data/navigation';
import { SectionHeading } from '../common/SectionHeading';
import { useCursor } from '../../context/CursorContext';

export const AboutSection: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();

  return (
    <section id="about" className="relative py-28 md:py-36 px-6 sm:px-10 md:px-16 bg-[#F7F5F0]">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          number="02"
          category="BACKGROUND & PHILOSOPHY"
          title="BRIDGING HARDWARE PRECISION WITH DIGITAL CRAFTSMANSHIP."
          subtitle="Software developer, independent venture founder, and engineering student grounded in Electronics & Communication principles."
        />

        {/* Asymmetric 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: 7 Cols Text & Editorial Narrative */}
          <div className="lg:col-span-7 space-y-8">
            <div className="prose prose-lg text-[#242424]">
              <p className="font-sans text-lg md:text-xl text-[#242424] leading-relaxed font-normal">
                I am a software developer and product builder driven by the desire to take nascent ideas and turn them into resilient, production-ready software. My background bridges both low-level electronics and high-level web and mobile systems.
              </p>
              <p className="font-sans text-base md:text-lg text-[#77746F] leading-relaxed">
                As the founder of <strong className="text-[#181818] font-semibold">Damayanti Crest</strong>, I conceptualized and developed an independent multi-division ecosystem that encompasses software utilities like <strong className="text-[#181818] font-semibold">DC Excel</strong> and <strong className="text-[#181818] font-semibold">DC Word</strong>, alongside rich cultural platforms like <strong className="text-[#181818] font-semibold">Sannivesham</strong>.
              </p>
            </div>

            {/* Academic Education Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-6 md:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E4E0D8] shadow-xs relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF604A]/5 rounded-bl-full pointer-events-none" />

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#F0EEE8] border border-[#E4E0D8] flex items-center justify-center shrink-0">
                  <GraduationCap className="w-6 h-6 text-[#FF604A]" />
                </div>
                <div>
                  <span className="font-mono text-xs text-[#FF604A] uppercase tracking-widest font-semibold block mb-1">
                    FORMAL EDUCATION
                  </span>
                  <h3 className="font-display font-bold text-xl text-[#181818] mb-1">
                    {OWNER_INFO.education.degree}
                  </h3>
                  <p className="font-sans text-sm text-[#77746F] mb-3">
                    {OWNER_INFO.education.institution}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-[#F0EEE8] text-[11px] font-mono text-[#242424]">
                      Electronics & Communication
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-[#F0EEE8] text-[11px] font-mono text-[#242424]">
                      Embedded Systems
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-[#F0EEE8] text-[11px] font-mono text-[#242424]">
                      Robotics Club Member
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Core Philosophies List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-5 rounded-xl bg-[#F0EEE8] border border-[#E4E0D8]">
                <div className="flex items-center gap-2 mb-2">
                  <Code2 className="w-4 h-4 text-[#FF604A]" />
                  <h4 className="font-display font-bold text-sm text-[#181818]">
                    Engineering Sovereignty
                  </h4>
                </div>
                <p className="font-sans text-xs text-[#77746F] leading-relaxed">
                  Building software that respects user privacy through local compute, client-side encryption, and zero forced tracking.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#F0EEE8] border border-[#E4E0D8]">
                <div className="flex items-center gap-2 mb-2">
                  <Rocket className="w-4 h-4 text-[#FF604A]" />
                  <h4 className="font-display font-bold text-sm text-[#181818]">
                    Product Velocity
                  </h4>
                </div>
                <p className="font-sans text-xs text-[#77746F] leading-relaxed">
                  Translating complex organizational requirements into responsive interfaces, clean databases, and functional mobile applications.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: 5 Cols Creative Abstract Typographic Sculpture & Visual */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              onMouseEnter={() => setCursor('hover', 'DISCOVER')}
              onMouseLeave={resetCursor}
              className="relative p-8 md:p-10 rounded-3xl bg-[#181818] text-[#F7F5F0] shadow-2xl border border-[#2D2D2D] overflow-hidden"
            >
              {/* Background ambient mesh */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#FF604A]/15 rounded-full blur-2xl" />

              {/* Watermark Monogram */}
              <div className="absolute bottom-2 right-4 text-9xl font-display font-extrabold text-[#242424] select-none pointer-events-none opacity-40">
                RR
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#2C2C2C]">
                  <span className="font-mono text-xs text-[#FF604A] tracking-widest uppercase">
                    EDITORIAL ARCHIVE
                  </span>
                  <span className="text-xs font-mono text-[#77746F]">
                    HYD // IN
                  </span>
                </div>

                <div className="space-y-6">
                  <div>
                    <span className="text-[11px] font-mono text-[#77746F] uppercase tracking-wider block mb-1">
                      DISCIPLINE DUALITY
                    </span>
                    <h4 className="font-display font-bold text-2xl text-[#FAF8F2] tracking-tight">
                      HARDWARE LOGIC.
                      <br />
                      <span className="text-[#FF604A]">SOFTWARE CRAFT.</span>
                    </h4>
                  </div>

                  <p className="font-sans text-xs text-[#A09D96] leading-relaxed">
                    Engineering education at SNIST provided the discipline of signal timings, memory registers, and circuit constraints. This physical foundation informs my software engineering: writing efficient algorithms, preventing memory leaks, and building ultra-responsive web experiences.
                  </p>

                  <div className="pt-6 border-t border-[#2C2C2C] space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between text-[#FAF8F2]">
                      <span className="text-[#77746F]">Focus 01</span>
                      <span>Desktop-class Web Apps</span>
                    </div>
                    <div className="flex items-center justify-between text-[#FAF8F2]">
                      <span className="text-[#77746F]">Focus 02</span>
                      <span>Cultural Preservation Platforms</span>
                    </div>
                    <div className="flex items-center justify-between text-[#FAF8F2]">
                      <span className="text-[#77746F]">Focus 03</span>
                      <span>Embedded Microcontrollers (ESP32)</span>
                    </div>
                    <div className="flex items-center justify-between text-[#FAF8F2]">
                      <span className="text-[#77746F]">Focus 04</span>
                      <span>Organisational Digital Solutions</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Signature Stamp */}
                <div className="mt-8 pt-6 border-t border-[#2C2C2C] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#FF604A]" />
                    <span className="font-display font-bold text-xs tracking-wider uppercase text-[#FAF8F2]">
                      G. Reshwanth Reddy
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-[#77746F]">
                    DAMAYANTI CREST
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
