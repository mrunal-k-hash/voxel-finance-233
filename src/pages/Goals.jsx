import React, { useContext, useState } from 'react';
import { FinanceContext } from '../context/FinanceContext';

const Goals = () => {
  const { goals, addGoal, addFundsToGoal, formatMoney } = useContext(FinanceContext);
  const [showForm, setShowForm] = useState(false);
  const [fundGoal, setFundGoal] = useState(null);
  const [fundAmount, setFundAmount] = useState('');
  const [form, setForm] = useState({ title: '', target: '', initial: '', date: '' });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!form.title || !form.target) return;
    addGoal(form.title, form.target, form.initial, form.date);
    setForm({ title: '', target: '', initial: '', date: '' });
    setShowForm(false);
  };

  const handleFund = (id) => {
    if (!fundAmount) return;
    addFundsToGoal(id, fundAmount);
    setFundGoal(null);
    setFundAmount('');
  };

  const goalColors = ['from-primary to-emerald-glow', 'from-secondary to-electric-blue', 'from-chart-warning to-yellow-500', 'from-tertiary to-purple-400'];

  return (
    <div className="space-y-8 text-left">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-headline-lg text-2xl md:text-3xl font-bold text-on-surface">Savings Goals</h1>
          <p className="text-on-surface-variant text-sm mt-1">Build wealth milestones and track your trajectory to financial freedom.</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary rounded-xl font-bold text-sm shadow-[0_0_15px_rgba(78,222,163,0.2)] hover:brightness-110 transition-all active:scale-95 cursor-pointer">
          <span className="material-symbols-outlined text-[18px]">{showForm ? 'close' : 'add'}</span>
          {showForm ? 'Cancel' : 'New Goal'}
        </button>
      </div>

      {/* Create Goal Form */}
      {showForm && (
        <form onSubmit={handleCreate} className="glass-panel rounded-2xl p-6 space-y-4 border-primary/20">
          <h3 className="font-headline-lg text-base font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">flag</span>
            Define New Milestone
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-label-mono text-[10px] uppercase text-on-surface-variant">Goal Name</label>
              <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. Emergency Fund" className="w-full px-4 py-2.5 bg-surface-container/50 border border-glass-border rounded-xl text-sm focus:outline-none focus:border-primary text-on-surface" required />
            </div>
            <div className="space-y-1.5">
              <label className="font-label-mono text-[10px] uppercase text-on-surface-variant">Target Amount</label>
              <input type="number" value={form.target} onChange={e => setForm({ ...form, target: e.target.value })} placeholder="500000" className="w-full px-4 py-2.5 bg-surface-container/50 border border-glass-border rounded-xl text-sm focus:outline-none focus:border-primary text-on-surface font-chart-value" required />
            </div>
            <div className="space-y-1.5">
              <label className="font-label-mono text-[10px] uppercase text-on-surface-variant">Initial Deposit</label>
              <input type="number" value={form.initial} onChange={e => setForm({ ...form, initial: e.target.value })} placeholder="0" className="w-full px-4 py-2.5 bg-surface-container/50 border border-glass-border rounded-xl text-sm focus:outline-none focus:border-primary text-on-surface font-chart-value" />
            </div>
            <div className="space-y-1.5">
              <label className="font-label-mono text-[10px] uppercase text-on-surface-variant">Target Date</label>
              <input type="text" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} placeholder="e.g. December 2028" className="w-full px-4 py-2.5 bg-surface-container/50 border border-glass-border rounded-xl text-sm focus:outline-none focus:border-primary text-on-surface" />
            </div>
          </div>
          <button type="submit" className="px-6 py-2.5 bg-primary text-on-primary rounded-xl font-bold text-sm hover:brightness-110 transition-all cursor-pointer flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
            Create Milestone
          </button>
        </form>
      )}

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map((g, i) => {
          const pct = Math.min(100, Math.round((g.current / g.target) * 100));
          const gradientClass = goalColors[i % goalColors.length];
          const isFunding = fundGoal === g.id;

          return (
            <div key={g.id} className="glass-panel rounded-2xl p-6 relative overflow-hidden">
              {/* Completion glow */}
              {pct >= 100 && (
                <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>
              )}

              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                    <span className="material-symbols-outlined">{pct >= 100 ? 'emoji_events' : 'flag'}</span>
                  </div>
                  <div>
                    <h3 className="font-headline-lg text-base font-bold text-on-surface">{g.title}</h3>
                    <p className="text-[10px] font-label-mono text-on-surface-variant uppercase">
                      {pct >= 100 ? '🎉 GOAL ACHIEVED' : `Projected: ${g.projectedDate}`}
                    </p>
                  </div>
                </div>
                <span className={`text-xs font-bold font-chart-value px-2.5 py-1 rounded-full ${pct >= 100 ? 'bg-primary/10 text-primary' : 'bg-white/5 text-on-surface-variant'}`}>
                  {pct}%
                </span>
              </div>

              {/* Amount Display */}
              <div className="flex justify-between text-sm mb-2">
                <span className="text-on-surface-variant">Accumulated</span>
                <span className="font-chart-value font-bold text-primary">{formatMoney(g.current)}</span>
              </div>
              <div className="flex justify-between text-sm mb-4">
                <span className="text-on-surface-variant">Target</span>
                <span className="font-chart-value font-bold text-on-surface">{formatMoney(g.target)}</span>
              </div>

              {/* Progress Bar */}
              <div className="h-3 bg-white/5 rounded-full overflow-hidden border border-glass-border mb-4">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${gradientClass} transition-all duration-700`}
                  style={{ width: `${pct}%` }}
                />
              </div>

              {/* Add Funds Toggle */}
              {pct < 100 && (
                <div>
                  {isFunding ? (
                    <div className="flex gap-2 items-center">
                      <input
                        type="number"
                        value={fundAmount}
                        onChange={e => setFundAmount(e.target.value)}
                        placeholder="Amount to add"
                        className="flex-1 px-3 py-2 bg-surface-container/50 border border-primary/30 rounded-xl text-xs focus:outline-none focus:border-primary text-on-surface font-chart-value"
                        autoFocus
                      />
                      <button onClick={() => handleFund(g.id)} className="p-2 bg-primary text-on-primary rounded-xl hover:brightness-110 transition-all">
                        <span className="material-symbols-outlined text-[18px]">add</span>
                      </button>
                      <button onClick={() => { setFundGoal(null); setFundAmount(''); }} className="p-2 bg-error/10 text-error rounded-xl hover:bg-error/20 transition-all">
                        <span className="material-symbols-outlined text-[18px]">close</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setFundGoal(g.id)}
                      className="w-full py-2.5 bg-white/5 border border-glass-border rounded-xl text-xs font-label-mono uppercase hover:bg-primary/10 hover:text-primary hover:border-primary/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined text-[16px]">savings</span>
                      Add Funds
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {goals.length === 0 && (
          <div className="col-span-2 glass-panel rounded-2xl p-16 text-center">
            <span className="material-symbols-outlined text-[64px] text-on-surface-variant/30 block mb-4">flag</span>
            <p className="text-on-surface-variant text-sm">No milestones created yet. Click "New Goal" to start.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Goals;
