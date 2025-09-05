'use client';

import { useState, useEffect } from 'react';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { FrameContainer } from '@/components/FrameContainer';
import { Header } from '@/components/Header';
import { Dashboard } from '@/components/Dashboard';
import { PostBounty } from '@/components/PostBounty';
import { Profile } from '@/components/Profile';

export default function Home() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'post' | 'profile'>('dashboard');
  const { setFrameReady } = useMiniKit();

  useEffect(() => {
    setFrameReady();
  }, [setFrameReady]);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'post':
        return <PostBounty />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <FrameContainer>
      <Header 
        currentView={currentView} 
        onViewChange={setCurrentView} 
      />
      
      <main className="animate-fade-in">
        {renderCurrentView()}
      </main>
      
      {/* Footer */}
      <footer className="mt-12 text-center text-purple-300 text-sm">
        <p>Ship & Earn - Decentralized Delivery Bounties on Base</p>
        <p className="mt-1">Built with OnchainKit & MiniKit</p>
      </footer>
    </FrameContainer>
  );
}
