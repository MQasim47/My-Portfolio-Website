'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2, ExternalLink, Github, Linkedin, Mail,
  Terminal, Activity, ArrowRight, CheckCircle2,
  Clock, ShieldCheck, Sparkles, Download, Play, RefreshCw, Cpu
} from 'lucide-react';
import Image from 'next/image';

const ROLES = [
  'DevOps Engineer',
  'Cloud Infrastructure Architect',
  'Full-Stack Developer',
  'Flutter Mobile Specialist',
];

const socialLinks = [
  { href: 'https://github.com/MQasim47', icon: Github, label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/rao-qasim-005821248/', icon: Linkedin, label: 'LinkedIn' },
  { href: 'mailto:aslamqasim126@gmail.com', icon: Mail, label: 'Email' },
];

const METRICS = [
  { value: '99.99%', label: 'Uptime SLA Mindset', sub: 'High Availability' },
  { value: '40+', label: 'CI/CD Pipelines', sub: 'GitHub Actions & Jenkins' },
  { value: '< 3m', label: 'Deploy Velocity', sub: 'Automated Releases' },
  { value: 'Multi-Cloud', label: 'Azure & IBM Cloud', sub: 'Production Proven' },
];

// Interactive terminal command responses
const TERMINAL_OUTPUTS: Record<string, string[]> = {
  help: [
    'Available commands:',
    '  whoami       - Display professional summary & credentials',
    '  skills       - Print verified technical core stack',
    '  projects     - List flagship production systems',
    '  status       - Inspect live cloud infrastructure health',
    '  contact      - Get direct communication channels',
    '  clear        - Clear console output',
  ],
  whoami: [
    'Name: Muhammad Qasim',
    'Role: Senior DevOps Engineer & Full-Stack Architect',
    'Organization: Flacron Enterprises LLC',
    'Core Focus: Cloud Automation, Kubernetes, Zero-Downtime Releases, High-Performance Web & Mobile Apps',
    'Status: Open to high-impact enterprise & senior opportunities',
  ],
  skills: [
    '[Cloud & DevOps]  Azure, IBM Cloud, Docker, Kubernetes, Terraform, Helm, CI/CD',
    '[Frontend/Mobile] Next.js 14, React, TypeScript, Flutter, Tailwind CSS',
    '[Backend/APIs]    Node.js, Express, REST APIs, GraphQL, MongoDB, PostgreSQL',
    '[Observability]   Prometheus, Grafana, Alertmanager, Logging Pipelines',
  ],
  projects: [
    '1. Azure Cloud DevOps Infrastructure - Auto-scaling & Zero-downtime CI/CD',
    '2. FlacronGameZone - AI-powered live football analysis & stream platform',
    '3. IBM Cloud CI/CD Hub - Multi-environment Kubernetes deployment',
    '4. Flutter Expense Tracker - Cross-platform real-time budget app',
    '5. SkillSwap Platform - P2P student knowledge exchange',
  ],
  status: [
    '● System Health: ALL SYSTEMS OPERATIONAL',
    '  Region: Azure Central US / IBM Cloud Dal10',
    '  Cluster Status: Ready (3/3 Nodes active)',
    '  Pipeline State: SUCCESS (Build #148 - 0 errors)',
    '  Avg Latency: 22ms | Packet Loss: 0.00%',
  ],
  contact: [
    'Email: aslamqasim126@gmail.com',
    'LinkedIn: linkedin.com/in/rao-qasim-005821248',
    'GitHub: github.com/MQasim47',
    'Response Time: < 24 hours guaranteed',
  ],
};

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  // Terminal state
  const [activeTab, setActiveTab] = useState<'terminal' | 'pipeline'>('terminal');
  const [termHistory, setTermHistory] = useState<Array<{ cmd: string; out: string[] }>>([
    {
      cmd: 'whoami',
      out: TERMINAL_OUTPUTS['whoami'],
    },
    {
      cmd: 'status',
      out: TERMINAL_OUTPUTS['status'],
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Live time in Karachi/PKT (UTC+5)
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Karachi',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setCurrentTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && charIndex < currentRole.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), 75);
    } else if (!isDeleting && charIndex === currentRole.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), 40);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setRoleIndex((r) => (r + 1) % ROLES.length);
    }

    setDisplayText(currentRole.slice(0, charIndex));
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex]);

  const handleCommand = (cmdText: string) => {
    const trimmed = cmdText.trim().toLowerCase();
    if (!trimmed) return;

    if (trimmed === 'clear') {
      setTermHistory([]);
      setInputVal('');
      return;
    }

    const output = TERMINAL_OUTPUTS[trimmed] || [
      `Command not found: "${trimmed}". Type "help" for a list of valid commands.`,
    ];

    setTermHistory((prev) => [...prev, { cmd: cmdText, out: output }]);
    setInputVal('');
    setTimeout(() => {
      terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-28 pb-16 overflow-hidden"
    >
      {/* Precision Radial Spotlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 20%, rgba(99, 102, 241, 0.12) 0%, rgba(6, 182, 212, 0.05) 40%, transparent 75%)',
        }}
      />

      <div className="relative z-10 max-w-6xl w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* ═══════════════════════════════════════════════════════════════
              LEFT COLUMN: IDENTITY & ENTERPRISE VALUE
             ═══════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Top Status Pill: Availability & Live Time */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center gap-2.5 mb-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-xs font-semibold text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                Available for Senior &amp; Enterprise Roles
              </div>

              {currentTime && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium text-text-muted">
                  <Clock size={12} className="text-cyan-400" />
                  <span>PKT (UTC+5): {currentTime}</span>
                </div>
              )}
            </motion.div>

            {/* Profile Avatar & Name Tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-4 mb-5"
            >
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden p-0.5 bg-gradient-to-tr from-indigo-500 via-cyan-400 to-emerald-400 shadow-[0_0_25px_rgba(6,182,212,0.3)]">
                <div className="relative w-full h-full rounded-[14px] overflow-hidden bg-background">
                  <Image
                    src="/images/photo.jpeg"
                    alt="Muhammad Qasim"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-bold font-display text-white tracking-tight">
                    Muhammad Qasim
                  </h2>
                  <span className="px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-semibold uppercase tracking-wider">
                    Senior Lead
                  </span>
                </div>
                <p className="text-xs text-text-muted mt-0.5">
                  DevOps Engineer &amp; Full-Stack Architect at <span className="text-cyan-400 font-medium">Flacron Enterprises LLC</span>
                </p>
              </div>
            </motion.div>

            {/* Dynamic Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-display font-extrabold text-3xl sm:text-5xl lg:text-[3.25rem] leading-[1.12] mb-5 tracking-tight"
            >
              Architecting <span className="gradient-text">Resilient Cloud Systems</span> &amp; High-Velocity Products.
            </motion.h1>

            {/* Typewriter Role Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-3 mb-6 bg-surface/80 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-md"
            >
              <div className="w-7 h-7 rounded-lg bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-400 flex-shrink-0">
                <Terminal size={14} />
              </div>
              <div className="font-mono text-sm sm:text-base text-text-primary font-semibold flex items-center">
                <span>Specialist in&nbsp;</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 font-bold">
                  {displayText}
                </span>
                <span className="inline-block w-2 h-4 ml-1 bg-cyan-400 animate-blink" />
              </div>
            </motion.div>

            {/* Value Proposition */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-xl mb-8 font-normal"
            >
              Building enterprise-scale cloud infrastructures on <strong className="text-white font-semibold">Azure</strong> &amp; <strong className="text-white font-semibold">IBM Cloud</strong> with zero-downtime CI/CD automation, high-concurrency <strong className="text-white font-semibold">Next.js</strong> platforms, and production <strong className="text-white font-semibold">Flutter</strong> applications.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-3.5 mb-10 w-full sm:w-auto"
            >
              <button
                onClick={() => scrollTo('projects')}
                className="btn-primary flex-1 sm:flex-none justify-center group cursor-pointer"
              >
                <span>Explore Projects</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => scrollTo('contact')}
                className="btn-outline flex-1 sm:flex-none justify-center cursor-pointer"
              >
                <Sparkles size={14} className="text-cyan-400" />
                <span>Let&apos;s Connect</span>
              </button>

              <a
                href="/resume.pdf"
                download="Muhammad_Qasim_CV.pdf"
                className="btn-ghost px-3.5 py-2.5 text-xs text-text-secondary hover:text-white border border-white/5 rounded-xl flex items-center gap-1.5"
              >
                <Download size={13} />
                <span>Resume (PDF)</span>
              </a>
            </motion.div>

            {/* Social Proof Strip */}
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

          {/* ═══════════════════════════════════════════════════════════════
              RIGHT COLUMN: INTERACTIVE CLOUD COCKPIT / TERMINAL
             ═══════════════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="terminal-window">
              
              {/* Terminal Window Header with Tabs */}
              <div className="terminal-header">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <span className="text-[11px] text-text-muted font-mono ml-2">
                    qasim@cloud-core
                  </span>
                </div>

                {/* Tab Switcher */}
                <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/5 text-xs">
                  <button
                    onClick={() => setActiveTab('terminal')}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-colors ${
                      activeTab === 'terminal'
                        ? 'bg-indigo-600/30 text-cyan-300 font-semibold border border-indigo-500/30'
                        : 'text-text-muted hover:text-white'
                    }`}
                  >
                    terminal.sh
                  </button>
                  <button
                    onClick={() => setActiveTab('pipeline')}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-mono flex items-center gap-1 transition-colors ${
                      activeTab === 'pipeline'
                        ? 'bg-emerald-600/30 text-emerald-300 font-semibold border border-emerald-500/30'
                        : 'text-text-muted hover:text-white'
                    }`}
                  >
                    <Activity size={10} />
                    pipeline.live
                  </button>
                </div>
              </div>

              {/* TAB 1: INTERACTIVE SHELL */}
              {activeTab === 'terminal' && (
                <div className="p-4 sm:p-5 font-mono text-xs text-text-secondary flex flex-col h-[380px]">
                  {/* Output history */}
                  <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin">
                    <div className="text-text-muted text-[11px] pb-2 border-b border-white/5">
                      Type a command or click a quick tag below:
                    </div>

                    {termHistory.map((item, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                          <span className="text-indigo-400">❯</span>
                          <span>{item.cmd}</span>
                        </div>
                        <div className="pl-4 space-y-0.5 text-text-primary/90 leading-relaxed">
                          {item.out.map((line, lIdx) => (
                            <div
                              key={lIdx}
                              className={
                                line.includes('OPERATIONAL') || line.includes('SUCCESS')
                                  ? 'text-emerald-400 font-medium'
                                  : line.includes('Azure') || line.includes('Docker')
                                  ? 'text-cyan-300'
                                  : 'text-text-secondary'
                              }
                            >
                              {line}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    <div ref={terminalEndRef} />
                  </div>

                  {/* Quick Action Chips */}
                  <div className="pt-2 pb-2 border-t border-white/5 flex flex-wrap gap-1.5">
                    {['help', 'skills', 'projects', 'status', 'whoami', 'clear'].map((cmd) => (
                      <button
                        key={cmd}
                        onClick={() => handleCommand(cmd)}
                        className="px-2 py-0.5 rounded bg-white/[0.04] hover:bg-indigo-500/20 hover:text-cyan-300 hover:border-cyan-400/40 text-[10px] text-text-muted border border-white/5 transition-colors cursor-pointer"
                      >
                        {cmd}
                      </button>
                    ))}
                  </div>

                  {/* Interactive Command Input Form */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleCommand(inputVal);
                    }}
                    className="flex items-center gap-2 pt-2 border-t border-white/10"
                  >
                    <span className="text-cyan-400 font-bold">❯</span>
                    <input
                      type="text"
                      value={inputVal}
                      onChange={(e) => setInputVal(e.target.value)}
                      placeholder="Type a command (e.g. 'skills' or 'status')..."
                      className="bg-transparent text-white focus:outline-none w-full text-xs font-mono placeholder:text-text-muted/60"
                    />
                    <button
                      type="submit"
                      className="px-2.5 py-1 rounded bg-indigo-600/30 text-cyan-300 hover:bg-indigo-600/50 text-[11px] font-semibold border border-indigo-500/30"
                    >
                      Run
                    </button>
                  </form>
                </div>
              )}

              {/* TAB 2: LIVE DEVOPS CI/CD PIPELINE SIMULATOR */}
              {activeTab === 'pipeline' && (
                <div className="p-5 font-mono text-xs flex flex-col justify-between h-[380px] bg-gradient-to-b from-[#060913] to-[#0A0E1F]">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-white font-semibold text-xs">Production Pipeline #148</span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                        Passing · 2m 14s
                      </span>
                    </div>

                    {/* Pipeline Stages Diagram */}
                    <div className="space-y-3">
                      {[
                        { step: '1. Source', name: 'git commit (main)', tool: 'GitHub Webhook', status: 'Passed', duration: '3s' },
                        { step: '2. Continuous Integration', name: 'Lint, Test & TypeScript verify', tool: 'GitHub Actions', status: 'Passed', duration: '42s' },
                        { step: '3. Containerization', name: 'Multi-stage Docker Build & Trivy Scan', tool: 'Docker Engine', status: 'Passed', duration: '58s' },
                        { step: '4. Continuous Deployment', name: 'Rolling Deploy to Azure App Service', tool: 'Azure CLI / Terraform', status: 'Passed', duration: '28s' },
                        { step: '5. Telemetry & SLA', name: 'Live Uptime & Health Check (200 OK)', tool: 'Prometheus / Grafana', status: 'Live 99.99%', duration: 'Active' },
                      ].map((stage, i) => (
                        <div
                          key={stage.step}
                          className="p-2.5 rounded-xl bg-surface/90 border border-white/5 flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2.5">
                            <CheckCircle2 size={15} className="text-emerald-400 flex-shrink-0" />
                            <div>
                              <p className="text-white font-medium text-xs leading-tight">
                                {stage.name}
                              </p>
                              <p className="text-[10px] text-text-muted mt-0.5">
                                {stage.tool}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-emerald-400 text-[10px] font-semibold">
                              {stage.status}
                            </span>
                            <p className="text-[10px] text-text-muted">
                              {stage.duration}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-text-muted">
                    <span>Zero-Downtime Guarantee</span>
                    <span className="text-cyan-400 font-medium">Auto-Rollback Trigger: Enabled</span>
                  </div>
                </div>
              )}

            </div>
          </motion.div>

        </div>

        {/* ═══════════════════════════════════════════════════════════════
            ENTERPRISE METRICS STRIP (BENTO PREVIEW)
           ═══════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {METRICS.map((m, idx) => (
            <div
              key={idx}
              className="card p-4 sm:p-5 flex flex-col justify-between hover:border-cyan-500/30 transition-all group"
            >
              <div>
                <span className="text-2xl sm:text-3xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-indigo-300 group-hover:from-cyan-300 group-hover:to-indigo-400 transition-all">
                  {m.value}
                </span>
                <p className="text-xs sm:text-sm font-semibold text-text-primary mt-1">
                  {m.label}
                </p>
              </div>
              <p className="text-[11px] text-text-muted mt-2">
                {m.sub}
              </p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}