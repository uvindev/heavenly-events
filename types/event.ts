import type { Registration } from './registration';

export const EventCategory = {
  CORPORATE: 'CORPORATE',
  WEDDING: 'WEDDING',
  BIRTHDAY: 'BIRTHDAY',
  CONCERT: 'CONCERT',
  PRIVATE: 'PRIVATE',
  GALA: 'GALA',
  CONFERENCE: 'CONFERENCE',
  CULTURAL: 'CULTURAL',
  CLIENT_EVENT: 'CLIENT_EVENT',
  EDUCATION_FAIR: 'EDUCATION_FAIR',
  TRADE_EXPO: 'TRADE_EXPO',
  HEALTH_EXPO: 'HEALTH_EXPO',
  WEDDING_SHOW: 'WEDDING_SHOW',
  OTHER: 'OTHER',
} as const;

export type EventCategory = (typeof EventCategory)[keyof typeof EventCategory];

export const EventStatus = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
  CANCELLED: 'CANCELLED',
  COMPLETED: 'COMPLETED',
} as const;

export type EventStatus = (typeof EventStatus)[keyof typeof EventStatus];

export interface Event {
  id: number;
  slug: string;
  title: string;
  description: string;
  shortDesc: string | null;
  category: EventCategory;
  status: EventStatus;
  isPublic: boolean;
  isClientEvent: boolean;
  clientName: string | null;
  eventDate: Date;
  eventEndDate: Date | null;
  doorsOpenTime: Date | null;
  registrationDeadline: Date | null;
  venueName: string;
  venueAddress: string;
  venueCity: string;
  googleMapsUrl: string | null;
  googleMapsEmbed: string | null;
  latitude: number | null;
  longitude: number | null;
  coverImage: string | null;
  coverImageAlt: string | null;
  primaryColor: string | null;
  secondaryColor: string | null;
  accentColor: string | null;
  maxCapacity: number | null;
  registrationCount: number;
  requiresApproval: boolean;
  facebookUrl: string | null;
  visitorFormSchema: Record<string, unknown> | null;
  exhibitorFormSchema: Record<string, unknown> | null;
  metaTitle: string | null;
  metaDesc: string | null;
  ogImage: string | null;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date | null;
}

export interface EventSchedule {
  id: number;
  eventId: number;
  time: string;
  title: string;
  description: string | null;
  sortOrder: number;
}

export interface EventSponsor {
  id: number;
  eventId: number;
  sponsorId: number;
  tier: 'PLATINUM' | 'GOLD' | 'SILVER' | 'STANDARD';
  sponsor: Sponsor;
}

export interface Sponsor {
  id: number;
  name: string;
  logoUrl: string;
  logoAlt: string;
  websiteUrl: string | null;
  tier: 'PLATINUM' | 'GOLD' | 'SILVER' | 'STANDARD';
  isActive: boolean;
  sortOrder: number;
  description: string | null;
  createdAt: Date;
}

export interface EventWithRelations extends Event {
  registrations: Registration[];
  schedule: EventSchedule[];
  eventSponsors: EventSponsor[];
}

export type EventCard = Pick<
  Event,
  | 'id'
  | 'slug'
  | 'title'
  | 'shortDesc'
  | 'category'
  | 'status'
  | 'eventDate'
  | 'eventEndDate'
  | 'venueName'
  | 'venueCity'
  | 'coverImage'
  | 'coverImageAlt'
  | 'primaryColor'
  | 'maxCapacity'
  | 'registrationCount'
>;
