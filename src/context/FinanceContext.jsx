/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from 'react';

export const FinanceContext = createContext();

const DEFAULT_TRANSACTIONS = [
  { id: 't1', title: 'Monthly Salary', type: 'income', amount: 120000, category: 'Investments', date: '2026-06-11' },
  { id: 't2', title: 'Home Rent', type: 'expense', amount: 35000, category: 'Essentials', date: '2026-06-10' },
  { id: 't3', title: 'Amazon Prime Subscription', type: 'expense', amount: 1499, category: 'Leisure', date: '2026-06-09' },
  { id: 't4', title: 'Starbucks Coffee', type: 'expense', amount: 450, category: 'Leisure', date: '2026-06-09' },
  { id: 't5', title: 'Mutual Fund SIP', type: 'expense', amount: 20000, category: 'Investments', date: '2026-06-05' },
  { id: 't6', title: 'Grocery Supermarket', type: 'expense', amount: 4800, category: 'Essentials', date: '2026-06-04' },
  { id: 't7', title: 'Electricity Utility Bill', type: 'expense', amount: 3200, category: 'Essentials', date: '2026-06-02' }
];

const DEFAULT_BUDGETS = {
  Essentials: 50000,
  Investments: 40000,
  Leisure: 15000
};

const DEFAULT_GOALS = [
  { id: 'g1', title: 'Dream Home Fund', target: 12000000, current: 4500000, projectedDate: 'July 2027' },
  { id: 'g2', title: 'Retirement Corpus', target: 50000000, current: 1280000, projectedDate: 'Oct 2045' }
];

