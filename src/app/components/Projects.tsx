import type { CSSProperties } from 'react';
import { Section, SectionHeading, MonoLabel, Rule } from './ui';
import SplitLines from './SplitLines';
import ProjectBand, { type BandProject } from './ProjectBand';

// Featured, ranked by significance. Case-study routes arrive with the case-study pages.
const featured: BandProject[] = [
  {
    id: 'flacron-gamezone',
    title: 'Flacron GameZone',
    eyebrow: 'WEB — LIVE',
    summary:
      'Live football scores, matches and standings. Built and deployed for Flacron Enterprises; used by real customers.',
    techStack: ['Next.js', 'TypeScript', 'Node.js'],
    imageMode: 'landscape',
    status: 'live',
    statusLabel: 'Live',
    liveUrl: 'https://flacrongamezone.com/',
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
    eyebrow: 'MOBILE — COMPLETE',
    summary:
      'Flutter app that summarizes documents and drafts replies, using a custom algorithm that skips low-value words.',
    techStack: ['Flutter', 'Dart'],
    imageMode: 'portrait',
    status: 'shipped',
    statusLabel: 'Complete',
    liveUrl: '',
    images: [], // TODO: screenshots + confirmed repo URL (see QUESTIONS.md)
  },
  {
    id: 'm-hassan-traders',
    title: 'M Hassan Traders',
    eyebrow: 'MOBILE — IN DAILY USE',
    summary:
      'Flutter khata ledger for a real cattle feed business, in daily use: customer dues and payment reminders.',
    techStack: ['Flutter', 'Dart', 'Sqflite'],
    imageMode: 'portrait',
    status: 'live',
    statusLabel: 'In daily use',
    liveUrl: '',
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

// Secondary work — not featured. A single full-width hairline row.
const other = {
  id: 'skillswap',
  title: 'SkillSwap',
  label: 'Web',
  description:
    'A web platform where users list their skills and exchange them with others, with user authentication, skill listing management and a matching system. Built full-stack independently, from database design to UI.',
  techStack: ['Next.js', 'React', 'Node.js', 'SQL'],
};

export default function Projects() {
  return (
    <Section id="projects" labelledBy="projects-title" className="pt-0">
      <SectionHeading id="projects-title" eyebrow="Featured work">
        Built &amp; shipped
      </SectionHeading>

      <div>
        {featured.map((project, i) => (
          <div key={project.id}>
            <Rule />
            <ProjectBand
              project={project}
              index={i + 1}
              imageSide={i % 2 === 0 ? 'left' : 'right'}
            />
          </div>
        ))}
      </div>

      {/* Secondary work: one full-width hairline row. Its own reveal group. */}
      <div className="mt-8" data-reveal-group>
        <MonoLabel as="h3" className="rv-eyebrow mb-6 block text-accent">
          More work
        </MonoLabel>
        <article>
          <Rule />
          <div className="grid gap-4 py-8 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-3">
              <MonoLabel as="p" className="rv-eyebrow mb-2 text-accent">
                {other.label}
              </MonoLabel>
              <SplitLines
                as="h4"
                className="font-display text-display-m text-ink"
                text={other.title}
              />
            </div>
            <p className="text-body text-ink-soft lg:col-span-5">{other.description}</p>
            <ul
              className="flex flex-wrap gap-1.5 lg:col-span-4 lg:justify-end"
              aria-label="Technologies"
            >
              {other.techStack.map((t, i) => (
                <li key={t} className="tech-tag rv-tag" style={{ '--ti': i } as CSSProperties}>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </article>
        <Rule />
      </div>
    </Section>
  );
}
