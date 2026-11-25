import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  number: string;
  category: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  theme?: 'light' | 'dark';
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  number,
  category,
  title,
  subtitle,
  align = 'left',
  theme = 'light'
}) => {
  const isDark = theme === 'dark';

  return (
    <div className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center max-w-3xl mx-auto' : 'max-w-4xl'}`}>
      {/* Category & Section Number */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
        className={`flex items-center gap-3 font-mono text-xs tracking-widest uppercase mb-3 ${
          align === 'center' ? 'justify-center' : ''
        } ${isDark ? 'text-[#FF604A]' : 'text-[#77746F]'}`}
      >
        <span className="text-[#FF604A] font-bold">[{number}]</span>
        <span className={isDark ? 'text-[#FAF8F2]' : 'text-[#242424]'}>{category}</span>
        <span className="w-8 h-[1px] bg-[#E4E0D8]" />
      </motion.div>

      {/* Large Oversized Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] mb-4 ${
          isDark ? 'text-[#FAF8F2]' : 'text-[#181818]'
        }`}
      >
        {title}
      </motion.h2>

      {/* Supporting Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`font-sans text-base md:text-lg leading-relaxed ${
            isDark ? 'text-[#A09D96]' : 'text-[#77746F]'
          }`}
        >
          {subtitle}
        </motion.p>
      )}

      {/* Animated Accent Line */}
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: '48px' }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className={`h-[2px] bg-[#FF604A] mt-6 ${align === 'center' ? 'mx-auto' : ''}`}
      />
    </div>
  );
};
