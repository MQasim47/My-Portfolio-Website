'use client';

import { useEffect, useRef, useState } from 'react';
import Byte from './Byte';
import SplitLines from './SplitLines';
import { MonoLabel } from './ui';

/**
 * Opening card, once per session. Whether it shows is decided BEFORE first paint by a tiny
 * inline script in layout.tsx, which adds `splash-on` to <html> only when: the URL is "/" with no
 * hash, reduced motion is off, and sessionStorage is readable, writable and not yet flagged.
 * Without that class the card is display:none here, and this component removes itself, so
 * JS-off, reduced-motion, deep-link and repeat visits never see it. If storage throws, the
 * script fails to the fast path (no card).
 *
 * Timeline (ms): 80 Byte draws, 300 eyes, 380 dot pulse, 520 eyebrow, 600 heading lines,
 * 700 blink, 860 rule, 1050 card lifts (520ms). Most are CSS animations keyed off
 * `.splash-run`; the heading reuses the site's masked line reveal via data-reveal-pending.
 * Any input dismisses it with a 180ms fade; a hard 2s timeout removes it no matter what.
 */
export default function Splash() {
  const [active, setActive] = useState(true);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const el = root.current;
    if (!html.classList.contains('splash-on') || !el) {
      setActive(false);
      return;
    }

    const timers: number[] = [];
    let done = false;
    const startY = window.scrollY;

    const events = ['keydown', 'click', 'touchstart', 'wheel'] as const;
    const onScroll = () => {
      if (window.scrollY !== startY) dismiss();
    };
    const detach = () => {
      events.forEach((t) => window.removeEventListener(t, dismiss));
      window.removeEventListener('scroll', onScroll);
    };
    const finish = () => {
      if (done) return;
      done = true;
      timers.forEach(clearTimeout);
      detach();
      html.classList.remove('splash-on');
      setActive(false);
    };
    function dismiss() {
      if (done) return;
      timers.forEach(clearTimeout);
      timers.length = 0;
      detach();
      el!.classList.add('splash-dismiss');
      timers.push(window.setTimeout(finish, 180));
    }

    events.forEach((t) => window.addEventListener(t, dismiss, { passive: true }));
    window.addEventListener('scroll', onScroll, { passive: true });

    el.classList.add('splash-run');
    const group = el.querySelector('[data-reveal-group]');
    timers.push(window.setTimeout(() => group?.removeAttribute('data-reveal-pending'), 520));
    timers.push(window.setTimeout(() => el.classList.add('splash-leave'), 1050));
    timers.push(window.setTimeout(finish, 1570));
    timers.push(window.setTimeout(finish, 2000)); // hard stop: never trap the page

    return () => {
      timers.forEach(clearTimeout);
      detach();
    };
  }, []);

  if (!active) return null;

  return (
    <div ref={root} className="splash" aria-hidden="true">
      <div className="splash-content">
        <Byte className="byte" />
        <div data-reveal-group data-reveal-pending className="splash-copy">
          <MonoLabel as="p" className="rv-eyebrow text-accent">
            Welcome to
          </MonoLabel>
          <SplitLines
            as="p"
            className="splash-title font-display text-display-m text-ink"
            text="Qasim's development environment"
          />
        </div>
        <div className="splash-rule" />
      </div>
    </div>
  );
}
