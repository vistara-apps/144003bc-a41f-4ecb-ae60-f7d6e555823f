'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  subtitle?: string;
  className?: string;
}

export function MetricCard({ 
  title, 
  value, 
  icon, 
  subtitle, 
  className 
}: MetricCardProps) {
  return (
    <div className={cn('metric-card', className)}>
      <div className="flex items-center justify-between mb-2">
        <div className="text-purple-200 text-sm font-medium">
          {title}
        </div>
        <div className="text-purple-300">
          {icon}
        </div>
      </div>
      <div className="text-2xl font-bold text-white mb-1">
        {value}
      </div>
      {subtitle && (
        <div className="text-purple-300 text-sm">
          {subtitle}
        </div>
      )}
    </div>
  );
}
