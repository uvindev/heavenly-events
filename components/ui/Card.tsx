import { type ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  variant?: 'glass' | 'solid';
  className?: string;
  as?: 'div' | 'article' | 'section';
}

export default function Card({
  children,
  variant = 'glass',
  className = '',
  as: Tag = 'div',
}: CardProps) {
  const baseClasses = 'rounded-xl p-6 transition-all duration-300';

  const variantClasses =
    variant === 'glass'
      ? 'glass-card'
      : 'bg-(--bg-elevated) border border-(--border-primary)';

  const hoverClasses = 'hover:-translate-y-1 hover:shadow-(--shadow-lg) hover:border-(--border-secondary)';

  return (
    <Tag
      className={`group relative ${baseClasses} ${variantClasses} ${hoverClasses} ${className}`}
    >
      {children}
    </Tag>
  );
}
