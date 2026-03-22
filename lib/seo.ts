const BASE_URL = 'https://heavenlyevents.lk';

interface EventInput {
  name: string;
  slug: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: {
    name: string;
    address: string;
  };
  image?: string;
  organizer?: string;
  offers?: {
    price: number;
    currency?: string;
    availability?: 'InStock' | 'SoldOut' | 'PreOrder';
    url?: string;
    validFrom?: string;
  };
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateEventJsonLd(event: EventInput): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    ...(event.endDate && { endDate: event.endDate }),
    url: `${BASE_URL}/events/${event.slug}`,
    ...(event.image && {
      image: [event.image],
    }),
    location: {
      '@type': 'Place',
      name: event.location.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: event.location.address,
        addressCountry: 'LK',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: event.organizer ?? 'Heavenly Events',
      url: BASE_URL,
    },
    ...(event.offers && {
      offers: {
        '@type': 'Offer',
        price: event.offers.price,
        priceCurrency: event.offers.currency ?? 'LKR',
        availability: `https://schema.org/${event.offers.availability ?? 'InStock'}`,
        ...(event.offers.url && { url: event.offers.url }),
        ...(event.offers.validFrom && { validFrom: event.offers.validFrom }),
      },
    }),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  };
}

export function generateOrganizationJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Heavenly Events',
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    description:
      "Sri Lanka's premier events organizer with over 18 years of experience specializing in corporate events, weddings, concerts, exhibitions, and unforgettable celebrations.",
    foundingDate: '2008',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'LK',
      addressLocality: 'Colombo',
    },
    sameAs: [
      'https://www.facebook.com/heavenlyevents',
      'https://www.instagram.com/heavenlyevents',
      'https://www.linkedin.com/company/heavenlyevents',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['English', 'Sinhala', 'Tamil'],
    },
  };
}

export function generateBreadcrumbJsonLd(
  items: BreadcrumbItem[]
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`,
    })),
  };
}
