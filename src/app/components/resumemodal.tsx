'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ExternalLink, FileText, Loader2, Sparkles } from 'lucide-react';

const RESUME_PDF_PATH   = '/resume.pdf';
const RESUME_DOWNLOAD   = '/resume.pdf';
const RESUME_FILENAME   = 'Muhammad_Qasim_CV.pdf';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [loaded, setLoaded] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) {
      document.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  useEffect(() => { if (isOpen) setLoaded(false); }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Backdrop ─────────────────────────────────────────────── */}
          <motion.div
            ref={overlayRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md"
            aria-label="Close resume preview"
          />

          {/* ── Modal Panel ──────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 25 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-3 sm:inset-6 lg:inset-12 z-[101] flex flex-col rounded-2xl overflow-hidden border border-white/10 bg-[#060914] shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_50px_rgba(6,182,212,0.15)]"
            role="dialog"
            aria-modal="true"
            aria-label="Resume preview"
          >
            {/* ── Header Bar ─────────────────────────────────────────── */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-[#0B1122]/90 backdrop-blur-xl flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center flex-shrink-0 text-cyan-400">
                  <FileText size={15} />
                </div>
                <div>
                  <p className="text-white text-sm font-bold leading-tight">
                    Muhammad Qasim — Resume
                  </p>
                  <p className="text-text-muted text-[11px]">
                    Full-stack &amp; Mobile Engineer
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <a
                  href={RESUME_PDF_PATH}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-text-secondary hover:text-white transition-colors border border-white/10 hover:border-cyan-400/40"
                >
                  <ExternalLink size={12} className="text-cyan-400" />
                  Open in Tab
                </a>

                <a
                  href={RESUME_DOWNLOAD}
                  download={RESUME_FILENAME}
                  className="btn-primary py-1.5 px-3.5 text-xs"
                >
                  <Download size={13} />
                  Download PDF
                </a>

                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:text-white hover:bg-white/10 transition-colors ml-1 cursor-pointer"
                  aria-label="Close modal"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* ── PDF Viewer ─────────────────────────────────────────── */}
            <div className="relative flex-1 min-h-0 bg-[#04060C]">
              {!loaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#060914] z-10">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Loader2 size={26} className="text-cyan-400" />
                  </motion.div>
                  <p className="text-text-secondary text-xs font-mono">Loading CV preview…</p>
                </div>
              )}

              <iframe
                src={`${RESUME_PDF_PATH}#toolbar=1&navpanes=0&scrollbar=1`}
                title="Muhammad Qasim CV"
                className="w-full h-full border-0"
                onLoad={() => setLoaded(true)}
                style={{ background: '#080D1A' }}
              />
            </div>

            {/* ── Mobile Fallback Footer ──────────────────────────────── */}
            <div className="sm:hidden flex items-center justify-center gap-3 px-5 py-3 border-t border-white/10 bg-[#0B1122]/95 flex-shrink-0">
              <a
                href={RESUME_PDF_PATH}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline text-xs py-2 px-4 flex-1 justify-center"
              >
                <ExternalLink size={13} />
                Open PDF
              </a>
              <a
                href={RESUME_DOWNLOAD}
                download={RESUME_FILENAME}
                className="btn-primary text-xs py-2 px-4 flex-1 justify-center"
              >
                <Download size={13} />
                Download
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

