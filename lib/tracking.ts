declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackRegistration(eventData: {
  eventName: string;
  registrationType: string;
  value?: number;
  currency?: string;
}) {
  // Meta Pixel - Lead event
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Lead", {
      content_name: eventData.eventName,
      content_category: eventData.registrationType,
      value: eventData.value || 0,
      currency: eventData.currency || "LKR",
    });
  }

  // GA4 - generate_lead event
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "generate_lead", {
      event_name: eventData.eventName,
      registration_type: eventData.registrationType,
      value: eventData.value || 0,
      currency: eventData.currency || "LKR",
    });
  }
}

export function trackPageView() {
  // Meta Pixel - PageView
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "PageView");
  }

  // GA4 - page_view (usually auto-tracked, but can be fired manually)
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "page_view");
  }
}

export function trackContactSubmit() {
  // Meta Pixel - Contact event
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Contact");
  }

  // GA4 - contact event
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "contact", {
      event_category: "engagement",
      event_label: "contact_form",
    });
  }
}
