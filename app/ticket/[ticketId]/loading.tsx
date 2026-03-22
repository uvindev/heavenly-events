export default function TicketLoading() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-8"
      style={{ backgroundColor: '#F3F4F6' }}
    >
      <div
        className="w-full max-w-md mx-auto overflow-hidden rounded-2xl"
        style={{
          backgroundColor: '#FFFFFF',
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        }}
      >
        {/* Logo skeleton */}
        <div className="px-6 pt-6 pb-4 flex flex-col items-center gap-2">
          <div className="h-7 w-48 rounded-md animate-pulse bg-gray-200" />
          <div className="h-3 w-56 rounded-sm animate-pulse bg-gray-100" />
        </div>

        {/* Rainbow bar skeleton */}
        <div className="h-0.5 w-full animate-pulse" style={{ background: 'linear-gradient(to right, #e5e7eb, #d1d5db, #e5e7eb)' }} />

        {/* Registered heading skeleton */}
        <div className="px-6 pt-5 flex flex-col items-center gap-2">
          <div className="h-8 w-8 rounded-full animate-pulse bg-gray-200" />
          <div className="h-5 w-44 rounded-md animate-pulse bg-gray-200" />
        </div>

        {/* Event name skeleton */}
        <div className="px-6 pt-4 flex flex-col items-center gap-2">
          <div className="h-9 w-64 rounded-md animate-pulse bg-gray-200" />
          <div className="h-9 w-40 rounded-md animate-pulse bg-gray-100" />
        </div>

        {/* Date & venue skeleton */}
        <div className="px-6 pt-5 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded animate-pulse bg-gray-200 shrink-0" />
            <div className="flex-1 space-y-1.5">
              <div className="h-4 w-48 rounded-sm animate-pulse bg-gray-200" />
              <div className="h-3 w-32 rounded-sm animate-pulse bg-gray-100" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded animate-pulse bg-gray-200 shrink-0" />
            <div className="flex-1 space-y-1.5">
              <div className="h-4 w-44 rounded-sm animate-pulse bg-gray-200" />
              <div className="h-3 w-52 rounded-sm animate-pulse bg-gray-100" />
            </div>
          </div>
        </div>

        {/* Badge skeleton */}
        <div className="px-6 pt-5 flex justify-center">
          <div className="h-7 w-32 rounded-full animate-pulse bg-gray-200" />
        </div>

        {/* QR code skeleton */}
        <div className="px-6 pt-6 flex justify-center">
          <div
            className="rounded-md animate-pulse bg-gray-200"
            style={{ width: 280, height: 280 }}
          />
        </div>

        {/* Ticket ID skeleton */}
        <div className="px-6 pt-3 flex justify-center">
          <div className="h-4 w-48 rounded-sm animate-pulse bg-gray-100" />
        </div>

        {/* Attendee info skeleton */}
        <div className="px-6 pt-5">
          <div
            className="rounded-lg p-4 space-y-3"
            style={{ backgroundColor: '#F9FAFB' }}
          >
            {[1, 2, 3].map((i) => (
              <div key={i}>
                <div className="flex justify-between items-center">
                  <div className="h-3 w-12 rounded-sm animate-pulse bg-gray-200" />
                  <div className="h-4 w-32 rounded-sm animate-pulse bg-gray-200" />
                </div>
                {i < 3 && <div className="h-px mt-3 bg-gray-100" />}
              </div>
            ))}
          </div>
        </div>

        {/* Warning skeleton */}
        <div className="px-6 pt-5">
          <div className="h-14 w-full rounded-lg animate-pulse bg-amber-50" />
        </div>

        {/* Calendar buttons skeleton */}
        <div className="px-6 pt-5 flex gap-3">
          <div className="flex-1 h-10 rounded-lg animate-pulse bg-gray-100" />
          <div className="flex-1 h-10 rounded-lg animate-pulse bg-gray-100" />
        </div>

        {/* Print button skeleton */}
        <div className="px-6 pt-5 pb-6">
          <div className="h-10 w-full rounded-lg animate-pulse bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
