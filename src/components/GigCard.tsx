import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Check, 
  Plus, 
  Heart, 
  MapPin, 
  ArrowRight, 
  ShieldCheck, 
  Calendar,
  Clock
} from 'lucide-react';
import { Gig } from '../data/types.ts';
import { useApp } from '../context/AppContext.tsx';
import { CarrierBadge } from './CarrierBadge.tsx';

interface GigCardProps {
  gig: Gig;
  layout?: 'grid' | 'list';
}

export const GigCard: React.FC<GigCardProps> = ({ gig, layout = 'grid' }) => {
  const { addToCart, isInCart, isSaved, toggleSaveGig } = useApp();

  const inCart = isInCart(gig.id);
  const saved = isSaved(gig.id);

  const urgencyBadge = {
    Urgent: 'bg-red-50 text-red-700 border-red-200',
    Today: 'bg-orange-50 text-orange-700 border-orange-200',
    'This Week': 'bg-slate-50 text-slate-600 border-slate-200'
  }[gig.urgencyTag];

  return (
    <div
      className={`group relative rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden ${
        layout === 'list' ? 'md:flex-row md:items-stretch' : ''
      }`}
    >
      {/* Main Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Top meta row */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded border uppercase tracking-wide ${urgencyBadge}`}>
                {gig.urgencyTag}
              </span>
              <span className="text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                {gig.equipment}
              </span>
              <span className="text-[11px] font-medium text-slate-500">
                {gig.gigType}
              </span>
            </div>

            <button
              onClick={() => toggleSaveGig(gig.id)}
              className={`p-1.5 rounded-lg transition-colors ${
                saved
                  ? 'text-[#EA580C] bg-orange-50'
                  : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
              }`}
              aria-label={saved ? 'Remove from saved' : 'Save gig'}
            >
              <Heart className={`w-4 h-4 ${saved ? 'fill-[#EA580C]' : ''}`} />
            </button>
          </div>

          {/* Route Display - Extremely Clear & Legible */}
          <Link to={`/gigs/${gig.id}`} className="block group-hover:text-[#EA580C] transition-colors mb-3">
            <div className="bg-slate-50 rounded-lg p-3.5 border border-slate-100">
              <div className="flex items-center justify-between gap-3">
                {/* Origin */}
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                    <span className="font-display font-bold text-base text-slate-900 group-hover:text-[#EA580C] transition-colors">
                      {gig.pickup.city}, {gig.pickup.state}
                    </span>
                  </div>
                  {gig.pickup.facilityName && (
                    <p className="text-[11px] text-slate-500 pl-4 truncate max-w-[180px]">
                      {gig.pickup.facilityName}
                    </p>
                  )}
                </div>

                {/* Arrow & Mileage */}
                <div className="flex flex-col items-center justify-center px-2 shrink-0">
                  <span className="text-[11px] font-semibold text-slate-600 font-mono">
                    {gig.miles} mi
                  </span>
                  <div className="w-10 h-0.5 bg-slate-300 my-1 relative">
                    <ArrowRight className="w-3 h-3 text-slate-500 absolute -top-1.25 right-0" />
                  </div>
                  <span className="text-[10px] font-mono text-emerald-700 font-medium">
                    ${gig.ratePerMile.toFixed(2)}/mi
                  </span>
                </div>

                {/* Destination */}
                <div className="flex-1 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <span className="font-display font-bold text-base text-slate-900 group-hover:text-[#EA580C] transition-colors">
                      {gig.dropoff.city}, {gig.dropoff.state}
                    </span>
                    <MapPin className="w-3.5 h-3.5 text-[#EA580C] shrink-0" />
                  </div>
                  {gig.dropoff.facilityName && (
                    <p className="text-[11px] text-slate-500 truncate max-w-[180px] ml-auto">
                      {gig.dropoff.facilityName}
                    </p>
                  )}
                </div>
              </div>

              {/* Date & Time Window */}
              <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-600">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-medium">
                    {new Date(gig.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </span>
                <span className="flex items-center gap-1 text-[11px] text-slate-500">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{gig.pickupTimeWindow}</span>
                </span>
              </div>
            </div>
          </Link>

          {/* Carrier Info */}
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <CarrierBadge
                initials={gig.company.logoInitials}
                gradient={gig.company.gradient}
                size="sm"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-800 truncate">
                    {gig.company.name}
                  </span>
                  <span title="FMCSA Verified Carrier">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <span>{gig.company.dotNumber}</span>
                  <span>·</span>
                  <span className="text-amber-600 font-semibold">★ {gig.company.rating}</span>
                </div>
              </div>
            </div>

            <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded shrink-0 hidden sm:inline-block">
              Direct-to-Carrier
            </span>
          </div>

          {/* Requirements Badges */}
          <div className="flex items-center gap-1.5 flex-wrap text-[11px] text-slate-600">
            <span className="px-2 py-0.5 rounded bg-slate-100 font-semibold text-slate-700">
              {gig.requirements.cdlClass}
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-100">
              {gig.requirements.minExperienceYears}+ yrs exp
            </span>
            {gig.requirements.endorsements.slice(0, 2).map((end) => (
              <span key={end} className="px-2 py-0.5 rounded bg-orange-50 text-orange-800 border border-orange-100">
                {end}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer: Pay & CTA */}
      <div className={`p-4 bg-slate-50/80 border-t border-slate-200 flex items-center justify-between gap-3 ${
        layout === 'list' ? 'md:w-60 md:border-t-0 md:border-l md:flex-col md:justify-center' : ''
      }`}>
        <div>
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
            Flat Pay (100% Direct)
          </span>
          <div className="flex items-baseline gap-1">
            <span className="font-display font-bold text-2xl text-slate-900 tabular-nums">
              ${gig.pay.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => addToCart(gig)}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              inCart
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                : 'bg-[#EA580C] hover:bg-[#C2410C] text-white shadow-xs active:scale-98'
            }`}
            aria-label={inCart ? 'In Gig Cart' : `Add ${gig.title} to Gig Cart`}
          >
            {inCart ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>In Cart</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
                <span>Add to Cart</span>
              </>
            )}
          </button>

          <Link
            to={`/gigs/${gig.id}`}
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/80 transition-colors"
            aria-label={`View details for ${gig.title}`}
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
