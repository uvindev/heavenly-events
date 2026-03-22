'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';

interface CountdownTimerProps {
  targetDate: string | Date;
  className?: string;
  variant?: 'light' | 'dark';
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(target: Date): TimeLeft | null {
  const now = new Date().getTime();
  const diff = target.getTime() - now;

  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function CountdownTimer({ targetDate, className = '', variant = 'light' }: CountdownTimerProps) {
  const target = useMemo(() => typeof targetDate === 'string' ? new Date(targetDate) : targetDate, [targetDate]);

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(() => calculateTimeLeft(target));
  const [tickingSecond, setTickingSecond] = useState(false);

  const update = useCallback(() => {
    setTimeLeft(calculateTimeLeft(target));
    setTickingSecond((prev) => !prev);
  }, [target]);

  useEffect(() => {
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [update]);

  const isDark = variant === 'dark';

  if (!timeLeft) {
    return (
      <div className={`text-center ${className}`}>
        <p className="font-ui text-lg font-semibold" style={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'var(--text-secondary)' }}>
          Event has ended
        </p>
      </div>
    );
  }

  const segments: { value: number; label: string }[] = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Minutes' },
    { value: timeLeft.seconds, label: 'Seconds' },
  ];

  return (
    <div className={`flex items-center justify-center gap-3 sm:gap-5 ${className}`}>
      {segments.map((seg, i) => (
        <div key={seg.label} className="flex items-center gap-3 sm:gap-5">
          <div className="flex flex-col items-center">
            <span
              className={`
                font-mono text-3xl sm:text-5xl lg:text-6xl font-medium tabular-nums
                transition-transform duration-150
                ${seg.label === 'Seconds' && tickingSecond ? 'scale-105' : 'scale-100'}
              `}
              style={{
                color: isDark ? '#ffffff' : 'var(--text-primary)',
                textShadow: isDark ? '0 2px 15px rgba(0,0,0,0.4)' : 'none',
              }}
            >
              {String(seg.value).padStart(2, '0')}
            </span>
            <span
              className="font-ui text-[10px] sm:text-xs uppercase tracking-widest mt-1"
              style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'var(--text-muted)' }}
            >
              {seg.label}
            </span>
          </div>

          {i < segments.length - 1 && (
            <span
              className={`
                font-mono text-2xl sm:text-4xl lg:text-5xl font-light self-start mt-0.5
                transition-opacity duration-300
                ${tickingSecond ? 'opacity-100' : 'opacity-30'}
              `}
              style={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'var(--text-muted)' }}
            >
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
