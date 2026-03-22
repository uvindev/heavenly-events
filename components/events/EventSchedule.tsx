'use client';

import { useEffect, useRef } from 'react';
import { Clock } from 'lucide-react';

export interface ScheduleItem {
  time: string;
  title: string;
  description?: string | null;
}

interface EventScheduleProps {
  items: ScheduleItem[];
  eventColor?: string;
}

export default function EventSchedule({ items, eventColor = 'var(--color-crimson)' }: EventScheduleProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    const items = container.querySelectorAll('.schedule-item');
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  if (!items || items.length === 0) return null;

  return (
    <div ref={containerRef} className="relative">
      <h3
        className="font-ui text-lg font-bold mb-6"
        style={{ color: 'var(--text-primary)' }}
      >
        Event Schedule
      </h3>

      {/* Timeline line */}
      <div className="relative">
        <div
          className="absolute left-4 top-2 bottom-2 w-0.5"
          style={{ backgroundColor: `${eventColor}22` }}
        />

        <div className="space-y-6">
          {items.map((item, index) => (
            <div
              key={index}
              className="schedule-item reveal relative flex gap-5 pl-0"
              style={{ '--index': index } as React.CSSProperties}
            >
              {/* Dot */}
              <div className="relative z-10 shrink-0 mt-1">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: `${eventColor}18`,
                    border: `2px solid ${eventColor}`,
                  }}
                >
                  <Clock
                    className="w-3.5 h-3.5"
                    style={{ color: eventColor }}
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 pb-2">
                <span
                  className="font-mono text-xs font-medium tracking-wide"
                  style={{ color: eventColor }}
                >
                  {item.time}
                </span>
                <h4
                  className="font-ui text-base font-semibold mt-1"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {item.title}
                </h4>
                {item.description && (
                  <p
                    className="font-body text-sm mt-1 leading-relaxed"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
