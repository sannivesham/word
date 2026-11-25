import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  active?: boolean;
  'aria-label': string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      variant = 'ghost',
      size = 'md',
      active = false,
      disabled,
      children,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center rounded transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-40 disabled:cursor-not-allowed select-none';

    const variants = {
      primary:
        'bg-[#0E3A99] hover:bg-[#0A2566] text-white shadow-sm focus:ring-[#0E3A99]',
      secondary:
        'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 focus:ring-slate-400',
      ghost: cn(
        'text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white focus:ring-slate-400',
        active && 'bg-slate-200 text-[#0E3A99] dark:bg-slate-700 dark:text-blue-400 font-semibold'
      ),
      outline:
        'border border-slate-300 hover:bg-slate-50 text-slate-700 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 focus:ring-slate-400',
      danger:
        'text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40 focus:ring-red-400',
    };

    const sizes = {
      xs: 'p-1 text-xs h-6 w-6',
      sm: 'p-1.5 text-sm h-7 w-7',
      md: 'p-2 text-base h-8 w-8',
      lg: 'p-2.5 text-lg h-10 w-10',
    };

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        aria-label={ariaLabel}
        title={ariaLabel}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
