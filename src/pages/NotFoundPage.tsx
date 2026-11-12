import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Truck, Compass } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0B1220] flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full space-y-6">
        {/* Wrong Exit Truck Illustration */}
        <div className="relative w-32 h-32 mx-auto rounded-3xl bg-[#16213A] border border-white/10 flex items-center justify-center text-[#FF7A1A] shadow-2xl">
          <Truck className="w-16 h-16 stroke-[1.5]" />
          <div className="absolute -top-2 -right-2 p-2 rounded-xl gradient-amber text-white shadow-md">
            <Compass className="w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} />
          </div>
        </div>

        <div>
          <span className="text-xs font-mono font-bold text-[#FFB547] uppercase tracking-widest block mb-2">
            Wrong Exit · 404
          </span>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-white">
            Lost on the Highway
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
            This mile marker doesn't exist on our route map. The freight listing may have expired, or the GPS took a detour.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/gigs"
            className="w-full sm:w-auto px-6 py-3 rounded-xl gradient-amber text-white font-bold text-xs shadow-md shadow-[#FF7A1A]/20"
          >
            Find Open Gigs
          </Link>
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
