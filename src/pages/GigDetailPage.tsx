import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Clock, 
  DollarSign, 
  ShieldCheck, 
  Check, 
  Plus, 
  Phone, 
  Mail, 
  Share2, 
  Heart, 
  Truck, 
  FileCheck, 
  AlertCircle, 
  Building2,
  Scale,
  Package
} from 'lucide-react';
import { GIGS } from '../data/gigs.ts';
import { SafeImage } from '../components/SafeImage.tsx';
import { CarrierBadge } from '../components/CarrierBadge.tsx';
import { GigCard } from '../components/GigCard.tsx';
import { useApp } from '../context/AppContext.tsx';

export const GigDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, isInCart, isSaved, toggleSaveGig, addToast } = useApp();

  const gig = GIGS.find((g) => g.id === id);

  if (!gig) {
    return (
      <div className="min-h-screen bg-[#0B1220] pt-32 pb-20 flex flex-col items-center justify-center text-center px-4">
        <h1 className="font-display font-bold text-2xl text-white mb-2">Gig Not Found</h1>
        <p className="text-xs text-slate-400 mb-6">The freight listing you requested may have already been booked by another driver.</p>
        <Link to="/gigs" className="px-5 py-2.5 rounded-xl gradient-amber text-white font-bold text-xs">
          Return to Gig Board
        </Link>
      </div>
    );
  }

  const inCart = isInCart(gig.id);
  const saved = isSaved(gig.id);

  // Similar gigs (same equipment or nearby)
  const similarGigs = GIGS.filter(
    (g) => g.id !== gig.id && (g.equipment === gig.equipment || g.gigType === gig.gigType)
  ).slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: gig.title,
        text: `${gig.title} - ${gig.pickup.city} to ${gig.dropoff.city} · $${gig.pay}`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast('Link Copied to Clipboard', 'Share this freight run with other drivers', 'info');
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1220] pt-24 pb-28 sm:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb / Back button */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to listings</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors border border-white/10 text-xs flex items-center gap-1.5"
              aria-label="Share gig"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </button>

            <button
              onClick={() => toggleSaveGig(gig.id)}
              className={`p-2 rounded-xl border border-white/10 transition-colors text-xs flex items-center gap-1.5 ${
                saved ? 'bg-[#FF7A1A]/10 text-[#FF7A1A] border-[#FF7A1A]/30' : 'bg-white/5 text-slate-300 hover:text-white'
              }`}
              aria-label={saved ? 'Remove from saved' : 'Save gig'}
            >
              <Heart className={`w-4 h-4 ${saved ? 'fill-[#FF7A1A]' : ''}`} />
              <span className="hidden sm:inline">{saved ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>

        {/* Hero Banner Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          {/* Main Visual & Route Hero */}
          <div className="lg:col-span-8 space-y-6">
            <div className="relative rounded-3xl overflow-hidden bg-[#16213A] border border-white/10 min-h-[320px] sm:min-h-[380px] flex flex-col justify-between p-6 sm:p-8">
              {/* Background Photography with Scrim */}
              <div className="absolute inset-0 z-0">
                <SafeImage
                  src={gig.image}
                  alt={gig.title}
                  className="w-full h-full object-cover brightness-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-[#0B1220]/70 to-[#0B1220]/40" />
              </div>

              {/* Top Row: Tags */}
              <div className="relative z-10 flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#FF7A1A] text-white shadow-md">
                  {gig.urgencyTag} Run
                </span>
                <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-white/15 backdrop-blur-md text-white border border-white/10">
                  {gig.equipment}
                </span>
                <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-white/15 backdrop-blur-md text-white border border-white/10">
                  {gig.gigType}
                </span>
              </div>

              {/* Center / Bottom: Title & Route Graphic */}
              <div className="relative z-10 space-y-4">
                <h1 className="font-display font-bold text-2xl sm:text-4xl text-white tracking-tight leading-tight">
                  {gig.title}
                </h1>

                {/* Animated Route Line Box */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#0B1220]/80 backdrop-blur-md border border-white/10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {/* Pickup */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="w-4 h-4 text-[#2DD4BF]" />
                        <span className="text-xs uppercase font-bold text-[#2DD4BF] tracking-wider">Pickup</span>
                      </div>
                      <p className="font-display font-bold text-base sm:text-lg text-white">
                        {gig.pickup.city}, {gig.pickup.state}
                      </p>
                      {gig.pickup.facilityName && (
                        <p className="text-xs text-slate-400 mt-0.5">{gig.pickup.facilityName}</p>
                      )}
                    </div>

                    {/* Animated Truck & Road Connector */}
                    <div className="py-2 sm:py-0 sm:px-6 flex flex-col items-center justify-center shrink-0">
                      <span className="text-xs font-mono text-slate-300 mb-1">{gig.miles} miles</span>
                      <div className="w-28 sm:w-36 h-2 relative flex items-center">
                        <div className="w-full h-0.5 road-divider" />
                        <motion.div
                          animate={{ x: [0, 90, 0] }}
                          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                          className="absolute -top-2 text-[#FFB547]"
                        >
                          <Truck className="w-4 h-4" />
                        </motion.div>
                      </div>
                      <span className="text-[11px] font-mono text-[#2DD4BF] mt-1">${gig.ratePerMile.toFixed(2)} / mile</span>
                    </div>

                    {/* Dropoff */}
                    <div className="flex-1 sm:text-right">
                      <div className="flex items-center sm:justify-end gap-2 mb-1">
                        <span className="text-xs uppercase font-bold text-[#FF7A1A] tracking-wider">Destination</span>
                        <MapPin className="w-4 h-4 text-[#FF7A1A]" />
                      </div>
                      <p className="font-display font-bold text-base sm:text-lg text-white">
                        {gig.dropoff.city}, {gig.dropoff.state}
                      </p>
                      {gig.dropoff.facilityName && (
                        <p className="text-xs text-slate-400 mt-0.5">{gig.dropoff.facilityName}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description & Dispatch Instructions */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#16213A] border border-white/10 space-y-4">
              <h2 className="font-display font-bold text-lg text-white">
                Dispatch & Load Description
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                {gig.description}
              </p>

              {/* Cargo Specs Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10 text-xs">
                {gig.cargoWeight && (
                  <div className="p-3 rounded-xl bg-[#111A2E] border border-white/5">
                    <span className="text-[10px] text-slate-400 block uppercase">Weight</span>
                    <span className="font-semibold text-white">{gig.cargoWeight}</span>
                  </div>
                )}
                {gig.palletCount !== undefined && (
                  <div className="p-3 rounded-xl bg-[#111A2E] border border-white/5">
                    <span className="text-[10px] text-slate-400 block uppercase">Pallets</span>
                    <span className="font-semibold text-white">{gig.palletCount > 0 ? `${gig.palletCount} Plts` : 'Empty Shunt'}</span>
                  </div>
                )}
                <div className="p-3 rounded-xl bg-[#111A2E] border border-white/5">
                  <span className="text-[10px] text-slate-400 block uppercase">Handling</span>
                  <span className="font-semibold text-white">{gig.liveUnload ? 'Live Unload' : 'No Touch / Drop'}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#111A2E] border border-white/5">
                  <span className="text-[10px] text-slate-400 block uppercase">Posted</span>
                  <span className="font-semibold text-white">{gig.postedAt}</span>
                </div>
              </div>
            </div>

            {/* Requirements Checklist */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#16213A] border border-white/10 space-y-4">
              <h2 className="font-display font-bold text-lg text-white">
                Driver Requirements & Endorsements
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-[#111A2E] border border-white/5 flex items-center gap-3">
                  <FileCheck className="w-5 h-5 text-[#2DD4BF]" />
                  <div>
                    <span className="text-xs font-bold text-white block">Commercial Driver License</span>
                    <span className="text-[11px] text-slate-400">{gig.requirements.cdlClass} (Valid & Unexpired)</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#111A2E] border border-white/5 flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#2DD4BF]" />
                  <div>
                    <span className="text-xs font-bold text-white block">Commercial Driving History</span>
                    <span className="text-[11px] text-slate-400">{gig.requirements.minExperienceYears}+ Years Experience</span>
                  </div>
                </div>

                {gig.requirements.endorsements.length > 0 ? (
                  gig.requirements.endorsements.map((end) => (
                    <div key={end} className="p-3.5 rounded-xl bg-[#111A2E] border border-white/5 flex items-center gap-3">
                      <Check className="w-5 h-5 text-[#FFB547]" />
                      <div>
                        <span className="text-xs font-bold text-white block">{end}</span>
                        <span className="text-[11px] text-slate-400">Required on CDL Credential</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-3.5 rounded-xl bg-[#111A2E] border border-white/5 flex items-center gap-3">
                    <Check className="w-5 h-5 text-[#22C55E]" />
                    <div>
                      <span className="text-xs font-bold text-white block">Standard Endorsements</span>
                      <span className="text-[11px] text-slate-400">No Hazmat or Tanker required</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Pricing Breakdown & Carrier Profile */}
          <div className="lg:col-span-4 space-y-6">
            {/* Pay Breakdown Card */}
            <div className="p-6 rounded-2xl bg-[#16213A] border border-white/10 shadow-xl space-y-5">
              <div>
                <span className="text-xs font-bold text-[#FF7A1A] uppercase tracking-wider block mb-1">
                  Guaranteed Rate
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-display font-bold text-4xl text-white tabular-nums">
                    ${gig.pay.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">flat net payout</span>
                </div>
              </div>

              {/* Rate math */}
              <div className="space-y-2.5 pt-4 border-t border-white/10 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Mileage</span>
                  <span className="font-mono text-white">{gig.miles} miles</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Rate per Mile</span>
                  <span className="font-mono text-[#2DD4BF] font-semibold">${gig.ratePerMile.toFixed(2)} / mi</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Est. Duration</span>
                  <span className="font-mono text-white">{gig.estDuration}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Platform Fee</span>
                  <span className="font-mono text-[#22C55E] font-semibold">$0.00 (0%)</span>
                </div>
              </div>

              {/* Settlement terms */}
              <div className="p-3.5 rounded-xl bg-[#111A2E] border border-white/5 text-xs">
                <p className="font-bold text-slate-200 mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#2DD4BF]" />
                  <span>Settlement Terms</span>
                </p>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {gig.settlementTerms}
                </p>
              </div>

              {/* Desktop CTA buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  onClick={() => addToCart(gig)}
                  className={`shine-hover w-full py-3.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${
                    inCart
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'gradient-amber text-white shadow-[#FF7A1A]/30 active:scale-95'
                  }`}
                >
                  {inCart ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Already in Gig Cart</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 stroke-[3]" />
                      <span>Add to Gig Cart</span>
                    </>
                  )}
                </button>

                <a
                  href={`tel:${gig.company.phone.replace(/[^0-9]/g, '')}`}
                  className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#2DD4BF]" />
                  <span>Call Carrier Dispatch</span>
                </a>
              </div>
            </div>

            {/* Carrier Profile Card */}
            <div className="p-6 rounded-2xl bg-[#16213A] border border-white/10 space-y-4">
              <div className="flex items-center gap-3">
                <CarrierBadge
                  initials={gig.company.logoInitials}
                  gradient={gig.company.gradient}
                  size="md"
                />
                <div>
                  <h3 className="font-display font-bold text-base text-white">
                    {gig.company.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#2DD4BF]" />
                    <span>FMCSA Verified</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">DOT Registry</span>
                  <span className="font-mono text-white">{gig.company.dotNumber}</span>
                </div>
                {gig.company.mcNumber && (
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400">Operating MC</span>
                    <span className="font-mono text-white">{gig.company.mcNumber}</span>
                  </div>
                )}
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Carrier Rating</span>
                  <span className="text-amber-400 font-bold">★ {gig.company.rating} ({gig.company.reviewsCount} reviews)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Headquarters</span>
                  <span className="text-white">{gig.company.location}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Years in Operation</span>
                  <span className="text-white">{gig.company.yearsActive} years</span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 space-y-2 text-xs">
                <a
                  href={`tel:${gig.company.phone.replace(/[^0-9]/g, '')}`}
                  className="flex items-center gap-2 text-slate-300 hover:text-white"
                >
                  <Phone className="w-3.5 h-3.5 text-[#FF7A1A]" />
                  <span>{gig.company.phone}</span>
                </a>
                <a
                  href={`mailto:${gig.company.email}`}
                  className="flex items-center gap-2 text-slate-300 hover:text-white"
                >
                  <Mail className="w-3.5 h-3.5 text-[#2DD4BF]" />
                  <span>{gig.company.email}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Gigs */}
        {similarGigs.length > 0 && (
          <div className="mt-14 pt-10 border-t border-white/10">
            <h2 className="font-display font-bold text-xl text-white mb-6">
              Similar Freight Runs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarGigs.map((sim) => (
                <GigCard key={sim.id} gig={sim} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden p-3 bg-[#0B1220]/95 backdrop-blur-xl border-t border-white/10 flex items-center justify-between gap-3 shadow-2xl">
        <div>
          <span className="text-[10px] text-slate-400 block uppercase font-mono">Flat Rate</span>
          <span className="font-display font-bold text-xl text-white tabular-nums">${gig.pay}</span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${gig.company.phone.replace(/[^0-9]/g, '')}`}
            className="p-2.5 rounded-xl bg-white/10 text-white hover:bg-white/15"
            aria-label="Call Dispatch"
          >
            <Phone className="w-4 h-4" />
          </a>

          <button
            onClick={() => addToCart(gig)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 ${
              inCart
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'gradient-amber text-white shadow-md'
            }`}
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
        </div>
      </div>
    </div>
  );
};
