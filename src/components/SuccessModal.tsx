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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
          onClick={() => setIsSubmittedSuccessModalOpen(false)}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          className="relative w-full max-w-md rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-2xl text-center z-10"
        >
          <button
            onClick={() => setIsSubmittedSuccessModalOpen(false)}
            className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-7 h-7" />
          </div>

          <h3 className="font-display font-bold text-xl text-slate-900 mb-1">
            Interest Sent to Carriers
          </h3>

          <p className="text-xs text-slate-600 max-w-sm mx-auto mb-5">
            Your interest for <span className="font-bold text-slate-900">{gigCount} {gigCount === 1 ? 'gig' : 'gigs'}</span> has been sent to{' '}
            <span className="font-bold text-[#EA580C]">{carrierCount} verified {carrierCount === 1 ? 'carrier' : 'carriers'}</span>.
          </p>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left space-y-3 mb-6">
            <div className="flex items-start gap-2.5">
              <PhoneCall className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
              <div className="text-xs">
                <p className="font-bold text-slate-900">1. Carrier Dispatch Will Call You</p>
                <p className="text-slate-500 mt-0.5">The company's dispatch will call your phone to verify truck specs and pickup window.</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <FileText className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
              <div className="text-xs">
                <p className="font-bold text-slate-900">2. Sign Rate Confirmation</p>
                <p className="text-slate-500 mt-0.5">You sign the carrier's official rate sheet with facility gate codes and pickup details.</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Banknote className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs">
                <p className="font-bold text-slate-900">3. Direct Same-Day Settlement</p>
                <p className="text-slate-500 mt-0.5">Get 100% of the agreed amount via Comchek, Zelle, or direct ACH wire with 0% platform fee.</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsSubmittedSuccessModalOpen(false)}
            className="w-full py-2.5 rounded-lg bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-xs shadow-xs"
          >
            Got It — Back to Gigs
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
