import { Container, SectionHeading, Rule } from './ui';
import WorkScroll from './WorkScroll';
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

export default function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      data-register="paper"
    >
      <Container>
        <SectionHeading id="projects-title" eyebrow="Featured work">
          Built &amp; shipped
        </SectionHeading>
      </Container>

      {/* The work. Stacked by default; on wide screens with motion allowed it becomes a pinned
          horizontal track (see "PINNED HORIZONTAL WORK" in globals.css). */}
      <div className="work-stage" data-work-stage>
        <div className="work-sticky">
          <div className="work-track">
            {featured.map((project, i) => (
              <div key={project.id} className="work-panel" data-panel={i}>
                <Container className="work-panel-inner">
                  <Rule className="work-rule" />
                  <ProjectBand
                    project={project}
                    index={i + 1}
                    imageSide={i % 2 === 0 ? 'left' : 'right'}
                  />
                </Container>
              </div>
            ))}
          </div>

          {/* progress rule + 01 / 02 / 03 markers (pinned mode only) */}
          <div className="work-chrome" aria-hidden="false">
            <div className="work-markers" role="group" aria-label="Jump to project">
              {featured.map((project, i) => (
                <button
                  key={project.id}
                  type="button"
                  className="work-marker"
                  data-i={i}
                  aria-label={`Show ${project.title}`}
                >
                  {String(i + 1).padStart(2, '0')}
                </button>
              ))}
            </div>
            <div className="work-progress" aria-hidden="true" />
          </div>
        </div>
        <WorkScroll />
      </div>

    </section>
  );
}
