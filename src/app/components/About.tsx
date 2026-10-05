import { Section, SectionHeading, Prose, Reveal } from './ui';

export default function About() {
  return (
    <Section id="about" labelledBy="about-title" className="pt-[calc(var(--section-space)/2)]">
      <Reveal>
        <SectionHeading id="about-title" eyebrow="About">
          Building and shipping products
        </SectionHeading>
        <Prose>
          <p>
            I&apos;m a Software Engineering student at QUEST, Nawabshah, and I work at Flacron
            Enterprises, where I build and ship products.
          </p>
          <p>
            I build web applications and Flutter mobile apps, put them in front of real users, and
            handle the deployment side myself.
          </p>
        </Prose>
      </Reveal>
    </Section>
  );
}
