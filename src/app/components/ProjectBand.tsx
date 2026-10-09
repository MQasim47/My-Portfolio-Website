'use client';

import { useState, type CSSProperties } from 'react';
import dynamic from 'next/dynamic';
import { ArrowRight, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { MonoLabel, Pic, Rule, StatusDot, type Status } from './ui';
import SplitLines from './SplitLines';
import DeviceFrame from './DeviceFrame';

// Loaded on first open — keeps the viewer out of the first-load bundle.
const Lightbox = dynamic(() => import('./Lightbox'));

export interface BandLink {
  label: string;
  /** Omit while a URL is unconfirmed: the link renders disabled */
  href?: string;
  /** The one call to action on the band, drawn as a button */
  primary?: boolean;
}

export interface BandProject {
  id: string;
  title: string;
  /** Mono eyebrow after the number, e.g. "WEB — LIVE" */
  eyebrow: string;
  summary: string;
  /** Longer prose under the summary */
  description?: string;
  /** "Under the hood" notes: the technical differentiators */
  notes?: string[];
  techStack: string[];
  /** landscape: a carousel + lightbox. portrait: app screens in a device frame. */
  imageMode: 'portrait' | 'landscape';
  /** Image paths without extension (.avif and .webp sit beside them) */
  images: string[];
  /** Flat hero image shown first (no device frame); portrait projects pair it with `images` */
  poster?: string;
  /** CSS aspect-ratio of the poster so the frame hugs it, e.g. "2 / 3" (default 9 / 16) */
  posterAspect?: string;
  status: Status;
  statusLabel: string;
  links: BandLink[];
}

export function ExtLink({ link }: { link: BandLink }) {
  if (!link.href) {
    return (
      <span
        aria-disabled="true"
        className="inline-flex min-h-[44px] items-center font-mono text-mono-m text-ink-soft opacity-60"
      >
        {link.label}
      </span>
    );
  }
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={
        link.primary
          ? 'btn-primary'
          : 'link inline-flex min-h-[44px] items-center font-mono text-mono-m'
      }
    >
      {link.label}
      {link.primary && <ArrowRight size={16} className="band-arrow" aria-hidden="true" />}
    </a>
  );
}

