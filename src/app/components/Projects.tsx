'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink, Github, ChevronLeft, ChevronRight,
  X, ZoomIn, Layers,
} from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const SLIDE_INTERVAL = 3000;

interface Project {
  id: string;
  title: string;
  label: string;
  labelColor: string;
  imageMode: 'portrait' | 'landscape';
  tagline: string;
  description: string;
  techStack: string[];
  liveUrl: string;   // '' = no public URL
  githubUrl: string; // '' = not published (TODO: confirm repo URL, see QUESTIONS.md)
  images: string[];
}

// Featured, in order of significance.
const featuredProjects: Project[] = [
  {
    id: 'flacron-gamezone',
    title: 'Flacron GameZone',
    label: 'Web · Live',
    labelColor: '#22D3EE',
    imageMode: 'landscape',
    tagline: 'Live football matches platform for Flacron Enterprises.',
    description:
      'Football live matches platform covering global leagues and teams, with live scores and standings. Designed, developed and deployed from client briefing to production, and used by real customers.',
    techStack: ['Next.js', 'TypeScript', 'Node.js'],
    liveUrl: 'https://flacrongamezone.com/',
    githubUrl: '',
    images: [
      '/images/projects/flacron-gamezone/gamezone3.png',
      '/images/projects/flacron-gamezone/gamezone1.png',
      '/images/projects/flacron-gamezone/gamezone2.png',
      '/images/projects/flacron-gamezone/gamezone4.png',
      '/images/projects/flacron-gamezone/gamezone5.png',
      '/images/projects/flacron-gamezone/gamezone6.png',
      '/images/projects/flacron-gamezone/gamezon7.png',
      '/images/projects/flacron-gamezone/gamezon8.png',
    ],
  },
  {
    id: 'synthect',
    title: 'Synthect',
    label: 'Mobile · Complete',
    labelColor: '#34D399',
    imageMode: 'portrait',
    tagline: 'Document summarization and reply generation.',
    description:
      'A Flutter app that summarizes documents and generates replies. Summaries come from a custom summarization algorithm I wrote that skips low-value words.',
    techStack: ['Flutter', 'Dart'],
    liveUrl: '',
    githubUrl: '', // TODO: confirm repo URL with Muhammad before publishing
    images: [],
  },
  {
    id: 'm-hassan-traders',
    title: 'M Hassan Traders',
    label: 'Mobile · In daily use',
    labelColor: '#34D399',
    imageMode: 'portrait',
    tagline: 'Khata (credit ledger) app for a cattle feed business.',
    description:
      'Flutter app that digitizes the khata (credit and dues ledger) of a real cattle feed business, in daily use. Tracks customer dues, sends payment reminder notifications and manages daily transactions, replacing manual bookkeeping.',
    techStack: ['Flutter', 'Dart', 'Sqflite'],
    liveUrl: '',
    githubUrl: 'https://github.com/MQasim47/M_Hassan_Traders_App',
    images: [
      '/images/projects/flutter-expense/img-1.jpeg',
      '/images/projects/flutter-expense/img-2.jpeg',
      '/images/projects/flutter-expense/img-3.jpeg',
      '/images/projects/flutter-expense/img-4.jpeg',
      '/images/projects/flutter-expense/img-5.jpeg',
      '/images/projects/flutter-expense/img-6.jpeg',
      '/images/projects/flutter-expense/img-7.jpeg',
    ],
  },
];

