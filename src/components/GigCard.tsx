import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Check, 
  Plus, 
  Heart, 
  MapPin, 
  Clock, 
  ArrowRight, 
  ShieldCheck, 
  Calendar,
  AlertCircle
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

  // Urgency tag styling
  const urgencyStyle = {
    Urgent: 'text-[#FF7A1A] border-[#FF7A1A]/30 bg-[#FF7A1A]/10',
    Today: 'text-[#2DD4BF] border-[#2DD4BF]/30 bg-[#2DD4BF]/10',
    'This Week': 'text-slate-400 border-white/10 bg-white/5'
  }[gig.urgencyTag];

  return (
    <motion.div
      layout
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.985 }}
      className={`group relative rounded-2xl bg-[#16213A] border border-white/[0.08] hover:border-[#FF7A1A]/40 transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-[#FF7A1A]/5 flex flex-col justify-between overflow-hidden ${
        layout === 'list' ? 'md:flex-row md:items-stretch' : ''
      }`}
    >
      {/* Top / Main Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Header row: Urgency tag, Equipment, and Save Button */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md border tracking-wider uppercase inline-flex items-center gap-1 ${urgencyStyle}`}
              >
                {gig.urgencyTag === 'Urgent' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A1A] animate-pulse" />
                )}
                {gig.urgencyTag}
              </span>

              <span className="text-[11px] font-medium text-slate-300 bg-white/5 px-2 py-0.5 rounded-md border border-white/5">
                {gig.equipment}
              </span>

              <span className="text-[11px] font-medium text-slate-400">
                {gig.gigType}
              </span>
            </div>

            <button
              onClick={() => toggleSaveGig(gig.id)}
              className={`p-1.5 rounded-lg transition-colors focus:outline-none ${
                saved
                  ? 'text-[#FF7A1A] bg-[#FF7A1A]/10'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
              aria-label={saved ? 'Remove from saved' : 'Save gig'}
            >
              <Heart className={`w-4 h-4 ${saved ? 'fill-[#FF7A1A]' : ''}`} />
            </button>
          </div>

          {/* Title linking to details */}
          <Link to={`/gigs/${gig.id}`} className="group-hover:text-[#FFB547] transition-colors">
            <h3 className="font-display font-bold text-base sm:text-lg text-white leading-snug line-clamp-2 mb-3">
              {gig.title}
            </h3>
          </Link>

          {/* Route Display */}
          <div className="bg-[#111A2E] rounded-xl p-3 border border-white/5 mb-4">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#2DD4BF] shrink-0" />
                  <span className="text-sm font-semibold text-white">
                    {gig.pickup.city}, {gig.pickup.state}
                  </span>
                </div>
                {gig.pickup.facilityName && (
                  <p className="text-[11px] text-slate-400 ml-5.5 truncate max-w-[200px]">
                    {gig.pickup.facilityName}
                  </p>
                )}
              </div>

              <div className="flex flex-col items-center justify-center px-2 shrink-0">
                <span className="text-[10px] font-mono text-slate-400">{gig.miles} mi</span>
                <div className="w-12 h-[2px] bg-white/20 relative my-1">
                  <ArrowRight className="w-3 h-3 text-[#FF7A1A] absolute -top-1 -right-1" />
                </div>
                <span className="text-[10px] font-mono text-[#2DD4BF]">${gig.ratePerMile.toFixed(2)}/mi</span>
              </div>

              <div className="flex-1 text-right">
                <div className="flex items-center justify-end gap-1.5">
                  <span className="text-sm font-semibold text-white">
                    {gig.dropoff.city}, {gig.dropoff.state}
                  </span>
                  <MapPin className="w-3.5 h-3.5 text-[#FF7A1A] shrink-0" />
                </div>
                {gig.dropoff.facilityName && (
                  <p className="text-[11px] text-slate-400 truncate max-w-[200px] ml-auto">
                    {gig.dropoff.facilityName}
                  </p>
                )}
              </div>
            </div>

            {/* Time / date row */}
            <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{new Date(gig.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{gig.pickupTimeWindow}</span>
              </div>
            </div>
          </div>

          {/* Carrier Info */}
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2.5 min-w-0">
              <CarrierBadge
                initials={gig.company.logoInitials}
                gradient={gig.company.gradient}
                size="sm"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-slate-200 truncate">
                    {gig.company.name}
                  </span>
                  <span title="FMCSA Verified Carrier">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#2DD4BF] shrink-0" />
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <span>{gig.company.dotNumber}</span>
                  <span>·</span>
                  <span className="text-amber-400 font-medium">★ {gig.company.rating}</span>
                </div>
              </div>
            </div>

            {/* Direct disclaimer micro-badge */}
            <span className="text-[10px] text-slate-400 hidden sm:inline-block bg-white/[0.04] px-2 py-0.5 rounded border border-white/5 whitespace-nowrap">
              Direct-to-Carrier
            </span>
          </div>
        </div>

        {/* Requirements snippet */}
        <div className="flex items-center gap-1.5 flex-wrap text-[11px] text-slate-400 mb-4">
          <span className="px-2 py-0.5 rounded bg-white/5 font-mono text-slate-300">
            {gig.requirements.cdlClass}
          </span>
          <span className="px-2 py-0.5 rounded bg-white/5">
            {gig.requirements.minExperienceYears}+ yrs exp
          </span>
          {gig.requirements.endorsements.slice(0, 2).map((end) => (
            <span key={end} className="px-2 py-0.5 rounded bg-white/5 text-slate-300">
              {end}
            </span>
          ))}
          {gig.requirements.endorsements.length > 2 && (
            <span className="text-[10px] text-slate-400">
              +{gig.requirements.endorsements.length - 2} more
            </span>
          )}
        </div>
      </div>

      {/* Card Footer: Pay amount + Actions */}
      <div className={`p-4 bg-[#111A2E]/90 border-t border-white/5 flex items-center justify-between gap-3 ${
        layout === 'list' ? 'md:w-64 md:border-t-0 md:border-l md:flex-col md:justify-center' : ''
      }`}>
        <div>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Flat Payout</span>
          <div className="flex items-baseline gap-1">
            <span className="font-display font-bold text-2xl text-white tabular-nums">
              ${gig.pay.toLocaleString()}
            </span>
            <span className="text-xs text-slate-400 font-mono">net</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => addToCart(gig)}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A1A] ${
              inCart
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                : 'gradient-amber text-white shadow-md shadow-[#FF7A1A]/20 hover:brightness-110 active:scale-95'
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
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
            aria-label={`View details for ${gig.title}`}
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
