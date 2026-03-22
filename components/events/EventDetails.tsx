'use client';

import { Calendar, MapPin, Clock, ExternalLink, Share2 } from 'lucide-react';
import EventSchedule, { type ScheduleItem } from './EventSchedule';

interface EventDetailsProps {
  description: string;
  eventDate: string;
  eventEndDate?: string | null;
  doorsOpenTime?: string | null;
  venueName: string;
  venueAddress: string;
  venueCity: string;
  googleMapsUrl?: string | null;
  googleMapsEmbed?: string | null;
  schedule?: ScheduleItem[];
  sponsors?: { name: string; logoUrl: string; tier: string; websiteUrl?: string | null }[];
  primaryColor: string;
  title: string;
  slug: string;
}

function ShareButtons({ title, slug }: { title: string; slug: string; primaryColor: string }) {
  const url = typeof window !== 'undefined'
    ? `${window.location.origin}/events/${slug}`
    : `/events/${slug}`;

  const handleWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(`${title}\n${url}`)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      // Brief visual feedback handled via the button text
      const btn = document.getElementById('copy-link-btn');
      if (btn) {
        btn.textContent = 'Copied!';
        setTimeout(() => {
          btn.textContent = 'Copy Link';
        }, 2000);
      }
    } catch {
      // Fallback for older browsers
      const input = document.createElement('input');
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
    }
  };

  return (
    <div className="mt-10">
      <h3
        className="font-ui text-sm font-semibold uppercase tracking-wider mb-4"
        style={{ color: 'var(--text-muted)' }}
      >
        <Share2 className="w-4 h-4 inline-block mr-2 -mt-0.5" />
        Share this event
      </h3>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleWhatsApp}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-ui text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
          style={{
            backgroundColor: '#25D366',
            color: '#fff',
          }}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          WhatsApp
        </button>

        <button
          onClick={handleFacebook}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-ui text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
          style={{
            backgroundColor: '#1877F2',
            color: '#fff',
          }}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          Facebook
        </button>

        <button
          id="copy-link-btn"
          onClick={handleCopyLink}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-ui text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 border"
          style={{
            backgroundColor: 'var(--glass-bg)',
            borderColor: 'var(--border-primary)',
            color: 'var(--text-primary)',
          }}
        >
          <ExternalLink className="w-4 h-4" />
          Copy Link
        </button>
      </div>
    </div>
  );
}

export default function EventDetails({
  description,
  eventDate,
  eventEndDate,
  doorsOpenTime,
  venueName,
  venueAddress,
  venueCity,
  googleMapsUrl,
  googleMapsEmbed,
  schedule,
  sponsors,
  primaryColor,
  title,
  slug,
}: EventDetailsProps) {
  const formattedDate = new Date(eventDate).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const formattedTime = new Date(eventDate).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const formattedEndTime = eventEndDate
    ? new Date(eventEndDate).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })
    : null;

  const doorsTime = doorsOpenTime
    ? new Date(doorsOpenTime).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })
    : null;

  return (
    <div className="space-y-10">
      {/* Date & Time */}
      <div className="glass-card p-5 sm:p-6 space-y-4">
        <div className="flex items-start gap-4">
          <div
            className="shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${primaryColor}18` }}
          >
            <Calendar className="w-5 h-5" style={{ color: primaryColor }} />
          </div>
          <div>
            <h3 className="font-ui text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
              {formattedDate}
            </h3>
            <p className="font-body text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
              {formattedTime}
              {formattedEndTime && ` — ${formattedEndTime}`}
            </p>
            {doorsTime && (
              <p className="font-body text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                <Clock className="w-3 h-3 inline-block mr-1 -mt-0.5" />
                Doors open at {doorsTime}
              </p>
            )}
          </div>
        </div>

        <div className="border-t border-(--border-primary)" />

        <div className="flex items-start gap-4">
          <div
            className="shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${primaryColor}18` }}
          >
            <MapPin className="w-5 h-5" style={{ color: primaryColor }} />
          </div>
          <div>
            <h3 className="font-ui text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
              {venueName}
            </h3>
            <p className="font-body text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
              {venueAddress}, {venueCity}
            </p>
            {googleMapsUrl && (
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-ui text-sm font-medium mt-2 transition-colors hover:opacity-80"
                style={{ color: primaryColor }}
              >
                Open in Google Maps
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <h3
          className="font-ui text-lg font-bold mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          About this event
        </h3>
        <div
          className="font-body text-base leading-relaxed prose-invert max-w-none space-y-4"
          style={{ color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)' }}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>

      {/* Schedule */}
      {schedule && schedule.length > 0 && (
        <EventSchedule items={schedule} eventColor={primaryColor} />
      )}

      {/* Google Maps Embed */}
      {googleMapsEmbed && (
        <div>
          <h3
            className="font-ui text-lg font-bold mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Location
          </h3>
          <div className="rounded-xl overflow-hidden border border-(--border-primary)">
            <iframe
              src={googleMapsEmbed}
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map showing ${venueName} location`}
            />
          </div>
        </div>
      )}

      {/* Sponsors */}
      {sponsors && sponsors.length > 0 && (
        <div>
          <h3
            className="font-ui text-sm font-semibold uppercase tracking-wider mb-5"
            style={{ color: 'var(--text-muted)' }}
          >
            Event Sponsors
          </h3>
          <div className="flex flex-wrap gap-6 items-center">
            {sponsors.map((sponsor) => (
              <div key={sponsor.name} className="group">
                {sponsor.websiteUrl ? (
                  <a
                    href={sponsor.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block glass-card p-4 transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <div
                      className="w-24 h-12 flex items-center justify-center font-ui text-xs font-medium"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {/* Replace with actual image when available */}
                      {sponsor.name}
                    </div>
                    <span
                      className="block text-center font-body text-[10px] mt-1 uppercase tracking-wider"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {sponsor.tier}
                    </span>
                  </a>
                ) : (
                  <div className="glass-card p-4">
                    <div
                      className="w-24 h-12 flex items-center justify-center font-ui text-xs font-medium"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {sponsor.name}
                    </div>
                    <span
                      className="block text-center font-body text-[10px] mt-1 uppercase tracking-wider"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {sponsor.tier}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Share Buttons */}
      <ShareButtons title={title} slug={slug} primaryColor={primaryColor} />
    </div>
  );
}
