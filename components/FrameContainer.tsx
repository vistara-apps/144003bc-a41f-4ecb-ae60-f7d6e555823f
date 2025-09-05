'use client';

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface FrameContainerProps {
  children: ReactNode;
  className?: string;
  variant?: 'default';
}

export function FrameContainer({ 
  children, 
  className,
  variant = 'default' 
}: FrameContainerProps) {
  return (
    <div className={cn(
      'w-full min-h-screen p-4',
      variant === 'default' && 'max-w-7xl mx-auto',
      className
    )}>
      {children}
    </div>
  );
}
