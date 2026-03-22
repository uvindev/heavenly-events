'use client';

import { useState, useMemo } from 'react';
import EventCard, { type EventData } from '@/components/events/EventCard';
import { ChevronDown } from 'lucide-react';

// export const metadata removed — 'use client' pages cannot export metadata.
// Metadata is handled via a separate layout or generateMetadata in a server component wrapper.
// We'll create a head.tsx or layout.tsx for this later if needed.

const CATEGORIES = [
  'All',
  'Corporate',
  'Weddings',
  'Education',
  'Trade Expo',
  'Health',
  'Concerts',
  'Food & Beverage',
  'Cultural',
  'Exhibition',
] as const;

type DateFilter = 'upcoming' | 'past' | 'all';

const mockEvents: EventData[] = [
  {
    title: 'Colombo Wedding Show',
    slug: 'colombo-wedding-show-2026',
    category: 'Wedding Show',
    date: '2026-07-18',
    venue: 'BMICH',
    city: 'Colombo',
    primaryColor: '#C9A84C',
    registrationCount: 1240,
  },
  {
    title: 'Colombo Education Fair 2026 - BMICH',
    slug: 'colombo-education-fair-2026',
    category: 'Education Fair',
    date: '2026-08-15',
    venue: 'BMICH',
    city: 'Colombo',
    primaryColor: '#D32F2F',
    registrationCount: 890,
  },
  {
    title: 'Kedella Home & Construction Show',
    slug: 'kedella-home-construction-show-2026',
    category: 'Trade Expo',
    date: '2026-09-05',
    venue: 'TBA',
    city: 'Colombo',
    primaryColor: '#5D4037',
    registrationCount: 2100,
  },
  {
    title: 'Galle Education Fair',
    slug: 'galle-education-fair',
    category: 'Education Fair',
    date: '2026-08-29',
    venue: 'TBA Galle',
    city: 'Galle',
    primaryColor: '#D32F2F',
    registrationCount: 650,
  },
  {
    title: 'Furniture & Interior Expo',
    slug: 'colombo-furniture-interior-expo',
    category: 'Trade Expo',
    date: '2026-10-10',
    venue: 'TBA',
    city: 'Colombo',
    primaryColor: '#6D4C41',
    registrationCount: 430,
  },
  {
    title: 'Health Expo',
    slug: 'health-expo-sri-lanka-2026',
    category: 'Health Expo',
    date: '2026-11-07',
    venue: 'TBA',
    city: 'Colombo',
    primaryColor: '#0D47A1',
    registrationCount: 1560,
  },
  {
    title: 'EDU FAIR KURUNEGALA',
    slug: 'edu-fair-kurunegala',
    category: 'Education Fair',
    date: '2026-09-19',
    venue: 'TBA',
    city: 'Kurunegala',
    primaryColor: '#D32F2F',
    registrationCount: 780,
  },
  {
    title: 'Solar Energy Expo',
    slug: 'solar-energy-expo-sri-lanka',
    category: 'Trade Expo',
    date: '2025-11-15',
    venue: 'TBA',
    city: 'Colombo',
    primaryColor: '#1565C0',
    registrationCount: 1020,
  },
];

const ITEMS_PER_PAGE = 6;

// Category matching logic
function matchesCategory(eventCategory: string, filterCategory: string): boolean {
  if (filterCategory === 'All') return true;
  const map: Record<string, string[]> = {
    Corporate: ['Awards Night', 'Corporate', 'Conference'],
    Weddings: ['Wedding Show', 'Wedding'],
    Education: ['Education Fair', 'Education'],
    'Trade Expo': ['Trade Expo', 'Tech'],
    Health: ['Health Expo', 'Health'],
    Concerts: ['Concert', 'Arts & Music', 'Music'],
    'Food & Beverage': ['Food & Beverage', 'Food'],
    Cultural: ['Cultural Event', 'Cultural'],
    Exhibition: ['Exhibition', 'Expo'],
  };
  const matches = map[filterCategory] || [filterCategory];
  return matches.some((m) => eventCategory.toLowerCase().includes(m.toLowerCase()));
}

