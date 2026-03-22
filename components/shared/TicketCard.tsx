'use client';

import type { Registration } from '@/types/registration';
import type { Event, EventSponsor } from '@/types/event';
import RainbowBar from '@/components/shared/RainbowBar';
import QRCode from '@/components/shared/QRCode';
import { generateGoogleCalendarUrl, generateAppleCalendarUrl } from '@/lib/calendar';

interface TicketCardProps {
  registration: Registration;
  event: Event & { eventSponsors?: EventSponsor[] };
}

function maskPhone(phone: string): string {
  if (phone.length <= 4) return phone;
  const visible = phone.slice(-4);
  const masked = phone.slice(0, -4).replace(/\d/g, '*');
  return masked + visible;
}

function maskEmail(email: string): string {
  const parts = email.split('@');
  const local = parts[0];
  const domain = parts[1];
  if (!local || !domain) return email;
  if (local.length <= 2) return email;
  const visible = local.slice(0, 2);
  const masked = '*'.repeat(Math.min(local.length - 2, 6));
  return `${visible}${masked}@${domain}`;
}

function formatEventDate(date: Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function formatEventTime(date: Date): string {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export default function TicketCard({ registration, event }: TicketCardProps) {
  const isExhibitor = registration.registrationType === 'EXHIBITOR';
  const eventColor = event.primaryColor || '#1a56db';

  const googleCalUrl = generateGoogleCalendarUrl(event);
  const appleCalUrl = generateAppleCalendarUrl(event);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="ticket-card w-full max-w-md mx-auto overflow-hidden rounded-2xl shadow-lg"
      style={{
        backgroundColor: '#FFFFFF',
        color: '#1a1a1a',
      }}
    >
      {/* Logo Area */}
      <div className="px-6 pt-6 pb-4 text-center">
        <p
          className="font-display text-2xl font-bold"
          style={{ color: eventColor }}
        >
          Heavenly Events
        </p>
        <p
          className="font-body text-xs mt-1"
          style={{ color: '#6B7280', letterSpacing: '0.05em' }}
        >
          Sri Lanka&apos;s Premier Events Organizer
        </p>
      </div>

      {/* Rainbow Bar */}
      <RainbowBar />

      {/* Registered Heading */}
      <div className="px-6 pt-5 text-center">
        <p className="text-3xl mb-1" role="img" aria-label="Celebration">
          🎉
        </p>
        <h1
          className="font-ui text-lg font-bold uppercase tracking-wide"
          style={{ color: '#111827' }}
        >
          You&apos;re Registered!
        </h1>
      </div>

      {/* Event Name */}
      <div className="px-6 pt-4 text-center">
        <h2
          className="font-display text-3xl sm:text-4xl font-bold leading-tight"
          style={{ color: eventColor }}
        >
          {event.title}
        </h2>
      </div>

      {/* Date & Venue Info */}
      <div className="px-6 pt-5 space-y-3">
        <div className="flex items-start gap-3">
          <span className="text-xl leading-none mt-0.5" role="img" aria-label="Calendar">
            📅
          </span>
          <div>
            <p className="font-body text-sm font-medium" style={{ color: '#111827' }}>
              {formatEventDate(event.eventDate)}
            </p>
            <p className="font-body text-sm" style={{ color: '#6B7280' }}>
              {formatEventTime(event.eventDate)}
              {event.eventEndDate && ` — ${formatEventTime(event.eventEndDate)}`}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <span className="text-xl leading-none mt-0.5" role="img" aria-label="Location">
            📍
          </span>
          <div>
            <p className="font-body text-sm font-medium" style={{ color: '#111827' }}>
              {event.venueName}
            </p>
            <p className="font-body text-sm" style={{ color: '#6B7280' }}>
              {event.venueAddress}, {event.venueCity}
            </p>
          </div>
        </div>
      </div>

      {/* Registration Type Badge */}
      <div className="px-6 pt-5 flex justify-center">
        <span
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full font-ui text-xs font-bold uppercase tracking-wider"
          style={{
            backgroundColor: isExhibitor ? '#EFF6FF' : '#F0FDF4',
            color: isExhibitor ? '#1D4ED8' : '#15803D',
            border: `1px solid ${isExhibitor ? '#BFDBFE' : '#BBF7D0'}`,
          }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor: isExhibitor ? '#3B82F6' : '#22C55E',
            }}
          />
          {isExhibitor ? 'Exhibitor' : 'Visitor Entry'}
        </span>
      </div>

      {/* QR Code */}
      <div className="px-6 pt-6 flex justify-center">
        <QRCode data={registration.qrCode} size={280} alt={`QR code for ticket ${registration.ticketId}`} />
      </div>

      {/* Ticket ID */}
      <div className="px-6 pt-3 text-center">
        <p
          className="font-mono text-sm tracking-wider select-all"
          style={{ color: '#6B7280' }}
        >
          {registration.ticketId}
        </p>
      </div>

      {/* Attendee Info */}
      <div className="px-6 pt-5">
        <div
          className="rounded-lg p-4 space-y-2.5"
          style={{
            backgroundColor: '#F9FAFB',
            border: '1px solid #F3F4F6',
          }}
        >
          <div className="flex justify-between items-center">
            <span className="font-body text-xs uppercase tracking-wider" style={{ color: '#9CA3AF' }}>
              Name
            </span>
            <span className="font-body text-sm font-medium" style={{ color: '#111827' }}>
              {registration.fullName}
            </span>
          </div>
          <div className="h-px" style={{ backgroundColor: '#F3F4F6' }} />
          <div className="flex justify-between items-center">
            <span className="font-body text-xs uppercase tracking-wider" style={{ color: '#9CA3AF' }}>
              Email
            </span>
            <span className="font-body text-sm" style={{ color: '#374151' }}>
              {maskEmail(registration.email)}
            </span>
          </div>
          <div className="h-px" style={{ backgroundColor: '#F3F4F6' }} />
          <div className="flex justify-between items-center">
            <span className="font-body text-xs uppercase tracking-wider" style={{ color: '#9CA3AF' }}>
              Phone
            </span>
            <span className="font-mono text-sm" style={{ color: '#374151' }}>
              {maskPhone(registration.phone)}
            </span>
          </div>
          {isExhibitor && registration.companyName && (
            <>
              <div className="h-px" style={{ backgroundColor: '#F3F4F6' }} />
              <div className="flex justify-between items-center">
                <span className="font-body text-xs uppercase tracking-wider" style={{ color: '#9CA3AF' }}>
                  Company
                </span>
                <span className="font-body text-sm font-medium" style={{ color: '#111827' }}>
                  {registration.companyName}
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Warning */}
      <div className="px-6 pt-5">
        <div
          className="rounded-lg px-4 py-3 text-center"
          style={{
            backgroundColor: '#FFFBEB',
            border: '1px solid #FDE68A',
          }}
        >
          <p className="font-body text-xs leading-relaxed" style={{ color: '#92400E' }}>
            Please present this QR code at the gate. No printout required — your phone is your ticket.
          </p>
        </div>
      </div>

      {/* Calendar Links */}
      <div className="px-6 pt-5 flex gap-3">
        <a
          href={googleCalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg font-ui text-xs font-semibold transition-colors duration-200 no-underline"
          style={{
            backgroundColor: '#F3F4F6',
            color: '#374151',
            border: '1px solid #E5E7EB',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M19 4H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z" stroke="currentColor" strokeWidth="1.5" />
            <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Add to Google Calendar
        </a>
        <a
          href={appleCalUrl}
          download={`${event.title.replace(/[^a-zA-Z0-9]/g, '_')}.ics`}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg font-ui text-xs font-semibold transition-colors duration-200 no-underline"
          style={{
            backgroundColor: '#F3F4F6',
            color: '#374151',
            border: '1px solid #E5E7EB',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M19 4H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z" stroke="currentColor" strokeWidth="1.5" />
            <path d="M16 2v4M8 2v4M3 10h18M12 14v4M10 16h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Add to Apple Calendar
        </a>
      </div>

      {/* Sponsors Section */}
      {event.eventSponsors && event.eventSponsors.length > 0 && (
        <div className="px-6 pt-5">
          <p
            className="font-body text-xs uppercase tracking-wider text-center mb-3"
            style={{ color: '#9CA3AF' }}
          >
            Sponsored by
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {event.eventSponsors.map((es) => (
              <div key={es.id} className="flex items-center">
                {es.sponsor.websiteUrl ? (
                  <a
                    href={es.sponsor.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="no-underline"
                  >
                    <img
                      src={es.sponsor.logoUrl}
                      alt={es.sponsor.logoAlt}
                      className="h-8 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
                    />
                  </a>
                ) : (
                  <img
                    src={es.sponsor.logoUrl}
                    alt={es.sponsor.logoAlt}
                    className="h-8 w-auto object-contain opacity-70"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contact Info */}
      <div className="px-6 pt-5 text-center">
        <div className="h-px mb-4" style={{ backgroundColor: '#F3F4F6' }} />
        <p className="font-body text-xs" style={{ color: '#9CA3AF' }}>
          Questions? Reach us at
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3 mt-1">
          <a
            href="tel:+94771234567"
            className="font-body text-xs font-medium no-underline"
            style={{ color: '#374151' }}
          >
            +94 77 123 4567
          </a>
          <span className="hidden sm:inline text-xs" style={{ color: '#D1D5DB' }}>
            |
          </span>
          <a
            href="mailto:info@heavenlyevents.lk"
            className="font-body text-xs font-medium no-underline"
            style={{ color: '#374151' }}
          >
            info@heavenlyevents.lk
          </a>
        </div>
      </div>

      {/* Print Button */}
      <div className="px-6 pt-5 pb-6 print-hide">
        <button
          onClick={handlePrint}
          className="w-full py-2.5 rounded-lg font-ui text-sm font-semibold transition-colors duration-200 cursor-pointer"
          style={{
            backgroundColor: eventColor,
            color: '#FFFFFF',
            border: 'none',
          }}
        >
          🖨️ Print Ticket
        </button>
      </div>
    </div>
  );
}
