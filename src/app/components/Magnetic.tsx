'use client';

import { useEffect } from 'react';

const RANGE = 80; // px from the element's edge at which the pull begins
const MAX = 8; // px of travel, at most
const PULL = 0.25; // fraction of the cursor offset
const EASE = 0.16;
const MAX_WIDTH = 300; // wide, full-width buttons don't get pulled

/**
 * Primary buttons and the nav logo lean slightly toward the cursor when it comes within ~80px
 * (up to 8px of travel) and ease back when it leaves. Subtle by design: if it reads as an
 * effect, it's too strong.
 *
 * One document pointermove listener stores x/y; one rAF loop (running only while the pointer
 * is moving or an element is still easing back) writes the CSS `translate` property — a
 * transform, independent of any other transform on the element. Off under
 * prefers-reduced-motion and any-hover: none.
 */
export default function Magnetic() {
  useEffect(() => {
    const mq = window.matchMedia('(any-hover: hover) and (prefers-reduced-motion: no-preference)');
    if (!mq.matches) return;

    const pos = new WeakMap<HTMLElement, { x: number; y: number }>();
    let px = -9999;
    let py = -9999;
    let raf = 0;

    const loop = () => {
      raf = 0;
      let moving = false;
      const els = document.querySelectorAll<HTMLElement>('.btn-primary, [data-magnetic]');
      els.forEach((el) => {
        const st = pos.get(el) ?? { x: 0, y: 0 };
        pos.set(el, st);
        const r = el.getBoundingClientRect();
        if (r.width === 0 || (r.width > MAX_WIDTH && !el.hasAttribute('data-magnetic'))) {
          if (st.x || st.y) {
            st.x = st.y = 0;
            el.style.translate = '';
          }
          return;
        }
        // where the element sits without its own pull
        const cx = r.left + r.width / 2 - st.x;
        const cy = r.top + r.height / 2 - st.y;
        const dx = Math.max(cx - r.width / 2 - px, 0, px - (cx + r.width / 2));
        const dy = Math.max(cy - r.height / 2 - py, 0, py - (cy + r.height / 2));
        const dist = Math.hypot(dx, dy);

        let tx = 0;
        let ty = 0;
        if (dist < RANGE) {
          const falloff = 1 - dist / RANGE;
          tx = Math.max(-MAX, Math.min(MAX, (px - cx) * PULL)) * falloff;
          ty = Math.max(-MAX, Math.min(MAX, (py - cy) * PULL)) * falloff;
        }
        st.x += (tx - st.x) * EASE;
        st.y += (ty - st.y) * EASE;
        const settled = Math.abs(tx - st.x) < 0.05 && Math.abs(ty - st.y) < 0.05;
        if (settled) {
          st.x = tx;
          st.y = ty;
        } else {
          moving = true;
        }
        el.style.translate = st.x || st.y ? `${st.x.toFixed(2)}px ${st.y.toFixed(2)}px` : '';
      });
      if (moving) raf = requestAnimationFrame(loop);
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
      px = py = -9999;
      kick();
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      document.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
      document.querySelectorAll<HTMLElement>('.btn-primary, [data-magnetic]').forEach((el) => {
        el.style.translate = '';
      });
    };
  }, []);

  return null;
}
