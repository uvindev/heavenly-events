'use client';

import { useState, useEffect } from 'react';
import RegistrationForm from '@/components/events/RegistrationForm';
import RegistrationBottomSheet from '@/components/events/RegistrationBottomSheet';
import type { FormField } from '@/types/registration';

interface EventDetailClientProps {
  eventId: number;
  eventTitle: string;
  eventColor: string;
  registrationCount: number;
  visitorFormSchema?: FormField[] | null;
  exhibitorFormSchema?: FormField[] | null;
}

export default function EventDetailClient({
  eventId,
  eventTitle,
  eventColor,
  registrationCount,
  visitorFormSchema,
  exhibitorFormSchema,
}: EventDetailClientProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <>
      {/* Desktop: Sticky right column */}
      <aside className="hidden lg:block w-full lg:w-[35%]">
        <div className="sticky top-24">
          <div className="glass-card p-6 sm:p-7">
            {/* Header */}
            <div className="mb-6">
              <h2 className="font-ui text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                Register for this Event
              </h2>
              <p className="font-body text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                It&apos;s completely free
              </p>
            </div>

            <RegistrationForm
              eventId={eventId}
              eventTitle={eventTitle}
              eventColor={eventColor}
              registrationCount={registrationCount}
              visitorFormSchema={visitorFormSchema}
              exhibitorFormSchema={exhibitorFormSchema}
            />
          </div>
        </div>
      </aside>

      {/* Mobile: inline registration (shown in flow after details, above the sticky bar) */}
      <div className="lg:hidden w-full">
        <div className="glass-card p-6">
          <div className="mb-6">
            <h2 className="font-ui text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
              Register for this Event
            </h2>
            <p className="font-body text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
              It&apos;s completely free
            </p>
          </div>
          <RegistrationForm
            eventId={eventId}
            eventTitle={eventTitle}
            eventColor={eventColor}
            registrationCount={registrationCount}
            visitorFormSchema={visitorFormSchema}
            exhibitorFormSchema={exhibitorFormSchema}
          />
        </div>
      </div>

      {/* Mobile: Sticky Bottom CTA Bar */}
      {isMobile && (
        <div
          className="fixed bottom-0 left-0 right-0 z-40 p-4 border-t lg:hidden"
          style={{
            backgroundColor: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(16px) saturate(180%)',
            WebkitBackdropFilter: 'blur(16px) saturate(180%)',
            borderColor: 'var(--border-primary)',
          }}
        >
          <button
            onClick={() => setSheetOpen(true)}
            className="w-full py-3.5 rounded-lg font-ui text-base font-bold text-white transition-all duration-200 hover:brightness-110 flex items-center justify-center gap-2"
            style={{ backgroundColor: eventColor }}
          >
            Register Free &rarr;
          </button>
        </div>
      )}

      {/* Mobile: Bottom Sheet */}
      <RegistrationBottomSheet
        isOpen={sheetOpen}
        onClose={() => setSheetOpen(false)}
        title="Register for Event"
      >
        <RegistrationForm
          eventId={eventId}
          eventTitle={eventTitle}
          eventColor={eventColor}
          registrationCount={registrationCount}
          visitorFormSchema={visitorFormSchema}
          exhibitorFormSchema={exhibitorFormSchema}
        />
      </RegistrationBottomSheet>
    </>
  );
}
