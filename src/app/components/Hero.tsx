'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowRight, Sparkles, Download } from 'lucide-react';
import Image from 'next/image';

const socialLinks = [
  { href: 'https://github.com/MQasim47', icon: Github, label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/rao-qasim-005821248/', icon: Linkedin, label: 'LinkedIn' },
  { href: 'mailto:aslamqasim126@gmail.com', icon: Mail, label: 'Email' },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-28 pb-16 overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 20%, rgba(99, 102, 241, 0.12) 0%, rgba(6, 182, 212, 0.05) 40%, transparent 75%)',
        }}
      />

      <div className="relative z-10 max-w-6xl w-full mx-auto">
        <div className="flex flex-col items-start text-left max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-xs font-semibold text-emerald-400"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Open to internships, junior roles and project work
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-4 mb-5"
          >
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden p-0.5 bg-gradient-to-tr from-indigo-500 via-cyan-400 to-emerald-400">
              <div className="relative w-full h-full rounded-[14px] overflow-hidden bg-background">
                <Image
                  src="/images/photo.jpeg"
                  alt="Muhammad Qasim"
                  fill
                  sizes="80px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <div>
              <p className="text-lg sm:text-xl font-bold font-display text-white tracking-tight">
                Muhammad Qasim
              </p>
              <p className="text-xs text-text-muted mt-0.5">
                Software Engineering student at QUEST · Working at{' '}
                <span className="text-cyan-400 font-medium">Flacron Enterprises LLC</span>
              </p>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.1] mb-5 tracking-tight"
          >
            Full-stack &amp; mobile engineer
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-xl mb-8"
          >
            I build web and Flutter mobile products and ship them to real users, then run the
            infrastructure myself — first commit to production.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-3.5 mb-10 w-full sm:w-auto"
          >
            <a href="#projects" className="btn-primary flex-1 sm:flex-none justify-center group">
              <span>Explore Projects</span>
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </a>

            <a href="#contact" className="btn-outline flex-1 sm:flex-none justify-center">
              <Sparkles size={14} className="text-cyan-400" />
              <span>Let&apos;s Connect</span>
            </a>

            <a
              href="/resume.pdf"
              download="Muhammad_Qasim_CV.pdf"
              className="btn-ghost px-3.5 py-2.5 text-xs text-text-secondary hover:text-white border border-white/5 rounded-xl flex items-center gap-1.5"
            >
              <Download size={13} />
              <span>Resume (PDF)</span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center gap-4 text-xs text-text-muted"
          >
            <span>Connect:</span>
            <div className="flex items-center gap-2">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-text-secondary hover:text-cyan-400 hover:border-cyan-400/40 transition-all"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
