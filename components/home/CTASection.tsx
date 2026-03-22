'use client';

import { useEffect, useRef } from 'react';
import { Phone, Mail } from 'lucide-react';

export default function CTASection() {
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

  return (
    <section
      ref={sectionRef}
      className="relative py-28 sm:py-40 overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* Dark blue overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(10,25,60,0.88) 0%, rgba(15,35,80,0.92) 50%, rgba(10,20,55,0.9) 100%)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="reveal">
          <h2
            className="font-display font-bold"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              lineHeight: '1.1',
              color: '#fff',
              letterSpacing: '-0.02em',
            }}
          >
            Let&apos;s Create Something{' '}
            <span className="font-bold" style={{ color: '#ffffff' }}>Extraordinary</span>
          </h2>
        </div>

        <div className="reveal mt-8" style={{ '--index': 1 } as React.CSSProperties}>
          <p
            className="font-body max-w-2xl mx-auto text-lg sm:text-xl"
            style={{
              color: 'rgba(255,255,255,0.75)',
              lineHeight: '1.7',
            }}
          >
            18 years of experience crafting unforgettable moments. Ready to make your event perfect.
          </p>
        </div>

        <div className="reveal mt-12" style={{ '--index': 2 } as React.CSSProperties}>
          <a
            href="/contact"
            className="inline-flex items-center justify-center font-ui font-semibold text-lg px-10 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg min-h-12"
            style={{
              color: '#ffffff',
              backgroundColor: 'rgba(59,130,246,0.7)',
              border: '1px solid rgba(255,255,255,0.2)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <span className="relative z-10">Start Planning &rarr;</span>
          </a>
        </div>

        {/* Contact Info */}
        <div
          className="reveal mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8"
          style={{ '--index': 3 } as React.CSSProperties}
        >
          <a
            href="tel:+94777776357"
            className="flex items-center gap-2.5 font-ui text-base sm:text-lg font-semibold min-h-12 px-5 py-2 rounded-full transition-all duration-300 hover:scale-105"
            style={{
              color: '#ffffff',
              backgroundColor: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.3)',
            }}
          >
            <Phone className="w-5 h-5" style={{ color: '#ffffff' }} />
            +94 777 776 357
          </a>

          <a
            href="https://wa.me/94777776357"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 font-ui text-base font-semibold min-h-12 px-5 py-2 rounded-full transition-all duration-300 hover:scale-105"
            style={{
              color: '#ffffff',
              backgroundColor: 'rgba(37,211,102,0.15)',
              border: '1px solid rgba(255,255,255,0.3)',
            }}
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ color: '#25D366' }}
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp Us
          </a>

          <a
            href="mailto:info@heavenlyevents.lk"
            className="flex items-center gap-2.5 font-ui text-sm transition-all duration-300 hover:opacity-80 min-h-12"
            style={{ color: 'rgba(255,255,255,0.7)' }}
          >
            <Mail className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.7)' }} />
            info@heavenlyevents.lk
          </a>
        </div>
      </div>
    </section>
  );
}
