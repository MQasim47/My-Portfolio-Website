'use client';

import { useLayoutEffect } from 'react';

const COLOR: Record<string, string> = {
  paper: 'var(--paper)',
  'paper-2': 'var(--paper-2)',
  terminal: 'var(--terminal)',
};

/**
 * Section register crossfade. Each section declares its background register with
 * data-register. As a section's top crosses the viewport midpoint the PAGE background
 * (--page-bg on <html>) interpolates from the previous register to the new one over a
 * zone of 40% of the viewport height, so the large fields blend like walking into a
 * different room instead of cutting. Hard 1px rules stay where they are. The dark
 * (terminal) register is the exception: a hard cut, painted by the section itself.
 *
 * One passive scroll listener, one rAF write per frame; only --t changes while crossing
 * (--bg-a / --bg-b change only when the pair changes). No timers. Not run under
 * prefers-reduced-motion — sections keep their own tint there.
 */
export default function RegisterFade() {
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const secs = Array.from(document.querySelectorAll<HTMLElement>('[data-register]'));
    if (secs.length < 2) return;
    // The terminal band paints its own opaque background with hard edges, so the page
    // background never blends into or out of it: it reads as the neighbouring paper register.
    const raw = secs.map((s) => s.dataset.register ?? 'paper');
    const regs = raw.map((r, i) => {
      for (let j = i; j >= 0; j--) if (raw[j] !== 'terminal') return raw[j];
      return 'paper';
    });
    const root = document.documentElement;

    let frame = 0;
    let lastT = -1;
    let lastPair = '';

    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const mid = vh / 2;
      const zone = vh * 0.4;
      let k = 0;
      for (let i = 0; i < secs.length; i++) {
        if (secs[i].getBoundingClientRect().top - zone / 2 <= mid) k = i;
      }
      let a = regs[k];
      const b = regs[k];
      let t = 1;
      if (k > 0) {
        a = regs[k - 1];
        t = Math.min(1, Math.max(0, (mid - (secs[k].getBoundingClientRect().top - zone / 2)) / zone));
      }
      const pair = `${a}|${b}`;
      if (pair !== lastPair) {
        lastPair = pair;
        root.style.setProperty('--bg-a', COLOR[a] ?? COLOR.paper);
        root.style.setProperty('--bg-b', COLOR[b] ?? COLOR.paper);
      }
      const rt = Math.round(t * 1000) / 1000;
      if (rt !== lastT) {
        lastT = rt;
        root.style.setProperty('--t', String(rt));
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
      root.style.removeProperty('--bg-a');
      root.style.removeProperty('--bg-b');
      root.style.removeProperty('--t');
    };
  }, []);

  return null;
}
