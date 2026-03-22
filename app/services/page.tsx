import { Metadata } from 'next';
import {
  CalendarCheck,
  Heart,
  GraduationCap,
  Building2,
  Monitor,
  Handshake,
  Award,
  Lightbulb,
  Users,
  Phone,
} from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import MagneticButton from '@/components/shared/MagneticButton';
import Card from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'Event Management Services Sri Lanka | Heavenly Events',
  description:
    'Comprehensive event management services including exhibitions, weddings, education fairs, trade expos, digital solutions, and bespoke client events across Sri Lanka.',
};

const services = [
  {
    icon: CalendarCheck,
    name: 'Events & Exhibition Management',
    slug: 'events-exhibition-management',
    color: '#1a56db',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    description:
      'From concept to execution, we manage world-class exhibitions and corporate events that leave lasting impressions. Our team of seasoned professionals handles every detail — venue selection, vendor coordination, branding, logistics, and on-ground management — so you can focus on what matters most: your audience. With over 500 events delivered, we bring a proven framework that guarantees flawless execution every single time.',
    cta: 'Plan Your Exhibition',
  },
  {
    icon: Heart,
    name: 'Wedding Shows & Lifestyle Events',
    slug: 'wedding-shows',
    color: '#1a56db',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    description:
      "Sri Lanka's most spectacular wedding exhibitions and lifestyle events, connecting couples with the finest vendors, designers, and venues to craft their dream celebration. Our wedding shows bring together the island's top bridal couturiers, florists, photographers, caterers, and honeymoon destinations under one roof. Each show is a curated experience designed to inspire and delight couples planning their perfect day.",
    cta: 'Explore Wedding Shows',
  },
  {
    icon: GraduationCap,
    name: 'Education Fairs',
    slug: 'education-fairs',
    color: '#1a56db',
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80',
    description:
      "Bridging students with world-class universities and institutions. Our education fairs connect thousands of aspiring learners with global opportunities, featuring universities from the UK, Australia, Canada, USA, and beyond. We handle university liaison, student registrations, venue management, and marketing campaigns that consistently deliver record-breaking attendance. Our fairs have helped over 50,000 students discover their path to higher education.",
    cta: 'Learn About Our Fairs',
  },
  {
    icon: Building2,
    name: 'Trade Expos & Industry Shows',
    slug: 'trade-expos',
    color: '#1a56db',
    image: 'https://images.unsplash.com/photo-1594122230689-45899d9e6f69?w=800&q=80',
    description:
      'High-impact trade exhibitions that bring together industry leaders, innovators, and businesses. Creating platforms for meaningful connections, business growth, and knowledge exchange. From automotive expos to food and beverage trade shows, we build immersive exhibition experiences with custom pavilions, B2B matchmaking, seminar programs, and international buyer delegations that drive real commercial outcomes.',
    cta: 'Exhibit With Us',
  },
  {
    icon: Monitor,
    name: 'Digital Solutions & Web Development',
    slug: 'digital-solutions',
    color: '#1a56db',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80',
    description:
      'Cutting-edge digital event solutions including virtual venues, live streaming, interactive registrations, and comprehensive event technology platforms. Our digital arm designs and builds custom event websites, registration portals, ticketing systems, attendee engagement apps, and post-event analytics dashboards. We blend technology with creativity to extend your event reach beyond physical boundaries.',
    cta: 'Go Digital',
  },
  {
    icon: Handshake,
    name: 'Client Event Management',
    slug: 'client-event-management',
    color: '#1a56db',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
    description:
      "End-to-end event management tailored to your vision. We partner with brands and organizations to deliver bespoke events that exceed expectations — product launches, conferences, award ceremonies, brand activations, and private celebrations. Every event is treated as a unique canvas where your brand story takes center stage. Our dedicated project managers ensure seamless coordination from brief to bow.",
    cta: 'Get a Custom Quote',
  },
];

const whyChooseUs = [
  {
    icon: Award,
    title: '18+ Years Experience',
    description:
      'Nearly two decades of creating unforgettable events across Sri Lanka. Our track record speaks for itself — over 500 successful events and counting.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation First',
    description:
      'We blend cutting-edge technology with creative excellence. From AR experiences to AI-powered event analytics, we stay ahead of the curve.',
  },
  {
    icon: Users,
    title: 'Dedicated Team',
    description:
      'A passionate team of event architects, designers, coordinators, and technologists who live and breathe events. Your vision is our mission.',
  },
];

