'use client';

import { useEffect } from 'react';

const REST = 400;
const MAX = 700;
const RADIUS = 180; // px: full weight at the cursor, back to rest at this distance
const EASE = 0.2;

/**
 * The hero name reacts to the cursor. Bodoni Moda is a variable font, so each of the five
 * letters gets its own weight: 400 at rest, rising to 700 as the cursor comes within ~180px,
 * easing back as it leaves. One distance calculation per letter, one rAF loop that runs only
 * while the pointer is moving or a letter is still settling. Both name layers (the heading and
 * its masked copy) receive the same value so they stay identical.
 *
 * Off under prefers-reduced-motion and any-hover: none — the letters stay at 400.
 */
export default function NameWeight() {
  useEffect(() => {
    const mq = window.matchMedia('(any-hover: hover) and (prefers-reduced-motion: no-preference)');
    if (!mq.matches) return;

    const real = Array.from(document.querySelectorAll<HTMLElement>('h1.hero-name [data-letter]'));
    const copy = Array.from(document.querySelectorAll<HTMLElement>('.hero-name-front [data-letter]'));
    if (!real.length) return;

    const cur = real.map(() => REST);
    let px = -9999;
    let py = -9999;
    let raf = 0;

    const loop = () => {
      raf = 0;
      let settling = false;
      const vh = window.innerHeight;
      for (let i = 0; i < real.length; i++) {
        const r = real[i].getBoundingClientRect();
        let target = REST;
        if (r.bottom > 0 && r.top < vh) {
          const d = Math.hypot(px - (r.left + r.width / 2), py - (r.top + r.height / 2));
          const t = Math.min(1, Math.max(0, 1 - d / RADIUS));
          target = REST + (MAX - REST) * (t * t * (3 - 2 * t)); // smoothstep
        }
        const next = cur[i] + (target - cur[i]) * EASE;
        const settled = Math.abs(target - next) < 0.5;
        cur[i] = settled ? target : next;
        if (!settled) settling = true;
        const v = String(Math.round(cur[i]));
        if (real[i].style.getPropertyValue('--w') !== v) {
          real[i].style.setProperty('--w', v);
          copy[i]?.style.setProperty('--w', v);
        }
      }
      if (settling) raf = requestAnimationFrame(loop);
    };

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      px = e.clientX;
      py = e.clientY;
      kick();
    };
    const onLeave = () => {
      px = -9999;
      py = -9999;
      kick();
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    window.addEventListener('scroll', kick, { passive: true });
    return () => {
      document.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('scroll', kick);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
