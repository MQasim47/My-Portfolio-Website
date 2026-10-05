import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TerminalBlockProps {
  title?: string;
  className?: string;
  children: ReactNode;
}

/** Dark-band surface. JetBrains Mono, own horizontal scroll, never below 12px. */
export default function TerminalBlock({ title, className, children }: TerminalBlockProps) {
  return (
    <div className={cn('terminal-surface on-dark', className)}>
      {title && (
        <div
          className="border-b border-panel-rule px-4 py-2 font-mono text-mono-s uppercase text-ink-soft-inv"
          style={{ borderBottomWidth: 'var(--hairline)' }}
        >
          {title}
        </div>
      )}
      <pre className="m-0 overflow-x-auto p-4 font-mono text-[0.8125rem] leading-relaxed text-paper-inv">
        {children}
      </pre>
    </div>
  );
}
