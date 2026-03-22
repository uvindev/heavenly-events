'use client';

import Link from 'next/link';
import { Calendar, MapPin, Users } from 'lucide-react';

const eventImages: Record<string, string> = {
  'colombo-wedding-show': 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=75',
  'colombo-wedding-show-2026': 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=75',
  'colombo-education-fair-2026': 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&q=75',
  'kedella-home-construction-show': 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=75',
  'kedella-home-construction-show-2026': 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=75',
  'galle-education-fair': 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=75',
  'colombo-furniture-interior-expo': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=75',
  'health-expo-sri-lanka-2026': 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=75',
  'edu-fair-kurunegala': 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&q=75',
  'solar-energy-expo-sri-lanka': 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=75',
};

export interface EventData {
  title: string;
  slug: string;
  category: string;
  date: string;
  venue: string;
  city: string;
  primaryColor: string;
  registrationCount: number;
  coverImage?: string;
}

interface EventCardProps {
  event: EventData;
}

function getDaysLeft(dateStr: string): number {
  const eventDate = new Date(dateStr);
  const now = new Date();
  const diff = eventDate.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export default function EventCard({ event }: EventCardProps) {
  const daysLeft = getDaysLeft(event.date);
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <Link href={`/events/${event.slug}`} className="group block">
      <article
        onMouseMove={handleMouseMove}
        className="glass-card cursor-glow hover-lift overflow-hidden transition-all duration-300 ease-out
          group-hover:-translate-y-1.5 group-hover:shadow-lg relative"
        style={
          {
            '--event-color': event.primaryColor,
          } as React.CSSProperties
        }
      >
        {/* Color Accent Top Border */}
        <div
          className="h-1 w-full"
          style={{ backgroundColor: event.primaryColor }}
        />

        {/* Cover Image */}
        <div className="relative aspect-video overflow-hidden">
          <div
            className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
            style={{
              backgroundImage: `linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.35)), url(${eventImages[event.slug] || ''})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundColor: '#f8f9fa',
            }}
          />

          {/* Category Badge */}
          <div className="absolute top-3 left-3 z-10">
            <span
              className="font-ui text-xs font-semibold px-3 py-1 rounded-full"
              style={{
                backgroundColor: `${event.primaryColor}cc`,
                color: '#fff',
              }}
            >
              {event.category}
            </span>
          </div>

          {/* Countdown */}
          {daysLeft > 0 && (
            <div className="absolute top-3 right-3 z-10">
              <span
                className="font-mono text-xs font-medium px-2.5 py-1 rounded-full"
                style={{
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  color: '#ffffff',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {daysLeft} day{daysLeft !== 1 ? 's' : ''} left
              </span>
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-5 sm:p-6">
          <h3
            className="font-ui font-bold text-base sm:text-lg leading-snug line-clamp-2"
            style={{ color: 'var(--text-primary)' }}
          >
            {event.title}
          </h3>

          <div className="mt-3 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 shrink-0" style={{ color: 'var(--text-muted)' }} />
              <span className="font-body text-sm" style={{ color: 'var(--text-secondary)' }}>
                {formattedDate}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 shrink-0" style={{ color: 'var(--text-muted)' }} />
              <span className="font-body text-sm" style={{ color: 'var(--text-secondary)' }}>
                {event.venue}, {event.city}
              </span>
            </div>
          </div>

          {/* Attendee Count */}
          <div className="mt-4 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" style={{ color: event.primaryColor }} />
            <span className="font-body text-xs" style={{ color: 'var(--text-muted)' }}>
              {event.registrationCount.toLocaleString()} people registered
            </span>
          </div>

          {/* CTA */}
          <div className="mt-5">
            <span
              className="inline-flex items-center font-ui text-sm font-semibold transition-colors duration-200"
              style={{ color: event.primaryColor }}
            >
              Register Free &rarr;
            </span>
          </div>
        </div>

        {/* Accent bottom border on hover */}
        <div
          className="absolute bottom-0 left-0 w-full h-0.5 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
          style={{ backgroundColor: event.primaryColor }}
        />
      </article>
    </Link>
  );
}
