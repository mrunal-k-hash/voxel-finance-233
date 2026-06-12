import React, { useState, useEffect } from 'react';

const LandingPage = ({ setActiveTab }) => {
  const [activeFaq, setActiveFaq] = useState(null);

  // Simple Entrance Animation helper
  const [activeReveal, setActiveReveal] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setActiveReveal(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const faqs = [
    {
      q: "Is my banking data safe?",
      a: "Yes, Voxel uses AES-256 bit encryption and works through certified, secure open-banking read-only gateways to ensure we never capture or store your bank credentials."
    },
    {
      q: "What is Voxel Pro?",
      a: "Voxel Pro features AI-driven tax deduction warnings, family group budget pools, advanced data model projection, and unlimited goal tracking configurations."
    },
    {
      q: "Can I export my portfolio data?",
      a: "Absolutely. You can download your entire financial ledger in CSV, Excel, PDF, or JSON formats at any time from your settings panel."
    }
  ];

  return (
    <div className={`transition-opacity duration-700 ${activeReveal ? 'opacity-100' : 'opacity-0'} pb-24`}>
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-6 max-w-[1200px] mx-auto text-center">
        <span className="inline-block px-4 py-1.5 mb-6 rounded-full glass-panel text-primary font-label-mono uppercase tracking-widest text-[10px]">
          Precision Wealth Engine
        </span>
        <h1 className="font-display-lg text-4xl md:text-7xl leading-[1.1] mb-8 tracking-tighter max-w-4xl mx-auto font-bold text-on-surface">
          Take Control of Every <span className="text-primary emerald-glow-text">Rupee</span> You Spend
        </h1>
        <p className="font-body-md text-on-surface-variant text-base md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Track expenses, achieve savings goals, understand your spending patterns, and receive intelligent recommendations. Built for the modern wealth manager.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => setActiveTab('auth')}
            className="bg-primary text-on-primary px-8 py-4 rounded-xl font-bold text-lg hover:shadow-[0_0_30px_rgba(78,222,163,0.3)] transition-all cursor-pointer"
          >
            Get Started
          </button>
          <button
            onClick={() => setActiveTab('auth')}
            className="glass-panel text-on-surface px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/5 transition-all cursor-pointer"
          >
            View Demo
          </button>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section id="demo" className="max-w-[1100px] mx-auto px-6 mb-24">
        <div className="glass-panel rounded-[2rem] p-4 md:p-8 overflow-hidden relative shadow-2xl">
          {/* Mock Window Controls */}
          <div className="flex items-center gap-3 mb-8 px-2">
            <div className="w-3 h-3 rounded-full bg-error"></div>
            <div className="w-3 h-3 rounded-full bg-chart-warning"></div>
            <div className="w-3 h-3 rounded-full bg-chart-success"></div>
            <div className="ml-auto flex items-center gap-4 bg-surface-container/50 px-4 py-1.5 rounded-full glass-border">
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant">calendar_today</span>
              <span className="font-label-mono text-[10px] uppercase">June 2026</span>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Main Chart Area */}
            <div className="col-span-12 lg:col-span-8 space-y-6">
              <div className="glass-panel rounded-2xl p-6 h-[320px] relative overflow-hidden flex flex-col justify-between">
                <div>
                  <p className="text-on-surface-variant font-label-mono text-[11px] uppercase mb-1">Portfolio Balance</p>
                  <h3 className="font-display-lg text-4xl text-primary font-bold">₹12,48,200.00</h3>
                </div>
                {/* SVG Area Chart Emulator */}
                <div className="h-32 w-full relative">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="glow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.25"/>
                        <stop offset="100%" stopColor="#10B981" stopOpacity="0"/>
                      </linearGradient>
                    </defs>
                    <path d="M0,80 Q25,30 50,60 T100,10 L100,100 L0,100 Z" fill="url(#glow)"/>
                    <path d="M0,80 Q25,30 50,60 T100,10" fill="none" stroke="#10B981" strokeWidth="2.5"/>
                  </svg>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="glass-panel rounded-2xl p-4 text-center">
                  <p className="text-on-surface-variant font-label-mono text-[9px] uppercase mb-1">Spending</p>
                  <p className="font-display-lg text-sm md:text-lg font-bold">₹42,300</p>
                </div>
                <div className="glass-panel rounded-2xl p-4 text-center">
                  <p className="text-on-surface-variant font-label-mono text-[9px] uppercase mb-1 text-primary">Savings</p>
                  <p className="font-display-lg text-sm md:text-lg font-bold text-primary">₹18,500</p>
                </div>
                <div className="glass-panel rounded-2xl p-4 text-center">
                  <p className="text-on-surface-variant font-label-mono text-[9px] uppercase mb-1 text-secondary">Invested</p>
                  <p className="font-display-lg text-sm md:text-lg font-bold text-secondary">₹95,000</p>
                </div>
              </div>
            </div>

            {/* Sidebar Preview */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              <div className="glass-panel rounded-2xl p-6 h-full flex flex-col justify-between">
                <div>
                  <h4 className="font-headline-lg text-base font-bold mb-4">Recent Activity</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary">
                        <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-bold text-xs">Amazon Prime</p>
                        <p className="text-[10px] text-on-surface-variant">Shopping • 2m ago</p>
                      </div>
                      <p className="font-label-mono text-xs text-error">-₹1,499</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary-container/20 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[18px]">payments</span>
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-bold text-xs">Monthly Salary</p>
                        <p className="text-[10px] text-on-surface-variant">Income • 1h ago</p>
                      </div>
                      <p className="font-label-mono text-xs text-primary">+₹1,20,000</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/10 text-left">
                  <p className="font-label-mono text-[9px] text-primary uppercase mb-1">AI Recommendation</p>
                  <p className="text-[11px] italic text-on-surface-variant">
                    "You've spent 15% less on dining this week compared to last. Keep it up!"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section id="features" className="max-w-[1200px] mx-auto px-6 mb-24">
        <div className="text-center mb-16">
          <h2 className="font-display-lg text-3xl md:text-4xl mb-4 font-bold text-on-surface">Precision Wealth Management</h2>
          <p className="text-on-surface-variant max-w-xl mx-auto text-sm md:text-base">
            Every feature is designed to give you an absolute advantage in managing your financial future.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="md:col-span-2 glass-panel rounded-[2rem] p-8 md:p-10 flex flex-col justify-between relative overflow-hidden min-h-[300px]">
            <div className="max-w-md relative z-10 text-left">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-6 text-primary border border-primary/20">
                <span className="material-symbols-outlined text-[28px]">query_stats</span>
              </div>
              <h3 className="font-headline-lg text-xl md:text-2xl mb-4 font-bold">Real-time Expense Tracking</h3>
              <p className="text-on-surface-variant text-sm md:text-base">
                Voxel connects securely to your bank accounts to provide instant categorisation and granular tracking of every single rupee.
              </p>
            </div>
            <div className="absolute -right-10 -bottom-10 opacity-[0.08] pointer-events-none">
              <span className="material-symbols-outlined text-[200px] text-primary">monitoring</span>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="glass-panel rounded-[2rem] p-8 md:p-10 flex flex-col justify-between min-h-[300px] text-left">
            <div>
              <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center mb-6 text-secondary border border-secondary/20">
                <span className="material-symbols-outlined text-[28px]">account_balance_wallet</span>
              </div>
              <h3 className="font-headline-lg text-xl md:text-2xl mb-4 font-bold">Smart Budgeting</h3>
              <p className="text-on-surface-variant text-sm">
                Define budgets for what matters most. Receive alerts before you overspend, not after.
              </p>
            </div>
            <div className="h-1.5 bg-surface-container-highest w-full rounded-full overflow-hidden mt-6">
              <div className="h-full bg-secondary w-2/3"></div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="glass-panel rounded-[2rem] p-8 md:p-10 text-left min-h-[300px]">
            <div className="w-12 h-12 bg-tertiary-container/20 rounded-xl flex items-center justify-center mb-6 text-tertiary border border-tertiary/20">
              <span className="material-symbols-outlined text-[28px]">psychology</span>
            </div>
            <h3 className="font-headline-lg text-xl md:text-2xl mb-4 font-bold">AI Insights</h3>
            <p className="text-on-surface-variant text-sm mb-6">
              Our proprietary model analyzes your patterns to predict future expenses and find hidden saving opportunities.
            </p>
            <div className="space-y-3">
              <div className="bg-white/5 p-3 rounded-lg flex items-center gap-3 border border-glass-border">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <span className="text-xs font-label-mono">Optimizing subscription costs...</span>
              </div>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="md:col-span-2 glass-panel rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row items-center gap-10 min-h-[300px] text-left">
            <div className="flex-1">
              <div className="w-12 h-12 bg-error/20 rounded-xl flex items-center justify-center mb-6 text-error border border-error/20">
                <span className="material-symbols-outlined text-[28px]">shield_lock</span>
              </div>
              <h3 className="font-headline-lg text-xl md:text-2xl mb-4 font-bold">Military Grade Security</h3>
              <p className="text-on-surface-variant text-sm md:text-base">
                End-to-end encryption with zero-knowledge architecture. Your financial data is your business, and yours alone.
              </p>
            </div>
            <div className="hidden sm:block w-48 h-48 bg-surface-container relative rounded-3xl overflow-hidden border border-glass-border">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent flex items-center justify-center">
                <span className="material-symbols-outlined text-[64px] text-primary">security</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Goals Visualizer */}
      <section className="max-w-[1200px] mx-auto px-6 mb-24">
        <div className="glass-panel rounded-[3rem] p-8 md:p-12 overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <h2 className="font-display-lg text-2xl md:text-4xl mb-6 font-bold text-on-surface">
                Your Future, <span className="text-primary">Precision Visualized</span>
              </h2>
              <p className="text-on-surface-variant text-sm md:text-lg mb-10 leading-relaxed">
                Stop guessing when you'll reach your milestones. Voxel calculates the exact trajectory of your savings and tells you how to accelerate.
              </p>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-3 items-end">
                    <span className="font-bold text-sm md:text-base">Dream Home Fund</span>
                    <span className="font-label-mono text-primary text-xs">₹45,00,000 / ₹1,20,00,000</span>
                  </div>
                  <div className="h-2.5 bg-white/5 rounded-full overflow-hidden border border-glass-border">
                    <div className="h-full bg-gradient-to-r from-primary to-emerald-glow w-[37.5%]"></div>
                  </div>
                  <p className="text-[10px] font-label-mono mt-2 text-on-surface-variant uppercase">Projected: July 2027</p>
                </div>
                <div>
                  <div className="flex justify-between mb-3 items-end">
                    <span className="font-bold text-sm md:text-base">Retirement Corpus</span>
                    <span className="font-label-mono text-secondary text-xs">₹12,80,000 / ₹5,00,00,000</span>
                  </div>
                  <div className="h-2.5 bg-white/5 rounded-full overflow-hidden border border-glass-border">
                    <div className="h-full bg-gradient-to-r from-secondary to-blue-500 w-[15%]"></div>
                  </div>
                  <p className="text-[10px] font-label-mono mt-2 text-on-surface-variant uppercase">Projected: Oct 2045</p>
                </div>
              </div>
            </div>

            <div className="relative flex justify-center items-center py-6">
              <div className="w-64 h-64 border-2 border-primary/20 border-dashed rounded-full flex items-center justify-center animate-[spin_40s_linear_infinite]">
                <div className="w-48 h-48 border border-secondary/20 rounded-full"></div>
              </div>
              <div className="absolute text-center">
                <span className="material-symbols-outlined text-[54px] text-primary mb-2 animate-bounce">track_changes</span>
                <div className="font-display-lg text-lg font-bold">Focus Mode</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section id="stats" className="max-w-[1200px] mx-auto px-6 mb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <h4 className="font-display-lg text-4xl md:text-5xl mb-2 font-bold text-on-surface">12M+</h4>
            <p className="font-label-mono text-on-surface-variant uppercase tracking-widest text-[9px]">Transactions Processed</p>
          </div>
          <div>
            <h4 className="font-display-lg text-4xl md:text-5xl mb-2 font-bold text-on-surface">₹500B</h4>
            <p className="font-label-mono text-on-surface-variant uppercase tracking-widest text-[9px]">AUM Analyzed</p>
          </div>
          <div>
            <h4 className="font-display-lg text-4xl md:text-5xl mb-2 font-bold text-primary">18%</h4>
            <p className="font-label-mono text-on-surface-variant uppercase tracking-widest text-[9px]">Avg. Savings Increase</p>
          </div>
          <div>
            <h4 className="font-display-lg text-4xl md:text-5xl mb-2 font-bold text-on-surface">99.9%</h4>
            <p className="font-label-mono text-on-surface-variant uppercase tracking-widest text-[9px]">Uptime Guarantee</p>
          </div>
        </div>
      </section>

      {/* FAQ & CTA Grid */}
      <section id="faq" className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="text-left">
            <h2 className="font-display-lg text-3xl mb-10 font-bold text-on-surface">
              Frequently Asked <span className="text-secondary">Questions</span>
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => {
                const isOpen = activeFaq === i;
                return (
                  <div
                    key={i}
                    onClick={() => setActiveFaq(isOpen ? null : i)}
                    className="glass-panel p-5 rounded-2xl cursor-pointer transition-all hover:border-primary/20"
                  >
                    <div className="flex justify-between items-center gap-3">
                      <h4 className="font-bold text-sm md:text-base text-on-surface">{faq.q}</h4>
                      <span className={`material-symbols-outlined transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`}>
                        expand_more
                      </span>
                    </div>
                    <div className={`transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-32 mt-3' : 'max-h-0'}`}>
                      <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div className="glass-panel rounded-[2.5rem] p-8 md:p-12 bg-primary/5 border-primary/20 relative overflow-hidden text-center">
              <h3 className="font-display-lg text-2xl md:text-3xl mb-4 font-bold text-on-surface">Ready for Absolute Control?</h3>
              <p className="text-on-surface-variant text-sm mb-8">Join 50,000+ precision-oriented investors today.</p>
              <div className="flex flex-col gap-4 max-w-sm mx-auto">
                <button
                  onClick={() => setActiveTab('auth')}
                  className="bg-primary text-on-primary px-6 py-3.5 rounded-xl font-bold text-base hover:shadow-[0_0_30px_rgba(78,222,163,0.3)] transition-all cursor-pointer"
                >
                  Start Your 14-Day Free Trial
                </button>
                <p className="text-[9px] font-label-mono uppercase text-on-surface-variant tracking-wider">
                  No credit card required • Precision Engineered
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
