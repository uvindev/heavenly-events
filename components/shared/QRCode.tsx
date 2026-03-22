'use client';

interface QRCodeProps {
  /** Base64-encoded QR code data URL (e.g. "data:image/png;base64,...") */
  data: string | null;
  /** Display size in pixels. Default 280. */
  size?: number;
  /** Alt text for accessibility */
  alt?: string;
}

export default function QRCode({
  data,
  size = 280,
  alt = 'Ticket QR Code',
}: QRCodeProps) {
  if (!data) {
    return (
      <div
        className="flex items-center justify-center rounded-lg border-2 border-dashed"
        style={{
          width: size,
          height: size,
          borderColor: 'var(--color-gray-300)',
          backgroundColor: 'var(--color-gray-100)',
        }}
      >
        <div className="text-center px-6">
          <svg
            className="mx-auto mb-2"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-gray-400)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
          </svg>
          <p
            className="font-body text-sm"
            style={{ color: 'var(--color-gray-500)' }}
          >
            QR code unavailable
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="inline-flex flex-col items-center">
      <img
        src={data}
        alt={alt}
        width={size}
        height={size}
        className="rounded-md"
        style={{
          imageRendering: 'pixelated',
          backgroundColor: '#FFFFFF',
          padding: 8,
        }}
        draggable={false}
      />
    </div>
  );
}
