'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

type Theme = 'light' | 'dark';

/**
 * Light/dark toggle. The system preference is the default; clicking sets an explicit
 * data-theme on <html> and persists it. The pre-paint script in layout.tsx applies a
 * saved choice before first paint, so there is no flash of the wrong theme.
 */
export default function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const read = (): Theme => {
      const explicit = root.getAttribute('data-theme');
      if (explicit === 'light' || explicit === 'dark') return explicit;
      return mq.matches ? 'dark' : 'light';
    };
    setTheme(read());
    // Follow the system while the user has not chosen.
    const onChange = () => {
      if (!root.hasAttribute('data-theme')) setTheme(read());
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* storage unavailable (private mode, blocked) — the choice just won't persist */
    }
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      className={
        'flex h-11 w-11 shrink-0 items-center justify-center rounded border border-rule text-ink hov:border-accent hov:text-accent ' +
        (className ?? '')
      }
    >
      {theme === 'dark' ? <Sun size={18} aria-hidden="true" /> : theme === 'light' ? <Moon size={18} aria-hidden="true" /> : <span className="h-[18px] w-[18px]" aria-hidden="true" />}
    </button>
  );
}
