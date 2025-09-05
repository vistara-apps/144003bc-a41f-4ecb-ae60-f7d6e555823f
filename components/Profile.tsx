'use client';

import { useState } from 'react';
import { RatingStars } from './RatingStars';
import { StatusBadge } from './StatusBadge';
import { BountyCard } from './BountyCard';
import { MOCK_USERS, MOCK_BOUNTIES } from '@/lib/constants';
import { User, Bounty } from '@/lib/types';
import { formatEth, formatAddress, timeAgo } from '@/lib/utils';
import { 
  User as UserIcon, 
  Star, 
  Package, 
  Truck, 
  DollarSign, 
  Calendar,
  Award,
  MapPin,
  Clock
} from 'lucide-react';

export function Profile() {
  const [activeTab, setActiveTab] = useState<'overview' | 'bounties' | 'reviews'>('overview');
  
  // Mock current user - in real app, this would come from wallet/auth
  const currentUser: User = MOCK_USERS[0];
  
  // Mock user's bounties
  const userBounties = MOCK_BOUNTIES.filter(
    bounty => bounty.senderId === currentUser.userId || bounty.courierId === currentUser.userId
  );
  
  const sentBounties = userBounties.filter(bounty => bounty.senderId === currentUser.userId);
  const acceptedBounties = userBounties.filter(bounty => bounty.courierId === currentUser.userId);
  
  // Mock reviews
  const mockReviews = [
    {
      reviewId: 'review1',
      bountyId: 'bounty1',
      reviewerId: 'user2',
      revieweeId: currentUser.userId,
      rating: 5,
      comment: 'Excellent courier! Fast and reliable delivery.',
      createdAt: new Date('2024-12-19'),
    },
    {
      reviewId: 'review2',
      bountyId: 'bounty2',
      reviewerId: 'user3',
      revieweeId: currentUser.userId,
      rating: 4,
      comment: 'Good service, delivered on time.',
      createdAt: new Date('2024-12-18'),
    },
  ];

  const stats = {
    totalEarnings: acceptedBounties
      .filter(b => b.status === 'completed')
      .reduce((sum, b) => sum + parseFloat(b.rewardAmount), 0)
      .toFixed(3),
    completedDeliveries: acceptedBounties.filter(b => b.status === 'completed').length,
    successRate: acceptedBounties.length > 0 
      ? Math.round((acceptedBounties.filter(b => b.status === 'completed').length / acceptedBounties.length) * 100)
      : 0,
    averageRating: currentUser.reputationScore,
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="glass-card p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <UserIcon className="w-10 h-10 text-white" />
          </div>
          
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white mb-2">
              {currentUser.farcasterProfile?.displayName || 'Anonymous User'}
            </h1>
            <p className="text-purple-200 mb-3">
              @{currentUser.farcasterProfile?.username || 'anonymous'}
            </p>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-purple-300" />
                <span className="text-purple-200">
                  Joined {timeAgo(currentUser.createdAt)}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-purple-300" />
                <span className="text-purple-200">
                  {formatAddress(currentUser.walletAddress)}
                </span>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center gap-2 mb-2">
              <RatingStars rating={currentUser.reputationScore} />
            </div>
            <div className="flex items-center gap-2">
              {currentUser.isCourier && (
                <span className="status-badge bg-green-500 bg-opacity-20 text-green-300 border border-green-400 border-opacity-30">
                  <Truck className="w-3 h-3 mr-1" />
                  Courier
                </span>
              )}
              <span className="status-badge bg-blue-500 bg-opacity-20 text-blue-300 border border-blue-400 border-opacity-30">
                <Award className="w-3 h-3 mr-1" />
                Verified
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="metric-card text-center">
          <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white mb-1">
            {formatEth(stats.totalEarnings)}
          </div>
          <div className="text-purple-200 text-sm">Total Earnings</div>
        </div>
        
        <div className="metric-card text-center">
          <Package className="w-8 h-8 text-blue-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white mb-1">
            {stats.completedDeliveries}
          </div>
          <div className="text-purple-200 text-sm">Completed</div>
        </div>
        
        <div className="metric-card text-center">
          <Clock className="w-8 h-8 text-purple-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white mb-1">
            {stats.successRate}%
          </div>
          <div className="text-purple-200 text-sm">Success Rate</div>
        </div>
        
        <div className="metric-card text-center">
          <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white mb-1">
            {stats.averageRating.toFixed(1)}
          </div>
          <div className="text-purple-200 text-sm">Avg Rating</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="glass-card">
        <div className="border-b border-white border-opacity-20">
          <nav className="flex">
            {[
              { id: 'overview', label: 'Overview', icon: UserIcon },
              { id: 'bounties', label: 'My Bounties', icon: Package },
              { id: 'reviews', label: 'Reviews', icon: Star },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'text-white border-b-2 border-purple-400'
                    : 'text-purple-200 hover:text-white'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {userBounties.slice(0, 3).map((bounty) => (
                    <div key={bounty.bountyId} className="flex items-center justify-between p-4 bg-white bg-opacity-5 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          bounty.status === 'completed' ? 'bg-green-400' :
                          bounty.status === 'in_progress' ? 'bg-yellow-400' :
                          'bg-blue-400'
                        }`}></div>
                        <div>
                          <div className="text-white font-medium">
                            {bounty.senderId === currentUser.userId ? 'Posted' : 'Accepted'}: {bounty.itemDescription}
                          </div>
                          <div className="text-purple-200 text-sm">
                            {timeAgo(bounty.updatedAt)}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-medium">
                          {formatEth(bounty.rewardAmount)}
                        </div>
                        <StatusBadge status={bounty.status} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bounties' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">
                  Bounties I Posted ({sentBounties.length})
                </h3>
                <div className="space-y-4">
                  {sentBounties.map((bounty) => (
                    <BountyCard
                      key={bounty.bountyId}
                      bounty={bounty}
                      courier={bounty.courierId ? MOCK_USERS.find(u => u.userId === bounty.courierId) : undefined}
                      variant="detailed"
                    />
                  ))}
                </div>
              </div>

              {currentUser.isCourier && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Bounties I Accepted ({acceptedBounties.length})
                  </h3>
                  <div className="space-y-4">
                    {acceptedBounties.map((bounty) => (
                      <BountyCard
                        key={bounty.bountyId}
                        bounty={bounty}
                        sender={MOCK_USERS.find(u => u.userId === bounty.senderId)}
                        variant="detailed"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">
                Reviews ({mockReviews.length})
              </h3>
              
              {mockReviews.map((review) => (
                <div key={review.reviewId} className="p-4 bg-white bg-opacity-5 rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-white">R</span>
                      </div>
                      <div>
                        <div className="text-white font-medium">Reviewer</div>
                        <div className="text-purple-200 text-sm">
                          {timeAgo(review.createdAt)}
                        </div>
                      </div>
                    </div>
                    <RatingStars rating={review.rating} />
                  </div>
                  <p className="text-purple-100">{review.comment}</p>
                </div>
              ))}
              
              {mockReviews.length === 0 && (
                <div className="text-center py-8">
                  <Star className="w-12 h-12 text-purple-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">No reviews yet</h3>
                  <p className="text-purple-200">
                    Complete some deliveries to start receiving reviews
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
