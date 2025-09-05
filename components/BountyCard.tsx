'use client';

import { Bounty, User } from '@/lib/types';
import { formatEth, formatDistance, getStatusColor, timeAgo } from '@/lib/utils';
import { MapPin, Clock, Package, Star } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

interface BountyCardProps {
  bounty: Bounty;
  sender?: User;
  courier?: User;
  variant?: 'compact' | 'detailed';
  onClick?: () => void;
}

export function BountyCard({ 
  bounty, 
  sender, 
  courier, 
  variant = 'compact',
  onClick 
}: BountyCardProps) {
  const isDetailed = variant === 'detailed';

  return (
    <div 
      className="bounty-card animate-fade-in"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-4 h-4 text-purple-300" />
            <h3 className="font-semibold text-white truncate">
              {bounty.itemDescription}
            </h3>
          </div>
          <StatusBadge status={bounty.status} />
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">
            {formatEth(bounty.rewardAmount)}
          </div>
          <div className="text-sm text-purple-200">
            {timeAgo(bounty.createdAt)}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-purple-100">
            <div className="font-medium">From: {bounty.pickupLocation}</div>
            <div className="text-purple-200">To: {bounty.dropoffLocation}</div>
          </div>
        </div>

        {bounty.estimatedDistance && (
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-purple-200">
              ~{formatDistance(bounty.estimatedDistance)} distance
            </span>
          </div>
        )}

        {isDetailed && (
          <>
            {sender && (
              <div className="flex items-center gap-2 pt-2 border-t border-white border-opacity-20">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">
                    {sender.farcasterProfile?.displayName?.[0] || 'S'}
                  </span>
                </div>
                <div className="text-sm">
                  <div className="text-white font-medium">
                    {sender.farcasterProfile?.displayName || 'Sender'}
                  </div>
                  <div className="flex items-center gap-1 text-purple-200">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span>{sender.reputationScore.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            )}

            {courier && (
              <div className="flex items-center gap-2 pt-2 border-t border-white border-opacity-20">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">
                    {courier.farcasterProfile?.displayName?.[0] || 'C'}
                  </span>
                </div>
                <div className="text-sm">
                  <div className="text-white font-medium">
                    {courier.farcasterProfile?.displayName || 'Courier'}
                  </div>
                  <div className="flex items-center gap-1 text-purple-200">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span>{courier.reputationScore.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {bounty.urgency && (
        <div className="mt-3 pt-3 border-t border-white border-opacity-20">
          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            bounty.urgency === 'high' 
              ? 'bg-red-500 bg-opacity-20 text-red-300 border border-red-400 border-opacity-30'
              : bounty.urgency === 'medium'
              ? 'bg-yellow-500 bg-opacity-20 text-yellow-300 border border-yellow-400 border-opacity-30'
              : 'bg-green-500 bg-opacity-20 text-green-300 border border-green-400 border-opacity-30'
          }`}>
            {bounty.urgency.toUpperCase()} PRIORITY
          </div>
        </div>
      )}
    </div>
  );
}
