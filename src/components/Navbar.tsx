import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Bookmark, Menu, X, ArrowUpRight, ShieldCheck, Truck } from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';

export const Navbar: React.FC = () => {
  const { cart, savedGigs, setIsCartOpen, setIsAuthModalOpen, setAuthRole } = useApp();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Find Gigs', path: '/gigs' },
    { name: 'For Carriers', path: '/post' },
    { name: 'How It Works', path: '/#how-it-works' },
    { name: 'Verified Carriers', path: '/carriers' },
    { name: 'Pricing', path: '/#pricing' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 bg-white ${
          isScrolled
            ? 'h-16 shadow-sm border-b border-slate-200/80'
            : 'h-18 border-b border-slate-200'
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 text-[#0F172A] group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-lg bg-[#0F172A] flex items-center justify-center shadow-sm">
              <Truck className="w-5 h-5 text-[#F97316]" />
            </div>
            <span className="font-display font-bold text-xl sm:text-2xl tracking-tight text-[#0F172A]">
              Haul<span className="text-[#EA580C]">Gig</span>
            </span>
          </Link>

          {/* Center Navigation Links */}
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
                  className={`px-3.5 py-1.5 text-sm font-semibold rounded-md transition-colors ${
                    isActive
                      ? 'text-[#EA580C] bg-orange-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Zone */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Direct disclaimer badge */}
            <span className="hidden xl:inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded-md">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Direct-to-Carrier · 0% Fee</span>
            </span>

            {/* Saved gigs link */}
            <Link
              to="/gigs?view=saved"
              className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors hidden sm:flex items-center justify-center"
              title="Saved Gigs"
              aria-label="Saved Gigs"
            >
              <Bookmark className="w-5 h-5" />
              {savedGigs.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#EA580C] text-[10px] font-bold text-white rounded-full flex items-center justify-center">
                  {savedGigs.length}
                </span>
              )}
            </Link>

            {/* Gig Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative px-3 py-2 text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors flex items-center gap-2 text-xs font-semibold"
              aria-label={`View Gig Cart, ${cart.length} items`}
            >
              <ShoppingBag className="w-4 h-4 text-slate-600" />
              <span className="hidden md:inline">Gig Cart</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-xs font-bold ${
                  cart.length > 0
                    ? 'bg-[#EA580C] text-white'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {cart.length}
              </span>
            </button>

            {/* Sign In button */}
            <button
              onClick={() => {
                setAuthRole('driver');
                setIsAuthModalOpen(true);
              }}
              className="hidden sm:inline-flex text-xs font-semibold text-slate-700 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Sign In
            </button>

            {/* Post a Gig button */}
            <Link
              to="/post"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white px-3.5 py-2 sm:px-4 sm:py-2 rounded-lg bg-[#EA580C] hover:bg-[#C2410C] shadow-sm transition-colors active:scale-98 whitespace-nowrap"
            >
              <span>Post a Gig</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white border-l border-slate-200 p-6 flex flex-col justify-between overflow-y-auto">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#0F172A] flex items-center justify-center">
                      <Truck className="w-4 h-4 text-[#F97316]" />
                    </div>
                    <span className="font-display font-bold text-lg text-slate-900">
                      Haul<span className="text-[#EA580C]">Gig</span>
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center gap-2 text-xs font-medium text-emerald-800 mb-4">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Direct-to-carrier · 0% middleman fees</span>
                </div>

                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                    >
                      {link.name}
                    </Link>
                  ))}
                  <Link
                    to="/gigs?view=saved"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 flex items-center justify-between"
                  >
                    <span>Saved Gigs</span>
                    {savedGigs.length > 0 && (
                      <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-[#EA580C] text-white">
                        {savedGigs.length}
                      </span>
                    )}
                  </Link>
                </nav>
              </div>

              <div className="pt-6 border-t border-slate-100 flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsCartOpen(true);
                  }}
                  className="w-full py-2.5 px-4 rounded-lg bg-slate-100 text-slate-800 font-semibold text-xs flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-slate-600" />
                    <span>View Gig Cart</span>
                  </span>
                  <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-[#EA580C] text-white">
                    {cart.length}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setAuthRole('driver');
                    setIsAuthModalOpen(true);
                  }}
                  className="w-full py-2.5 px-4 rounded-lg border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50"
                >
                  Sign In
                </button>

                <Link
                  to="/post"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-2.5 px-4 rounded-lg bg-[#EA580C] text-white font-bold text-xs text-center shadow-sm"
                >
                  Post a Gig (Carriers)
                </Link>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
