'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import SectionHeading from '@/components/shared/SectionHeading';
import { ArrowRight } from 'lucide-react';

const galleryImages = [
  { id: 1, url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500&q=75', label: 'Wedding Gala', height: 240 },
  { id: 2, url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=75', label: 'Corporate Event', height: 300 },
  { id: 3, url: 'https://images.unsplash.com/photo-1594122230689-45899d9e6f69?w=500&q=75', label: 'Exhibition', height: 260 },
  { id: 4, url: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500&q=75', label: 'Awards Night', height: 220 },
  { id: 5, url: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=500&q=75', label: 'Education Fair', height: 280 },
  { id: 6, url: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=500&q=75', label: 'Exhibition', height: 240 },
  { id: 7, url: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=500&q=75', label: 'Wedding Decor', height: 300 },
  { id: 8, url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=500&q=75', label: 'Conference', height: 240 },
  { id: 9, url: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=500&q=75', label: 'Live Show', height: 280 },
  { id: 10, url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500&q=75', label: 'Bridal Show', height: 260 },
  { id: 11, url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&q=75', label: 'Construction Expo', height: 220 },
  { id: 12, url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=500&q=75', label: 'Seminar', height: 300 },
  { id: 13, url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=75', label: 'Interior Design', height: 240 },
  { id: 14, url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&q=75', label: 'Health Expo', height: 260 },
  { id: 15, url: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=500&q=75', label: 'Solar Energy', height: 280 },
  { id: 16, url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=75', label: 'Digital Summit', height: 220 },
  { id: 17, url: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=500&q=75', label: 'Celebration', height: 300 },
  { id: 18, url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&q=75', label: 'Gala Dinner', height: 240 },
  { id: 19, url: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=500&q=75', label: 'Festival', height: 260 },
  { id: 20, url: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=500&q=75', label: 'Stage Show', height: 280 },
  { id: 21, url: 'https://images.unsplash.com/photo-1478147427282-58a87a120781?w=500&q=75', label: 'Product Launch', height: 240 },
  { id: 22, url: 'https://images.unsplash.com/photo-1530023367847-a683933f4172?w=500&q=75', label: 'Networking', height: 260 },
  { id: 23, url: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=500&q=75', label: 'Team Building', height: 280 },
  { id: 24, url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=500&q=75', label: 'Grand Opening', height: 240 },
];

export default function GalleryTeaser() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const reveals = el.querySelectorAll('.reveal');
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

    reveals.forEach((r) => observer.observe(r));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-warm relative py-24 sm:py-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Our Gallery"
          title="Moments We've Made Magic"
          subtitle="A glimpse into the extraordinary events we've brought to life across Sri Lanka."
        />

        {/* Masonry Grid — pure Tailwind, no styled-jsx */}
        <div className="reveal columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
          {galleryImages.map((img) => (
            <div
              key={img.id}
              className="mb-4 break-inside-avoid group cursor-pointer"
            >
              <div
                role="img"
                aria-label={`${img.label} event photo`}
                className="w-full rounded-xl overflow-hidden relative transition-all duration-500 group-hover:scale-[1.03] group-hover:shadow-lg"
                style={{
                  height: `${img.height}px`,
                  backgroundImage: `url(${img.url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  border: '1px solid rgba(0,0,0,0.06)',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                }}
              >
                {/* Subtle dot pattern */}
                <div
                  className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)',
                    backgroundSize: '16px 16px',
                  }}
                />
                {/* Slide-up overlay on hover */}
                <div
                  className="absolute inset-x-0 bottom-0 flex items-end justify-center p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                  style={{
                    background: 'linear-gradient(to top, rgba(26,86,219,0.75) 0%, transparent 100%)',
                    height: '60%',
                  }}
                >
                  <span
                    className="font-ui text-xs uppercase tracking-wider px-4 py-2 rounded-full mb-2"
                    style={{
                      backgroundColor: 'rgba(26,86,219,0.6)',
                      color: 'var(--color-off-white)',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    {img.label}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="reveal mt-14 text-center">
          <Link
            href="/gallery"
            className="group inline-flex items-center gap-2 font-ui text-sm font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 min-h-12"
            style={{
              color: '#0f0f14',
              border: '1px solid rgba(0,0,0,0.12)',
              backgroundColor: 'rgba(0,0,0,0.02)',
            }}
          >
            View Full Gallery
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
