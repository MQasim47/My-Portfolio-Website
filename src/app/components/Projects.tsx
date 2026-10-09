import { Container, SectionHeading, Rule } from './ui';
import WorkScroll from './WorkScroll';
import ProjectBand, { type BandProject } from './ProjectBand';

const G = '/images/projects/flacron-gamezone';
const U = '/images/projects/unknot';
const S = '/images/projects/synthect';
const shots = (dir: string, n: number) => Array.from({ length: n }, (_, i) => `${dir}/screen-${i + 1}`);

// Featured, ranked by significance. More work (M Hassan Traders) lives in MoreWork.tsx.
const featured: BandProject[] = [
  {
    id: 'flacron-gamezone',
    title: 'Flacron GameZone',
    eyebrow: 'WEB — LIVE',
    summary:
      'Live football scores, matches and standings. Built and deployed for Flacron Enterprises; used by real customers.',
    description:
      'Alongside the web platform I also built the GameZone mobile app.',
    techStack: ['Next.js', 'TypeScript', 'Node.js'],
    imageMode: 'landscape',
    status: 'live',
    statusLabel: 'Live',
    links: [{ label: 'flacrongamezone.com', href: 'https://flacrongamezone.com/' }],
    // poster first and last; in between the home page, matches, highlights, teams and pricing
    images: [
      `${G}/gamezone-poster1`,
      `${G}/gamezone1`,
      `${G}/gamezone2`,
      `${G}/gamezone3`,
      `${G}/gamezone4`,
      `${G}/gamezone6`,
      `${G}/gamezone7`,
      `${G}/gamezone-poster2`,
    ],
  },
  {
    id: 'unknot',
    title: 'Unknot',
    eyebrow: 'MOBILE — LIVE',
    summary:
      'An offline Flutter app that teaches core development concepts through animated diagrams instead of definitions.',
    description:
      'Most developers learn frameworks before fundamentals: you can wire up an API and still not explain what happens when you type a URL, or why CORS blocks a request. Unknot teaches 12 core concepts (DNS, the HTTP lifecycle, CORS, JWT, Docker vs VMs, CI/CD, the event loop, Big-O, SQL joins, caching, load balancers and the TCP handshake) as animated diagrams you step through one stage at a time. Each concept takes about three minutes and pairs the diagram with a plain-English analogy and a short quiz. It also ships 9 offline developer tools and 3 logic games.',
    notes: [
      'One data-driven diagram engine renders every concept from JSON, so adding a lesson means writing content, not code.',
      'Every diagram, animation and the Byte mascot is hand-drawn with CustomPainter: no Lottie, no image assets.',
      'Fully offline: no backend, no database, no paid APIs.',
      '257 tests and a GitHub Actions pipeline that builds the web app to Pages and attaches a signed APK to each tagged release.',
    ],
    techStack: ['Flutter', 'Dart', 'Riverpod', 'go_router', 'CustomPainter', 'GitHub Actions'],
    imageMode: 'portrait',
    poster: `${U}/banner`,
    posterAspect: '2 / 3',
    images: shots(U, 7),
    status: 'live',
    statusLabel: 'Live',
    links: [
      {
        label: 'Try it in your browser',
        href: 'https://mqasim47.github.io/Unknot-Learn-Dev-Concepts/',
        primary: true,
      },
      {
        label: 'APK',
        href: 'https://github.com/MQasim47/Unknot-Learn-Dev-Concepts/releases/latest',
      },
      { label: 'Source', href: 'https://github.com/MQasim47/Unknot-Learn-Dev-Concepts' },
    ],
  },
  {
    id: 'synthect',
    title: 'Synthect',
    eyebrow: 'MOBILE — COMPLETE',
    summary: 'An offline-first, AI-powered document intelligence app built with Flutter.',
    description:
      'Instead of sending every task to a cloud API, Synthect processes documents on the device, with privacy and performance as the starting point. It extracts text from PDF, DOCX, TXT, CSV, JSON and XML, generates executive summaries using offline NLP, identifies key topics, entities and actionable insights, and drafts context-aware professional replies in multiple tones. Your documents never leave your phone.',
    techStack: ['Flutter', 'Dart', 'Offline NLP', 'Document parsing'],
    imageMode: 'portrait',
    poster: `${S}/poster`,
    posterAspect: '941 / 1672',
    images: shots(S, 7),
    status: 'shipped',
    statusLabel: 'Complete',
    // Repo URL unconfirmed (QUESTIONS.md): the link stays disabled until it has an href.
    links: [{ label: 'Source code' }],
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
