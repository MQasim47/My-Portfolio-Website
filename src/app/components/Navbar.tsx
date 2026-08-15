'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import ResumeModal from './resumemodal';

const NAV_ITEMS = [
  { label: 'Home',       href: '#hero'       },
  { label: 'Skills',     href: '#skills'     },
  { label: 'Projects',   href: '#projects'   },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact'    },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [scrolled, setScrolled]           = useState(false);
  const [mobileOpen, setMobileOpen]       = useState(false);
  const [resumeOpen, setResumeOpen]       = useState(false);

  // Scroll → blur background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section highlight
  useEffect(() => {
    const ids = NAV_ITEMS.map((i) => i.href.replace('#', ''));
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.getElementById(href.replace('#', ''));
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-background/80 backdrop-blur-xl border-b border-card-border shadow-[0_4px_30px_rgba(0,0,0,0.35)]'
            : 'bg-transparent'
        )}
      >
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

          {/* ── Logo ───────────────────────────────────────────────── */}
          <motion.button
            onClick={() => handleNavClick('#hero')}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2.5 group"
            aria-label="Go to top"
          >
            {/* Monogram mark */}
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center font-display font-extrabold text-sm transition-shadow duration-300 group-hover:shadow-glow-mint"
              style={{
                background: 'linear-gradient(135deg, #0F3D2E 0%, #1a5c3a 100%)',
                border: '1px solid rgba(168,230,207,0.25)',
                color: '#A8E6CF',
                letterSpacing: '-0.02em',
              }}
            >
              MQ
            </div>
            {/* Name — hides on very small screens */}
            <span className="hidden sm:block font-display font-bold text-base leading-none">
              <span className="gradient-text">Muhammad Qasim</span>
            </span>
          </motion.button>

          {/* ── Desktop nav ─────────────────────────────────────────── */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map(({ label, href }) => {
              const isActive = activeSection === href.replace('#', '');
              return (
                <li key={href}>
                  <motion.button
                    onClick={() => handleNavClick(href)}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.96 }}
                    className={cn(
                      'relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200',
                      isActive ? 'text-mint' : 'text-text-secondary hover:text-text-primary'
                    )}
                  >
                    {label}
                    <AnimatePresence>
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          initial={{ scaleX: 0, opacity: 0 }}
                          animate={{ scaleX: 1, opacity: 1 }}
                          exit={{ scaleX: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-mint"
                        />
                      )}
                    </AnimatePresence>
                  </motion.button>
                </li>
              );
            })}
          </ul>

          {/* ── Desktop right actions ───────────────────────────────── */}
          <div className="hidden md:flex items-center gap-2">
            {/* Resume button */}
            <motion.button
              onClick={() => setResumeOpen(true)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="btn-outline text-xs py-2 px-4"
            >
              <FileText size={13} />
              Resume
            </motion.button>

            {/* Hire Me */}
            <motion.button
              onClick={() => handleNavClick('#contact')}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary text-xs py-2 px-5"
            >
              Hire Me
            </motion.button>
          </div>

          {/* ── Hamburger ───────────────────────────────────────────── */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileOpen((p) => !p)}
            className="md:hidden text-text-secondary hover:text-mint transition-colors p-2"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </motion.button>
        </nav>
      </motion.header>

      {/* ── Mobile drawer ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="fixed top-16 inset-x-0 z-40 bg-background/95 backdrop-blur-xl border-b border-card-border md:hidden"
          >
            <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
              {/* Nav links */}
              {NAV_ITEMS.map(({ label, href }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.055 }}
                >
                  <button
                    onClick={() => handleNavClick(href)}
                    className={cn(
                      'w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200',
                      activeSection === href.replace('#', '')
                        ? 'text-mint bg-card border border-card-border'
                        : 'text-text-secondary hover:text-text-primary hover:bg-card/50'
                    )}
                  >
                    {label}
                  </button>
                </motion.div>
              ))}

              {/* Divider */}
              <div className="my-1 h-px bg-card-border" />

              {/* Resume */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: NAV_ITEMS.length * 0.055 }}
              >
                <button
                  onClick={() => { setMobileOpen(false); setResumeOpen(true); }}
                  className="btn-outline w-full justify-center text-sm py-2.5"
                >
                  <FileText size={14} />
                  View / Download Resume
                </button>
              </motion.div>

              {/* Hire Me */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (NAV_ITEMS.length + 1) * 0.055 }}
              >
                <button
                  onClick={() => handleNavClick('#contact')}
                  className="btn-primary w-full justify-center text-sm py-2.5"
                >
                  Hire Me
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Resume Modal ────────────────────────────────────────────────── */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  );
}
