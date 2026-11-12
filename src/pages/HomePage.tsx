import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Search, 
  MapPin, 
  Truck, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  ChevronDown, 
  Star, 
  Zap, 
  Calendar,
  Layers,
  ArrowUpRight,
  TrendingUp,
  Clock,
  PhoneCall
} from 'lucide-react';
import { GIGS } from '../data/gigs.ts';
import { CARRIERS } from '../data/carriers.ts';
import { DRIVERS } from '../data/drivers.ts';
import { GigCard } from '../components/GigCard.tsx';
import { StatCounter } from '../components/StatCounter.tsx';
import { SafeImage } from '../components/SafeImage.tsx';
import { CarrierBadge } from '../components/CarrierBadge.tsx';
import { useApp } from '../context/AppContext.tsx';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { setIsAuthModalOpen, setAuthRole } = useApp();

  // Search Bar State in Hero
  const [pickupInput, setPickupInput] = useState('');
  const [dropoffInput, setDropoffInput] = useState('');
  const [selectedGigType, setSelectedGigType] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState('');

  // How It Works Tab
  const [howItWorksTab, setHowItWorksTab] = useState<'driver' | 'carrier'>('driver');

  // FAQ open item
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Testimonial index
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (pickupInput) params.set('pickup', pickupInput);
    if (dropoffInput) params.set('dropoff', dropoffInput);
    if (selectedGigType) params.set('type', selectedGigType);
    if (selectedEquipment) params.set('equipment', selectedEquipment);
    navigate(`/gigs?${params.toString()}`);
  };

  const urgentGigs = GIGS.filter((g) => g.urgencyTag === 'Urgent' || g.urgencyTag === 'Today').slice(0, 6);

  // Gig categories tiles
  const gigCategories = [
    {
      type: 'Trailer Move',
      title: 'Trailer Relocations',
      count: '380+ active',
      desc: 'Empty & loaded 53ft repositioning between terminals and rail intermodals.',
      image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80',
      avgPay: '$180 - $450'
    },
    {
      type: 'Point A→B',
      title: 'Point A→B Deliveries',
      count: '540+ active',
      desc: 'Dedicated point-to-point runs with guaranteed flat rate and mileage pay.',
      image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=800&q=80',
      avgPay: '$480 - $1,600'
    },
    {
      type: 'Drop & Hook',
      title: 'Drop & Hook Runs',
      count: '420+ active',
      desc: 'Preloaded trailer hookups with zero wait time at loading docks.',
      image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32b?auto=format&fit=crop&w=800&q=80',
      avgPay: '$350 - $850'
    },
    {
      type: 'Yard Move',
      title: 'Yard Spotting & Shunts',
      count: '290+ active',
      desc: 'Terminal hostling, cross-dock trailer jockeying, and hourly shift spotting.',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
      avgPay: '$85 - $400'
    },
    {
      type: 'Hotshot',
      title: 'Hotshot & Expedited',
      count: '190+ active',
      desc: 'Emergency machinery, oilfield components, and high-dollar expedited freight.',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
      avgPay: '$650 - $1,800'
    },
    {
      type: 'Team Run',
      title: 'Expedited Team Hauls',
      count: '110+ active',
      desc: 'Continuous non-stop coast-to-coast linehauls for pairs and relay teams.',
      image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32b?auto=format&fit=crop&w=800&q=80',
      avgPay: '$1,800 - $3,500'
    }
  ];

  // Top lanes
  const topLanes = [
    { from: 'Dallas, TX', to: 'Fort Worth, TX', miles: 38, avgPay: '$165', time: '1.5 hrs', active: 18 },
    { from: 'Atlanta, GA', to: 'Charlotte, NC', miles: 245, avgPay: '$640', time: '4.2 hrs', active: 14 },
    { from: 'Fresno, CA', to: 'Phoenix, AZ', miles: 590, avgPay: '$1,480', time: '10.5 hrs', active: 11 },
    { from: 'Houston, TX', to: 'New Orleans, LA', miles: 348, avgPay: '$975', time: '6.0 hrs', active: 9 },
    { from: 'Chicago, IL', to: 'Indianapolis, IN', miles: 183, avgPay: '$495', time: '3.2 hrs', active: 16 },
    { from: 'Denver, CO', to: 'Salt Lake City, UT', miles: 520, avgPay: '$1,150', time: '9.0 hrs', active: 7 }
  ];

  // Testimonials
  const testimonials = [
    {
      quote: "HaulGig filled three deadhead days on my Cascadia this month. Grabbed a $640 Atlanta to Charlotte run and a quick $165 trailer shunt in Fort Worth. Money hit my account the same evening via direct wire.",
      author: "Marcus Vance",
      title: "CDL-A Owner Operator (12 yrs)",
      location: "Dallas, TX",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
      rating: 5
    },
    {
      quote: "When rail intermodals back up, we need qualified power-only drivers within 45 minutes. With HaulGig, we skip broker markups, talk straight to local drivers, and get trailers spotted without losing hours on phone trees.",
      author: "Ray Caldwell",
      title: "Lead Dispatcher, Redline Freightways",
      location: "Dallas / Fort Worth, TX",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      rating: 5
    },
    {
      quote: "I love the zero-middleman model. On other load boards, brokers take 20-30% off the top. Here, I see the carrier's real DOT number, check their safety record, and negotiate my rate directly.",
      author: "Sarah Kowalski",
      title: "Reefer & Cold Chain Driver (9 yrs)",
      location: "Fresno, CA",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      rating: 5
    }
  ];

  // FAQs
  const faqs = [
    {
      question: "How does payment work if HaulGig doesn't take a transaction fee?",
      answer: "HaulGig is strictly an information directory and matchmaking board. We do not touch your freight money or hold escrow. You and the verified carrier agree directly on your settlement method (Comchek, Zelle, EFS, direct ACH, or company wire). Carrier settlement terms are transparently shown on every single gig listing before you queue interest."
    },
    {
      question: "What qualifications do drivers need to pick up gigs?",
      answer: "Most listings require an active Commercial Driver's License (CDL-A or CDL-B), a valid DOT Medical Examiner's Certificate, and a clean recent MVR. Specific hauls (like port intermodal or chemical tank runs) may require TWIC, Hazmat (H), or Tanker (N) endorsements, which are clearly tagged on each gig."
    },
    {
      question: "How are trucking companies verified on the platform?",
      answer: "Every carrier is validated against FMCSA SafeStat records. We verify their registered USDOT number, active operating authority (MC #), minimum $750,000 public liability insurance, and federal safety ratings before awarding the Verified Carrier badge."
    },
    {
      question: "Can I accept multiple gigs for the same week?",
      answer: "Yes! Use the Gig Cart feature to queue multiple hauls along your preferred route. Our system automatically checks your dates and alerts you if any departure windows overlap, helping you plan a profitable continuous circuit."
    },
    {
      question: "How much does it cost for companies to post gigs?",
      answer: "Carriers can post up to 3 gig listings per month completely free. For higher volume fleets, our Pro plan ($49/month) offers unlimited posts with featured placement, and Fleet ($149/month) includes multi-dispatcher seats and priority driver alerts."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0B1220]">
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[92vh] flex items-center pt-24 pb-16 overflow-hidden">
        {/* Background Image with Ken Burns Zoom & Scrim */}
        <div className="absolute inset-0 z-0 overflow-hidden select-none">
          <motion.div
            animate={{ scale: [1, 1.08] }}
            transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            className="w-full h-full"
          >
            <SafeImage
              src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1920&q=80"
              alt="Semi-truck on highway at dusk"
              className="w-full h-full object-cover object-center brightness-75"
            />
          </motion.div>

          {/* Deep Navy Gradient Overlays: darker on left for crisp readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1220] via-[#0B1220]/90 to-[#0B1220]/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-transparent to-[#0B1220]/70" />

          {/* Subtle animated highway light streak lines */}
          <div className="absolute bottom-0 left-0 right-0 h-40 opacity-30 pointer-events-none">
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#FF7A1A] to-transparent translate-y-12" />
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#2DD4BF] to-transparent translate-y-24" />
          </div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Hero Text & Search */}
            <div className="lg:col-span-7 space-y-6">
              {/* Eyebrow Pill */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md"
              >
                <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
                <span className="text-xs font-semibold text-slate-200">
                  2,400+ gigs posted this week across 48 states
                </span>
              </motion.div>

              {/* Staggered Word Reveal Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08] text-balance"
              >
                Move Freight. Get Paid.{' '}
                <span className="gradient-text-amber block sm:inline">
                  On Your Schedule.
                </span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed"
              >
                The gig board built for truckers. Verified carriers post trailer moves, local hauls and A-to-B runs, and you deal directly. No dispatcher cut.
              </motion.p>

              {/* Search Bar Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="p-4 sm:p-5 rounded-2xl glass-panel shadow-2xl shadow-black/60"
              >
                <form onSubmit={handleHeroSearch} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                    {/* Pickup City */}
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                        Pickup City
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-[#2DD4BF] absolute left-3 top-3 pointer-events-none" />
                        <input
                          type="text"
                          placeholder="e.g. Dallas, TX"
                          value={pickupInput}
                          onChange={(e) => setPickupInput(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#0B1220]/80 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-[#FF7A1A]"
                        />
                      </div>
                    </div>

                    {/* Drop-off City */}
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                        Drop-off City
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-[#FF7A1A] absolute left-3 top-3 pointer-events-none" />
                        <input
                          type="text"
                          placeholder="e.g. Fort Worth, TX"
                          value={dropoffInput}
                          onChange={(e) => setDropoffInput(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#0B1220]/80 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-[#FF7A1A]"
                        />
                      </div>
                    </div>

                    {/* Gig Type */}
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                        Gig Type
                      </label>
                      <select
                        value={selectedGigType}
                        onChange={(e) => setSelectedGigType(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#0B1220]/80 border border-white/10 text-white text-xs focus:outline-none focus:border-[#FF7A1A]"
                      >
                        <option value="">All Gig Types</option>
                        <option value="Trailer Move">Trailer Move</option>
                        <option value="Point A→B">Point A→B</option>
                        <option value="Drop & Hook">Drop & Hook</option>
                        <option value="Yard Move">Yard Move</option>
                        <option value="Hotshot">Hotshot</option>
                        <option value="Team Run">Team Run</option>
                      </select>
                    </div>

                    {/* Equipment */}
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                        Equipment
                      </label>
                      <select
                        value={selectedEquipment}
                        onChange={(e) => setSelectedEquipment(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#0B1220]/80 border border-white/10 text-white text-xs focus:outline-none focus:border-[#FF7A1A]"
                      >
                        <option value="">All Equipment</option>
                        <option value="Dry Van">Dry Van</option>
                        <option value="Reefer">Reefer</option>
                        <option value="Flatbed">Flatbed</option>
                        <option value="Step Deck">Step Deck</option>
                        <option value="Power Only">Power Only</option>
                      </select>
                    </div>
                  </div>

                  {/* Find Gigs Submit Button */}
                  <button
                    type="submit"
                    className="shine-hover w-full py-3.5 px-4 rounded-xl gradient-amber text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#FF7A1A]/30 transition-transform active:scale-95"
                  >
                    <Search className="w-4 h-4 stroke-[2.5]" />
                    <span>Find Gigs Now</span>
                  </button>
                </form>
              </motion.div>

              {/* CTAs and Trust row */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  to="/gigs"
                  className="shine-hover py-3 px-6 rounded-xl gradient-amber text-white font-bold text-sm text-center shadow-md shadow-[#FF7A1A]/20"
                >
                  I'm a Driver (Browse Gigs)
                </Link>

                <Link
                  to="/post"
                  className="py-3 px-6 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-semibold text-sm text-center transition-colors"
                >
                  I'm Hiring Drivers (Post Free)
                </Link>
              </div>

              {/* Trust statement */}
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-[#2DD4BF] shrink-0" />
                <span>FMCSA-verified carriers · CDL-checked drivers · 0% platform fees</span>
              </div>
            </div>

            {/* Right Column: Floating Live Gig Cards Preview Stack (Desktop Parallax) */}
            <div className="hidden lg:block lg:col-span-5 relative">
              <div className="relative w-full max-w-md mx-auto h-[480px]">
                {/* Background Ambient Glow */}
                <div className="absolute inset-0 bg-[#FF7A1A]/10 rounded-3xl blur-3xl" />

                {/* Card 3: Deepest back */}
                <motion.div
                  initial={{ rotate: -6, y: 30, opacity: 0 }}
                  animate={{ rotate: -6, y: 0, opacity: 0.6 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="absolute inset-x-4 top-16 p-4 rounded-2xl bg-[#111A2E]/90 border border-white/5 shadow-xl"
                >
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span>Houston, TX → New Orleans, LA</span>
                    <span className="font-bold text-white">$975</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full" />
                </motion.div>

                {/* Card 2: Mid stack */}
                <motion.div
                  initial={{ rotate: 4, y: 40, opacity: 0 }}
                  animate={{ rotate: 4, y: 15, opacity: 0.85 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="absolute inset-x-2 top-8 p-5 rounded-2xl bg-[#16213A] border border-white/10 shadow-xl"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-[#2DD4BF] bg-[#2DD4BF]/10 px-2 py-0.5 rounded">
                      TODAY · REEFER
                    </span>
                    <span className="font-display font-bold text-xl text-white">$1,480</span>
                  </div>
                  <p className="font-display font-bold text-sm text-white mb-2">
                    Fresno, CA → Phoenix, AZ Cold Storage
                  </p>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>590 miles · $2.51/mi</span>
                    <span className="text-[#2DD4BF]">Verified Carrier</span>
                  </div>
                </motion.div>

                {/* Card 1: Front Marquee Card */}
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="absolute inset-x-0 top-0 p-6 rounded-2xl bg-[#16213A] border border-[#FF7A1A]/40 shadow-2xl shadow-black/80"
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-[#FF7A1A] bg-[#FF7A1A]/10 px-2.5 py-0.5 rounded-md border border-[#FF7A1A]/30 uppercase flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A1A] animate-pulse" />
                        Urgent Run
                      </span>
                      <span className="text-[11px] text-slate-300 bg-white/5 px-2 py-0.5 rounded-md border border-white/5">
                        Trailer Move
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block uppercase">Flat Pay</span>
                      <span className="font-display font-bold text-2xl text-white tabular-nums">$165</span>
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-lg text-white mb-3">
                    Dallas to Fort Worth Intermodal Relocation
                  </h3>

                  {/* Route Visual */}
                  <div className="p-3 rounded-xl bg-[#111A2E] border border-white/5 mb-4">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-200">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#2DD4BF]" />
                        <span>Dallas, TX</span>
                      </div>
                      <div className="flex items-center gap-1 font-mono text-[11px] text-slate-400">
                        <span>38 mi</span>
                        <ArrowRight className="w-3 h-3 text-[#FF7A1A]" />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span>Fort Worth, TX</span>
                        <MapPin className="w-3.5 h-3.5 text-[#FF7A1A]" />
                      </div>
                    </div>
                  </div>

                  {/* Carrier info */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
                    <div className="flex items-center gap-2">
                      <CarrierBadge initials="RF" gradient={['#FF7A1A', '#E5481F']} size="sm" />
                      <div>
                        <p className="font-semibold text-white">Redline Freightways</p>
                        <p className="text-[11px] text-slate-400">USDOT #3189402 · ★ 4.95</p>
                      </div>
                    </div>
                    <Link
                      to="/gigs/gig-1"
                      className="px-3 py-1.5 rounded-lg gradient-amber text-white font-bold text-xs shadow-sm hover:brightness-110"
                    >
                      View Run
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS STRIP ================= */}
      <section className="border-y border-white/10 bg-[#111A2E]/90 py-8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div className="space-y-1">
              <p className="font-display font-bold text-2xl sm:text-3xl text-white">
                <StatCounter end={12800} suffix="+" />
              </p>
              <p className="text-xs font-medium text-slate-400">Active CDL Drivers</p>
            </div>

            <div className="space-y-1">
              <p className="font-display font-bold text-2xl sm:text-3xl text-white">
                <StatCounter end={1150} suffix="+" />
              </p>
              <p className="text-xs font-medium text-slate-400">Verified Carriers</p>
            </div>

            <div className="space-y-1">
              <p className="font-display font-bold text-2xl sm:text-3xl text-white">
                <StatCounter end={48} suffix=" States" />
              </p>
              <p className="text-xs font-medium text-slate-400">Interstate Coverage</p>
            </div>

            <div className="space-y-1">
              <p className="font-display font-bold text-2xl sm:text-3xl text-[#2DD4BF]">
                <StatCounter end={3100000} prefix="$" suffix="+" />
              </p>
              <p className="text-xs font-medium text-slate-400">Paid Directly to Drivers</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BROWSE BY GIG TYPE ================= */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold text-[#FF7A1A] uppercase tracking-wider block mb-2">
              Tailored Freight Categories
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-4xl text-white">
              Browse by Gig Type
            </h2>
          </div>
          <Link
            to="/gigs"
            className="text-xs font-bold text-[#FFB547] hover:underline flex items-center gap-1"
          >
            <span>View all 24+ available gigs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gigCategories.map((cat) => (
            <Link
              key={cat.type}
              to={`/gigs?type=${encodeURIComponent(cat.type)}`}
              className="group relative rounded-2xl overflow-hidden bg-[#16213A] border border-white/10 hover:border-[#FF7A1A]/40 transition-all duration-300 shadow-lg hover:shadow-2xl flex flex-col justify-end p-6 min-h-[220px]"
            >
              {/* Background with Zoom */}
              <div className="absolute inset-0 z-0">
                <SafeImage
                  src={cat.image}
                  alt={cat.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-106 brightness-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-[#0B1220]/70 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#2DD4BF] bg-[#2DD4BF]/15 px-2.5 py-0.5 rounded-full border border-[#2DD4BF]/20">
                    {cat.count}
                  </span>
                  <span className="font-mono text-slate-300 text-[11px]">
                    Avg: {cat.avgPay}
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl text-white group-hover:text-[#FFB547] transition-colors flex items-center justify-between">
                  <span>{cat.title}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-transform group-hover:translate-x-1" />
                </h3>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {cat.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= ROAD MOTIF DIVIDER ================= */}
      <div className="road-divider my-2 opacity-50" />

      {/* ================= FEATURED URGENT GIGS ================= */}
      <section className="py-18 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FF7A1A] uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-[#FF7A1A] animate-ping" />
              <span>Priority Departure</span>
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-4xl text-white">
              Featured Urgent Gigs
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Carriers requiring immediate dispatch or same-day departure. Highest $/mile rates.
            </p>
          </div>

          <Link
            to="/gigs?urgency=Urgent"
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors self-start sm:self-auto"
          >
            <span>Filter Urgent Gigs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Carousel on Mobile, Grid on Desktop */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x snap-mandatory">
          {urgentGigs.map((gig) => (
            <div key={gig.id} className="min-w-[85vw] sm:min-w-[340px] md:min-w-0 snap-center">
              <GigCard gig={gig} layout="grid" />
            </div>
          ))}
        </div>
      </section>

      {/* ================= HOW IT WORKS (DRIVERS / COMPANIES) ================= */}
      <section id="how-it-works" className="py-20 bg-[#111A2E]/60 border-y border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#2DD4BF] uppercase tracking-wider block mb-2">
              Direct-to-Carrier Workflow
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-4xl text-white mb-4">
              How HaulGig Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              No middleman broker cut. No hidden escrow fees. Just direct communication between qualified drivers and verified carriers.
            </p>

            {/* Toggle Tabs */}
            <div className="mt-6 inline-flex p-1 rounded-xl bg-[#0B1220] border border-white/10">
              <button
                onClick={() => setHowItWorksTab('driver')}
                className={`py-2 px-5 rounded-lg text-xs font-bold transition-all ${
                  howItWorksTab === 'driver'
                    ? 'gradient-amber text-white shadow-md shadow-[#FF7A1A]/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                For CDL Drivers
              </button>
              <button
                onClick={() => setHowItWorksTab('carrier')}
                className={`py-2 px-5 rounded-lg text-xs font-bold transition-all ${
                  howItWorksTab === 'carrier'
                    ? 'gradient-teal text-white shadow-md shadow-[#2DD4BF]/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                For Trucking Companies
              </button>
            </div>
          </div>

          {/* Steps Grid with Road Lane Connector */}
          <div className="relative">
            {/* Subtle connecting road line behind on desktop */}
            <div className="hidden md:block absolute top-1/2 left-10 right-10 h-0.5 road-divider-subtle -translate-y-8" />

            {howItWorksTab === 'driver' ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                {/* Step 1 */}
                <div className="p-6 rounded-2xl bg-[#16213A] border border-white/10 space-y-4">
                  <div className="w-12 h-12 rounded-xl gradient-amber flex items-center justify-center font-display font-bold text-lg text-white shadow-lg shadow-[#FF7A1A]/20">
                    01
                  </div>
                  <h3 className="font-display font-bold text-lg text-white">
                    Find Runs & Add to Gig Cart
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Filter by equipment (Dry Van, Reefer, Flatbed), pickup location, and date. Queue multiple hauls in your Gig Cart without schedule conflicts.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="p-6 rounded-2xl bg-[#16213A] border border-white/10 space-y-4">
                  <div className="w-12 h-12 rounded-xl gradient-amber flex items-center justify-center font-display font-bold text-lg text-white shadow-lg shadow-[#FF7A1A]/20">
                    02
                  </div>
                  <h3 className="font-display font-bold text-lg text-white">
                    Connect Directly with Dispatch
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Submit interest in one tap. The verified carrier's dispatch calls or texts you directly to confirm tractor specs, arrival ETA, and sign rate confirmation.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="p-6 rounded-2xl bg-[#16213A] border border-white/10 space-y-4">
                  <div className="w-12 h-12 rounded-xl gradient-amber flex items-center justify-center font-display font-bold text-lg text-white shadow-lg shadow-[#FF7A1A]/20">
                    03
                  </div>
                  <h3 className="font-display font-bold text-lg text-white">
                    Hook Up & Get Settled Same-Day
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Complete the move, upload delivery BOL, and get 100% of your payout via Comchek, Zelle, or direct ACH wire directly from the carrier. Zero platform fees deducted.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                {/* Carrier Step 1 */}
                <div className="p-6 rounded-2xl bg-[#16213A] border border-white/10 space-y-4">
                  <div className="w-12 h-12 rounded-xl gradient-teal flex items-center justify-center font-display font-bold text-lg text-white shadow-lg shadow-[#2DD4BF]/20">
                    01
                  </div>
                  <h3 className="font-display font-bold text-lg text-white">
                    Post Trailer Moves & Hauls
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    List trailer repositions, overflow crossdock relays, or urgent hotshot loads in under 2 minutes. Free initial tier available.
                  </p>
                </div>

                {/* Carrier Step 2 */}
                <div className="p-6 rounded-2xl bg-[#16213A] border border-white/10 space-y-4">
                  <div className="w-12 h-12 rounded-xl gradient-teal flex items-center justify-center font-display font-bold text-lg text-white shadow-lg shadow-[#2DD4BF]/20">
                    02
                  </div>
                  <h3 className="font-display font-bold text-lg text-white">
                    Receive Qualified CDL Inquiries
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Review driver endorsements (Hazmat, Tanker, TWIC), home base, and past ratings. Speak directly with available drivers ready to roll.
                  </p>
                </div>

                {/* Carrier Step 3 */}
                <div className="p-6 rounded-2xl bg-[#16213A] border border-white/10 space-y-4">
                  <div className="w-12 h-12 rounded-xl gradient-teal flex items-center justify-center font-display font-bold text-lg text-white shadow-lg shadow-[#2DD4BF]/20">
                    03
                  </div>
                  <h3 className="font-display font-bold text-lg text-white">
                    Dispatch & Settle on Your Terms
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Issue your standard company rate confirmation sheet. Settle directly via your preferred fleet payment system (EFS, Comchek, ACH).
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================= VERIFIED CARRIER MARQUEE ================= */}
      <section className="py-14 border-b border-white/10 bg-[#0B1220] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
            Trusted by 1,150+ Verified Fleets & Carriers
          </p>
        </div>

        {/* Marquee Row */}
        <div className="flex gap-8 overflow-hidden select-none py-2">
          <div className="flex gap-8 shrink-0 animate-[marquee_30s_linear_infinite]">
            {CARRIERS.map((c) => (
              <div
                key={c.id}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#111A2E] border border-white/5 hover:border-white/15 transition-colors shrink-0"
              >
                <CarrierBadge initials={c.logoInitials} gradient={c.gradient} size="sm" />
                <div>
                  <span className="text-xs font-bold text-white block">{c.name}</span>
                  <span className="text-[10px] text-slate-400">{c.dotNumber}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-8 shrink-0 animate-[marquee_30s_linear_infinite]" aria-hidden="true">
            {CARRIERS.map((c) => (
              <div
                key={`clone-${c.id}`}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#111A2E] border border-white/5 hover:border-white/15 transition-colors shrink-0"
              >
                <CarrierBadge initials={c.logoInitials} gradient={c.gradient} size="sm" />
                <div>
                  <span className="text-xs font-bold text-white block">{c.name}</span>
                  <span className="text-[10px] text-slate-400">{c.dotNumber}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TOP FREIGHT LANES ================= */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#FF7A1A] uppercase tracking-wider block mb-2">
            High Velocity Corridors
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-white">
            Top Freight Lanes
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2">
            Average payout and active gig count on our highest traffic regional hauls.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {topLanes.map((lane, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#16213A] border border-white/5 hover:border-[#FF7A1A]/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <span className="font-mono">{lane.miles} miles</span>
                  <span className="text-[#2DD4BF] font-semibold">{lane.active} active runs</span>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <div className="font-display font-bold text-base text-white">
                    {lane.from}
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#FF7A1A] shrink-0" />
                  <div className="font-display font-bold text-base text-white">
                    {lane.to}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">Avg Flat Payout</span>
                  <span className="font-display font-bold text-lg text-white tabular-nums">
                    {lane.avgPay}
                  </span>
                </div>

                <Link
                  to={`/gigs?pickup=${encodeURIComponent(lane.from.split(',')[0])}`}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white font-semibold text-xs flex items-center gap-1 transition-colors"
                >
                  <span>View Lane</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= TESTIMONIALS SLIDER ================= */}
      <section className="py-20 bg-[#111A2E]/70 border-y border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1.5 text-amber-400 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400" />
            ))}
            <span className="text-xs font-bold text-white ml-2">4.96 out of 5 from 3,400+ reviews</span>
          </div>

          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mb-8">
            Built for Truckers, Trusted by Fleets
          </h2>

          <div className="p-8 rounded-2xl bg-[#16213A] border border-white/10 shadow-2xl relative">
            <blockquote className="text-base sm:text-xl text-slate-200 font-medium leading-relaxed italic mb-6">
              "{testimonials[activeTestimonialIndex].quote}"
            </blockquote>

            <div className="flex items-center justify-center gap-3">
              <SafeImage
                src={testimonials[activeTestimonialIndex].avatar}
                alt={testimonials[activeTestimonialIndex].author}
                className="w-12 h-12 rounded-full object-cover border-2 border-[#FF7A1A]"
              />
              <div className="text-left">
                <p className="font-display font-bold text-sm text-white">
                  {testimonials[activeTestimonialIndex].author}
                </p>
                <p className="text-xs text-slate-400">
                  {testimonials[activeTestimonialIndex].title} · {testimonials[activeTestimonialIndex].location}
                </p>
              </div>
            </div>

            {/* Testimonial Selectors */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonialIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    activeTestimonialIndex === i ? 'w-8 gradient-amber' : 'bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Show testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= PRICING FOR COMPANIES ================= */}
      <section id="pricing" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#FF7A1A] uppercase tracking-wider block mb-2">
            Transparent Carrier Plans
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-white">
            Pricing for Companies
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2">
            Drivers always use HaulGig 100% free with zero commission cut. Fleets choose the post volume that fits their dispatch rhythm.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Plan 1: Free */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#16213A] border border-white/10 flex flex-col justify-between">
            <div>
              <h3 className="font-display font-bold text-xl text-white mb-1">Free Tier</h3>
              <p className="text-xs text-slate-400 mb-4">For local carriers with occasional overflow runs.</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="font-display font-bold text-4xl text-white">$0</span>
                <span className="text-xs text-slate-400">/month</span>
              </div>

              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                  <span>3 active gig posts per month</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                  <span>Basic FMCSA verification badge</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                  <span>Direct phone & email driver inquiries</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                  <span>Standard listing search ranking</span>
                </li>
              </ul>
            </div>

            <Link
              to="/post"
              className="mt-8 w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-semibold text-xs text-center transition-colors block"
            >
              Get Started Free
            </Link>
          </div>

          {/* Plan 2: Pro (Featured with Gradient Border) */}
          <div className="relative p-6 sm:p-8 rounded-2xl bg-[#16213A] border-2 border-[#FF7A1A] flex flex-col justify-between shadow-2xl shadow-[#FF7A1A]/10">
            {/* Most popular badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-amber text-white text-[11px] font-bold px-3 py-0.5 rounded-full shadow-md uppercase tracking-wide">
              Most Popular
            </div>

            <div>
              <h3 className="font-display font-bold text-xl text-white mb-1">Pro Carrier</h3>
              <p className="text-xs text-slate-400 mb-4">For active regional fleets posting weekly hauls.</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="font-display font-bold text-4xl text-white">$49</span>
                <span className="text-xs text-slate-400">/month</span>
              </div>

              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF7A1A] shrink-0" />
                  <span className="font-semibold text-white">Unlimited gig posts</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF7A1A] shrink-0" />
                  <span className="font-semibold text-white">Featured placement in search</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF7A1A] shrink-0" />
                  <span>Urgent push alert to matching drivers</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF7A1A] shrink-0" />
                  <span>Priority carrier profile page</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF7A1A] shrink-0" />
                  <span>Zero per-hire transaction fees</span>
                </li>
              </ul>
            </div>

            <Link
              to="/post"
              className="shine-hover mt-8 w-full py-3.5 rounded-xl gradient-amber text-white font-bold text-xs text-center shadow-lg shadow-[#FF7A1A]/30 block"
            >
              Start Pro Subscription
            </Link>
          </div>

          {/* Plan 3: Fleet */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#16213A] border border-white/10 flex flex-col justify-between">
            <div>
              <h3 className="font-display font-bold text-xl text-white mb-1">Fleet Enterprise</h3>
              <p className="text-xs text-slate-400 mb-4">For large multi-terminal logistics operators.</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="font-display font-bold text-4xl text-white">$149</span>
                <span className="text-xs text-slate-400">/month</span>
              </div>

              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2DD4BF] shrink-0" />
                  <span>Unlimited multi-terminal gig posts</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2DD4BF] shrink-0" />
                  <span>Up to 10 dispatcher team seats</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2DD4BF] shrink-0" />
                  <span>Custom TMS / dispatch API integration</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2DD4BF] shrink-0" />
                  <span>Dedicated freight account representative</span>
                </li>
              </ul>
            </div>

            <Link
              to="/post"
              className="mt-8 w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-semibold text-xs text-center transition-colors block"
            >
              Contact Fleet Sales
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FAQ ACCORDION ================= */}
      <section className="py-20 bg-[#111A2E]/50 border-t border-white/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-[#FF7A1A] uppercase tracking-wider block mb-2">
              Got Questions?
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-[#16213A] border border-white/5 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={openFaqIndex === idx}
                >
                  <span className="font-display font-semibold text-sm sm:text-base text-white">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      openFaqIndex === idx ? 'rotate-180 text-[#FF7A1A]' : ''
                    }`}
                  />
                </button>

                {openFaqIndex === idx && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-white/5 pt-3"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA BAND ================= */}
      <section className="py-16 gradient-amber relative overflow-hidden select-none">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white space-y-6 relative z-10">
          <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight text-white">
            Ready to Take Control of Your Hauls?
          </h2>
          <p className="text-base sm:text-lg text-white/90 max-w-xl mx-auto font-medium">
            Join thousands of CDL truckers moving local trailer shunts, point A-to-B runs, and high-dollar hotshots directly with verified carriers.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/gigs"
              className="w-full sm:w-auto py-3.5 px-8 rounded-xl bg-[#0B1220] hover:bg-[#111A2E] text-white font-bold text-sm shadow-xl transition-all active:scale-95 text-center"
            >
              Browse Open Gigs
            </Link>
            <Link
              to="/post"
              className="w-full sm:w-auto py-3.5 px-8 rounded-xl bg-white/20 hover:bg-white/30 border border-white/30 text-white font-bold text-sm transition-all text-center"
            >
              Post a Gig (Carriers)
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
