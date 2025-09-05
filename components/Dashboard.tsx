'use client';

import { useState } from 'react';
import { BountyCard } from './BountyCard';
import { MetricCard } from './MetricCard';
import { TextInput } from './TextInput';
import { MOCK_BOUNTIES, MOCK_USERS } from '@/lib/constants';
import { Bounty, User, DashboardStats } from '@/lib/types';
import { Search, Package, Truck, Star, DollarSign, TrendingUp, Filter } from 'lucide-react';

export function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'open' | 'in_progress' | 'completed'>('all');
  
  // Mock data - in real app, this would come from API/blockchain
  const bounties: Bounty[] = MOCK_BOUNTIES;
  const users: User[] = MOCK_USERS;
  
  const stats: DashboardStats = {
    totalDeliveries: 2752,
    courierReliability: 3248,
    courierTasks: 2258,
    totalEarnings: '1244.5',
  };

  const filteredBounties = bounties.filter(bounty => {
    const matchesSearch = bounty.itemDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bounty.pickupLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bounty.dropoffLocation.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || bounty.status === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const getUserById = (userId: string) => users.find(user => user.userId === userId);

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="glass-card p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300 w-5 h-5" />
              <input
                type="text"
                placeholder="Search bounties, locations, or items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-purple-300" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value as any)}
              className="input-field min-w-[120px]"
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Deliveries"
          value={stats.totalDeliveries.toLocaleString()}
          icon={<Package className="w-5 h-5" />}
          subtitle="All time"
        />
        <MetricCard
          title="Courier Reliability"
          value={`${stats.courierReliability.toLocaleString()}`}
          icon={<Truck className="w-5 h-5" />}
          subtitle="Active couriers"
        />
        <MetricCard
          title="Courier Tasks"
          value={stats.courierTasks.toLocaleString()}
          icon={<Star className="w-5 h-5" />}
          subtitle="Completed tasks"
        />
        <MetricCard
          title="Total Volume"
          value={`$${stats.totalEarnings}K`}
          icon={<DollarSign className="w-5 h-5" />}
          subtitle="Platform volume"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bounties List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">
              Active Bounties
            </h2>
            <div className="text-sm text-purple-200">
              {filteredBounties.length} bounties found
            </div>
          </div>
          
          <div className="space-y-4">
            {filteredBounties.map((bounty) => (
              <BountyCard
                key={bounty.bountyId}
                bounty={bounty}
                sender={getUserById(bounty.senderId)}
                courier={bounty.courierId ? getUserById(bounty.courierId) : undefined}
                variant="detailed"
                onClick={() => {
                  // Handle bounty click - would navigate to detail view
                  console.log('Clicked bounty:', bounty.bountyId);
                }}
              />
            ))}
          </div>
          
          {filteredBounties.length === 0 && (
            <div className="glass-card p-8 text-center">
              <Package className="w-12 h-12 text-purple-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">
                No bounties found
              </h3>
              <p className="text-purple-200">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Stats
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-purple-200">Open Bounties</span>
                <span className="text-white font-medium">
                  {bounties.filter(b => b.status === 'open').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-purple-200">In Progress</span>
                <span className="text-white font-medium">
                  {bounties.filter(b => b.status === 'in_progress').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-purple-200">Completed Today</span>
                <span className="text-white font-medium">
                  {bounties.filter(b => b.status === 'completed').length}
                </span>
              </div>
            </div>
          </div>

          {/* Top Couriers */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Top Couriers
            </h3>
            <div className="space-y-3">
              {users
                .filter(user => user.isCourier)
                .sort((a, b) => b.reputationScore - a.reputationScore)
                .slice(0, 3)
                .map((courier, index) => (
                  <div key={courier.userId} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-white">
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-medium">
                        {courier.farcasterProfile?.displayName || 'Anonymous'}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-purple-200">
                          {courier.reputationScore.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Recent Activity
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <div className="text-sm text-purple-200">
                  New bounty posted: Coffee delivery
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <div className="text-sm text-purple-200">
                  Bounty accepted by SpeedyCourier
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <div className="text-sm text-purple-200">
                  Delivery completed successfully
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
