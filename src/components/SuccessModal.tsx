import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, PhoneCall, FileText, Banknote, X } from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';

export const SuccessModal: React.FC = () => {
  const { 
    isSubmittedSuccessModalOpen, 
    setIsSubmittedSuccessModalOpen,
    lastSubmissionMeta
  } = useApp();

  if (!isSubmittedSuccessModalOpen) return null;

  const carrierCount = lastSubmissionMeta?.carrierCount || 1;
  const gigCount = lastSubmissionMeta?.gigCount || 1;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-lg rounded-2xl bg-[#111A2E] border border-white/15 p-6 sm:p-8 shadow-2xl text-center overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={() => setIsSubmittedSuccessModalOpen(false)}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Success Check Icon */}
          <div className="mx-auto w-16 h-16 rounded-2xl bg-[#22C55E]/15 border border-[#22C55E]/30 flex items-center justify-center text-[#22C55E] mb-5">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h3 className="font-display font-bold text-2xl text-white mb-2">
            Interest Sent Directly to Carriers!
          </h3>

          <p className="text-sm text-slate-300 max-w-sm mx-auto mb-6">
            Your interest for <span className="font-semibold text-white">{gigCount} {gigCount === 1 ? 'gig' : 'gigs'}</span> has been submitted to{' '}
            <span className="font-semibold text-[#FFB547]">{carrierCount} verified {carrierCount === 1 ? 'carrier' : 'carriers'}</span>.
          </p>

          {/* Next Steps Accordion/List */}
          <div className="bg-[#16213A] rounded-xl p-4 border border-white/5 text-left space-y-3 mb-6">
            <div className="flex items-start gap-3">
              <div className="p-1.5 rounded-lg bg-[#2DD4BF]/15 text-[#2DD4BF] shrink-0 mt-0.5">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-white">1. Direct Carrier Dispatch Call</p>
                <p className="text-slate-400 mt-0.5">
                  The carrier's operations desk will call or text your phone number to confirm your tractor specs and departure time.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-1.5 rounded-lg bg-[#FF7A1A]/15 text-[#FF7A1A] shrink-0 mt-0.5">
                <FileText className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-white">2. Rate Confirmation & Gate Pass</p>
                <p className="text-slate-400 mt-0.5">
                  You receive an official rate confirmation directly from the carrier with pickup gate codes and bill of lading (BOL).
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-1.5 rounded-lg bg-[#22C55E]/15 text-[#22C55E] shrink-0 mt-0.5">
                <Banknote className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-white">3. Direct Settlement (0% Platform Fee)</p>
                <p className="text-slate-400 mt-0.5">
                  You get paid 100% of the agreed amount via Comchek, Zelle, or direct ACH wire immediately upon delivery.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsSubmittedSuccessModalOpen(false)}
            className="w-full py-3 rounded-xl gradient-amber text-white font-bold text-sm shadow-md shadow-[#FF7A1A]/20"
          >
            Got It — Back to Gigs
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
