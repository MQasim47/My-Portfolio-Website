import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

/** 1240px max width; page margin 20 / 24 / 32px via --page-margin. */
export default function Container({ as: Tag = 'div', className, children }: ContainerProps) {
  return (
    <Tag
      className={cn('mx-auto w-full max-w-page px-[var(--page-margin)]', className)}
    >
      {children}
    </Tag>
  );
}
