import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Star, 
  MapPin, 
  CheckCircle2, 
  Truck, 
  Award, 
  FileCheck,
  Calendar,
  Phone,
  Mail
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
    <div className="min-h-screen bg-[#0B1220] pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        {/* Driver Profile Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#16213A] border border-white/10 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div className="flex items-center gap-5">
              <SafeImage
                src={driver.avatarUrl}
                alt={driver.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-[#FF7A1A] shadow-xl"
              />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="font-display font-bold text-2xl text-white">
                    {driver.name}
                  </h1>
                  <ShieldCheck className="w-5 h-5 text-[#2DD4BF]" />
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-400 flex-wrap">
                  <span className="font-mono text-white font-semibold bg-white/5 px-2 py-0.5 rounded">
                    {driver.cdlClass}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1 text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-[#FF7A1A]" />
                    <span>{driver.homeBase}</span>
                  </span>
                  <span>·</span>
                  <span>{driver.experienceYears} Years Driving</span>
                </div>
              </div>
            </div>

            <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/10 text-amber-400 text-sm font-bold border border-amber-500/20">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{driver.rating}</span>
                <span className="text-xs text-slate-400 font-normal">({driver.completedGigs} hauls)</span>
              </div>
              <span className={`text-xs font-semibold ${driver.availableNow ? 'text-[#22C55E]' : 'text-slate-500'}`}>
                {driver.availableNow ? '● Ready for Dispatch' : '○ Currently on Haul'}
              </span>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3.5 rounded-xl bg-[#111A2E] border border-white/5">
              <span className="text-[10px] text-slate-400 block uppercase">Completed Gigs</span>
              <span className="font-display font-bold text-xl text-white">{driver.completedGigs}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#111A2E] border border-white/5">
              <span className="text-[10px] text-slate-400 block uppercase">Experience</span>
              <span className="font-display font-bold text-xl text-white">{driver.experienceYears} yrs</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#111A2E] border border-white/5">
              <span className="text-[10px] text-slate-400 block uppercase">Safety Score</span>
              <span className="font-display font-bold text-sm text-[#2DD4BF] mt-1 block">100% Clean</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#111A2E] border border-white/5">
              <span className="text-[10px] text-slate-400 block uppercase">CDL Verified</span>
              <span className="font-display font-bold text-sm text-[#22C55E] mt-1 block">State Synced</span>
            </div>
          </div>

          {/* Bio */}
          <div>
            <h3 className="font-display font-bold text-sm text-white mb-2">Driver Bio & Equipment</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-[#111A2E] p-4 rounded-xl border border-white/5">
              {driver.bio}
            </p>
          </div>

          {/* Endorsements */}
          <div>
            <h3 className="font-display font-bold text-sm text-white mb-2">Verified CDL Endorsements</h3>
            <div className="flex items-center gap-2 flex-wrap">
              {driver.endorsements.map((end) => (
                <span
                  key={end}
                  className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-white flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2DD4BF]" />
                  <span>{end}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-400">
              Direct connection. Contact this driver with your company rate confirmation sheet.
            </p>

            <button
              onClick={handleContact}
              className="shine-hover w-full sm:w-auto px-6 py-3 rounded-xl gradient-amber text-white font-bold text-xs shadow-md shadow-[#FF7A1A]/20"
            >
              Direct Message / Hire Driver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
