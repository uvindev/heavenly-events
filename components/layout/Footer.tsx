'use client';

import Link from 'next/link';

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/events', label: 'Events' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/sponsors', label: 'Sponsors' },
  { href: '/contact', label: 'Contact' },
  { href: '/blog', label: 'Blog' },
];

const ourEvents = [
  'Colombo Wedding Show',
  'Colombo Education Fair 2026 - BMICH',
  'Kedella Home & Construction Show',
  'Galle Education Fair',
  'Furniture & Interior Expo',
  'Health Expo',
  'EDU FAIR KURUNEGALA',
  'Solar Energy Expo',
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#f8f9fa', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Logo + Tagline + Social */}
          <div>
            <Link href="/" className="inline-flex items-center">
              <img
                src="/images/heavenly_logo.png"
                alt="Heavenly Events"
                className="h-12 w-auto"
              />
            </Link>
            <p className="mt-4 font-body text-sm leading-relaxed" style={{ color: '#6b7280' }}>
              Sri Lanka&apos;s Premier Events Organizer. Creating moments that linger long after the last light fades.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://facebook.com/heavenlyevents"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300"
                style={{ border: '1px solid #e5e7eb', color: '#6b7280' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-crimson)'; e.currentTarget.style.color = 'var(--color-crimson)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.color = '#6b7280'; }}
                aria-label="Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
              </a>
              <a
                href="https://instagram.com/heavenlyevents"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300"
                style={{ border: '1px solid #e5e7eb', color: '#6b7280' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-crimson)'; e.currentTarget.style.color = 'var(--color-crimson)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.color = '#6b7280'; }}
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
              </a>
              <a
                href="https://wa.me/94777776357"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300"
                style={{ border: '1px solid #e5e7eb', color: '#6b7280' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-crimson)'; e.currentTarget.style.color = 'var(--color-crimson)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.color = '#6b7280'; }}
                aria-label="WhatsApp"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" /><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" /></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-ui text-sm font-bold uppercase tracking-wider" style={{ color: '#0f0f14' }}>
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm transition-colors duration-200"
                    style={{ color: '#6b7280' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-crimson)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = '#6b7280'; }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Events */}
          <div>
            <h3 className="font-ui text-sm font-bold uppercase tracking-wider" style={{ color: '#0f0f14' }}>
              Our Events
            </h3>
            <ul className="mt-4 space-y-3">
              {ourEvents.map((event) => (
                <li key={event}>
                  <span className="font-body text-sm" style={{ color: '#6b7280' }}>{event}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="font-ui text-sm font-bold uppercase tracking-wider" style={{ color: '#0f0f14' }}>
              Contact Us
            </h3>
            <div className="mt-4 space-y-4 font-body text-sm" style={{ color: '#6b7280' }}>
              <p className="leading-relaxed">
                No. 190, Royal Pearl Garden,
                <br />
                Wattala, Sri Lanka
              </p>
              <div className="space-y-1">
                <p>
                  <a href="tel:+94777776357" className="transition-colors duration-200 hover:text-(--color-crimson)">
                    (+94) 77 777 6357
                  </a>
                </p>
                <p>
                  <a href="tel:+94778888897" className="transition-colors duration-200 hover:text-(--color-crimson)">
                    (+94) 77 888 8897
                  </a>
                </p>
              </div>
              <p>
                <a
                  href="mailto:info@heavenlyevents.lk"
                  className="transition-colors duration-200 hover:text-(--color-crimson)"
                >
                  info@heavenlyevents.lk
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
          <p className="font-body text-xs" style={{ color: '#9ca3af' }}>
            &copy; 2025 Heavenly Events. All rights reserved.
          </p>
          <p className="font-body text-xs" style={{ color: '#9ca3af' }}>
            Designed &amp; Architected by UVIN VINDULA &mdash;{' '}
            <a
              href="https://iamuvin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="relative font-semibold transition-colors duration-200 group"
              style={{ color: 'var(--color-crimson)' }}
            >
              IAMUVIN
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
