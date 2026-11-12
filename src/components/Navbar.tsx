import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Bookmark, Menu, X, ArrowUpRight, ShieldCheck, Truck } from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';

export const Navbar: React.FC = () => {
  const { cart, savedGigs, setIsCartOpen, setIsAuthModalOpen, setAuthRole } = useApp();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Monitor scroll for shrink, smart hide/show, and progress bar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (currentScrollY / docHeight) * 100 : 0;
      setScrollProgress(progress);

      // Shrink threshold
      setIsScrolled(currentScrollY > 40);

      // Smart navbar logic: always show if near top (<120px)
      if (currentScrollY <= 120) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 10) {
        // Fast scroll down -> hide
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY && lastScrollY - currentScrollY > 6) {
        // Scroll up -> reveal
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Find Gigs', path: '/gigs' },
    { name: 'For Companies', path: '/post' },
    { name: 'How It Works', path: '/#how-it-works' },
    { name: 'Verified Carriers', path: '/carriers' },
    { name: 'Pricing', path: '/#pricing' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isScrolled
            ? 'h-16 bg-[#0B1220]/80 backdrop-blur-xl border-b border-white/[0.08] shadow-lg shadow-black/40'
            : 'h-20 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 text-white group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A1A] rounded-lg"
          >
            <div className="w-9 h-9 rounded-xl gradient-amber flex items-center justify-center shadow-md shadow-[#FF7A1A]/20 transition-transform duration-300 group-hover:scale-105">
              <Truck className="w-5 h-5 text-white stroke-[2.2]" />
            </div>
            <div className="flex items-baseline">
              <span className="font-display font-bold text-xl sm:text-2xl tracking-tight text-white">
                Haul<span className="gradient-text-amber">Gig</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive =
                link.path === '/'
                  ? location.pathname === '/' && !location.hash
                  : link.path.startsWith('/#')
                  ? location.hash === link.path.slice(1)
                  : location.pathname.startsWith(link.path);

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-3.5 py-2 text-sm font-medium transition-colors whitespace-nowrap rounded-lg ${
                    isActive ? 'text-white' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="navActiveIndicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 gradient-amber rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Zone */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Saved gigs link */}
            <Link
              to="/gigs?view=saved"
              className="relative p-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors hidden sm:flex items-center justify-center"
              title="Saved Gigs"
              aria-label="Saved Gigs"
            >
              <Bookmark className="w-5 h-5" />
              {savedGigs.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-slate-700 text-[10px] font-bold text-white rounded-full flex items-center justify-center border border-[#0B1220]">
                  {savedGigs.length}
                </span>
              )}
            </Link>

            {/* Gig Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 sm:px-3 sm:py-2 text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-200 flex items-center gap-2 border border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A1A]"
              aria-label={`View Gig Cart, ${cart.length} items`}
            >
              <ShoppingBag className="w-5 h-5 text-[#FFB547]" />
              <span className="text-xs font-semibold hidden md:inline">Gig Cart</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={cart.length}
                  initial={{ scale: 0.6 }}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 0.3 }}
                  className={`px-1.5 py-0.5 text-xs font-bold rounded-full ${
                    cart.length > 0
                      ? 'bg-[#FF7A1A] text-white shadow-sm shadow-[#FF7A1A]/40'
                      : 'bg-slate-700 text-slate-300'
                  }`}
                >
                  {cart.length}
                </motion.span>
              </AnimatePresence>
            </button>

            {/* Sign In ghost button */}
            <button
              onClick={() => {
                setAuthRole('driver');
                setIsAuthModalOpen(true);
              }}
              className="hidden sm:inline-flex text-xs font-semibold text-slate-200 hover:text-white px-3.5 py-2 rounded-xl transition-colors hover:bg-white/5"
            >
              Sign In
            </button>

            {/* Post a Gig gradient button */}
            <Link
              to="/post"
              className="shine-hover inline-flex items-center gap-1.5 text-xs font-bold text-white px-4 py-2.5 rounded-xl gradient-amber shadow-md shadow-[#FF7A1A]/20 transition-all duration-200 hover:shadow-lg hover:shadow-[#FF7A1A]/30 active:scale-95 whitespace-nowrap"
            >
              <span>Post a Gig</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-200 hover:text-white hover:bg-white/10 rounded-xl transition-colors ml-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A1A]"
              aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Scroll Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5 overflow-hidden">
          <div
            className="h-full gradient-amber transition-all duration-75 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </header>

      {/* Mobile Drawer Navigation (<1024px) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden bg-black/60 backdrop-blur-md"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 bottom-0 w-[85%] max-w-sm bg-[#0B1220] border-l border-white/10 p-6 flex flex-col justify-between overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg gradient-amber flex items-center justify-center">
                      <Truck className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-display font-bold text-lg text-white">
                      Haul<span className="gradient-text-amber">Gig</span>
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5"
                    aria-label="Close Drawer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="mt-4 py-2 px-3 rounded-lg bg-[#111A2E] border border-white/5 flex items-center gap-2 text-xs text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-[#2DD4BF] shrink-0" />
                  <span>Direct-to-carrier · 0% middleman fees</span>
                </div>

                {/* Staggered Navigation links */}
                <nav className="mt-6 flex flex-col gap-1.5">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="px-4 py-3 rounded-xl text-base font-medium text-slate-200 hover:text-white hover:bg-[#16213A] transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                  <Link
                    to="/gigs?view=saved"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-3 rounded-xl text-base font-medium text-slate-200 hover:text-white hover:bg-[#16213A] flex items-center justify-between transition-colors"
                  >
                    <span>Saved Gigs</span>
                    {savedGigs.length > 0 && (
                      <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-slate-700 text-white">
                        {savedGigs.length}
                      </span>
                    )}
                  </Link>
                </nav>
              </div>

              {/* Mobile CTA Drawer Footer */}
              <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsCartOpen(true);
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-[#16213A] hover:bg-[#1D2A4A] border border-white/10 text-white font-semibold text-sm flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-[#FFB547]" />
                    <span>View Gig Cart</span>
                  </span>
                  <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-[#FF7A1A] text-white">
                    {cart.length}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setAuthRole('driver');
                    setIsAuthModalOpen(true);
                  }}
                  className="w-full py-3 px-4 rounded-xl border border-white/15 text-slate-200 font-semibold text-sm hover:bg-white/5 transition-colors"
                >
                  Driver / Carrier Sign In
                </button>

                <Link
                  to="/post"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-3 px-4 rounded-xl gradient-amber text-white font-bold text-sm text-center shadow-md shadow-[#FF7A1A]/20"
                >
                  Post a Gig (For Carriers)
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