export default function ServicesPage() {
  return (
    <>
      <main>
        {/* Hero */}
        <section
          className="relative flex min-h-[50vh] items-center justify-center overflow-hidden pt-24 pb-16"
          style={{ backgroundColor: 'var(--bg-secondary)' }}
        >
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
              Our Services
            </span>
            <h1
              className="font-display mt-4 font-bold"
              style={{
                fontSize: 'var(--text-h1)',
                lineHeight: 'var(--leading-tight)',
                color: 'var(--text-primary)',
              }}
            >
              Every Occasion Deserves Perfection
            </h1>
            <p
              className="font-body mx-auto mt-5 max-w-2xl"
              style={{
                fontSize: 'var(--text-body)',
                color: 'var(--text-secondary)',
                lineHeight: 'var(--leading-relaxed)',
              }}
            >
              From grand exhibitions to intimate celebrations, we bring the same unwavering
              commitment to excellence. Discover how we can transform your vision into an
              unforgettable experience.
            </p>
          </div>
        </section>

        {/* Services */}
        <section
          className="py-20 sm:py-28"
          style={{ backgroundColor: 'var(--bg-primary)' }}
        >
          <div className="mx-auto max-w-6xl space-y-16 px-4 sm:space-y-24 sm:px-6 lg:space-y-32 lg:px-8">
            {services.map((service, i) => {
              const Icon = service.icon;
              const isReversed = i % 2 !== 0;

              return (
                <div
                  key={service.slug}
                  id={service.slug}
                  className={`flex flex-col items-center gap-8 sm:gap-10 md:gap-14 ${
                    isReversed ? 'md:flex-row-reverse' : 'md:flex-row'
                  }`}
                >
                  {/* Visual area */}
                  <div className="relative w-full md:w-1/2">
                    <div
                      className="pointer-events-none absolute -inset-4 rounded-3xl opacity-20 blur-[80px]"
                      style={{ backgroundColor: service.color }}
                    />
                    <div
                      className="relative overflow-hidden rounded-2xl"
                      style={{
                        aspectRatio: '4/3',
                        border: '1px solid var(--glass-border)',
                      }}
                    >
                      <img
                        src={service.image}
                        alt={service.name}
                        className="absolute inset-0 h-full w-full object-cover"
                        loading="lazy"
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(135deg, ${service.color}33 0%, transparent 60%)`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Text content */}
                  <div className="w-full md:w-1/2">
                    <div
                      className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl"
                      style={{
                        backgroundColor: `${service.color}15`,
                        border: `1px solid ${service.color}30`,
                      }}
                    >
                      <Icon className="h-6 w-6" style={{ color: service.color }} />
                    </div>

                    <h2
                      className="font-display font-bold"
                      style={{
                        fontSize: 'var(--text-h3)',
                        lineHeight: 'var(--leading-snug)',
                        color: 'var(--text-primary)',
                      }}
                    >
                      {service.name}
                    </h2>

                    <p
                      className="font-body mt-4"
                      style={{
                        fontSize: 'var(--text-body)',
                        lineHeight: 'var(--leading-relaxed)',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {service.description}
                    </p>

                    <div className="mt-8">
                      <MagneticButton href="/contact" variant="secondary" size="md">
                        {service.cta} &rarr;
                      </MagneticButton>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Why Choose Us */}
        <section
          className="py-20 sm:py-28"
          style={{ backgroundColor: 'var(--bg-secondary)' }}
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              label="Why Heavenly Events"
              title="Why Choose Us"
              subtitle="Three pillars that set us apart in Sri Lanka's event industry."
            />

            <div className="mt-4 grid grid-cols-1 gap-8 sm:grid-cols-3">
              {whyChooseUs.map((item) => {
                const Icon = item.icon;
                return (
                  <Card key={item.title}as="article">
                    <div className="flex flex-col items-center text-center">
                      <div
                        className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl"
                        style={{
                          backgroundColor: 'rgba(26,86,219,0.12)',
                          border: '1px solid rgba(26,86,219,0.25)',
                        }}
                      >
                        <Icon className="h-7 w-7" style={{ color: 'var(--color-crimson)' }} />
                      </div>
                      <h3
                        className="font-display font-bold"
                        style={{
                          fontSize: 'var(--text-h4)',
                          color: 'var(--text-primary)',
                        }}
                      >
                        {item.title}
                      </h3>
                      <p
                        className="font-body mt-3"
                        style={{
                          fontSize: 'var(--text-sm)',
                          color: 'var(--text-secondary)',
                          lineHeight: 'var(--leading-relaxed)',
                        }}
                      >
                        {item.description}
                      </p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section
          className="relative overflow-hidden py-20 sm:py-28"
          style={{
            background: 'linear-gradient(135deg, #1a3a8a 0%, #1e40af 40%, #1a56db 100%)',
          }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 50% 60% at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 70%)',
            }}
          />
          <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h2
              className="font-display font-bold"
              style={{
                fontSize: 'var(--text-h2)',
                lineHeight: 'var(--leading-tight)',
                color: '#ffffff',
              }}
            >
              Shape Brilliance With Heavenly Events
            </h2>
            <p
              className="font-body mx-auto mt-4 max-w-xl"
              style={{
                fontSize: 'var(--text-body)',
                color: 'rgba(255,255,255,0.8)',
                lineHeight: 'var(--leading-relaxed)',
              }}
            >
              Ready to create something extraordinary? Let&apos;s discuss your vision and bring it to
              life.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <MagneticButton href="/contact" variant="primary" size="lg">
                Book a Free Consultation &rarr;
              </MagneticButton>
              <a
                href="tel:+94777776357"
                className="flex items-center gap-2 font-ui text-sm font-semibold transition-colors hover:opacity-80"
                style={{ color: 'rgba(255,255,255,0.8)' }}
              >
                <Phone className="h-4 w-4" style={{ color: '#ffffff' }} />
                +94 777 776 357
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
