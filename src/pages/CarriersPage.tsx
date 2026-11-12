import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShieldCheck, Phone, Mail, Star, ArrowRight, MapPin } from 'lucide-react';
import { CARRIERS } from '../data/carriers.ts';
import { CarrierBadge } from '../components/CarrierBadge.tsx';

export const CarriersPage: React.FC = () => {
  const [carrierSearch, setCarrierSearch] = useState('');

  const filteredCarriers = CARRIERS.filter(
    (c) =>
      c.name.toLowerCase().includes(carrierSearch.toLowerCase()) ||
      c.location.toLowerCase().includes(carrierSearch.toLowerCase()) ||
      c.dotNumber.toLowerCase().includes(carrierSearch.toLowerCase()) ||
      c.specializations.some((s) => s.toLowerCase().includes(carrierSearch.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>FMCSA SafeStat Verified Network</span>
          </div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-slate-900">
            Verified Carrier Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Every motor carrier is checked against federal USDOT records, active operating authority, and liability insurance.
          </p>
        </div>

        {/* Search */}
        <div className="p-3 rounded-xl bg-white border border-slate-200 mb-6 max-w-md shadow-xs">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search carrier name, DOT #, or city..."
              value={carrierSearch}
              onChange={(e) => setCarrierSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:border-[#EA580C]"
            />
          </div>
        </div>

        {/* Carriers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredCarriers.map((carrier) => (
            <div
              key={carrier.id}
              className="p-5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <CarrierBadge
                      initials={carrier.logoInitials}
                      gradient={carrier.gradient}
                      size="md"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h2 className="font-display font-bold text-base text-slate-900">
                          {carrier.name}
                        </h2>
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="font-mono">{carrier.dotNumber}</span>
                        <span>·</span>
                        <span>{carrier.yearsActive} yrs active</span>
                      </div>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{carrier.rating}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                  {carrier.about}
                </p>

                <div className="grid grid-cols-3 gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs mb-3">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-medium">Headquarters</span>
                    <span className="text-slate-900 font-semibold truncate block">{carrier.location}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-medium">Fleet</span>
                    <span className="text-slate-900 font-semibold block">{carrier.fleetSize} units</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-medium">Safety Score</span>
                    <span className="text-emerald-700 font-semibold truncate block">Satisfactory</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 flex-wrap mb-3">
                  {carrier.specializations.map((spec) => (
                    <span
                      key={spec}
                      className="px-2 py-0.5 rounded bg-slate-100 text-[11px] text-slate-700 font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${carrier.phone.replace(/[^0-9]/g, '')}`}
                    className="p-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                    title={`Call ${carrier.name}`}
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={`mailto:${carrier.email}`}
                    className="p-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                    title={`Email ${carrier.name}`}
                  >
                    <Mail className="w-3.5 h-3.5" />
                  </a>
                </div>

                <Link
                  to={`/gigs?q=${encodeURIComponent(carrier.name)}`}
                  className="px-3 py-1.5 rounded-md bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-xs flex items-center gap-1"
                >
                  <span>Open Runs ({carrier.activeGigsCount})</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
