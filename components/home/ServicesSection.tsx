'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  CalendarCheck,
  Heart,
  GraduationCap,
  Building2,
  Monitor,
  Handshake,
} from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';

const serviceImages: Record<string, string> = {
  'events-exhibition-management': 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700&q=75',
  'wedding-shows': 'https://images.unsplash.com/photo-1519741497674-611481863552?w=700&q=75',
  'education-fairs': 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=700&q=75',
  'trade-expos': 'https://images.unsplash.com/photo-1594122230689-45899d9e6f69?w=700&q=75',
  'digital-solutions': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=75',
  'client-event-management': 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=700&q=75',
};

const services = [
  {
    icon: CalendarCheck,
    name: 'Events & Exhibition Management',
    description:
      'From concept to execution, we manage world-class exhibitions and corporate events that leave lasting impressions. Our team handles every detail so you can focus on what matters.',
    color: '#1a56db',
    slug: 'events-exhibition-management',
  },
  {
    icon: Heart,
    name: 'Wedding Shows',
    description:
      'Sri Lanka\'s most spectacular wedding exhibitions, connecting couples with the finest vendors, designers, and venues to craft their dream celebration.',
    color: '#1a56db',
    slug: 'wedding-shows',
  },
  {
    icon: GraduationCap,
    name: 'Education Fairs',
    description:
      'Bridging students with world-class universities and institutions. Our education fairs connect thousands of aspiring learners with global opportunities.',
    color: '#1a56db',
    slug: 'education-fairs',
  },
  {
    icon: Building2,
    name: 'Trade Expos',
    description:
      'High-impact trade exhibitions that bring together industry leaders, innovators, and businesses. Creating platforms for meaningful connections and growth.',
    color: '#1a56db',
    slug: 'trade-expos',
  },
  {
    icon: Monitor,
    name: 'Digital Solutions',
    description:
      'Cutting-edge digital event solutions including virtual venues, live streaming, interactive registrations, and comprehensive event technology platforms.',
    color: '#1a56db',
    slug: 'digital-solutions',
  },
  {
    icon: Handshake,
    name: 'Client Event Management',
    description:
      'End-to-end event management tailored to your vision. We partner with brands and organizations to deliver bespoke events that exceed expectations.',
    color: '#1a56db',
    slug: 'client-event-management',
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const reveals = el.querySelectorAll('.reveal, .reveal-left, .reveal-right');
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
      className="section-warm-alt relative py-24 sm:py-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="What We Do"
          title="Every Celebration Deserves Perfection"
          subtitle="From intimate gatherings to grand exhibitions, our services span the full spectrum of event excellence."
        />

        <div className="space-y-20 sm:space-y-32">
          {services.map((service, i) => {
            const Icon = service.icon;
            const isReversed = i % 2 !== 0;

            return (
              <div
                key={service.slug}
                className={`${isReversed ? 'reveal-right' : 'reveal-left'} flex flex-col gap-8 sm:gap-14 items-center
                  ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'}`}
                style={{ '--index': i % 2 } as React.CSSProperties}
              >
                {/* Image Area */}
                <div className="w-full md:w-1/2 relative">
                  <div
                    className="relative rounded-2xl overflow-hidden group"
                    style={{
                      aspectRatio: '4/3',
                      backgroundImage: `url(${serviceImages[service.slug] || ''})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundColor: '#e8ecf4',
                    }}
                  >
                    {/* Blue-tinted overlay */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(135deg, rgba(26,86,219,0.05) 0%, rgba(0,0,0,0.1) 50%, rgba(26,86,219,0.08) 100%)',
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon
                        className="w-20 h-20 sm:w-24 sm:h-24 opacity-40 transition-all duration-500 group-hover:opacity-60 group-hover:scale-110 drop-shadow-lg"
                        style={{ color: '#ffffff' }}
                      />
                    </div>
                    {/* Hover overlay */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: 'linear-gradient(135deg, rgba(26,86,219,0.12) 0%, transparent 100%)',
                      }}
                    />
                  </div>
                </div>

                {/* Text Content */}
                <div className="w-full md:w-1/2">
                  <div
                    className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6 transition-all duration-300"
                    style={{
                      background: 'rgba(0,0,0,0.02)',
                      border: '1px solid rgba(0,0,0,0.06)',
                    }}
                  >
                    <Icon className="w-7 h-7 transition-transform duration-300 hover:scale-110" style={{ color: service.color }} />
                  </div>

                  <h3
                    className="font-display font-bold"
                    style={{
                      fontSize: 'var(--text-h2)',
                      lineHeight: 'var(--leading-snug)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {service.name}
                  </h3>

                  <p
                    className="font-body mt-5 text-base sm:text-lg"
                    style={{
                      lineHeight: 'var(--leading-relaxed)',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {service.description}
                  </p>

                  <Link
                    href={`/services#${service.slug}`}
                    className="inline-flex items-center gap-2 font-ui text-sm font-semibold mt-8 min-h-12 px-6 py-2.5 rounded-full transition-all duration-300 hover:scale-105 group/link"
                    style={{
                      color: '#0f0f14',
                      backgroundColor: 'rgba(0,0,0,0.02)',
                      border: '1px solid rgba(0,0,0,0.1)',
                    }}
                  >
                    Explore
                    <span className="inline-block transition-transform duration-300 group-hover/link:translate-x-1">&rarr;</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
