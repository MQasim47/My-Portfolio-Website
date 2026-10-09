'use client';

import { useEffect, useRef, useState } from 'react';
import Byte from './Byte';
import SplitLines from './SplitLines';
import { MonoLabel } from './ui';

/**
 * Opening card, shown on every load. Whether it shows is decided BEFORE first paint by a tiny
 * inline script in layout.tsx, which adds `splash-on` to <html> only when the URL is "/" with
 * no hash and reduced motion is off. Without that class the card is display:none here, and this
 * component removes itself, so JS-off, reduced-motion and deep-link visits never see it.
 * The server renders only the empty cover (no text, no Byte): the card's content is mounted on
 * the client, so none of it is in the HTML a crawler fetches.
 *
 * Timeline (ms): 100 Byte draws (520), 380 eyes, 470 dot pulse, 660 eyebrow, 780 heading
 * lines, 980 blink, 1150 rule (420), 1620 card lifts (560), 2180 done. Most are CSS animations
 * keyed off `.splash-run`; the heading reuses the site's masked line reveal via
 * data-reveal-pending. Any input dismisses it with a 180ms fade; a hard 3s timeout removes it
 * no matter what.
 */
export default function Splash() {
  // 'idle' = server render and first client render (empty cover only)
  const [phase, setPhase] = useState<'idle' | 'on' | 'off'>('idle');
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPhase(document.documentElement.classList.contains('splash-on') ? 'on' : 'off');
  }, []);

  useEffect(() => {
    if (phase !== 'on') return;
    const html = document.documentElement;
    const el = root.current;
    if (!el) return;

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
      setPhase('off');
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
    timers.push(window.setTimeout(() => group?.removeAttribute('data-reveal-pending'), 660));
    timers.push(window.setTimeout(() => el.classList.add('splash-leave'), 1620));
    timers.push(window.setTimeout(finish, 2180));
    timers.push(window.setTimeout(finish, 3000)); // hard stop: never trap the page

    return () => {
      timers.forEach(clearTimeout);
      detach();
    };
  }, [phase]);

  if (phase === 'off') return null;

  return (
    <div ref={root} className="splash" aria-hidden="true">
      {phase === 'on' && (
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
      )}
    </div>
  );
}
