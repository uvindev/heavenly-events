'use client';

import { useState, useMemo } from 'react';
import SectionHeading from '@/components/shared/SectionHeading';
import MagneticButton from '@/components/shared/MagneticButton';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import GalleryLightbox from '@/components/gallery/GalleryLightbox';
import type { GalleryItem } from '@/components/gallery/GalleryGrid';

const categories = ['All', 'Exhibitions', 'Corporate', 'Weddings', 'Concerts', 'Birthdays', 'Private'] as const;

const galleryItems: GalleryItem[] = [
  // Exhibitions & Expos
  { id: 1, title: 'BMICH Grand Exhibition Hall', category: 'Exhibitions', gradient: '', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80', aspectRatio: '4/3', event: 'Sri Lanka Business Expo' },
  { id: 2, title: 'Trade Show Floor', category: 'Exhibitions', gradient: '', image: 'https://images.unsplash.com/photo-1587825140708-dfaf18c01b78?w=600&q=80', aspectRatio: '3/2', event: 'Colombo Trade Fair' },
  { id: 3, title: 'Exhibition Booth Setup', category: 'Exhibitions', gradient: '', image: 'https://images.unsplash.com/photo-1594122230689-45899d9e6f69?w=600&q=80', aspectRatio: '4/3', event: 'Industry Expo 2025' },
  { id: 4, title: 'Education Fair Visitors', category: 'Exhibitions', gradient: '', image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&q=80', aspectRatio: '16/9', event: 'Colombo Education Fair' },
  { id: 5, title: 'Product Launch Display', category: 'Exhibitions', gradient: '', image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80', aspectRatio: '3/4', event: 'Tech Product Launch' },
  { id: 6, title: 'Expo Registration Desk', category: 'Exhibitions', gradient: '', image: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?w=600&q=80', aspectRatio: '4/3', event: 'Health & Wellness Expo' },
  { id: 7, title: 'Exhibition Walkway', category: 'Exhibitions', gradient: '', image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=600&q=80', aspectRatio: '3/2', event: 'Home & Living Expo' },
  { id: 8, title: 'Convention Center Setup', category: 'Exhibitions', gradient: '', image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&q=80', aspectRatio: '16/9', event: 'Annual Convention' },

  // Corporate Events
  { id: 9, title: 'Annual Gala Night', category: 'Corporate', gradient: '', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80', aspectRatio: '1/1', event: 'Awards Ceremony 2025' },
  { id: 10, title: 'Conference Keynote Stage', category: 'Corporate', gradient: '', image: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=600&q=80', aspectRatio: '16/9', event: 'Digital Summit' },
  { id: 11, title: 'Corporate Networking', category: 'Corporate', gradient: '', image: 'https://images.unsplash.com/photo-1530023367847-a683933f4172?w=600&q=80', aspectRatio: '4/3', event: 'Business Networking Night' },
  { id: 12, title: 'Team Building Day', category: 'Corporate', gradient: '', image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&q=80', aspectRatio: '3/2', event: 'Team Building Event' },
  { id: 13, title: 'Award Presentation', category: 'Corporate', gradient: '', image: 'https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?w=600&q=80', aspectRatio: '4/3', event: 'Annual Awards' },
  { id: 14, title: 'Corporate Dinner', category: 'Corporate', gradient: '', image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&q=80', aspectRatio: '1/1', event: 'Grand Opening Dinner' },
  { id: 15, title: 'Panel Discussion', category: 'Corporate', gradient: '', image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&q=80', aspectRatio: '16/9', event: 'CEO Forum' },

  // Weddings
  { id: 16, title: 'Lakeside Wedding Ceremony', category: 'Weddings', gradient: '', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80', aspectRatio: '3/4', event: 'Perera & Fernando Wedding' },
  { id: 17, title: 'Grand Wedding Reception', category: 'Weddings', gradient: '', image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&q=80', aspectRatio: '4/3', event: 'Royal Wedding Reception' },
  { id: 18, title: 'Bridal Fashion Showcase', category: 'Weddings', gradient: '', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80', aspectRatio: '3/2', event: 'Colombo Wedding Show' },
  { id: 19, title: 'Wedding Floral Arrangements', category: 'Weddings', gradient: '', image: 'https://images.unsplash.com/photo-1478146059778-26028b07395a?w=600&q=80', aspectRatio: '3/4', event: 'Floral Wedding Decor' },
  { id: 20, title: 'Wedding Table Setting', category: 'Weddings', gradient: '', image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80', aspectRatio: '4/5', event: 'Elegant Table Decor' },
  { id: 21, title: 'Outdoor Wedding Venue', category: 'Weddings', gradient: '', image: 'https://images.unsplash.com/photo-1507504031003-b417219a0fde?w=600&q=80', aspectRatio: '4/3', event: 'Garden Wedding' },
  { id: 22, title: 'Wedding Cake Display', category: 'Weddings', gradient: '', image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=600&q=80', aspectRatio: '3/4', event: 'Cake Showcase' },
  { id: 23, title: 'First Dance Spotlight', category: 'Weddings', gradient: '', image: 'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?w=600&q=80', aspectRatio: '1/1', event: 'Reception Dance' },

  // Concerts & Entertainment
  { id: 24, title: 'Live Concert Stage', category: 'Concerts', gradient: '', image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=80', aspectRatio: '16/9', event: 'Colombo Music Festival' },
  { id: 25, title: 'Concert Crowd Energy', category: 'Concerts', gradient: '', image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=600&q=80', aspectRatio: '3/4', event: 'Rock Concert' },
  { id: 26, title: 'DJ Night Lights', category: 'Concerts', gradient: '', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80', aspectRatio: '16/9', event: 'DJ Night' },
  { id: 27, title: 'Festival Stage Setup', category: 'Concerts', gradient: '', image: 'https://images.unsplash.com/photo-1478147427282-58a87a120781?w=600&q=80', aspectRatio: '4/3', event: 'Music Festival' },
  { id: 28, title: 'Laser Light Show', category: 'Concerts', gradient: '', image: 'https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=600&q=80', aspectRatio: '3/2', event: 'New Year Concert' },
  { id: 29, title: 'Open Air Stage', category: 'Concerts', gradient: '', image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&q=80', aspectRatio: '16/9', event: 'Beach Festival' },
  { id: 30, title: 'Orchestra Night', category: 'Concerts', gradient: '', image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&q=80', aspectRatio: '4/3', event: 'Classical Evening' },

  // Birthdays & Celebrations
  { id: 31, title: 'Elegant Birthday Setup', category: 'Birthdays', gradient: '', image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=600&q=80', aspectRatio: '3/4', event: 'Birthday Celebration' },
  { id: 32, title: 'Kids Birthday Party', category: 'Birthdays', gradient: '', image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80', aspectRatio: '1/1', event: 'Kids Party' },
  { id: 33, title: 'Balloon Arch Decor', category: 'Birthdays', gradient: '', image: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=600&q=80', aspectRatio: '3/4', event: 'Birthday Setup' },
  { id: 34, title: 'Sweet 16 Party', category: 'Birthdays', gradient: '', image: 'https://images.unsplash.com/photo-1464349153159-4e5e2284ce87?w=600&q=80', aspectRatio: '4/3', event: 'Sweet 16' },
  { id: 35, title: 'Birthday Cake Moment', category: 'Birthdays', gradient: '', image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=600&q=80', aspectRatio: '1/1', event: 'Cake Cutting' },
  { id: 36, title: 'Party Decorations', category: 'Birthdays', gradient: '', image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80', aspectRatio: '3/2', event: 'Party Decor' },

  // Private Events
  { id: 37, title: 'VIP Dinner Setup', category: 'Private', gradient: '', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', aspectRatio: '4/5', event: 'Private Dinner' },
  { id: 38, title: 'Garden Anniversary', category: 'Private', gradient: '', image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600&q=80', aspectRatio: '4/3', event: 'Anniversary Party' },
  { id: 39, title: 'Rooftop Cocktail Party', category: 'Private', gradient: '', image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=600&q=80', aspectRatio: '3/2', event: 'Cocktail Evening' },
  { id: 40, title: 'Intimate Gathering', category: 'Private', gradient: '', image: 'https://images.unsplash.com/photo-1529543544282-ea99407407db?w=600&q=80', aspectRatio: '1/1', event: 'Family Gathering' },
  { id: 41, title: 'Poolside Event', category: 'Private', gradient: '', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80', aspectRatio: '16/9', event: 'Pool Party' },
  { id: 42, title: 'Private Wine Tasting', category: 'Private', gradient: '', image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80', aspectRatio: '3/4', event: 'Wine Evening' },

  // More Exhibitions
  { id: 43, title: 'Solar Energy Expo', category: 'Exhibitions', gradient: '', image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80', aspectRatio: '4/3', event: 'Solar Expo 2025' },
  { id: 44, title: 'Auto Show Display', category: 'Exhibitions', gradient: '', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80', aspectRatio: '3/2', event: 'Auto Expo' },
  { id: 45, title: 'Health Expo Booth', category: 'Exhibitions', gradient: '', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80', aspectRatio: '4/3', event: 'Health Expo' },
  { id: 46, title: 'Furniture Exhibition', category: 'Exhibitions', gradient: '', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80', aspectRatio: '1/1', event: 'Interior Expo' },
  { id: 47, title: 'Food & Beverage Expo', category: 'Exhibitions', gradient: '', image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=600&q=80', aspectRatio: '3/4', event: 'F&B Trade Show' },
  { id: 48, title: 'Tech Innovation Expo', category: 'Exhibitions', gradient: '', image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80', aspectRatio: '16/9', event: 'Tech Summit' },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [visibleCount, setVisibleCount] = useState(16);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return galleryItems;
    return galleryItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const visibleItems = filteredItems.slice(0, visibleCount);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const nextImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % visibleItems.length);
  };

  const prevImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + visibleItems.length) % visibleItems.length);
  };

  return (
    <>
      <main>
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

          <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <span
              className="gradient-text font-ui text-sm font-semibold uppercase"
              style={{ letterSpacing: 'var(--tracking-wider)' }}
            >
              Our Portfolio
            </span>
            <h1
              className="font-display mt-4 font-bold"
              style={{
                fontSize: 'var(--text-h1)',
                lineHeight: 'var(--leading-tight)',
                color: 'var(--text-primary)',
              }}
            >
              Moments We&apos;ve Made Magic
            </h1>
            <p
              className="font-body mx-auto mt-5 max-w-2xl"
              style={{
                fontSize: 'var(--text-body)',
                color: 'var(--text-secondary)',
                lineHeight: 'var(--leading-relaxed)',
              }}
            >
              A visual journey through Sri Lanka&apos;s most remarkable events. Every frame tells the
              story of meticulous planning, creative vision, and unforgettable experiences.
            </p>

            {/* Stats */}
            <div className="mt-8 flex items-center justify-center gap-8 font-body text-sm" style={{ color: 'var(--text-muted)' }}>
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{galleryItems.length}+</div>
                <div>Photos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{categories.length - 1}</div>
                <div>Categories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>500+</div>
                <div>Events</div>
              </div>
            </div>
          </div>
        </section>

        {/* Filter + Gallery */}
        <section
          className="py-16 sm:py-24"
          style={{ backgroundColor: 'var(--bg-primary)' }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Filter Tabs */}
            <div className="-mx-4 mb-12 flex gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-x-visible sm:px-0 sm:pb-0">
              {categories.map((cat) => {
                const count = cat === 'All' ? galleryItems.length : galleryItems.filter(i => i.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                      setVisibleCount(16);
                    }}
                    className={`shrink-0 whitespace-nowrap rounded-full px-5 py-2.5 font-ui text-sm font-semibold transition-all duration-300 ${
                      activeCategory === cat
                        ? 'text-white shadow-(--shadow-crimson)'
                        : 'border border-(--border-primary) text-(--text-secondary) hover:border-(--color-crimson) hover:text-(--color-crimson)'
                    }`}
                    style={
                      activeCategory === cat
                        ? { backgroundColor: 'var(--color-crimson)' }
                        : { backgroundColor: 'transparent' }
                    }
                  >
                    {cat} <span className="ml-1 opacity-60">({count})</span>
                  </button>
                );
              })}
            </div>

            {/* Gallery Grid */}
            <GalleryGrid items={visibleItems} onItemClick={openLightbox} />

            {/* Load More */}
            {visibleCount < filteredItems.length && (
              <div className="mt-16 text-center">
                <p className="font-body text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
                  Showing {visibleItems.length} of {filteredItems.length} photos
                </p>
                <MagneticButton
                  variant="secondary"
                  size="lg"
                  onClick={() => setVisibleCount((prev) => prev + 12)}
                >
                  Load More Photos
                </MagneticButton>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section
          className="py-20 sm:py-28"
          style={{ backgroundColor: 'var(--bg-secondary)' }}
        >
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <SectionHeading
              label="Want this for your event?"
              title="Let Us Capture Your Vision"
              subtitle="Every event is a new opportunity to create extraordinary moments. Let's make yours unforgettable."
            />
            <MagneticButton href="/contact" variant="primary" size="lg">
              Start Planning &rarr;
            </MagneticButton>
          </div>
        </section>
      </main>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <GalleryLightbox
          items={visibleItems}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}
    </>
  );
}
