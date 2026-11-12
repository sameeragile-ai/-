import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Trash2, 
  AlertTriangle, 
  Send, 
  MapPin, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Truck,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';
import { CarrierBadge } from './CarrierBadge.tsx';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    removeFromCart, 
    clearCart, 
    isCartOpen, 
    setIsCartOpen,
    cartTotalEarnings,
    cartTotalMiles,
    hasScheduleConflict,
    conflictingDates,
    submitCartApplications
  } = useApp();

  const [driverNote, setDriverNote] = useState('');
  const [driverPhone, setDriverPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsSubmitting(true);
    // Simulate brief network delay
    await new Promise((r) => setTimeout(r, 600));
    await submitCartApplications(driverNote);
    setIsSubmitting(false);
    setDriverNote('');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setIsCartOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 240 }}
              className="w-screen max-w-md bg-[#0B1220] border-l border-white/10 shadow-2xl flex flex-col justify-between"
            >
              {/* Drawer Header */}
              <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-[#111A2E]/60">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg gradient-amber flex items-center justify-center text-white">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-lg text-white">
                      Your Gig Cart
                    </h2>
                    <p className="text-xs text-slate-400">
                      {cart.length} {cart.length === 1 ? 'haul' : 'hauls'} queued for direct application
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {cart.length > 0 && (
                    <button
                      onClick={clearCart}
                      className="text-xs text-slate-400 hover:text-red-400 px-2 py-1 rounded transition-colors"
                      title="Clear Cart"
                    >
                      Clear
                    </button>
                  )}
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                    aria-label="Close Gig Cart"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Schedule Conflict Warning */}
              {hasScheduleConflict && (
                <div className="mx-6 mt-4 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-[#FFB547] shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <p className="font-bold text-[#FFB547]">Schedule Overlap Detected</p>
                    <p className="text-slate-300 mt-0.5">
                      You have multiple gigs scheduled on{' '}
                      <span className="font-semibold text-white">
                        {conflictingDates.join(', ')}
                      </span>
                      . Verify your pickup and drop-off windows to ensure no delivery delays!
                    </p>
                  </div>
                </div>
              )}

              {/* Drawer Body: Cart Items List */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3.5">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 mb-4">
                      <Truck className="w-8 h-8 opacity-60" />
                    </div>
                    <h3 className="font-display font-bold text-base text-white mb-1">
                      Your Gig Cart is Empty
                    </h3>
                    <p className="text-xs text-slate-400 max-w-xs mb-6">
                      Explore available trailer relocations, local yard shunts, and cross-state linehauls to queue your next run.
                    </p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="px-4 py-2.5 rounded-xl gradient-amber text-white text-xs font-bold shadow-md shadow-[#FF7A1A]/20"
                    >
                      Browse Available Gigs
                    </button>
                  </div>
                ) : (
                  <AnimatePresence initial={false}>
                    {cart.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="p-4 rounded-xl bg-[#16213A] border border-white/5 hover:border-white/15 transition-colors relative"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <CarrierBadge
                              initials={item.company.logoInitials}
                              gradient={item.company.gradient}
                              size="sm"
                            />
                            <div className="min-w-0">
                              <h4 className="text-xs font-bold text-white truncate">
                                {item.company.name}
                              </h4>
                              <p className="text-[11px] text-slate-400">
                                {item.equipment} · {item.gigType}
                              </p>
                            </div>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-slate-400 hover:text-red-400 p-1 rounded transition-colors"
                            aria-label={`Remove ${item.title}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Route and Pay */}
                        <div className="mt-3 flex items-center justify-between text-xs bg-[#111A2E] p-2.5 rounded-lg border border-white/5">
                          <div className="flex items-center gap-1.5 font-medium text-slate-200">
                            <span>{item.pickup.city}, {item.pickup.state}</span>
                            <ArrowRight className="w-3 h-3 text-[#FF7A1A]" />
                            <span>{item.dropoff.city}, {item.dropoff.state}</span>
                          </div>
                          <span className="font-display font-bold text-white text-sm tabular-nums">
                            ${item.pay.toLocaleString()}
                          </span>
                        </div>

                        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {item.date}
                          </span>
                          <span className="font-mono text-[#2DD4BF]">
                            {item.miles} miles (${item.ratePerMile.toFixed(2)}/mi)
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {/* Drawer Footer & Checkout */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-white/10 bg-[#111A2E]/80 space-y-4">
                  {/* Summary Metric Chips */}
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-[10px] text-slate-400 block uppercase">Gigs</span>
                      <span className="font-display font-bold text-base text-white tabular-nums">
                        {cart.length}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-[10px] text-slate-400 block uppercase">Total Miles</span>
                      <span className="font-display font-bold text-base text-white tabular-nums">
                        {cartTotalMiles.toLocaleString()}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#FF7A1A]/10 border border-[#FF7A1A]/30">
                      <span className="text-[10px] text-[#FFB547] block uppercase font-semibold">Est. Earnings</span>
                      <span className="font-display font-bold text-base text-white tabular-nums">
                        ${cartTotalEarnings.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Submission Form */}
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                      <label className="text-[11px] font-medium text-slate-300 block mb-1">
                        Your Contact Phone (for Carrier Dispatch to reach you)
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="(555) 123-4567"
                        value={driverPhone}
                        onChange={(e) => setDriverPhone(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#16213A] border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-[#FF7A1A]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-medium text-slate-300 block mb-1">
                        Optional Note to Carriers (CDL endorsements, tractor type, ETA)
                      </label>
                      <textarea
                        rows={2}
                        value={driverNote}
                        onChange={(e) => setDriverNote(e.target.value)}
                        placeholder="e.g. CDL-A with Hazmat/TWIC. Driving 2024 Freightliner Cascadia, ready to roll at 06:00."
                        className="w-full px-3 py-2 rounded-xl bg-[#16213A] border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-[#FF7A1A] resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="shine-hover w-full py-3.5 px-4 rounded-xl gradient-amber text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#FF7A1A]/20 transition-all hover:brightness-110 active:scale-95 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Connecting with Carriers...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4 stroke-[2.5]" />
                          <span>Send Interest to Carriers ({cart.length})</span>
                        </>
                      )}
                    </button>
                  </form>

                  {/* Direct to Carrier Note */}
                  <p className="text-[10px] text-slate-400 text-center leading-relaxed">
                    <ShieldCheck className="w-3 h-3 text-[#2DD4BF] inline mr-1" />
                    HaulGig is a direct-connect directory. Zero platform transaction cut. Payments and rate confirmations happen directly between you and the verified carrier.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
