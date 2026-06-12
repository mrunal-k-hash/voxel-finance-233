import React, { useContext, useState, useRef, useEffect } from 'react';
import { FinanceContext } from '../context/FinanceContext';

const AIInsights = () => {
  const { aiMessages, sendChatMessage, clearMessages, formatMoney, transactions, goals } = useContext(FinanceContext);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [aiMessages]);

  const handleSend = () => {
    if (!input.trim()) return;
    sendChatMessage(input.trim());
    setInput('');
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 1200);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);

  const quickPrompts = [
    "What's my current balance?",
    "Analyze my budget status",
    "How are my savings goals?",
    "Give me optimization tips"
  ];

  return (
    <div className="space-y-6 text-left h-full flex flex-col">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="font-headline-lg text-2xl md:text-3xl font-bold text-on-surface">Voxel AI Advisor</h1>
          <p className="text-on-surface-variant text-sm mt-1">Your intelligent financial co-pilot analyzing real-time portfolio data.</p>
        </div>
        <button onClick={clearMessages} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-glass-border rounded-xl text-xs font-label-mono text-on-surface-variant hover:bg-white/10 transition-all cursor-pointer">
          <span className="material-symbols-outlined text-[16px]">refresh</span>
          Reset Chat
        </button>
      </div>

      {/* Quick Stats Strip */}
      <div className="grid grid-cols-3 gap-4">
        <div className="glass-panel rounded-xl p-3 text-center">
          <p className="text-[9px] font-label-mono text-on-surface-variant uppercase">Net Worth</p>
          <p className="font-chart-value text-sm text-primary font-bold">{formatMoney(totalIncome - totalExpense)}</p>
        </div>
        <div className="glass-panel rounded-xl p-3 text-center">
          <p className="text-[9px] font-label-mono text-on-surface-variant uppercase">Active Goals</p>
          <p className="font-chart-value text-sm text-on-surface font-bold">{goals.length}</p>
        </div>
        <div className="glass-panel rounded-xl p-3 text-center">
          <p className="text-[9px] font-label-mono text-on-surface-variant uppercase">Transactions</p>
          <p className="font-chart-value text-sm text-on-surface font-bold">{transactions.length}</p>
        </div>
      </div>

      {/* Chat Container */}
      <div className="glass-panel rounded-2xl flex-1 flex flex-col min-h-[450px] overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {aiMessages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0 border border-primary/30 mt-1">
                  <span className="material-symbols-outlined text-[16px]">psychology</span>
                </div>
              )}
              <div className={`max-w-[75%] ${msg.sender === 'user' ? 'bg-primary/10 border-primary/20' : 'bg-surface-container/80 border-glass-border'} border rounded-2xl p-4`}>
                <p className="text-sm text-on-surface whitespace-pre-line leading-relaxed">{msg.text}</p>
                <p className="text-[9px] font-label-mono text-on-surface-variant mt-2 text-right">{msg.time}</p>
              </div>
              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary shrink-0 border border-secondary/30 mt-1">
                  <span className="material-symbols-outlined text-[16px]">person</span>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0 border border-primary/30">
                <span className="material-symbols-outlined text-[16px]">psychology</span>
              </div>
              <div className="bg-surface-container/80 border border-glass-border rounded-2xl p-4">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Quick Prompts */}
        <div className="px-6 pb-2">
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => { setInput(prompt); }}
                className="px-3 py-1.5 bg-white/5 border border-glass-border rounded-full text-[10px] font-label-mono text-on-surface-variant hover:bg-primary/10 hover:text-primary hover:border-primary/20 transition-all cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-glass-border">
          <div className="flex gap-3 items-center">
            <div className="flex-1 relative">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about your finances..."
                className="w-full px-4 py-3 bg-surface-container/50 border border-glass-border rounded-xl text-sm focus:outline-none focus:border-primary text-on-surface pr-12"
              />
            </div>
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="p-3 bg-primary text-on-primary rounded-xl hover:brightness-110 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;
