'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedSectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Optional visual section heading */
  heading?: string;
  /** Sub-label shown above heading in mint color */
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
      ease: [0.25, 0.46, 0.45, 0.94],
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
      className={`py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto ${className}`}
    >
      {(eyebrow || heading) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-12 text-center"
        >
          {eyebrow && (
            <span className="inline-block text-mint text-xs font-bold tracking-widest uppercase mb-3 px-3 py-1 rounded-full border border-card-border bg-card">
              {eyebrow}
            </span>
          )}
          {heading && (
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-text-primary">
              {heading}
            </h2>
          )}
          <div className="mt-4 mx-auto w-16 h-px bg-gradient-to-r from-transparent via-mint to-transparent opacity-50" />
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