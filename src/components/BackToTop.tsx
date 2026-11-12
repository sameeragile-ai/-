import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShow(window.scrollY > 600);
    };
    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-40 p-3 rounded-full bg-[#16213A]/90 hover:bg-[#1D2A4A] border border-white/15 text-white shadow-xl shadow-black/50 backdrop-blur-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A1A]"
          aria-label="Back to top of page"
        >
          <ArrowUp className="w-5 h-5 text-[#FFB547]" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
