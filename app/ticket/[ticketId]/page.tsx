import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import TicketCard from '@/components/shared/TicketCard';
import type { Registration } from '@/types/registration';
import type { Event, EventSponsor } from '@/types/event';

/* ─────────────────────────────────────────────────────────────
   Mock Data — Replace with real DB queries when Prisma is wired
   ───────────────────────────────────────────────────────────── */

const MOCK_SPONSORS: EventSponsor[] = [
  {
    id: 1,
    eventId: 1,
    sponsorId: 1,
    tier: 'GOLD',
    sponsor: {
      id: 1,
      name: 'Lanka Ventures',
      logoUrl: '/sponsors/lanka-ventures.svg',
      logoAlt: 'Lanka Ventures logo',
      websiteUrl: 'https://lankaventures.lk',
      tier: 'GOLD',
      isActive: true,
      sortOrder: 1,
      description: null,
      createdAt: new Date('2025-01-01'),
    },
  },
  {
    id: 2,
    eventId: 1,
    sponsorId: 2,
    tier: 'SILVER',
    sponsor: {
      id: 2,
      name: 'Ceylon Digital',
      logoUrl: '/sponsors/ceylon-digital.svg',
      logoAlt: 'Ceylon Digital logo',
      websiteUrl: 'https://ceylondigital.com',
      tier: 'SILVER',
      isActive: true,
      sortOrder: 2,
      description: null,
      createdAt: new Date('2025-01-01'),
    },
  },
];

const MOCK_EVENT: Event & { eventSponsors: EventSponsor[] } = {
  id: 1,
  slug: 'colombo-education-fair-2026',
  title: 'Colombo Education Fair 2026',
  description: 'The largest education fair in Sri Lanka featuring over 100 universities and colleges from around the world.',
  shortDesc: 'Sri Lanka\'s biggest education fair with 100+ universities',
  category: 'EDUCATION_FAIR',
  status: 'PUBLISHED',
  isPublic: true,
  isClientEvent: false,
  clientName: null,
  eventDate: new Date('2026-04-15T09:00:00.000Z'),
  eventEndDate: new Date('2026-04-15T18:00:00.000Z'),
  doorsOpenTime: new Date('2026-04-15T08:30:00.000Z'),
  registrationDeadline: new Date('2026-04-14T23:59:59.000Z'),
  venueName: 'BMICH',
  venueAddress: 'Bauddhaloka Mawatha',
  venueCity: 'Colombo 07',
  googleMapsUrl: 'https://maps.google.com/?q=BMICH+Colombo',
  googleMapsEmbed: null,
  latitude: 6.9012,
  longitude: 79.8618,
  coverImage: '/events/edu-fair-cover.jpg',
  coverImageAlt: 'Colombo Education Fair 2026',
  primaryColor: '#1D4ED8',
  secondaryColor: '#3B82F6',
  accentColor: '#60A5FA',
  maxCapacity: 5000,
  registrationCount: 2847,
  requiresApproval: false,
  facebookUrl: 'https://facebook.com/events/colombo-edu-fair-2026',
  visitorFormSchema: null,
  exhibitorFormSchema: null,
  metaTitle: 'Colombo Education Fair 2026 | Heavenly Events',
  metaDesc: 'Register free for Sri Lanka\'s biggest education fair. 100+ universities, career guidance, scholarships.',
  ogImage: '/events/edu-fair-og.jpg',
  createdAt: new Date('2025-12-01'),
  updatedAt: new Date('2026-03-20'),
  publishedAt: new Date('2026-01-15'),
  eventSponsors: MOCK_SPONSORS,
};

// Sample base64 QR code placeholder (a tiny valid data URI for demo purposes)
const MOCK_QR_DATA_URL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAIAAADPMO' +
  'yrAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF8WlUWHRYTUw6Y29tLmFkb2JlLnhtcA' +
  'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
  'AAAABJREFUeJztwQEBAAAAgiD/p25IQwEAAAAAAAAAAAAAAAAAAAAAPwZpQAABFm+JfA' +
  'AAAABJRU5ErkJggg==';

