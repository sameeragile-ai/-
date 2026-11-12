import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, User, Building2, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, authRole, setAuthRole, addToast } = useApp();

  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [cdlOrDot, setCdlOrDot] = useState('');
  const [isDone, setIsDone] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDone(true);
    setTimeout(() => {
      addToast(
        mode === 'signin' ? `Welcome back, ${email || 'Driver'}!` : `Account created for ${name || 'Carrier'}!`,
        authRole === 'driver' ? 'CDL Verified Profile Active' : 'USDOT Verified Carrier Fleet',
        'success'
      );
      setIsAuthModalOpen(false);
      setIsDone(false);
    }, 600);
  };

  const handleDemoFill = () => {
    if (authRole === 'driver') {
      setName('Marcus Vance');
      setEmail('marcus.cdl@vancehauling.com');
      setPassword('Trucking2026!');
      setCdlOrDot('TX CDL-A #9841209');
    } else {
      setName('Redline Freightways Dispatch');
      setEmail('dispatch@redlinefreight.com');
      setPassword('CarrierDispatch2026!');
      setCdlOrDot('USDOT #3189402 / MC-104829');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
          onClick={() => setIsAuthModalOpen(false)}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          className="relative w-full max-w-md rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 shadow-2xl z-10"
        >
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-5">
            <h3 className="font-display font-bold text-xl text-slate-900">
              {mode === 'signin' ? 'Sign In to HaulGig' : 'Create an Account'}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Direct connection for CDL drivers and verified motor carriers
            </p>
          </div>

          {/* Toggle */}
          <div className="p-1 bg-slate-100 rounded-lg flex items-center gap-1 mb-5">
            <button
              type="button"
              onClick={() => setAuthRole('driver')}
              className={`flex-1 py-1.5 px-3 rounded-md text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                authRole === 'driver'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-3.5 h-3.5 text-[#EA580C]" />
              <span>I am a Driver</span>
            </button>
            <button
              type="button"
              onClick={() => setAuthRole('company')}
              className={`flex-1 py-1.5 px-3 rounded-md text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                authRole === 'company'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-slate-700" />
              <span>I am a Carrier</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {mode === 'signup' && (
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {authRole === 'driver' ? 'Full Legal Name' : 'Company Name'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={authRole === 'driver' ? 'John Miller' : 'Redline Freightways LLC'}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-[#EA580C]"
                />
              </div>
            )}

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-[#EA580C]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {authRole === 'driver' ? 'CDL Number & State' : 'USDOT Number / MC Number'}
              </label>
              <input
                type="text"
                placeholder={authRole === 'driver' ? 'TX CDL-A #9841209' : 'USDOT #3189402'}
                value={cdlOrDot}
                onChange={(e) => setCdlOrDot(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-[#EA580C]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-[#EA580C]"
              />
            </div>

            <button
              type="submit"
              disabled={isDone}
              className="w-full py-2.5 px-4 rounded-lg bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-xs shadow-xs transition-colors cursor-pointer mt-1"
            >
              {isDone ? (
                <span className="flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verified & Signed In</span>
                </span>
              ) : mode === 'signin' ? (
                `Sign In as ${authRole === 'driver' ? 'Driver' : 'Carrier'}`
              ) : (
                `Register ${authRole === 'driver' ? 'Driver Profile' : 'Carrier Fleet'}`
              )}
            </button>
          </form>

          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={handleDemoFill}
              className="text-[#EA580C] hover:underline font-semibold text-[11px]"
            >
              Quick Demo Fill ({authRole === 'driver' ? 'Driver' : 'Carrier'})
            </button>

            <button
              type="button"
              onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
              className="text-slate-500 hover:text-slate-800 text-[11px]"
            >
              {mode === 'signin' ? 'Need an account? Sign up' : 'Already registered? Sign in'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
