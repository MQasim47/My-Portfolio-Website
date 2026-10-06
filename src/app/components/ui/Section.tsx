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
      data-register={tone}
      className={cn(
        'py-[var(--section-space)]',
        // paper sections are transparent: the body paints the paper and the cursor glow
        // shows through. paper-2 sections are a translucent tint for the same reason.
        tone === 'paper-2' && 'section-band',
        className
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}