const MOCK_REGISTRATION: Registration = {
  id: 1,
  ticketId: 'HVE-EDU26-0001',
  qrCode: MOCK_QR_DATA_URL,
  registrationType: 'VISITOR',
  fullName: 'Kasun Perera',
  email: 'kasun.perera@gmail.com',
  phone: '+94771234567',
  additionalNotes: null,
  companyName: null,
  companyPhone: null,
  companyWebsite: null,
  businessCategory: null,
  boothSize: null,
  exhibitorMessage: null,
  formResponses: null,
  status: 'CONFIRMED',
  checkedIn: false,
  checkedInAt: null,
  emailSent: true,
  emailSentAt: new Date('2026-03-20T10:00:00.000Z'),
  utmSource: null,
  utmMedium: null,
  utmCampaign: null,
  fbclid: null,
  gclid: null,
  ipAddress: null,
  userAgent: null,
  referrer: null,
  reviewedBy: null,
  reviewedAt: null,
  reviewNotes: null,
  createdAt: new Date('2026-03-20T10:00:00.000Z'),
  updatedAt: new Date('2026-03-20T10:00:00.000Z'),
  eventId: 1,
};

/**
 * Fetch registration by ticket ID.
 * TODO: Replace with actual Prisma query:
 *   prisma.registration.findUnique({ where: { ticketId }, include: { event: { include: { eventSponsors: { include: { sponsor: true } } } } } })
 */
async function getRegistrationByTicketId(
  ticketId: string
): Promise<{ registration: Registration; event: Event & { eventSponsors: EventSponsor[] } } | null> {
  // Mock: only return data if ticketId matches
  if (ticketId === MOCK_REGISTRATION.ticketId || ticketId === 'demo') {
    return {
      registration: MOCK_REGISTRATION,
      event: MOCK_EVENT,
    };
  }
  return null;
}

/* ─────────────────────────────────────────────────────────────
   Dynamic Metadata
   ───────────────────────────────────────────────────────────── */

interface PageProps {
  params: Promise<{ ticketId: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { ticketId } = await params;
  const data = await getRegistrationByTicketId(ticketId);

  if (!data) {
    return {
      title: 'Ticket Not Found | Heavenly Events',
    };
  }

  const { registration, event } = data;

  return {
    title: `Your Ticket — ${event.title} | Heavenly Events`,
    description: `${registration.fullName}'s registration for ${event.title}. Ticket ID: ${registration.ticketId}`,
    robots: { index: false, follow: false },
    openGraph: {
      title: `${event.title} — Ticket`,
      description: `Registered for ${event.title} at ${event.venueName}, ${event.venueCity}`,
      type: 'website',
    },
  };
}

/* ─────────────────────────────────────────────────────────────
   Page Component
   ───────────────────────────────────────────────────────────── */

export default async function TicketPage({ params }: PageProps) {
  const { ticketId } = await params;
  const data = await getRegistrationByTicketId(ticketId);

  if (!data) {
    notFound();
  }

  const { registration, event } = data;

  return (
    <>
      {/* Print styles: hide everything except ticket card */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media print {
              body {
                background: white !important;
                margin: 0 !important;
                padding: 0 !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              .ticket-page-bg > *:not(.ticket-card-wrapper) {
                display: none !important;
              }
              .ticket-card-wrapper {
                padding: 0 !important;
                display: flex !important;
                justify-content: center !important;
              }
              .ticket-card {
                box-shadow: none !important;
                max-width: 100% !important;
                border: 1px solid #e5e7eb !important;
              }
              .print-hide {
                display: none !important;
              }
              nav, footer, header {
                display: none !important;
              }
            }
          `,
        }}
      />

      <main
        className="ticket-page-bg min-h-screen flex flex-col items-center justify-center px-4 py-8"
        style={{ backgroundColor: '#F3F4F6' }}
      >
        <div className="ticket-card-wrapper w-full max-w-md">
          <TicketCard registration={registration} event={event} />
        </div>

        {/* Powered by footer — hidden on print */}
        <p
          className="print-hide mt-6 font-body text-xs text-center"
          style={{ color: '#9CA3AF' }}
        >
          Powered by{' '}
          <a
            href="/"
            className="font-medium no-underline"
            style={{ color: '#6B7280' }}
          >
            Heavenly Events
          </a>
        </p>
      </main>
    </>
  );
}
