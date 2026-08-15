'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ScrollAnimationWrapperProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds before animation starts */
  delay?: number;
  /** How far to translate from (px). Default: 30 */
  yOffset?: number;
  /** Trigger threshold. Default: 0.15 */
  threshold?: number;
  /** Only animate once. Default: true */
  once?: boolean;
}

export default function ScrollAnimationWrapper({
  children,
  className = '',
  delay = 0,
  yOffset = 30,
  threshold = 0.15,
  once = true,
}: ScrollAnimationWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: yOffset }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
}