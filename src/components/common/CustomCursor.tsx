import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useCursor } from '../../context/CursorContext';

export const CustomCursor: React.FC = () => {
  const { cursorType, cursorText } = useCursor();
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for fluid motion
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if touch device or reduced motion
    const touchCheck = window.matchMedia('(pointer: coarse)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (touchCheck || reducedMotion) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouchDevice || !isVisible) {
    return null;
  }

  const hasText = cursorText.length > 0;

  return (
    <>
      {/* Center sharp dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-[#FF604A]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          width: hasText ? 0 : cursorType === 'hover' ? 6 : 8,
          height: hasText ? 0 : cursorType === 'hover' ? 6 : 8,
          opacity: hasText ? 0 : 1,
          transition: 'width 0.2s ease, height 0.2s ease, opacity 0.2s ease'
        }}
      />

      {/* Outer interactive follower */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full flex items-center justify-center text-center font-display uppercase tracking-widest font-bold"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: hasText ? 84 : cursorType === 'hover' ? 48 : 28,
          height: hasText ? 84 : cursorType === 'hover' ? 48 : 28,
          backgroundColor: hasText ? '#FF604A' : cursorType === 'hover' ? 'rgba(255, 96, 74, 0.12)' : 'transparent',
          borderColor: hasText ? '#FF604A' : cursorType === 'hover' ? '#FF604A' : 'rgba(36, 36, 36, 0.3)',
          borderWidth: hasText ? 0 : 1.5,
          color: hasText ? '#FFFFFF' : '#242424',
          scale: 1
        }}
        transition={{
          type: 'spring',
          damping: 24,
          stiffness: 300,
          mass: 0.4
        }}
      >
        {hasText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="text-[10px] font-extrabold tracking-wider"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </>
  );
};
