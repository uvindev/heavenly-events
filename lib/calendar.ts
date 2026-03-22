/**
 * Formats a Date to Google Calendar's required format: YYYYMMDDTHHmmssZ
 */
function toGoogleCalendarDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

/**
 * Formats a Date for .ics files: YYYYMMDDTHHmmssZ
 */
function toICSDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

/**
 * Escapes special characters for .ics text fields.
 */
function escapeICS(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

/**
 * Generates a Google Calendar event creation URL.
 * Opens in a new tab so the user can add the event to their calendar.
 */
export function generateGoogleCalendarUrl(event: {
  title: string;
  eventDate: Date;
  eventEndDate?: Date | null;
  venueName: string;
  venueAddress: string;
  venueCity: string;
  description?: string | null;
  shortDesc?: string | null;
}): string {
  const startDate = new Date(event.eventDate);
  // Default to 4 hours duration if no end date
  const endDate = event.eventEndDate
    ? new Date(event.eventEndDate)
    : new Date(startDate.getTime() + 4 * 60 * 60 * 1000);

  const location = `${event.venueName}, ${event.venueAddress}, ${event.venueCity}`;
  const details = event.shortDesc || event.description || '';

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${toGoogleCalendarDate(startDate)}/${toGoogleCalendarDate(endDate)}`,
    location,
    details: details.slice(0, 1000), // Google has a character limit
    sf: 'true',
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Generates an Apple Calendar (.ics) file as a data URI.
 * When opened, it prompts the user to add the event to their calendar.
 * Works on iOS, macOS, and most desktop calendar apps.
 */
export function generateAppleCalendarUrl(event: {
  title: string;
  eventDate: Date;
  eventEndDate?: Date | null;
  venueName: string;
  venueAddress: string;
  venueCity: string;
  description?: string | null;
  shortDesc?: string | null;
}): string {
  const startDate = new Date(event.eventDate);
  const endDate = event.eventEndDate
    ? new Date(event.eventEndDate)
    : new Date(startDate.getTime() + 4 * 60 * 60 * 1000);

  const location = `${event.venueName}, ${event.venueAddress}, ${event.venueCity}`;
  const description = event.shortDesc || event.description || '';

  const now = new Date();
  const uid = `${now.getTime()}@heavenlyevents.lk`;

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Heavenly Events//Event Ticket//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${toICSDate(now)}`,
    `DTSTART:${toICSDate(startDate)}`,
    `DTEND:${toICSDate(endDate)}`,
    `SUMMARY:${escapeICS(event.title)}`,
    `LOCATION:${escapeICS(location)}`,
    `DESCRIPTION:${escapeICS(description.slice(0, 1000))}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-PT1H',
    'ACTION:DISPLAY',
    `DESCRIPTION:Reminder: ${escapeICS(event.title)} starts in 1 hour`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  return `data:text/calendar;charset=utf-8,${encodeURIComponent(icsContent)}`;
}
