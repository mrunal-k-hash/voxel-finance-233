import React, { useContext, useState } from 'react';
import { FinanceContext } from '../context/FinanceContext';

const ProfileSettings = () => {
  const { user, settings, updateSettings, resetAllData, logout } = useContext(FinanceContext);
  const [confirmReset, setConfirmReset] = useState(false);

  const currencies = [
    { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' }
  ];

  return (
    <div className="space-y-8 text-left max-w-3xl">
      <div>
        <h1 className="font-headline-lg text-2xl md:text-3xl font-bold text-on-surface">Profile & Settings</h1>
        <p className="text-on-surface-variant text-sm mt-1">Configure your account preferences and system parameters.</p>
      </div>

      {/* Profile Card */}
      <div className="glass-panel rounded-2xl p-6">
        <h3 className="font-label-mono text-[10px] text-on-surface-variant uppercase tracking-widest mb-6">Account Profile</h3>
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary border border-primary/30">
            <span className="material-symbols-outlined text-[32px]">person</span>
          </div>
          <div>
            <h2 className="font-headline-lg text-xl font-bold text-on-surface">{user?.name || 'User'}</h2>
            <p className="text-sm text-on-surface-variant">{user?.email || 'user@voxel.finance'}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-label-mono text-primary uppercase">Pro Account</span>
              <span className="px-2.5 py-0.5 rounded-full bg-secondary/10 border border-secondary/20 text-[10px] font-label-mono text-secondary uppercase">Verified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Currency Selection */}
      <div className="glass-panel rounded-2xl p-6">
        <h3 className="font-label-mono text-[10px] text-on-surface-variant uppercase tracking-widest mb-4">Currency Preference</h3>
        <p className="text-xs text-on-surface-variant mb-4">Select your default currency. All amounts will be displayed with this symbol.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {currencies.map(c => (
            <button
              key={c.code}
              onClick={() => updateSettings('currency', c.code)}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                settings.currency === c.code
                  ? 'bg-primary/10 border-primary/30 text-primary'
                  : 'border-glass-border text-on-surface-variant hover:bg-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold">{c.symbol}</span>
                <div>
                  <p className="text-sm font-bold">{c.code}</p>
                  <p className="text-[10px] font-label-mono">{c.name}</p>
                </div>
              </div>
              {settings.currency === c.code && (
                <span className="material-symbols-outlined text-primary text-[16px] mt-2">check_circle</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Preferences */}
      <div className="glass-panel rounded-2xl p-6">
        <h3 className="font-label-mono text-[10px] text-on-surface-variant uppercase tracking-widest mb-4">Visual Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white/[0.02] rounded-xl border border-glass-border">
            <div>
              <p className="text-sm font-bold text-on-surface">Enable Animations</p>
              <p className="text-[10px] text-on-surface-variant">Smooth transitions and micro-interactions</p>
            </div>
            <button
              onClick={() => updateSettings('animations', !settings.animations)}
              className={`w-12 h-6 rounded-full p-0.5 transition-all cursor-pointer ${settings.animations ? 'bg-primary' : 'bg-surface-container-highest'}`}
            >
              <div className={`w-5 h-5 rounded-full bg-white transition-transform ${settings.animations ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-white/[0.02] rounded-xl border border-glass-border">
            <div>
              <p className="text-sm font-bold text-on-surface">Dark Mode</p>
              <p className="text-[10px] text-on-surface-variant">Premium dark interface (always on)</p>
            </div>
            <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-label-mono text-primary">ACTIVE</div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="glass-panel rounded-2xl p-6 border-error/20">
        <h3 className="font-label-mono text-[10px] text-error uppercase tracking-widest mb-4">Danger Zone</h3>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-error/5 rounded-xl border border-error/10">
            <div>
              <p className="text-sm font-bold text-on-surface">Reset All Data</p>
              <p className="text-[10px] text-on-surface-variant">Resets transactions, budgets, goals, and AI messages to default state.</p>
            </div>
            {confirmReset ? (
              <div className="flex gap-2">
                <button
                  onClick={() => { resetAllData(); setConfirmReset(false); }}
                  className="px-4 py-2 bg-error text-white rounded-xl text-xs font-bold hover:brightness-110 transition-all cursor-pointer"
                >
                  Confirm Reset
                </button>
                <button
                  onClick={() => setConfirmReset(false)}
                  className="px-4 py-2 bg-white/5 border border-glass-border rounded-xl text-xs font-bold hover:bg-white/10 transition-all cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmReset(true)}
                className="px-4 py-2 bg-error/10 border border-error/20 text-error rounded-xl text-xs font-bold hover:bg-error/20 transition-all cursor-pointer"
              >
                Reset Data
              </button>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-white/[0.02] rounded-xl border border-glass-border">
            <div>
              <p className="text-sm font-bold text-on-surface">Sign Out</p>
              <p className="text-[10px] text-on-surface-variant">Return to the landing page.</p>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 bg-white/5 border border-glass-border rounded-xl text-xs font-bold hover:bg-error/10 hover:text-error hover:border-error/20 transition-all cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
