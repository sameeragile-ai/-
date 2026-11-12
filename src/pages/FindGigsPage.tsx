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
  Heart
} from 'lucide-react';
import { GIGS } from '../data/gigs.ts';
import { GigType, EquipmentType } from '../data/types.ts';
import { GigCard } from '../components/GigCard.tsx';
import { useApp } from '../context/AppContext.tsx';

export const FindGigsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { savedGigs } = useApp();

  const isSavedViewParam = searchParams.get('view') === 'saved';

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

  const [layoutView, setLayoutView] = useState<'grid' | 'list'>('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
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

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200);
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

  const filteredGigs = useMemo(() => {
    let result = [...GIGS];

    if (isSavedViewParam) {
      result = result.filter((g) => savedGigs.includes(g.id));
    }

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

    if (selectedGigTypes.length > 0) {
      result = result.filter((g) => selectedGigTypes.includes(g.gigType));
    }

    if (selectedEquipment.length > 0) {
      result = result.filter((g) => selectedEquipment.includes(g.equipment));
    }

    if (minPay > 0) {
      result = result.filter((g) => g.pay >= minPay);
    }

    if (maxDistance < 1000) {
      result = result.filter((g) => g.miles <= maxDistance);
    }

    if (selectedCdl !== 'all') {
      result = result.filter((g) => g.requirements.cdlClass === selectedCdl);
    }

    if (selectedEndorsements.length > 0) {
      result = result.filter((g) =>
        selectedEndorsements.every((req) =>
          g.requirements.endorsements.some((e) =>
            e.toLowerCase().includes(req.toLowerCase())
          )
        )
      );
    }

    if (selectedUrgency !== 'all') {
      result = result.filter((g) => g.urgencyTag === selectedUrgency);
    }

    if (verifiedOnly) {
      result = result.filter((g) => g.company.verified);
    }

    if (sortBy === 'highest_pay') {
      result.sort((a, b) => b.pay - a.pay);
    } else if (sortBy === 'rate_per_mile') {
      result.sort((a, b) => b.ratePerMile - a.ratePerMile);
    } else if (sortBy === 'nearest_date') {
      result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (sortBy === 'newest') {
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

  const renderFilterSidebar = () => (
    <div className="space-y-5 text-xs text-slate-700">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <span className="font-display font-bold text-sm text-slate-900">Filters</span>
        {activeFilterCount > 0 && (
          <button
            onClick={resetAllFilters}
            className="text-[#EA580C] hover:underline flex items-center gap-1 text-[11px] font-semibold"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset ({activeFilterCount})</span>
          </button>
        )}
      </div>

      {/* Verified Only Toggle */}
      <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <div>
            <span className="font-bold text-slate-900 block">FMCSA Verified Only</span>
            <span className="text-[10px] text-slate-500">Government checked carriers</span>
          </div>
        </div>
        <input
          type="checkbox"
          checked={verifiedOnly}
          onChange={(e) => setVerifiedOnly(e.target.checked)}
          className="w-4 h-4 rounded accent-[#EA580C] cursor-pointer"
        />
      </div>

      {/* Urgency */}
      <div>
        <label className="font-bold text-slate-900 block mb-1.5">Departure Window</label>
        <div className="grid grid-cols-2 gap-1.5">
          {['all', 'Urgent', 'Today', 'This Week'].map((u) => (
            <button
              key={u}
              type="button"
              onClick={() => setSelectedUrgency(u)}
              className={`py-1.5 px-2 rounded-md text-center transition-all ${
                selectedUrgency === u
                  ? 'bg-slate-900 text-white font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {u === 'all' ? 'All' : u}
            </button>
          ))}
        </div>
      </div>

      {/* Equipment Type */}
      <div>
        <label className="font-bold text-slate-900 block mb-1.5">Equipment Type</label>
        <div className="space-y-1">
          {equipmentList.map((eq) => (
            <label
              key={eq}
              className="flex items-center justify-between p-1.5 rounded hover:bg-slate-100 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedEquipment.includes(eq)}
                  onChange={() => toggleEquipment(eq)}
                  className="rounded accent-[#EA580C]"
                />
                <span className="text-slate-800">{eq}</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">
                {GIGS.filter((g) => g.equipment === eq).length}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Gig Category */}
      <div>
        <label className="font-bold text-slate-900 block mb-1.5">Gig Category</label>
        <div className="space-y-1">
          {gigTypesList.map((type) => (
            <label
              key={type}
              className="flex items-center justify-between p-1.5 rounded hover:bg-slate-100 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedGigTypes.includes(type)}
                  onChange={() => toggleGigType(type)}
                  className="rounded accent-[#EA580C]"
                />
                <span className="text-slate-800">{type}</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">
                {GIGS.filter((g) => g.gigType === type).length}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Pay Slider */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="font-bold text-slate-900">Min Flat Pay</label>
          <span className="font-mono text-[#EA580C] font-bold">
            {minPay === 0 ? 'Any' : `$${minPay.toLocaleString()}+`}
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={1800}
          step={50}
          value={minPay}
          onChange={(e) => setMinPay(Number(e.target.value))}
          className="w-full accent-[#EA580C] cursor-pointer"
        />
      </div>

      {/* Distance Slider */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="font-bold text-slate-900">Max Distance</label>
          <span className="font-mono text-emerald-700 font-bold">
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
          className="w-full accent-emerald-600 cursor-pointer"
        />
      </div>

      {/* CDL Class */}
      <div>
        <label className="font-bold text-slate-900 block mb-1.5">License</label>
        <div className="grid grid-cols-3 gap-1.5">
          {['all', 'CDL-A', 'CDL-B'].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setSelectedCdl(c)}
              className={`py-1 px-2 rounded text-center transition-all ${
                selectedCdl === c
                  ? 'bg-slate-900 text-white font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {c === 'all' ? 'All' : c}
            </button>
          ))}
        </div>
      </div>

      {/* Endorsements */}
      <div>
        <label className="font-bold text-slate-900 block mb-1.5">Endorsements</label>
        <div className="space-y-1">
          {endorsementsList.map((end) => (
            <label
              key={end}
              className="flex items-center gap-2 p-1 rounded hover:bg-slate-100 cursor-pointer text-slate-700"
            >
              <input
                type="checkbox"
                checked={selectedEndorsements.includes(end)}
                onChange={() => toggleEndorsement(end)}
                className="rounded accent-[#EA580C]"
              />
              <span>{end}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="font-display font-bold text-2xl sm:text-3xl text-slate-900">
                {isSavedViewParam ? 'My Saved Gigs' : 'Trucking Gig Board'}
              </h1>
              {isSavedViewParam && (
                <span className="p-1 rounded bg-orange-100 text-[#EA580C]">
                  <Heart className="w-4 h-4 fill-[#EA580C]" />
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500">
              {isSavedViewParam
                ? `Showing ${filteredGigs.length} saved hauls`
                : 'Direct carrier listings. No middleman deductions.'}
            </p>
          </div>

          <div className="self-start sm:self-auto px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-xs font-semibold text-emerald-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>0% Broker Fees · Direct Carrier Payment</span>
          </div>
        </div>

        {/* Search & Sort Bar */}
        <div className="p-3 sm:p-4 rounded-xl bg-white border border-slate-200 mb-6 shadow-xs">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by city, carrier name, or equipment (e.g. Dallas, Reefer)..."
                className="w-full pl-9 pr-8 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:border-[#EA580C] focus:bg-white"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort & Views */}
            <div className="flex items-center gap-2 justify-between md:justify-end">
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
              </button>

              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-slate-500 hidden sm:inline font-medium">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-xs font-medium focus:outline-none focus:border-[#EA580C]"
                >
                  <option value="newest">Newest</option>
                  <option value="highest_pay">Highest Pay ($)</option>
                  <option value="rate_per_mile">Highest $/Mile</option>
                  <option value="nearest_date">Nearest Date</option>
                </select>
              </div>

              <div className="p-1 rounded-lg bg-slate-100 border border-slate-200 hidden sm:flex items-center gap-1">
                <button
                  onClick={() => setLayoutView('grid')}
                  className={`p-1.5 rounded ${layoutView === 'grid' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500'}`}
                  aria-label="Grid layout"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setLayoutView('list')}
                  className={`p-1.5 rounded ${layoutView === 'list' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500'}`}
                  aria-label="List layout"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Active filter pills */}
          {activeFilterCount > 0 && (
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-1.5 flex-wrap text-xs">
              <span className="text-slate-400 text-[11px] font-medium">Filters:</span>
              {selectedGigTypes.map((t) => (
                <button
                  key={t}
                  onClick={() => toggleGigType(t)}
                  className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 hover:bg-slate-200 flex items-center gap-1 text-[11px]"
                >
                  <span>{t}</span>
                  <X className="w-3 h-3 text-slate-400" />
                </button>
              ))}
              {selectedEquipment.map((e) => (
                <button
                  key={e}
                  onClick={() => toggleEquipment(e)}
                  className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 hover:bg-slate-200 flex items-center gap-1 text-[11px]"
                >
                  <span>{e}</span>
                  <X className="w-3 h-3 text-slate-400" />
                </button>
              ))}
              {minPay > 0 && (
                <button
                  onClick={() => setMinPay(0)}
                  className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 hover:bg-slate-200 flex items-center gap-1 text-[11px]"
                >
                  <span>&gt; ${minPay}</span>
                  <X className="w-3 h-3 text-slate-400" />
                </button>
              )}
              {selectedUrgency !== 'all' && (
                <button
                  onClick={() => setSelectedUrgency('all')}
                  className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 hover:bg-slate-200 flex items-center gap-1 text-[11px]"
                >
                  <span>{selectedUrgency}</span>
                  <X className="w-3 h-3 text-slate-400" />
                </button>
              )}
              <button
                onClick={resetAllFilters}
                className="text-xs text-[#EA580C] hover:underline font-semibold ml-1.5"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Main Grid: Sidebar + Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-1 p-5 rounded-xl bg-white border border-slate-200 sticky top-24">
            {renderFilterSidebar()}
          </div>

          {/* Cards Column */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-3 text-xs text-slate-500">
              <span>
                Showing <strong className="text-slate-900 font-bold">{filteredGigs.length}</strong> available gigs
              </span>
            </div>

            {isLoading ? (
              <div className={layoutView === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-5' : 'space-y-4'}>
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-60 rounded-xl bg-slate-100 animate-pulse border border-slate-200" />
                ))}
              </div>
            ) : filteredGigs.length === 0 ? (
              <div className="p-10 text-center rounded-xl bg-white border border-slate-200">
                <Truck className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                <h3 className="font-display font-bold text-base text-slate-900 mb-1">
                  No Gigs Match Your Search
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                  Try adjusting your distance slider or resetting filters to see more available hauls.
                </p>
                <button
                  onClick={resetAllFilters}
                  className="px-4 py-2 rounded-lg bg-[#EA580C] text-white font-bold text-xs"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div
                className={
                  layoutView === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 gap-5'
                    : 'space-y-4'
                }
              >
                {filteredGigs.map((gig) => (
                  <GigCard key={gig.id} gig={gig} layout={layoutView} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Sheet */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="fixed inset-0 bg-slate-900/40"
              onClick={() => setIsMobileFilterOpen(false)}
            />
            <div className="fixed inset-x-0 bottom-0 max-h-[85vh] bg-white border-t border-slate-200 rounded-t-2xl p-6 overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
                <h3 className="font-display font-bold text-base text-slate-900">Filters</h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 text-slate-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {renderFilterSidebar()}
              <div className="pt-4 mt-6 border-t border-slate-200">
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full py-2.5 rounded-lg bg-[#EA580C] text-white font-bold text-xs"
                >
                  Apply Filters ({filteredGigs.length} Gigs)
                </button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
