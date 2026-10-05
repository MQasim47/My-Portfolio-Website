import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** Running text: body-l, comfortable measure. */
export default function Prose({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn('max-w-[62ch] space-y-4 text-body-l text-ink-soft', className)}>
      {children}
    </div>
  );
}
