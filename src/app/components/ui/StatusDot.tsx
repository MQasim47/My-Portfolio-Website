import { cn } from '@/lib/utils';

export type Status = 'live' | 'in-development' | 'shipped' | 'coursework' | 'fail';

const DOT: Record<Status, string> = {
  live: 'bg-accent',
  shipped: 'bg-accent',
  'in-development': 'bg-warn',
  coursework: 'bg-ink-soft',
  fail: 'bg-fail',
};

interface StatusDotProps {
  status: Status;
  /** Colour never stands alone — a text label is required. */
  label: string;
  className?: string;
}

export default function StatusDot({ status, label, className }: StatusDotProps) {
  return (
    <span className={cn('inline-flex items-center gap-2 font-mono text-mono-m', className)}>
      <span aria-hidden="true" className={cn('h-2 w-2 shrink-0 rounded-dot', DOT[status])} />
      <span>{label}</span>
    </span>
  );
}
