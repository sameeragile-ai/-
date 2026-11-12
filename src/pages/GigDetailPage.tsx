import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Check, 
  Plus, 
  Phone, 
  Mail, 
  Share2, 
  Heart, 
  Truck, 
  FileCheck, 
  ArrowRight
} from 'lucide-react';
import { GIGS } from '../data/gigs.ts';
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
      <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-20 flex flex-col items-center justify-center text-center px-4">
        <h1 className="font-display font-bold text-2xl text-slate-900 mb-2">Gig Not Found</h1>
        <p className="text-xs text-slate-500 mb-6">This listing may have already been booked by another driver.</p>
        <Link to="/gigs" className="px-4 py-2 rounded-lg bg-[#EA580C] text-white font-bold text-xs">
          Return to Gig Board
        </Link>
      </div>
    );
  }

  const inCart = isInCart(gig.id);
  const saved = isSaved(gig.id);

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
    <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-28 sm:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb row */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to listings</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-medium flex items-center gap-1.5"
              aria-label="Share gig"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>

            <button
              onClick={() => toggleSaveGig(gig.id)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 ${
                saved
                  ? 'bg-orange-50 text-[#EA580C] border-orange-200'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
              aria-label={saved ? 'Remove from saved' : 'Save gig'}
            >
              <Heart className={`w-3.5 h-3.5 ${saved ? 'fill-[#EA580C]' : ''}`} />
              <span>{saved ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          {/* Left Column: Route, Manifest, Requirements */}
          <div className="lg:col-span-8 space-y-6">
            {/* Header Box */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-orange-100 text-[#EA580C]">
                  {gig.urgencyTag}
                </span>
                <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-slate-100 text-slate-700">
                  {gig.equipment}
                </span>
                <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-slate-100 text-slate-700">
                  {gig.gigType}
                </span>
                <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Direct Settlement · 0% Fee
                </span>
              </div>

              <h1 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight">
                {gig.title}
              </h1>

              {/* Route Summary Box */}
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Origin */}
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      <span className="text-xs uppercase font-bold text-emerald-800 tracking-wider">Origin Pickup</span>
                    </div>
                    <p className="font-display font-bold text-lg text-slate-900">
                      {gig.pickup.city}, {gig.pickup.state}
                    </p>
                    {gig.pickup.facilityName && (
                      <p className="text-xs text-slate-600 mt-0.5">{gig.pickup.facilityName}</p>
                    )}
                  </div>

                  {/* Distance */}
                  <div className="py-2 sm:py-0 sm:px-6 flex flex-col items-center justify-center shrink-0">
                    <span className="text-xs font-mono font-semibold text-slate-700">{gig.miles} miles</span>
                    <div className="w-24 h-0.5 bg-slate-300 my-1 relative">
                      <ArrowRight className="w-3 h-3 text-[#EA580C] absolute -top-1.25 right-0" />
                    </div>
                    <span className="text-[11px] font-mono text-emerald-700 font-semibold">${gig.ratePerMile.toFixed(2)}/mi</span>
                  </div>

                  {/* Destination */}
                  <div className="flex-1 sm:text-right">
                    <div className="flex items-center sm:justify-end gap-1.5 mb-1">
                      <span className="text-xs uppercase font-bold text-[#EA580C] tracking-wider">Destination</span>
                      <MapPin className="w-3.5 h-3.5 text-[#EA580C]" />
                    </div>
                    <p className="font-display font-bold text-lg text-slate-900">
                      {gig.dropoff.city}, {gig.dropoff.state}
                    </p>
                    {gig.dropoff.facilityName && (
                      <p className="text-xs text-slate-600 mt-0.5">{gig.dropoff.facilityName}</p>
                    )}
                  </div>
                </div>

                {/* Schedule strip */}
                <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span className="font-medium">Date: {gig.date}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>Window: {gig.pickupTimeWindow}</span>
                  </span>
                  <span className="text-slate-500 font-mono hidden sm:inline">
                    Est. Duration: {gig.estDuration}
                  </span>
                </div>
              </div>
            </div>

            {/* Description & Cargo */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <h2 className="font-display font-bold text-lg text-slate-900">
                Dispatch & Load Details
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {gig.description}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100 text-xs">
                {gig.cargoWeight && (
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-500 block uppercase font-medium">Weight</span>
                    <span className="font-bold text-slate-900">{gig.cargoWeight}</span>
                  </div>
                )}
                {gig.palletCount !== undefined && (
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-500 block uppercase font-medium">Pallets</span>
                    <span className="font-bold text-slate-900">{gig.palletCount > 0 ? `${gig.palletCount} Plts` : 'Empty'}</span>
                  </div>
                )}
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-500 block uppercase font-medium">Handling</span>
                  <span className="font-bold text-slate-900">{gig.liveUnload ? 'Live Unload' : 'Drop & Hook'}</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-500 block uppercase font-medium">Posted</span>
                  <span className="font-bold text-slate-900">{gig.postedAt}</span>
                </div>
              </div>
            </div>

            {/* Driver Requirements */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <h2 className="font-display font-bold text-lg text-slate-900">
                Driver Requirements
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center gap-3">
                  <FileCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-900 block">Commercial Driver License</span>
                    <span className="text-slate-600">{gig.requirements.cdlClass} (Valid & Clean)</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-900 block">Experience Required</span>
                    <span className="text-slate-600">{gig.requirements.minExperienceYears}+ Years Verifiable Experience</span>
                  </div>
                </div>

                {gig.requirements.endorsements.length > 0 ? (
                  gig.requirements.endorsements.map((end) => (
                    <div key={end} className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center gap-3">
                      <Check className="w-5 h-5 text-[#EA580C] shrink-0" />
                      <div>
                        <span className="font-bold text-slate-900 block">{end}</span>
                        <span className="text-slate-600">Required on License Credential</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center gap-3">
                    <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <span className="font-bold text-slate-900 block">Standard Endorsements</span>
                      <span className="text-slate-600">No Hazmat or Tanker needed</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Pay Breakdown & Carrier Card */}
          <div className="lg:col-span-4 space-y-6">
            {/* Pay Card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Flat Payout (100% Direct)
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-display font-bold text-4xl text-slate-900 tabular-nums">
                    ${gig.pay.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">net</span>
                </div>
              </div>

              {/* Rate Details */}
              <div className="space-y-2 pt-3 border-t border-slate-100 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Mileage</span>
                  <span className="font-mono text-slate-900 font-semibold">{gig.miles} miles</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Rate per Mile</span>
                  <span className="font-mono text-emerald-700 font-semibold">${gig.ratePerMile.toFixed(2)}/mi</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Estimated Duration</span>
                  <span className="font-mono text-slate-900 font-semibold">{gig.estDuration}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Platform Fee</span>
                  <span className="font-mono text-emerald-700 font-bold">$0.00 (0%)</span>
                </div>
              </div>

              {/* Settlement Terms */}
              <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs">
                <p className="font-bold text-emerald-900 mb-0.5 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Settlement Terms</span>
                </p>
                <p className="text-[11px] text-emerald-800 leading-relaxed">
                  {gig.settlementTerms}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => addToCart(gig)}
                  className={`w-full py-3 px-4 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    inCart
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : 'bg-[#EA580C] hover:bg-[#C2410C] text-white shadow-xs'
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
                  className="w-full py-2.5 px-4 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-700" />
                  <span>Call Carrier Dispatch</span>
                </a>
              </div>
            </div>

            {/* Carrier Card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <CarrierBadge
                  initials={gig.company.logoInitials}
                  gradient={gig.company.gradient}
                  size="md"
                />
                <div>
                  <h3 className="font-display font-bold text-base text-slate-900">
                    {gig.company.name}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>FMCSA Verified Carrier</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">DOT Registry</span>
                  <span className="font-mono text-slate-900 font-semibold">{gig.company.dotNumber}</span>
                </div>
                {gig.company.mcNumber && (
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Operating MC</span>
                    <span className="font-mono text-slate-900 font-semibold">{gig.company.mcNumber}</span>
                  </div>
                )}
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Carrier Rating</span>
                  <span className="text-amber-600 font-bold">★ {gig.company.rating} ({gig.company.reviewsCount} reviews)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Headquarters</span>
                  <span className="text-slate-900 font-medium">{gig.company.location}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Years in Operation</span>
                  <span className="text-slate-900 font-medium">{gig.company.yearsActive} years</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                <a
                  href={`tel:${gig.company.phone.replace(/[^0-9]/g, '')}`}
                  className="flex items-center gap-2 text-slate-700 hover:text-slate-900 font-medium"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-500" />
                  <span>{gig.company.phone}</span>
                </a>
                <a
                  href={`mailto:${gig.company.email}`}
                  className="flex items-center gap-2 text-slate-700 hover:text-slate-900 font-medium"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  <span>{gig.company.email}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Gigs */}
        {similarGigs.length > 0 && (
          <div className="mt-12 pt-8 border-t border-slate-200">
            <h2 className="font-display font-bold text-xl text-slate-900 mb-5">
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

      {/* Mobile Sticky Bottom Bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden p-3 bg-white border-t border-slate-200 flex items-center justify-between gap-3 shadow-lg">
        <div>
          <span className="text-[10px] text-slate-500 block uppercase font-mono">Flat Rate</span>
          <span className="font-display font-bold text-xl text-slate-900 tabular-nums">${gig.pay}</span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${gig.company.phone.replace(/[^0-9]/g, '')}`}
            className="p-2.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200"
            aria-label="Call Dispatch"
          >
            <Phone className="w-4 h-4" />
          </a>

          <button
            onClick={() => addToCart(gig)}
            className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 ${
              inCart
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-[#EA580C] text-white'
            }`}
          >
            {inCart ? 'In Cart ✓' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};