// Secondary work — not featured.
const otherProjects: Project[] = [
  {
    id: 'skillswap',
    title: 'SkillSwap',
    label: 'Web',
    labelColor: '#A78BFA',
    imageMode: 'landscape',
    tagline: 'Skill exchange web platform.',
    description:
      'A web platform where users list their skills and exchange them with others, with user authentication, skill listing management and a matching system. Built full-stack independently, from database design to UI.',
    techStack: ['Next.js', 'React', 'Node.js', 'SQL'],
    liveUrl: '',
    githubUrl: '', // TODO: confirm repo URL (skillswap-nextjs?) before publishing
    images: [],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Fallback Graphic for Projects without uploaded screenshots (e.g. SkillSwap)
// ─────────────────────────────────────────────────────────────────────────────
function FallbackProjectGraphic({ title, techStack }: { title: string; techStack: string[] }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#0B1120] via-[#0E172A] to-[#1E1B4B] relative overflow-hidden">
      {/* Decorative background grid and circles */}
      <div className="absolute inset-0 dot-pattern opacity-30" />
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-indigo-500/20 blur-2xl" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-cyan-500/20 blur-2xl" />

      <div className="relative z-10 text-center max-w-xs">
        <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.25)]">
          <Layers size={22} />
        </div>
        <h4 className="text-white font-display font-bold text-sm mb-1">{title}</h4>
        <p className="text-[11px] text-text-muted mb-3 font-mono">Screenshots coming soon</p>
        <div className="flex flex-wrap justify-center gap-1">
          {techStack.slice(0, 3).map((t) => (
            <span key={t} className="px-2 py-0.5 rounded bg-white/[0.06] border border-white/10 text-[10px] text-cyan-300">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Lightbox Modal
// ─────────────────────────────────────────────────────────────────────────────
function Lightbox({
  images,
  startIndex,
  title,
  onClose,
}: {
  images: string[];
  startIndex: number;
  title: string;
  onClose: () => void;
}) {
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
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8"
      style={{ background: 'rgba(3, 7, 18, 0.94)', backdropFilter: 'blur(16px)' }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-10 w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:scale-105 transition-all cursor-pointer"
        aria-label="Close modal"
      >
        <X size={20} />
      </button>

      <div className="absolute top-5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/60 border border-white/15 text-xs text-white/80 font-mono">
        {title} · {idx + 1} / {images.length}
      </div>

      <motion.div
        key={idx}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="relative max-w-[92vw] max-h-[85vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[idx]}
          alt={`${title} screenshot ${idx + 1}`}
          className="max-w-full max-h-[82vh] object-contain rounded-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
        />
      </motion.div>

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); setIdx((i) => (i - 1 + images.length) % images.length); }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:scale-105 transition-all cursor-pointer"
            aria-label="Previous screenshot"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setIdx((i) => (i + 1) % images.length); }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:scale-105 transition-all cursor-pointer"
            aria-label="Next screenshot"
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}

      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2" onClick={(e) => e.stopPropagation()}>
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className="rounded-full transition-all duration-300 cursor-pointer"
              style={{
                width: i === idx ? 24 : 8,
                height: 8,
                background: i === idx ? '#38BDF8' : 'rgba(255, 255, 255, 0.25)',
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Project Carousel inside Card
// ─────────────────────────────────────────────────────────────────────────────
function ProjectCarousel({
  images,
  title,
  imageMode,
  techStack,
  onExpand,
}: {
  images: string[];
  title: string;
  imageMode: 'portrait' | 'landscape';
  techStack: string[];
  onExpand: (index: number) => void;
}) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const go = useCallback(
    (next: number) => {
      setCurrent((next + images.length) % images.length);
    },
    [images.length]
  );

  useEffect(() => {
    if (paused || images.length <= 1) return;
    intervalRef.current = setInterval(() => go(current + 1), SLIDE_INTERVAL);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [current, paused, go, images.length]);

  const containerHeight = imageMode === 'portrait' ? 'h-64 sm:h-72' : 'h-52 sm:h-56';

  if (!images || images.length === 0) {
    return (
      <div className={`relative ${containerHeight} overflow-hidden rounded-t-2xl border-b border-white/10`}>
        <FallbackProjectGraphic title={title} techStack={techStack} />
      </div>
    );
  }

  return (
    <div
      className={`relative ${containerHeight} overflow-hidden rounded-t-2xl border-b border-white/10 cursor-pointer group/carousel bg-[#060913]`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onClick={() => onExpand(current)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="absolute inset-0 flex items-center justify-center p-2"
        >
          <img
            src={images[current]}
            alt={`${title} preview ${current + 1}`}
            className={`w-full h-full ${imageMode === 'portrait' ? 'object-contain' : 'object-cover'} rounded-lg transition-transform duration-300 group-hover/carousel:scale-105`}
            draggable={false}
          />
          {imageMode === 'landscape' && (
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent pointer-events-none" />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Hover Zoom Prompt */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-200 bg-black/40 backdrop-blur-xs pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/75 border border-white/20 text-white text-xs font-medium shadow-lg">
          <ZoomIn size={14} className="text-cyan-400" />
          Expand Screenshot
        </div>
      </div>

      {/* Counter Tag Top Right */}
      <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-md bg-black/70 border border-white/10 text-[10px] font-mono text-white/80 pointer-events-none">
        {current + 1} / {images.length}
      </div>

      {/* Prev / Next controls */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); setPaused(true); go(current - 1); }}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-lg bg-black/60 border border-white/10 flex items-center justify-center text-white hover:bg-black hover:scale-105 transition-all"
            aria-label="Previous image"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setPaused(true); go(current + 1); }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-lg bg-black/60 border border-white/10 flex items-center justify-center text-white hover:bg-black hover:scale-105 transition-all"
            aria-label="Next image"
          >
            <ChevronRight size={14} />
          </button>
        </>
      )}

      {/* Indicator bar */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setPaused(true); setCurrent(i); }}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? 18 : 6,
                height: 6,
                background: i === current ? '#38BDF8' : 'rgba(255, 255, 255, 0.3)',
              }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Project Card
// ─────────────────────────────────────────────────────────────────────────────
function ProjectCard({ project, index }: { project: Project; index?: number }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <motion.article
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.35 }}
        whileHover={{ y: -5 }}
        className="card flex flex-col overflow-hidden group hover:border-cyan-400/40 hover:shadow-glow-cyan transition-all"
      >
        {/* Category Pill Badge on top of image */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider shadow-md"
            style={{
              background: 'rgba(8, 13, 26, 0.92)',
              border: `1px solid ${project.labelColor}60`,
              color: project.labelColor,
              backdropFilter: 'blur(10px)',
            }}
          >
            {index ? `${String(index).padStart(2, '0')} · ` : ''}{project.label}
          </span>
        </div>

        {/* Media Carousel */}
        <ProjectCarousel
          images={project.images}
          title={project.title}
          imageMode={project.imageMode}
          techStack={project.techStack}
          onExpand={(idx) => setLightboxIndex(idx)}
        />

        {/* Card Body */}
        <div className="flex flex-col flex-1 p-5 sm:p-6">
          <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-cyan-400 transition-colors flex items-center justify-between">
            <span>{project.title}</span>
          </h3>

          <p className="text-text-secondary text-sm leading-relaxed mb-4 flex-1">
            {project.description}
          </p>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.techStack.map((tech) => (
              <span key={tech} className="tech-tag text-[10px]">
                {tech}
              </span>
            ))}
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-3 pt-4 border-t border-white/10 mt-auto">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-400/30 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20 hover:text-white transition-colors"
              >
                <ExternalLink size={12} /> Live Site
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-semibold text-text-secondary hover:text-white hover:bg-white/10 transition-colors ml-auto"
              >
                <Github size={12} /> Source Code
              </a>
            )}
          </div>
        </div>
      </motion.article>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && project.images.length > 0 && (
          <Lightbox
            images={project.images}
            startIndex={lightboxIndex}
            title={project.title}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Projects Section
// ─────────────────────────────────────────────────────────────────────────────
export default function Projects() {
  return (
    <AnimatedSection
      id="projects"
      eyebrow="Featured Work"
      heading="Built & Shipped"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {featuredProjects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i + 1} />
        ))}
      </div>

      <h3 className="mt-20 mb-8 text-center text-xs font-mono font-bold tracking-widest uppercase text-text-muted">
        More work
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {otherProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </AnimatedSection>
  );
}
