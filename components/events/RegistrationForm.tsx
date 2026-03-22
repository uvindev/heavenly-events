'use client';

import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Users, Check, Sparkles } from 'lucide-react';
import Input from '@/components/ui/Input';
import DynamicFormFields from './DynamicFormFields';
import { trackRegistration } from '@/lib/tracking';
import type { FormField } from '@/types/registration';

type TabType = 'VISITOR' | 'EXHIBITOR';

interface RegistrationFormProps {
  eventId: number;
  eventTitle: string;
  eventColor: string;
  registrationCount: number;
  visitorFormSchema?: FormField[] | null;
  exhibitorFormSchema?: FormField[] | null;
}

// Zod schemas
const visitorSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email address'),
  phone: z.string().min(9, 'Enter a valid phone number').max(20),
  additionalNotes: z.string().optional(),
  formResponses: z.record(z.string(), z.unknown()).optional(),
});

const exhibitorSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email address'),
  phone: z.string().min(9, 'Enter a valid phone number').max(20),
  companyName: z.string().min(2, 'Company name is required'),
  companyPhone: z.string().optional(),
  companyWebsite: z.string().optional(),
  businessCategory: z.string().optional(),
  boothSize: z.string().optional(),
  exhibitorMessage: z.string().optional(),
  formResponses: z.record(z.string(), z.unknown()).optional(),
});

type VisitorFormData = z.infer<typeof visitorSchema>;
type ExhibitorFormData = z.infer<typeof exhibitorSchema>;

function SuccessState({ eventColor }: { eventColor: string }) {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="text-center py-8 relative overflow-hidden">
      {/* Confetti-style animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10px',
                backgroundColor: [eventColor, '#FFD700', '#FF6B00', '#1A1AFF', '#D4006A', '#C8E000'][i % 6],
                animation: `confettiFall ${1.5 + Math.random() * 2}s ease-in forwards`,
                animationDelay: `${Math.random() * 0.5}s`,
              }}
            />
          ))}
        </div>
      )}

      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
        style={{
          backgroundColor: `${eventColor}20`,
          border: `2px solid ${eventColor}`,
        }}
      >
        <Sparkles className="w-7 h-7" style={{ color: eventColor }} />
      </div>

      <h3 className="font-display text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
        You&apos;re on the list!
      </h3>

      <p className="font-body text-sm mt-3 max-w-xs mx-auto" style={{ color: 'var(--text-secondary)' }}>
        Check your email for your QR ticket. Show it at the door for instant entry.
      </p>

      <div
        className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full font-ui text-sm"
        style={{
          backgroundColor: `${eventColor}15`,
          color: eventColor,
        }}
      >
        <Check className="w-4 h-4" />
        Confirmation sent
      </div>

{/* confettiFall animation defined in globals.css */}
    </div>
  );
}

