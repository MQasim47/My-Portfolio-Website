import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MonoLabelProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

/** mono-s: JetBrains Mono 500, uppercase, .14em tracking. Metadata, never decoration. */
export default function MonoLabel({ as: Tag = 'span', className, children }: MonoLabelProps) {
  return (
    <Tag className={cn('font-mono text-mono-s uppercase text-ink-soft', className)}>
      {children}
    </Tag>
  );
}
