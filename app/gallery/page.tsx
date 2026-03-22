'use client';

import { useState, useMemo } from 'react';
import SectionHeading from '@/components/shared/SectionHeading';
import MagneticButton from '@/components/shared/MagneticButton';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import GalleryLightbox from '@/components/gallery/GalleryLightbox';
import type { GalleryItem } from '@/components/gallery/GalleryGrid';

const categories = ['All', 'Corporate', 'Weddings', 'Birthdays', 'Concerts', 'Private'] as const;

const galleryItems: GalleryItem[] = [
  { id: 1, title: 'BMICH Grand Exhibition', category: 'Corporate', gradient: '', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=75', aspectRatio: '4/3', event: 'Sri Lanka Business Expo' },
  { id: 2, title: 'Lakeside Wedding Ceremony', category: 'Weddings', gradient: '', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=75', aspectRatio: '3/4', event: 'Perera & Fernando Wedding' },
  { id: 3, title: 'Annual Gala Night', category: 'Corporate', gradient: '', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=75', aspectRatio: '1/1', event: 'Awards Ceremony 2025' },
  { id: 4, title: 'Birthday Celebration', category: 'Birthdays', gradient: '', image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=600&q=75', aspectRatio: '3/4', event: 'Birthday Party' },
  { id: 5, title: 'Live Music Concert', category: 'Concerts', gradient: '', image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=75', aspectRatio: '16/9', event: 'Colombo Music Festival' },
  { id: 6, title: 'Private VIP Dinner', category: 'Private', gradient: '', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=75', aspectRatio: '4/5', event: 'Private Gathering' },
  { id: 7, title: 'Wedding Reception', category: 'Weddings', gradient: '', image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&q=75', aspectRatio: '3/2', event: 'Wedding Reception' },
  { id: 8, title: 'Conference Stage', category: 'Corporate', gradient: '', image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=75', aspectRatio: '16/9', event: 'Digital Summit' },
  { id: 9, title: 'Kids Party', category: 'Birthdays', gradient: '', image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=75', aspectRatio: '1/1', event: 'Birthday Celebration' },
  { id: 10, title: 'Concert Stage Lights', category: 'Concerts', gradient: '', image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=600&q=75', aspectRatio: '3/4', event: 'Stage Show' },
  { id: 11, title: 'Garden Party', category: 'Private', gradient: '', image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600&q=75', aspectRatio: '4/3', event: 'Anniversary' },
  { id: 12, title: 'Bridal Showcase', category: 'Weddings', gradient: '', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=75', aspectRatio: '3/2', event: 'Colombo Wedding Show' },
  { id: 13, title: 'Exhibition Hall', category: 'Corporate', gradient: '', image: 'https://images.unsplash.com/photo-1594122230689-45899d9e6f69?w=600&q=75', aspectRatio: '4/3', event: 'Trade Expo' },
  { id: 14, title: 'Wedding Flowers', category: 'Weddings', gradient: '', image: 'https://images.unsplash.com/photo-1478146059778-26028b07395a?w=600&q=75', aspectRatio: '3/4', event: 'Wedding Decor' },
  { id: 15, title: 'Corporate Networking', category: 'Corporate', gradient: '', image: 'https://images.unsplash.com/photo-1530023367847-a683933f4172?w=600&q=75', aspectRatio: '16/9', event: 'Business Networking' },
  { id: 16, title: 'Candlelight Dinner', category: 'Private', gradient: '', image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&q=75', aspectRatio: '1/1', event: 'Grand Opening' },
  { id: 17, title: 'Festival Crowd', category: 'Concerts', gradient: '', image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=75', aspectRatio: '4/3', event: 'Music Festival' },
  { id: 18, title: 'Team Celebration', category: 'Corporate', gradient: '', image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&q=75', aspectRatio: '3/2', event: 'Team Building' },
  { id: 19, title: 'Balloon Decor', category: 'Birthdays', gradient: '', image: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=600&q=75', aspectRatio: '3/4', event: 'Birthday Setup' },
  { id: 20, title: 'DJ Night', category: 'Concerts', gradient: '', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=75', aspectRatio: '16/9', event: 'DJ Concert' },
  { id: 21, title: 'Venue Setup', category: 'Weddings', gradient: '', image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=75', aspectRatio: '4/5', event: 'Venue Decoration' },
  { id: 22, title: 'Seminar Hall', category: 'Corporate', gradient: '', image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&q=75', aspectRatio: '4/3', event: 'Education Fair' },
  { id: 23, title: 'Outdoor Event', category: 'Private', gradient: '', image: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=600&q=75', aspectRatio: '3/2', event: 'Outdoor Celebration' },
  { id: 24, title: 'Stage Performance', category: 'Concerts', gradient: '', image: 'https://images.unsplash.com/photo-1478147427282-58a87a120781?w=600&q=75', aspectRatio: '1/1', event: 'Live Performance' },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [visibleCount, setVisibleCount] = useState(12);
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
          {/* Background glow */}
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
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setVisibleCount(12);
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
                  {cat}
                </button>
              ))}
            </div>

            {/* Gallery Grid */}
            <GalleryGrid items={visibleItems} onItemClick={openLightbox} />

            {/* Load More */}
            {visibleCount < filteredItems.length && (
              <div className="mt-16 text-center">
                <MagneticButton
                  variant="secondary"
                  size="lg"
                  onClick={() => setVisibleCount((prev) => prev + 8)}
                >
                  Load More
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
