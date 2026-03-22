'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
} from 'lucide-react';
import MagneticButton from '@/components/shared/MagneticButton';

const eventTypes = [
  'Corporate Event',
  'Wedding',
  'Exhibition',
  'Education Fair',
  'Concert / Show',
  'Birthday / Private',
  'Product Launch',
  'Trade Expo',
  'Digital / Virtual Event',
  'Other',
];

const guestCountOptions = [
  'Under 50',
  '50 – 100',
  '100 – 300',
  '300 – 500',
  '500 – 1,000',
  '1,000+',
];

const budgetOptions = [
  'Under LKR 500K',
  'LKR 500K – 1M',
  'LKR 1M – 3M',
  'LKR 3M – 5M',
  'LKR 5M – 10M',
  'LKR 10M+',
  'Not sure yet',
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    expectedDate: '',
    guestCount: '',
    budget: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const reveals = el.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    reveals.forEach((r) => observer.observe(r));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (formData.message.length < 50) return;

    setIsSubmitting(true);

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const inputClasses =
    'w-full rounded-xl px-4 py-3 font-body text-base text-(--text-primary) placeholder:text-(--text-muted) transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-(--color-crimson) focus:border-transparent';

  const inputStyle = {
    backgroundColor: 'var(--bg-elevated)',
    border: '1px solid var(--border-primary)',
    fontSize: '16px',
  };

  const labelClasses = 'block font-ui text-sm font-semibold mb-2';
  const labelStyle = { color: 'var(--text-primary)' };

  return (
    <>
      <main ref={sectionRef}>
        {/* Hero */}
        <section
          className="relative flex min-h-[45vh] items-center justify-center overflow-hidden pt-24 pb-16"
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
              Get In Touch
            </span>
            <h1
              className="font-display mt-4 font-bold"
              style={{
                fontSize: 'var(--text-h1)',
                lineHeight: 'var(--leading-tight)',
                color: 'var(--text-primary)',
              }}
            >
              Let&apos;s Create Something Extraordinary Together
            </h1>
            <p
              className="font-body mx-auto mt-5 max-w-2xl"
              style={{
                fontSize: 'var(--text-body)',
                color: 'var(--text-secondary)',
                lineHeight: 'var(--leading-relaxed)',
              }}
            >
              Tell us your vision. We&apos;ll handle everything else.
            </p>
          </div>
        </section>

        {/* Form + Contact Info */}
        <section
          className="py-16 sm:py-24"
          style={{ backgroundColor: 'var(--bg-primary)' }}
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
              {/* Form - 60% */}
              <div className="w-full lg:w-[60%]">
                <div className="reveal">
                  {isSubmitted ? (
                    <div className="glass-card flex flex-col items-center rounded-2xl p-12 text-center">
                      <CheckCircle2
                        className="mb-6 h-16 w-16"
                        style={{ color: '#1a56db' }}
                      />
                      <h2
                        className="font-display font-bold"
                        style={{
                          fontSize: 'var(--text-h3)',
                          color: 'var(--text-primary)',
                        }}
                      >
                        Thank You!
                      </h2>
                      <p
                        className="font-body mt-4 max-w-md"
                        style={{
                          fontSize: 'var(--text-body)',
                          color: 'var(--text-secondary)',
                          lineHeight: 'var(--leading-relaxed)',
                        }}
                      >
                        Your inquiry has been received. Our team will get back to you within 24
                        hours. In the meantime, feel free to WhatsApp us for immediate assistance.
                      </p>
                      <div className="mt-8">
                        <MagneticButton
                          href="https://wa.me/94777776357"
                          variant="primary"
                          size="md"
                        >
                          WhatsApp Us
                        </MagneticButton>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <h2
                        className="font-display mb-8 font-bold"
                        style={{
                          fontSize: 'var(--text-h3)',
                          color: 'var(--text-primary)',
                        }}
                      >
                        Tell Us About Your Event
                      </h2>

                      {/* Name + Email */}
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                          <label htmlFor="name" className={labelClasses} style={labelStyle}>
                            Full Name *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            placeholder="Your full name"
                            value={formData.name}
                            onChange={handleChange}
                            className={inputClasses}
                            style={inputStyle}
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className={labelClasses} style={labelStyle}>
                            Email Address *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={handleChange}
                            className={inputClasses}
                            style={inputStyle}
                          />
                        </div>
                      </div>

                      {/* Phone + Event Type */}
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                          <label htmlFor="phone" className={labelClasses} style={labelStyle}>
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            required
                            placeholder="+94 7XX XXX XXX"
                            value={formData.phone}
                            onChange={handleChange}
                            className={inputClasses}
                            style={inputStyle}
                          />
                        </div>
                        <div>
                          <label htmlFor="eventType" className={labelClasses} style={labelStyle}>
                            Event Type *
                          </label>
                          <select
                            id="eventType"
                            name="eventType"
                            required
                            value={formData.eventType}
                            onChange={handleChange}
                            className={inputClasses}
                            style={inputStyle}
                          >
                            <option value="">Select event type</option>
                            {eventTypes.map((type) => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Date + Guest Count */}
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                          <label htmlFor="expectedDate" className={labelClasses} style={labelStyle}>
                            Expected Date
                          </label>
                          <input
                            type="date"
                            id="expectedDate"
                            name="expectedDate"
                            value={formData.expectedDate}
                            onChange={handleChange}
                            className={inputClasses}
                            style={inputStyle}
                          />
                        </div>
                        <div>
                          <label htmlFor="guestCount" className={labelClasses} style={labelStyle}>
                            Guest Count
                          </label>
                          <select
                            id="guestCount"
                            name="guestCount"
                            value={formData.guestCount}
                            onChange={handleChange}
                            className={inputClasses}
                            style={inputStyle}
                          >
                            <option value="">Select range</option>
                            {guestCountOptions.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Budget */}
                      <div>
                        <label htmlFor="budget" className={labelClasses} style={labelStyle}>
                          Budget Range
                        </label>
                        <select
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className={inputClasses}
                          style={inputStyle}
                        >
                          <option value="">Select budget range</option>
                          {budgetOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Message */}
                      <div>
                        <label htmlFor="message" className={labelClasses} style={labelStyle}>
                          Tell Us About Your Vision * <span className="font-normal text-(--text-muted)">(min 50 characters)</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          minLength={50}
                          rows={5}
                          placeholder="Describe your event vision, goals, and any specific requirements..."
                          value={formData.message}
                          onChange={handleChange}
                          className={`${inputClasses} resize-y`}
                          style={inputStyle}
                        />
                        <p
                          className="mt-1 font-body text-xs"
                          style={{
                            color:
                              formData.message.length >= 50
                                ? '#22c55e'
                                : 'var(--text-muted)',
                          }}
                        >
                          {formData.message.length >= 50
                            ? '\u2713 Minimum met'
                            : `${formData.message.length}/50 minimum`}
                        </p>
                      </div>

                      {/* Submit */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-8 py-4 font-ui text-base font-semibold text-white transition-all duration-300 hover:shadow-(--shadow-crimson) disabled:opacity-60 sm:w-auto"
                          style={{ backgroundColor: 'var(--color-crimson)' }}
                        >
                          {isSubmitting ? (
                            <>
                              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                              Sending...
                            </>
                          ) : (
                            <>
                              Send My Inquiry
                              <Send className="h-4 w-4" />
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>

              {/* Contact Info - 40% */}
              <div className="w-full lg:w-[40%]">
                <div className="reveal space-y-8">
                  <h2
                    className="font-display font-bold"
                    style={{
                      fontSize: 'var(--text-h3)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    Contact Information
                  </h2>

                  {/* Address */}
                  <div className="flex gap-4">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                      style={{
                        backgroundColor: 'rgba(26,86,219,0.12)',
                        border: '1px solid rgba(26,86,219,0.25)',
                      }}
                    >
                      <MapPin className="h-5 w-5" style={{ color: 'var(--color-crimson)' }} />
                    </div>
                    <div>
                      <h3
                        className="font-ui text-sm font-semibold"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        Head Office
                      </h3>
                      <p
                        className="font-body mt-1"
                        style={{
                          fontSize: 'var(--text-sm)',
                          color: 'var(--text-secondary)',
                          lineHeight: 'var(--leading-relaxed)',
                        }}
                      >
                        No. 123, Galle Road,
                        <br />
                        Colombo 03, Sri Lanka
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex gap-4">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                      style={{
                        backgroundColor: 'rgba(26,86,219,0.12)',
                        border: '1px solid rgba(26,86,219,0.25)',
                      }}
                    >
                      <Phone className="h-5 w-5" style={{ color: 'var(--color-crimson)' }} />
                    </div>
                    <div>
                      <h3
                        className="font-ui text-sm font-semibold"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        Phone
                      </h3>
                      <a
                        href="tel:+94777776357"
                        className="font-body mt-1 block transition-colors hover:opacity-80"
                        style={{
                          fontSize: 'var(--text-sm)',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        +94 777 776 357
                      </a>
                      <a
                        href="tel:+94112345678"
                        className="font-body block transition-colors hover:opacity-80"
                        style={{
                          fontSize: 'var(--text-sm)',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        +94 11 234 5678
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex gap-4">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                      style={{
                        backgroundColor: 'rgba(26,86,219,0.12)',
                        border: '1px solid rgba(26,86,219,0.25)',
                      }}
                    >
                      <Mail className="h-5 w-5" style={{ color: 'var(--color-crimson)' }} />
                    </div>
                    <div>
                      <h3
                        className="font-ui text-sm font-semibold"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        Email
                      </h3>
                      <a
                        href="mailto:info@heavenlyevents.lk"
                        className="font-body mt-1 block transition-colors hover:opacity-80"
                        style={{
                          fontSize: 'var(--text-sm)',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        info@heavenlyevents.lk
                      </a>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex gap-4">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                      style={{
                        backgroundColor: 'rgba(37,211,102,0.12)',
                        border: '1px solid rgba(37,211,102,0.25)',
                      }}
                    >
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="#25D366"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </div>
                    <div>
                      <h3
                        className="font-ui text-sm font-semibold"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        WhatsApp
                      </h3>
                      <a
                        href="https://wa.me/94777776357"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-body mt-1 block transition-colors hover:opacity-80"
                        style={{
                          fontSize: 'var(--text-sm)',
                          color: '#25D366',
                        }}
                      >
                        Chat with us on WhatsApp
                      </a>
                    </div>
                  </div>

                  {/* Office Hours */}
                  <div className="flex gap-4">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                      style={{
                        backgroundColor: 'rgba(26,86,219,0.12)',
                        border: '1px solid rgba(26,86,219,0.25)',
                      }}
                    >
                      <Clock className="h-5 w-5" style={{ color: 'var(--color-crimson)' }} />
                    </div>
                    <div>
                      <h3
                        className="font-ui text-sm font-semibold"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        Office Hours
                      </h3>
                      <p
                        className="font-body mt-1"
                        style={{
                          fontSize: 'var(--text-sm)',
                          color: 'var(--text-secondary)',
                          lineHeight: 'var(--leading-relaxed)',
                        }}
                      >
                        Monday - Friday: 9:00 AM - 6:00 PM
                        <br />
                        Saturday: 9:00 AM - 1:00 PM
                        <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>

                  {/* Google Maps */}
                  <div className="mt-8 overflow-hidden rounded-2xl border border-(--border-primary)">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.798467128585!2d79.8527!3d6.9271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTUnMzcuNiJOIDc5wrA1MScwOS43IkU!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk"
                      width="100%"
                      height="250"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Heavenly Events Office Location"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
