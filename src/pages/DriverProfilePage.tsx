import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Star, 
  MapPin, 
  CheckCircle2
} from 'lucide-react';
import { DRIVERS } from '../data/drivers.ts';
import { SafeImage } from '../components/SafeImage.tsx';
import { useApp } from '../context/AppContext.tsx';

export const DriverProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToast } = useApp();

  const driver = DRIVERS.find((d) => d.id === id) || DRIVERS[0];

  const handleContact = () => {
    addToast(
      `Contact Request Sent to ${driver.name}`,
      'The driver will receive your direct dispatch notification.',
      'success'
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <SafeImage
                src={driver.avatarUrl}
                alt={driver.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border-2 border-slate-200"
              />
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <h1 className="font-display font-bold text-xl sm:text-2xl text-slate-900">
                    {driver.name}
                  </h1>
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
                  <span className="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                    {driver.cdlClass}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1 text-slate-700">
                    <MapPin className="w-3.5 h-3.5 text-[#EA580C]" />
                    <span>{driver.homeBase}</span>
                  </span>
                  <span>·</span>
                  <span>{driver.experienceYears} Years Experience</span>
                </div>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1">
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{driver.rating}</span>
                <span className="text-[11px] text-slate-500 font-normal">({driver.completedGigs} hauls)</span>
              </div>
              <span className={`text-xs font-medium ${driver.availableNow ? 'text-emerald-700' : 'text-slate-500'}`}>
                {driver.availableNow ? '● Ready for Dispatch' : '○ On a Run'}
              </span>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-500 block uppercase font-medium">Completed Gigs</span>
              <span className="font-display font-bold text-lg text-slate-900">{driver.completedGigs}</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-500 block uppercase font-medium">Experience</span>
              <span className="font-display font-bold text-lg text-slate-900">{driver.experienceYears} yrs</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-500 block uppercase font-medium">Safety Score</span>
              <span className="font-bold text-emerald-700 block mt-0.5">100% Clean</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-500 block uppercase font-medium">CDL State Check</span>
              <span className="font-bold text-emerald-700 block mt-0.5">Active / Verified</span>
            </div>
          </div>

          <div>
            <h3 className="font-display font-bold text-sm text-slate-900 mb-1.5">Driver Bio</h3>
            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-lg border border-slate-100">
              {driver.bio}
            </p>
          </div>

          <div>
            <h3 className="font-display font-bold text-sm text-slate-900 mb-1.5">Verified CDL Endorsements</h3>
            <div className="flex items-center gap-2 flex-wrap">
              {driver.endorsements.map((end) => (
                <span
                  key={end}
                  className="px-2.5 py-1 rounded bg-slate-100 text-xs font-semibold text-slate-800 flex items-center gap-1.5 border border-slate-200"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{end}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-slate-500">
              Direct communication. Issue rate sheets directly to this driver.
            </p>
            <button
              onClick={handleContact}
              className="w-full sm:w-auto px-5 py-2 rounded-lg bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-xs"
            >
              Direct Message / Hire Driver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
