'use client';

import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name } from '@coinbase/onchainkit/identity';
import { Home, Plus, User, Bell } from 'lucide-react';
import { APP_CONFIG } from '@/lib/constants';

interface HeaderProps {
  currentView: 'dashboard' | 'post' | 'profile';
  onViewChange: (view: 'dashboard' | 'post' | 'profile') => void;
}

export function Header({ currentView, onViewChange }: HeaderProps) {
  return (
    <header className="glass-card p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Home className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">
              {APP_CONFIG.name}
            </h1>
            <p className="text-sm text-purple-200">
              {APP_CONFIG.tagline}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-2">
            <button
              onClick={() => onViewChange('dashboard')}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                currentView === 'dashboard'
                  ? 'bg-white bg-opacity-20 text-white'
                  : 'text-purple-200 hover:text-white hover:bg-white hover:bg-opacity-10'
              }`}
            >
              <Home className="w-5 h-5" />
            </button>
            <button
              onClick={() => onViewChange('post')}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                currentView === 'post'
                  ? 'bg-white bg-opacity-20 text-white'
                  : 'text-purple-200 hover:text-white hover:bg-white hover:bg-opacity-10'
              }`}
            >
              <Plus className="w-5 h-5" />
            </button>
            <button
              onClick={() => onViewChange('profile')}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                currentView === 'profile'
                  ? 'bg-white bg-opacity-20 text-white'
                  : 'text-purple-200 hover:text-white hover:bg-white hover:bg-opacity-10'
              }`}
            >
              <User className="w-5 h-5" />
            </button>
          </nav>

          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg text-purple-200 hover:text-white hover:bg-white hover:bg-opacity-10 transition-colors duration-200">
              <Bell className="w-5 h-5" />
            </button>
            
            <Wallet>
              <ConnectWallet>
                <Name className="text-white" />
              </ConnectWallet>
            </Wallet>
          </div>
        </div>
      </div>
    </header>
  );
}
