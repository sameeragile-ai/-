import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Truck } from 'lucide-react';

interface PageLoaderProps {
  onComplete?: () => void;
  forceShow?: boolean;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ onComplete, forceShow = false }) => {
  const [isVisible, setIsVisible] = useState(() => {
    if (forceShow) return true;
    try {
      const hasSeen = sessionStorage.getItem('haulgig_seen_loader');
      return !hasSeen;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    if (!isVisible) {
      if (onComplete) onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(false);
      try {
        sessionStorage.setItem('haulgig_seen_loader', 'true');
      } catch {}
      if (onComplete) onComplete();
    }, 600);

    return () => clearTimeout(timer);
  }, [isVisible, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.25 } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white text-[#0F172A] select-none"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#0F172A] flex items-center justify-center text-white shadow-md">
              <Truck className="w-6 h-6 text-[#F97316]" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-[#0F172A]">
              Haul<span className="text-[#EA580C]">Gig</span>
            </span>
            <div className="w-32 h-1 bg-slate-100 rounded-full overflow-hidden mt-1">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="h-full bg-[#EA580C] rounded-full"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
