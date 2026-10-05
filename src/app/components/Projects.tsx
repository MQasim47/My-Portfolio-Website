'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import { ExternalLink, ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';
import { Section, SectionHeading, MonoLabel, Rule, Reveal } from './ui';
import { GithubIcon } from './ui/BrandIcons';

interface Project {
  id: string;
  title: string;
  label: string;
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
// Placeholder for projects without screenshots
// ─────────────────────────────────────────────────────────────────────────────
function FallbackProjectGraphic({ title }: { title: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-paper-2 p-6 text-center">
      <p className="font-display text-display-m text-ink">{title}</p>
      <MonoLabel as="p" className="mt-3">
        Screenshots coming soon
      </MonoLabel>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Lightbox (state machine ported unchanged: Escape, arrows, body scroll lock)
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

// ─────────────────────────────────────────────────────────────────────────────
// Screenshot viewer inside a card — manual only, nothing auto-advances
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
  const go = (next: number) => setCurrent((next + images.length) % images.length);
  const containerHeight = imageMode === 'portrait' ? 'h-72 sm:h-80' : 'h-52 sm:h-56';

  if (images.length === 0) {
    return (
      <div className={`relative ${containerHeight} overflow-hidden border-b border-rule`}>
        <FallbackProjectGraphic title={title} />
      </div>
    );
  }

  return (
    <div className={`relative ${containerHeight} overflow-hidden border-b border-rule bg-paper-2`}>
      <button
        onClick={() => onExpand(current)}
        className="absolute inset-0 block h-full w-full"
        aria-label={`Expand ${title} screenshot ${current + 1} of ${images.length}`}
      >
        <Image
          src={images[current]}
          alt={`${title} preview ${current + 1}`}
          fill
          sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
          className={imageMode === 'portrait' ? 'object-contain p-2' : 'object-cover'}
          draggable={false}
        />
      </button>

      <span className="pointer-events-none absolute right-3 top-3 z-10 flex items-center gap-1.5 rounded bg-ink px-2 py-1 font-mono text-mono-s text-paper-inv">
        <Maximize2 size={11} aria-hidden="true" />
        {current + 1} / {images.length}
      </span>

      {images.length > 1 && (
        <>
          <button
            onClick={() => go(current - 1)}
            className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded bg-ink text-paper-inv hover:bg-accent"
            aria-label="Previous image"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => go(current + 1)}
            className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded bg-ink text-paper-inv hover:bg-accent"
            aria-label="Next image"
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}
    </div>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  if (!project.liveUrl && !project.githubUrl) return null;
  return (
    <div className="flex flex-wrap items-center gap-4">
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="link inline-flex min-h-[44px] items-center gap-1.5 text-caption font-semibold"
        >
          <ExternalLink size={13} aria-hidden="true" /> Live site
        </a>
      )}
      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="link inline-flex min-h-[44px] items-center gap-1.5 text-caption font-semibold"
        >
          <GithubIcon size={13} /> Source code
        </a>
      )}
    </div>
  );
}

function TechList({ tech }: { tech: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
      {tech.map((t) => (
        <li key={t} className="tech-tag">
          {t}
        </li>
      ))}
    </ul>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Featured project card
// ─────────────────────────────────────────────────────────────────────────────
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <article className="card flex h-full flex-col overflow-hidden">
        <ProjectCarousel
          images={project.images}
          title={project.title}
          imageMode={project.imageMode}
          onExpand={(idx) => setLightboxIndex(idx)}
        />

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <MonoLabel as="p" className="mb-3">
            {String(index).padStart(2, '0')} / {project.label}
          </MonoLabel>
          <h3 className="mb-2 font-display text-display-m text-ink">{project.title}</h3>
          <p className="mb-5 flex-1 text-body text-ink-soft">{project.description}</p>
          <div className="mb-4">
            <TechList tech={project.techStack} />
          </div>
          <Rule />
          <div className="mt-2">
            <ProjectLinks project={project} />
          </div>
        </div>
      </article>

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
// Secondary work — a single full-width hairline row, not a card
// ─────────────────────────────────────────────────────────────────────────────
function OtherProjectRow({ project }: { project: Project }) {
  return (
    <article>
      <Rule />
      <div className="grid gap-4 py-8 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-3">
          <MonoLabel as="p" className="mb-2">
            {project.label}
          </MonoLabel>
          <h4 className="font-display text-display-m text-ink">{project.title}</h4>
        </div>
        <p className="text-body text-ink-soft lg:col-span-5">{project.description}</p>
        <div className="flex flex-col gap-3 lg:col-span-4 lg:items-end">
          <TechList tech={project.techStack} />
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <Section id="projects" labelledBy="projects-title" className="pt-0">
      <SectionHeading id="projects-title" eyebrow="Featured work">
        Built &amp; shipped
      </SectionHeading>

      <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((project, i) => (
          <Reveal key={project.id} delay={i * 0.08} className="h-full">
            <ProjectCard project={project} index={i + 1} />
          </Reveal>
        ))}
      </div>

      <div className="mt-20">
        <MonoLabel as="h3" className="mb-6 block">
          More work
        </MonoLabel>
        {otherProjects.map((project) => (
          <Reveal key={project.id}>
            <OtherProjectRow project={project} />
          </Reveal>
        ))}
        <Rule />
      </div>
    </Section>
  );
}
