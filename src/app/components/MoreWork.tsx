'use client';

import { useState, type CSSProperties } from 'react';
import dynamic from 'next/dynamic';
import { Maximize2 } from 'lucide-react';
import { MonoLabel, Pic, Section, SectionHeading, StatusDot } from './ui';
import SplitLines from './SplitLines';

const Lightbox = dynamic(() => import('./Lightbox'));

const POSTER = '/images/projects/m-hassan-traders/poster';

// Full-width hairline rows. One entry for now.
const ITEMS = [
  {
    id: 'm-hassan-traders',
    title: 'M Hassan Traders',
    eyebrow: 'MOBILE — IN DAILY USE',
    statusLabel: 'In daily use',
    description:
      'A cattle feed business running on a paper khata. Credit, dues and daily transactions were all recorded by hand in a register, which made balances hard to trust and older entries hard to find. I built a Flutter app to replace it: customer accounts, credit and dues, payment reminders and daily transactions, all offline-first so it works without a connection. It is in daily use at the shop.',
    tech: ['Flutter', 'Dart', 'Sqflite'],
    poster: POSTER,
  },
];

export default function MoreWork() {
  const [open, setOpen] = useState(false);
  const [everOpened, setEverOpened] = useState(false);
  const expand = () => {
    setEverOpened(true);
    setOpen(true);
  };

  return (
    <Section id="more-work" labelledBy="more-work-title">
      <SectionHeading id="more-work-title" eyebrow="Also shipped" className="!mb-0">
        More work
      </SectionHeading>
      <div className="border-b border-rule">
        {ITEMS.map((item) => (
          <article
            key={item.id}
            data-reveal-group
            className="more-row grid items-center gap-8 py-10 md:grid-cols-[minmax(0,220px)_1fr] md:gap-14"
          >
            {/* A single flat image: no device frame (the poster is portrait art, not a screenshot) */}
            <figure className="m-0 flex flex-col items-start">
              <button
                type="button"
                onClick={expand}
                className="band-poster relative block w-full cursor-zoom-in overflow-hidden"
                style={{ aspectRatio: '940 / 1672', maxWidth: 220 }}
                aria-label={`Expand ${item.title} poster`}
              >
                <Pic
                  src={item.poster}
                  alt={`${item.title} app poster`}
                  className="absolute inset-0 h-full w-full object-contain"
                />
              </button>
              <button
                type="button"
                onClick={expand}
                className="mt-1 flex min-h-[44px] items-center gap-2 font-mono text-mono-s text-ink-soft hov:text-accent"
                aria-label={`Expand ${item.title} poster`}
              >
                <Maximize2 size={14} aria-hidden="true" /> Expand
              </button>
            </figure>

            <div>
              <MonoLabel as="p" className="rv-eyebrow mb-4 text-accent">
                {item.eyebrow}
              </MonoLabel>
              <SplitLines
                as="h3"
                className="mb-5 font-display text-display-m text-ink"
                text={item.title}
              />
              <p className="mb-6 max-w-[62ch] text-body-l text-ink-soft">{item.description}</p>
              <ul className="mb-5 flex flex-wrap gap-1.5" aria-label="Technologies">
                {item.tech.map((t, i) => (
                  <li key={t} className="tech-tag rv-tag" style={{ '--ti': i } as CSSProperties}>
                    {t}
                  </li>
                ))}
              </ul>
              <StatusDot status="live" label={item.statusLabel} className="text-ink" />
            </div>
          </article>
        ))}
      </div>

      {everOpened && (
        <Lightbox
          open={open}
          images={[POSTER]}
          startIndex={0}
          title="M Hassan Traders"
          onClose={() => setOpen(false)}
        />
      )}
    </Section>
  );
}
