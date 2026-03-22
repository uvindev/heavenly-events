import HeroSection from '@/components/home/HeroSection';
import StatsBar from '@/components/home/StatsBar';
import UpcomingEventsSection from '@/components/home/UpcomingEventsSection';
import ServicesSection from '@/components/home/ServicesSection';
import GalleryTeaser from '@/components/home/GalleryTeaser';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import SponsorsStrip from '@/components/home/SponsorsStrip';
import CTASection from '@/components/home/CTASection';

export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      <HeroSection />
      <StatsBar />
      <UpcomingEventsSection />
      <ServicesSection />
      <GalleryTeaser />
      <TestimonialsSection />
      <SponsorsStrip />
      <CTASection />
    </main>
  );
}
