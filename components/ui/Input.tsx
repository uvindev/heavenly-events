'use client';

import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes, type SelectHTMLAttributes, type ReactNode } from 'react';

type InputVariant = 'text' | 'email' | 'tel' | 'password' | 'textarea' | 'select';

interface BaseInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: InputVariant;
  children?: ReactNode; // For select options
}

type InputFieldProps = BaseInputProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'children'> &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'children'> &
  Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'>;

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, InputFieldProps>(
  ({ label, error, helperText, variant = 'text', children, className = '', id, ...rest }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    const baseClasses = `
      w-full rounded-lg border bg-(--glass-bg)
      px-4 py-3 font-body text-base text-(--text-primary)
      placeholder:text-(--text-muted)
      outline-none transition-all duration-300
      focus:ring-2 focus:ring-(--color-crimson) focus:border-(--color-crimson) focus:ring-offset-1 focus:ring-offset-black
      ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-(--border-primary)'}
      ${className}
    `.trim();

    const renderField = () => {
      if (variant === 'textarea') {
        return (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            id={inputId}
            className={`${baseClasses} min-h-30 resize-y`}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
            {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        );
      }

      if (variant === 'select') {
        return (
          <select
            ref={ref as React.Ref<HTMLSelectElement>}
            id={inputId}
            className={`${baseClasses} cursor-pointer appearance-none pr-10`}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 12px center',
              backgroundSize: '16px',
              colorScheme: 'dark',
            }}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
            {...(rest as SelectHTMLAttributes<HTMLSelectElement>)}
          >
            {children}
          </select>
        );
      }

      return (
        <input
          ref={ref as React.Ref<HTMLInputElement>}
          id={inputId}
          type={variant}
          className={baseClasses}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
        />
      );
    };

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-2 block font-ui text-sm font-medium text-(--text-secondary)"
          >
            {label}
          </label>
        )}

        {renderField()}

        {error && (
          <p id={`${inputId}-error`} className="mt-1.5 font-body text-xs text-red-500" role="alert">
            {error}
          </p>
        )}

        {!error && helperText && (
          <p id={`${inputId}-helper`} className="mt-1.5 font-body text-xs text-(--text-muted)">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
