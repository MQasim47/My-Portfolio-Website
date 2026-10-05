'use client';

import { useEffect } from 'react';

/**
 * Writes the hero progress --p (0 → 1) on <html> once per animation frame,
 * from a single passive scroll listener. No library, no timers, no loop:
 * a frame is only requested when a scroll or resize event arrives.
 *
 * p = clamp(0, 1, (scrollY - stage.offsetTop) / (stage.offsetHeight - innerHeight))
 *
 * Under prefers-reduced-motion nothing is attached and --p stays at its CSS default.
 */
export default function HeroScroll() {
  useEffect(() => {
    const stage = document.querySelector<HTMLElement>('[data-hero-stage]');
    if (!stage) return;

    const root = document.documentElement;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let last = -1;
    let attached = false;

    const update = () => {
      frame = 0;
      const range = stage.offsetHeight - window.innerHeight;
      const raw = range > 0 ? (window.scrollY - stage.offsetTop) / range : 0;
      const p = Math.round(Math.min(1, Math.max(0, raw)) * 10000) / 10000;
      if (p !== last) {
        last = p;
        root.style.setProperty('--p', String(p));
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const attach = () => {
      if (attached) return;
      attached = true;
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
      update();
    };

    const detach = () => {
      if (!attached) return;
      attached = false;
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      last = -1;
      root.style.removeProperty('--p');
    };

    const sync = () => (mq.matches ? detach() : attach());
    mq.addEventListener('change', sync);
    sync();

    return () => {
      mq.removeEventListener('change', sync);
      detach();
    };
  }, []);

  return null;
}
