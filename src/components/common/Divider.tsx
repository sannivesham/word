import React from 'react';
import { cn } from '@/utils/cn';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  className,
}) => {
  if (orientation === 'vertical') {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cn('h-5 w-px bg-slate-200 dark:bg-slate-700 mx-1 shrink-0', className)}
      />
    );
  }

  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={cn('w-full h-px bg-slate-200 dark:bg-slate-700 my-2 shrink-0', className)}
    />
  );
};
