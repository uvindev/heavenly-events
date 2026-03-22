'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Star } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';

interface Testimonial {
  id: number;
  name: string;
  eventType: string;
  quote: string;
  rating: number;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Samantha Perera',
    eventType: 'Wedding Exhibition',
    quote:
      'Heavenly Events transformed our vision into an unforgettable wedding fair. Every detail was flawless, from the vendor coordination to the breathtaking decor. Truly world-class.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=75',
  },
  {
    id: 2,
    name: 'Rajiv Fernando',
    eventType: 'Corporate Awards Night',
    quote:
      'Working with Heavenly Events was seamless from start to finish. They managed our corporate awards gala for 800 guests without a single hitch. Highly recommended for any large-scale event.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=75',
  },
  {
    id: 3,
    name: 'Nisha Jayawardena',
    eventType: 'Education Fair',
    quote:
      'The education fair they organized connected over 3,000 students with top universities. Their attention to logistics, flow, and experience design is unmatched in Sri Lanka.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=75',
  },
  {
    id: 4,
    name: 'Marcus de Silva',
    eventType: 'Trade Exhibition',
    quote:
      'Our trade expo saw record-breaking attendance thanks to Heavenly Events. Their digital marketing, on-ground execution, and sponsor management are best in class.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=75',
  },
  {
    id: 5,
    name: 'Anusha Wickremesinghe',
    eventType: 'Cultural Festival',
    quote:
      'They brought together art, music, and culture in a way that celebrated everything beautiful about Sri Lanka. An absolutely magical experience for everyone who attended.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=75',
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(advance, 6000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, advance]);

  // For desktop, show 3 at a time
  const getVisibleTestimonials = () => {
    const items: Testimonial[] = [];
    for (let i = 0; i < 3; i++) {
      const item = testimonials[(currentIndex + i) % testimonials.length];
      if (item) items.push(item);
    }
    return items;
  };

  const visible = getVisibleTestimonials();

  return (
    <section
      className="warm-gradient-bg relative py-24 sm:py-32 sparkle-dots"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Testimonials"
          title="Trusted by Sri Lanka's Best"
          subtitle="Hear from the people and organizations who have experienced the Heavenly difference."
        />

        {/* Mobile: horizontal scroll with better UX */}
        <div
          className="lg:hidden flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 -mx-4 px-4 sm:-mx-6 sm:px-6"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
        >
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
        {/* Mobile scroll hint */}
        <p className="lg:hidden text-center text-xs mt-2" style={{ color: '#7a7a8a' }}>
          Swipe to see more
        </p>

        {/* Desktop: 3 visible cards with crossfade */}
        <div
          className="hidden lg:grid lg:grid-cols-3 gap-8"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {visible.map((t, i) => (
            <div
              key={t.id}
              className="animate-fade-in"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <TestimonialCard testimonial={t} />
            </div>
          ))}
        </div>

        {/* Dots Indicator */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor:
                  i === currentIndex ? 'var(--color-gold)' : 'rgba(0,0,0,0.1)',
                transform: i === currentIndex ? 'scale(1.5)' : 'scale(1)',
              }}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div
      className="glass-warm-glow min-w-[85vw] sm:min-w-96 lg:min-w-0 snap-center shrink-0 p-7 sm:p-9"
    >
      {/* Stars */}
      <div className="flex gap-1 mb-6">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star
            key={i}
            className="w-5 h-5 fill-current"
            style={{ color: 'var(--color-gold)', filter: 'drop-shadow(0 0 6px rgba(26,86,219,0.4))' }}
          />
        ))}
      </div>

      {/* Quote */}
      <blockquote
        className="font-display text-lg sm:text-xl italic leading-relaxed"
        style={{ color: '#1a1a2e' }}
      >
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      {/* Attribution */}
      <div className="mt-7 pt-5 flex items-center gap-3" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <div
          className="w-10 h-10 rounded-full shrink-0 overflow-hidden"
          style={{
            backgroundImage: `url(${testimonial.avatar})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            border: '2px solid rgba(26,86,219,0.3)',
          }}
          role="img"
          aria-label={`Photo of ${testimonial.name}`}
        />
        <div>
          <p className="font-ui text-sm font-bold" style={{ color: '#0f0f14' }}>
            {testimonial.name}
          </p>
          <p className="font-body text-xs mt-0.5 font-medium uppercase tracking-wider" style={{ color: 'var(--color-gold)' }}>
            {testimonial.eventType}
          </p>
        </div>
      </div>
    </div>
  );
}
