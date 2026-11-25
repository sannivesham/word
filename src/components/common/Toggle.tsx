import React from 'react';
import { cn } from '@/utils/cn';

export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  size = 'md',
  className,
}) => {
  return (
    <div className={cn('flex items-center justify-between', className)}>
      {(label || description) && (
        <div className="mr-3">
          {label && (
            <span
              className={cn(
                'text-xs font-semibold text-slate-800 dark:text-slate-200 select-none',
                disabled && 'opacity-50'
              )}
            >
              {label}
            </span>
          )}
          {description && (
            <p className="text-[11px] text-slate-500 dark:text-slate-400">{description}</p>
          )}
        </div>
      )}

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={cn(
          'relative inline-flex shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#0E3A99] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          size === 'sm' ? 'h-4 w-7' : 'h-5 w-9',
          checked ? 'bg-[#0E3A99] dark:bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
        )}
      >
        <span
          className={cn(
            'pointer-events-none inline-block transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
            size === 'sm' ? 'h-3 w-3' : 'h-4 w-4',
            checked
              ? size === 'sm'
                ? 'translate-x-3'
                : 'translate-x-4'
              : 'translate-x-0'
          )}
        />
      </button>
    </div>
  );
};
