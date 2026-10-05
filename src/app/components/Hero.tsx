'use client';

import { motion } from 'motion/react';
import { Mail, ArrowRight, Download } from 'lucide-react';
import Image from 'next/image';
import { Container, MonoLabel, StatusDot } from './ui';
import { GithubIcon, LinkedinIcon } from './ui/BrandIcons';

const socialLinks = [
  { href: 'https://github.com/MQasim47', icon: GithubIcon, label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/rao-qasim-005821248/', icon: LinkedinIcon, label: 'LinkedIn' },
  { href: 'mailto:aslamqasim126@gmail.com', icon: Mail, label: 'Email' },
];

export default function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-title" className="bg-paper pt-32 pb-8 sm:pt-40">
      <Container>
        <div className="flex max-w-3xl flex-col items-start text-left">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <StatusDot
              status="live"
              label="Open to internships, junior roles and project work"
              className="text-ink"
            />
          </motion.div>

          <div className="mb-6 flex items-center gap-4">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded border border-rule">
              <Image
                src="/images/photo.jpeg"
                alt="Muhammad Qasim"
                fill
                sizes="80px"
                className="object-cover"
                priority
              />
            </div>
            <div>
              <p className="text-title text-ink">Muhammad Qasim</p>
              <MonoLabel as="p" className="mt-1 normal-case tracking-normal">
                Software Engineering student at QUEST · Flacron Enterprises LLC
              </MonoLabel>
            </div>
          </div>

          <h1 id="hero-title" className="mb-6 font-display text-display-l text-ink">
            Full-stack &amp; mobile engineer
          </h1>

          <p className="mb-10 max-w-xl text-body-l text-ink-soft">
            I build web and Flutter mobile products and ship them to real users, then run the
            infrastructure myself — first commit to production.
          </p>

          <div className="mb-10 flex w-full flex-wrap items-center gap-3 sm:w-auto">
            <a href="#projects" className="btn-primary group justify-center">
              <span>Explore Projects</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#contact" className="btn-outline justify-center">
              Let&apos;s Connect
            </a>
            <a href="/resume.pdf" download="Muhammad_Qasim_CV.pdf" className="btn-ghost">
              <Download size={14} />
              Resume (PDF)
            </a>
          </div>

          <div className="flex items-center gap-4">
            <MonoLabel>Connect</MonoLabel>
            <div className="flex items-center gap-2">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded border border-rule text-ink-soft transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
