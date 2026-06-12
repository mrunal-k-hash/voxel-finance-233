import { useState, useContext } from 'react';
import { FinanceContext } from '../context/FinanceContext';

const Auth = ({ setActiveTab }) => {
  const { login } = useContext(FinanceContext);
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all required fields.');
      return;
    }
    if (isRegister && !name) {
      setError('Please enter your name.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      login(email, isRegister ? name : email.split('@')[0]);
      setLoading(false);
      setActiveTab('dashboard'); // Redirect to dashboard
    }, 800);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-[440px] glass-panel rounded-[2rem] p-8 md:p-10 relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-primary/5 -z-10 pointer-events-none" />

        {/* Auth Toggle Tabs */}
        <div className="flex justify-center gap-6 mb-8 border-b border-glass-border pb-4">
          <button
            onClick={() => {
              setIsRegister(false);
              setError('');
            }}
            className={`font-label-mono text-sm uppercase tracking-wider pb-2 border-b-2 transition-all ${
              !isRegister ? 'text-primary border-primary font-bold' : 'text-on-surface-variant border-transparent'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setIsRegister(true);
              setError('');
            }}
            className={`font-label-mono text-sm uppercase tracking-wider pb-2 border-b-2 transition-all ${
              isRegister ? 'text-primary border-primary font-bold' : 'text-on-surface-variant border-transparent'
            }`}
          >
            Register
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="font-display-lg text-2xl font-bold text-on-surface mb-2">
            {isRegister ? 'Create Voxel Account' : 'Welcome to Voxel'}
          </h2>
          <p className="text-on-surface-variant text-xs font-body-md">
            {isRegister ? 'Start precision managing your assets' : 'Sign in to access your wealth command center'}
          </p>
        </div>

        {/* Error Feedback */}
        {error && (
          <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-xl text-error text-xs text-left flex items-start gap-2.5">
            <span className="material-symbols-outlined text-[16px] mt-0.5">error</span>
            <span>{error}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-5 text-left">
          {isRegister && (
            <div className="space-y-2">
              <label className="font-label-mono text-[10px] text-on-surface-variant uppercase tracking-wider block">
                Full Name
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
                  person
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full pl-11 pr-4 py-3 bg-surface-container/50 border border-glass-border rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-on-surface transition-all"
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="font-label-mono text-[10px] text-on-surface-variant uppercase tracking-wider block">
              Email Address
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
                mail
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-11 pr-4 py-3 bg-surface-container/50 border border-glass-border rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-on-surface transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="font-label-mono text-[10px] text-on-surface-variant uppercase tracking-wider">
                Password
              </label>
              {!isRegister && (
                <a href="#" className="text-[10px] font-label-mono text-primary uppercase hover:underline">
                  Forgot?
                </a>
              )}
            </div>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
                lock
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 bg-surface-container/50 border border-glass-border rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-on-surface transition-all"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-primary text-on-primary font-bold rounded-xl text-sm shadow-[0_0_20px_rgba(78,222,163,0.2)] hover:shadow-[0_0_25px_rgba(78,222,163,0.3)] transition-all cursor-pointer flex justify-center items-center gap-2"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-on-primary border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <span>{isRegister ? 'Create Pro Account' : 'Verify Identity'}</span>
            )}
          </button>
        </form>

        {/* Demo Mode Notice */}
        <div className="mt-8 text-center">
          <p className="text-[10px] font-label-mono text-on-surface-variant uppercase tracking-wider">
            Demo Credentials: Enter any email/password to sign in
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
