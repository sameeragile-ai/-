import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Trash2, 
  AlertTriangle, 
  Send, 
  MapPin, 
  Calendar, 
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
    await new Promise((r) => setTimeout(r, 400));
    await submitCartApplications(driverNote);
    setIsSubmitting(false);
    setDriverNote('');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsCartOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="w-screen max-w-md bg-white border-l border-slate-200 shadow-2xl flex flex-col justify-between"
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#0F172A] flex items-center justify-center text-white">
                    <Truck className="w-4 h-4 text-[#F97316]" />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-base text-slate-900">
                      Your Gig Cart
                    </h2>
                    <p className="text-xs text-slate-500">
                      {cart.length} {cart.length === 1 ? 'haul' : 'hauls'} queued
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {cart.length > 0 && (
                    <button
                      onClick={clearCart}
                      className="text-xs text-slate-500 hover:text-red-600 px-2 py-1 rounded transition-colors"
                    >
                      Clear
                    </button>
                  )}
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
                    aria-label="Close Gig Cart"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Schedule Conflict Warning */}
              {hasScheduleConflict && (
                <div className="mx-6 mt-4 p-3.5 rounded-lg bg-amber-50 border border-amber-200 flex items-start gap-2.5 text-xs">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-amber-900">Schedule Overlap Alert</p>
                    <p className="text-amber-800 mt-0.5">
                      You have multiple runs scheduled on{' '}
                      <span className="font-bold underline">
                        {conflictingDates.join(', ')}
                      </span>
                      . Verify your departure windows before confirming.
                    </p>
                  </div>
                </div>
              )}

              {/* Body */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
                      <Truck className="w-7 h-7" />
                    </div>
                    <h3 className="font-display font-bold text-base text-slate-900 mb-1">
                      Your Cart is Empty
                    </h3>
                    <p className="text-xs text-slate-500 max-w-xs mb-5">
                      Add runs to your cart to queue direct contact with carriers.
                    </p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="px-4 py-2 rounded-lg bg-[#EA580C] text-white text-xs font-bold"
                    >
                      Browse Gigs
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-xl bg-slate-50 border border-slate-200 relative"
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <CarrierBadge
                              initials={item.company.logoInitials}
                              gradient={item.company.gradient}
                              size="sm"
                            />
                            <div className="min-w-0">
                              <h4 className="text-xs font-bold text-slate-900 truncate">
                                {item.company.name}
                              </h4>
                              <p className="text-[11px] text-slate-500">
                                {item.equipment} · {item.gigType}
                              </p>
                            </div>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-slate-400 hover:text-red-600 p-1 rounded"
                            aria-label={`Remove ${item.title}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Route */}
                        <div className="flex items-center justify-between text-xs bg-white p-2.5 rounded-lg border border-slate-200">
                          <div className="flex items-center gap-1.5 font-bold text-slate-800">
                            <span>{item.pickup.city}, {item.pickup.state}</span>
                            <ArrowRight className="w-3 h-3 text-[#EA580C]" />
                            <span>{item.dropoff.city}, {item.dropoff.state}</span>
                          </div>
                          <span className="font-display font-bold text-slate-900 text-sm">
                            ${item.pay.toLocaleString()}
                          </span>
                        </div>

                        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {item.date}
                          </span>
                          <span className="font-mono text-emerald-700 font-medium">
                            {item.miles} mi (${item.ratePerMile.toFixed(2)}/mi)
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-slate-200 bg-slate-50/50 space-y-4">
                  {/* Totals */}
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                      <span className="text-[10px] text-slate-500 block uppercase">Gigs</span>
                      <span className="font-display font-bold text-base text-slate-900">
                        {cart.length}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                      <span className="text-[10px] text-slate-500 block uppercase">Total Miles</span>
                      <span className="font-display font-bold text-base text-slate-900">
                        {cartTotalMiles.toLocaleString()}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-orange-50 border border-orange-200">
                      <span className="text-[10px] text-[#EA580C] block uppercase font-bold">Est. Earnings</span>
                      <span className="font-display font-bold text-base text-[#EA580C]">
                        ${cartTotalEarnings.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">
                        Your Contact Phone (for Carrier Dispatch to reach you)
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="(555) 123-4567"
                        value={driverPhone}
                        onChange={(e) => setDriverPhone(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:border-[#EA580C]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">
                        Optional Note to Dispatch (endorsements, tractor specs)
                      </label>
                      <textarea
                        rows={2}
                        value={driverNote}
                        onChange={(e) => setDriverNote(e.target.value)}
                        placeholder="e.g. CDL-A with Hazmat, 2024 Freightliner Cascadia ready at 07:00."
                        className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:border-[#EA580C] resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 px-4 rounded-lg bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span>Connecting with Carriers...</span>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Send Interest to Carriers ({cart.length})</span>
                        </>
                      )}
                    </button>
                  </form>

                  <p className="text-[10px] text-slate-500 text-center leading-relaxed">
                    <ShieldCheck className="w-3 h-3 text-emerald-600 inline mr-1" />
                    Zero broker fees. All payments and contracts are settled directly between you and the verified carrier.
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
