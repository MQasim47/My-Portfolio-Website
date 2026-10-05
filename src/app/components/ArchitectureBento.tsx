'use client';

import { motion } from 'framer-motion';
import {
  Cloud, Server, Smartphone, ShieldCheck,
  CheckCircle2, ArrowRight
} from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const PILLARS = [
  {
    id: 'cloud',
    title: 'Cloud Infrastructure & IaC Automation',
    badge: 'Core Competency',
    category: 'DevOps & Systems',
    description:
      'Designing scalable, multi-cloud platforms on Azure and IBM Cloud with Terraform, Kubernetes, and automated GitHub Actions pipelines ensuring zero-downtime releases.',
    icon: Cloud,
    gradient: 'from-cyan-500/20 via-indigo-500/10 to-transparent',
    borderColor: 'group-hover:border-cyan-400/40',
    stats: [
      { label: 'Uptime Standard', value: '99.99%' },
      { label: 'Deploy Time', value: '< 3 mins' },
      { label: 'Platforms', value: 'Azure · IBM' },
    ],
    features: [
      'Terraform Infrastructure as Code (IaC)',
      'Automated Blue/Green & Rolling Deployments',
      'Docker Containerization & Kubernetes Clusters',
      'Multi-cloud resilience & auto-scaling',
    ],
    colSpan: 'lg:col-span-8',
  },
  {
    id: 'fullstack',
    title: 'Modern Full-Stack Applications',
    badge: 'Production Grade',
    category: 'Web Engineering',
    description:
      'Developing responsive, SEO-optimized web applications with Next.js 14 App Router, TypeScript, and high-concurrency Node.js REST & GraphQL APIs.',
    icon: Server,
    gradient: 'from-indigo-500/20 via-purple-500/10 to-transparent',
    borderColor: 'group-hover:border-indigo-400/40',
    stats: [
      { label: 'Framework', value: 'Next.js 14' },
      { label: 'Language', value: 'TypeScript' },
      { label: 'Speed', value: 'Sub-second' },
    ],
    features: [
      'Server-Side Rendering (SSR) & Streaming',
      'Robust Type-Safe Architecture',
      'REST & GraphQL API design with Node.js',
      'Tailwind CSS & Framer Motion micro-interactions',
    ],
    colSpan: 'lg:col-span-4',
  },
  {
    id: 'mobile',
    title: 'Cross-Platform Mobile Engineering',
    badge: 'Mobile First',
    category: 'Flutter & Dart',
    description:
      'Building performant, native-feeling mobile applications for iOS and Android with Flutter, Riverpod state management, and real-time Firebase services.',
    icon: Smartphone,
    gradient: 'from-emerald-500/20 via-cyan-500/10 to-transparent',
    borderColor: 'group-hover:border-emerald-400/40',
    stats: [
      { label: 'Engine', value: 'Flutter/Dart' },
      { label: 'Frame Rate', value: '60 FPS' },
      { label: 'Sync', value: 'Real-time' },
    ],
    features: [
      'Single codebase for iOS & Android',
      'Riverpod & BLoC state architecture',
      'Offline-first caching (Hive) & local storage',
      'Firebase Authentication, Firestore & Cloud Messaging',
    ],
    colSpan: 'lg:col-span-5',
  },
  {
    id: 'security',
    title: 'Enterprise Observability & Security',
    badge: 'Reliability',
    category: 'SRE & Monitoring',
    description:
      'Proactive system health tracking with Prometheus, Grafana dashboards, automated rollback triggers, and container image vulnerability scans.',
    icon: ShieldCheck,
    gradient: 'from-violet-500/20 via-indigo-500/10 to-transparent',
    borderColor: 'group-hover:border-violet-400/40',
    stats: [
      { label: 'Monitoring', value: 'Prometheus' },
      { label: 'Alerting', value: 'Proactive' },
      { label: 'Auditing', value: 'Automated' },
    ],
    features: [
      'Prometheus metric scrapers & Grafana dashboards',
      'Container vulnerability analysis (Trivy)',
      'Automated rollback upon health-check degradation',
      'SSL/TLS certificate automation & HTTPS hardening',
    ],
    colSpan: 'lg:col-span-7',
  },
];

export default function ArchitectureBento() {
  return (
    <AnimatedSection
      id="pillars"
      eyebrow="Engineering Disciplines"
      heading="Enterprise Architecture Pillars"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {PILLARS.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <motion.div
              key={pillar.id}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className={`card relative overflow-hidden p-6 sm:p-8 flex flex-col justify-between group ${pillar.colSpan} ${pillar.borderColor} transition-all`}
            >
              {/* Radial gradient background accent */}
              <div
                className={`absolute -top-24 -right-24 w-72 h-72 rounded-full bg-gradient-to-br ${pillar.gradient} blur-3xl pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity`}
              />

              <div>
                {/* Header Row */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-cyan-400 group-hover:text-white group-hover:border-cyan-400/50 transition-colors">
                      <Icon size={22} />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-cyan-400 tracking-wider uppercase font-semibold">
                        {pillar.category}
                      </span>
                      <h3 className="font-display font-bold text-lg sm:text-xl text-white">
                        {pillar.title}
                      </h3>
                    </div>
                  </div>

                  <span className="hidden sm:inline-flex px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-white/[0.04] border border-white/10 text-text-muted">
                    {pillar.badge}
                  </span>
                </div>

                {/* Description */}
                <p className="text-text-secondary text-sm leading-relaxed mb-6">
                  {pillar.description}
                </p>

                {/* Feature Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                  {pillar.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-xs text-text-primary/90 font-medium">
                      <CheckCircle2 size={13} className="text-cyan-400 flex-shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Stat Strip */}
              <div className="pt-5 border-t border-white/5 grid grid-cols-3 gap-2 text-center">
                {pillar.stats.map((s) => (
                  <div key={s.label} className="p-2 rounded-lg bg-white/[0.02]">
                    <p className="text-sm font-bold text-white font-mono">
                      {s.value}
                    </p>
                    <p className="text-[10px] text-text-muted mt-0.5">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </AnimatedSection>
  );
}
