import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
}

/**
 * Marks a block for the section reveal. Purely declarative: the element is
 * visible by default; RevealController handles the rise-and-fade (see globals.css).
 */
export default function Reveal({ children, className }: RevealProps) {
  return (
    <div data-reveal className={className}>
      {children}
    </div>
  );
}
