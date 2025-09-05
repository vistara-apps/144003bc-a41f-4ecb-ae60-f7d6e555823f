# Ship & Earn - Decentralized Delivery Bounties

A decentralized marketplace on Base for easily posting, finding, and executing delivery tasks with trust and automated payments.

## Features

- **Simple Bounty Posting**: Streamlined interface for creating delivery requests
- **Intelligent Matchmaking**: Algorithm-based courier suggestions and discovery
- **Reputation & Rating System**: Community-driven trust scores on-chain
- **Smart Contract Escrow**: Automated payment system using Base smart contracts

## Tech Stack

- **Frontend**: Next.js 15 with App Router, TypeScript, Tailwind CSS
- **Blockchain**: Base network with OnchainKit integration
- **Wallet**: MiniKit provider for seamless wallet connections
- **Identity**: Farcaster integration for social profiles
- **Storage**: IPFS via Pinata for delivery proofs

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Copy `.env.local` and add your API keys:
   ```bash
   NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_api_key
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Architecture

### Data Models

- **User**: Wallet address, reputation score, Farcaster profile
- **Bounty**: Pickup/dropoff locations, reward amount, status, delivery proof
- **Review**: Rating and comments for completed deliveries

### User Flows

1. **Post Bounty**: Create delivery request → Lock reward in escrow → List in marketplace
2. **Accept Bounty**: Browse bounties → Accept task → Update status to in-progress
3. **Complete Delivery**: Upload proof → Confirm delivery → Release payment → Leave reviews

### Smart Contracts

- **Escrow Contract**: Holds bounty rewards until delivery confirmation
- **Reputation Contract**: Stores user ratings and trust scores on-chain
- **Bounty Registry**: Manages bounty lifecycle and status updates

## API Integration

- **Base RPC**: Direct blockchain interactions
- **Farcaster**: User identity and social features
- **Pinata**: Decentralized storage for delivery proofs
- **Privy**: Wallet management and authentication

## Design System

- **Colors**: Purple gradient theme with glass morphism effects
- **Typography**: Clean, readable fonts with proper hierarchy
- **Components**: Modular, reusable UI components
- **Responsive**: Mobile-first design approach

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support, email support@shipandearn.com or join our community.
