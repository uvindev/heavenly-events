'use client';

import { useEffect, useRef } from 'react';
import { Star, Award, Medal, Sparkles } from 'lucide-react';
import MagneticButton from '@/components/shared/MagneticButton';
import Card from '@/components/ui/Card';

const platinumSponsors = [
  {
    name: 'Ceylon Premium Hotels',
    description:
      'Sri Lanka\'s premier hospitality group, providing world-class venue partnerships and accommodation for our flagship events.',
    gradient: 'linear-gradient(135deg, #D4006A22, #f0f1f5 60%, #7B00E022)',
    initials: 'CPH',
  },
  {
    name: 'Lanka Digital Corp',
    description:
      'Leading technology partner powering our digital event infrastructure, live streaming, and attendee engagement platforms.',
    gradient: 'linear-gradient(135deg, #1A1AFF22, #f0f1f5 60%, #C8E00022)',
    initials: 'LDC',
  },
];

const goldSponsors = [
  { name: 'Island Catering Co.', initials: 'ICC', color: '#FF6B00' },
  { name: 'Sapphire Jewellers', initials: 'SJ', color: '#1A1AFF' },
  { name: 'Royal Decor Studios', initials: 'RDS', color: '#D4006A' },
  { name: 'Colombo Fashion Week', initials: 'CFW', color: '#7B00E0' },
  { name: 'Ceylon Auto Group', initials: 'CAG', color: '#C8E000' },
  { name: 'Tropicana Beverages', initials: 'TB', color: '#FF2200' },
];

const silverSponsors = [
  'Ocean View Resorts',
  'Peak Audio Systems',
  'Lotus Floristry',
  'Prime Media Group',
  'Grand Ballroom Colombo',
  'Silk & Spice Catering',
  'Pearl Productions',
  'Metro Print Solutions',
  'Elite Security Services',
  'Cloud Nine Photography',
  'Harmony Music Academy',
  'Green Leaf Organics',
];

