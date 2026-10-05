'use client';

import { motion } from 'framer-motion';
import { Terminal, Smartphone, Database, Cloud, Server } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

// Technologies confirmed as used in production (see QUESTIONS.md).
// No proficiency labels or numbers — context is a short factual note only.
const SKILL_GROUPS = [
  {
    id: 'frontend',
    icon: Terminal,
    title: 'Frontend',
    tools: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    note: 'Used on Flacron GameZone.',
  },
  {
    id: 'backend',
    icon: Server,
    title: 'Backend',
    tools: ['Node.js', 'Express', 'REST APIs'],
    note: '',
  },
  {
    id: 'mobile',
    icon: Smartphone,
    title: 'Mobile',
    tools: ['Flutter', 'Dart', 'Firebase', 'Firestore', 'Sqflite'],
    note: 'Used on M Hassan Traders.',
  },
  {
    id: 'database',
    icon: Database,
    title: 'Database',
    tools: ['PostgreSQL', 'Firestore', 'Sqflite'],
    note: '',
  },
  {
    id: 'cloud-devops',
    icon: Cloud,
    title: 'Cloud & Delivery',
    tools: ['AWS', 'Azure App Service', 'Docker', 'GitHub Actions', 'Git'],
    note: '',
  },
];

export default function Skills() {
  return (
    <AnimatedSection id="skills" eyebrow="Technical Stack" heading="What I Build With">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SKILL_GROUPS.map((skill) => {
          const Icon = skill.icon;
          return (
            <motion.div
              key={skill.id}
              className="card p-6 sm:p-7 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 mb-5 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-cyan-400">
                  <Icon size={22} />
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-4">{skill.title}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {skill.tools.map((tool) => (
                    <span key={tool} className="tech-tag text-[11px]">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              {skill.note && (
                <p className="mt-5 pt-4 border-t border-white/5 text-xs font-mono text-text-muted">
                  {skill.note}
                </p>
              )}
            </motion.div>
          );
        })}
      </div>
    </AnimatedSection>
  );
}
