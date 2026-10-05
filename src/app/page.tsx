import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ArchitectureBento from './components/ArchitectureBento';
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
      {/* Smooth scroll configuration */}
      <SmoothScroll />

      {/* Animated cosmic constellation canvas */}
      <ParticleBackground />

      <Navbar />

      <main className="relative z-10">
        <Hero />
        <ArchitectureBento />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      <DevOpsBadge />

      <footer className="relative z-10 border-t border-white/10 py-10 text-center bg-[#050814]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="font-display font-bold text-sm text-white">
              Muhammad Qasim
            </span>
            <span className="text-xs text-text-muted">
              · Senior DevOps &amp; Full-Stack Architect
            </span>
          </div>

          <p className="text-text-muted text-xs font-mono">
            Designed &amp; Engineered with Next.js 14, TypeScript &amp; Framer Motion © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </>
  );
}