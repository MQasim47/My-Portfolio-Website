/** @type {import('tailwindcss').Config} */
// Every value here reads from the CSS custom properties in src/app/globals.css.
// That file is the single source of truth â€” never add a literal color here.
module.exports = {
  // hover: variants only apply on devices that can hover — touch gets none.
  future: { hoverOnlyWhenSupported: true },
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      paper: 'var(--paper)',
      'paper-2': 'var(--paper-2)',
      ink: 'var(--ink)',
      'ink-soft': 'var(--ink-soft)',
      rule: 'var(--rule)',
      accent: 'var(--accent)',
      'accent-deep': 'var(--accent-deep)',
      'accent-wash': 'var(--accent-wash)',
      terminal: 'var(--terminal)',
      panel: 'var(--panel)',
      'panel-rule': 'var(--panel-rule)',
      'paper-inv': 'var(--paper-inv)',
      'ink-soft-inv': 'var(--ink-soft-inv)',
      signal: 'var(--signal)',
      pass: 'var(--pass)',
      warn: 'var(--warn)',
      fail: 'var(--fail)',
    },
    // Radius: 0 for rules and full-bleed media, 3px for chips/inputs/buttons,
    // 10px for cards and modals. Nothing else.
    borderRadius: {
      none: '0',
      DEFAULT: '3px',
      card: '10px',
      // Status dots only (a circle is the one unavoidable exception).
      dot: '50%',
    },
    // Exactly two shadows exist.
    boxShadow: {
      none: 'none',
      lift: 'var(--shadow-lift)',
      overlay: 'var(--shadow-overlay)',
    },
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(5rem, 22vw, 19rem)', { lineHeight: '0.78', fontWeight: '400' }],
        'display-l': ['clamp(2.1rem, 5.6vw, 4.2rem)', { lineHeight: '1', fontWeight: '400' }],
        'display-m': ['clamp(1.6rem, 4vw, 2.6rem)', { lineHeight: '1.1', fontWeight: '400' }],
        title: ['1.375rem', { lineHeight: '1.3', fontWeight: '600' }],
        'body-l': ['1.0625rem', { lineHeight: '1.65' }],
        body: ['0.9375rem', { lineHeight: '1.65' }],
        caption: ['0.8125rem', { lineHeight: '1.5' }],
        'mono-m': ['0.8125rem', { lineHeight: '1.5', letterSpacing: '0.02em' }],
        'mono-s': ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.14em', fontWeight: '500' }],
      },
      maxWidth: {
        page: '1240px',
      },
    },
  },
  plugins: [],
};
