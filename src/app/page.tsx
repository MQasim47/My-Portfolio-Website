import Splash from './components/Splash';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import MoreWork from './components/MoreWork';
import CurrentlyBuilding from './components/CurrentlyBuilding';
import Skills from './components/Skills';
import ShippingRecord from './components/ShippingRecord';
import Experience from './components/Experience';
import Contact from './components/Contact';
import { Container, MonoLabel } from './components/ui';
import { SITE_URL, SITE_NAME, SITE_TITLE, SITE_DESCRIPTION, SOCIAL } from '@/lib/site';

const PERSON_ID = `${SITE_URL}/#person`;
const SITE_ID = `${SITE_URL}/#website`;

// One graph: the WebSite, the ProfilePage about me, and the Person it is about.
const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': SITE_ID,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: 'en',
      publisher: { '@id': PERSON_ID },
    },
    {
      '@type': 'ProfilePage',
      '@id': `${SITE_URL}/#profile`,
      url: `${SITE_URL}/`,
      name: SITE_TITLE,
      description: SITE_DESCRIPTION,
      inLanguage: 'en',
      isPartOf: { '@id': SITE_ID },
      mainEntity: { '@id': PERSON_ID },
    },
    {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      image: `${SITE_URL}/images/hero-portrait.png`,
      jobTitle: 'Full-Stack & Mobile Developer',
      description: SITE_DESCRIPTION,
      knowsAbout: [
        'Next.js',
        'React',
        'TypeScript',
        'Tailwind CSS',
        'Node.js',
        'Express',
        'REST APIs',
        'Flutter',
        'Dart',
        'Firebase',
        'PostgreSQL',
        'AWS',
        'Microsoft Azure',
        'Docker',
        'GitHub Actions',
      ],
      worksFor: {
        '@type': 'Organization',
        name: 'Flacron Enterprises LLC',
        url: 'https://flacronenterprises.com/',
      },
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'Quaid-e-Awam University of Engineering, Science & Technology (QUEST), Nawabshah',
      },
      sameAs: [SOCIAL.github, SOCIAL.linkedin],
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // '<' is escaped so the JSON can never close the script tag
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD).replace(/</g, '\\u003c') }}
      />
      <Splash />
      <Navbar />

      <main id="main" className="relative z-[1]">
        <Hero />
        <About />
        <Projects />
        <MoreWork />
        <CurrentlyBuilding />
        <Skills />
        <ShippingRecord />
        <Experience />
        <Contact />
      </main>

      <footer data-register="paper" className="relative z-[1] border-t border-rule py-10 pb-[max(2.5rem,env(safe-area-inset-bottom))]">
        <Container className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-body text-ink">
            <span className="font-semibold">Muhammad Qasim</span>
            <span className="text-ink-soft"> · Full-stack &amp; Mobile Engineer</span>
          </p>
          <MonoLabel as="p" className="normal-case tracking-normal">
            © {new Date().getFullYear()} Muhammad Qasim
          </MonoLabel>
        </Container>
      </footer>
    </>
  );
}
