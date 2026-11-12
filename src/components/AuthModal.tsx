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
    }, 700);
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-md rounded-2xl bg-[#111A2E] border border-white/15 p-6 sm:p-8 shadow-2xl"
        >
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Role Toggle Header */}
          <div className="text-center mb-6">
            <h3 className="font-display font-bold text-2xl text-white mb-1">
              {mode === 'signin' ? 'Sign In to HaulGig' : 'Join the Freight Network'}
            </h3>
            <p className="text-xs text-slate-400">
              Direct connection between CDL drivers and verified carriers
            </p>
          </div>

          {/* Segmented Driver vs Company Switch */}
          <div className="p-1 bg-[#0B1220] rounded-xl flex items-center gap-1 mb-6 border border-white/10">
            <button
              type="button"
              onClick={() => setAuthRole('driver')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                authRole === 'driver'
                  ? 'bg-[#16213A] text-white shadow-sm border border-white/10'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5 text-[#FFB547]" />
              <span>I am a Driver (CDL)</span>
            </button>
            <button
              type="button"
              onClick={() => setAuthRole('company')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                authRole === 'company'
                  ? 'bg-[#16213A] text-white shadow-sm border border-white/10'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-[#2DD4BF]" />
              <span>I am a Carrier / Fleet</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  {authRole === 'driver' ? 'Full Legal Name' : 'Company / Fleet Legal Name'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={authRole === 'driver' ? 'e.g. John Miller' : 'e.g. Titan Freight Systems LLC'}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#16213A] border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-[#FF7A1A]"
                />
              </div>
            )}

            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">
                Work Email Address
              </label>
              <input
                type="email"
                required
                placeholder="name@truckingdomain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#16213A] border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-[#FF7A1A]"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">
                {authRole === 'driver' ? 'CDL Number & State' : 'USDOT Number / MC Number'}
              </label>
              <input
                type="text"
                placeholder={authRole === 'driver' ? 'e.g. TX-CDL-8941029' : 'e.g. USDOT #3189402'}
                value={cdlOrDot}
                onChange={(e) => setCdlOrDot(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#16213A] border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-[#FF7A1A]"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#16213A] border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-[#FF7A1A]"
              />
            </div>

            <button
              type="submit"
              disabled={isDone}
              className="shine-hover w-full py-3 px-4 rounded-xl gradient-amber text-white font-bold text-xs shadow-md shadow-[#FF7A1A]/20 transition-all hover:brightness-110 active:scale-95 disabled:opacity-50 mt-2"
            >
              {isDone ? (
                <span className="flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verified & Authenticated</span>
                </span>
              ) : mode === 'signin' ? (
                `Sign In as ${authRole === 'driver' ? 'Driver' : 'Carrier'}`
              ) : (
                `Create ${authRole === 'driver' ? 'Driver Profile' : 'Carrier Account'}`
              )}
            </button>
          </form>

          {/* Quick Demo Fill Pill */}
          <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={handleDemoFill}
              className="text-[#FFB547] hover:underline font-medium text-[11px] flex items-center gap-1"
            >
              <span>Quick Fill Demo {authRole === 'driver' ? 'Driver' : 'Carrier'}</span>
            </button>

            <button
              type="button"
              onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
              className="text-slate-400 hover:text-white text-[11px]"
            >
              {mode === 'signin' ? "Don't have an account? Sign up" : 'Already registered? Sign in'}
            </button>
          </div>

          <div className="mt-4 p-2.5 rounded-lg bg-[#0B1220] border border-white/5 flex items-center gap-2 text-[10px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2DD4BF] shrink-0" />
            <span>FMCSA SafeStat verification automatically checked against federal records.</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
