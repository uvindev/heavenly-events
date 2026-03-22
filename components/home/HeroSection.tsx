'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';

const heroImages = [
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=85',
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&q=85',
  'https://images.unsplash.com/photo-1587825140708-dfaf18c01b78?w=1920&q=85',
  'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1920&q=85',
  'https://images.unsplash.com/photo-1594122230689-45899d9e6f69?w=1920&q=85',
  'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=1920&q=85',
  'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920&q=85',
  'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1920&q=85',
  'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1920&q=85',
  'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1920&q=85',
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState(1);
  const [blend, setBlend] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);

  const HOLD = 4500;
  const TRANSITION = 3000;
  const CYCLE = HOLD + TRANSITION;

  const tick = useCallback((timestamp: number) => {
    if (!startRef.current) startRef.current = timestamp;

    const elapsed = timestamp - startRef.current;

    if (elapsed < HOLD) {
      setBlend(0);
    } else if (elapsed < CYCLE) {
      const t = (elapsed - HOLD) / TRANSITION;
      // Smooth ease-in-out for slow gentle blend
      const eased = t * t * (3 - 2 * t);
      setBlend(eased);
    } else {
      setCurrent((prev) => {
        const newCurrent = (prev + 1) % heroImages.length;
        setNext((newCurrent + 1) % heroImages.length);
        return newCurrent;
      });
      setBlend(0);
      startRef.current = timestamp;
    }

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick]);

  useEffect(() => {
    heroImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const getKenBurns = (index: number, progress: number, isIncoming: boolean) => {
    const motion = index % 4;
    const baseScale = isIncoming ? 1.02 + progress * 0.06 : 1.02 + (1 - progress) * 0.06;
    let tx = 0, ty = 0;
    const p = isIncoming ? progress : 1;

    switch (motion) {
      case 0: tx = p * 1.5; ty = p * -1; break;
      case 1: tx = p * -1.5; ty = p * 0.8; break;
      case 2: tx = p * 0.8; ty = p * -1.5; break;
      case 3: tx = p * -1; ty = p * 1.2; break;
    }

    return `scale(${baseScale}) translate(${tx}%, ${ty}%)`;
  };

  return (
    <section className="relative overflow-hidden bg-[#0a0f1e]" style={{ minHeight: '100svh' }}>

      {/* Current image (bottom layer) */}
      <div
        style={{
          position: 'absolute',
          inset: '-4%',
          width: '108%',
          height: '108%',
          backgroundImage: `url(${heroImages[current]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: getKenBurns(current, blend, false),
          filter: `brightness(${0.85 - blend * 0.15})`,
          willChange: 'transform, filter',
          zIndex: 0,
        }}
      />

      {/* Next image (top layer — blends in) */}
      <div
        style={{
          position: 'absolute',
          inset: '-4%',
          width: '108%',
          height: '108%',
          backgroundImage: `url(${heroImages[next]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: getKenBurns(next, blend, true),
          opacity: blend,
          filter: 'brightness(0.85)',
          willChange: 'transform, opacity, filter',
          zIndex: 1,
        }}
      />

      {/* Lighter gradient — lets images show through more */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(to bottom,
              rgba(10,15,30,0.35) 0%,
              rgba(10,15,30,0.45) 35%,
              rgba(10,15,30,0.55) 65%,
              rgba(10,15,30,0.75) 100%
            )
          `,
          zIndex: 2,
        }}
      />

      {/* Vignette for depth */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 45%, transparent 0%, rgba(0,0,0,0.3) 100%)',
          zIndex: 3,
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center justify-center text-center px-5 sm:px-8"
        style={{ minHeight: '100svh' }}
      >
        {/* Badge */}
        <div style={{ opacity: 0, animation: 'hero-fade-up 0.7s ease forwards 0.2s' }}>
          <span
            className="inline-flex items-center gap-2 rounded-full px-5 py-2 font-ui text-xs font-semibold uppercase"
            style={{
              letterSpacing: '0.12em',
              color: '#ffffff',
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            <span
              className="inline-block rounded-full"
              style={{
                width: '6px',
                height: '6px',
                backgroundColor: '#3b82f6',
                boxShadow: '0 0 10px rgba(59,130,246,0.7)',
              }}
            />
            Sri Lanka&apos;s #1 Event Company
          </span>
        </div>

        {/* Heading */}
        <h1 className="mt-7 sm:mt-9 font-display font-bold" style={{ lineHeight: 1.06, letterSpacing: '-0.025em' }}>
          <span
            className="block"
            style={{
              fontSize: 'clamp(2rem, 4vw + 0.5rem, 4rem)',
              color: 'rgba(255,255,255,0.85)',
              opacity: 0,
              animation: 'hero-fade-up 0.7s ease forwards 0.4s',
              textShadow: '0 2px 20px rgba(0,0,0,0.3)',
            }}
          >
            We Create Events
          </span>
          <span
            className="block mt-1"
            style={{
              fontSize: 'clamp(3rem, 6vw + 1rem, 5.5rem)',
              color: '#ffffff',
              fontWeight: 700,
              opacity: 0,
              animation: 'hero-fade-up 0.7s ease forwards 0.6s',
              textShadow: '0 4px 30px rgba(0,0,0,0.4)',
            }}
          >
            That Live Forever
          </span>
        </h1>

        {/* Subtext */}
        <p
          className="mt-5 sm:mt-7 font-body text-lg sm:text-xl max-w-xl mx-auto"
          style={{
            color: 'rgba(255,255,255,0.75)',
            lineHeight: 1.75,
            opacity: 0,
            animation: 'hero-fade-up 0.7s ease forwards 0.85s',
            textShadow: '0 1px 10px rgba(0,0,0,0.3)',
          }}
        >
          Sri Lanka&apos;s premier event management company. From grand exhibitions
          to intimate celebrations — we orchestrate every detail with precision and passion.
        </p>

        {/* CTAs */}
        <div
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
          style={{ opacity: 0, animation: 'hero-fade-up 0.7s ease forwards 1.1s' }}
        >
          <Link
            href="/events"
            className="group inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 font-ui text-sm font-semibold text-white transition-all duration-300 w-full sm:w-auto min-h-12 hover:shadow-[0_8px_30px_rgba(26,86,219,0.5)]"
            style={{
              backgroundColor: '#1a56db',
              boxShadow: '0 4px 16px rgba(26,86,219,0.35)',
            }}
          >
            Explore Events
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 font-ui text-sm font-semibold transition-all duration-300 w-full sm:w-auto min-h-12 hover:bg-white/15"
            style={{
              color: '#ffffff',
              border: '1px solid rgba(255,255,255,0.3)',
              backgroundColor: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(8px)',
            }}
          >
            Plan Your Event
          </Link>
        </div>

        {/* Trust Metrics */}
        <div
          className="mt-6 sm:mt-8 flex items-center justify-center gap-4 sm:gap-8 font-body text-xs sm:text-sm"
          style={{ opacity: 0, animation: 'hero-fade-up 0.7s ease forwards 1.3s' }}
        >
          <span style={{ color: 'rgba(255,255,255,0.55)' }}>18+ Years</span>
          <span style={{ color: 'rgba(255,255,255,0.25)' }}>&middot;</span>
          <span style={{ color: 'rgba(255,255,255,0.55)' }}>500+ Events</span>
          <span style={{ color: 'rgba(255,255,255,0.25)' }}>&middot;</span>
          <span style={{ color: 'rgba(255,255,255,0.55)' }}>10,000+ Guests</span>
        </div>
      </div>

      {/* Bottom indicators */}
      <div
        className="absolute bottom-6 sm:bottom-8 left-0 right-0 z-10 flex items-center justify-center"
        style={{ opacity: 0, animation: 'hero-fade-up 0.7s ease forwards 1.5s' }}
      >
        <div className="flex items-center gap-1.5">
          {heroImages.map((_, index) => (
            <div
              key={index}
              className="rounded-full transition-all duration-500"
              style={{
                width: index === current ? '24px' : '6px',
                height: '3px',
                backgroundColor: index === current ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.25)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
