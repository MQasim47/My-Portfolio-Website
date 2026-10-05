'use client';

import { useEffect } from 'react';

/**
 * Project-image parallax. One passive scroll listener; --bp (0 → 1) is written on each
 * [data-parallax] element once per frame, only for elements near the viewport, only when
 * it changed. No library, no timers. Off under reduced motion (--bp stays at its .5 default).
 */
export default function ParallaxController() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
    if (!els.length) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      for (const el of els) {
        const r = el.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) continue;
        const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
        const v = Math.round(p * 1000) / 1000;
        if (el.dataset.bp !== String(v)) {
          el.dataset.bp = String(v);
          el.style.setProperty('--bp', String(v));
        }
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
