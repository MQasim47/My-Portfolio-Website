import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import CurrentlyBuilding from './components/CurrentlyBuilding';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Contact from './components/Contact';
import ParticleBackground from './components/Particlebackground';
import SmoothScroll from './components/SmoothScroll';

export default function HomePage() {
  return (
    <>
      <SmoothScroll />
      <ParticleBackground />

      <Navbar />

      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <CurrentlyBuilding />
        <Skills />
        <Experience />
        <Contact />
      </main>

      <footer className="relative z-10 border-t border-white/10 py-10 text-center bg-[#050814]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="font-display font-bold text-sm text-white">Muhammad Qasim</span>
            <span className="text-xs text-text-muted">· Full-stack &amp; Mobile Engineer</span>
          </div>

          <p className="text-text-muted text-xs font-mono">
            © {new Date().getFullYear()} Muhammad Qasim
          </p>
        </div>
      </footer>
    </>
  );
}
