'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Rocket,
  Monitor,
  Trophy,
  Heart,
  Lightbulb,
  Crown,
  Linkedin,
  Instagram,
  Globe,
} from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import MagneticButton from '@/components/shared/MagneticButton';
import Card from '@/components/ui/Card';

const differentiators = [
  {
    icon: Rocket,
    title: 'Pioneering Events',
    description:
      'First to introduce many groundbreaking event formats in Sri Lanka, from hybrid exhibitions to immersive brand activations that set industry standards.',
    color: '#1a56db',
  },
  {
    icon: Monitor,
    title: 'Digital Maestros',
    description:
      'Our in-house digital team creates stunning event websites, registration systems, and virtual experiences that extend your event beyond physical boundaries.',
    color: '#2563eb',
  },
  {
    icon: Trophy,
    title: 'Unparalleled Expertise',
    description:
      'Over 500 events delivered with precision. Our experience spans corporate summits, mega exhibitions, wedding shows, education fairs, and private celebrations.',
    color: '#1a56db',
  },
  {
    icon: Heart,
    title: 'Client-Centric Approach',
    description:
      'Your vision is our blueprint. We listen, adapt, and deliver beyond expectations. Every client relationship is built on trust, transparency, and mutual respect.',
    color: '#2563eb',
  },
  {
    icon: Lightbulb,
    title: 'Innovation at Heart',
    description:
      'From AI-powered attendee insights to AR-enhanced exhibitions, we continuously push the boundaries of what events can be and achieve.',
    color: '#1a56db',
  },
  {
    icon: Crown,
    title: 'Legacy of Excellence',
    description:
      '18 years of consistently delivering world-class events has earned us the trust of Sri Lanka\'s leading brands, institutions, and families.',
    color: '#2563eb',
  },
];

const pillars = [
  { label: 'Marketing', value: 100 },
  { label: 'Solution', value: 100 },
  { label: 'Success', value: 100 },
];

const teamMembers = [
  {
    name: 'Amila',
    role: 'CEO & Director',
    description: 'Visionary leader with 18+ years steering Heavenly Events to the forefront of Sri Lanka\'s event industry.',
    color: '#1a56db',
    socials: { linkedin: '#', instagram: '#' },
  },
  {
    name: 'Dilshan',
    role: 'Head of Marketing',
    description: 'Strategic marketing mind behind the brand campaigns that make our events impossible to miss.',
    color: '#2563eb',
    socials: { linkedin: '#', instagram: '#' },
  },
  {
    name: 'Kumanayaka',
    role: 'Head of Sales & Promotions',
    description: 'Building lasting partnerships with sponsors, exhibitors, and clients across all industries.',
    color: '#1a56db',
    socials: { linkedin: '#', instagram: '#' },
  },
  {
    name: 'Uvin',
    role: 'Head of Digital Media & Data Analysis / IAMUVIN',
    description: 'Creative technologist crafting digital experiences, event platforms, and brand identities that push boundaries.',
    color: '#2563eb',
    socials: { linkedin: '#', instagram: '#', website: 'https://iamuvin.com' },
  },
  {
    name: 'Sharmila',
    role: 'Head of Finance',
    description: 'Ensuring financial excellence and sustainable growth behind every event we deliver.',
    color: '#1a56db',
    socials: { linkedin: '#' },
  },
  {
    name: 'Menaka',
    role: 'Events Manager',
    description: 'On-ground commander orchestrating seamless execution of every event from setup to strike.',
    color: '#2563eb',
    socials: { linkedin: '#', instagram: '#' },
  },
];

function AnimatedProgressBar({ label, value }: { label: string; value: number }) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          el.style.width = `${value}%`;
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div className="mb-6">
      <div className="mb-2 flex items-center justify-between">
        <span
          className="font-ui text-sm font-semibold"
          style={{ color: 'var(--text-primary)' }}
        >
          {label}
        </span>
        <span
          className="font-mono text-sm"
          style={{ color: 'var(--text-secondary)' }}
        >
          {value}%
        </span>
      </div>
      <div
        className="h-2 overflow-hidden rounded-full"
        style={{ backgroundColor: 'var(--bg-elevated)' }}
      >
        <div
          ref={barRef}
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: '0%',
            background: 'var(--gradient-accent)',
          }}
        />
      </div>
    </div>
  );
}