const DEFAULT_AI_MESSAGES = [
  {
    sender: 'ai',
    text: 'Hello! I am Voxel AI, your precision wealth assistant. I have run an analysis on your recent transaction ledger. You spent 15% less on dining this week compared to last, and I detected a potential duplication of cloud storage subscriptions. How can I assist you with your finances today?',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
];

export const FinanceProvider = ({ children }) => {
  // Authentication
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('voxel_user');
    return saved ? JSON.parse(saved) : null;
  });

  // State Lists
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('voxel_transactions');
    return saved ? JSON.parse(saved) : DEFAULT_TRANSACTIONS;
  });

  const [budgets, setBudgets] = useState(() => {
    const saved = localStorage.getItem('voxel_budgets');
    return saved ? JSON.parse(saved) : DEFAULT_BUDGETS;
  });

  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem('voxel_goals');
    return saved ? JSON.parse(saved) : DEFAULT_GOALS;
  });

  const [aiMessages, setAiMessages] = useState(() => {
    const saved = localStorage.getItem('voxel_ai_messages');
    return saved ? JSON.parse(saved) : DEFAULT_AI_MESSAGES;
  });

  // Currency and visual configs
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('voxel_settings');
    return saved ? JSON.parse(saved) : { currency: 'INR', themeMode: 'dark', animations: true };
  });

  // Persists states on changes
  useEffect(() => {
    localStorage.setItem('voxel_user', user ? JSON.stringify(user) : '');
  }, [user]);

  useEffect(() => {
    localStorage.setItem('voxel_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('voxel_budgets', JSON.stringify(budgets));
  }, [budgets]);

  useEffect(() => {
    localStorage.setItem('voxel_goals', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem('voxel_ai_messages', JSON.stringify(aiMessages));
  }, [aiMessages]);

  useEffect(() => {
    localStorage.setItem('voxel_settings', JSON.stringify(settings));
  }, [settings]);

  // Auth Operations
  const login = (email, name) => {
    const newUser = { email, name: name || 'John Doe', isPro: true };
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  // Transaction CRUD
  const addTransaction = (t) => {
    const newT = {
      id: 't_' + Date.now(),
      title: t.title || 'Untitled Transaction',
      type: t.type || 'expense',
      amount: parseFloat(t.amount) || 0,
      category: t.category || 'Essentials',
      date: t.date || new Date().toISOString().split('T')[0]
    };
    setTransactions(prev => [newT, ...prev]);
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  // Budget Adjustments
  const updateBudget = (category, limit) => {
    setBudgets(prev => ({
      ...prev,
      [category]: parseFloat(limit) || 0
    }));
  };

  const deleteBudget = (category) => {
    setBudgets(prev => {
      const next = { ...prev };
      delete next[category];
      return next;
    });
  };

  // Goals Adjustments
  const addGoal = (title, target, initialFund, date) => {
    const newGoal = {
      id: 'g_' + Date.now(),
      title,
      target: parseFloat(target) || 0,
      current: parseFloat(initialFund) || 0,
      projectedDate: date || 'December 2028'
    };
    setGoals(prev => [...prev, newGoal]);
  };

  const addFundsToGoal = (id, amount) => {
    setGoals(prev => prev.map(g => {
      if (g.id === id) {
        return { ...g, current: Math.min(g.target, g.current + (parseFloat(amount) || 0)) };
      }
      return g;
    }));
  };

  // AI Assistant Chatbot Mock Logic
  const getCurrencySymbol = () => {
    return settings.currency === 'INR' ? '₹' : settings.currency === 'EUR' ? '€' : '$';
  };

  const formatMoney = (val) => {
    return getCurrencySymbol() + Number(val).toLocaleString();
  };

  const sendChatMessage = (text) => {
    const userMsg = {
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setAiMessages(prev => [...prev, userMsg]);

    // Compute metrics for responses
    const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    const netWorth = totalIncome - totalExpense;

    const catSums = { Essentials: 0, Investments: 0, Leisure: 0 };
    transactions.filter(t => t.type === 'expense').forEach(t => {
      if (catSums[t.category] !== undefined) {
        catSums[t.category] += t.amount;
      }
    });

    setTimeout(() => {
      let aiText;
      const prompt = text.toLowerCase();

      if (prompt.includes('balance') || prompt.includes('net worth') || prompt.includes('portfolio') || prompt.includes('wealth') || prompt.includes('rupee') || prompt.includes('money')) {
        aiText = `Based on your ledger, your total logged Income is ${formatMoney(totalIncome)} and Expenses are ${formatMoney(totalExpense)}. This leaves you with a Net Portfolio Balance of ${formatMoney(netWorth)}.`;
      } else if (prompt.includes('goal') || prompt.includes('saving') || prompt.includes('home') || prompt.includes('retirement')) {
        const goalListText = goals.map(g => `${g.title} (${Math.round((g.current / g.target) * 100)}% complete: ${formatMoney(g.current)} of ${formatMoney(g.target)})`).join(', ');
        aiText = `You are currently tracking ${goals.length} primary wealth milestones: ${goalListText}. To accelerate your target date for the Dream Home Fund, I recommend transferring an extra 5% of monthly leisure allocations.`;
      } else if (prompt.includes('budget') || prompt.includes('limit') || prompt.includes('spend') || prompt.includes('categories')) {
        let budgetAlert = '';
        Object.keys(budgets).forEach(cat => {
          const spent = catSums[cat];
          const limit = budgets[cat];
          if (spent > limit) {
            budgetAlert += `⚠️ Your ${cat} spending (${formatMoney(spent)}) exceeds its limit of ${formatMoney(limit)} by ${formatMoney(spent - limit)}! `;
          } else if (spent > limit * 0.8) {
            budgetAlert += `🔔 Your ${cat} spending (${formatMoney(spent)}) is close to exceeding its limit of ${formatMoney(limit)} (80%+ utilized). `;
          }
        });
        if (!budgetAlert) {
          budgetAlert = "All categories are currently operating well below set budget ceilings.";
        }
        aiText = `Here is your current category budget utilization:
        • Essentials: Spent ${formatMoney(catSums.Essentials)} of ${formatMoney(budgets.Essentials)}
        • Investments: Spent ${formatMoney(catSums.Investments)} of ${formatMoney(budgets.Investments)}
        • Leisure: Spent ${formatMoney(catSums.Leisure)} of ${formatMoney(budgets.Leisure)}
        
        Status: ${budgetAlert}`;
      } else if (prompt.includes('insight') || prompt.includes('optimize') || prompt.includes('subscription') || prompt.includes('save') || prompt.includes('tips')) {
        aiText = `AI Recommendation: I see you have logged ${formatMoney(catSums.Leisure)} in Leisure expenditures this period. By consolidating redundant subscriptions and shifting those savings into your ${goals[0]?.title || 'milestones'}, you could reduce your savings target date by up to 2.4 months.`;
      } else if (prompt.includes('hello') || prompt.includes('hi') || prompt.includes('hey')) {
        aiText = `Hello! How can I help you navigate your Voxel Finance portfolio today? I can analyze budgets, outline goals, or give expense optimization guidelines.`;
      } else {
        aiText = `I have received your request. Regarding financial optimization, it's best to maintain a 50/30/20 ratio: 50% Essentials (currently at ${Math.round((catSums.Essentials / totalIncome) * 100) || 0}%), 30% Leisure (currently at ${Math.round((catSums.Leisure / totalIncome) * 100) || 0}%), and 20% Savings/Investments (currently at ${Math.round((catSums.Investments / totalIncome) * 100) || 0}%). Let me know if you would like me to draft a custom allocations plan for your ${formatMoney(totalIncome)} monthly revenue.`;
      }

      const aiMsg = {
        sender: 'ai',
        text: aiText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setAiMessages(prev => [...prev, aiMsg]);
    }, 1000);
  };

  const clearMessages = () => {
    setAiMessages(DEFAULT_AI_MESSAGES);
  };

  const updateSettings = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Reset entire application data
  const resetAllData = () => {
    setTransactions(DEFAULT_TRANSACTIONS);
    setBudgets(DEFAULT_BUDGETS);
    setGoals(DEFAULT_GOALS);
    setAiMessages(DEFAULT_AI_MESSAGES);
    setSettings({ currency: 'INR', themeMode: 'dark', animations: true });
  };

  return (
    <FinanceContext.Provider value={{
      user,
      transactions,
      budgets,
      goals,
      aiMessages,
      settings,
      login,
      logout,
      addTransaction,
      deleteTransaction,
      updateBudget,
      deleteBudget,
      addGoal,
      addFundsToGoal,
      sendChatMessage,
      clearMessages,
      updateSettings,
      resetAllData,
      getCurrencySymbol,
      formatMoney
    }}>
      {children}
    </FinanceContext.Provider>
  );
};
