'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink, Github, ChevronLeft, ChevronRight,
  X, ZoomIn, Maximize2
} from 'lucide-react';
import Image from 'next/image';
import AnimatedSection, { childVariants } from './AnimatedSection';

// Slide interval in ms — change to taste
const SLIDE_INTERVAL = 2500;

// ─────────────────────────────────────────────────────────────────────────────
// PROJECT DATA
// HOW TO ADD SCREENSHOTS:
//   1. Drop .jpg / .png files into  public/images/projects/<folder>/
//   2. Update the `images` array below with the correct paths
//   3. Set  imageMode: 'portrait'  for mobile/phone screenshots
//          imageMode: 'landscape' for desktop/dashboard screenshots
// ─────────────────────────────────────────────────────────────────────────────
const projects = [
  {
    id: 'azure-devops',
    title: 'Azure Cloud DevOps',
    label: 'Azure',
    labelColor: '#A8E6CF',
    imageMode: 'landscape' as const,
    description:
      'Deployed and managed multiple production web applications on Azure App Service with auto-scaling, custom domain SSL, and GitHub Actions CI/CD pipelines — zero-downtime deployments on every merge to main.',
    techStack: ['Azure App Service', 'GitHub Actions', 'Docker', 'Terraform', 'Node.js'],
    liveUrl: 'https://flacronenterprises.com/',
    githubUrl: 'https://github.com/MQasim47',
    images: [
      '/images/projects/azure-devops/img-1.png',
      '/images/projects/azure-devops/img-2.png',
      '/images/projects/azure-devops/img-3.png',
      '/images/projects/azure-devops/img-4.png',
    ],
  },
  {
    id: 'skillswap',
    title: 'SkillSwap Platform',
    label: 'Full-Stack',
    labelColor: '#2E8B57',
    imageMode: 'landscape' as const,
    description:
      'Peer-to-peer skill exchange platform for students — post skills you can teach, discover skills you want to learn, and connect directly. Built with Next.js, Express and Node.js REST API backend.',
    techStack: ['Next.js', 'Express', 'Node.js', 'MongoDB', 'TypeScript'],
    liveUrl: '#',
    githubUrl: 'https://github.com/MQasim47',
    images: [
      '/images/projects/skillswap/screenshot-1.svg',
      '/images/projects/skillswap/screenshot-2.svg',
      '/images/projects/skillswap/screenshot-3.svg',
    ],
  },
  {
    id: 'flacron-gamezone',
    title: 'FlacronGameZone',
    label: 'Live Platform',
    labelColor: '#A8E6CF',
    imageMode: 'landscape' as const,
    description:
      'Football live matches platform covering all global leagues and teams. AI-generated pre & post-match analysis, YouTube live stream embeds, real-time scores and standings — by Flacron Enterprises LLC.',
    techStack: ['Next.js', 'AI Analysis', 'YouTube API', 'REST APIs', 'Azure'],
    liveUrl: 'https://flacrongamezone.com/',
    githubUrl: 'https://github.com/MQasim47',
    images: [
     '/images/projects/flacron-gamezone/gamezone3.png',
      '/images/projects/flacron-gamezone/gamezone1.png',
      '/images/projects/flacron-gamezone/gamezone2.png',
      '/images/projects/flacron-gamezone/gamezone4.png',
      '/images/projects/flacron-gamezone/gamezone5.png',
      '/images/projects/flacron-gamezone/gamezone6.png',
      '/images/projects/flacron-gamezone/gamezon7.png',
      '/images/projects/flacron-gamezone/gamezon8.png'

    ],
  },
  {
    id: 'ibm-cicd',
    title: 'IBM Cloud CI/CD Hub',
    label: 'IBM Cloud',
    labelColor: '#A8E6CF',
    imageMode: 'landscape' as const,
    description:
      'Multi-environment deployment infrastructure on IBM Cloud — Kubernetes workloads managed with Helm, Jenkins CI/CD pipelines, Prometheus/Grafana monitoring, and automated rollback triggers.',
    techStack: ['IBM Cloud', 'Kubernetes', 'Jenkins', 'Prometheus', 'Helm'],
    liveUrl: '#',
    githubUrl: 'https://github.com/MQasim47',
    images: [
      '/images/projects/ibm-cicd/img-1.png',
      '/images/projects/ibm-cicd/img-2.png',
      '/images/projects/ibm-cicd/img-3.jpeg',
    ],
  },
  {
    id: 'flutter-expense',
    title: 'Flutter Expense Tracker',
    label: 'Mobile',
    labelColor: '#2E8B57',
    imageMode: 'portrait' as const,   // ← portrait mode for phone screenshots
    description:
      'Cross-platform iOS & Android expense tracking app built with Flutter. Real-time charts, category filters, monthly budgets, and Firebase cloud sync — clean Material 3 dark theme.',
    techStack: ['Flutter', 'Dart', 'Firebase', 'Riverpod', 'Hive'],
    liveUrl: '#',
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

type Project = (typeof projects)[0];

// ─────────────────────────────────────────────────────────────────────────────
// Lightbox
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
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        aria-label="Close"
      >
        <X size={18} />
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/50 border border-white/10 text-xs text-white/70 font-medium">
        {idx + 1} / {images.length}
      </div>

      {/* Image */}
      <motion.div
        key={idx}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="relative max-w-[90vw] max-h-[85vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[idx]}
          alt={`${title} screenshot ${idx + 1}`}
          className="max-w-full max-h-[85vh] object-contain rounded-xl"
          style={{ boxShadow: '0 0 60px rgba(168,230,207,0.1)' }}
        />
      </motion.div>

      {/* Prev */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); setIdx((i) => (i - 1 + images.length) % images.length); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setIdx((i) => (i + 1) % images.length); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label="Next"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* Dot strip */}
      {images.length > 1 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2" onClick={(e) => e.stopPropagation()}>
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === idx ? 20 : 7,
                height: 7,
                background: i === idx ? '#A8E6CF' : 'rgba(168,230,207,0.3)',
              }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Image Carousel — inside the card
// ─────────────────────────────────────────────────────────────────────────────
function ProjectCarousel({
  images,
  title,
  imageMode,
  onExpand,
}: {
  images: string[];
  title: string;
  imageMode: 'portrait' | 'landscape';
  onExpand: (index: number) => void;
}) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const go = useCallback(
    (next: number, dir: number) => {
      setDirection(dir);
      setCurrent((next + images.length) % images.length);
    },
    [images.length]
  );

  useEffect(() => {
    if (paused || images.length <= 1) return;
    intervalRef.current = setInterval(() => go(current + 1, 1), SLIDE_INTERVAL);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [current, paused, go, images.length]);

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 30 : -30 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as number[] } },
    exit:  (d: number) => ({ opacity: 0, x: d > 0 ? -30 : 30, transition: { duration: 0.3 } }),
  };

  // Portrait: tall container centered with phone-frame feel
  // Landscape: standard wide container
  const containerHeight = imageMode === 'portrait' ? 'h-72' : 'h-48';
  const imgFit = imageMode === 'portrait' ? 'object-contain p-3' : 'object-cover';

  return (
    <div
      className={`relative ${containerHeight} overflow-hidden rounded-t-2xl border-b border-card-border cursor-pointer`}
      style={{ background: imageMode === 'portrait' ? '#0a110e' : '#0F1A15' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onClick={() => onExpand(current)}
    >
      {/* Slides */}
      <AnimatePresence custom={direction} mode="sync">
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 flex items-center justify-center"
        >
          <img
            src={images[current]}
            alt={`${title} screenshot ${current + 1}`}
            className={`w-full h-full ${imgFit} transition-none`}
            draggable={false}
          />
          {/* Bottom fade for landscape */}
          {imageMode === 'landscape' && (
            <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent pointer-events-none" />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Expand hint on hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none"
        style={{ background: 'rgba(0,0,0,0.25)' }}>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/20 text-white text-xs font-medium">
          <ZoomIn size={12} />
          Click to expand
        </div>
      </div>

      {/* Expand icon top-right */}
      <div className="absolute top-2 right-2 z-10 w-7 h-7 rounded-lg bg-black/50 border border-white/10 flex items-center justify-center text-white/60 pointer-events-none">
        <Maximize2 size={11} />
      </div>

      {/* Prev / Next */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); setPaused(true); go(current - 1, -1); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/70 transition-all"
            aria-label="Previous"
          >
            <ChevronLeft size={13} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setPaused(true); go(current + 1, 1); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/70 transition-all"
            aria-label="Next"
          >
            <ChevronRight size={13} />
          </button>
        </>
      )}

      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setPaused(true); go(i, i > current ? 1 : -1); }}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? 16 : 5,
                height: 5,
                background: i === current ? '#A8E6CF' : 'rgba(168,230,207,0.3)',
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
function ProjectCard({ project }: { project: Project }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <motion.article
        variants={childVariants}
        whileHover={{ y: -5 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        className="card flex flex-col overflow-hidden group cursor-default relative"
      >
        {/* Platform badge */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest"
            style={{
              background: 'rgba(10,10,10,0.85)',
              border: `1px solid ${project.labelColor}40`,
              color: project.labelColor,
              backdropFilter: 'blur(8px)',
            }}
          >
            {project.label}
          </span>
        </div>

        {/* Carousel */}
        <ProjectCarousel
          images={project.images}
          title={project.title}
          imageMode={project.imageMode}
          onExpand={(i) => setLightboxIndex(i)}
        />

        {/* Body */}
        <div className="flex flex-col flex-1 p-5">
          <h3 className="font-display font-bold text-base text-text-primary mb-2 group-hover:text-mint transition-colors duration-200">
            {project.title}
          </h3>
          <p className="text-text-secondary text-sm leading-relaxed mb-4 flex-1">
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.techStack.map((tech) => (
              <span key={tech} className="tech-tag text-[10px]">{tech}</span>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-4 pt-3 border-t border-card-border">
            {project.liveUrl !== '#' && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-mint hover:text-white transition-colors">
                <ExternalLink size={12} /> Live Demo
              </a>
            )}
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-text-primary transition-colors ml-auto">
              <Github size={12} /> GitHub
            </a>
          </div>
        </div>

        {/* Hover glow */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ boxShadow: `inset 0 0 0 1px ${project.labelColor}25, 0 0 28px ${project.labelColor}10` }}
        />
      </motion.article>

      {/* Lightbox portal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
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
// Section
// ─────────────────────────────────────────────────────────────────────────────
export default function Projects() {
  return (
    <AnimatedSection id="projects" eyebrow="What I've built" heading="Featured Projects">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </AnimatedSection>
  );
}