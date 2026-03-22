'use client';

import { useEffect, useRef, useCallback, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface RegistrationBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

export default function RegistrationBottomSheet({
  isOpen,
  onClose,
  children,
  title = 'Register',
}: RegistrationBottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const startY = useRef<number>(0);
  const currentY = useRef<number>(0);
  const isDragging = useRef(false);

  // Lock body scroll when open
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Drag to dismiss
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (!touch) return;
    startY.current = touch.clientY;
    isDragging.current = true;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current || !sheetRef.current) return;
    const touch = e.touches[0];
    if (!touch) return;
    const deltaY = touch.clientY - startY.current;
    if (deltaY > 0) {
      currentY.current = deltaY;
      sheetRef.current.style.transform = `translateY(${deltaY}px)`;
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging.current || !sheetRef.current) return;
    isDragging.current = false;

    if (currentY.current > 120) {
      onClose();
    } else {
      sheetRef.current.style.transform = 'translateY(0)';
    }
    currentY.current = 0;
  }, [onClose]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  if (!isOpen) return null;

  const sheet = (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center animate-fade-in"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />

      {/* Sheet */}
      <div
        ref={sheetRef}
        className="relative w-full max-w-lg rounded-t-3xl bg-(--bg-elevated) border border-(--border-primary) border-b-0 shadow-(--shadow-lg) transition-transform duration-300 ease-out max-h-[90vh] overflow-y-auto"
        style={{
          animation: 'bottomSheetSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Drag Handle */}
        <div className="sticky top-0 z-10 pt-3 pb-2 flex justify-center bg-(--bg-elevated) rounded-t-3xl">
          <div className="w-10 h-1 rounded-full bg-(--text-muted) opacity-50" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 pb-4">
          <h2 className="font-ui text-lg font-bold text-(--text-primary)">{title}</h2>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-(--text-secondary) transition-colors hover:bg-black/5 hover:text-(--text-primary)"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 pb-8">{children}</div>
      </div>

{/* bottomSheetSlideUp animation defined in globals.css */}
    </div>
  );

  if (typeof window !== 'undefined') {
    return createPortal(sheet, document.body);
  }

  return null;
}
