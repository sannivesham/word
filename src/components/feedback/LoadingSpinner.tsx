import React from 'react';
import { cn } from '@/utils/cn';

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  label,
  className,
}) => {
  const sizes = {
    sm: 'h-4 w-4 border-2',
    md: 'h-6 w-6 border-2',
    lg: 'h-10 w-10 border-3',
  };

  return (
    <div className={cn('flex flex-col items-center justify-center gap-2', className)}>
      <div
        className={cn(
          'animate-spin rounded-full border-slate-200 border-t-[#0E3A99] dark:border-slate-700 dark:border-t-blue-500',
          sizes[size]
        )}
        role="status"
        aria-label={label || 'Loading...'}
      />
      {label && <span className="text-xs text-slate-500 dark:text-slate-400">{label}</span>}
    </div>
  );
};
