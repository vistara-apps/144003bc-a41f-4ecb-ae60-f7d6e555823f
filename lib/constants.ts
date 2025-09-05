export const APP_CONFIG = {
  name: 'Ship & Earn',
  tagline: 'Decentralized Delivery Bounties: Connect, Ship, Earn.',
  version: '1.0.0',
  supportEmail: 'support@shipandearn.com',
};

export const BOUNTY_STATUS = {
  OPEN: 'open',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

export const URGENCY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
} as const;

export const PLATFORM_FEE_PERCENTAGE = 2.5; // 2.5%

export const MIN_BOUNTY_AMOUNT = '0.001'; // 0.001 ETH minimum
export const MAX_BOUNTY_AMOUNT = '10'; // 10 ETH maximum

export const REPUTATION_THRESHOLDS = {
  EXCELLENT: 4.5,
  GOOD: 4.0,
  AVERAGE: 3.0,
  POOR: 2.0,
};

export const MOCK_USERS = [
  {
    userId: 'user1',
    walletAddress: '0x1234567890123456789012345678901234567890',
    reputationScore: 4.8,
    isCourier: true,
    createdAt: new Date('2024-01-15'),
    farcasterProfile: {
      username: 'speedycourier',
      displayName: 'Speedy Courier',
      avatar: 'https://via.placeholder.com/40',
    },
  },
  {
    userId: 'user2',
    walletAddress: '0x2345678901234567890123456789012345678901',
    reputationScore: 4.2,
    isCourier: false,
    createdAt: new Date('2024-02-01'),
    farcasterProfile: {
      username: 'sender123',
      displayName: 'John Sender',
      avatar: 'https://via.placeholder.com/40',
    },
  },
];

export const MOCK_BOUNTIES = [
  {
    bountyId: 'bounty1',
    senderId: 'user2',
    pickupLocation: 'Downtown Coffee Shop, 123 Main St',
    dropoffLocation: 'Tech Office, 456 Innovation Blvd',
    itemDescription: 'Coffee order for team meeting (2 bags)',
    rewardAmount: '0.05',
    status: 'open' as const,
    createdAt: new Date('2024-12-20T10:00:00Z'),
    updatedAt: new Date('2024-12-20T10:00:00Z'),
    estimatedDistance: 2500,
    urgency: 'high' as const,
  },
  {
    bountyId: 'bounty2',
    senderId: 'user2',
    courierId: 'user1',
    pickupLocation: 'Electronics Store, 789 Tech Ave',
    dropoffLocation: 'Residential, 321 Home St',
    itemDescription: 'Small electronics package',
    rewardAmount: '0.08',
    status: 'in_progress' as const,
    createdAt: new Date('2024-12-20T09:00:00Z'),
    updatedAt: new Date('2024-12-20T11:30:00Z'),
    estimatedDistance: 4200,
    urgency: 'medium' as const,
  },
  {
    bountyId: 'bounty3',
    senderId: 'user1',
    courierId: 'user2',
    pickupLocation: 'Pharmacy, 555 Health Rd',
    dropoffLocation: 'Senior Center, 777 Care Blvd',
    itemDescription: 'Prescription medication delivery',
    rewardAmount: '0.12',
    status: 'completed' as const,
    createdAt: new Date('2024-12-19T14:00:00Z'),
    updatedAt: new Date('2024-12-19T16:45:00Z'),
    estimatedDistance: 1800,
    urgency: 'high' as const,
  },
];
