'use client';

import CountdownTimer from './CountdownTimer';
import Badge from '@/components/ui/Badge';

interface EventHeroProps {
  title: string;
  coverImage?: string | null;
  primaryColor: string;
  eventDate: string;
  venueName: string;
  venueCity: string;
  category: string;
}

export default function EventHero({
  title,
  coverImage,
  primaryColor,
  eventDate,
  venueName,
  venueCity,
  category,
}: EventHeroProps) {
  const formattedDate = new Date(eventDate).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const hasImage = !!coverImage;

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative flex items-end" style={{ minHeight: 'clamp(450px, 55vw, 600px)' }}>
        {/* Cover image */}
        {hasImage ? (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${coverImage})`,
                filter: 'brightness(0.9)',
              }}
            />
            {/* Gradient overlay for readability */}
            <div
              className="absolute inset-0"
              style={{
                background: `
                  linear-gradient(to bottom,
                    rgba(0,0,0,0.15) 0%,
                    rgba(0,0,0,0.25) 30%,
                    rgba(0,0,0,0.5) 65%,
                    rgba(0,0,0,0.75) 100%
                  )
                `,
              }}
            />
          </>
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 80% 60% at 20% 80%, ${primaryColor}20 0%, transparent 60%),
                radial-gradient(ellipse 60% 50% at 80% 20%, ${primaryColor}15 0%, transparent 50%),
                radial-gradient(ellipse 100% 100% at 50% 100%, ${primaryColor}10 0%, transparent 70%),
                linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)
              `,
            }}
          />
        )}

        {/* Decorative orb */}
        {!hasImage && (
          <div
            className="absolute top-10 right-10 w-64 h-64 rounded-full opacity-20 blur-3xl animate-orb-float"
            style={{ backgroundColor: primaryColor }}
            aria-hidden="true"
          />
        )}

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 pb-12 pt-28 sm:pt-32">
          {/* Category badge */}
          <div className="mb-5">
            {hasImage ? (
              <span
                className="inline-block font-ui text-xs font-semibold px-4 py-1.5 rounded-full"
                style={{
                  backgroundColor: `${primaryColor}cc`,
                  color: '#fff',
                }}
              >
                {category}
              </span>
            ) : (
              <Badge label={category} category={category.toLowerCase().split(' ')[0]} size="md" />
            )}
          </div>

          {/* Title */}
          <h1
            className="font-display font-bold leading-tight max-w-3xl"
            style={{
              fontSize: 'var(--text-h1)',
              lineHeight: 'var(--leading-tight)',
              color: hasImage ? '#ffffff' : 'var(--text-primary)',
              textShadow: hasImage ? '0 2px 20px rgba(0,0,0,0.4)' : 'none',
            }}
          >
            {title}
          </h1>

          {/* Date and location */}
          <div className="mt-5 flex flex-wrap items-center gap-4 sm:gap-6">
            <span
              className="font-body text-base sm:text-lg"
              style={{ color: hasImage ? 'rgba(255,255,255,0.85)' : 'var(--text-secondary)' }}
            >
              {formattedDate}
            </span>
            <span
              className="hidden sm:inline"
              style={{ color: hasImage ? 'rgba(255,255,255,0.4)' : 'var(--text-muted)' }}
              aria-hidden="true"
            >
              |
            </span>
            <span
              className="font-body text-base sm:text-lg"
              style={{ color: hasImage ? 'rgba(255,255,255,0.85)' : 'var(--text-secondary)' }}
            >
              {venueName}, {venueCity}
            </span>
          </div>

          {/* Countdown */}
          <div className="mt-8 sm:mt-10">
            <CountdownTimer targetDate={eventDate} variant={hasImage ? 'dark' : 'light'} />
          </div>
        </div>
      </div>

      {/* Subtle divider */}
      <div className="h-px w-full" style={{ backgroundColor: 'var(--border-primary)' }} />
    </section>
  );
}