export default function RegistrationForm({
  eventId,
  eventTitle,
  eventColor,
  registrationCount,
  visitorFormSchema,
  exhibitorFormSchema,
}: RegistrationFormProps) {
  const [activeTab, setActiveTab] = useState<TabType>('VISITOR');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Visitor form
  const visitorForm = useForm<VisitorFormData>({
    resolver: zodResolver(visitorSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '+94 ',
      additionalNotes: '',
      formResponses: {},
    },
  });

  // Exhibitor form
  const exhibitorForm = useForm<ExhibitorFormData>({
    resolver: zodResolver(exhibitorSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '+94 ',
      companyName: '',
      companyPhone: '',
      companyWebsite: '',
      businessCategory: '',
      boothSize: '',
      exhibitorMessage: '',
      formResponses: {},
    },
  });

  // UTM capture
  const getUtmParams = useCallback(() => {
    if (typeof window === 'undefined') return {};
    try {
      const utmData = sessionStorage.getItem('utm_params');
      return utmData ? JSON.parse(utmData) : {};
    } catch {
      return {};
    }
  }, []);

  // Capture UTM on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'fbclid', 'gclid'];
    const utmData: Record<string, string> = {};

    utmKeys.forEach((key) => {
      const value = params.get(key);
      if (value) utmData[key] = value;
    });

    if (Object.keys(utmData).length > 0) {
      sessionStorage.setItem('utm_params', JSON.stringify(utmData));
    }
  }, []);

  const handleVisitorSubmit = async (data: VisitorFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    const utm = getUtmParams();

    try {
      const response = await fetch('/api/register/visitor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          eventId,
          utmSource: utm.utm_source,
          utmMedium: utm.utm_medium,
          utmCampaign: utm.utm_campaign,
          fbclid: utm.fbclid,
          gclid: utm.gclid,
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => null);
        throw new Error(err?.message || 'Registration failed. Please try again.');
      }

      trackRegistration({
        eventName: eventTitle,
        registrationType: 'VISITOR',
      });

      setIsSuccess(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleExhibitorSubmit = async (data: ExhibitorFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    const utm = getUtmParams();

    try {
      const response = await fetch('/api/register/exhibitor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          eventId,
          utmSource: utm.utm_source,
          utmMedium: utm.utm_medium,
          utmCampaign: utm.utm_campaign,
          fbclid: utm.fbclid,
          gclid: utm.gclid,
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => null);
        throw new Error(err?.message || 'Submission failed. Please try again.');
      }

      trackRegistration({
        eventName: eventTitle,
        registrationType: 'EXHIBITOR',
      });

      setIsSuccess(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return <SuccessState eventColor={eventColor} />;
  }

  return (
    <div>
      {/* Tab Switcher */}
      <div className="flex rounded-lg p-1 mb-6" style={{ backgroundColor: 'var(--glass-bg)' }}>
        {(['VISITOR', 'EXHIBITOR'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setSubmitError(null);
            }}
            className={`
              flex-1 py-2.5 px-4 rounded-md font-ui text-sm font-semibold
              transition-all duration-200
              ${activeTab === tab
                ? 'shadow-sm'
                : 'text-(--text-muted) hover:text-(--text-secondary)'
              }
            `}
            style={
              activeTab === tab
                ? { backgroundColor: eventColor, color: '#fff' }
                : undefined
            }
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Visitor Form */}
      {activeTab === 'VISITOR' && (
        <form onSubmit={visitorForm.handleSubmit(handleVisitorSubmit)} className="space-y-4" noValidate>
          <Input
            label="Full Name"
            placeholder="Your full name"
            error={visitorForm.formState.errors.fullName?.message}
            {...visitorForm.register('fullName')}
          />

          <Input
            label="Phone Number"
            variant="tel"
            placeholder="07X XXX XXXX"
            error={visitorForm.formState.errors.phone?.message}
            helperText="Sri Lankan mobile number"
            {...visitorForm.register('phone')}
          />

          <Input
            label="Email Address"
            variant="email"
            placeholder="you@example.com"
            error={visitorForm.formState.errors.email?.message}
            helperText="Your QR ticket will be sent here"
            {...visitorForm.register('email')}
          />

          {/* Dynamic extra fields */}
          {visitorFormSchema && visitorFormSchema.length > 0 && (
            <DynamicFormFields
              schema={visitorFormSchema}
              register={visitorForm.register}
              errors={visitorForm.formState.errors}
            />
          )}

          {/* Benefits */}
          <div className="py-4 space-y-2.5">
            {[
              'FREE ENTRY',
              'QR Ticket via Email',
              'Instant Confirmation',
            ].map((benefit) => (
              <div key={benefit} className="flex items-center gap-2.5">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${eventColor}20` }}
                >
                  <Check className="w-3 h-3" style={{ color: eventColor }} />
                </div>
                <span className="font-ui text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                  {benefit}
                </span>
              </div>
            ))}
          </div>

          {/* Error */}
          {submitError && (
            <div
              className="rounded-md px-4 py-3 font-body text-sm"
              style={{ backgroundColor: 'rgba(239,68,68,0.1)', color: '#ef4444' }}
            >
              {submitError}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-lg font-ui text-base font-bold text-white transition-all duration-200 hover:shadow-lg hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            style={{ backgroundColor: eventColor }}
          >
            {isSubmitting ? (
              <>
                <svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Processing...
              </>
            ) : (
              <>Register Free Now &rarr;</>
            )}
          </button>

          {/* Live count */}
          <div className="flex items-center justify-center gap-2 pt-2">
            <Users className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
            <span className="font-body text-sm" style={{ color: 'var(--text-muted)' }}>
              <strong style={{ color: 'var(--text-secondary)' }}>
                {registrationCount.toLocaleString()}
              </strong>{' '}
              people already registered
            </span>
          </div>
        </form>
      )}

      {/* Exhibitor Form */}
      {activeTab === 'EXHIBITOR' && (
        <form onSubmit={exhibitorForm.handleSubmit(handleExhibitorSubmit)} className="space-y-4" noValidate>
          <Input
            label="Contact Person"
            placeholder="Your full name"
            error={exhibitorForm.formState.errors.fullName?.message}
            {...exhibitorForm.register('fullName')}
          />

          <Input
            label="Email Address"
            variant="email"
            placeholder="you@company.com"
            error={exhibitorForm.formState.errors.email?.message}
            {...exhibitorForm.register('email')}
          />

          <Input
            label="Phone Number"
            variant="tel"
            placeholder="+94 XX XXX XXXX"
            error={exhibitorForm.formState.errors.phone?.message}
            {...exhibitorForm.register('phone')}
          />

          <div className="border-t border-(--border-primary) pt-4 mt-4">
            <p className="font-ui text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--text-muted)' }}>
              Company Details
            </p>
          </div>

          <Input
            label="Company Name"
            placeholder="Your company or brand"
            error={exhibitorForm.formState.errors.companyName?.message}
            {...exhibitorForm.register('companyName')}
          />

          <Input
            label="Company Phone"
            variant="tel"
            placeholder="+94 XX XXX XXXX"
            error={exhibitorForm.formState.errors.companyPhone?.message}
            {...exhibitorForm.register('companyPhone')}
          />

          <Input
            label="Company Website"
            placeholder="https://yourcompany.lk"
            error={exhibitorForm.formState.errors.companyWebsite?.message}
            {...exhibitorForm.register('companyWebsite')}
          />

          <Input
            label="Business Category"
            variant="select"
            error={exhibitorForm.formState.errors.businessCategory?.message}
            {...exhibitorForm.register('businessCategory')}
          >
            <option value="">Select category</option>
            <option value="Photography">Photography</option>
            <option value="Catering">Catering</option>
            <option value="Decoration">Decoration</option>
            <option value="Fashion & Apparel">Fashion & Apparel</option>
            <option value="Technology">Technology</option>
            <option value="Health & Wellness">Health & Wellness</option>
            <option value="Real Estate">Real Estate</option>
            <option value="Education">Education</option>
            <option value="Food & Beverage">Food & Beverage</option>
            <option value="Other">Other</option>
          </Input>

          <Input
            label="Preferred Booth Size"
            variant="select"
            error={exhibitorForm.formState.errors.boothSize?.message}
            {...exhibitorForm.register('boothSize')}
          >
            <option value="">Select size</option>
            <option value="Standard (3x3m)">Standard (3x3m)</option>
            <option value="Premium (3x6m)">Premium (3x6m)</option>
            <option value="Large (6x6m)">Large (6x6m)</option>
            <option value="Custom">Custom</option>
          </Input>

          <Input
            label="Message / Special Requirements"
            variant="textarea"
            placeholder="Tell us about your brand and what you'd like to showcase..."
            error={exhibitorForm.formState.errors.exhibitorMessage?.message}
            {...exhibitorForm.register('exhibitorMessage')}
          />

          {/* Dynamic extra fields */}
          {exhibitorFormSchema && exhibitorFormSchema.length > 0 && (
            <DynamicFormFields
              schema={exhibitorFormSchema}
              register={exhibitorForm.register}
              errors={exhibitorForm.formState.errors}
            />
          )}

          {/* Error */}
          {submitError && (
            <div
              className="rounded-md px-4 py-3 font-body text-sm"
              style={{ backgroundColor: 'rgba(239,68,68,0.1)', color: '#ef4444' }}
            >
              {submitError}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-lg font-ui text-base font-bold text-white transition-all duration-200 hover:shadow-lg hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            style={{ backgroundColor: eventColor }}
          >
            {isSubmitting ? (
              <>
                <svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Submitting...
              </>
            ) : (
              <>Submit Exhibitor Interest &rarr;</>
            )}
          </button>

          <p className="font-body text-xs text-center pt-1" style={{ color: 'var(--text-muted)' }}>
            Our team will review your application and get back to you within 48 hours.
          </p>
        </form>
      )}
    </div>
  );
}
