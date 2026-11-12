import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

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
      } catch {
        // ignore
      }
      if (onComplete) onComplete();
    }, 1600);

    return () => clearTimeout(timer);
  }, [isVisible, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100%', transition: { duration: 0.6, ease: [0.77, 0, 0.175, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0B1220] text-white select-none px-6"
        >
          {/* Subtle background ambient glow */}
          <div className="absolute w-96 h-96 bg-[#FF7A1A]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative w-full max-w-sm flex flex-col items-center">
            {/* Animated Wordmark */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-10 h-10 rounded-xl gradient-amber flex items-center justify-center shadow-lg shadow-[#FF7A1A]/20">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4 16V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2.5a2 2 0 0 1 1.6.8l2.4 3.2c.3.4.5.9.5 1.4V16a2 2 0 0 1-2 2h-1a2.5 2.5 0 0 1-5 0H11a2.5 2.5 0 0 1-5 0H4a2 2 0 0 1-2-2zM8.5 19.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm9 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM16 10h4.1l-1.5-2H16v2z" />
                </svg>
              </div>
              <span className="font-display font-bold text-2xl tracking-tight text-white">
                Haul<span className="gradient-text-amber">Gig</span>
              </span>
            </motion.div>

            {/* Road Container with moving truck */}
            <div className="w-full relative h-16 flex flex-col justify-end">
              {/* Animated Truck driving left to right */}
              <motion.div
                initial={{ x: '-10%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.3, ease: 'easeInOut' }}
                className="absolute bottom-2 text-[#FFB547]"
                style={{ width: '36px', height: '28px' }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-md">
                  <path d="M3 15h1a2 2 0 0 0 4 0h6a2 2 0 0 0 4 0h3v-4.5l-3-4H14V4H3v11zm2-9h7v5H5V6zm11 2.5l2 2.5h-2V8.5zM6 16a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm10 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                </svg>
              </motion.div>

              {/* Dashed Road Background Line */}
              <div className="w-full h-1 bg-white/10 rounded-full relative overflow-hidden">
                {/* Filling Progress Bar */}
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.3, ease: 'easeInOut' }}
                  className="h-full gradient-amber rounded-full"
                />
              </div>

              {/* Highway Dashes underneath */}
              <div className="w-full mt-2 flex justify-between px-1">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="w-6 h-0.5 bg-[#FF7A1A]/40 rounded-full" />
                ))}
              </div>
            </div>

            {/* Status caption */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-6 text-xs text-slate-400 font-medium tracking-wider uppercase text-center"
            >
              Direct-to-Carrier Freight Network
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
