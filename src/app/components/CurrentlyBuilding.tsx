import type { CSSProperties } from 'react';
import { Section, SectionHeading, StatusDot } from './ui';
import SplitLines from './SplitLines';

// TODO: moves to the CMS in Phase 3.
const ITEMS = [
  {
    name: 'Archive',
    description: 'A RAG-based AI chatbot over private documents. Personal project.',
    tech: ['Next.js', 'Express', 'Ollama', 'pgvector'],
  },
  {
    name: 'Flacron Auto Social',
    description: 'A social media management app.',
    tech: ['Flutter', 'Firebase'],
  },
  {
    name: 'SkillSwap',
    description:
      'A peer-to-peer skill exchange platform for university students, where students list skills they can teach and find the ones they want to learn.',
    // The stack is being changed and features added: intentionally empty until it is confirmed.
    // No live URL or repository link either, until confirmed.
    tech: [] as string[],
  },
];

export default function CurrentlyBuilding() {
  return (
    <Section id="building" labelledBy="building-title" tone="paper-2">
      <SectionHeading id="building-title" eyebrow="In progress">
        Currently building
      </SectionHeading>
      {/* 1 column; 2 on tablets with the odd third card spanning the row (no orphan); 3 on desktop */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {ITEMS.map((item) => (
          // Each card is its own reveal group: the title rises out of its mask, then the tags
          // stagger in. The border simply changes colour on hover (no drawing).
          <article
            key={item.name}
            data-reveal-group
            className="card card-hover flex h-full flex-col gap-4 p-6 sm:p-8 md:last:col-span-2 lg:last:col-span-1"
          >
            <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
              <SplitLines as="h3" className="font-display text-display-m text-ink" text={item.name} />
              <StatusDot status="in-development" label="In development" className="text-ink-soft" />
            </div>
            <p className="text-body text-ink-soft">{item.description}</p>
            {item.tech.length > 0 && (
              <ul className="mt-auto flex flex-wrap gap-1.5" aria-label="Technologies">
                {item.tech.map((t, i) => (
                  <li key={t} className="tech-tag rv-tag" style={{ '--ti': i } as CSSProperties}>
                    {t}
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </Section>
  );
}
