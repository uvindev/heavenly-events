import type { Metadata } from 'next';
import EventHero from '@/components/events/EventHero';
import EventDetails from '@/components/events/EventDetails';
import EventDetailClient from './EventDetailClient';
import type { FormField } from '@/types/registration';

/* ================================================================
   MOCK DATA — Replace with actual DB fetch via Prisma
   ================================================================ */

interface MockEvent {
  id: number;
  slug: string;
  title: string;
  shortDesc: string;
  description: string;
  category: string;
  eventDate: string;
  eventEndDate: string | null;
  doorsOpenTime: string | null;
  venueName: string;
  venueAddress: string;
  venueCity: string;
  googleMapsUrl: string | null;
  googleMapsEmbed: string | null;
  coverImage: string | null;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  registrationCount: number;
  maxCapacity: number | null;
  visitorFormSchema: FormField[] | null;
  exhibitorFormSchema: FormField[] | null;
  schedule: { time: string; title: string; description: string | null }[];
  sponsors: { name: string; logoUrl: string; tier: string; websiteUrl: string | null }[];
  metaTitle: string | null;
  metaDesc: string | null;
  ogImage: string | null;
}

const mockEventsMap: Record<string, MockEvent> = {
  'colombo-wedding-show-2026': {
    id: 1,
    slug: 'colombo-wedding-show-2026',
    title: 'Colombo Wedding Show',
    shortDesc: 'Sri Lanka\'s premier bridal and wedding exhibition featuring 200+ vendors.',
    description: `
      <p>The <strong>Colombo Wedding Show</strong> is Sri Lanka's most anticipated bridal and wedding exhibition, bringing together over 200 of the country's finest wedding vendors under one roof at the iconic BMICH.</p>
      <p>Whether you're a soon-to-be-wed couple looking for inspiration or an industry professional seeking the latest trends, this is the event you cannot miss. From stunning bridal couture and breathtaking floral arrangements to luxury venues and world-class photographers — discover everything you need for your dream wedding.</p>
      <h4>What to Expect</h4>
      <ul>
        <li>200+ leading wedding vendors and service providers</li>
        <li>Live bridal fashion shows throughout the day</li>
        <li>Free wedding planning consultations</li>
        <li>Exclusive show-only discounts and packages</li>
        <li>Live cake decorating demonstrations</li>
        <li>DJ and entertainment showcases</li>
        <li>Luxury honeymoon destination pavilion</li>
      </ul>
      <p>Admission is completely <strong>FREE</strong>. Register now to secure your QR ticket and skip the queue on event day.</p>
    `,
    category: 'Wedding Show',
    eventDate: '2026-07-18T09:00:00',
    eventEndDate: '2026-07-20T18:00:00',
    doorsOpenTime: '2026-07-18T08:30:00',
    venueName: 'BMICH',
    venueAddress: 'Bauddhaloka Mawatha',
    venueCity: 'Colombo 07',
    googleMapsUrl: 'https://maps.google.com/?q=BMICH+Colombo',
    googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.938!2d79.860!3d6.900!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBMICH!5e0!3m2!1sen!2slk!4v1',
    coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
    primaryColor: '#C9A84C',
    secondaryColor: '#1a56db',
    accentColor: '#F8F0E3',
    registrationCount: 1240,
    maxCapacity: 5000,
    visitorFormSchema: [
      {
        id: 'wedding_date',
        label: 'Your Wedding Date (if applicable)',
        type: 'date',
        required: false,
        placeholder: '',
        helpText: 'Helps vendors prepare relevant offers for you',
        displayOrder: 1,
      },
      {
        id: 'interests',
        label: 'What are you most interested in?',
        type: 'select',
        required: false,
        options: ['Bridal Wear', 'Photography', 'Venues', 'Catering', 'Decoration', 'Honeymoon', 'Everything'],
        displayOrder: 2,
      },
    ],
    exhibitorFormSchema: null,
    schedule: [
      { time: '08:30 AM', title: 'Doors Open', description: 'Early bird access for pre-registered visitors.' },
      { time: '09:00 AM', title: 'Exhibition Hall Opens', description: 'Browse 200+ wedding vendors across all categories.' },
      { time: '10:30 AM', title: 'Bridal Fashion Show — Morning', description: 'Featuring top Sri Lankan bridal designers showcasing 2026 collections.' },
      { time: '12:00 PM', title: 'Wedding Planning Workshop', description: 'Free session: "Planning Your Dream Wedding on a Budget" by celebrity planner.' },
      { time: '01:30 PM', title: 'Live Cake Decorating', description: 'Watch master bakers create stunning wedding cakes live on stage.' },
      { time: '03:00 PM', title: 'Bridal Fashion Show — Afternoon', description: 'Evening wear and reception outfit showcase with live music.' },
      { time: '05:00 PM', title: 'Lucky Draw & Closing', description: 'Grand lucky draw for registered visitors. Prizes worth over LKR 5 million.' },
    ],
    sponsors: [
      { name: 'Cinnamon Hotels', logoUrl: '/sponsors/cinnamon.png', tier: 'PLATINUM', websiteUrl: 'https://cinnamonhotels.com' },
      { name: 'Softlogic', logoUrl: '/sponsors/softlogic.png', tier: 'GOLD', websiteUrl: 'https://softlogic.lk' },
      { name: 'Abans', logoUrl: '/sponsors/abans.png', tier: 'GOLD', websiteUrl: 'https://abans.com' },
      { name: 'Dilmah Tea', logoUrl: '/sponsors/dilmah.png', tier: 'SILVER', websiteUrl: 'https://dilmahtea.com' },
    ],
    metaTitle: 'Colombo Wedding Show — Free Entry | Register Now',
    metaDesc: 'Register free for the Colombo Wedding Show at BMICH. 200+ wedding vendors, bridal fashion shows, and exclusive discounts. Get your QR ticket instantly.',
    ogImage: null,
  },
  'colombo-education-fair-2026': {
    id: 2,
    slug: 'colombo-education-fair-2026',
    title: 'Colombo Education Fair 2026 - BMICH',
    shortDesc: 'Connect with top universities and institutions from around the world.',
    description: `
      <p>The <strong>Colombo Education Fair 2026 - BMICH</strong> is the country's largest education fair, connecting students with leading universities and institutions from Sri Lanka and abroad.</p>
      <p>Whether you're looking for undergraduate programs, postgraduate degrees, or professional certifications, this expo brings opportunities directly to you. Meet admission officers, attend seminars, and discover scholarship opportunities — all in one place.</p>
    `,
    category: 'Education Fair',
    eventDate: '2026-08-15T09:00:00',
    eventEndDate: '2026-08-17T17:00:00',
    doorsOpenTime: null,
    venueName: 'BMICH',
    venueAddress: 'Bauddhaloka Mawatha',
    venueCity: 'Colombo',
    googleMapsUrl: 'https://maps.google.com/?q=BMICH+Colombo',
    googleMapsEmbed: null,
    coverImage: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1200&q=80',
    primaryColor: '#D32F2F',
    secondaryColor: '#1A237E',
    accentColor: '#FFD600',
    registrationCount: 890,
    maxCapacity: 3000,
    visitorFormSchema: null,
    exhibitorFormSchema: null,
    schedule: [
      { time: '09:00 AM', title: 'Expo Opens', description: 'Browse university booths and collect prospectuses.' },
      { time: '11:00 AM', title: 'Scholarship Seminar', description: 'Learn about fully funded scholarship opportunities.' },
      { time: '02:00 PM', title: 'Career Guidance Workshop', description: 'Expert panel on choosing the right career path.' },
    ],
    sponsors: [],
    metaTitle: null,
    metaDesc: null,
    ogImage: null,
  },
};

