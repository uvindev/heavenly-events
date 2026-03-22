'use client';

import Link from 'next/link';

const sponsors = [
  { name: 'Dialog', logo: 'https://logo.clearbit.com/dialog.lk' },
  { name: 'Mobitel', logo: 'https://logo.clearbit.com/mobitel.lk' },
  { name: 'SriLankan Airlines', logo: 'https://logo.clearbit.com/srilankan.com' },
  { name: 'John Keells', logo: 'https://logo.clearbit.com/keells.com' },
  { name: 'Cargills', logo: 'https://logo.clearbit.com/cargillsonline.com' },
  { name: 'Hayleys', logo: 'https://logo.clearbit.com/hayleys.com' },
  { name: 'Dilmah', logo: 'https://logo.clearbit.com/dilmahtea.com' },
  { name: 'MAS Holdings', logo: 'https://logo.clearbit.com/masholdings.com' },
  { name: 'Nations Trust', logo: 'https://logo.clearbit.com/nationstrust.com' },
  { name: 'Sampath Bank', logo: 'https://logo.clearbit.com/sampath.lk' },
  { name: 'Aitken Spence', logo: 'https://logo.clearbit.com/aitkenspence.com' },
  { name: 'Singer', logo: 'https://logo.clearbit.com/singersl.com' },
];

export default function SponsorsStrip() {
  return (
    <section className="relative py-20 sm:py-28" style={{ background: '#f8f9fb' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p
          className="text-center font-body text-sm uppercase mb-10"
          style={{ letterSpacing: '0.2em', color: '#9ca3af' }}
        >
          Trusted by leading brands
        </p>

        {/* Logo Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 sm:gap-6">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.name}
              className="group flex items-center justify-center rounded-xl p-4 sm:p-6 transition-all duration-300 cursor-pointer"
              style={{
                background: '#ffffff',
                border: '1px solid #f0f0f0',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)';
                e.currentTarget.style.borderColor = '#e0e0e0';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.02)';
                e.currentTarget.style.borderColor = '#f0f0f0';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className="h-8 sm:h-10 w-auto object-contain opacity-50 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                onError={(e) => {
                  // Fallback to text if logo fails to load
                  const target = e.currentTarget;
                  const parent = target.parentElement;
                  if (parent) {
                    target.style.display = 'none';
                    const text = document.createElement('span');
                    text.textContent = sponsor.name;
                    text.style.cssText = 'font-family: var(--font-ui); font-weight: 700; font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase; color: #9ca3af;';
                    parent.appendChild(text);
                  }
                }}
              />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/contact?type=sponsor"
            className="inline-flex items-center gap-2 font-ui text-sm font-semibold transition-colors duration-300"
            style={{ color: '#1a56db' }}
          >
            Become a Sponsor
            <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
