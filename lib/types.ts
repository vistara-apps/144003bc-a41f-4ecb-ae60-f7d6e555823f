export interface User {
  userId: string;
  walletAddress: string;
  reputationScore: number;
  isCourier: boolean;
  createdAt: Date;
  farcasterProfile?: {
    username: string;
    displayName: string;
    avatar?: string;
  };
}

export interface Bounty {
  bountyId: string;
  senderId: string;
  courierId?: string;
  pickupLocation: string;
  dropoffLocation: string;
  itemDescription: string;
  rewardAmount: string; // in ETH
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
  deliveryProofCID?: string;
  estimatedDistance?: number;
  urgency?: 'low' | 'medium' | 'high';
}

export interface Review {
  reviewId: string;
  bountyId: string;
  reviewerId: string;
  revieweeId: string;
  rating: number; // 1-5
  comment: string;
  createdAt: Date;
}

export interface DashboardStats {
  totalDeliveries: number;
  courierReliability: number;
  courierTasks: number;
  totalEarnings: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}