export default function EventsListingPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [dateFilter, setDateFilter] = useState<DateFilter>('upcoming');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const filteredEvents = useMemo(() => {
    const now = new Date();

    return mockEvents
      .filter((event) => {
        // Category filter
        if (!matchesCategory(event.category, activeCategory)) return false;

        // Date filter
        const eventDate = new Date(event.date);
        if (dateFilter === 'upcoming' && eventDate < now) return false;
        if (dateFilter === 'past' && eventDate >= now) return false;

        return true;
      })
      .sort((a, b) => {
        // Upcoming: nearest first; Past: most recent first
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateFilter === 'past' ? dateB - dateA : dateA - dateB;
      });
  }, [activeCategory, dateFilter]);

  const visibleEvents = filteredEvents.slice(0, visibleCount);
  const hasMore = visibleCount < filteredEvents.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  // Reset visible count when filters change
  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const handleDateFilterChange = (filter: DateFilter) => {
    setDateFilter(filter);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  return (
    <>
      <main style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh' }}>
        {/* Short Hero */}
        <section className="relative pt-28 sm:pt-32 pb-12 sm:pb-16 overflow-hidden">
          {/* Background gradient */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse 60% 50% at 50% 0%, rgba(26,86,219,0.12) 0%, transparent 60%),
                var(--bg-primary)
              `,
            }}
            aria-hidden="true"
          />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span
              className="gradient-text font-ui text-sm font-semibold uppercase tracking-wider"
              style={{ letterSpacing: 'var(--tracking-wider)' }}
            >
              Upcoming Events
            </span>

            <h1
              className="font-display font-bold mt-4"
              style={{
                fontSize: 'var(--text-h1)',
                lineHeight: 'var(--leading-tight)',
                color: 'var(--text-primary)',
              }}
            >
              What&apos;s Happening in Sri Lanka
            </h1>

            <p
              className="font-body mt-4 max-w-xl mx-auto"
              style={{ fontSize: 'var(--text-body)', color: 'var(--text-secondary)' }}
            >
              Register free — get your QR ticket instantly by email.
            </p>
          </div>
        </section>

        {/* Sticky Filter Bar */}
        <div
          className="sticky top-0 z-30 border-b"
          style={{
            backgroundColor: 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(16px) saturate(180%)',
            WebkitBackdropFilter: 'blur(16px) saturate(180%)',
            borderColor: 'var(--border-primary)',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between">
              {/* Category Tabs */}
              <div className="-mx-4 flex items-center gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:shrink-0 sm:overflow-x-visible sm:px-0 sm:pb-0">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`
                      shrink-0 whitespace-nowrap px-4 py-2.5 rounded-full font-ui text-sm font-medium
                      transition-all duration-200
                      ${activeCategory === cat
                        ? 'text-white shadow-sm'
                        : 'text-(--text-muted) hover:text-(--text-primary) hover:bg-black/5'
                      }
                    `}
                    style={
                      activeCategory === cat
                        ? { backgroundColor: 'var(--color-crimson)' }
                        : undefined
                    }
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Date Filter */}
              <div className="relative shrink-0">
                <select
                  value={dateFilter}
                  onChange={(e) => handleDateFilterChange(e.target.value as DateFilter)}
                  className="appearance-none cursor-pointer bg-(--glass-bg) border border-(--border-primary) rounded-full px-4 py-2 pr-8 font-ui text-sm text-(--text-secondary) outline-none focus:ring-1 focus:ring-(--color-crimson)"
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="past">Past Events</option>
                  <option value="all">All Events</option>
                </select>
                <ChevronDown
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                  style={{ color: 'var(--text-muted)' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {visibleEvents.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8">
                {visibleEvents.map((event) => (
                  <EventCard key={event.slug} event={event} />
                ))}
              </div>

              {/* Load More */}
              {hasMore && (
                <div className="mt-12 text-center">
                  <button
                    onClick={handleLoadMore}
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-ui text-sm font-semibold border transition-all duration-200 hover:-translate-y-0.5"
                    style={{
                      borderColor: 'var(--border-primary)',
                      color: 'var(--text-primary)',
                      backgroundColor: 'var(--glass-bg)',
                    }}
                  >
                    Load More Events
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Empty State */
            <div className="text-center py-20">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: 'var(--glass-bg)' }}
              >
                <svg
                  className="w-10 h-10"
                  style={{ color: 'var(--text-muted)' }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
              </div>
              <h3
                className="font-ui text-lg font-semibold mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                No events in this category right now
              </h3>
              <p
                className="font-body text-sm max-w-md mx-auto"
                style={{ color: 'var(--text-muted)' }}
              >
                Check back soon. We&apos;re always planning something extraordinary.
              </p>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