// Add remaining events with simpler data
const simpleEvents = [
  { slug: 'kedella-home-construction-show-2026', title: 'Kedella Home & Construction Show', category: 'Trade Expo', date: '2026-09-05T09:00:00', venue: 'TBA', city: 'Colombo', color: '#5D4037', count: 2100, image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80' },
  { slug: 'galle-education-fair', title: 'Galle Education Fair', category: 'Education Fair', date: '2026-08-29T09:00:00', venue: 'TBA Galle', city: 'Galle', color: '#D32F2F', count: 650, image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&q=80' },
  { slug: 'colombo-furniture-interior-expo', title: 'Furniture & Interior Expo', category: 'Trade Expo', date: '2026-10-10T09:00:00', venue: 'TBA', city: 'Colombo', color: '#6D4C41', count: 430, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80' },
  { slug: 'health-expo-sri-lanka-2026', title: 'Health Expo', category: 'Health Expo', date: '2026-11-07T09:00:00', venue: 'TBA', city: 'Colombo', color: '#0D47A1', count: 1560, image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80' },
  { slug: 'edu-fair-kurunegala', title: 'EDU FAIR KURUNEGALA', category: 'Education Fair', date: '2026-09-19T09:00:00', venue: 'TBA', city: 'Kurunegala', color: '#D32F2F', count: 780, image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1200&q=80' },
  { slug: 'solar-energy-expo-sri-lanka', title: 'Solar Energy Expo', category: 'Trade Expo', date: '2025-11-15T09:00:00', venue: 'TBA', city: 'Colombo', color: '#1565C0', count: 1020, image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&q=80' },
];

simpleEvents.forEach((e) => {
  if (!mockEventsMap[e.slug]) {
    mockEventsMap[e.slug] = {
      id: Math.floor(Math.random() * 1000),
      slug: e.slug,
      title: e.title,
      shortDesc: `Join us for the ${e.title} in ${e.city}.`,
      description: `<p>Join us for an unforgettable experience at the <strong>${e.title}</strong>, taking place at ${e.venue} in ${e.city}. This event brings together the best in the industry for a day of learning, networking, and inspiration.</p><p>Registration is completely free. Secure your spot now and receive your QR ticket via email for instant entry.</p>`,
      category: e.category,
      eventDate: e.date,
      eventEndDate: null,
      doorsOpenTime: null,
      venueName: e.venue,
      venueAddress: e.venue,
      venueCity: e.city,
      googleMapsUrl: `https://maps.google.com/?q=${encodeURIComponent(e.venue + ' ' + e.city)}`,
      googleMapsEmbed: null,
      coverImage: e.image,
      primaryColor: e.color,
      secondaryColor: e.color,
      accentColor: e.color,
      registrationCount: e.count,
      maxCapacity: null,
      visitorFormSchema: null,
      exhibitorFormSchema: null,
      schedule: [],
      sponsors: [],
      metaTitle: null,
      metaDesc: null,
      ogImage: null,
    };
  }
});

function getEvent(slug: string): MockEvent | null {
  return mockEventsMap[slug] || null;
}

/* ================================================================
   METADATA (Server Component)
   ================================================================ */

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = getEvent(slug);

  if (!event) {
    return {
      title: 'Event Not Found | Heavenly Events',
      description: 'This event could not be found.',
    };
  }

  return {
    title: event.metaTitle || `${event.title} | Heavenly Events`,
    description: event.metaDesc || event.shortDesc,
    openGraph: {
      title: event.metaTitle || event.title,
      description: event.metaDesc || event.shortDesc,
      type: 'website',
      ...(event.ogImage ? { images: [{ url: event.ogImage }] } : {}),
    },
  };
}

/* ================================================================
   PAGE COMPONENT (Server Component)
   ================================================================ */

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const event = getEvent(slug);

  if (!event) {
    return (
      <main
        className="flex items-center justify-center min-h-screen"
        style={{ backgroundColor: 'var(--bg-primary)' }}
      >
        <div className="text-center px-4 sm:px-6 lg:px-8">
          <h1
            className="font-display text-4xl font-bold"
            style={{ color: 'var(--text-primary)' }}
          >
            Event Not Found
          </h1>
          <p className="font-body mt-4" style={{ color: 'var(--text-secondary)' }}>
            The event you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <a
            href="/events"
            className="inline-block mt-6 px-6 py-3 rounded-full font-ui text-sm font-semibold"
            style={{ backgroundColor: 'var(--color-crimson)', color: '#fff' }}
          >
            Browse Events
          </a>
        </div>
      </main>
    );
  }

  // JSON-LD Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.shortDesc,
    startDate: event.eventDate,
    ...(event.eventEndDate ? { endDate: event.eventEndDate } : {}),
    ...(event.doorsOpenTime ? { doorTime: event.doorsOpenTime } : {}),
    location: {
      '@type': 'Place',
      name: event.venueName,
      address: {
        '@type': 'PostalAddress',
        streetAddress: event.venueAddress,
        addressLocality: event.venueCity,
        addressCountry: 'LK',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: 'Heavenly Events',
      url: 'https://heavenlyevents.lk',
    },
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    isAccessibleForFree: true,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'LKR',
      availability: 'https://schema.org/InStock',
      url: `https://heavenlyevents.lk/events/${event.slug}`,
    },
    ...(event.coverImage
      ? { image: event.coverImage }
      : {}),
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main
        style={{
          backgroundColor: 'var(--bg-primary)',
          // Event-themed CSS custom properties
          '--event-primary': event.primaryColor,
          '--event-secondary': event.secondaryColor,
          '--event-accent': event.accentColor,
        } as React.CSSProperties}
      >
        {/* Hero */}
        <EventHero
          title={event.title}
          coverImage={event.coverImage}
          primaryColor={event.primaryColor}
          eventDate={event.eventDate}
          venueName={event.venueName}
          venueCity={event.venueCity}
          category={event.category}
        />

        {/* Two-Column Layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
            {/* LEFT Column — Event Details (65%) */}
            <div className="w-full lg:w-[65%]">
              <EventDetails
                title={event.title}
                slug={event.slug}
                description={event.description}
                eventDate={event.eventDate}
                eventEndDate={event.eventEndDate}
                doorsOpenTime={event.doorsOpenTime}
                venueName={event.venueName}
                venueAddress={event.venueAddress}
                venueCity={event.venueCity}
                googleMapsUrl={event.googleMapsUrl}
                googleMapsEmbed={event.googleMapsEmbed}
                schedule={event.schedule}
                sponsors={event.sponsors}
                primaryColor={event.primaryColor}
              />
            </div>

            {/* RIGHT Column — Registration (35%) — Client Component */}
            <EventDetailClient
              eventId={event.id}
              eventTitle={event.title}
              eventColor={event.primaryColor}
              registrationCount={event.registrationCount}
              visitorFormSchema={event.visitorFormSchema}
              exhibitorFormSchema={event.exhibitorFormSchema}
            />
          </div>
        </div>
      </main>
    </>
  );
}
