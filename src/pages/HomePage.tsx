import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Truck, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  ChevronDown, 
  Star, 
  Calendar,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { GIGS } from '../data/gigs.ts';
import { CARRIERS } from '../data/carriers.ts';
import { GigCard } from '../components/GigCard.tsx';
import { StatCounter } from '../components/StatCounter.tsx';
import { SafeImage } from '../components/SafeImage.tsx';
import { CarrierBadge } from '../components/CarrierBadge.tsx';
import { useApp } from '../context/AppContext.tsx';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { setIsAuthModalOpen, setAuthRole } = useApp();

  const [pickupInput, setPickupInput] = useState('');
  const [dropoffInput, setDropoffInput] = useState('');
  const [selectedGigType, setSelectedGigType] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState('');

  const [howItWorksTab, setHowItWorksTab] = useState<'driver' | 'carrier'>('driver');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
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

  const gigCategories = [
    {
      type: 'Trailer Move',
      title: 'Trailer Relocations',
      count: '380+ active',
      desc: 'Empty & loaded 53ft trailer repositioning between terminals and rail ramps.',
      image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80',
      avgPay: '$165 - $450'
    },
    {
      type: 'Point A→B',
      title: 'Point A→B Runs',
      count: '540+ active',
      desc: 'Dedicated point-to-point regional runs with guaranteed flat rate and mileage pay.',
      image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=800&q=80',
      avgPay: '$480 - $1,600'
    },
    {
      type: 'Drop & Hook',
      title: 'Drop & Hook Hauls',
      count: '420+ active',
      desc: 'Pre-loaded trailer hookups with zero waiting on warehouse loading docks.',
      image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32b?auto=format&fit=crop&w=800&q=80',
      avgPay: '$350 - $850'
    },
    {
      type: 'Yard Move',
      title: 'Yard Spotting & Shunts',
      count: '290+ active',
      desc: 'Distribution center jockey shifts, crossdock positioning, and terminal moves.',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
      avgPay: '$85 - $360'
    },
    {
      type: 'Hotshot',
      title: 'Hotshot & Expedited',
      count: '190+ active',
      desc: 'Time-critical machinery, oilfield components, and emergency industrial parts.',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
      avgPay: '$680 - $1,800'
    },
    {
      type: 'Team Run',
      title: 'Team Linehauls',
      count: '110+ active',
      desc: 'Continuous non-stop cross-country linehauls for driving pairs and relays.',
      image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32b?auto=format&fit=crop&w=800&q=80',
      avgPay: '$1,800 - $3,500'
    }
  ];

  const topLanes = [
    { from: 'Dallas, TX', to: 'Fort Worth, TX', miles: 38, avgPay: '$165', time: '1.5 hrs', active: 18 },
    { from: 'Atlanta, GA', to: 'Charlotte, NC', miles: 245, avgPay: '$640', time: '4.2 hrs', active: 14 },
    { from: 'Fresno, CA', to: 'Phoenix, AZ', miles: 590, avgPay: '$1,480', time: '10.5 hrs', active: 11 },
    { from: 'Houston, TX', to: 'New Orleans, LA', miles: 348, avgPay: '$975', time: '6.0 hrs', active: 9 },
    { from: 'Chicago, IL', to: 'Indianapolis, IN', miles: 183, avgPay: '$495', time: '3.2 hrs', active: 16 },
    { from: 'Denver, CO', to: 'Salt Lake City, UT', miles: 520, avgPay: '$1,150', time: '9.0 hrs', active: 7 }
  ];

  const testimonials = [
    {
      quote: "HaulGig filled three empty backhaul days for my Cascadia this month. Grabbed an Atlanta to Charlotte run for $640 and a quick $165 trailer move in Fort Worth. Money was sent straight to my Zelle that evening. Zero broker cut.",
      author: "Marcus Vance",
      title: "CDL-A Owner Operator (12 yrs)",
      location: "Dallas, TX",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
    },
    {
      quote: "When our distribution yards back up, we need qualified power-only drivers right away. With HaulGig, we skip broker phone tag, talk directly to available drivers, and send rate sheets in minutes.",
      author: "Ray Caldwell",
      title: "Lead Dispatcher, Redline Freightways",
      location: "Dallas / Fort Worth, TX",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    },
    {
      quote: "I like that it's just a direct board. You see the carrier's DOT number, see what they're paying, call them directly, and run the load. No percentage taken from your hard work.",
      author: "Sarah Kowalski",
      title: "Reefer & Cold Chain Driver (9 yrs)",
      location: "Fresno, CA",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    }
  ];

  const faqs = [
    {
      question: "How does payment work if HaulGig does not take a middleman fee?",
      answer: "HaulGig operates strictly as an information directory connecting drivers with verified carriers. We never touch your freight money or hold escrow. You and the carrier agree directly on your settlement method (Comchek, Zelle, EFS, direct ACH, or company wire). Carrier settlement terms are transparently shown on every single gig listing before you queue interest."
    },
    {
      question: "What qualifications do drivers need to pick up gigs?",
      answer: "Most listings require a valid CDL-A or CDL-B license, a current DOT Medical Card, and a clean recent driving record. Specific hauls (like port terminals or fuel relocations) may require TWIC, Hazmat (H), or Tanker (N) endorsements, which are clearly tagged on each gig."
    },
    {
      question: "How are trucking companies verified on the platform?",
      answer: "Every carrier is verified against federal FMCSA records. We confirm their registered USDOT number, active operating authority (MC #), public liability insurance, and safety rating before awarding the Verified Carrier checkmark."
    },
    {
      question: "Can I queue multiple gigs in the same week?",
      answer: "Yes! Use the Gig Cart feature to queue multiple hauls along your preferred route. Our system automatically checks your dates and alerts you if any departure windows overlap, helping you plan a profitable continuous circuit."
    },
    {
      question: "How much does it cost for companies to post gigs?",
      answer: "Carriers can post up to 3 gig listings per month completely free. For higher volume fleets, our Pro plan ($49/month) offers unlimited posts with featured placement, and Fleet ($149/month) includes multi-dispatcher team seats."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* ================= HERO SECTION ================= */}
      <section className="pt-28 pb-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Clear Value Prop & Search */}
            <div className="lg:col-span-7 space-y-6">
              {/* Trust Tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                <span>2,400+ Gigs Active This Week · Direct-to-Carrier</span>
              </div>

              {/* Bold, Clean Headline */}
              <h1 className="font-display font-bold text-3xl sm:text-5xl lg:text-5xl text-slate-900 tracking-tight leading-[1.12]">
                Trucking Gigs Without the{' '}
                <span className="text-[#EA580C]">Middleman</span>
              </h1>

              {/* Simple, Human Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
                Verified trucking companies post trailer moves, local yard shunts, and point A-to-B runs. You deal directly, negotiate your rate, and get paid 100% with no dispatcher cut.
              </p>

              {/* Prominent, Simple Search Card */}
              <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 shadow-sm">
                <form onSubmit={handleHeroSearch} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                    {/* Pickup City */}
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">
                        Pickup City
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-emerald-600 absolute left-3 top-3 pointer-events-none" />
                        <input
                          type="text"
                          placeholder="e.g. Dallas, TX"
                          value={pickupInput}
                          onChange={(e) => setPickupInput(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C]"
                        />
                      </div>
                    </div>

                    {/* Destination City */}
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">
                        Destination City
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-[#EA580C] absolute left-3 top-3 pointer-events-none" />
                        <input
                          type="text"
                          placeholder="e.g. Fort Worth, TX"
                          value={dropoffInput}
                          onChange={(e) => setDropoffInput(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C]"
                        />
                      </div>
                    </div>

                    {/* Equipment */}
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">
                        Equipment
                      </label>
                      <select
                        value={selectedEquipment}
                        onChange={(e) => setSelectedEquipment(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-[#EA580C]"
                      >
                        <option value="">All Equipment</option>
                        <option value="Dry Van">Dry Van</option>
                        <option value="Reefer">Reefer</option>
                        <option value="Flatbed">Flatbed</option>
                        <option value="Step Deck">Step Deck</option>
                        <option value="Power Only">Power Only</option>
                      </select>
                    </div>

                    {/* Gig Type */}
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">
                        Gig Type
                      </label>
                      <select
                        value={selectedGigType}
                        onChange={(e) => setSelectedGigType(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-[#EA580C]"
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
                  </div>

                  {/* Search Button */}
                  <button
                    type="submit"
                    className="w-full py-2.5 sm:py-3 px-4 rounded-lg bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                  >
                    <Search className="w-4 h-4 stroke-[2.5]" />
                    <span>Search Available Gigs</span>
                  </button>
                </form>
              </div>

              {/* Direct CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                <Link
                  to="/gigs"
                  className="py-2.5 px-6 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs text-center transition-colors"
                >
                  Browse All Gigs (Drivers)
                </Link>
                <Link
                  to="/post"
                  className="py-2.5 px-6 rounded-lg bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-semibold text-xs text-center transition-colors"
                >
                  Post a Gig (Carriers)
                </Link>
              </div>

              {/* Trust Row */}
              <div className="flex items-center gap-3 text-xs text-slate-600 flex-wrap">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>FMCSA Verified Carriers</span>
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>0% Broker Fees</span>
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Direct Carrier Settlement</span>
                </span>
              </div>
            </div>

            {/* Right Column: Clean, Real-World Example Gig Preview */}
            <div className="lg:col-span-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500 px-1">
                  <span>LIVE FREIGHT RUN PREVIEW</span>
                  <span className="text-emerald-700 font-medium">Updated 18m ago</span>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-md space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-orange-50 text-orange-800 border border-orange-200 uppercase">
                        TODAY · URGENT
                      </span>
                      <span className="text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                        Trailer Move · Dry Van
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-500 uppercase block font-medium">Flat Pay</span>
                      <span className="font-display font-bold text-2xl text-slate-900">$165</span>
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-lg text-slate-900">
                    Dallas to Fort Worth Intermodal Relocation
                  </h3>

                  {/* Route Visual */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                        <div>
                          <p className="font-bold text-slate-900">Dallas, TX</p>
                          <p className="text-[11px] text-slate-500">DFW Logistics Hub, Gate 4</p>
                        </div>
                      </div>

                      <div className="text-center font-mono text-[11px] text-slate-500">
                        <span>38 mi</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#EA580C] mx-auto" />
                        <span className="text-emerald-700 font-semibold">$4.34/mi</span>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <p className="font-bold text-slate-900">Fort Worth, TX</p>
                          <MapPin className="w-3.5 h-3.5 text-[#EA580C]" />
                        </div>
                        <p className="text-[11px] text-slate-500">Alliance Intermodal Ramp</p>
                      </div>
                    </div>
                  </div>

                  {/* Carrier Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                    <div className="flex items-center gap-2">
                      <CarrierBadge initials="RF" gradient={['#EA580C', '#C2410C']} size="sm" />
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="font-bold text-slate-900">Redline Freightways</span>
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        </div>
                        <p className="text-[11px] text-slate-500">USDOT #3189402 · ★ 4.95</p>
                      </div>
                    </div>

                    <Link
                      to="/gigs/gig-1"
                      className="px-3.5 py-1.5 rounded-lg bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-xs shadow-xs"
                    >
                      View Run Details
                    </Link>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 text-center">
                  Direct phone numbers and rate confirmation sheets provided for every gig.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS STRIP ================= */}
      <section className="bg-slate-100/70 border-b border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="space-y-0.5">
              <p className="font-display font-bold text-2xl sm:text-3xl text-slate-900">
                <StatCounter end={12800} suffix="+" />
              </p>
              <p className="text-xs font-semibold text-slate-500">Active CDL Drivers</p>
            </div>

            <div className="space-y-0.5">
              <p className="font-display font-bold text-2xl sm:text-3xl text-slate-900">
                <StatCounter end={1150} suffix="+" />
              </p>
              <p className="text-xs font-semibold text-slate-500">Verified Carriers</p>
            </div>

            <div className="space-y-0.5">
              <p className="font-display font-bold text-2xl sm:text-3xl text-slate-900">
                <StatCounter end={48} suffix=" States" />
              </p>
              <p className="text-xs font-semibold text-slate-500">National Coverage</p>
            </div>

            <div className="space-y-0.5">
              <p className="font-display font-bold text-2xl sm:text-3xl text-emerald-700">
                <StatCounter end={3100000} prefix="$" suffix="+" />
              </p>
              <p className="text-xs font-semibold text-slate-500">Paid Directly to Drivers</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BROWSE BY GIG TYPE ================= */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-[#EA580C] uppercase tracking-wider block mb-1">
              Freight Categories
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900">
              Browse by Gig Type
            </h2>
          </div>
          <Link
            to="/gigs"
            className="text-xs font-bold text-[#EA580C] hover:underline flex items-center gap-1"
          >
            <span>View all 24+ available gigs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {gigCategories.map((cat) => (
            <Link
              key={cat.type}
              to={`/gigs?type=${encodeURIComponent(cat.type)}`}
              className="group p-5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                    {cat.count}
                  </span>
                  <span className="font-mono text-slate-500 text-xs">
                    Avg: {cat.avgPay}
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg text-slate-900 group-hover:text-[#EA580C] transition-colors flex items-center justify-between mb-2">
                  <span>{cat.title}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-800 transition-transform group-hover:translate-x-0.5" />
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {cat.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= FEATURED URGENT GIGS ================= */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold text-[#EA580C] uppercase tracking-wider block mb-1">
                Immediate Departure
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900">
                Featured Urgent Runs
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Carriers requiring same-day pickup. Highest $/mile rates.
              </p>
            </div>

            <Link
              to="/gigs?urgency=Urgent"
              className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs flex items-center gap-1.5 transition-colors self-start sm:self-auto"
            >
              <span>View All Urgent</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {urgentGigs.map((gig) => (
              <GigCard key={gig.id} gig={gig} layout="grid" />
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section id="how-it-works" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
            Simple 3-Step Process
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 mb-3">
            How HaulGig Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            No broker deductions. Direct communication between qualified drivers and verified carriers.
          </p>

          {/* Toggle */}
          <div className="mt-5 inline-flex p-1 rounded-lg bg-slate-200/80 border border-slate-300">
            <button
              onClick={() => setHowItWorksTab('driver')}
              className={`py-1.5 px-4 rounded-md text-xs font-bold transition-all ${
                howItWorksTab === 'driver'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              For CDL Drivers
            </button>
            <button
              onClick={() => setHowItWorksTab('carrier')}
              className={`py-1.5 px-4 rounded-md text-xs font-bold transition-all ${
                howItWorksTab === 'carrier'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              For Trucking Companies
            </button>
          </div>
        </div>

        {howItWorksTab === 'driver' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-white border border-slate-200 space-y-3">
              <span className="w-8 h-8 rounded-lg bg-orange-100 text-[#EA580C] font-display font-bold text-sm flex items-center justify-center">
                1
              </span>
              <h3 className="font-display font-bold text-base text-slate-900">
                Browse & Queue Gigs
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Filter by equipment type, pickup location, and date. Queue multiple runs in your Gig Cart with automatic schedule overlap checks.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-slate-200 space-y-3">
              <span className="w-8 h-8 rounded-lg bg-orange-100 text-[#EA580C] font-display font-bold text-sm flex items-center justify-center">
                2
              </span>
              <h3 className="font-display font-bold text-base text-slate-900">
                Direct Dispatch Call
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Call the carrier dispatch directly or submit interest in one tap. Speak with dispatch to verify tractor specs, arrival ETA, and sign rate sheet.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-slate-200 space-y-3">
              <span className="w-8 h-8 rounded-lg bg-orange-100 text-[#EA580C] font-display font-bold text-sm flex items-center justify-center">
                3
              </span>
              <h3 className="font-display font-bold text-base text-slate-900">
                Haul & Get Paid Same-Day
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Complete the run, send proof of delivery (BOL), and get 100% of your payout via Comchek, Zelle, or direct ACH wire from the carrier.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-white border border-slate-200 space-y-3">
              <span className="w-8 h-8 rounded-lg bg-slate-100 text-slate-900 font-display font-bold text-sm flex items-center justify-center">
                1
              </span>
              <h3 className="font-display font-bold text-base text-slate-900">
                Post Trailer Moves & Runs
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                List trailer relocations, overflow crossdock relays, or urgent hotshot loads in under 2 minutes. Free initial tier available.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-slate-200 space-y-3">
              <span className="w-8 h-8 rounded-lg bg-slate-100 text-slate-900 font-display font-bold text-sm flex items-center justify-center">
                2
              </span>
              <h3 className="font-display font-bold text-base text-slate-900">
                Connect with Qualified Drivers
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Review driver CDL class, experience, endorsements (Hazmat, TWIC), and ratings. Direct phone contact without platform gatekeeping.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-slate-200 space-y-3">
              <span className="w-8 h-8 rounded-lg bg-slate-100 text-slate-900 font-display font-bold text-sm flex items-center justify-center">
                3
              </span>
              <h3 className="font-display font-bold text-base text-slate-900">
                Dispatch on Your Terms
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Issue your standard rate confirmation sheet and settle directly with your preferred carrier payment method (Comchek, ACH, EFS).
              </p>
            </div>
          </div>
        )}
      </section>

      {/* ================= VERIFIED CARRIERS ================= */}
      <section className="py-12 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider text-center mb-6">
            Partnered with 1,150+ FMCSA-Verified Fleets & Carriers
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {CARRIERS.slice(0, 5).map((c) => (
              <div
                key={c.id}
                className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 flex items-center gap-2.5"
              >
                <CarrierBadge initials={c.logoInitials} gradient={c.gradient} size="sm" />
                <div className="min-w-0">
                  <span className="text-xs font-bold text-slate-900 block truncate">{c.name}</span>
                  <span className="text-[10px] text-slate-500">{c.dotNumber}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TOP FREIGHT LANES ================= */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#EA580C] uppercase tracking-wider block mb-1">
            Freight Rates
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900">
            Top Freight Lanes
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Average payouts and active runs on our highest traffic regional corridors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {topLanes.map((lane, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span className="font-mono">{lane.miles} miles</span>
                  <span className="text-emerald-700 font-semibold">{lane.active} active runs</span>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className="font-bold text-base text-slate-900">{lane.from}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="font-bold text-base text-slate-900">{lane.to}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">Avg Flat Pay</span>
                  <span className="font-display font-bold text-lg text-slate-900 tabular-nums">
                    {lane.avgPay}
                  </span>
                </div>

                <Link
                  to={`/gigs?pickup=${encodeURIComponent(lane.from.split(',')[0])}`}
                  className="px-3 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs flex items-center gap-1"
                >
                  <span>View Runs</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1 text-amber-500 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-xs font-bold text-slate-700 ml-1.5">4.96/5 from 3,400+ reviews</span>
          </div>

          <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 mb-6">
            Trusted by American Truckers & Fleets
          </h2>

          <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200">
            <blockquote className="text-base sm:text-lg text-slate-800 leading-relaxed italic mb-6">
              "{testimonials[activeTestimonialIndex].quote}"
            </blockquote>

            <div className="flex items-center justify-center gap-3">
              <SafeImage
                src={testimonials[activeTestimonialIndex].avatar}
                alt={testimonials[activeTestimonialIndex].author}
                className="w-11 h-11 rounded-full object-cover border-2 border-slate-300"
              />
              <div className="text-left">
                <p className="font-bold text-sm text-slate-900">
                  {testimonials[activeTestimonialIndex].author}
                </p>
                <p className="text-xs text-slate-500">
                  {testimonials[activeTestimonialIndex].title} · {testimonials[activeTestimonialIndex].location}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-1.5 mt-5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonialIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    activeTestimonialIndex === i ? 'w-6 bg-[#EA580C]' : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= PRICING ================= */}
      <section id="pricing" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#EA580C] uppercase tracking-wider block mb-1">
            Carrier Plans
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900">
            Simple Pricing for Companies
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Drivers always use HaulGig 100% free with zero commission cut. Fleets choose the post volume they need.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch max-w-5xl mx-auto">
          {/* Free */}
          <div className="p-6 rounded-xl bg-white border border-slate-200 flex flex-col justify-between">
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900">Free Tier</h3>
              <p className="text-xs text-slate-500 mb-3">For local fleets with occasional runs.</p>
              <div className="flex items-baseline gap-1 mb-5">
                <span className="font-display font-bold text-3xl text-slate-900">$0</span>
                <span className="text-xs text-slate-500">/month</span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>3 active gig posts / month</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Basic FMCSA verification</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Direct phone driver inquiries</span>
                </li>
              </ul>
            </div>

            <Link
              to="/post"
              className="mt-6 w-full py-2.5 rounded-lg border border-slate-300 text-slate-800 font-semibold text-xs text-center hover:bg-slate-50 transition-colors block"
            >
              Get Started Free
            </Link>
          </div>

          {/* Pro */}
          <div className="p-6 rounded-xl bg-white border-2 border-[#EA580C] flex flex-col justify-between shadow-sm relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#EA580C] text-white text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
              Most Popular
            </div>

            <div>
              <h3 className="font-display font-bold text-lg text-slate-900">Pro Carrier</h3>
              <p className="text-xs text-slate-500 mb-3">For active fleets posting weekly runs.</p>
              <div className="flex items-baseline gap-1 mb-5">
                <span className="font-display font-bold text-3xl text-slate-900">$49</span>
                <span className="text-xs text-slate-500">/month</span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#EA580C] shrink-0" />
                  <span className="font-semibold text-slate-900">Unlimited gig posts</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#EA580C] shrink-0" />
                  <span className="font-semibold text-slate-900">Featured search placement</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#EA580C] shrink-0" />
                  <span>Urgent push alerts to drivers</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#EA580C] shrink-0" />
                  <span>0% per-hire fee</span>
                </li>
              </ul>
            </div>

            <Link
              to="/post"
              className="mt-6 w-full py-2.5 rounded-lg bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-xs text-center shadow-xs transition-colors block"
            >
              Start Pro
            </Link>
          </div>

          {/* Fleet */}
          <div className="p-6 rounded-xl bg-white border border-slate-200 flex flex-col justify-between">
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900">Fleet Enterprise</h3>
              <p className="text-xs text-slate-500 mb-3">For multi-terminal regional fleets.</p>
              <div className="flex items-baseline gap-1 mb-5">
                <span className="font-display font-bold text-3xl text-slate-900">$149</span>
                <span className="text-xs text-slate-500">/month</span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Unlimited multi-terminal posts</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>10 dispatcher team seats</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Custom TMS integration</span>
                </li>
              </ul>
            </div>

            <Link
              to="/post"
              className="mt-6 w-full py-2.5 rounded-lg border border-slate-300 text-slate-800 font-semibold text-xs text-center hover:bg-slate-50 transition-colors block"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-slate-200 bg-slate-50/50 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 font-semibold text-sm text-slate-900"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                      openFaqIndex === idx ? 'rotate-180 text-[#EA580C]' : ''
                    }`}
                  />
                </button>

                {openFaqIndex === idx && (
                  <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-14 bg-slate-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-5">
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-white">
            Find Your Next Trucking Gig Today
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Direct connections. No broker cut. 100% of your earnings go straight to your pocket.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/gigs"
              className="w-full sm:w-auto py-2.5 px-6 rounded-lg bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-xs shadow-sm"
            >
              Browse Open Gigs
            </Link>
            <Link
              to="/post"
              className="w-full sm:w-auto py-2.5 px-6 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-xs"
            >
              Post a Gig (Carriers)
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
