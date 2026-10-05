import { Section, SectionHeading, StatusDot } from './ui';

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
];

export default function CurrentlyBuilding() {
  return (
    <Section id="building" labelledBy="building-title" tone="paper-2">
      <SectionHeading id="building-title" eyebrow="In progress">
        Currently building
      </SectionHeading>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {ITEMS.map((item) => (
            <article key={item.name} className="card draw-border flex h-full flex-col gap-4 p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
                <h3 className="font-display text-display-m text-ink">{item.name}</h3>
                <StatusDot status="in-development" label="In development" className="text-ink-soft" />
              </div>
              <p className="text-body text-ink-soft">{item.description}</p>
              <ul className="mt-auto flex flex-wrap gap-1.5" aria-label="Technologies">
                {item.tech.map((t) => (
                  <li key={t} className="tech-tag">
                    {t}
                  </li>
                ))}
              </ul>
            </article>
        ))}
      </div>
    </Section>
  );
}
