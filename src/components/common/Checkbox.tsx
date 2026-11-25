import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, id, disabled, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="flex items-start">
        <div className="flex h-5 items-center">
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            disabled={disabled}
            className={cn(
              'h-4 w-4 rounded border-slate-300 text-[#0E3A99] focus:ring-[#0E3A99] dark:border-slate-700 dark:bg-slate-900 dark:focus:ring-blue-500',
              'disabled:cursor-not-allowed disabled:opacity-50 transition-colors',
              className
            )}
            {...props}
          />
        </div>
        {(label || description) && (
          <div className="ml-2.5 text-xs">
            {label && (
              <label
                htmlFor={inputId}
                className={cn(
                  'font-medium text-slate-800 dark:text-slate-200 cursor-pointer select-none',
                  disabled && 'cursor-not-allowed opacity-50'
                )}
              >
                {label}
              </label>
            )}
            {description && (
              <p className="text-slate-500 dark:text-slate-400">{description}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
