'use client';

import { useEffect, useRef } from 'react';

const SIZE = 520;
const LERP = 0.12;

/**
 * ONE site-wide glow: a single fixed element behind the content that trails the cursor.
 * One pointermove listener on the document stores x/y only. One rAF loop lerps toward the
 * target and writes translate3d only (never top/left); the loop runs only while the glow is
 * still catching up and stops once it has settled. Disabled entirely under
 * prefers-reduced-motion and any-hover: none.
 */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia('(any-hover: hover) and (prefers-reduced-motion: no-preference)');
    if (!mq.matches) return;

    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;
    let seen = false;

    const place = () => {
      el.style.transform = `translate3d(${cx - SIZE / 2}px, ${cy - SIZE / 2}px, 0)`;
    };

    const loop = () => {
      cx += (tx - cx) * LERP;
      cy += (ty - cy) * LERP;
      place();
      if (Math.abs(tx - cx) > 0.3 || Math.abs(ty - cy) > 0.3) raf = requestAnimationFrame(loop);
      else raf = 0;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      tx = e.clientX;
      ty = e.clientY;
      if (!seen) {
        seen = true;
        cx = tx;
        cy = ty;
        place();
        el.dataset.active = 'true';
      }
      if (!raf) raf = requestAnimationFrame(loop);
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      document.removeEventListener('pointermove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="cursor-glow" aria-hidden="true" />;
}
