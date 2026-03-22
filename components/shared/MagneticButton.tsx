'use client';

import { useRef, useState, useCallback, type ButtonHTMLAttributes, type ReactNode } from 'react';
import Link from 'next/link';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface MagneticButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children: ReactNode;
  className?: string;
  href?: string;
  variant?: Variant;
  size?: Size;
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-(--color-crimson) text-white hover:shadow-(--shadow-crimson) border border-transparent',
  secondary:
    'bg-transparent text-(--text-primary) border border-(--border-primary) hover:bg-(--color-crimson) hover:text-white hover:border-(--color-crimson)',
  ghost:
    'bg-transparent text-(--text-primary) border border-transparent hover:border-(--color-crimson) transition-colors',
};

const sizeStyles: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm min-h-12',
  md: 'px-6 py-3 text-base min-h-12',
  lg: 'px-8 py-4 text-lg min-h-12',
};

export default function MagneticButton({
  children,
  className = '',
  href,
  variant = 'primary',
  size = 'md',
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('translate3d(0,0,0)');

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTransform(`translate3d(${x * 0.3}px, ${y * 0.3}px, 0)`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform('translate3d(0,0,0)');
  }, []);

  const baseClasses = `
    inline-flex items-center justify-center font-ui font-semibold
    rounded-lg transition-all
    cursor-pointer select-none
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${className}
  `.trim();

  const content = href ? (
    <Link href={href} className={baseClasses} tabIndex={0}>
      {children}
    </Link>
  ) : (
    <button className={baseClasses} {...rest}>
      {children}
    </button>
  );

  return (
    <div
      ref={ref}
      className="inline-block"
      style={{
        transform,
        transition: transform === 'translate3d(0,0,0)' ? 'transform 0.5s var(--ease-spring)' : 'none',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {content}
    </div>
  );
}
