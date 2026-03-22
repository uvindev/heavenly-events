import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Upcoming Events in Sri Lanka | Heavenly Events',
  description:
    'Discover and register for free events across Sri Lanka — weddings, corporate events, expos, concerts, and more. Get your QR ticket instantly by email.',
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
