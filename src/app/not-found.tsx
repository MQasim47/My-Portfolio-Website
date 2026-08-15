'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Terminal } from 'lucide-react';
import { useEffect, useState } from 'react';

const glitchLines = [
  'ERROR 404: PAGE_NOT_FOUND',
  'STACK TRACE: null pointer at 0x00000000',
  '> checking deployment logs...',
  '> route not registered in manifest',
  '> CI/CD pipeline: ROUTE_MISS',
  '$ kubectl get pod page-404 --namespace=void',
  'No resources found in void namespace.',
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
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(15,61,46,0.15) 0%, transparent 70%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
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
              fontSize: 'clamp(80px, 20vw, 160px)',
              lineHeight: 1,
              background: 'linear-gradient(135deg, #A8E6CF 0%, #2E8B57 50%, #0F3D2E 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 40px rgba(46,139,87,0.4))',
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
          className="card rounded-xl overflow-hidden mb-8"
        >
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-card-border bg-card">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
            <span className="ml-2 text-text-secondary text-xs font-mono flex items-center gap-1.5">
              <Terminal size={11} /> bash — portfolio/src
            </span>
          </div>

          {/* Terminal body */}
          <div className="p-4 font-mono text-xs space-y-1 min-h-[160px]">
            {glitchLines.slice(0, visibleLines).map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15 }}
                className={
                  line.startsWith('ERROR')
                    ? 'text-red-400'
                    : line.startsWith('$')
                    ? 'text-mint'
                    : line.startsWith('>')
                    ? 'text-yellow-400/80'
                    : 'text-text-secondary'
                }
              >
                {line}
              </motion.p>
            ))}
            {visibleLines < glitchLines.length && (
              <span className="text-mint animate-blink">▮</span>
            )}
          </div>
        </motion.div>

        {/* Message + CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center space-y-4"
        >
          <p className="text-text-secondary text-sm">
            Looks like this route was never deployed. Let&apos;s get you back.
          </p>
          <Link href="/" className="btn-primary inline-flex">
            <Home size={16} />
            Return Home
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}