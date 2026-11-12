import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Truck, 
  MapPin, 
  Calendar, 
  DollarSign, 
  ShieldCheck, 
  FileText,
  Sparkles
} from 'lucide-react';
import { GigType, EquipmentType, UrgencyTag } from '../data/types.ts';
import { useApp } from '../context/AppContext.tsx';
import confetti from 'canvas-confetti';

export const PostGigPage: React.FC = () => {
  const { addToast } = useApp();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Form State
  const [title, setTitle] = useState('');
  const [gigType, setGigType] = useState<GigType>('Trailer Move');
  const [equipment, setEquipment] = useState<EquipmentType>('Dry Van');
  const [urgency, setUrgency] = useState<UrgencyTag>('Today');
  const [description, setDescription] = useState('');

  const [pickupCity, setPickupCity] = useState('');
  const [pickupState, setPickupState] = useState('TX');
  const [pickupFacility, setPickupFacility] = useState('');
  const [dropoffCity, setDropoffCity] = useState('');
  const [dropoffState, setDropoffState] = useState('TX');
  const [dropoffFacility, setDropoffFacility] = useState('');
  const [date, setDate] = useState('2026-11-15');
  const [timeWindow, setTimeWindow] = useState('07:00 - 11:00 CST');
  const [miles, setMiles] = useState<number>(45);

  const [cdlClass, setCdlClass] = useState<'CDL-A' | 'CDL-B'>('CDL-A');
  const [minExp, setMinExp] = useState<number>(2);
  const [hazmat, setHazmat] = useState(false);
  const [tanker, setTanker] = useState(false);
  const [twic, setTwic] = useState(false);
  const [flatPay, setFlatPay] = useState<number>(220);
  const [settlementMethod, setSettlementMethod] = useState('Zelle / Direct ACH wire upon gate receipt');
  const [companyName, setCompanyName] = useState('Apex Freight Solutions');
  const [dotNumber, setDotNumber] = useState('USDOT #3291844');
  const [dispatchPhone, setDispatchPhone] = useState('(214) 555-0199');

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final submit
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {}
      setIsSubmitted(true);
      addToast('Gig Successfully Published!', `${pickupCity} → ${dropoffCity} · $${flatPay}`, 'success');
    }
  };

  const calculateRpm = () => {
    if (!miles || miles <= 0) return 0;
    return (flatPay / miles).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-[#0B1220] pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#2DD4BF] mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Zero Broker Fees · Direct Driver Contact</span>
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-white">
            Post a Freight Gig
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Connect with verified CDL drivers for trailer shunts, point A-to-B deliveries, and emergency linehauls.
          </p>
        </div>

        {/* Multi-step progress bar */}
        {!isSubmitted && (
          <div className="mb-8">
            <div className="flex items-center justify-between relative">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -translate-y-1/2 z-0" />
              <div
                className="absolute top-1/2 left-0 h-0.5 gradient-amber -translate-y-1/2 z-0 transition-all duration-300"
                style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
              />

              {[
                { num: 1, label: 'Gig Details' },
                { num: 2, label: 'Route & Schedule' },
                { num: 3, label: 'Pay & Credentials' },
                { num: 4, label: 'Review' }
              ].map((step) => (
                <div key={step.num} className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-xs transition-all ${
                      currentStep >= step.num
                        ? 'gradient-amber text-white shadow-md shadow-[#FF7A1A]/30'
                        : 'bg-[#16213A] text-slate-500 border border-white/10'
                    }`}
                  >
                    {currentStep > step.num ? <CheckCircle2 className="w-5 h-5 text-white" /> : step.num}
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium mt-1.5 hidden sm:block">
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Form Container */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#16213A] border border-white/10 shadow-2xl">
          {isSubmitted ? (
            /* Success State */
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-[#22C55E]/15 border border-[#22C55E]/30 flex items-center justify-center text-[#22C55E] mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h2 className="font-display font-bold text-2xl text-white mb-2">
                  Freight Run Live on HaulGig!
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                  Your listing for <span className="font-semibold text-white">{pickupCity}, {pickupState} → {dropoffCity}, {dropoffState}</span> is now active. Qualified drivers will contact your dispatch at <span className="text-[#FFB547] font-semibold">{dispatchPhone}</span>.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#111A2E] border border-white/5 text-left text-xs space-y-2 max-w-md mx-auto">
                <div className="flex justify-between">
                  <span className="text-slate-400">Title:</span>
                  <span className="text-white font-medium">{title || 'Trailer Relocation'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Guaranteed Pay:</span>
                  <span className="text-[#2DD4BF] font-mono font-bold">${flatPay} (${calculateRpm()}/mi)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Date:</span>
                  <span className="text-white">{date} ({timeWindow})</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setCurrentStep(1);
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/10"
                >
                  Post Another Gig
                </button>
                <Link
                  to="/gigs"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl gradient-amber text-white font-bold text-xs shadow-md"
                >
                  View on Gig Board
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleNext}>
              {/* Step 1: Gig Details */}
              {currentStep === 1 && (
                <div className="space-y-5">
                  <h3 className="font-display font-bold text-lg text-white mb-4">
                    1. Gig Category & Equipment
                  </h3>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Gig Title
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Empty 53ft Trailer Shunt: Dallas Yard to Fort Worth Intermodal"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1220] border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-[#FF7A1A]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">
                        Gig Category
                      </label>
                      <select
                        value={gigType}
                        onChange={(e) => setGigType(e.target.value as GigType)}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#0B1220] border border-white/10 text-white text-xs focus:outline-none focus:border-[#FF7A1A]"
                      >
                        <option value="Trailer Move">Trailer Move</option>
                        <option value="Point A→B">Point A→B</option>
                        <option value="Drop & Hook">Drop & Hook</option>
                        <option value="Yard Move">Yard Move</option>
                        <option value="Hotshot">Hotshot</option>
                        <option value="Team Run">Team Run</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">
                        Equipment Needed
                      </label>
                      <select
                        value={equipment}
                        onChange={(e) => setEquipment(e.target.value as EquipmentType)}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#0B1220] border border-white/10 text-white text-xs focus:outline-none focus:border-[#FF7A1A]"
                      >
                        <option value="Dry Van">Dry Van</option>
                        <option value="Reefer">Reefer</option>
                        <option value="Flatbed">Flatbed</option>
                        <option value="Step Deck">Step Deck</option>
                        <option value="Power Only">Power Only</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Departure Urgency
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Urgent', 'Today', 'This Week'] as UrgencyTag[]).map((u) => (
                        <button
                          key={u}
                          type="button"
                          onClick={() => setUrgency(u)}
                          className={`py-2 px-3 rounded-xl text-xs font-semibold text-center border transition-all ${
                            urgency === u
                              ? 'bg-[#FF7A1A]/15 border-[#FF7A1A] text-white'
                              : 'bg-white/5 border-white/5 text-slate-400 hover:text-white'
                          }`}
                        >
                          {u}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Load Details & Gate Procedures
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Specify trailer state (loaded/empty), gate check-in codes, dock appointment status, weight, and any special pre-trip instructions."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1220] border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-[#FF7A1A] resize-none"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Route & Schedule */}
              {currentStep === 2 && (
                <div className="space-y-5">
                  <h3 className="font-display font-bold text-lg text-white mb-4">
                    2. Origin, Destination & Schedule
                  </h3>

                  {/* Pickup */}
                  <div className="p-4 rounded-xl bg-[#111A2E] border border-white/5 space-y-3">
                    <span className="text-xs font-bold text-[#2DD4BF] uppercase tracking-wider block">
                      Pickup Facility
                    </span>
                    <div className="grid grid-cols-3 gap-2.5">
                      <div className="col-span-2">
                        <label className="text-[11px] text-slate-400 block mb-1">City</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Dallas"
                          value={pickupCity}
                          onChange={(e) => setPickupCity(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-[#0B1220] border border-white/10 text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">State</label>
                        <input
                          type="text"
                          required
                          maxLength={2}
                          placeholder="TX"
                          value={pickupState}
                          onChange={(e) => setPickupState(e.target.value.toUpperCase())}
                          className="w-full px-3 py-2 rounded-lg bg-[#0B1220] border border-white/10 text-white text-xs uppercase"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Facility Name / Gate #</label>
                      <input
                        type="text"
                        placeholder="e.g. Redline DFW Terminal, Gate 4"
                        value={pickupFacility}
                        onChange={(e) => setPickupFacility(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-[#0B1220] border border-white/10 text-white text-xs"
                      />
                    </div>
                  </div>

                  {/* Drop-off */}
                  <div className="p-4 rounded-xl bg-[#111A2E] border border-white/5 space-y-3">
                    <span className="text-xs font-bold text-[#FF7A1A] uppercase tracking-wider block">
                      Drop-off Destination
                    </span>
                    <div className="grid grid-cols-3 gap-2.5">
                      <div className="col-span-2">
                        <label className="text-[11px] text-slate-400 block mb-1">City</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Fort Worth"
                          value={dropoffCity}
                          onChange={(e) => setDropoffCity(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-[#0B1220] border border-white/10 text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">State</label>
                        <input
                          type="text"
                          required
                          maxLength={2}
                          placeholder="TX"
                          value={dropoffState}
                          onChange={(e) => setDropoffState(e.target.value.toUpperCase())}
                          className="w-full px-3 py-2 rounded-lg bg-[#0B1220] border border-white/10 text-white text-xs uppercase"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Facility Name / Dock #</label>
                      <input
                        type="text"
                        placeholder="e.g. Alliance Intermodal Ramp"
                        value={dropoffFacility}
                        onChange={(e) => setDropoffFacility(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-[#0B1220] border border-white/10 text-white text-xs"
                      />
                    </div>
                  </div>

                  {/* Distance & Schedule */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">
                        Miles
                      </label>
                      <input
                        type="number"
                        min={1}
                        required
                        value={miles}
                        onChange={(e) => setMiles(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl bg-[#0B1220] border border-white/10 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">
                        Pickup Date
                      </label>
                      <input
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#0B1220] border border-white/10 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">
                        Time Window
                      </label>
                      <input
                        type="text"
                        placeholder="07:00 - 11:00 CST"
                        value={timeWindow}
                        onChange={(e) => setTimeWindow(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#0B1220] border border-white/10 text-white text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Pay & Driver Requirements */}
              {currentStep === 3 && (
                <div className="space-y-5">
                  <h3 className="font-display font-bold text-lg text-white mb-4">
                    3. Pay Rate & Settlement Terms
                  </h3>

                  <div className="p-4 rounded-xl bg-[#111A2E] border border-white/5 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                      <div>
                        <label className="text-xs font-semibold text-slate-300 block mb-1">
                          Flat Payout Amount ($)
                        </label>
                        <div className="relative">
                          <DollarSign className="w-4 h-4 text-[#FF7A1A] absolute left-3 top-3 pointer-events-none" />
                          <input
                            type="number"
                            min={50}
                            step={5}
                            required
                            value={flatPay}
                            onChange={(e) => setFlatPay(Number(e.target.value))}
                            className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#0B1220] border border-white/10 text-white font-display font-bold text-base"
                          />
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-[#0B1220] border border-white/5 text-xs">
                        <span className="text-slate-400 block">Calculated Rate:</span>
                        <span className="font-display font-bold text-base text-[#2DD4BF]">
                          ${calculateRpm()} / mile
                        </span>
                        <span className="text-[10px] text-slate-500 block">({miles} loaded miles)</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">
                        Settlement Method & Speed
                      </label>
                      <input
                        type="text"
                        required
                        value={settlementMethod}
                        onChange={(e) => setSettlementMethod(e.target.value)}
                        placeholder="e.g. Same-day Comchek or Zelle upon gate receipt"
                        className="w-full px-3 py-2.5 rounded-xl bg-[#0B1220] border border-white/10 text-white text-xs"
                      />
                    </div>
                  </div>

                  {/* Requirements */}
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-2">
                      Required CDL Endorsements
                    </label>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <label className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2 cursor-pointer text-slate-300">
                        <input
                          type="checkbox"
                          checked={hazmat}
                          onChange={(e) => setHazmat(e.target.checked)}
                          className="accent-[#FF7A1A]"
                        />
                        <span>Hazmat (H)</span>
                      </label>
                      <label className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2 cursor-pointer text-slate-300">
                        <input
                          type="checkbox"
                          checked={tanker}
                          onChange={(e) => setTanker(e.target.checked)}
                          className="accent-[#FF7A1A]"
                        />
                        <span>Tanker (N)</span>
                      </label>
                      <label className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2 cursor-pointer text-slate-300">
                        <input
                          type="checkbox"
                          checked={twic}
                          onChange={(e) => setTwic(e.target.checked)}
                          className="accent-[#FF7A1A]"
                        />
                        <span>TWIC Card</span>
                      </label>
                    </div>
                  </div>

                  {/* Carrier Contact Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Company Name</label>
                      <input
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#0B1220] border border-white/10 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">USDOT Number</label>
                      <input
                        type="text"
                        required
                        value={dotNumber}
                        onChange={(e) => setDotNumber(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#0B1220] border border-white/10 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Dispatch Phone</label>
                      <input
                        type="tel"
                        required
                        value={dispatchPhone}
                        onChange={(e) => setDispatchPhone(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#0B1220] border border-white/10 text-white text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Review & Confirm */}
              {currentStep === 4 && (
                <div className="space-y-5">
                  <h3 className="font-display font-bold text-lg text-white mb-4">
                    4. Review Freight Listing Before Posting
                  </h3>

                  <div className="p-5 rounded-2xl bg-[#111A2E] border border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#FF7A1A] uppercase tracking-wider">
                        {urgency} · {equipment} · {gigType}
                      </span>
                      <span className="font-display font-bold text-2xl text-white">
                        ${flatPay}
                      </span>
                    </div>

                    <h4 className="font-display font-bold text-base text-white">
                      {title || 'Freight Gig Listing'}
                    </h4>

                    {/* Route recap */}
                    <div className="p-3 rounded-xl bg-[#0B1220] border border-white/5 flex items-center justify-between text-xs font-semibold text-slate-200">
                      <div>
                        <p className="text-white">{pickupCity || 'Origin'}, {pickupState}</p>
                        {pickupFacility && <p className="text-[10px] text-slate-400">{pickupFacility}</p>}
                      </div>
                      <div className="text-center font-mono text-[11px] text-slate-400">
                        <span>{miles} mi</span>
                        <ArrowRight className="w-3 h-3 text-[#FF7A1A] mx-auto" />
                        <span className="text-[#2DD4BF]">${calculateRpm()}/mi</span>
                      </div>
                      <div className="text-right">
                        <p className="text-white">{dropoffCity || 'Destination'}, {dropoffState}</p>
                        {dropoffFacility && <p className="text-[10px] text-slate-400">{dropoffFacility}</p>}
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {description || 'Standard carrier trailer move.'}
                    </p>

                    <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-2 text-xs text-slate-400">
                      <div>
                        <span className="block text-[10px] uppercase">Carrier</span>
                        <span className="text-white font-medium">{companyName} ({dotNumber})</span>
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase">Direct Dispatch</span>
                        <span className="text-white font-medium">{dispatchPhone}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-start gap-2.5 text-xs text-slate-300">
                    <ShieldCheck className="w-4 h-4 text-[#2DD4BF] shrink-0 mt-0.5" />
                    <span>
                      Zero platform commission fees. By posting, you certify that all driver compensation will be settled directly upon completion of agreed logistics.
                    </span>
                  </div>
                </div>
              )}

              {/* Form Navigation Buttons */}
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between gap-3">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}

                <button
                  type="submit"
                  className="shine-hover px-6 py-3 rounded-xl gradient-amber text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-[#FF7A1A]/20 active:scale-95"
                >
                  <span>{currentStep === 4 ? 'Publish Freight Gig' : 'Continue'}</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
