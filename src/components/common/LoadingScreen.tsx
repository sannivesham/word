import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Check if previously loaded in this session to make repeat visits instant
    const hasVisited = sessionStorage.getItem('rr_portfolio_loaded');
    if (hasVisited) {
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFinished(true);
            sessionStorage.setItem('rr_portfolio_loaded', 'true');
            setTimeout(onComplete, 600);
          }, 300);
          return 100;
        }
        const diff = Math.floor(Math.random() * 15) + 10;
        return Math.min(prev + diff, 100);
      });
    }, 70);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[99999] bg-[#181818] text-[#F7F5F0] flex flex-col justify-between p-8 md:p-14 select-none"
        >
          {/* Top metadata */}
          <div className="flex items-center justify-between font-display text-xs tracking-widest text-[#77746F]">
            <span className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#FF604A] animate-ping" />
              SYSTEM INITIALIZING
            </span>
            <span>HYDERABAD, IN</span>
          </div>

          {/* Center Monogram & Title */}
          <div className="flex flex-col items-center justify-center my-auto">
            {/* Animated Monogram Crest */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative w-24 h-24 mb-6 rounded-2xl border border-[#333333] bg-[#202020] flex items-center justify-center shadow-2xl"
            >
              <span className="font-display font-extrabold text-3xl tracking-tighter text-[#F7F5F0]">
                RR
              </span>
              <motion.span
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-[#FF604A]"
              />
            </motion.div>

            {/* Name typography reveal */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-center"
            >
              <h1 className="font-display font-bold text-2xl md:text-3xl tracking-tight text-[#F7F5F0] mb-2">
                G. RESHWANTH REDDY
              </h1>
              <p className="font-sans text-xs md:text-sm text-[#77746F] tracking-widest uppercase">
                Software Developer <span className="text-[#FF604A]">•</span> Damayanti Crest Founder
              </p>
            </motion.div>
          </div>

          {/* Bottom progress bar & counter */}
          <div className="w-full max-w-md mx-auto">
            <div className="flex items-center justify-between text-xs font-mono text-[#77746F] mb-3">
              <span>ESTABLISHING DIGITAL EXPERIENCE</span>
              <span className="font-bold text-[#FF604A]">{progress}%</span>
            </div>
            <div className="w-full h-1 bg-[#282828] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#FF604A]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
