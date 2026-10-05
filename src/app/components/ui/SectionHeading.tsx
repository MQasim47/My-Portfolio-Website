import { cn } from '@/lib/utils';
import MonoLabel from './MonoLabel';
import SplitLines from '../SplitLines';

interface SectionHeadingProps {
  id?: string;
  eyebrow?: string;
  children: string;
  className?: string;
}

/**
 * mono-s eyebrow above a Bodoni Moda heading, with a hairline under it. Headings are ink.
 * One reveal group: the eyebrow rises first, the heading lines rise out of their masks,
 * the rule draws left to right.
 */
export default function SectionHeading({ id, eyebrow, children, className }: SectionHeadingProps) {
  return (
    <header data-reveal-group className={cn('mb-12 lg:mb-16', className)}>
      {eyebrow && (
        <MonoLabel as="p" className="rv-eyebrow mb-4 text-accent">
          {eyebrow}
        </MonoLabel>
      )}
      <SplitLines as="h2" id={id} className="font-display text-display-l text-ink" text={children} />
      <div className="heading-rule" aria-hidden="true" />
    </header>
  );
}
