import { useContext } from 'react';
import { FinanceContext } from '../context/FinanceContext';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { user, logout } = useContext(FinanceContext);

  const navItems = [
    { id: 'analytics', label: 'Analytics', icon: 'insights' },
    { id: 'goals', label: 'Goals', icon: 'track_changes' },
    { id: 'expenses', label: 'Budget Tracker', icon: 'receipt_long' },
    { id: 'ai-insights', label: 'AI Insights', icon: 'psychology' },
    { id: 'settings', label: 'Settings', icon: 'settings' }
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen flex flex-col bg-surface-container/40 backdrop-blur-md border-r glass-border w-64 pt-24 hidden lg:flex z-40">
      {/* User Header */}
      <div className="px-6 mb-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/30">
          <span className="material-symbols-outlined">person</span>
        </div>
        <div>
          <p className="font-headline-lg text-primary text-sm font-semibold truncate max-w-[140px]">
            {user ? user.name : 'Voxel Pro'}
          </p>
          <p className="font-label-mono text-[10px] text-on-surface-variant uppercase mt-0.5">
            Premium Tier
          </p>
        </div>
      </div>

      {/* Nav Items */}
      <div className="flex-1 space-y-1 px-4">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all group ${
                isActive
                  ? 'text-primary border-r-4 border-primary bg-primary/10 font-bold'
                  : 'text-on-surface-variant hover:bg-white/5 hover:text-on-surface'
              }`}
            >
              <span
                className={`material-symbols-outlined ${
                  isActive ? 'text-primary' : 'text-on-surface-variant group-hover:text-primary'
                } transition-colors`}
              >
                {item.icon}
              </span>
              <span className="font-label-mono text-xs uppercase tracking-wider">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Bottom Upgrade Callout */}
      <div className="p-4 mt-auto space-y-2">
        <div className="p-3 bg-primary/5 rounded-xl border border-primary/10 text-center mb-2">
          <p className="text-[10px] font-label-mono text-primary uppercase">Precision Mode</p>
          <p className="text-[11px] text-on-surface-variant mt-1">Harness the AI Analytics engine</p>
        </div>
        <button 
          onClick={logout}
          className="w-full py-2 bg-error/10 hover:bg-error/20 text-error rounded-xl font-label-mono text-xs uppercase transition-all active:scale-95 border border-error/20"
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
