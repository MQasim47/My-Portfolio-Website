'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ChevronUp } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// TODO: DEPLOYMENT_INFO — Update the deployment details below with real info.
// ─────────────────────────────────────────────────────────────────────────────
const DEPLOYMENT_INFO = {
  status: 'Success',
  platform: 'Azure',
  branch: 'main',
  // TODO: DEPLOYMENT_INFO — replace with your actual last deploy timestamp
  lastDeploy: 'Just now',
  buildId: '#42',
};

export default function DevOpsBadge() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* ── Tooltip card ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="card p-4 text-xs w-56"
          >
            <p className="text-mint font-bold uppercase tracking-widest mb-3 text-[10px]">
              Deployment Info
            </p>
            <div className="space-y-2">
              {[
                ['Status', DEPLOYMENT_INFO.status],
                ['Platform', DEPLOYMENT_INFO.platform],
                ['Branch', DEPLOYMENT_INFO.branch],
                ['Last deploy', DEPLOYMENT_INFO.lastDeploy],
                ['Build', DEPLOYMENT_INFO.buildId],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between items-center">
                  <span className="text-text-secondary">{k}</span>
                  <span
                    className={
                      k === 'Status'
                        ? 'text-mint font-semibold'
                        : 'text-text-primary font-medium'
                    }
                  >
                    {v}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Badge pill ──────────────────────────────────────────────────── */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        onClick={() => setExpanded((prev) => !prev)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border cursor-pointer transition-all duration-200"
        style={{
          background: 'rgba(15,26,21,0.92)',
          borderColor: expanded ? '#2E8B57' : '#0F3D2E',
          color: '#E0E0E0',
          backdropFilter: 'blur(12px)',
          boxShadow: expanded ? '0 0 20px rgba(46,139,87,0.3)' : 'none',
        }}
        aria-label="Toggle deployment info"
      >
        <CheckCircle size={13} className="text-mint" />
        <span>
          CI/CD Active &nbsp;|&nbsp;{' '}
          <span className="text-mint">Deployed: Azure</span>
        </span>
        <motion.span
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronUp size={12} className="text-text-secondary" />
        </motion.span>
      </motion.button>
    </div>
  );
}