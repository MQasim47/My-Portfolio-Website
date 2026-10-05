'use client';

import {
  createElement,
  Fragment,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
} from 'react';

interface SplitLinesProps {
  text: string;
  as?: ElementType;
  className?: string;
  id?: string;
}

/**
 * Splits a string into its visual lines, each inside an overflow-hidden mask (.line) so it
 * can rise out of the page when the surrounding [data-reveal-group] enters.
 *
 * Without JS (and on the server) the text renders plainly and is fully visible. After mount
 * the lines are measured and wrapped; they are re-measured on width change and once fonts load.
 */
export default function SplitLines({ text, as = 'span', className, id }: SplitLinesProps) {
  const ref = useRef<HTMLElement>(null);
  const widthRef = useRef(0);
  const [lines, setLines] = useState<string[] | null>(null);

  // measure mode: the words are rendered as spans; group them by their vertical position
  useLayoutEffect(() => {
    if (lines !== null) return;
    const el = ref.current;
    if (!el) return;
    const words = Array.from(el.querySelectorAll<HTMLElement>('[data-w]'));
    if (!words.length) return;
    const grouped: string[] = [];
    let top = Number.NaN;
    for (const w of words) {
      const t = Math.round(w.offsetTop);
      if (t !== top) {
        grouped.push(w.textContent ?? '');
        top = t;
      } else {
        grouped[grouped.length - 1] += ` ${w.textContent ?? ''}`;
      }
    }
    widthRef.current = el.clientWidth;
    setLines(grouped);
  }, [lines, text]);

  // re-split when the width changes, and once webfonts have loaded (line breaks shift)
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const resplit = () => setLines(null);
    const ro = new ResizeObserver(() => {
      if (el.clientWidth !== widthRef.current && widthRef.current !== 0) resplit();
    });
    ro.observe(el);
    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) resplit();
    });
    return () => {
      cancelled = true;
      ro.disconnect();
    };
  }, [text]);

  const children =
    lines === null
      ? text.split(' ').map((w, i, all) => (
          <Fragment key={i}>
            <span data-w>{w}</span>
            {i < all.length - 1 ? ' ' : null}
          </Fragment>
        ))
      : lines.map((l, i) => (
          <span className="line" key={`${i}-${l}`}>
            <span className="line-inner" style={{ '--i': i } as CSSProperties}>
              {l}
            </span>
          </span>
        ));

  return createElement(as, { ref, id, className }, children);
}
