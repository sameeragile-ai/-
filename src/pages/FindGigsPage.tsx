import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  SlidersHorizontal, 
  LayoutGrid, 
  List, 
  X, 
  RotateCcw, 
  ShieldCheck, 
  Truck, 
  DollarSign, 
  MapPin, 
  Calendar,
  Heart
} from 'lucide-react';
import { GIGS } from '../data/gigs.ts';
import { Gig, GigType, EquipmentType } from '../data/types.ts';
import { GigCard } from '../components/GigCard.tsx';
import { useApp } from '../context/AppContext.tsx';

export const FindGigsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { savedGigs } = useApp();

  const isSavedViewParam = searchParams.get('view') === 'saved';

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState(searchParams.get('pickup') || searchParams.get('q') || '');
  const [selectedGigTypes, setSelectedGigTypes] = useState<GigType[]>(() => {
    const typeParam = searchParams.get('type');
    return typeParam ? [typeParam as GigType] : [];
  });
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentType[]>(() => {
    const eqParam = searchParams.get('equipment');
    return eqParam ? [eqParam as EquipmentType] : [];
  });
  const [minPay, setMinPay] = useState<number>(0);
  const [maxDistance, setMaxDistance] = useState<number>(1000);
  const [selectedCdl, setSelectedCdl] = useState<string>('all');
  const [selectedEndorsements, setSelectedEndorsements] = useState<string[]>([]);
  const [selectedUrgency, setSelectedUrgency] = useState<string>(searchParams.get('urgency') || 'all');
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'highest_pay' | 'rate_per_mile' | 'nearest_date' | 'newest'>('newest');

  // Layout view: grid or list
  const [layoutView, setLayoutView] = useState<'grid' | 'list'>('grid');

  // Mobile filter sheet toggle
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Simulated 400ms shimmer loading when filters change
  const [isLoading, setIsLoading] = useState(false);

  const gigTypesList: GigType[] = [
    'Trailer Move',
    'Point A→B',
    'Drop & Hook',
    'Yard Move',
    'Hotshot',
    'Team Run'
  ];

  const equipmentList: EquipmentType[] = [
    'Dry Van',
    'Reefer',
    'Flatbed',
    'Step Deck',
    'Power Only'
  ];

  const endorsementsList = [
    'Hazmat',
    'Tanker',
    'TWIC Card',
    'Doubles/Triples',
    'Flatbed Certified'
  ];

  // Trigger brief shimmer on filter changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 350);
    return () => clearTimeout(timer);
  }, [
    searchQuery,
    selectedGigTypes,
    selectedEquipment,
    minPay,
    maxDistance,
    selectedCdl,
    selectedEndorsements,
    selectedUrgency,
    verifiedOnly,
    sortBy,
    isSavedViewParam
  ]);

  // Lock body scroll when mobile filter is open
  useEffect(() => {
    if (isMobileFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileFilterOpen]);

  const toggleGigType = (type: GigType) => {
    setSelectedGigTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleEquipment = (eq: EquipmentType) => {
    setSelectedEquipment((prev) =>
      prev.includes(eq) ? prev.filter((e) => e !== eq) : [...prev, eq]
    );
  };

  const toggleEndorsement = (end: string) => {
    setSelectedEndorsements((prev) =>
      prev.includes(end) ? prev.filter((e) => e !== end) : [...prev, end]
    );
  };

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedGigTypes([]);
    setSelectedEquipment([]);
    setMinPay(0);
    setMaxDistance(1000);
    setSelectedCdl('all');
    setSelectedEndorsements([]);
    setSelectedUrgency('all');
    setVerifiedOnly(false);
    setSearchParams({});
  };

  // Filter and sort computation
  const filteredGigs = useMemo(() => {
    let result = [...GIGS];

    // Saved view filter
    if (isSavedViewParam) {
      result = result.filter((g) => savedGigs.includes(g.id));
    }

    // Keyword Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (g) =>
          g.title.toLowerCase().includes(q) ||
          g.pickup.city.toLowerCase().includes(q) ||
          g.pickup.state.toLowerCase().includes(q) ||
          g.dropoff.city.toLowerCase().includes(q) ||
          g.dropoff.state.toLowerCase().includes(q) ||
          g.company.name.toLowerCase().includes(q) ||
          g.equipment.toLowerCase().includes(q) ||
          g.gigType.toLowerCase().includes(q)
      );
    }

    // Gig Types
    if (selectedGigTypes.length > 0) {
      result = result.filter((g) => selectedGigTypes.includes(g.gigType));
    }

    // Equipment
    if (selectedEquipment.length > 0) {
      result = result.filter((g) => selectedEquipment.includes(g.equipment));
    }

    // Min Pay
    if (minPay > 0) {
      result = result.filter((g) => g.pay >= minPay);
    }

    // Max Distance
    if (maxDistance < 1000) {
      result = result.filter((g) => g.miles <= maxDistance);
    }

    // CDL Class
    if (selectedCdl !== 'all') {
      result = result.filter((g) => g.requirements.cdlClass === selectedCdl);
    }

    // Endorsements
    if (selectedEndorsements.length > 0) {
      result = result.filter((g) =>
        selectedEndorsements.every((req) =>
          g.requirements.endorsements.some((e) =>
            e.toLowerCase().includes(req.toLowerCase())
          )
        )
      );
    }

    // Urgency
    if (selectedUrgency !== 'all') {
      result = result.filter((g) => g.urgencyTag === selectedUrgency);
    }

    // Verified Only
    if (verifiedOnly) {
      result = result.filter((g) => g.company.verified);
    }

    // Sorting
    if (sortBy === 'highest_pay') {
      result.sort((a, b) => b.pay - a.pay);
    } else if (sortBy === 'rate_per_mile') {
      result.sort((a, b) => b.ratePerMile - a.ratePerMile);
    } else if (sortBy === 'nearest_date') {
      result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (sortBy === 'newest') {
      // Natural order in GIGS array or ID
      result.sort((a, b) => parseInt(a.id.replace('gig-', '')) - parseInt(b.id.replace('gig-', '')));
    }

    return result;
  }, [
    searchQuery,
    selectedGigTypes,
    selectedEquipment,
    minPay,
    maxDistance,
    selectedCdl,
    selectedEndorsements,
    selectedUrgency,
    verifiedOnly,
    sortBy,
    isSavedViewParam,
    savedGigs
  ]);

  const activeFilterCount =
    (searchQuery ? 1 : 0) +
    selectedGigTypes.length +
    selectedEquipment.length +
    (minPay > 0 ? 1 : 0) +
    (maxDistance < 1000 ? 1 : 0) +
    (selectedCdl !== 'all' ? 1 : 0) +
    selectedEndorsements.length +
    (selectedUrgency !== 'all' ? 1 : 0) +
    (verifiedOnly ? 1 : 0);

  // Filter Sidebar Content (used in both desktop sidebar & mobile drawer)
  const renderFilterSidebar = () => (
    <div className="space-y-6 text-xs">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <span className="font-display font-bold text-sm text-white">Filters</span>
        {activeFilterCount > 0 && (
          <button
            onClick={resetAllFilters}
            className="text-[#FF7A1A] hover:underline flex items-center gap-1 text-[11px]"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset ({activeFilterCount})</span>
          </button>
        )}
      </div>

      {/* Verified Only Toggle */}
      <div className="p-3 rounded-xl bg-[#111A2E] border border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#2DD4BF]" />
          <div>
            <span className="font-semibold text-white block">FMCSA Verified Only</span>
            <span className="text-[10px] text-slate-400">Validated USDOT carriers</span>
          </div>
        </div>
        <input
          type="checkbox"
          checked={verifiedOnly}
          onChange={(e) => setVerifiedOnly(e.target.checked)}
          className="w-4 h-4 rounded accent-[#FF7A1A] cursor-pointer"
        />
      </div>

      {/* Urgency Selector */}
      <div>
        <label className="font-semibold text-slate-300 block mb-2">Departure Window</label>
        <div className="grid grid-cols-2 gap-1.5">
          {['all', 'Urgent', 'Today', 'This Week'].map((u) => (
            <button
              key={u}
              type="button"
              onClick={() => setSelectedUrgency(u)}
              className={`py-1.5 px-2.5 rounded-lg text-center transition-all ${
                selectedUrgency === u
                  ? 'bg-[#FF7A1A] text-white font-bold shadow-sm'
                  : 'bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              {u === 'all' ? 'All Windows' : u}
            </button>
          ))}
        </div>
      </div>

      {/* Gig Type */}
      <div>
        <label className="font-semibold text-slate-300 block mb-2">Gig Category</label>
        <div className="space-y-1.5">
          {gigTypesList.map((type) => (
            <label
              key={type}
              className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] hover:bg-white/5 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedGigTypes.includes(type)}
                  onChange={() => toggleGigType(type)}
                  className="rounded accent-[#FF7A1A]"
                />
                <span className="text-slate-300">{type}</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">
                {GIGS.filter((g) => g.gigType === type).length}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Equipment Type */}
      <div>
        <label className="font-semibold text-slate-300 block mb-2">Equipment Type</label>
        <div className="space-y-1.5">
          {equipmentList.map((eq) => (
            <label
              key={eq}
              className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] hover:bg-white/5 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedEquipment.includes(eq)}
                  onChange={() => toggleEquipment(eq)}
                  className="rounded accent-[#FF7A1A]"
                />
                <span className="text-slate-300">{eq}</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">
                {GIGS.filter((g) => g.equipment === eq).length}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Minimum Pay Slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="font-semibold text-slate-300">Min Flat Pay</label>
          <span className="font-mono text-[#FFB547] font-bold">
            {minPay === 0 ? 'Any Pay' : `$${minPay.toLocaleString()}+`}
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={1800}
          step={50}
          value={minPay}
          onChange={(e) => setMinPay(Number(e.target.value))}
          className="w-full accent-[#FF7A1A] cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-500 mt-1">
          <span>$0</span>
          <span>$900</span>
          <span>$1,800+</span>
        </div>
      </div>

      {/* Max Distance Slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="font-semibold text-slate-300">Max Distance</label>
          <span className="font-mono text-[#2DD4BF] font-bold">
            {maxDistance >= 1000 ? 'Any Miles' : `< ${maxDistance} mi`}
          </span>
        </div>
        <input
          type="range"
          min={50}
          max={1000}
          step={50}
          value={maxDistance}
          onChange={(e) => setMaxDistance(Number(e.target.value))}
          className="w-full accent-[#2DD4BF] cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-500 mt-1">
          <span>50 mi</span>
          <span>500 mi</span>
          <span>1,000+ mi</span>
        </div>
      </div>

      {/* CDL Class */}
      <div>
        <label className="font-semibold text-slate-300 block mb-2">License Requirement</label>
        <div className="grid grid-cols-3 gap-1.5">
          {['all', 'CDL-A', 'CDL-B'].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setSelectedCdl(c)}
              className={`py-1.5 px-2 rounded-lg text-center transition-all ${
                selectedCdl === c
                  ? 'bg-slate-700 text-white font-bold'
                  : 'bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              {c === 'all' ? 'All' : c}
            </button>
          ))}
        </div>
      </div>

      {/* Endorsements */}
      <div>
        <label className="font-semibold text-slate-300 block mb-2">Driver Endorsements</label>
        <div className="space-y-1.5">
          {endorsementsList.map((end) => (
            <label
              key={end}
              className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white/5 cursor-pointer text-slate-300"
            >
              <input
                type="checkbox"
                checked={selectedEndorsements.includes(end)}
                onChange={() => toggleEndorsement(end)}
                className="rounded accent-[#FF7A1A]"
              />
              <span>{end}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0B1220] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="font-display font-bold text-2xl sm:text-3xl text-white">
                {isSavedViewParam ? 'My Saved Gigs' : 'Trucking Gig Board'}
              </h1>
              {isSavedViewParam && (
                <span className="p-1 rounded bg-[#FF7A1A]/10 text-[#FF7A1A]">
                  <Heart className="w-4 h-4 fill-[#FF7A1A]" />
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400">
              {isSavedViewParam
                ? `Showing ${filteredGigs.length} bookmarked runs in your account`
                : 'Direct-to-carrier trailer moves, local yard shunts, and cross-state linehauls.'}
            </p>
          </div>

          {/* Quick Direct badge */}
          <div className="self-start sm:self-auto px-3 py-1.5 rounded-xl bg-[#111A2E] border border-white/5 flex items-center gap-2 text-xs text-slate-300">
            <ShieldCheck className="w-4 h-4 text-[#2DD4BF]" />
            <span>Direct Settlement · 0% Platform Fee</span>
          </div>
        </div>

        {/* Top Control Bar: Search input, Sort by, View Toggle, Mobile Filter Trigger */}
        <div className="p-4 rounded-2xl bg-[#16213A] border border-white/10 mb-8 shadow-md">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search pickup city, state, carrier name, or equipment (e.g. Dallas, Reefer)..."
                className="w-full pl-10 pr-8 py-2 rounded-xl bg-[#0B1220] border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-[#FF7A1A]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort & View Controls */}
            <div className="flex items-center gap-2.5 justify-between md:justify-end">
              {/* Mobile Filter Sheet Button */}
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold flex items-center gap-1.5"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#FF7A1A]" />
                <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
              </button>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-slate-400 hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-[#0B1220] border border-white/10 text-white text-xs focus:outline-none focus:border-[#FF7A1A]"
                >
                  <option value="newest">Newest Posted</option>
                  <option value="highest_pay">Highest Flat Pay</option>
                  <option value="rate_per_mile">Highest $/Mile</option>
                  <option value="nearest_date">Nearest Departure</option>
                </select>
              </div>

              {/* Grid / List View Toggle */}
              <div className="p-1 rounded-xl bg-[#0B1220] border border-white/10 hidden sm:flex items-center gap-1">
                <button
                  onClick={() => setLayoutView('grid')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    layoutView === 'grid' ? 'bg-[#16213A] text-white shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                  aria-label="Grid layout"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setLayoutView('list')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    layoutView === 'list' ? 'bg-[#16213A] text-white shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                  aria-label="List layout"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Active filter pills row */}
          {activeFilterCount > 0 && (
            <div className="mt-3 pt-3 border-t border-white/5 flex items-center gap-2 flex-wrap text-xs text-slate-300">
              <span className="text-slate-500 text-[11px]">Active:</span>
              {selectedGigTypes.map((t) => (
                <button
                  key={t}
                  onClick={() => toggleGigType(t)}
                  className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 hover:border-red-400/40 flex items-center gap-1 text-[11px]"
                >
                  <span>{t}</span>
                  <X className="w-3 h-3 text-slate-400" />
                </button>
              ))}
              {selectedEquipment.map((e) => (
                <button
                  key={e}
                  onClick={() => toggleEquipment(e)}
                  className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 hover:border-red-400/40 flex items-center gap-1 text-[11px]"
                >
                  <span>{e}</span>
                  <X className="w-3 h-3 text-slate-400" />
                </button>
              ))}
              {minPay > 0 && (
                <button
                  onClick={() => setMinPay(0)}
                  className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 hover:border-red-400/40 flex items-center gap-1 text-[11px]"
                >
                  <span>&gt; ${minPay}</span>
                  <X className="w-3 h-3 text-slate-400" />
                </button>
              )}
              {selectedUrgency !== 'all' && (
                <button
                  onClick={() => setSelectedUrgency('all')}
                  className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 hover:border-red-400/40 flex items-center gap-1 text-[11px]"
                >
                  <span>{selectedUrgency}</span>
                  <X className="w-3 h-3 text-slate-400" />
                </button>
              )}
              <button
                onClick={resetAllFilters}
                className="text-xs text-[#FF7A1A] hover:underline ml-2"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Main Grid: Left Filter Sidebar (Desktop) + Right Results */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-1 p-5 rounded-2xl bg-[#16213A] border border-white/10 sticky top-28">
            {renderFilterSidebar()}
          </div>

          {/* Right Results Grid */}
          <div className="lg:col-span-3">
            {/* Results count banner */}
            <div className="flex items-center justify-between mb-4 text-xs text-slate-400">
              <span>
                Showing <strong className="text-white font-mono">{filteredGigs.length}</strong> available gigs
              </span>
              <span className="hidden sm:inline">
                Click <strong className="text-white">+ Add to Cart</strong> to queue runs
              </span>
            </div>

            {/* Shimmer loading or Results */}
            {isLoading ? (
              <div className={layoutView === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-5' : 'space-y-4'}>
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-64 rounded-2xl shimmer-card border border-white/5" />
                ))}
              </div>
            ) : filteredGigs.length === 0 ? (
              /* Empty State */
              <div className="p-12 text-center rounded-2xl bg-[#16213A] border border-white/10">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 mx-auto mb-4">
                  <Truck className="w-8 h-8 opacity-60" />
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-2">
                  No Gigs Found Matching Your Criteria
                </h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto mb-6 leading-relaxed">
                  We couldn't find any hauls matching your active filter combinations. Try loosening the distance slider, removing equipment filters, or searching a broader metropolitan area.
                </p>
                <button
                  onClick={resetAllFilters}
                  className="px-5 py-2.5 rounded-xl gradient-amber text-white font-bold text-xs shadow-md shadow-[#FF7A1A]/20"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <motion.div
                layout
                className={
                  layoutView === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 gap-5'
                    : 'space-y-4'
                }
              >
                <AnimatePresence>
                  {filteredGigs.map((gig) => (
                    <GigCard key={gig.id} gig={gig} layout={layoutView} />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Bottom-Sheet Drawer */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setIsMobileFilterOpen(false)}
            />

            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="absolute inset-x-0 bottom-0 max-h-[85vh] bg-[#0B1220] border-t border-white/15 rounded-t-3xl p-6 overflow-y-auto flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                  <h3 className="font-display font-bold text-lg text-white">Filter Gigs</h3>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="p-1.5 text-slate-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                {renderFilterSidebar()}
              </div>

              <div className="pt-6 mt-6 border-t border-white/10">
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full py-3.5 rounded-xl gradient-amber text-white font-bold text-xs shadow-lg"
                >
                  Apply Filters ({filteredGigs.length} Gigs)
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
