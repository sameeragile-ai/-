import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShieldCheck, Phone, Mail, Star, Truck, ArrowRight, MapPin } from 'lucide-react';
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
    <div className="min-h-screen bg-[#0B1220] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="max-w-2xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#2DD4BF] mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>FMCSA SafeStat Verified</span>
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-white">
            Verified Carrier Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Every carrier in the HaulGig network has passed federal operating authority validation, active DOT safety inspection audits, and maintains verified public liability insurance.
          </p>
        </div>

        {/* Search Bar */}
        <div className="p-4 rounded-2xl bg-[#16213A] border border-white/10 mb-8 max-w-lg">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Search carrier name, DOT number, headquarters or specialty..."
              value={carrierSearch}
              onChange={(e) => setCarrierSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#0B1220] border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-[#FF7A1A]"
            />
          </div>
        </div>

        {/* Carriers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCarriers.map((carrier) => (
            <div
              key={carrier.id}
              className="p-6 rounded-2xl bg-[#16213A] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <CarrierBadge
                      initials={carrier.logoInitials}
                      gradient={carrier.gradient}
                      size="lg"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h2 className="font-display font-bold text-lg text-white">
                          {carrier.name}
                        </h2>
                        <ShieldCheck className="w-4 h-4 text-[#2DD4BF]" />
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span className="font-mono">{carrier.dotNumber}</span>
                        <span>·</span>
                        <span>{carrier.yearsActive} yrs active</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{carrier.rating}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      ({carrier.reviewsCount} reviews)
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                  {carrier.about}
                </p>

                {/* Specs */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-3 rounded-xl bg-[#111A2E] border border-white/5 text-xs mb-4">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Headquarters</span>
                    <span className="text-white font-medium flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#FF7A1A]" />
                      <span className="truncate">{carrier.location}</span>
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Fleet Size</span>
                    <span className="text-white font-medium">{carrier.fleetSize} Power Units</span>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <span className="text-[10px] text-slate-400 block uppercase">Safety Score</span>
                    <span className="text-[#2DD4BF] font-medium truncate block">{carrier.safetyScore}</span>
                  </div>
                </div>

                {/* Specializations */}
                <div className="flex items-center gap-1.5 flex-wrap mb-4">
                  {carrier.specializations.map((spec) => (
                    <span
                      key={spec}
                      className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[11px] text-slate-300"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer row */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <a
                    href={`tel:${carrier.phone.replace(/[^0-9]/g, '')}`}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                    title={`Call ${carrier.name}`}
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={`mailto:${carrier.email}`}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                    title={`Email ${carrier.name}`}
                  >
                    <Mail className="w-3.5 h-3.5" />
                  </a>
                </div>

                <Link
                  to={`/gigs?q=${encodeURIComponent(carrier.name)}`}
                  className="px-3.5 py-2 rounded-xl gradient-amber text-white font-bold text-xs flex items-center gap-1 shadow-sm hover:brightness-110"
                >
                  <span>View Open Gigs ({carrier.activeGigsCount})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
