'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import MobileMenu from '@/components/layout/MobileMenu';

const navLinks = [
  { href: '/events', label: 'Events' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/sponsors', label: 'Sponsors' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      // Dynamic blur intensity based on scroll depth
      const header = document.querySelector('[data-navbar]') as HTMLElement;
      if (header) {
        const blur = Math.min(y / 8, 20);
        const opacity = Math.min(0.6 + y / 300, 0.92);
        if (y > 50) {
          header.style.backdropFilter = `blur(${blur}px)`;
          (header.style as any).WebkitBackdropFilter = `blur(${blur}px)`;
          header.style.backgroundColor = `rgba(255,255,255,${opacity})`;
          header.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
        } else {
          header.style.backdropFilter = '';
          (header.style as any).WebkitBackdropFilter = '';
          header.style.backgroundColor = '';
          header.style.boxShadow = '';
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Delay initial check to avoid hydration mismatch
    requestAnimationFrame(handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        data-navbar
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 nav-border-glow ${
          scrolled
            ? 'is-scrolled shadow-(--shadow-md)'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center min-h-12">
            <img
              src="/images/heavenly_logo.png"
              alt="Heavenly Events"
              className="h-10 w-auto md:h-12"
            />
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`animated-underline relative px-4 py-2 font-body text-sm font-medium transition-colors hover:text-(--text-primary) ${
                    isActive ? 'text-(--text-primary)' : 'text-(--text-secondary)'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-4 right-4"
                      style={{ height: '2px', background: 'var(--color-crimson)' }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right side: Register CTA + Mobile hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/events"
              className="hidden rounded-lg bg-(--color-crimson) px-5 py-2.5 font-ui text-sm font-semibold text-white transition-shadow hover:shadow-(--shadow-crimson) lg:inline-flex min-h-12 items-center"
            >
              Register
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="flex h-12 w-12 items-center justify-center rounded-md text-(--text-primary) transition-colors hover:bg-black/5 lg:hidden"
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
