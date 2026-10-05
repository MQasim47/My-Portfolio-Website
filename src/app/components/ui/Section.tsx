import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import Container from './Container';

interface SectionProps {
  id?: string;
  /** Background register. Dark appears on exactly one band (Phase 6). */
  tone?: 'paper' | 'paper-2';
  className?: string;
  /** Labelled-by id of the section heading. */
  labelledBy?: string;
  children: ReactNode;
}

/** Vertical rhythm 160 / 96 / 64px (desktop / tablet / mobile) via --section-space. */
export default function Section({
  id,
  tone = 'paper',
  className,
  labelledBy,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        'py-[var(--section-space)]',
        tone === 'paper-2' ? 'bg-paper-2' : 'bg-paper',
        className
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}
