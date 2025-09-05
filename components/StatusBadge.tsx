'use client';

import { getStatusColor } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  variant?: 'open' | 'in_progress' | 'completed' | 'cancelled';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusText = (status: string) => {
    switch (status) {
      case 'open':
        return 'Open';
      case 'in_progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  };

  return (
    <span className={`status-badge ${getStatusColor(status)}`}>
      {getStatusText(status)}
    </span>
  );
}
