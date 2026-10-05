'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedSectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Optional visual section heading */
  heading?: string;
  /** Sub-label shown above heading in cyan accent */
  eyebrow?: string;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export { containerVariants, childVariants };

export default function AnimatedSection({
  id,
  children,
  className = '',
  heading,
  eyebrow,
}: AnimatedSectionProps) {
  return (
    <section
      id={id}
      className={`py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto ${className}`}
    >
      {(eyebrow || heading) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 text-center"
        >
          {eyebrow && (
            <span className="inline-flex items-center gap-1.5 text-cyan-400 text-xs font-mono font-bold tracking-widest uppercase mb-3.5 px-3.5 py-1.5 rounded-full border border-cyan-400/25 bg-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              {eyebrow}
            </span>
          )}
          {heading && (
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              {heading}
            </h2>
          )}
          <div className="mt-5 mx-auto w-20 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-70" />
        </motion.div>
      )}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {children}
      </motion.div>
    </section>
  );
}