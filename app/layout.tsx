import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ship & Earn - Decentralized Delivery Bounties',
  description: 'Connect, Ship, Earn. A decentralized marketplace on Base for delivery tasks with trust and automated payments.',
  keywords: ['delivery', 'bounties', 'Base', 'blockchain', 'decentralized'],
  authors: [{ name: 'Ship & Earn Team' }],
  openGraph: {
    title: 'Ship & Earn - Decentralized Delivery Bounties',
    description: 'Connect, Ship, Earn. A decentralized marketplace on Base for delivery tasks.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
