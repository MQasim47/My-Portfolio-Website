'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface LightboxProps {
  open: boolean;
  images: string[];
  startIndex: number;
  title: string;
  onClose: () => void;
}

// State machine ported unchanged: Escape closes, arrows step, body scroll is locked.
function LightboxView({
  images,
  startIndex,
  title,
  onClose,
}: Omit<LightboxProps, 'open'>) {
  const [idx, setIdx] = useState(startIndex);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setIdx((i) => (i + 1) % images.length);
      if (e.key === 'ArrowLeft') setIdx((i) => (i - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [images.length, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="scrim on-dark fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded border border-paper-inv bg-ink text-paper-inv hover:border-signal hover:text-signal"
        aria-label="Close screenshot viewer"
      >
        <X size={20} />
      </button>

      <p className="absolute left-1/2 top-4 -translate-x-1/2 rounded bg-ink px-3 py-2 font-mono text-mono-m text-paper-inv">
        {title} · {idx + 1} / {images.length}
      </p>

      <div
        className="relative flex max-h-[85vh] max-w-[92vw] items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          key={idx}
          src={images[idx]}
          alt={`${title} screenshot ${idx + 1}`}
          width={1600}
          height={1000}
          sizes="92vw"
          className="h-auto max-h-[82vh] w-auto max-w-full rounded object-contain shadow-overlay"
        />
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIdx((i) => (i - 1 + images.length) % images.length);
            }}
            className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded border border-paper-inv bg-ink text-paper-inv hover:border-signal hover:text-signal sm:left-8"
            aria-label="Previous screenshot"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIdx((i) => (i + 1) % images.length);
            }}
            className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded border border-paper-inv bg-ink text-paper-inv hover:border-signal hover:text-signal sm:right-8"
            aria-label="Next screenshot"
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}
    </motion.div>
  );
}

export default function Lightbox({ open, ...rest }: LightboxProps) {
  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>{open && <LightboxView {...rest} />}</AnimatePresence>
    </MotionConfig>
  );
}
