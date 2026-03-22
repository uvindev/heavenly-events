'use client';

import { useEffect, useRef } from 'react';
import SectionHeading from '@/components/shared/SectionHeading';
import EventCard, { type EventData } from '@/components/events/EventCard';
import Link from 'next/link';

const mockEvents: EventData[] = [
  {
    title: 'Colombo Wedding Show',
    slug: 'colombo-wedding-show-2026',
    category: 'Wedding Show',
    date: '2026-07-18',
    venue: 'BMICH',
    city: 'Colombo',
    primaryColor: '#C9A84C',
    registrationCount: 1240,
  },
  {
    title: 'Colombo Education Fair 2026 - BMICH',
    slug: 'colombo-education-fair-2026',
    category: 'Education Fair',
    date: '2026-08-15',
    venue: 'BMICH',
    city: 'Colombo',
    primaryColor: '#D32F2F',
    registrationCount: 890,
  },
  {
    title: 'Kedella Home & Construction Show',
    slug: 'kedella-home-construction-show-2026',
    category: 'Trade Expo',
    date: '2026-09-05',
    venue: 'TBA',
    city: 'Colombo',
    primaryColor: '#5D4037',
    registrationCount: 2100,
  },
  {
    title: 'Galle Education Fair',
    slug: 'galle-education-fair',
    category: 'Education Fair',
    date: '2026-08-29',
    venue: 'TBA Galle',
    city: 'Galle',
    primaryColor: '#D32F2F',
    registrationCount: 650,
  },
  {
    title: 'Furniture & Interior Expo',
    slug: 'colombo-furniture-interior-expo',
    category: 'Trade Expo',
    date: '2026-10-10',
    venue: 'TBA',
    city: 'Colombo',
    primaryColor: '#6D4C41',
    registrationCount: 430,
  },
  {
    title: 'Health Expo',
    slug: 'health-expo-sri-lanka-2026',
    category: 'Health Expo',
    date: '2026-11-07',
    venue: 'TBA',
    city: 'Colombo',
    primaryColor: '#0D47A1',
    registrationCount: 1560,
  },
  {
    title: 'EDU FAIR KURUNEGALA',
    slug: 'edu-fair-kurunegala',
    category: 'Education Fair',
    date: '2026-09-19',
    venue: 'TBA',
    city: 'Kurunegala',
    primaryColor: '#D32F2F',
    registrationCount: 780,
  },
  {
    title: 'Solar Energy Expo',
    slug: 'solar-energy-expo-sri-lanka',
    category: 'Trade Expo',
    date: '2025-11-15',
    venue: 'TBA',
    city: 'Colombo',
    primaryColor: '#1565C0',
    registrationCount: 1020,
  },
];

export default function UpcomingEventsSection() {
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
      { threshold: 0.05 }
    );

    reveals.forEach((r) => observer.observe(r));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="section-warm-alt relative py-24 sm:py-32 sparkle-dots">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Upcoming Events"
          title="What's Happening in Sri Lanka"
          subtitle="Register free for our upcoming events and be part of something extraordinary."
        />

        {/* Responsive grid — all 8 events visible on all sizes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
          {mockEvents.map((event, i) => (
            <div
              key={event.slug}
              className="reveal transition-all duration-400 hover:scale-[1.03] hover:-translate-y-1"
              style={{ '--index': i } as React.CSSProperties}
            >
              <EventCard event={event} />
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="reveal mt-14 text-center" style={{ '--index': 2 } as React.CSSProperties}>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 font-ui text-base font-semibold px-8 py-3 min-h-12 rounded-full transition-all duration-300 hover:scale-105 group"
            style={{
              color: '#ffffff',
              background: 'linear-gradient(135deg, #1a56db 0%, #1e40af 100%)',
              boxShadow: '0 4px 24px rgba(26, 86, 219, 0.2)',
            }}
          >
            View All Events
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
