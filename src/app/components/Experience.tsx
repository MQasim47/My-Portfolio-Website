'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, CheckCircle2, ExternalLink, Calendar } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

// Source: resume.pdf. Only claims present on the resume are kept.
const experiences = [
  {
    id: 'flacron',
    company: 'Flacron Enterprises LLC',
    companyUrl: 'https://flacronenterprises.com/',
    role: 'DevOps Engineer',
    period: '2025 — Present',
    badge: 'Current Role',
    highlights: [
      'Deploy and manage applications on AWS and Microsoft Azure.',
      'Build and maintain CI/CD pipelines for automated software delivery.',
      'Developed and deployed the live Flacron GameZone website from scratch to production.',
      'Work with the development team to streamline deployment workflows.',
      'Handle client communication and deliver updates directly to stakeholders.',
    ],
  },
];

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
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.65,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="card relative p-6 sm:p-8 overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-6">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600/30 to-cyan-600/30 border border-cyan-400/30 flex items-center justify-center text-cyan-400 flex-shrink-0">
            <Briefcase size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-bold text-lg sm:text-xl text-white">
                {exp.company}
              </h3>
              <a
                href={exp.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-cyan-400 transition-colors"
                aria-label={`Visit ${exp.company}`}
              >
                <ExternalLink size={14} />
              </a>
            </div>
            <p className="text-cyan-400 font-medium text-sm mt-0.5">{exp.role}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-text-muted">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
            <Calendar size={12} className="text-cyan-400" />
            {exp.period}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            {exp.badge}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {exp.highlights.map((point) => (
          <div key={point} className="flex items-start gap-3">
            <CheckCircle2 size={16} className="text-cyan-400 flex-shrink-0 mt-1" />
            <p className="text-text-secondary text-sm leading-relaxed">{point}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <AnimatedSection id="experience" eyebrow="Career Journey" heading="Experience">
      <div className="max-w-3xl mx-auto">
        {experiences.map((exp, i) => (
          <TimelineEntry key={exp.id} exp={exp} index={i} />
        ))}
      </div>
    </AnimatedSection>
  );
}