export default function SponsorsPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
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
    <>
      <main ref={sectionRef}>
        {/* Hero */}
        <section
          className="relative flex min-h-[50vh] items-center justify-center overflow-hidden pt-24 pb-16"
          style={{ backgroundColor: 'var(--bg-secondary)' }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(26,86,219,0.06) 0%, transparent 70%)',
            }}
          />
          <div className="relative z-10 mx-auto max-w-4xl px-6 text-center sm:px-8">
            <span
              className="gradient-text font-ui text-sm font-semibold uppercase"
              style={{ letterSpacing: 'var(--tracking-wider)' }}
            >
              Partners & Sponsors
            </span>
            <h1
              className="font-display mt-4 font-bold"
              style={{
                fontSize: 'var(--text-h1)',
                lineHeight: 'var(--leading-tight)',
                color: 'var(--text-primary)',
              }}
            >
              Our Valued Partners
            </h1>
            <p
              className="font-body mx-auto mt-5 max-w-2xl"
              style={{
                fontSize: 'var(--text-body)',
                color: 'var(--text-secondary)',
                lineHeight: 'var(--leading-relaxed)',
              }}
            >
              The brands that make our events extraordinary. Together, we create experiences that
              resonate, inspire, and leave lasting impressions on thousands of attendees.
            </p>
          </div>
        </section>

        {/* Platinum Sponsors */}
        <section
          className="py-20 sm:py-28"
          style={{ backgroundColor: 'var(--bg-primary)' }}
        >
          <div className="mx-auto max-w-6xl px-6 sm:px-8">
            <div className="reveal mb-12 flex items-center justify-center gap-3">
              <Star className="h-5 w-5" style={{ color: '#D4006A' }} />
              <h2
                className="font-display font-bold"
                style={{
                  fontSize: 'var(--text-h3)',
                  color: 'var(--text-primary)',
                }}
              >
                Platinum Partners
              </h2>
              <Star className="h-5 w-5" style={{ color: '#D4006A' }} />
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {platinumSponsors.map((sponsor, i) => (
                <Card key={sponsor.name}as="article">
                  <div
                    className="reveal flex flex-col items-center gap-6 p-4 sm:flex-row sm:items-start"
                    style={{ '--index': i } as React.CSSProperties}
                  >
                    {/* Logo placeholder */}
                    <div
                      className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl"
                      style={{
                        background: sponsor.gradient,
                        border: '1px solid var(--glass-border)',
                      }}
                    >
                      <span
                        className="font-display text-2xl font-bold"
                        style={{ color: 'var(--color-crimson)' }}
                      >
                        {sponsor.initials}
                      </span>
                    </div>

                    <div>
                      <h3
                        className="font-display font-bold"
                        style={{
                          fontSize: 'var(--text-h4)',
                          color: 'var(--text-primary)',
                        }}
                      >
                        {sponsor.name}
                      </h3>
                      <p
                        className="font-body mt-2"
                        style={{
                          fontSize: 'var(--text-sm)',
                          color: 'var(--text-secondary)',
                          lineHeight: 'var(--leading-relaxed)',
                        }}
                      >
                        {sponsor.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Gold Sponsors */}
        <section
          className="py-20 sm:py-28"
          style={{ backgroundColor: 'var(--bg-secondary)' }}
        >
          <div className="mx-auto max-w-6xl px-6 sm:px-8">
            <div className="reveal mb-12 flex items-center justify-center gap-3">
              <Award className="h-5 w-5" style={{ color: '#FF6B00' }} />
              <h2
                className="font-display font-bold"
                style={{
                  fontSize: 'var(--text-h3)',
                  color: 'var(--text-primary)',
                }}
              >
                Gold Partners
              </h2>
              <Award className="h-5 w-5" style={{ color: '#FF6B00' }} />
            </div>

            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
              {goldSponsors.map((sponsor, i) => (
                <Card key={sponsor.name}>
                  <div
                    className="reveal flex flex-col items-center py-4 text-center"
                    style={{ '--index': i } as React.CSSProperties}
                  >
                    <div
                      className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl"
                      style={{
                        backgroundColor: `${sponsor.color}15`,
                        border: `1px solid ${sponsor.color}30`,
                      }}
                    >
                      <span
                        className="font-display text-lg font-bold"
                        style={{ color: sponsor.color }}
                      >
                        {sponsor.initials}
                      </span>
                    </div>
                    <h3
                      className="font-ui text-sm font-semibold"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {sponsor.name}
                    </h3>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Silver / Standard - Auto-scrolling strip */}
        <section
          className="py-20 sm:py-28"
          style={{ backgroundColor: 'var(--bg-primary)' }}
        >
          <div className="mx-auto max-w-6xl px-6 sm:px-8">
            <div className="reveal mb-12 flex items-center justify-center gap-3">
              <Medal className="h-5 w-5" style={{ color: 'var(--color-gray-400)' }} />
              <h2
                className="font-display font-bold"
                style={{
                  fontSize: 'var(--text-h3)',
                  color: 'var(--text-primary)',
                }}
              >
                Silver & Supporting Partners
              </h2>
              <Medal className="h-5 w-5" style={{ color: 'var(--color-gray-400)' }} />
            </div>
          </div>

          {/* Auto-scrolling strip */}
          <div className="relative overflow-hidden" ref={scrollRef}>
            <div
              className="animate-sponsor-scroll flex gap-8"
              style={{ width: 'max-content' }}
            >
              {/* Duplicate for seamless loop */}
              {[...silverSponsors, ...silverSponsors].map((name, i) => (
                <div
                  key={`${name}-${i}`}
                  className="glass-card flex h-20 w-48 shrink-0 items-center justify-center rounded-xl px-6"
                >
                  <span
                    className="font-ui text-sm font-semibold text-center"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {name}
                  </span>
                </div>
              ))}
            </div>

            {/* Gradient fades */}
            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-24"
              style={{
                background: 'linear-gradient(to right, var(--bg-primary), transparent)',
              }}
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 w-24"
              style={{
                background: 'linear-gradient(to left, var(--bg-primary), transparent)',
              }}
            />
          </div>
        </section>

        {/* CTA */}
        <section
          className="relative overflow-hidden py-20 sm:py-28"
          style={{
            background: 'linear-gradient(135deg, #1a3a8a 0%, #1e40af 40%, #1a56db 100%)',
          }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 50% 60% at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 70%)',
            }}
          />
          <div className="relative z-10 mx-auto max-w-3xl px-6 text-center sm:px-8">
            <div className="reveal">
              <Sparkles
                className="mx-auto mb-4 h-8 w-8"
                style={{ color: '#ffffff' }}
              />
              <h2
                className="font-display font-bold"
                style={{
                  fontSize: 'var(--text-h2)',
                  lineHeight: 'var(--leading-tight)',
                  color: '#ffffff',
                }}
              >
                Interested in Sponsoring an Event?
              </h2>
              <p
                className="font-body mx-auto mt-4 max-w-xl"
                style={{
                  fontSize: 'var(--text-body)',
                  color: 'rgba(255,255,255,0.8)',
                  lineHeight: 'var(--leading-relaxed)',
                }}
              >
                Partner with Sri Lanka&apos;s leading event company. Reach thousands of engaged
                attendees and elevate your brand presence through our high-impact events.
              </p>
              <div className="mt-8">
                <MagneticButton
                  href="/contact?type=sponsor"
                  variant="primary"
                  size="lg"
                >
                  Become a Sponsor &rarr;
                </MagneticButton>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
