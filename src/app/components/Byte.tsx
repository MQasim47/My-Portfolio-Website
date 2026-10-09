/**
 * Byte, the mascot from the Unknot app, drawn in this site's language: 1.5px strokes, no fills
 * on the shapes, the theme's ink at 65%, and one spot of accent (the antenna dot).
 * Motion lives in globals.css under ".splash-run" (strokes draw, eyes fade in, the dot
 * pulses once, one blink); the figure is otherwise still.
 *
 * Coordinates are in px at the 96px-tall desktop size (viewBox 72 x 88, drawn at 96).
 */
export default function Byte({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 72 88"
      fill="none"
      aria-hidden="true"
      focusable="false"
      overflow="visible"
    >
      <g className="byte-ink" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {/* antenna: ~18px rising from the top centre */}
        <path className="byte-stroke" pathLength={1} d="M36 24V6" />
        {/* head: the design system's largest radius, no fill */}
        <rect className="byte-stroke" pathLength={1} x="14" y="24" width="44" height="34" rx="10" />
        {/* body */}
        <rect className="byte-stroke" pathLength={1} x="22" y="62" width="28" height="22" rx="8" />
        {/* arms: short, angling down and out */}
        <path className="byte-stroke" pathLength={1} d="M22 69L13 79" />
        <path className="byte-stroke" pathLength={1} d="M50 69L59 79" />
        {/* eyes: upper third of the head, set slightly wide */}
        <g className="byte-eyes" fill="currentColor" stroke="none">
          <circle className="byte-eye" cx="27" cy="35" r="2.6" />
          <circle className="byte-eye" cx="45" cy="35" r="2.6" />
        </g>
      </g>
      {/* the one accent-coloured element */}
      <circle className="byte-dot" cx="36" cy="4" r="3" fill="var(--accent)" />
    </svg>
  );
}
