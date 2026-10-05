'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileText, Sparkles, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import ResumeModal from './resumemodal';

const NAV_ITEMS = [
  { label: 'Overview',   href: '#hero'       },
  { label: 'About',      href: '#about'      },
  { label: 'Projects',   href: '#projects'   },
  { label: 'Building',   href: '#building'   },
  { label: 'Skills',     href: '#skills'     },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact'    },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [scrolled, setScrolled]           = useState(false);
  const [mobileOpen, setMobileOpen]       = useState(false);
  const [resumeOpen, setResumeOpen]       = useState(false);

  // Scroll detection for backdrop styling
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Intersection observer for active section
  useEffect(() => {
    const ids = NAV_ITEMS.map((i) => i.href.replace('#', ''));
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3 }
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
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4 transition-all duration-300"
      >
        <div
          className={cn(
            'max-w-6xl mx-auto rounded-2xl transition-all duration-300 px-4 sm:px-6 h-16 flex items-center justify-between border',
            scrolled
              ? 'bg-[#060A17]/85 backdrop-blur-2xl border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.65)]'
              : 'bg-[#080D1A]/50 backdrop-blur-md border-white/5 shadow-none'
          )}
        >
          {/* ── Logo ───────────────────────────────────────────────── */}
          <motion.button
            onClick={() => handleNavClick('#hero')}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-3 group text-left cursor-pointer"
            aria-label="Go to top"
          >
            {/* Monogram mark with animated border glow */}
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 via-cyan-500/20 to-emerald-500/20 border border-white/15 shadow-sm group-hover:border-cyan-400/50 transition-colors">
              <span className="font-display font-extrabold text-sm text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
                MQ
              </span>
              <div className="absolute inset-0 rounded-xl bg-cyan-400/10 opacity-0 group-hover:opacity-100 blur-sm transition-opacity" />
            </div>

            {/* Name + Title */}
            <div className="hidden sm:flex flex-col">
              <span className="font-display font-bold text-sm tracking-tight text-white group-hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                Muhammad Qasim
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </span>
              <span className="text-[10px] text-text-muted font-medium tracking-wider uppercase">
                Full-stack &amp; Mobile Engineer
              </span>
            </div>
          </motion.button>

          {/* ── Desktop Nav Links ─────────────────────────────────────── */}
          <ul className="hidden md:flex items-center gap-1 bg-white/[0.03] p-1.5 rounded-xl border border-white/5">
            {NAV_ITEMS.map(({ label, href }) => {
              const isActive = activeSection === href.replace('#', '');
              return (
                <li key={href}>
                  <button
                    onClick={() => handleNavClick(href)}
                    className={cn(
                      'relative px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors duration-200 cursor-pointer',
                      isActive ? 'text-white font-semibold' : 'text-text-secondary hover:text-white'
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="active-nav-pill"
                        className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-600/30 to-cyan-600/30 border border-cyan-400/30 shadow-[0_0_15px_rgba(6,182,212,0.25)]"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* ── Desktop Right Actions ───────────────────────────────── */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Live Availability Badge */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-medium text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Open to work
            </div>

            {/* Resume button */}
            <motion.button
              onClick={() => setResumeOpen(true)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-outline text-xs py-2 px-3.5"
            >
              <FileText size={13} className="text-cyan-400" />
              Resume
            </motion.button>

            {/* Contact / Hire Me */}
            <motion.button
              onClick={() => handleNavClick('#contact')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary text-xs py-2 px-4.5"
            >
              <Send size={12} />
              Hire Me
            </motion.button>
          </div>

          {/* ── Mobile Hamburger ────────────────────────────────────── */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileOpen((p) => !p)}
            className="md:hidden text-text-secondary hover:text-white transition-colors p-2 rounded-lg bg-white/5 border border-white/10"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
      </motion.header>

      {/* ── Mobile Menu Drawer ────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-22 inset-x-4 z-40 bg-[#080D1A]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl p-5 md:hidden"
          >
            <div className="flex flex-col gap-1.5">
              {/* Nav links */}
              {NAV_ITEMS.map(({ label, href }) => {
                const isActive = activeSection === href.replace('#', '');
                return (
                  <button
                    key={href}
                    onClick={() => handleNavClick(href)}
                    className={cn(
                      'w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer',
                      isActive
                        ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/25 font-semibold'
                        : 'text-text-secondary hover:text-white hover:bg-white/5'
                    )}
                  >
                    {label}
                  </button>
                );
              })}

              <div className="my-2 h-px bg-white/10" />

              {/* Mobile Actions */}
              <div className="flex flex-col gap-2 pt-1">
                <button
                  onClick={() => { setMobileOpen(false); setResumeOpen(true); }}
                  className="btn-outline w-full justify-center text-sm py-2.5"
                >
                  <FileText size={14} className="text-cyan-400" />
                  View &amp; Download Resume
                </button>

                <button
                  onClick={() => handleNavClick('#contact')}
                  className="btn-primary w-full justify-center text-sm py-2.5"
                >
                  <Sparkles size={14} />
                  Hire Me / Get in Touch
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Resume Modal ─────────────────────────────────────────────── */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  );
}
