'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Terminal } from 'lucide-react';
import { useEffect, useState } from 'react';

const glitchLines = [
  'ERROR 404: ROUTE_NOT_FOUND',
  'STACK TRACE: null pointer at 0x00000000',
  '> checking deployment manifests on Azure cluster...',
  '> ingress rule not matched in api-gateway',
  '> CI/CD pipeline telemetry: ROUTE_MISSING',
  '$ kubectl get pod route-404 --namespace=production',
  'No resources found in target namespace.',
];

export default function NotFound() {
  const [visibleLines, setVisibleLines] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= glitchLines.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 250);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(99,102,241,0.15) 0%, transparent 70%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-xl w-full"
      >
        {/* Giant 404 */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'backOut' }}
          className="text-center mb-8"
        >
          <span
            className="font-display font-extrabold"
            style={{
              fontSize: 'clamp(80px, 20vw, 150px)',
              lineHeight: 1,
              background: 'linear-gradient(135deg, #FFFFFF 0%, #38BDF8 40%, #818CF8 80%, #C084FC 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 40px rgba(6,182,212,0.35))',
            }}
          >
            404
          </span>
        </motion.div>

        {/* Terminal window */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="terminal-window mb-8"
        >
          {/* Terminal header */}
          <div className="terminal-header">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-text-muted text-xs font-mono flex items-center gap-1.5">
              <Terminal size={11} className="text-cyan-400" /> bash — cluster/ingress
            </span>
          </div>

          {/* Terminal body */}
          <div className="p-5 font-mono text-xs space-y-1.5 min-h-[160px] bg-[#060914]">
            {glitchLines.slice(0, visibleLines).map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15 }}
                className={
                  line.startsWith('ERROR')
                    ? 'text-red-400 font-semibold'
                    : line.startsWith('$')
                    ? 'text-cyan-400 font-semibold'
                    : line.startsWith('>')
                    ? 'text-yellow-400/90'
                    : 'text-text-secondary'
                }
              >
                {line}
              </motion.p>
            ))}
            {visibleLines < glitchLines.length && (
              <span className="text-cyan-400 animate-blink">▮</span>
            )}
          </div>
        </motion.div>

        {/* Message + CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center space-y-5"
        >
          <p className="text-text-secondary text-sm">
            Looks like this route was never deployed to our cluster. Let&apos;s get you back to the main portal.
          </p>
          <Link href="/" className="btn-primary inline-flex">
            <Home size={16} />
            Return to Command Center
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}