'use client';

import { useRef, useEffect } from 'react';

export interface GalleryItem {
  id: number;
  title: string;
  category: string;
  gradient: string;
  image?: string;
  aspectRatio: string;
  event: string;
}

interface GalleryGridProps {
  items: GalleryItem[];
  onItemClick: (index: number) => void;
}

export default function GalleryGrid({ items, onItemClick }: GalleryGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    const cards = el.querySelectorAll('.gallery-card');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [items]);

  return (
    <div
      ref={gridRef}
      style={{
        columns: '2',
        columnGap: '0.75rem',
      }}
      className="masonry-grid sm:columns-3 lg:columns-4 sm:gap-4"
    >
      {items.map((item, index) => (
        <button
          key={item.id}
          className="gallery-card reveal mb-4 block w-full break-inside-avoid cursor-pointer overflow-hidden rounded-xl border border-(--glass-border) transition-all duration-300 hover:scale-[1.03] hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-(--color-crimson)"
          style={{ '--index': index % 4 } as React.CSSProperties}
          onClick={() => onItemClick(index)}
          aria-label={`View ${item.title}`}
        >
          <div className="relative group" style={{ aspectRatio: item.aspectRatio }}>
            {/* Image or gradient fallback */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: item.image ? `url(${item.image})` : undefined,
                background: item.image ? undefined : item.gradient,
              }}
            />

            {/* Noise texture overlay */}
            <div
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
              }}
            />

            {/* Hover caption overlay */}
            <div className="absolute inset-x-0 bottom-0 translate-y-full p-4 pt-10 transition-transform duration-300 group-hover:translate-y-0" style={{ background: 'linear-gradient(to top, rgba(26,86,219,0.85), rgba(26,86,219,0.4), transparent)' }}>
              <span
                className="block font-ui text-xs font-semibold uppercase tracking-wider"
                style={{ color: 'var(--color-crimson)' }}
              >
                {item.category}
              </span>
              <span className="mt-1 block font-display text-lg font-bold text-white">
                {item.title}
              </span>
              <span className="mt-0.5 block font-body text-xs text-white/60">
                {item.event}
              </span>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
