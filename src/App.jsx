import { useState, useContext, useEffect } from 'react';
import { FinanceContext } from './context/FinanceContext';
import BackgroundShader from './components/BackgroundShader';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import LandingPage from './pages/LandingPage';
import Auth from './pages/Auth';
import BudgetTracker from './pages/BudgetTracker';
import Goals from './pages/Goals';
import AdvancedAnalytics from './pages/AdvancedAnalytics';
import AIInsights from './pages/AIInsights';
import ProfileSettings from './pages/ProfileSettings';

const App = () => {
  const { user } = useContext(FinanceContext);
  const [activeTab, setActiveTab] = useState(user ? 'analytics' : 'landing');

  // If user logs out, redirect to landing
  useEffect(() => {
    if (!user && activeTab !== 'landing' && activeTab !== 'auth') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveTab('landing');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const renderPage = () => {
    switch (activeTab) {
      case 'landing':
        return <LandingPage setActiveTab={setActiveTab} />;
      case 'auth':
        return <Auth setActiveTab={setActiveTab} />;
      case 'expenses':
        return <BudgetTracker />;
      case 'goals':
        return <Goals />;
      case 'analytics':
        return <AdvancedAnalytics />;
      case 'ai-insights':
        return <AIInsights />;
      case 'settings':
        return <ProfileSettings />;
      default:
        return <LandingPage setActiveTab={setActiveTab} />;
    }
  };

  const isAuthenticatedPage = user && activeTab !== 'landing' && activeTab !== 'auth';

  return (
    <div className="min-h-screen bg-background text-on-surface relative">
      <BackgroundShader />
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {isAuthenticatedPage ? (
        <div className="flex">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <main className="lg:ml-64 flex-1 px-6 py-8 max-w-[1200px] mx-auto min-h-[calc(100vh-80px)]">
            {renderPage()}
          </main>
        </div>
      ) : (
        <main className="min-h-[calc(100vh-80px)]">
          {renderPage()}
        </main>
      )}

      {/* Footer */}
      <footer className="w-full mt-16 px-6 max-w-[1200px] mx-auto py-10 flex flex-col md:flex-row justify-between items-center border-t border-glass-border bg-surface-container-lowest/50 backdrop-blur-lg">
        <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
          <span className="font-headline-lg text-lg text-primary font-bold mb-1 cursor-pointer" onClick={() => setActiveTab(user ? 'analytics' : 'landing')}>Voxel Finance</span>
          <p className="text-on-surface-variant text-xs font-label-mono">Precision Engineered.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-6 mb-6 md:mb-0 text-on-surface-variant text-xs">
          <a className="hover:text-emerald-glow transition-colors opacity-80 hover:opacity-100 cursor-pointer">Privacy Policy</a>
          <a className="hover:text-emerald-glow transition-colors opacity-80 hover:opacity-100 cursor-pointer">Terms of Service</a>
          <a className="hover:text-emerald-glow transition-colors opacity-80 hover:opacity-100 cursor-pointer">Security</a>
          <a className="hover:text-emerald-glow transition-colors opacity-80 hover:opacity-100 cursor-pointer">API Docs</a>
        </div>
        <div className="text-on-surface-variant text-[10px] font-label-mono opacity-80">
          © 2026 Voxel Finance. Precision Engineered.
        </div>
      </footer>
    </div>
  );
};

export default App;
