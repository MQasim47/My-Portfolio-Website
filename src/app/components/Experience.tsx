'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Briefcase, CheckCircle2, ExternalLink, Calendar,
  MapPin, ShieldCheck, Zap, Server, Award
} from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const experiences = [
  {
    id: 'flacron',
    company: 'Flacron Enterprises LLC',
    companyUrl: 'https://flacronenterprises.com/',
    role: 'Senior DevOps & Full-Stack Developer',
    period: '2023 — Present',
    location: 'Remote · Enterprise Cloud Client Projects',
    badge: 'Current Role',
    impactMetrics: [
      { label: 'Uptime Maintained', value: '99.99%' },
      { label: 'CI/CD Deploy Time', value: '< 3m' },
      { label: 'Cloud Infrastructure', value: 'Azure & IBM' },
    ],
    highlights: [
      'Architecting and maintaining cloud infrastructure with automated CI/CD pipelines, reducing manual deployment overhead by over 70%.',
      'Containerizing multi-tier microservices using Docker and managing deployments on Azure App Service and Kubernetes with automated rolling updates.',
      'Developing and deploying end-to-end full-stack web applications with Next.js, Node.js REST APIs, and high-concurrency database schemas.',
      'Configuring proactive monitoring, alerting, and logging pipelines with Prometheus and Grafana to ensure zero-downtime reliability.',
      'Directly collaborating with stakeholders and cross-functional teams to translate complex business requirements into resilient technical architectures.',
    ],
    techStack: [
      'Azure App Service', 'Docker', 'Kubernetes', 'Terraform',
      'GitHub Actions', 'Next.js 14', 'TypeScript', 'Node.js',
      'REST APIs', 'Prometheus', 'Grafana'
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
      className="card relative p-6 sm:p-8 overflow-hidden group hover:border-cyan-400/40 hover:shadow-glow-cyan transition-all"
    >
      {/* Decorative ambient corner glow */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-gradient-to-bl from-indigo-500/10 via-cyan-500/5 to-transparent blur-3xl pointer-events-none" />

      {/* Top Bar: Company & Role */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-6">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600/30 to-cyan-600/30 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shadow-sm flex-shrink-0">
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
            <p className="text-cyan-400 font-medium text-sm mt-0.5">
              {exp.role}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-text-muted">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
            <Calendar size={12} className="text-cyan-400" />
            {exp.period}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {exp.badge}
          </span>
        </div>
      </div>

      {/* Impact Metric Chips */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {exp.impactMetrics.map((metric) => (
          <div
            key={metric.label}
            className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center sm:text-left"
          >
            <p className="font-display font-extrabold text-base text-white">
              {metric.value}
            </p>
            <p className="text-[11px] text-text-muted mt-0.5">
              {metric.label}
            </p>
          </div>
        ))}
      </div>

      {/* Responsibilities & Achievements */}
      <div className="space-y-3 mb-6">
        {exp.highlights.map((point) => (
          <div key={point} className="flex items-start gap-3">
            <CheckCircle2 size={16} className="text-cyan-400 flex-shrink-0 mt-1" />
            <p className="text-text-secondary text-sm leading-relaxed">
              {point}
            </p>
          </div>
        ))}
      </div>

      {/* Technologies Used Strip */}
      <div className="pt-5 border-t border-white/5">
        <p className="text-[11px] font-mono text-text-muted uppercase tracking-wider mb-2.5 font-semibold">
          Stack Deployed:
        </p>
        <div className="flex flex-wrap gap-1.5">
          {exp.techStack.map((tech) => (
            <span key={tech} className="tech-tag text-[11px]">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <AnimatedSection
      id="experience"
      eyebrow="Career Journey"
      heading="Professional Experience"
    >
      <div className="max-w-3xl mx-auto">
        {experiences.map((exp, i) => (
          <TimelineEntry key={exp.id} exp={exp} index={i} />
        ))}
      </div>
    </AnimatedSection>
  );
}