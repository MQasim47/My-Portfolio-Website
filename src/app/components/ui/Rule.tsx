import { cn } from '@/lib/utils';

/** Hairline divider. 1px (2px under prefers-contrast: more). */
export default function Rule({ className }: { className?: string }) {
  return (
    <hr
      className={cn('m-0 border-0 border-t border-rule', className)}
      style={{ borderTopWidth: 'var(--hairline)' }}
    />
  );
}
