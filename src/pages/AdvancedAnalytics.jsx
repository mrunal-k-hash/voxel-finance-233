import React, { useContext, useState, useMemo } from 'react';
import { FinanceContext } from '../context/FinanceContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend } from 'recharts';

const AdvancedAnalytics = () => {
  const { transactions, formatMoney, getCurrencySymbol } = useContext(FinanceContext);
  const [dateFilter, setDateFilter] = useState('30D');

  // Filter transactions by date range
  const filteredTransactions = useMemo(() => {
    const now = new Date();
    let cutoff = new Date(0); // ALL

    if (dateFilter === '7D') cutoff = new Date(now.setDate(now.getDate() - 7));
    else if (dateFilter === '30D') cutoff = new Date(now.setMonth(now.getMonth() - 1));
    else if (dateFilter === '90D') cutoff = new Date(now.setMonth(now.getMonth() - 3));

    return transactions.filter(t => new Date(t.date) >= cutoff);
  }, [transactions, dateFilter]);

  const expenses = filteredTransactions.filter(t => t.type === 'expense');
  const totalExpense = expenses.reduce((s, t) => s + t.amount, 0);

  // Daily Aggregation
  const dailyData = useMemo(() => {
    const groups = {};
    expenses.forEach(t => {
      groups[t.date] = (groups[t.date] || 0) + t.amount;
    });
    const sortedDates = Object.keys(groups).sort();
    let maxDay = { date: '-', amount: 0 };
    let minDay = { date: '-', amount: Infinity };
    
    const data = sortedDates.map(date => {
      const amt = groups[date];
      if (amt > maxDay.amount) maxDay = { date, amount: amt };
      if (amt < minDay.amount) minDay = { date, amount: amt };
      return { date, amount: amt };
    });

    if (minDay.amount === Infinity) minDay.amount = 0;
    
    return { data, maxDay, minDay, avg: data.length ? totalExpense / data.length : 0 };
  }, [expenses, totalExpense]);

  // Monthly Aggregation
  const monthlyData = useMemo(() => {
    const groups = {};
    expenses.forEach(t => {
      const month = t.date.substring(0, 7); // YYYY-MM
      groups[month] = (groups[month] || 0) + t.amount;
    });
    return Object.keys(groups).sort().map(month => ({ month, amount: groups[month] }));
  }, [expenses]);

  // Category Aggregation
  const categoryData = useMemo(() => {
    const groups = {};
    expenses.forEach(t => {
      groups[t.category] = (groups[t.category] || 0) + t.amount;
    });
    return Object.keys(groups).map(name => ({ name, value: groups[name] })).sort((a,b) => b.value - a.value);
  }, [expenses]);

  const COLORS = ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe', '#10b981', '#f59e0b', '#ef4444'];

  // Smart Insights Generation
  const insights = useMemo(() => {
    const list = [];
    if (categoryData.length > 0) {
      list.push(`You spend most of your money on ${categoryData[0].name} (${Math.round((categoryData[0].value/totalExpense)*100)}% of expenses).`);
      list.push(`If you reduce ${categoryData[0].name} expenses by 10%, you can save ${formatMoney(categoryData[0].value * 0.1)}/month.`);
    }
    if (dailyData.maxDay.date !== '-') {
      list.push(`Your highest spending day in this period was ${dailyData.maxDay.date} at ${formatMoney(dailyData.maxDay.amount)}.`);
    }
    return list;
  }, [categoryData, dailyData, totalExpense, formatMoney]);

  // Calendar Heatmap Data
  const calendarDays = useMemo(() => {
    const last30 = Array.from({length: 30}, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (29 - i));
      return d.toISOString().split('T')[0];
    });

    return last30.map(date => {
      const dayTotal = expenses.filter(t => t.date === date).reduce((s,t) => s + t.amount, 0);
      let intensity = 'bg-surface-container'; // None
      if (dayTotal > 0 && dayTotal < dailyData.avg * 0.5) intensity = 'bg-emerald-glow/40'; // Low (Greenish)
      else if (dayTotal >= dailyData.avg * 0.5 && dayTotal < dailyData.avg * 1.5) intensity = 'bg-chart-warning/50'; // Medium (Yellowish)
      else if (dayTotal >= dailyData.avg * 1.5) intensity = 'bg-error/60'; // High (Reddish)
      
      return { date, amount: dayTotal, intensity };
    });
  }, [expenses, dailyData.avg]);

  // Export CSV
  const exportCSV = () => {
    const headers = ['ID', 'Date', 'Title', 'Category', 'Type', 'Amount'];
    const rows = filteredTransactions.map(t => [t.id, t.date, `"${t.title}"`, t.category, t.type, t.amount]);
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `voxel_report_${dateFilter}.csv`;
    link.click();
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-panel p-3 rounded-lg border border-glass-border shadow-lg !backdrop-blur-xl">
          <p className="font-label-mono text-[10px] text-on-surface-variant mb-1">{label}</p>
          <p className="font-chart-value text-sm font-bold text-primary">{formatMoney(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 text-left animate-[fadeInUp_0.4s_ease]">
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="font-headline-lg text-2xl md:text-3xl font-bold text-on-surface">Advanced Analytics</h1>
          <p className="text-on-surface-variant text-sm mt-1">Deep institutional-grade insights into your spending vectors.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-1 glass-card p-1.5 rounded-xl w-full sm:w-auto justify-center">
            {['7D', '30D', '90D', 'ALL'].map(p => (
              <button key={p} onClick={() => setDateFilter(p)} className={`px-4 py-1.5 rounded-lg text-xs font-label-mono uppercase transition-all ${dateFilter === p ? 'bg-primary/10 text-primary font-bold shadow-sm' : 'text-on-surface-variant hover:bg-black/5'}`}>
                {p}
              </button>
            ))}
          </div>
          <button onClick={exportCSV} className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-xl font-bold text-xs hover:brightness-110 transition-all cursor-pointer shadow-[0_4px_15px_rgba(37,99,235,0.2)]">
            <span className="material-symbols-outlined text-[16px]">download</span>
            Export CSV
          </button>
        </div>
      </div>

      {/* Smart Insights Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {insights.map((insight, i) => (
          <div key={i} className="glass-card rounded-2xl p-4 flex gap-4 items-start border-primary/20">
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[16px]">lightbulb</span>
            </div>
            <p className="text-xs text-on-surface leading-relaxed font-medium">{insight}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Spending Trend (Line Chart) */}
        <div className="glass-panel p-6 rounded-2xl">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-label-mono text-[10px] text-on-surface-variant uppercase tracking-widest">Daily Trajectory</h3>
              <p className="font-chart-value text-2xl text-primary mt-1 font-bold">{formatMoney(dailyData.avg)} <span className="text-xs text-on-surface-variant ml-1 font-normal">avg / day</span></p>
            </div>
          </div>
          <div className="h-[250px] w-full">
            {dailyData.data.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyData.data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
                  <XAxis dataKey="date" stroke="#94a3b8" fontSize={10} tickMargin={10} tickFormatter={(val) => val.substring(5)} />
                  <YAxis stroke="#94a3b8" fontSize={10} tickFormatter={(val) => getCurrencySymbol() + (val/1000) + 'k'} />
                  <RechartsTooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="amount" stroke="#2563eb" strokeWidth={3} dot={{ r: 4, fill: '#2563eb', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6, strokeWidth: 0 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-sm text-on-surface-variant">No data for selected period.</div>
            )}
          </div>
        </div>

        {/* Category Breakdown (Pie Chart) */}
        <div className="glass-panel p-6 rounded-2xl flex flex-col">
          <h3 className="font-label-mono text-[10px] text-on-surface-variant uppercase tracking-widest mb-2">Category Dispersion</h3>
          <div className="flex-1 min-h-[250px]">
            {categoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '10px', fontFamily: 'Geist, monospace' }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-sm text-on-surface-variant">No data for selected period.</div>
            )}
          </div>
        </div>

        {/* Monthly Aggregation (Bar Chart) */}
        <div className="glass-panel p-6 rounded-2xl lg:col-span-2">
          <h3 className="font-label-mono text-[10px] text-on-surface-variant uppercase tracking-widest mb-6">Macro Monthly Overview</h3>
          <div className="h-[300px] w-full">
            {monthlyData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} tickMargin={10} />
                  <YAxis stroke="#94a3b8" fontSize={10} tickFormatter={(val) => getCurrencySymbol() + (val/1000) + 'k'} />
                  <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(37,99,235,0.05)' }} />
                  <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-sm text-on-surface-variant">No data for selected period.</div>
            )}
          </div>
        </div>

        {/* Heatmap Calendar (Custom) */}
        <div className="glass-panel p-6 rounded-2xl lg:col-span-2">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h3 className="font-label-mono text-[10px] text-on-surface-variant uppercase tracking-widest">30-Day Velocity Heatmap</h3>
              <p className="text-xs text-on-surface-variant mt-1">Intensity correlates with daily expenditure volume.</p>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-label-mono text-on-surface-variant">
              <span>Less</span>
              <div className="w-3 h-3 rounded-sm bg-surface-container border border-glass-border"></div>
              <div className="w-3 h-3 rounded-sm bg-emerald-glow/40"></div>
              <div className="w-3 h-3 rounded-sm bg-chart-warning/50"></div>
              <div className="w-3 h-3 rounded-sm bg-error/60"></div>
              <span>More</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
            {calendarDays.map((day, i) => (
              <div key={i} className="group relative">
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-md border border-glass-border transition-all duration-300 hover:scale-110 cursor-crosshair ${day.intensity}`}></div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 bg-deep-navy text-on-primary text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-lg">
                  {day.date}: <span className="font-bold">{formatMoney(day.amount)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdvancedAnalytics;
