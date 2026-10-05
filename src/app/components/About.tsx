import { Section, SectionHeading } from './ui';
import SplitLines from './SplitLines';

const PARAGRAPHS = [
  "I'm a Software Engineering student at QUEST, Nawabshah, and I work at Flacron Enterprises, where I build and ship products.",
  'I build web applications and Flutter mobile apps, put them in front of real users, and handle the deployment side myself.',
];

export default function About() {
  return (
    <Section id="about" labelledBy="about-title" className="pt-[calc(var(--section-space)/2)]">
      <SectionHeading id="about-title" eyebrow="About">
        Building and shipping products
      </SectionHeading>
      {/* Prose: each paragraph splits into masked lines that rise, 60ms apart */}
      <div data-reveal-group className="max-w-[62ch] space-y-4 text-body-l text-ink-soft">
        {PARAGRAPHS.map((text) => (
          <SplitLines key={text} as="p" text={text} />
        ))}
      </div>
    </Section>
  );
}
