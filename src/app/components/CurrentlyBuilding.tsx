'use client';

import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

// TODO: moves to the CMS in Phase 3.
const ITEMS = [
  {
    name: 'Archive',
    status: 'In development',
    description:
      'A RAG-based AI chatbot over private documents. Personal project.',
    tech: ['Next.js', 'Express', 'Ollama', 'pgvector'],
  },
  {
    name: 'Flacron Auto Social',
    status: 'In development',
    description: 'A social media management app.',
    tech: ['Flutter', 'Firebase'],
  },
];

export default function CurrentlyBuilding() {
  return (
    <AnimatedSection id="building" eyebrow="In Progress" heading="Currently Building">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {ITEMS.map((item) => (
          <motion.div key={item.name} className="card p-6 sm:p-7 flex flex-col gap-4">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-display font-bold text-lg text-white">{item.name}</h3>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-text-muted">
                {item.status}
              </span>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed">{item.description}</p>
            <div className="flex flex-wrap gap-1.5 mt-auto">
              {item.tech.map((t) => (
                <span key={t} className="tech-tag text-[11px]">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  );
}
