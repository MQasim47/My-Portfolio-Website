'use client';

import { useState, useRef, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cloud, Terminal, Smartphone, Database, Shield,
  Layers, Cpu, Server, CheckCircle2, Sparkles, Filter
} from 'lucide-react';
import AnimatedSection from './AnimatedSection';

type Category = 'all' | 'cloud' | 'frontend' | 'backend' | 'devops';

const CATEGORIES: Array<{ id: Category; label: string }> = [
  { id: 'all',      label: 'All Capabilities' },
  { id: 'cloud',    label: 'Cloud & Infrastructure' },
  { id: 'frontend', label: 'Frontend & Mobile' },
  { id: 'backend',  label: 'Backend & APIs' },
  { id: 'devops',   label: 'CI/CD & Observability' },
];

const SKILL_GROUPS = [
  {
    id: 'cloud-infra',
    category: 'cloud',
    icon: Cloud,
    title: 'Cloud Infrastructure & IaC',
    level: 'Advanced',
    levelColor: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
    description: 'Multi-cloud resource provisioning, high-availability architecture, and automated scalability.',
    tools: ['Azure App Service', 'IBM Cloud', 'Terraform', 'Docker', 'Kubernetes', 'Virtual Networks'],
    productionUse: 'Orchestrating production workloads with zero-downtime rolling deploys.',
  },
  {
    id: 'cicd-automation',
    category: 'devops',
    icon: Shield,
    title: 'CI/CD & Automation Engineering',
    level: 'Specialist',
    levelColor: 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20',
    description: 'End-to-end continuous integration, automated testing, container security, and release pipelines.',
    tools: ['GitHub Actions', 'Jenkins', 'Helm Charts', 'Trivy Scanning', 'Docker Compose', 'Bash Scripting'],
    productionUse: 'Automated merge-to-deploy pipelines with sub-3-minute release turnaround.',
  },
  {
    id: 'nextjs-web',
    category: 'frontend',
    icon: Terminal,
    title: 'Modern Web Engineering',
    level: 'Advanced',
    levelColor: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
    description: 'Building blazing-fast web applications with SSR, edge rendering, and accessible design systems.',
    tools: ['Next.js 14', 'React 18', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'REST APIs'],
    productionUse: 'Deployed responsive enterprise platforms serving thousands of daily hits.',
  },
  {
    id: 'flutter-mobile',
    category: 'frontend',
    icon: Smartphone,
    title: 'Cross-Platform Mobile Apps',
    level: 'Advanced',
    levelColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    description: 'Production-ready iOS and Android mobile solutions with seamless state management and cloud sync.',
    tools: ['Flutter', 'Dart', 'Riverpod', 'BLoC Pattern', 'Hive Local DB', 'Firebase Suite'],
    productionUse: 'Built commercial expense tracking & offline-first data synchronization apps.',
  },
  {
    id: 'backend-apis',
    category: 'backend',
    icon: Server,
    title: 'Backend Systems & Microservices',
    level: 'Advanced',
    levelColor: 'text-violet-400 bg-violet-400/10 border-violet-400/20',
    description: 'Designing resilient RESTful & GraphQL services with authentication, rate limiting, and caching.',
    tools: ['Node.js', 'Express.js', 'REST APIs', 'GraphQL', 'MongoDB', 'PostgreSQL', 'Redis'],
    productionUse: 'Engineered secure backend services with structured JSON schemas and JWT security.',
  },
  {
    id: 'observability',
    category: 'devops',
    icon: Cpu,
    title: 'Observability & Site Reliability',
    level: 'Production Grade',
    levelColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    description: 'Real-time telemetry, automated rollback triggers, and comprehensive health monitoring.',
    tools: ['Prometheus', 'Grafana', 'Alertmanager', 'SSL/TLS Automation', 'Nginx Reverse Proxy'],
    productionUse: 'Maintaining 99.99% uptime with proactive alert notifications.',
  },
];

function InteractiveSkillCard({ skill }: { skill: typeof SKILL_GROUPS[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = skill.icon;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(700px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-4px)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(700px) rotateY(0deg) rotateX(0deg) translateY(0px)';
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="card p-6 sm:p-7 flex flex-col justify-between group hover:border-cyan-400/40 hover:shadow-glow-cyan transition-all cursor-default"
      style={{ transformStyle: 'preserve-3d', transition: 'transform 0.15s ease, border-color 0.3s ease, box-shadow 0.3s ease' }}
    >
      <div>
        {/* Top bar */}
        <div className="flex items-center justify-between gap-2 mb-5">
          <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-cyan-400 group-hover:text-white group-hover:border-cyan-400/50 group-hover:bg-gradient-to-br group-hover:from-indigo-600/30 group-hover:to-cyan-600/30 transition-all">
            <Icon size={22} />
          </div>
          <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${skill.levelColor}`}>
            {skill.level}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-cyan-400 transition-colors">
          {skill.title}
        </h3>

        {/* Description */}
        <p className="text-text-secondary text-sm leading-relaxed mb-5">
          {skill.description}
        </p>

        {/* Tools Pills */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {skill.tools.map((tool) => (
            <span key={tool} className="tech-tag text-[11px]">
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* Production Context Footnote */}
      <div className="pt-4 border-t border-white/5 flex items-start gap-2 text-xs text-text-muted">
        <CheckCircle2 size={13} className="text-emerald-400 flex-shrink-0 mt-0.5" />
        <span className="leading-snug">{skill.productionUse}</span>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  const filteredSkills = activeCategory === 'all'
    ? SKILL_GROUPS
    : SKILL_GROUPS.filter((s) => s.category === activeCategory);

  return (
    <AnimatedSection
      id="skills"
      eyebrow="Technical Arsenal"
      heading="Skills & Capabilities Matrix"
    >
      {/* Category Switcher Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-semibold shadow-[0_0_20px_rgba(6,182,212,0.35)] border border-cyan-400/40'
                  : 'bg-white/[0.03] text-text-secondary hover:text-white hover:bg-white/[0.08] border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Skills Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill) => (
            <InteractiveSkillCard key={skill.id} skill={skill} />
          ))}
        </AnimatePresence>
      </motion.div>
    </AnimatedSection>
  );
}