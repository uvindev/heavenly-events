'use client';

import { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { GalleryItem } from './GalleryGrid';

interface GalleryLightboxProps {
  items: GalleryItem[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function GalleryLightbox({
  items,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: GalleryLightboxProps) {
  const item = items[currentIndex];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowRight':
          onNext();
          break;
        case 'ArrowLeft':
          onPrev();
          break;
      }
    },
    [onClose, onNext, onPrev]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  // Swipe detection for mobile
  useEffect(() => {
    let startX = 0;
    let startY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      startX = touch.clientX;
      startY = touch.clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touch = e.changedTouches[0];
      if (!touch) return;
      const diffX = touch.clientX - startX;
      const diffY = touch.clientY - startY;

      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (diffX > 0) onPrev();
        else onNext();
      }
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onNext, onPrev]);

  if (!item) return null;

  const imgSrc = item.image ? item.image.replace('w=600', 'w=1200').replace('q=80', 'q=90') : '';

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label={`Viewing: ${item.title}`}
    >
      {/* Dark backdrop */}
      <div
        className="absolute inset-0 bg-black/95"
        onClick={onClose}
      />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-4 py-3 sm:px-6">
        <div className="text-white/50 font-mono text-sm">
          {currentIndex + 1} / {items.length}
        </div>
        <button
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Close"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Image area - fills remaining space */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-2 sm:px-16 pb-4 min-h-0">
        {/* Prev button */}
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-2 sm:left-4 top-1/2 z-20 flex h-10 w-10 sm:h-12 sm:w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white/80 transition-all hover:bg-black/70 hover:text-white"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        {/* Next button */}
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-2 sm:right-4 top-1/2 z-20 flex h-10 w-10 sm:h-12 sm:w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white/80 transition-all hover:bg-black/70 hover:text-white"
          aria-label="Next image"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        {/* Image */}
        {imgSrc ? (
          <img
            key={item.id}
            src={imgSrc}
            alt={item.title}
            className="max-h-full max-w-full object-contain rounded-lg"
            style={{ maxHeight: 'calc(100vh - 160px)' }}
          />
        ) : (
          <div
            className="w-full max-w-xl rounded-lg"
            style={{ aspectRatio: item.aspectRatio, background: item.gradient }}
          />
        )}
      </div>

      {/* Caption bar */}
      <div className="relative z-10 px-4 pb-5 sm:pb-6 text-center">
        <span
          className="font-ui text-[10px] sm:text-xs font-semibold uppercase tracking-wider"
          style={{ color: '#3b82f6' }}
        >
          {item.category}
        </span>
        <h3 className="mt-1 font-display text-lg sm:text-xl font-bold text-white">
          {item.title}
        </h3>
        <p className="mt-0.5 font-body text-xs sm:text-sm text-white/40">
          {item.event}
        </p>
      </div>
    </div>
  );
}
