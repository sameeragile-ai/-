import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Truck } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full space-y-5">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-[#EA580C]">
          <Truck className="w-8 h-8" />
        </div>

        <div>
          <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest block mb-1">
            Error 404 · Wrong Exit
          </span>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-slate-900">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
            The freight run you're looking for doesn't exist or has already been booked.
          </p>
        </div>

        <div className="pt-2 flex items-center justify-center gap-3">
          <Link
            to="/gigs"
            className="px-4 py-2 rounded-lg bg-[#EA580C] text-white font-bold text-xs shadow-xs"
          >
            Find Open Gigs
          </Link>
          <Link
            to="/"
            className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-50 flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
