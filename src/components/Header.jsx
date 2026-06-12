import React, { useContext, useState } from 'react';
import { FinanceContext } from '../context/FinanceContext';

const Header = ({ activeTab, setActiveTab }) => {
  const { user, transactions, formatMoney } = useContext(FinanceContext);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Compute Current Portfolio Balance (Net Worth)
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const netWorth = totalIncome - totalExpense;

  const navItems = [
    { id: 'analytics', label: 'Analytics', icon: 'insights' },
    { id: 'goals', label: 'Goals', icon: 'track_changes' },
    { id: 'expenses', label: 'Budget Tracker', icon: 'receipt_long' },
    { id: 'budget', label: 'Budget', icon: 'account_balance_wallet' },
    { id: 'ai-insights', label: 'AI Insights', icon: 'psychology' },
    { id: 'settings', label: 'Settings', icon: 'settings' }
  ];

  return (
    <header className="sticky top-4 z-50 w-full max-w-[1200px] mx-auto px-4">
      <div className="flex justify-between items-center px-6 bg-surface/60 backdrop-blur-xl rounded-xl border glass-border shadow-[0_0_20px_rgba(16,185,129,0.1)] h-16 w-full">
        {/* Logo */}
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => setActiveTab('analytics')}>
          <span className="font-display-lg text-xl md:text-2xl tracking-tighter text-primary font-bold">
            Voxel Finance
          </span>
          {user && (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-label-mono text-primary">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              LIVE: {formatMoney(netWorth)}
            </div>
          )}
        </div>

        {/* Desktop Navigation Link Toggles */}
        {user ? (
          <div className="hidden lg:flex items-center gap-4 font-label-mono text-xs text-on-surface-variant">
            <span>Logged in as: <strong className="text-primary">{user.name}</strong></span>
          </div>
        ) : (
          <nav className="hidden md:flex items-center gap-8 font-body-md text-sm text-on-surface-variant">
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#stats" className="hover:text-primary transition-colors">Stats</a>
            <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
          </nav>
        )}

        {/* Action Buttons / Mobile Toggle */}
        <div className="flex items-center gap-4">
          {user ? (
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-on-surface-variant hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined">{mobileOpen ? 'close' : 'menu'}</span>
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTab('auth')}
                className="px-4 py-2 rounded-xl text-primary border border-primary/20 hover:bg-primary/10 transition-all active:scale-95 text-xs font-semibold"
              >
                Sign In
              </button>
              <button
                onClick={() => setActiveTab('auth')}
                className="px-4 py-2 rounded-xl bg-primary text-on-primary font-bold shadow-[0_0_15px_rgba(78,222,163,0.3)] hover:brightness-110 transition-all active:scale-95 text-xs"
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Sidebar overlay */}
      {mobileOpen && user && (
        <div className="lg:hidden fixed inset-0 top-20 bg-background/95 backdrop-blur-md z-40 p-6 flex flex-col gap-4 border-t border-glass-border">
          <div className="flex items-center gap-3 mb-6 p-4 bg-surface-container/50 rounded-xl border border-glass-border">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">person</span>
            </div>
            <div>
              <p className="font-bold text-primary">{user.name}</p>
              <p className="text-xs text-on-surface-variant uppercase font-label-mono">Premium Account</p>
            </div>
          </div>
          <div className="flex-1 space-y-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                    isActive
                      ? 'text-primary bg-primary/10 border-l-4 border-primary font-bold'
                      : 'text-on-surface-variant hover:bg-white/5'
                  }`}
                >
                  <span className="material-symbols-outlined">{item.icon}</span>
                  <span className="font-label-mono text-xs uppercase tracking-wider">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