export default function ProjectBand({
  project,
  index,
  imageSide,
}: {
  project: BandProject;
  index: number;
  imageSide: 'left' | 'right';
}) {
  const [current, setCurrent] = useState(0);
  const [view, setView] = useState<'poster' | 'screens'>('poster');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [everOpened, setEverOpened] = useState(false);

  const { images, poster } = project;
  const portrait = project.imageMode === 'portrait';
  // portrait + poster: the flat hero first, the phone second
  const hasScreens = portrait && images.length > 0;
  const showPoster = !!poster && (!hasScreens || view === 'poster');
  const showDevice = hasScreens && (!poster || view === 'screens');
  const toggle = !!poster && hasScreens;

  // The lightbox shows whatever is on screen
  const lightboxImages = showPoster && poster ? [poster] : images;
  const lightboxStart = showPoster ? 0 : current;

  const go = (n: number) => setCurrent((n + images.length) % images.length);
  const expand = () => {
    setEverOpened(true);
    setLightboxOpen(true);
  };

  const mediaBox = portrait ? 'h-[min(50svh,540px)] min-h-[320px]' : 'aspect-[16/9]';
  const num = String(index).padStart(2, '0');
  const primary = project.links.find((l) => l.primary);
  const secondary = project.links.filter((l) => !l.primary);
  const caption = showPoster
    ? `${project.title} — overview`
    : `${project.title} — ${current + 1} / ${images.length}`;

  return (
    <>
    <article className="band" aria-labelledby={`band-${project.id}`}>
      <div className="band-grid" data-side={imageSide} data-wide={project.notes ? 'true' : undefined}>
        {/* ── media: a paper-2 matte, 1px rule frame, mono caption ── */}
        <figure
          data-reveal
          className="band-media m-0"
        >
          <div className="panel-frame bg-paper-2 p-3 sm:p-5">
            {toggle && (
              <div
                role="group"
                aria-label={`${project.title} views`}
                className="band-views mb-3 flex justify-center"
              >
                {(['poster', 'screens'] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setView(v)}
                    aria-pressed={view === v}
                    className="band-view-btn"
                  >
                    {v === 'poster' ? 'Overview' : 'App screens'}
                  </button>
                ))}
              </div>
            )}

            {poster && (
              <div className="band-view flex justify-center" data-active={showPoster}>
                <button
                  type="button"
                  onClick={expand}
                  className={`band-poster relative block cursor-zoom-in overflow-hidden ${mediaBox}`}
                  style={{ aspectRatio: project.posterAspect ?? '9 / 16' }}
                  aria-label={`Expand ${project.title} overview image`}
                >
                  <Pic
                    src={poster}
                    alt={`${project.title} overview`}
                    className="absolute inset-0 h-full w-full object-contain"
                    eager={index === 1}
                  />
                </button>
              </div>
            )}

            {hasScreens && (
              <div className="band-view flex justify-center py-1" data-active={showDevice}>
                {/* Flutter apps: the screenshots live in a phone you can operate */}
                <DeviceFrame
                  title={project.title}
                  images={images}
                  index={current}
                  onIndexChange={setCurrent}
                />
              </div>
            )}

            {!portrait && images.length > 0 && (
              <div className={`relative overflow-hidden ${mediaBox}`} data-parallax>
                <div className="band-parallax">
                <button
                  onClick={expand}
                  className="absolute inset-0 block h-full w-full cursor-zoom-in"
                  aria-label={`Expand ${project.title} screenshot ${current + 1} of ${images.length}`}
                >
                  <span className="band-img-scale absolute inset-0 block">
                    <Pic
                      key={images[current]}
                      src={images[current]}
                      alt={`${project.title} screenshot ${current + 1}`}
                      className="absolute inset-0 h-full w-full object-contain py-6"
                      eager={current === 0}
                    />
                  </span>
                </button>
                </div>
              </div>
            )}
          </div>

          <figcaption className="mt-3 flex items-center justify-between gap-3">
            <MonoLabel as="span" className="normal-case tracking-normal">
              <span className="whitespace-nowrap">{caption}</span>
            </MonoLabel>
            <span className="flex items-center">
              {!showPoster && images.length > 1 && (
                <>
                  <button
                    onClick={() => go(current - 1)}
                    className="flex h-11 w-11 items-center justify-center text-ink-soft hov:text-accent"
                    aria-label={`Previous ${project.title} screenshot`}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => go(current + 1)}
                    className="flex h-11 w-11 items-center justify-center text-ink-soft hov:text-accent"
                    aria-label={`Next ${project.title} screenshot`}
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
              <button
                onClick={expand}
                className="flex h-11 w-11 items-center justify-center text-ink-soft hov:text-accent"
                aria-label={`Expand ${project.title} ${showPoster ? 'overview image' : 'screenshot'}`}
              >
                <Maximize2 size={16} />
              </button>
            </span>
          </figcaption>
        </figure>

        {/* ── copy ─────────────────────────────────────────────────────────── */}
        <div
          data-reveal-group
          className="band-copy"
        >
          {/* eyebrow + number rise first, then the title lines rise out of their masks */}
          <MonoLabel as="p" className="rv-eyebrow mb-4 text-accent">
            {num} / {project.eyebrow}
          </MonoLabel>
          <SplitLines
            as="h3"
            id={`band-${project.id}`}
            className="band-title mb-4 font-display text-ink"
            text={project.title}
          />
          <p className="mb-3 max-w-[52ch] text-body-l text-ink-soft">{project.summary}</p>
          {project.description && (
            <p className="band-desc mb-4 max-w-[68ch] text-ink-soft">{project.description}</p>
          )}

          {project.notes && (
            <div className="mb-4">
              <MonoLabel as="p" className="mb-2">
                Under the hood
              </MonoLabel>
              <ul className="band-notes">
                {project.notes.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </div>
          )}

          {/* tech tags stagger in (40ms each) after the title */}
          <p className="mb-4 font-mono text-mono-s uppercase text-ink-soft">
            {project.techStack.map((t, i) => (
              <span key={t}>
                <span className="rv-tag inline-block" style={{ '--ti': i } as CSSProperties}>
                  {t}
                </span>
                {i < project.techStack.length - 1 ? (
                  <span aria-hidden="true" className="mx-[0.7ch]">
                    ·
                  </span>
                ) : null}
              </span>
            ))}
          </p>

          <Rule />
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-0">
            {primary && <ExtLink link={primary} />}
            <StatusDot status={project.status} label={project.statusLabel} className="text-ink" />
            {secondary.map((l) => (
              <ExtLink key={l.label} link={l} />
            ))}
          </div>
        </div>
      </div>

    </article>

      {/* Outside the <article>: the band is an isolated stacking context (for the glow),
          and the viewer must sit above the fixed nav. */}
      {everOpened && (
        <Lightbox
          key={showPoster ? 'poster' : 'screens'}
          open={lightboxOpen}
          images={lightboxImages}
          startIndex={lightboxStart}
          title={project.title}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}
