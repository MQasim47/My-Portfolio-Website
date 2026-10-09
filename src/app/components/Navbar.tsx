'use client';

import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Menu, X, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
// Loaded on first open — keeps the modal and its animation code out of the first-load bundle.
const ResumeModal = dynamic(() => import('./resumemodal'));
import { Container } from './ui';
import ThemeToggle from './ThemeToggle';

const NAV_ITEMS = [
  { label: 'Overview', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Building', href: '#building' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [resumeEverOpened, setResumeEverOpened] = useState(false);
  // Sliding underline: one element, positioned with transform only (translateX + scaleX).
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<Record<string, HTMLLIElement | null>>({});
  const [underline, setUnderline] = useState<{ x: number; w: number } | null>(null);

  useLayoutEffect(() => {
    const measure = () => {
      const li = itemRefs.current[activeSection];
      const ul = listRef.current;
      if (!li || !ul || ul.offsetParent === null) return;
      setUnderline({ x: li.offsetLeft, w: li.offsetWidth });
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [activeSection]);

  const openResume = () => {
    setResumeEverOpened(true);
    setResumeOpen(true);
  };

  // Scroll detection for the hairline under the bar
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Intersection observer for the active section
  useEffect(() => {
    const ids = NAV_ITEMS.map((i) => i.href.replace('#', ''));
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        // Active when the section crosses the middle of the viewport (works for sections
        // taller than the viewport, e.g. the 300vh hero and the project bands).
        { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Escape closes the mobile menu
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          'page-bg fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)]',
          scrolled ? 'border-b border-rule' : 'border-b border-transparent'
        )}
      >
        <Container className="flex h-16 items-center justify-between">
          <a
            href="#hero"
            data-magnetic
            onClick={() => setMobileOpen(false)}
            className="flex min-h-[44px] items-center gap-3"
            aria-label="Muhammad Qasim — go to top"
          >
            <span className="nav-mark font-display text-[1.375rem] leading-none text-ink">MQ</span>
            <span className="hidden flex-col sm:flex">
              <span className="text-body font-semibold leading-tight text-ink">Muhammad Qasim</span>
              <span className="font-mono text-mono-s uppercase text-ink-soft">
                Full-stack &amp; Mobile Developer
              </span>
            </span>
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul ref={listRef} className="relative flex items-center gap-1">
              {NAV_ITEMS.map(({ label, href }) => {
                const isActive = activeSection === href.replace('#', '');
                return (
                  <li
                    key={href}
                    ref={(el) => {
                      itemRefs.current[href.replace('#', '')] = el;
                    }}
                  >
                    <a
                      href={href}
                      aria-current={isActive ? 'true' : undefined}
                      className={cn(
                        'inline-flex min-h-[44px] items-center px-3 text-caption font-medium transition-colors duration-[var(--dur-instant)]',
                        isActive ? 'text-accent' : 'text-ink-soft hov:text-ink'
                      )}
                    >
                      {label}
                    </a>
                  </li>
                );
              })}
              <span
                className="nav-underline"
                aria-hidden="true"
                style={{
                  opacity: underline ? 1 : 0,
                  transform: underline ? `translateX(${underline.x}px) scaleX(${underline.w})` : undefined,
                }}
              />
            </ul>
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <ThemeToggle />
            <button onClick={openResume} className="btn-outline py-2 text-caption">
              <FileText size={14} />
              Resume
            </button>
            <a href="#contact" className="btn-primary py-2 text-caption">
              Hire me
            </a>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen((p) => !p)}
              className="flex h-11 w-11 items-center justify-center rounded border border-rule text-ink"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </Container>
      </header>

      {mobileOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-x-0 top-16 z-40 border-b border-rule bg-paper px-[var(--page-margin)] pb-6 pt-2 lg:hidden"
        >
          <nav aria-label="Mobile">
            <ul className="flex flex-col">
              {NAV_ITEMS.map(({ label, href }) => {
                const isActive = activeSection === href.replace('#', '');
                return (
                  <li key={href} className="border-b border-rule">
                    <a
                      href={href}
                      onClick={() => setMobileOpen(false)}
                      aria-current={isActive ? 'true' : undefined}
                      className={cn(
                        'flex min-h-[48px] items-center text-body-l',
                        isActive ? 'text-accent' : 'text-ink'
                      )}
                    >
                      {label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="mt-5 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileOpen(false);
                openResume();
              }}
              className="btn-outline w-full justify-center"
            >
              <FileText size={14} />
              View &amp; download resume
            </button>
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="btn-primary w-full justify-center"
            >
              Hire me
            </a>
          </div>
        </div>
      )}

      {resumeEverOpened && (
        <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
      )}
    </>
  );
}
