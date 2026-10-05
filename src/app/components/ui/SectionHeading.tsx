import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import MonoLabel from './MonoLabel';

interface SectionHeadingProps {
  id?: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
}

/** mono-s eyebrow above a Bodoni Moda heading. Headings are ink — never emerald. */
export default function SectionHeading({ id, eyebrow, children, className }: SectionHeadingProps) {
  return (
    <header className={cn('mb-12 lg:mb-16', className)}>
      {eyebrow && <MonoLabel as="p" className="mb-4">{eyebrow}</MonoLabel>}
      <h2 id={id} className="font-display text-display-l text-ink">
        {children}
      </h2>
    </header>
  );
}
