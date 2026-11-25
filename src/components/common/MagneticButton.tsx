import React, { useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '../../context/CursorContext';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'charcoal';
  cursorText?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  onClick,
  variant = 'primary',
  cursorText,
  type = 'button',
  disabled = false,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { setCursor, resetCursor } = useCursor();

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || disabled) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    // Pull factor
    const x = (clientX - centerX) * 0.25;
    const y = (clientY - centerY) * 0.25;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    resetCursor();
  };

  const handleMouseEnter = () => {
    if (cursorText) {
      setCursor('hover', cursorText);
    } else {
      setCursor('hover');
    }
  };

  let variantStyles = '';
  switch (variant) {
    case 'primary':
      variantStyles = 'bg-[#FF604A] text-white hover:bg-[#E84E38] shadow-sm hover:shadow-lg hover:shadow-[#FF604A]/25 border border-transparent';
      break;
    case 'secondary':
      variantStyles = 'bg-[#181818] text-[#F7F5F0] hover:bg-[#282828] border border-transparent';
      break;
    case 'outline':
      variantStyles = 'bg-transparent text-[#242424] border border-[#E4E0D8] hover:border-[#FF604A] hover:text-[#FF604A] bg-[#FFFFFF]/60';
      break;
    case 'charcoal':
      variantStyles = 'bg-[#202020] text-[#F7F5F0] border border-[#333333] hover:border-[#FF604A] hover:text-[#FF604A]';
      break;
  }

  return (
    <motion.button
      ref={buttonRef}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', damping: 18, stiffness: 220, mass: 0.2 }}
      className={`relative inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-display text-sm font-semibold tracking-wide transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles} ${className}`}
    >
      {children}
    </motion.button>
  );
};
