import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Syne, DM_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Analytics, { AnalyticsNoscript } from '@/components/shared/Analytics';
import JsonLd from '@/components/shared/JsonLd';
import { generateOrganizationJsonLd } from '@/lib/seo';
import LayoutShell from '@/components/layout/LayoutShell';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['600', '700'],
  display: 'swap',
  variable: '--font-cormorant',
});

const syne = Syne({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  display: 'swap',
  variable: '--font-syne',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
  variable: '--font-dm-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://heavenly-events.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Heavenly Events — Sri Lanka's Premier Events Organizer",
    template: '%s | Heavenly Events',
  },
  description:
    'With over 18 years of experience, Heavenly Events is Sri Lanka\'s premier events organizer specializing in corporate events, weddings, concerts, exhibitions, and unforgettable celebrations.',
  keywords: ['events', 'Sri Lanka', 'exhibitions', 'weddings', 'conferences', 'event management', 'Colombo', 'BMICH'],
  authors: [{ name: 'Heavenly Events' }],
  creator: 'Heavenly Events',
  publisher: 'Heavenly Events',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Heavenly Events',
    title: "Heavenly Events — Sri Lanka's Premier Events Organizer",
    description:
      'With over 18 years of experience, Heavenly Events is Sri Lanka\'s premier events organizer. Corporate events, weddings, exhibitions & more.',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Heavenly Events Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Heavenly Events — Sri Lanka's Premier Events Organizer",
    description:
      'Sri Lanka\'s premier events organizer. Corporate events, weddings, exhibitions & unforgettable celebrations.',
    images: ['/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1a56db',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body data-theme="light">
        <Analytics />
        <AnalyticsNoscript />
        <JsonLd data={generateOrganizationJsonLd()} />
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
