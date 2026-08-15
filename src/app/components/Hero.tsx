'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail, Code2 } from 'lucide-react';
import Image from 'next/image';



const ROLES = ['DevOps Engineer', 'Full-Stack Developer', 'Flutter Dev', 'Cloud Architect'];

const socialLinks = [
  { href: ' https://github.com/MQasim47', icon: Github, label: 'GitHub' },        // GitHub URL
  { href: ' https://www.linkedin.com/in/rao-qasim-005821248/', icon: Linkedin, label: 'LinkedIn' },  //  LinkedIn URL
  { href: 'mailto:aslamqasim126@gmail.com', icon: Mail, label: 'Email' },        //  email
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// Animated prefix icon — cycles through tech symbols professionally
const PREFIX_SYMBOLS = ['◈', '▸', '⟡', '◆'];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [prefixIndex, setPrefixIndex] = useState(0);

  // Typewriter effect
  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && charIndex < currentRole.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), 80);
    } else if (!isDeleting && charIndex === currentRole.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), 45);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      const next = (roleIndex + 1) % ROLES.length;
      setRoleIndex(next);
      setPrefixIndex((p) => (p + 1) % PREFIX_SYMBOLS.length);
    }

    setDisplayText(currentRole.slice(0, charIndex));
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex]);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-16 overflow-hidden"
    >
      {/* Deep radial spotlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 65% at 50% 42%, rgba(15,61,46,0.28) 0%, transparent 68%)',
        }}
      />

      {/* Subtle horizontal scan line — purely decorative */}
      <motion.div
        animate={{ y: ['-100vh', '100vh'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear', repeatDelay: 4 }}
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(168,230,207,0.06), rgba(168,230,207,0.12), rgba(168,230,207,0.06), transparent)',
          zIndex: 1,
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center text-center max-w-3xl"
      >
        {/* ── Avatar ─────────────────────────────────────────────────────── */}
        <motion.div variants={itemVariants} className="mb-8">
          <motion.div
            whileHover={{ scale: 1.06 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="relative inline-block"
          >
            {/* Spinning conic ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-[-4px] rounded-full"
              style={{
                background:
                  'conic-gradient(from 0deg, transparent 0%, #A8E6CF 25%, #2E8B57 50%, transparent 75%)',
                borderRadius: '50%',
              }}
            />
            {/* Inner solid ring to mask */}
            <div
              className="absolute inset-[-1px] rounded-full"
              style={{ background: '#0A0A0A', borderRadius: '50%' }}
            />
            {/* Glow pulse */}
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-[-8px] rounded-full pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle, rgba(168,230,207,0.15) 0%, transparent 70%)',
              }}
            />
            {/* Avatar image */}
            <div
              className="relative w-28 h-28 rounded-full overflow-hidden z-10"
              style={{ border: '2px solid rgba(168,230,207,0.25)' }}
            >
            
              <Image
                src="/images/photo.jpeg"
                alt="Profile avatar"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </motion.div>

        {/* ── Online status badge ─────────────────────────────────────── */}
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-card-border bg-card text-xs font-semibold text-text-secondary tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
            Open to opportunities
          </span>
        </motion.div>

        {/* ── Name ────────────────────────────────────────────────────── */}
        <motion.h1
          variants={itemVariants}
          className="font-display font-extrabold mb-5"
          style={{ fontSize: 'clamp(2.4rem, 7vw, 4.5rem)', lineHeight: 1.08 }}
        >
         
          <span className="gradient-text">Muhammad Qasim</span>
        </motion.h1>

        {/* ── Typewriter row ──────────────────────────────────────────── */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-3 mb-6"
        >
          {/* Glowing prefix chip */}
          <motion.span
            key={prefixIndex}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'backOut' }}
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-base font-bold flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, #0F3D2E, #1a5c3a)',
              border: '1px solid rgba(168,230,207,0.3)',
              color: '#A8E6CF',
              boxShadow: '0 0 12px rgba(168,230,207,0.2)',
            }}
          >
            {PREFIX_SYMBOLS[prefixIndex]}
          </motion.span>

          {/* Typed text */}
          <span
            className="text-lg sm:text-xl font-semibold"
            style={{ color: '#E0E0E0', minWidth: '240px', textAlign: 'left' }}
          >
            {displayText}
            <span
              className="inline-block w-0.5 h-5 ml-0.5 align-middle animate-blink"
              style={{ background: '#A8E6CF' }}
            />
          </span>
        </motion.div>

        {/* ── Tech pills row ──────────────────────────────────────────── */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {['DevOps', 'Azure', 'Next.js', 'Flutter', 'Docker', 'CI/CD'].map((tag) => (
            <span key={tag} className="tech-tag text-[11px]">{tag}</span>
          ))}
        </motion.div>

        {/* ── Tagline ─────────────────────────────────────────────────── */}
        <motion.p
          variants={itemVariants}
          className="text-text-secondary text-base sm:text-lg max-w-xl leading-relaxed mb-10"
        >
          Building resilient cloud infrastructure, elegant web experiences, and
          cross-platform mobile apps — from CI/CD pipelines to pixel-perfect UIs.
        </motion.p>

        {/* ── CTA Buttons ─────────────────────────────────────────────── */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-4 mb-10"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo('projects')}
            className="btn-primary"
          >
            <Code2 size={16} />
            View Projects
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo('contact')}
            className="btn-outline"
          >
            Get in Touch
          </motion.button>
        </motion.div>

        {/* ── Social icons ────────────────────────────────────────────── */}
        <motion.div variants={itemVariants} className="flex items-center gap-4">
          {socialLinks.map(({ href, icon: Icon, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={label}
              className="w-10 h-10 rounded-xl bg-card border border-card-border flex items-center justify-center text-text-secondary hover:text-mint hover:border-accent-hover transition-colors duration-200"
            >
              <Icon size={16} />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Scroll cue ──────────────────────────────────────────────────── */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 7, 0] }}
        transition={{
          opacity: { delay: 2.2, duration: 0.6 },
          y: { delay: 2.2, duration: 1.8, repeat: Infinity, ease: 'easeInOut' },
        }}
        onClick={() => scrollTo('skills')}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-text-secondary hover:text-mint transition-colors"
        aria-label="Scroll down"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase font-semibold">Scroll</span>
        <ChevronDown size={18} />
      </motion.button>
    </section>
  );
}