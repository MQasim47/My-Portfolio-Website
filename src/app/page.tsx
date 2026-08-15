import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import DevOpsBadge from './components/DevOpsBadge';
import ParticleBackground from './components/Particlebackground';
import SmoothScroll from './components/SmoothScroll';

export default function HomePage() {
  return (
    <>
      {/* Smooth scroll — desktop lerp easing */}
      <SmoothScroll />

      {/* Animated particle constellation background */}
      <ParticleBackground />

      <Navbar />

      <main className="relative z-10">
        <Hero />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      <DevOpsBadge />

      <footer className="relative z-10 border-t border-card-border py-8 text-center">
        <p className="text-text-secondary text-sm">
          Built with{' '}
          <span className="text-mint font-medium">Next.js</span>,{' '}
          <span className="text-mint font-medium">Framer Motion</span> &amp;{' '}
          <span className="text-mint font-medium">♥</span>
          {' '}·{' '}
          <span className="text-text-primary font-medium">Muhammad Qasim</span>{' '}
          © {new Date().getFullYear()}
        </p>
      </footer>
    </>
  );
}