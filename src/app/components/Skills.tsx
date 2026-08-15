'use client';

import { useRef, MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { Cloud, Terminal, Smartphone } from 'lucide-react';
import AnimatedSection, { childVariants } from './AnimatedSection';

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────
const skills = [
  {
    id: 'devops',
    Icon: Cloud,
    title: 'DevOps / Cloud',
    proficiency: 'Advanced',
    color: '#A8E6CF',
    bullets: [
      'Azure & IBM Cloud infrastructure provisioning',
      'CI/CD pipelines with GitHub Actions & Jenkins',
      'Docker · Kubernetes · Terraform',
    ],
  },
  {
    id: 'web',
    Icon: Terminal,
    title: 'Web Development',
    proficiency: 'Advanced',
    color: '#2E8B57',
    bullets: [
      'Next.js · React · TypeScript',
      'RESTful APIs & GraphQL',
      'Tailwind CSS · Node.js',
    ],
  },
  {
    id: 'flutter',
    Icon: Smartphone,
    title: 'Flutter / Mobile',
    proficiency: 'Intermediate',
    color: '#A8E6CF',
    bullets: [
      'Cross-platform iOS & Android apps',
      'State management with Riverpod & BLoC',
      'Firebase integration & push notifications',
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Tilt Card
// ─────────────────────────────────────────────────────────────────────────────
function TiltCard({ skill }: { skill: (typeof skills)[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) scale(1.03)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform =
        'perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)';
    }
  };

  return (
    <motion.div
      variants={childVariants}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.15s ease, box-shadow 0.3s ease' }}
      className="card p-7 cursor-default group hover:border-accent-hover hover:shadow-glow-green"
    >
      {/* Icon + Tooltip */}
      <div className="tooltip inline-block mb-5">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-1"
          style={{
            background: `linear-gradient(135deg, rgba(15,61,46,0.8), rgba(46,139,87,0.3))`,
            border: `1px solid rgba(168,230,207,0.15)`,
          }}
        >
          <skill.Icon size={22} className="text-mint group-hover:scale-110 transition-transform" />
        </div>
        <span className="tooltip-text">{skill.proficiency}</span>
      </div>

      {/* Title */}
      <h3 className="font-display font-bold text-lg text-text-primary mb-4">
        {skill.title}
      </h3>

      {/* Bullet points */}
      <ul className="space-y-2.5">
        {skill.bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-2.5 text-sm text-text-secondary">
            <span
              className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: skill.color }}
            />
            {bullet}
          </li>
        ))}
      </ul>

      {/* Bottom accent line */}
      <div
        className="mt-6 h-0.5 w-0 group-hover:w-full rounded-full transition-all duration-500"
        style={{
          background: `linear-gradient(90deg, ${skill.color}, transparent)`,
        }}
      />
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section
// ─────────────────────────────────────────────────────────────────────────────
export default function Skills() {
  return (
    <AnimatedSection
      id="skills"
      eyebrow="What I do"
      heading="Skills & Expertise"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill) => (
          <TiltCard key={skill.id} skill={skill} />
        ))}
      </div>
    </AnimatedSection>
  );
}