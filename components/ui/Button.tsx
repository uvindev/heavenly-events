'use client';

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import Link from 'next/link';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  href?: string;
  children: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-(--color-crimson) text-white border border-transparent hover:shadow-(--shadow-crimson) active:brightness-90',
  secondary:
    'bg-transparent text-(--text-primary) border border-(--border-primary) hover:bg-(--color-crimson) hover:text-white hover:border-(--color-crimson)',
  ghost:
    'bg-transparent text-(--text-secondary) border border-transparent hover:text-(--text-primary) hover:bg-black/5',
  danger:
    'bg-red-600 text-white border border-transparent hover:bg-red-700 active:bg-red-800',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm gap-1.5 min-h-8',
  md: 'px-5 py-2.5 text-sm gap-2 min-h-10',
  lg: 'px-7 py-3.5 text-base gap-2.5 min-h-12',
};

const Spinner = () => (
  <svg
    className="h-4 w-4 animate-spin"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading = false, disabled, href, children, className = '', ...rest }, ref) => {
    const classes = `
      inline-flex items-center justify-center font-ui font-semibold
      rounded-lg transition-all duration-300
      cursor-pointer select-none
      disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
      ${variantClasses[variant]}
      ${sizeClasses[size]}
      ${className}
    `.trim();

    if (href && !disabled) {
      return (
        <Link href={href} className={classes} tabIndex={0}>
          {loading && <Spinner />}
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        aria-busy={loading}
        {...rest}
      >
        {loading && <Spinner />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
