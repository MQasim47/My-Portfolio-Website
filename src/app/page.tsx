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
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, SOCIAL } from '@/lib/site';

const PERSON_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE_NAME,
  url: SITE_URL,
  jobTitle: 'Full-stack & mobile engineer',
  description: SITE_DESCRIPTION,
  sameAs: [SOCIAL.github, SOCIAL.linkedin],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // '<' is escaped so the JSON can never close the script tag
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSON_LD).replace(/</g, '\\u003c') }}
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
