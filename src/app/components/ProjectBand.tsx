'use client';

import { useState, type CSSProperties } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { ArrowRight, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { MonoLabel, Rule, StatusDot, type Status } from './ui';
import SplitLines from './SplitLines';

// Loaded on first open — keeps the viewer out of the first-load bundle.
const Lightbox = dynamic(() => import('./Lightbox'));

export interface BandProject {
  id: string;
  title: string;
  /** Mono eyebrow after the number, e.g. "WEB — LIVE" */
  eyebrow: string;
  summary: string;
  techStack: string[];
  imageMode: 'portrait' | 'landscape';
  images: string[];
  status: Status;
  statusLabel: string;
  liveUrl: string;
  /** Case-study route. Unset until the case-study pages exist (no dead links). */
  caseStudyHref?: string;
}

function hostOf(url: string) {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
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
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [everOpened, setEverOpened] = useState(false);

  const { images } = project;
  const go = (n: number) => setCurrent((n + images.length) % images.length);
  const expand = () => {
    setEverOpened(true);
    setLightboxOpen(true);
  };

  const mediaBox =
    project.imageMode === 'portrait'
      ? 'h-[58svh] min-h-[340px] lg:h-[64svh]'
      : 'aspect-[16/9]';

  const num = String(index).padStart(2, '0');
  const imageFirst = imageSide === 'left';

  return (
    <>
    <article className="band" aria-labelledby={`band-${project.id}`}>
      <div className="grid items-center gap-8 py-12 lg:min-h-[85svh] lg:grid-cols-12 lg:gap-14 lg:py-16">
        {/* ── media: screenshot in a paper-2 matte, 1px rule frame, mono caption ── */}
        <figure
          data-reveal
          className={`m-0 lg:col-span-6 ${imageFirst ? 'lg:order-1' : 'lg:order-2'}`}
        >
          <div className="panel-frame bg-paper-2 p-3 sm:p-5">
            {images.length > 0 ? (
              <div className={`relative overflow-hidden ${mediaBox}`} data-parallax>
                <div className="band-parallax">
                <button
                  onClick={expand}
                  className="absolute inset-0 block h-full w-full cursor-zoom-in"
                  aria-label={`Expand ${project.title} screenshot ${current + 1} of ${images.length}`}
                >
                  <span className="band-img-scale absolute inset-0 block">
                    <Image
                      src={images[current]}
                      alt={`${project.title} screenshot ${current + 1}`}
                      fill
                      sizes="(min-width: 1024px) 560px, 100vw"
                      className="object-contain py-6"
                      draggable={false}
                    />
                  </span>
                </button>
                </div>
              </div>
            ) : (
              <div className={`flex items-center justify-center text-center ${mediaBox}`}>
                <div>
                  <p className="font-display text-display-m text-ink">{project.title}</p>
                  <MonoLabel as="p" className="mt-3">
                    Screenshots coming soon
                  </MonoLabel>
                </div>
              </div>
            )}
          </div>

          <figcaption className="mt-3 flex items-center justify-between gap-3">
            <MonoLabel as="span" className="normal-case tracking-normal">
              {project.title}
              {images.length > 0 ? (
                <span className="whitespace-nowrap">{` — ${current + 1} / ${images.length}`}</span>
              ) : (
                ' — screenshots to be added'
              )}
            </MonoLabel>
            {images.length > 0 && (
              <span className="flex items-center">
                {images.length > 1 && (
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
                  aria-label={`Expand ${project.title} screenshot`}
                >
                  <Maximize2 size={16} />
                </button>
              </span>
            )}
          </figcaption>
        </figure>

        {/* ── copy ─────────────────────────────────────────────────────────── */}
        <div
          data-reveal-group
          className={`lg:col-span-5 ${
            imageFirst ? 'lg:order-2 lg:col-start-8' : 'lg:order-1 lg:col-start-1'
          }`}
        >
          {/* eyebrow + number rise first, then the title lines rise out of their masks */}
          <MonoLabel as="p" className="rv-eyebrow mb-4 text-accent">
            {num} / {project.eyebrow}
          </MonoLabel>
          <SplitLines
            as="h3"
            id={`band-${project.id}`}
            className="band-title mb-5 font-display text-ink"
            text={project.title}
          />
          <p className="mb-6 max-w-[46ch] text-body-l text-ink-soft">{project.summary}</p>

          {/* tech tags stagger in (40ms each) after the title */}
          <p className="mb-6 font-mono text-mono-s uppercase text-ink-soft">
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
          <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
            <span className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <StatusDot status={project.status} label={project.statusLabel} className="text-ink" />
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link inline-flex min-h-[44px] items-center font-mono text-mono-m"
                >
                  {hostOf(project.liveUrl)}
                </a>
              )}
            </span>

            {project.caseStudyHref ? (
              <a
                href={project.caseStudyHref}
                className="link inline-flex min-h-[44px] items-center gap-2 text-caption font-semibold"
              >
                Read case study
                <ArrowRight size={14} className="band-arrow" aria-hidden="true" />
              </a>
            ) : (
              <MonoLabel as="span" className="inline-flex min-h-[44px] items-center normal-case tracking-normal">
                Case study coming soon
              </MonoLabel>
            )}
          </div>
        </div>
      </div>

    </article>

      {/* Outside the <article>: the band is an isolated stacking context (for the glow),
          and the viewer must sit above the fixed nav. */}
      {everOpened && (
        <Lightbox
          open={lightboxOpen}
          images={images}
          startIndex={current}
          title={project.title}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}
