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

export const metadata: Metadata = {
  title: "Heavenly Events — Sri Lanka's Premier Events Organizer",
  description:
    'With over 18 years of experience, Heavenly Events is Sri Lanka\'s premier events organizer specializing in corporate events, weddings, concerts, exhibitions, and unforgettable celebrations.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
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
