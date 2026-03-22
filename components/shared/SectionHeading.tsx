'use client';

import { useEffect, useRef } from 'react';

interface SectionHeadingProps {
  label: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'h4';
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  centered = true,
  as = 'h2',
}: SectionHeadingProps) {
  const Heading = as;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          el.classList.add('is-visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal mb-12 md:mb-16 ${centered ? 'text-center' : 'text-left'}`}
    >
      <span
        className="font-ui text-sm font-semibold uppercase tracking-wider block mb-3"
        style={{ letterSpacing: 'var(--tracking-wider)', color: '#1a56db' }}
      >
        {label}
      </span>

      <Heading
        className="animated-underline font-display font-bold leading-tight block"
        style={{ fontSize: 'var(--text-h2)', lineHeight: 'var(--leading-tight)', color: 'var(--text-primary)' }}
      >
        {title}
      </Heading>

      {subtitle && (
        <p
          className="font-body mt-4 max-w-2xl text-(--text-secondary)"
          style={{
            fontSize: 'var(--text-body)',
            ...(centered ? { marginInline: 'auto' } : {}),
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
