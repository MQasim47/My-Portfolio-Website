'use client';

import { useEffect } from 'react';

/**
 * Drives the pinned horizontal work track. One passive scroll listener; --wp (0 → 1) is written
 * on the stage once per animation frame, only when it changed. No library, no timers, and
 * crucially no wheel/touch handling at all: the page scrolls at its normal speed, this only
 * READS the scroll position. Inactive (and --wp removed) at ≤860px wide, <800px tall and under reduced motion,
 * where the CSS stacks the panels instead.
 */
export default function WorkScroll() {
  useEffect(() => {
    const stage = document.querySelector<HTMLElement>('[data-work-stage]');
    if (!stage) return;
    const markers = Array.from(stage.querySelectorAll<HTMLButtonElement>('.work-marker'));
    const mqRm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mqNarrow = window.matchMedia('(max-width: 860px)');
    // short windows can't fit a whole band, so they get the stacked layout too (see globals.css)
    const mqShort = window.matchMedia('(max-height: 799px)');
    const enabled = () => !mqRm.matches && !mqNarrow.matches && !mqShort.matches;

    let frame = 0;
    let last = -1;
    let lastIdx = -1;

    const range = () => stage.getBoundingClientRect().height - window.innerHeight;

    const update = () => {
      frame = 0;
      if (!enabled()) {
        if (last !== -1) {
          stage.style.removeProperty('--wp');
          stage.removeAttribute('data-active');
          last = -1;
          lastIdx = -1;
        }
        return;
      }
      const r = stage.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      const raw = span > 0 ? -r.top / span : 0;
      const p = Math.round(Math.min(1, Math.max(0, raw)) * 10000) / 10000;
      if (p !== last) {
        last = p;
        stage.style.setProperty('--wp', String(p));
      }
      const idx = Math.round(p * (markers.length - 1));
      if (idx !== lastIdx) {
        lastIdx = idx;
        stage.setAttribute('data-active', String(idx));
        markers.forEach((m, i) => {
          if (i === idx) m.setAttribute('aria-current', 'true');
          else m.removeAttribute('aria-current');
        });
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    // 01 / 02 / 03: a normal (user-initiated) scroll to where that panel is centred
    const onClick = (e: Event) => {
      const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('.work-marker');
      if (!btn || !enabled()) return;
      const i = Number(btn.dataset.i);
      const top = stage.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + (i / (markers.length - 1)) * range(), behavior: 'smooth' });
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    mqRm.addEventListener('change', onScroll);
    mqNarrow.addEventListener('change', onScroll);
    mqShort.addEventListener('change', onScroll);
    stage.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      mqRm.removeEventListener('change', onScroll);
      mqNarrow.removeEventListener('change', onScroll);
      mqShort.removeEventListener('change', onScroll);
      stage.removeEventListener('click', onClick);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
