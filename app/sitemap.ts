import type { MetadataRoute } from 'next';

const BASE_URL = 'https://heavenlyevents.lk';

// Mock event data — replace with DB query for published events
const publishedEvents = [
  { slug: 'colombo-night-fest-2026', updatedAt: '2026-03-01' },
  { slug: 'kandy-cultural-gala', updatedAt: '2026-02-20' },
  { slug: 'galle-beach-music-fest', updatedAt: '2026-02-15' },
  { slug: 'negombo-food-carnival', updatedAt: '2026-01-28' },
  { slug: 'sigiriya-sunset-soiree', updatedAt: '2026-01-15' },
  { slug: 'jaffna-heritage-night', updatedAt: '2026-01-10' },
  { slug: 'bentota-water-sports-gala', updatedAt: '2025-12-20' },
  { slug: 'nuwara-eliya-garden-party', updatedAt: '2025-12-10' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date('2026-03-22'),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/events`,
      lastModified: new Date('2026-03-22'),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/gallery`,
      lastModified: new Date('2026-03-15'),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: new Date('2026-03-10'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date('2026-03-01'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/sponsors`,
      lastModified: new Date('2026-03-01'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date('2026-03-01'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date('2026-03-20'),
      changeFrequency: 'daily',
      priority: 0.7,
    },
  ];

  const eventPages: MetadataRoute.Sitemap = publishedEvents.map((event) => ({
    url: `${BASE_URL}/events/${event.slug}`,
    lastModified: new Date(event.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...eventPages];
}
