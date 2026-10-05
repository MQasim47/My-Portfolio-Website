'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle, ChevronUp, Activity, Server,
  ShieldCheck, Cpu, GitBranch, RefreshCw, X
} from 'lucide-react';

const DEPLOYMENT_INFO = {
  status: 'Healthy · Operational',
  platform: 'Azure App Service',
  region: 'East US 2 (Multi-AZ)',
  branch: 'main',
  lastDeploy: 'Verified CI/CD Merge',
  buildId: '#148 (Pass)',
  uptime: '99.99% SLA',
};

export default function DevOpsBadge() {
  const [expanded, setExpanded] = useState(false);
  const [latency, setLatency] = useState(24);

  // Subtle real-time latency jitter simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(22 + Math.floor(Math.random() * 5));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2.5">
      {/* ── Diagnostic Drawer Card ────────────────────────────────────── */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="card p-5 text-xs w-72 sm:w-80 shadow-2xl border border-cyan-400/30 bg-[#060914]/95 backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white font-mono font-bold text-xs uppercase tracking-wider">
                  System Telemetry
                </span>
              </div>
              <button
                onClick={() => setExpanded(false)}
                className="text-text-muted hover:text-white transition-colors cursor-pointer"
                aria-label="Close telemetry info"
              >
                <X size={14} />
              </button>
            </div>

            <div className="space-y-2.5 font-mono text-[11px]">
              {[
                ['Health State', DEPLOYMENT_INFO.status, 'text-emerald-400 font-semibold'],
                ['Infrastructure', DEPLOYMENT_INFO.platform, 'text-cyan-300'],
                ['Region', DEPLOYMENT_INFO.region, 'text-text-primary'],
                ['Git Branch', DEPLOYMENT_INFO.branch, 'text-indigo-300'],
                ['Pipeline Release', DEPLOYMENT_INFO.buildId, 'text-text-primary'],
                ['Live Latency', `${latency}ms (Global Edge)`, 'text-emerald-400 font-semibold'],
                ['Service Level', DEPLOYMENT_INFO.uptime, 'text-cyan-400 font-bold'],
              ].map(([k, v, color]) => (
                <div key={k} className="flex justify-between items-center py-0.5 border-b border-white/[0.04] last:border-0">
                  <span className="text-text-muted">{k}</span>
                  <span className={color}>{v}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-text-muted">
              <span>Auto-Healing: Active</span>
              <span className="text-cyan-400">Zero-Downtime</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Collapsed Telemetry Pill ─────────────────────────────────── */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        onClick={() => setExpanded((prev) => !prev)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="flex items-center gap-2.5 px-4 py-2 rounded-xl text-xs font-mono font-medium border cursor-pointer transition-all duration-200"
        style={{
          background: 'rgba(8, 13, 26, 0.92)',
          borderColor: expanded ? 'rgba(6, 182, 212, 0.5)' : 'rgba(255, 255, 255, 0.12)',
          color: '#F8FAFC',
          backdropFilter: 'blur(16px)',
          boxShadow: expanded
            ? '0 0 25px rgba(6, 182, 212, 0.35)'
            : '0 8px 30px rgba(0, 0, 0, 0.5)',
        }}
        aria-label="Toggle system telemetry details"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
        </span>

        <span className="text-text-secondary">
          <span className="text-white font-semibold">Production</span> ·{' '}
          <span className="text-cyan-400">{latency}ms</span>
        </span>

        <motion.span
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-text-muted ml-0.5"
        >
          <ChevronUp size={13} />
        </motion.span>
      </motion.button>
    </div>
  );
}