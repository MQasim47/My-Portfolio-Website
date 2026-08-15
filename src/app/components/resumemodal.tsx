'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ExternalLink, FileText, Loader2 } from 'lucide-react';
import { useState } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// TODO: RESUME_PATH
// Place your CV PDF at:  public/resume.pdf
// Then this path works automatically.  Or use a Google Drive embed link:
//   https://drive.google.com/file/d/YOUR_FILE_ID/preview   ← for iframe src
//   https://drive.google.com/uc?export=download&id=YOUR_FILE_ID ← for download
// ─────────────────────────────────────────────────────────────────────────────
const RESUME_PDF_PATH   = '/resume.pdf';            // TODO: RESUME_PATH (preview src)
const RESUME_DOWNLOAD   = '/resume.pdf';            // TODO: RESUME_PATH (download href)
const RESUME_FILENAME   = 'Muhammad_Qasim_CV.pdf';  // filename shown on download

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [loaded, setLoaded] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
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

  // Reset loader when modal reopens
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
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
            aria-label="Close resume preview"
          />

          {/* ── Modal panel ──────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 30 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-4 sm:inset-8 lg:inset-16 z-[101] flex flex-col rounded-2xl overflow-hidden"
            style={{
              background: '#0F1A15',
              border: '1px solid #0F3D2E',
              boxShadow: '0 0 60px rgba(46,139,87,0.25), 0 25px 50px rgba(0,0,0,0.6)',
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Resume preview"
          >
            {/* ── Header bar ─────────────────────────────────────────── */}
            <div
              className="flex items-center justify-between px-5 py-3.5 border-b flex-shrink-0"
              style={{ borderColor: '#0F3D2E', background: 'rgba(10,10,10,0.6)' }}
            >
              {/* Left: icon + title */}
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg,#0F3D2E,#2E8B57)', border: '1px solid rgba(168,230,207,0.2)' }}
                >
                  <FileText size={14} className="text-mint" />
                </div>
                <div>
                  <p className="text-text-primary text-sm font-semibold leading-tight">
                    Muhammad Qasim — CV
                  </p>
                  <p className="text-text-secondary text-[11px]">
                    DevOps &amp; Full-Stack Developer
                  </p>
                </div>
              </div>

              {/* Right: action buttons */}
              <div className="flex items-center gap-2">
                {/* Open in new tab */}
                <motion.a
                  href={RESUME_PDF_PATH}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title="Open in new tab"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-text-secondary hover:text-mint transition-colors border border-card-border hover:border-accent-hover"
                >
                  <ExternalLink size={12} />
                  Open
                </motion.a>

                {/* Download */}
                <motion.a
                  href={RESUME_DOWNLOAD}
                  download={RESUME_FILENAME}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary py-1.5 px-4 text-xs"
                >
                  <Download size={13} />
                  Download
                </motion.a>

                {/* Close */}
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-text-secondary hover:text-mint hover:bg-card transition-colors ml-1"
                  aria-label="Close"
                >
                  <X size={16} />
                </motion.button>
              </div>
            </div>

            {/* ── PDF viewer ─────────────────────────────────────────── */}
            <div className="relative flex-1 min-h-0">
              {/* Loading skeleton */}
              {!loaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-card z-10">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Loader2 size={28} className="text-mint" />
                  </motion.div>
                  <p className="text-text-secondary text-sm">Loading CV preview…</p>
                </div>
              )}

              {/*
               * The iframe embeds the PDF directly in the browser.
               * Chrome, Edge, Firefox all support this natively.
               * If the user is on mobile Safari, the fallback link below appears.
               *
               * TODO: RESUME_PATH
               * If using Google Drive:
               *   src="https://drive.google.com/file/d/YOUR_FILE_ID/preview"
               */}
              <iframe
                src={`${RESUME_PDF_PATH}#toolbar=1&navpanes=0&scrollbar=1`}
                title="Muhammad Qasim CV"
                className="w-full h-full border-0"
                onLoad={() => setLoaded(true)}
                style={{ background: '#1a1a1a' }}
              />
            </div>

            {/* ── Mobile fallback footer ──────────────────────────────── */}
            <div
              className="sm:hidden flex items-center justify-center gap-3 px-5 py-3 border-t flex-shrink-0"
              style={{ borderColor: '#0F3D2E', background: 'rgba(10,10,10,0.6)' }}
            >
              <a
                href={RESUME_PDF_PATH}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline text-xs py-2 px-4"
              >
                <ExternalLink size={13} />
                Open PDF
              </a>
              <a
                href={RESUME_DOWNLOAD}
                download={RESUME_FILENAME}
                className="btn-primary text-xs py-2 px-4"
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
