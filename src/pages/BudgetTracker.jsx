import { useContext, useState } from 'react';
import { FinanceContext } from '../context/FinanceContext';

const BudgetTracker = () => {
  const { transactions, addTransaction, deleteTransaction, formatMoney, budgets } = useContext(FinanceContext);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const categories = Object.keys(budgets).length > 0 ? Object.keys(budgets) : ['Uncategorized'];
  const [form, setForm] = useState({ title: '', amount: '', category: categories[0], type: 'expense', date: new Date().toISOString().split('T')[0] });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.amount) return;
    addTransaction(form);
    setForm({ title: '', amount: '', category: categories[0], type: 'expense', date: new Date().toISOString().split('T')[0] });
    setShowForm(false);
  };

  const filtered = transactions.filter(t => {
    if (filter !== 'all' && t.type !== filter) return false;
    if (search && !t.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);

  const catIcons = { Essentials: 'home', Investments: 'trending_up', Leisure: 'sports_esports' };

  return (
    <div className="space-y-8 text-left">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-headline-lg text-2xl md:text-3xl font-bold text-on-surface">Budget Tracker</h1>
          <p className="text-on-surface-variant text-sm mt-1">Manage, categorize, and track every financial event.</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary rounded-xl font-bold text-sm shadow-[0_0_15px_rgba(78,222,163,0.2)] hover:brightness-110 transition-all active:scale-95 cursor-pointer">
          <span className="material-symbols-outlined text-[18px]">{showForm ? 'close' : 'add'}</span>
          {showForm ? 'Cancel' : 'New Transaction'}
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel rounded-2xl p-5">
          <p className="font-label-mono text-[10px] text-on-surface-variant uppercase mb-1">Total Income</p>
          <p className="font-display-lg text-xl font-bold text-primary">{formatMoney(totalIncome)}</p>
        </div>
        <div className="glass-panel rounded-2xl p-5">
          <p className="font-label-mono text-[10px] text-on-surface-variant uppercase mb-1">Total Expenses</p>
          <p className="font-display-lg text-xl font-bold text-error">{formatMoney(totalExpense)}</p>
        </div>
        <div className="glass-panel rounded-2xl p-5">
          <p className="font-label-mono text-[10px] text-on-surface-variant uppercase mb-1">Net Flow</p>
          <p className={`font-display-lg text-xl font-bold ${totalIncome - totalExpense >= 0 ? 'text-primary' : 'text-error'}`}>
            {formatMoney(totalIncome - totalExpense)}
          </p>
        </div>
      </div>

      {/* Add Transaction Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="glass-panel rounded-2xl p-6 space-y-4 border-primary/20 animate-[fadeIn_0.3s_ease]">
          <h3 className="font-headline-lg text-base font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">edit_note</span>
            Log New Transaction
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-label-mono text-[10px] uppercase text-on-surface-variant">Description</label>
              <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. Netflix subscription" className="w-full px-4 py-2.5 bg-surface-container/50 border border-glass-border rounded-xl text-sm focus:outline-none focus:border-primary text-on-surface" required />
            </div>
            <div className="space-y-1.5">
              <label className="font-label-mono text-[10px] uppercase text-on-surface-variant">Amount</label>
              <input type="number" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} placeholder="0.00" className="w-full px-4 py-2.5 bg-surface-container/50 border border-glass-border rounded-xl text-sm focus:outline-none focus:border-primary text-on-surface font-chart-value" required />
            </div>
            <div className="space-y-1.5">
              <label className="font-label-mono text-[10px] uppercase text-on-surface-variant">Category</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-2.5 bg-surface-container/50 border border-glass-border rounded-xl text-sm focus:outline-none focus:border-primary text-on-surface">
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="font-label-mono text-[10px] uppercase text-on-surface-variant">Type</label>
              <div className="flex gap-3">
                <button type="button" onClick={() => setForm({ ...form, type: 'expense' })} className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-all ${form.type === 'expense' ? 'bg-error/10 border-error/30 text-error' : 'border-glass-border text-on-surface-variant hover:bg-white/5'}`}>Expense</button>
                <button type="button" onClick={() => setForm({ ...form, type: 'income' })} className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-all ${form.type === 'income' ? 'bg-primary/10 border-primary/30 text-primary' : 'border-glass-border text-on-surface-variant hover:bg-white/5'}`}>Income</button>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="font-label-mono text-[10px] uppercase text-on-surface-variant">Date</label>
              <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="w-full px-4 py-2.5 bg-surface-container/50 border border-glass-border rounded-xl text-sm focus:outline-none focus:border-primary text-on-surface" />
            </div>
          </div>
          <button type="submit" className="px-6 py-2.5 bg-primary text-on-primary rounded-xl font-bold text-sm hover:brightness-110 transition-all cursor-pointer flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">check</span>
            Add to Ledger
          </button>
        </form>
      )}

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="flex gap-2 glass-card p-1.5 rounded-xl">
          {['all', 'income', 'expense'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-1.5 rounded-lg text-xs font-label-mono uppercase transition-all ${filter === f ? 'bg-white/10 text-primary font-bold' : 'text-on-surface-variant hover:bg-white/5'}`}>
              {f}
            </button>
          ))}
        </div>
        <div className="relative flex-1 max-w-sm">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search transactions..." className="w-full pl-10 pr-4 py-2 bg-surface-container/50 border border-glass-border rounded-xl text-sm focus:outline-none focus:border-primary text-on-surface" />
        </div>
      </div>

      {/* Transactions List */}
      <div className="glass-panel rounded-2xl overflow-hidden">
        <div className="hidden md:grid grid-cols-12 px-6 py-3 border-b border-glass-border text-[10px] font-label-mono text-on-surface-variant uppercase">
          <div className="col-span-5">Description</div>
          <div className="col-span-2">Category</div>
          <div className="col-span-2">Date</div>
          <div className="col-span-2 text-right">Amount</div>
          <div className="col-span-1"></div>
        </div>
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-on-surface-variant text-sm">
            <span className="material-symbols-outlined text-[48px] block mb-4 opacity-30">receipt_long</span>
            No transactions match your filters.
          </div>
        ) : (
          filtered.map(t => (
            <div key={t.id} className="grid grid-cols-12 px-6 py-4 border-b border-glass-border/50 hover:bg-white/[0.02] transition-all items-center group">
              <div className="col-span-12 md:col-span-5 flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${t.type === 'income' ? 'bg-primary/10 text-primary' : 'bg-surface-container-high text-on-surface-variant'}`}>
                  <span className="material-symbols-outlined text-[18px]">{catIcons[t.category] || 'label'}</span>
                </div>
                <div>
                  <p className="font-bold text-sm text-on-surface">{t.title}</p>
                  <p className="text-[10px] text-on-surface-variant md:hidden">{t.category} • {t.date}</p>
                </div>
              </div>
              <div className="hidden md:flex col-span-2 items-center">
                <span className="text-xs text-on-surface-variant bg-white/5 px-2 py-0.5 rounded-full">{t.category}</span>
              </div>
              <div className="hidden md:flex col-span-2 items-center text-xs text-on-surface-variant">{t.date}</div>
              <div className="col-span-8 md:col-span-2 text-right">
                <span className={`font-chart-value text-sm font-semibold ${t.type === 'income' ? 'text-primary' : 'text-on-surface'}`}>
                  {t.type === 'income' ? '+' : '-'}{formatMoney(t.amount)}
                </span>
              </div>
              <div className="col-span-4 md:col-span-1 flex justify-end">
                <button onClick={() => deleteTransaction(t.id)} className="opacity-0 group-hover:opacity-100 p-1.5 text-error hover:bg-error/10 rounded-lg transition-all" title="Delete">
                  <span className="material-symbols-outlined text-[16px]">delete</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BudgetTracker;
