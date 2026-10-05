import type { CSSProperties } from 'react';
import { preload } from 'react-dom';
import HeroScroll from './HeroScroll';
import { StatusDot } from './ui';
import './hero.css';

const SLATS = [0, 1, 2, 3, 4, 5, 6];

const slatStyle = (i: number) => ({ '--i': i }) as CSSProperties;
const lineStyle = (n: number) => ({ '--n': n }) as CSSProperties;

export default function Hero() {
  // The portrait is the LCP element. It is a CSS background (the slats), so it is
  // preloaded with high priority instead of loaded lazily by the stylesheet.
  preload('/images/hero-portrait.avif', {
    as: 'image',
    type: 'image/avif',
    fetchPriority: 'high',
  });

  return (
    <section id="hero" aria-label="Introduction" data-hero-stage className="hero-stage">
      <HeroScroll />

      <div className="hero-sticky">
        {/* layer 1 — the real heading */}
        <h1 className="hero-name font-display text-display-xl">
          <span className="sr-only">Muhammad </span>Qasim
        </h1>

        {/* layer 2 — portrait in seven slats */}
        <div className="hero-portrait" role="img" aria-label="Portrait of Muhammad Qasim">
          {SLATS.map((i) => (
            <div key={i} className="hero-slat" style={slatStyle(i)} aria-hidden="true">
              <div className="hero-slat-img" />
            </div>
          ))}
        </div>

        {/* layer 3 — the name again, middle masked away */}
        <div className="hero-name hero-name-front font-display text-display-xl" aria-hidden="true">
          Qasim
        </div>

        {/* left: meta (desktop) */}
        <div className="hero-meta">
          <div className="hero-meta-inner">
            <p>
              <span className="hero-meta-label">Based in</span>
              Lahore, PK
              <br />
              Remote — UTC+5
            </p>
            <p>
              <span className="hero-meta-label">Available</span>
              Internships,
              <br />
              junior roles &amp;
              <br />
              project work
            </p>
          </div>
        </div>

        {/* right: statement */}
        <div className="hero-statement">
          <p className="hero-line" style={lineStyle(0)}>
            I build.
          </p>
          <p className="hero-line" style={lineStyle(1)}>
            I ship.
          </p>
          <p className="hero-line hero-line-accent" style={lineStyle(2)}>
            I run it.
          </p>
          <p className="hero-sub">
            Full-stack and mobile engineer. Web, Flutter apps and the infrastructure that keeps
            them running — first commit to production.
          </p>
        </div>

        <div className="hero-cue" aria-hidden="true">
          Scroll
        </div>

        {/* bottom: status rail */}
        <div className="hero-rail">
          <StatusDot status="live" label="Open to work" className="text-ink" />
          <span className="font-mono text-mono-s uppercase text-ink-soft">
            Next.js · Node · Postgres · Flutter · Docker
          </span>
        </div>
      </div>
    </section>
  );
}
