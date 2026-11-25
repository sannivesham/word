import React from 'react';
import { motion } from 'framer-motion';

export const IntroSection: React.FC = () => {
  return (
    <section className="relative py-28 md:py-36 px-6 sm:px-10 md:px-16 bg-[#F0EEE8] border-y border-[#E4E0D8] overflow-hidden">
      {/* Editorial background accents */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Number & Monogram Stamp */}
        <div className="flex items-center justify-between pb-8 mb-12 border-b border-[#E4E0D8]">
          <div className="flex items-center gap-3 font-mono text-xs tracking-widest text-[#77746F] uppercase">
            <span className="text-[#FF604A] font-bold">[01]</span>
            <span className="text-[#242424]">CREATIVE PHILOSOPHY</span>
            <span className="w-12 h-[1px] bg-[#E4E0D8]" />
          </div>

          <div className="font-mono text-xs text-[#77746F]">
            STATEMENT / MANIFESTO
          </div>
        </div>

        {/* Large Oversized Statement */}
        <div className="max-w-5xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8 }}
            className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#181818] leading-[1.08] mb-10"
          >
            I DON'T JUST BUILD WEBSITES.
            <br />
            <span className="text-[#FF604A]">I BUILD DIGITAL PRODUCTS.</span>
          </motion.h2>

          {/* Supporting paragraph with editorial typography */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-6 border-t border-[#E4E0D8]"
          >
            <div className="md:col-span-4 font-mono text-xs uppercase tracking-widest text-[#77746F]">
              DEVELOPMENT PRINCIPLE
            </div>

            <div className="md:col-span-8">
              <p className="font-sans text-lg sm:text-xl md:text-2xl text-[#242424] leading-relaxed font-light mb-6">
                I'm a software developer and product builder interested in turning ideas into practical digital experiences. My work spans applications, websites, productivity tools and platforms for organisations.
              </p>

              <div className="flex flex-wrap items-center gap-6 font-mono text-xs text-[#77746F] pt-4">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF604A]" />
                  Zero Superficial Vanity
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF604A]" />
                  Local Privacy & Reliability
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF604A]" />
                  End-to-End Craftsmanship
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
