'use client';

import { useEffect, useRef } from 'react';
import { Clock, CalendarCheck, Users, ThumbsUp } from 'lucide-react';
import AnimatedCounter from '@/components/shared/AnimatedCounter';

const stats = [
  { icon: Clock, value: 18, suffix: '+', label: 'Years of Excellence' },
  { icon: CalendarCheck, value: 500, suffix: '+', label: 'Events Delivered' },
  { icon: Users, value: 10000, suffix: '+', label: 'Happy Guests' },
  { icon: ThumbsUp, value: 98, suffix: '%', label: 'Client Satisfaction' },
];

export default function StatsBar() {
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
      { threshold: 0.15 }
    );

    reveals.forEach((r) => observer.observe(r));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const viewH = window.innerHeight;
      if (rect.top < viewH && rect.bottom > 0) {
        const offset = (rect.top - viewH / 2) * 0.08;
        section.style.backgroundPositionY = `${offset}px`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-28 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #eef2ff 0%, #e8eeff 50%, #f0f4ff 100%)',
        transition: 'background-position-y 0.1s linear',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="p-8 sm:p-12 lg:p-16"
          style={{
            background: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(26,86,219,0.08)',
            borderRadius: '1.5rem',
            boxShadow: '0 4px 24px rgba(26,86,219,0.06), 0 1px 3px rgba(0,0,0,0.04)',
          }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="reveal flex flex-col items-center text-center relative"
                  style={{
                    '--index': i,
                  } as React.CSSProperties}
                >
                  {/* Top accent line */}
                  <div
                    className="w-12 h-0.5 mb-6 rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, #1a56db, #3b82f6)',
                    }}
                  />

                  <div
                    className="flex items-center justify-center w-14 h-14 rounded-xl mb-5"
                    style={{
                      background: 'rgba(26,86,219,0.06)',
                      border: '1px solid rgba(26,86,219,0.1)',
                    }}
                  >
                    <Icon
                      className="w-7 h-7"
                      style={{ color: '#1a56db' }}
                    />
                  </div>

                  <span className="flex items-baseline justify-center">
                    <AnimatedCounter
                      target={stat.value}
                      suffix=""
                      className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold"
                      style={{ color: '#1a56db' }}
                    />
                    <span
                      className="font-display text-2xl sm:text-3xl lg:text-4xl font-medium ml-0.5"
                      style={{ color: '#60a5fa' }}
                    >
                      {stat.suffix}
                    </span>
                  </span>

                  <span
                    className="font-body text-xs sm:text-sm uppercase tracking-[0.2em] mt-4 font-medium"
                    style={{ color: '#64748b' }}
                  >
                    {stat.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
