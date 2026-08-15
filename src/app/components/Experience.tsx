'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, CheckCircle2, ExternalLink } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

// ─────────────────────────────────────────────────────────────────────────────
// Experience data — Flacron Enterprises LLC
// ─────────────────────────────────────────────────────────────────────────────
const experiences = [
  {
    id: 'flacron',
    company: 'Flacron Enterprises LLC',
    companyUrl: 'https://flacronenterprises.com/',
    role: 'DevOps & Full-Stack Developer',
    badge: 'Current',
    highlights: [
      'Architecting and maintaining cloud infrastructure with full CI/CD pipelines, enabling fast and reliable deployments across environments.',
      'Building and shipping full-stack web applications end-to-end — from UI design to backend APIs and production deployment.',
      'Containerising services with Docker and managing deployments, ensuring consistent and scalable environments.',
      'Collaborating directly with stakeholders to translate business requirements into robust technical solutions.',
      'Setting up monitoring, alerting, and logging pipelines to maintain high availability and proactively catch issues.',
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// TimelineEntry
// ─────────────────────────────────────────────────────────────────────────────
function TimelineEntry({
  exp,
  index,
}: {
  exp: (typeof experiences)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{
        duration: 0.65,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="relative flex gap-6 sm:gap-8"
    >
      {/* Left: animated dot */}
      <div className="flex flex-col items-center flex-shrink-0">
        <motion.div
          animate={
            isInView
              ? {
                  scale: 1,
                  backgroundColor: '#A8E6CF',
                  boxShadow: '0 0 18px rgba(168,230,207,0.6)',
                }
              : { scale: 0.4, backgroundColor: '#0F3D2E', boxShadow: 'none' }
          }
          transition={{ duration: 0.5, delay: 0.25 }}
          className="w-4 h-4 rounded-full border-2 border-card-border z-10 mt-1"
        />
        <div
          className="w-0.5 flex-1 mt-2 rounded-full"
          style={{
            background: 'linear-gradient(to bottom, rgba(168,230,207,0.3), transparent)',
            minHeight: '40px',
          }}
        />
      </div>

      {/* Right: content */}
      <div className="pb-4 flex-1">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <span className="w-9 h-9 rounded-xl bg-card border border-card-border flex items-center justify-center flex-shrink-0">
            <Briefcase size={15} className="text-mint" />
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-0.5">
              <h3 className="font-display font-bold text-text-primary text-base leading-tight">
                {exp.company}
              </h3>
              <a
                href={exp.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-mint transition-colors"
                aria-label={`Visit ${exp.company}`}
              >
                <ExternalLink size={13} />
              </a>
              {exp.badge && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-card border border-card-border text-mint">
                  <span className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse" />
                  {exp.badge}
                </span>
              )}
            </div>
            <p className="text-mint text-sm font-semibold">{exp.role}</p>
          </div>
        </div>

        {/* Highlights */}
        <div className="card p-5 space-y-3.5">
          {exp.highlights.map((point) => (
            <div key={point} className="flex items-start gap-3">
              <CheckCircle2 size={15} className="text-mint flex-shrink-0 mt-0.5" />
              <p className="text-text-secondary text-sm leading-relaxed">{point}</p>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="mt-4 h-px origin-left rounded-full"
          style={{ background: 'linear-gradient(90deg, rgba(168,230,207,0.4), transparent)' }}
        />
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section
// ─────────────────────────────────────────────────────────────────────────────
export default function Experience() {
  return (
    <AnimatedSection id="experience" eyebrow="Where I work" heading="Experience">
      <div className="max-w-2xl mx-auto">
        {experiences.map((exp, i) => (
          <TimelineEntry key={exp.id} exp={exp} index={i} />
        ))}
      </div>
    </AnimatedSection>
  );
}