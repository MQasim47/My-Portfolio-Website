'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { X, Download, ExternalLink } from 'lucide-react';

const RESUME_PDF_PATH = '/resume.pdf';
const RESUME_FILENAME = 'Muhammad_Qasim_CV.pdf';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) setLoaded(false);
  }, [isOpen]);

  return (
    <MotionConfig reducedMotion="user">
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="scrim fixed inset-0 z-[100]"
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="dialog-surface fixed inset-3 z-[101] flex flex-col overflow-hidden sm:inset-6 lg:inset-12"
            role="dialog"
            aria-modal="true"
            aria-label="Resume preview"
          >
            <div className="flex shrink-0 items-center justify-between border-b border-rule px-5 py-3">
              <div>
                <p className="text-body font-semibold text-ink">Muhammad Qasim — Resume</p>
                <p className="font-mono text-mono-s uppercase text-ink-soft">
                  Full-stack &amp; Mobile Engineer
                </p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={RESUME_PDF_PATH}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline hidden px-3 py-2 text-caption sm:inline-flex"
                >
                  <ExternalLink size={14} aria-hidden="true" />
                  Open in tab
                </a>
                <a
                  href={RESUME_PDF_PATH}
                  download={RESUME_FILENAME}
                  className="btn-primary px-3 py-2 text-caption"
                >
                  <Download size={14} aria-hidden="true" />
                  Download PDF
                </a>
                <button
                  onClick={onClose}
                  className="flex h-11 w-11 items-center justify-center rounded text-ink hover:text-accent"
                  aria-label="Close resume preview"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="relative min-h-0 flex-1 bg-paper-2">
              {!loaded && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-paper-2">
                  <p className="font-mono text-mono-m text-ink-soft">Loading CV preview…</p>
                </div>
              )}
              <iframe
                src={`${RESUME_PDF_PATH}#toolbar=1&navpanes=0&scrollbar=1`}
                title="Muhammad Qasim CV"
                className="h-full w-full border-0"
                onLoad={() => setLoaded(true)}
              />
            </div>

            <div className="flex shrink-0 items-center justify-center gap-3 border-t border-rule px-5 py-3 sm:hidden">
              <a
                href={RESUME_PDF_PATH}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline flex-1 justify-center px-4 py-2 text-caption"
              >
                <ExternalLink size={14} aria-hidden="true" />
                Open PDF
              </a>
              <a
                href={RESUME_PDF_PATH}
                download={RESUME_FILENAME}
                className="btn-primary flex-1 justify-center px-4 py-2 text-caption"
              >
                <Download size={14} aria-hidden="true" />
                Download
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </MotionConfig>
  );
}
