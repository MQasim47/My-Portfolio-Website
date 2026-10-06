'use client';

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import Image from 'next/image';
import { MonoLabel } from './ui';

interface DeviceFrameProps {
  title: string;
  images: string[];
  /** Controlled: the visible screen */
  index: number;
  onIndexChange: (i: number) => void;
}

const MOMENTUM_MS = 220; // how far a flick carries, in milliseconds of release velocity
const EASE = 0.18; // snap easing per frame
const RUBBER = 0.35; // resistance past the first/last screen

/**
 * A phone you can operate. The screenshots sit in a draggable track inside a CSS bezel
 * (1px --rule border, no marks, no notch).
 *
 *  - Pointer drag (mouse, touch, pen) with momentum and snap-to-screen
 *  - Horizontal trackpad swipes (wheel deltaX) step between screens
 *  - Arrow keys / Home / End when the frame has focus
 *  - Emerald dots are real buttons
 *  - No auto-advance, ever
 *
 * Only `transform` is written, and only once per animation frame; the rAF loop runs only
 * while a drag or a snap is in progress. Without JS the screen is a native scroll-snap strip.
 */
export default function DeviceFrame({ title, images, index, onIndexChange }: DeviceFrameProps) {
  const screenRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const s = useRef({
    x: 0,
    w: 0,
    dragging: false,
    startX: 0,
    startOff: 0,
    lastX: 0,
    lastT: 0,
    vx: 0,
    startIndex: 0,
    raf: 0,
    target: 0,
    wheelAcc: 0,
    wheelAt: 0,
  });
  const n = images.length;
  const indexRef = useRef(index);
  indexRef.current = index;

  const apply = useCallback(() => {
    if (trackRef.current) trackRef.current.style.transform = `translate3d(${s.current.x}px, 0, 0)`;
  }, []);

  const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Ease toward a screen. The loop exists only while the snap is in flight.
  const animateTo = useCallback(
    (i: number) => {
      const st = s.current;
      if (st.raf) cancelAnimationFrame(st.raf);
      st.target = -i * st.w;
      if (reduced()) {
        st.raf = 0;
        st.x = st.target;
        apply();
        return;
      }
      const step = () => {
        st.x += (st.target - st.x) * EASE;
        if (Math.abs(st.target - st.x) < 0.4) {
          st.x = st.target;
          st.raf = 0;
        } else {
          st.raf = requestAnimationFrame(step);
        }
        apply();
      };
      st.raf = requestAnimationFrame(step);
    },
    [apply]
  );

  const go = useCallback(
    (i: number) => {
      const next = Math.min(n - 1, Math.max(0, i));
      if (next !== indexRef.current) onIndexChange(next);
      else animateTo(next);
    },
    [n, onIndexChange, animateTo]
  );

  // measure; keep the current screen centred through resizes
  useLayoutEffect(() => {
    const el = screenRef.current;
    if (!el || n === 0) return;
    const measure = () => {
      const st = s.current;
      st.w = el.clientWidth;
      st.x = -indexRef.current * st.w;
      apply();
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [n, apply]);

  // external changes (dots, caption arrows, keyboard) animate the track
  useEffect(() => {
    if (!s.current.dragging && s.current.w) animateTo(index);
  }, [index, animateTo]);

  // horizontal trackpad swipe steps one screen (non-passive so it can stop browser back-swipe)
  useEffect(() => {
    const el = screenRef.current;
    if (!el || n < 2) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY) || Math.abs(e.deltaX) < 4) return;
      e.preventDefault();
      const st = s.current;
      st.wheelAcc += e.deltaX;
      if (Math.abs(st.wheelAcc) > 60 && e.timeStamp - st.wheelAt > 380) {
        st.wheelAt = e.timeStamp;
        const dir = st.wheelAcc > 0 ? 1 : -1;
        st.wheelAcc = 0;
        go(indexRef.current + dir);
      } else if (e.timeStamp - st.wheelAt > 380 && Math.abs(st.wheelAcc) > 400) {
        st.wheelAcc = 0;
      }
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [n, go]);

  useEffect(() => () => {
    if (s.current.raf) cancelAnimationFrame(s.current.raf);
  }, []);

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (n < 2 || (e.pointerType === 'mouse' && e.button !== 0)) return;
    const st = s.current;
    if (st.raf) cancelAnimationFrame(st.raf);
    st.raf = 0;
    st.dragging = true;
    st.startX = e.clientX;
    st.startOff = st.x;
    st.lastX = e.clientX;
    st.lastT = e.timeStamp;
    st.vx = 0;
    st.startIndex = indexRef.current;
    e.currentTarget.setPointerCapture(e.pointerId);
    e.currentTarget.dataset.dragging = 'true';
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const st = s.current;
    if (!st.dragging) return;
    let x = st.startOff + (e.clientX - st.startX);
    const min = -(n - 1) * st.w;
    if (x > 0) x *= RUBBER;
    else if (x < min) x = min + (x - min) * RUBBER;
    st.x = x;
    const dt = e.timeStamp - st.lastT;
    if (dt > 0) st.vx = 0.6 * st.vx + 0.4 * ((e.clientX - st.lastX) / dt);
    st.lastX = e.clientX;
    st.lastT = e.timeStamp;
    // one transform write per frame
    if (!st.raf) {
      st.raf = requestAnimationFrame(() => {
        st.raf = 0;
        apply();
      });
    }
  };

  const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    const st = s.current;
    if (!st.dragging) return;
    st.dragging = false;
    delete e.currentTarget.dataset.dragging;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
    if (st.raf) cancelAnimationFrame(st.raf);
    st.raf = 0;
    // momentum: project the release velocity, then snap to the nearest screen
    const projected = st.x + st.vx * MOMENTUM_MS;
    const target = Math.min(n - 1, Math.max(0, Math.round(-projected / st.w)));
    // a flick moves at most one screen from where the drag began (keeps it predictable)
    const bounded = Math.min(st.startIndex + 1, Math.max(st.startIndex - 1, target));
    if (bounded !== indexRef.current) onIndexChange(bounded);
    animateTo(bounded);
  };

  const onKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (n < 2) return;
    const k = e.key;
    if (k === 'ArrowRight') go(indexRef.current + 1);
    else if (k === 'ArrowLeft') go(indexRef.current - 1);
    else if (k === 'Home') go(0);
    else if (k === 'End') go(n - 1);
    else return;
    e.preventDefault();
  };

  // ── no screenshots yet: the same device, an empty screen ─────────────────
  if (n === 0) {
    return (
      <div className="device" role="img" aria-label={`${title} — screenshots coming soon`}>
        <div className="device-bezel">
          <div className="device-screen device-screen--empty">
            <div className="text-center">
              <p className="font-display text-title text-paper-inv">{title}</p>
              <MonoLabel as="p" className="mt-3 !text-ink-soft-inv">
                Screenshots coming soon
              </MonoLabel>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="device"
      role="group"
      aria-roledescription="carousel"
      aria-label={`${title} app screens. Drag, swipe, or use the left and right arrow keys.`}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <div className="device-bezel">
        <div
          ref={screenRef}
          className="device-screen"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <div ref={trackRef} className="device-track">
            {images.map((src, i) => (
              <div key={src} className="device-slide">
                <Image
                  src={src}
                  alt={`${title} screen ${i + 1} of ${n}`}
                  fill
                  sizes="260px"
                  className="object-cover"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {n > 1 && (
        <div className="device-dots" role="group" aria-label="Screens">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              className="device-dot"
              aria-label={`Show screen ${i + 1} of ${n}`}
              aria-current={i === index ? 'true' : undefined}
              onClick={() => go(i)}
            >
              <span aria-hidden="true" />
            </button>
          ))}
        </div>
      )}
      <span className="sr-only" aria-live="polite">{`Screen ${index + 1} of ${n}`}</span>
    </div>
  );
}
