'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Scroll-reveal (ported from the previous variant pattern).
 * Under prefers-reduced-motion the resting state is forced visible by CSS
 * ([data-reveal] in globals.css), so it never depends on JS or hydration timing.
 */
export default function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
