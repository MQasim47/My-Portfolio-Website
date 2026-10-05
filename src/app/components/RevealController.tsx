'use client';

import { useEffect } from 'react';

/**
 * Drives the once-only entrance motion (see "MOTION SYSTEM" in globals.css).
 *
 * Everything is VISIBLE by default in CSS. After hydration this marks only the elements
 * that are below the fold as pending, and clears the mark when they enter the viewport.
 * If this never runs (no JS, reduced motion), nothing is ever hidden.
 */
export default function RevealController() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.removeAttribute('data-reveal-pending');
          io.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0 }
    );

    document.querySelectorAll<HTMLElement>('[data-reveal], [data-reveal-group]').forEach((el) => {
      if (el.getBoundingClientRect().top > window.innerHeight * 0.92) {
        el.setAttribute('data-reveal-pending', '');
        io.observe(el);
      }
    });

    return () => io.disconnect();
  }, []);

  return null;
}