export default function AboutPage() {
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
          className="relative flex items-center justify-center overflow-hidden pt-32 pb-20"
          style={{ backgroundColor: 'var(--bg-secondary)' }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 60% 50% at 50% 30%, rgba(26,86,219,0.06) 0%, transparent 70%)',
            }}
          />
          <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <span
              className="font-ui text-sm font-semibold uppercase"
              style={{ letterSpacing: 'var(--tracking-wider)', color: '#1a56db' }}
            >
              About Us
            </span>
            <h1
              className="font-display mt-4 font-bold"
              style={{
                fontSize: 'var(--text-h1)',
                lineHeight: 'var(--leading-tight)',
                color: 'var(--text-primary)',
              }}
            >
              18 Years of Making Sri Lanka Celebrate
            </h1>
            <p
              className="font-body mx-auto mt-5 max-w-2xl"
              style={{
                fontSize: 'var(--text-body)',
                color: 'var(--text-secondary)',
                lineHeight: 'var(--leading-relaxed)',
              }}
            >
              From a bold idea to the nation&apos;s most trusted event company, Heavenly Events has
              been shaping how Sri Lanka celebrates, connects, and inspires.
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section
          className="py-20 sm:py-28"
          style={{ backgroundColor: 'var(--bg-primary)' }}
        >
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="reveal space-y-6">
              <p
                className="font-body"
                style={{
                  fontSize: 'var(--text-body)',
                  color: 'var(--text-secondary)',
                  lineHeight: 'var(--leading-relaxed)',
                }}
              >
                Heavenly Events stands as a beacon of excellence in Sri Lanka&apos;s events industry.
                For over 18 years, we have been at the forefront of creating extraordinary
                experiences that transcend the ordinary. From our humble beginnings, we have grown
                into a full-service event management powerhouse, trusted by the nation&apos;s leading
                brands, institutions, and families.
              </p>
              <p
                className="font-body"
                style={{
                  fontSize: 'var(--text-body)',
                  color: 'var(--text-secondary)',
                  lineHeight: 'var(--leading-relaxed)',
                }}
              >
                Our journey has been marked by relentless innovation, unwavering commitment to
                quality, and a deep understanding of what makes events truly memorable. We don&apos;t
                just organize events — we craft experiences that leave lasting impressions, build
                meaningful connections, and create moments that people cherish forever.
              </p>
              <p
                className="font-body"
                style={{
                  fontSize: 'var(--text-body)',
                  color: 'var(--text-secondary)',
                  lineHeight: 'var(--leading-relaxed)',
                }}
              >
                Today, Heavenly Events is synonymous with excellence in event management across Sri
                Lanka. Our portfolio spans corporate summits, mega exhibitions, wedding shows,
                education fairs, concerts, and bespoke private celebrations — each delivered with
                the same passion and precision that has become our hallmark.
              </p>
            </div>
          </div>
        </section>

        {/* Key Differentiators */}
        <section
          className="py-20 sm:py-28"
          style={{ backgroundColor: 'var(--bg-secondary)' }}
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              label="What Sets Us Apart"
              title="Six Pillars of Our Excellence"
              subtitle="The qualities that have made Heavenly Events the gold standard in Sri Lankan event management."
            />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {differentiators.map((diff, i) => {
                const Icon = diff.icon;
                return (
                  <Card key={diff.title}as="article">
                    <div
                      className="reveal"
                      style={{ '--index': i } as React.CSSProperties}
                    >
                      <div
                        className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl"
                        style={{
                          backgroundColor: `${diff.color}15`,
                          border: `1px solid ${diff.color}30`,
                        }}
                      >
                        <Icon className="h-6 w-6" style={{ color: diff.color }} />
                      </div>
                      <h3
                        className="font-display font-bold"
                        style={{
                          fontSize: 'var(--text-h4)',
                          color: 'var(--text-primary)',
                        }}
                      >
                        {diff.title}
                      </h3>
                      <p
                        className="font-body mt-3"
                        style={{
                          fontSize: 'var(--text-sm)',
                          color: 'var(--text-secondary)',
                          lineHeight: 'var(--leading-relaxed)',
                        }}
                      >
                        {diff.description}
                      </p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section
          className="relative overflow-hidden py-20 sm:py-28"
          style={{ backgroundColor: 'var(--bg-secondary)' }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 50% 60% at 50% 50%, rgba(26,86,219,0.05) 0%, transparent 70%)',
            }}
          />
          <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <div className="reveal">
              <span
                className="gradient-text font-ui text-sm font-semibold uppercase"
                style={{ letterSpacing: 'var(--tracking-wider)' }}
              >
                Our Mission
              </span>
              <h2
                className="font-display mt-4 font-bold"
                style={{
                  fontSize: 'var(--text-h2)',
                  lineHeight: 'var(--leading-tight)',
                  color: 'var(--text-primary)',
                }}
              >
                The Mission We Carry Into Every Event
              </h2>
              <p
                className="font-body mx-auto mt-6 max-w-2xl"
                style={{
                  fontSize: 'var(--text-body)',
                  color: 'var(--text-secondary)',
                  lineHeight: 'var(--leading-relaxed)',
                }}
              >
                To elevate every occasion into an extraordinary experience through innovative
                planning, flawless execution, and unwavering dedication to our clients&apos; vision.
                We believe that every event — no matter its scale — deserves the same level of
                passion, creativity, and perfection.
              </p>
            </div>

            {/* Three Pillars */}
            <div className="reveal mx-auto mt-12 w-full max-w-lg px-4 sm:mt-16 sm:px-0">
              {pillars.map((pillar) => (
                <AnimatedProgressBar
                  key={pillar.label}
                  label={pillar.label}
                  value={pillar.value}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section
          className="py-20 sm:py-28"
          style={{ backgroundColor: 'var(--bg-primary)' }}
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              label="The People Behind The Magic"
              title="Meet Our Team"
              subtitle="The passionate professionals who make every Heavenly event extraordinary."
            />

            <div className="grid grid-cols-2 gap-6 sm:gap-10 md:grid-cols-3">
              {teamMembers.map((member, i) => (
                <div
                  key={member.name}
                  className="reveal flex flex-col items-center text-center"
                  style={{ '--index': i } as React.CSSProperties}
                >
                  {/* Circular photo placeholder */}
                  <div
                    className="relative mb-6 h-36 w-36 overflow-hidden rounded-full"
                    style={{
                      border: `3px solid ${member.color}`,
                      boxShadow: `0 0 30px ${member.color}25`,
                    }}
                  >
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${member.color}22 0%, var(--bg-elevated) 60%, ${member.color}11 100%)`,
                      }}
                    >
                      <span
                        className="font-display text-3xl font-bold"
                        style={{ color: member.color }}
                      >
                        {member.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </span>
                    </div>
                  </div>

                  <h3
                    className="font-display font-bold"
                    style={{
                      fontSize: 'var(--text-h4)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {member.name}
                  </h3>
                  <span
                    className="font-ui mt-1 text-sm font-semibold"
                    style={{ color: member.color }}
                  >
                    {member.role}
                  </span>
                  <p
                    className="font-body mt-3 max-w-xs"
                    style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--text-secondary)',
                      lineHeight: 'var(--leading-relaxed)',
                    }}
                  >
                    {member.description}
                  </p>

                  {/* Social links */}
                  <div className="mt-4 flex items-center gap-3">
                    {member.socials.linkedin && (
                      <Link
                        href={member.socials.linkedin}
                        className="flex h-11 w-11 items-center justify-center rounded-full border transition-colors hover:border-(--color-crimson) hover:bg-(--color-crimson)"
                        style={{ borderColor: 'var(--border-primary)' }}
                        aria-label={`${member.name} LinkedIn`}
                      >
                        <Linkedin className="h-3.5 w-3.5" style={{ color: 'var(--text-secondary)' }} />
                      </Link>
                    )}
                    {member.socials.instagram && (
                      <Link
                        href={member.socials.instagram}
                        className="flex h-11 w-11 items-center justify-center rounded-full border transition-colors hover:border-(--color-crimson) hover:bg-(--color-crimson)"
                        style={{ borderColor: 'var(--border-primary)' }}
                        aria-label={`${member.name} Instagram`}
                      >
                        <Instagram className="h-3.5 w-3.5" style={{ color: 'var(--text-secondary)' }} />
                      </Link>
                    )}
                    {member.socials.website && (
                      <Link
                        href={member.socials.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-11 w-11 items-center justify-center rounded-full border transition-colors hover:border-(--color-crimson) hover:bg-(--color-crimson)"
                        style={{ borderColor: 'var(--border-primary)' }}
                        aria-label={`${member.name} Website`}
                      >
                        <Globe className="h-3.5 w-3.5" style={{ color: 'var(--text-secondary)' }} />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
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
          <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h2
              className="font-display font-bold"
              style={{
                fontSize: 'var(--text-h2)',
                lineHeight: 'var(--leading-tight)',
                color: '#ffffff',
              }}
            >
              Let&apos;s Write Your Story Together
            </h2>
            <p
              className="font-body mx-auto mt-4 max-w-xl"
              style={{
                fontSize: 'var(--text-body)',
                color: 'rgba(255,255,255,0.8)',
              }}
            >
              18 years of excellence, ready to serve your next event.
            </p>
            <div className="mt-8">
              <MagneticButton href="/contact" variant="primary" size="lg">
                Get In Touch &rarr;
              </MagneticButton>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
