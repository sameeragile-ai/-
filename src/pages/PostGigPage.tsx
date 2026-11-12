import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  DollarSign 
} from 'lucide-react';
import { GigType, EquipmentType, UrgencyTag } from '../data/types.ts';
import { useApp } from '../context/AppContext.tsx';
import confetti from 'canvas-confetti';

export const PostGigPage: React.FC = () => {
  const { addToast } = useApp();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

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
  const [settlementMethod, setSettlementMethod] = useState('Zelle / Comchek / Direct ACH wire upon gate receipt');
  const [companyName, setCompanyName] = useState('Apex Freight Solutions');
  const [dotNumber, setDotNumber] = useState('USDOT #3291844');
  const [dispatchPhone, setDispatchPhone] = useState('(214) 555-0199');

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {}
      setIsSubmitted(true);
      addToast('Gig Successfully Published!', `${pickupCity} → ${dropoffCity} · $${flatPay}`, 'success');
    }
  };

  const calculateRpm = () => {
    if (!miles || miles <= 0) return '0.00';
    return (flatPay / miles).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Direct Hiring · Zero Broker Fees</span>
          </div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-slate-900">
            Post a Freight Gig
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Connect directly with verified CDL drivers for trailer shunts, point A-to-B runs, and emergency relays.
          </p>
        </div>

        {/* Steps */}
        {!isSubmitted && (
          <div className="flex items-center justify-between mb-8 max-w-md mx-auto">
            {[
              { num: 1, label: 'Details' },
              { num: 2, label: 'Route' },
              { num: 3, label: 'Pay' },
              { num: 4, label: 'Review' }
            ].map((step) => (
              <div key={step.num} className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                    currentStep === step.num
                      ? 'bg-[#EA580C] text-white shadow-xs'
                      : currentStep > step.num
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {currentStep > step.num ? '✓' : step.num}
                </div>
                <span className={`text-xs font-semibold hidden sm:inline ${
                  currentStep >= step.num ? 'text-slate-900' : 'text-slate-400'
                }`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <div>
                <h2 className="font-display font-bold text-xl text-slate-900 mb-1">
                  Freight Gig Published!
                </h2>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Your run is now live on the board. Qualified drivers will call your dispatch at <span className="font-bold text-slate-900">{dispatchPhone}</span>.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs space-y-1.5 max-w-sm mx-auto">
                <div className="flex justify-between">
                  <span className="text-slate-500">Route:</span>
                  <span className="font-bold text-slate-900">{pickupCity}, {pickupState} → {dropoffCity}, {dropoffState}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Pay:</span>
                  <span className="font-bold text-emerald-700 font-mono">${flatPay} (${calculateRpm()}/mi)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Date:</span>
                  <span className="text-slate-900">{date}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setCurrentStep(1);
                  }}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-50"
                >
                  Post Another
                </button>
                <Link
                  to="/gigs"
                  className="px-4 py-2 rounded-lg bg-[#EA580C] text-white font-bold text-xs"
                >
                  View on Board
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleNext}>
              {/* Step 1 */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h3 className="font-display font-bold text-base text-slate-900">
                    1. Gig Details
                  </h3>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Gig Title
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Empty 53ft Trailer Shunt: Dallas Yard to Fort Worth Intermodal"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-[#EA580C]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Category
                      </label>
                      <select
                        value={gigType}
                        onChange={(e) => setGigType(e.target.value as GigType)}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-[#EA580C]"
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
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Equipment
                      </label>
                      <select
                        value={equipment}
                        onChange={(e) => setEquipment(e.target.value as EquipmentType)}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-[#EA580C]"
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
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Departure Urgency
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Urgent', 'Today', 'This Week'] as UrgencyTag[]).map((u) => (
                        <button
                          key={u}
                          type="button"
                          onClick={() => setUrgency(u)}
                          className={`py-1.5 px-3 rounded-lg text-xs font-bold border transition-colors ${
                            urgency === u
                              ? 'bg-orange-50 border-[#EA580C] text-[#EA580C]'
                              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {u}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Description & Instructions
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Specify trailer state, gate codes, dock appointments, weight, or special handling."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-[#EA580C] resize-none"
                    />
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <h3 className="font-display font-bold text-base text-slate-900">
                    2. Origin, Destination & Schedule
                  </h3>

                  {/* Pickup */}
                  <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                    <span className="text-[11px] font-bold text-emerald-800 uppercase block">Origin (Pickup)</span>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="col-span-2">
                        <input
                          type="text"
                          required
                          placeholder="City (e.g. Dallas)"
                          value={pickupCity}
                          onChange={(e) => setPickupCity(e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded bg-white border border-slate-300 text-xs"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          required
                          maxLength={2}
                          placeholder="State"
                          value={pickupState}
                          onChange={(e) => setPickupState(e.target.value.toUpperCase())}
                          className="w-full px-2.5 py-1.5 rounded bg-white border border-slate-300 text-xs uppercase"
                        />
                      </div>
                    </div>
                    <input
                      type="text"
                      placeholder="Facility name or gate code (optional)"
                      value={pickupFacility}
                      onChange={(e) => setPickupFacility(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded bg-white border border-slate-300 text-xs"
                    />
                  </div>

                  {/* Dropoff */}
                  <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                    <span className="text-[11px] font-bold text-[#EA580C] uppercase block">Destination (Drop-off)</span>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="col-span-2">
                        <input
                          type="text"
                          required
                          placeholder="City (e.g. Fort Worth)"
                          value={dropoffCity}
                          onChange={(e) => setDropoffCity(e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded bg-white border border-slate-300 text-xs"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          required
                          maxLength={2}
                          placeholder="State"
                          value={dropoffState}
                          onChange={(e) => setDropoffState(e.target.value.toUpperCase())}
                          className="w-full px-2.5 py-1.5 rounded bg-white border border-slate-300 text-xs uppercase"
                        />
                      </div>
                    </div>
                    <input
                      type="text"
                      placeholder="Facility name or dock # (optional)"
                      value={dropoffFacility}
                      onChange={(e) => setDropoffFacility(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded bg-white border border-slate-300 text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Miles</label>
                      <input
                        type="number"
                        min={1}
                        required
                        value={miles}
                        onChange={(e) => setMiles(Number(e.target.value))}
                        className="w-full px-2.5 py-1.5 rounded bg-white border border-slate-300 font-mono"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Date</label>
                      <input
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded bg-white border border-slate-300"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Time Window</label>
                      <input
                        type="text"
                        placeholder="07:00 - 11:00"
                        value={timeWindow}
                        onChange={(e) => setTimeWindow(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded bg-white border border-slate-300"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <h3 className="font-display font-bold text-base text-slate-900">
                    3. Pay & Carrier Contact
                  </h3>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          Flat Payout ($)
                        </label>
                        <div className="relative">
                          <DollarSign className="w-4 h-4 text-slate-500 absolute left-2.5 top-2" />
                          <input
                            type="number"
                            min={50}
                            step={5}
                            required
                            value={flatPay}
                            onChange={(e) => setFlatPay(Number(e.target.value))}
                            className="pl-7 pr-3 py-1.5 rounded bg-white border border-slate-300 font-bold text-base w-36"
                          />
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[11px] text-slate-500 block">Rate per Mile</span>
                        <span className="font-display font-bold text-lg text-emerald-700">
                          ${calculateRpm()}/mi
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Settlement Method
                      </label>
                      <input
                        type="text"
                        required
                        value={settlementMethod}
                        onChange={(e) => setSettlementMethod(e.target.value)}
                        className="w-full px-3 py-1.5 rounded bg-white border border-slate-300 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">Company</label>
                      <input
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded bg-white border border-slate-300 text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">USDOT #</label>
                      <input
                        type="text"
                        required
                        value={dotNumber}
                        onChange={(e) => setDotNumber(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded bg-white border border-slate-300 text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">Phone</label>
                      <input
                        type="tel"
                        required
                        value={dispatchPhone}
                        onChange={(e) => setDispatchPhone(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded bg-white border border-slate-300 text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4 */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <h3 className="font-display font-bold text-base text-slate-900">
                    4. Review & Confirm
                  </h3>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-[#EA580C] uppercase">{urgency} · {equipment} · {gigType}</span>
                      <span className="font-display font-bold text-xl text-slate-900">${flatPay}</span>
                    </div>

                    <p className="font-bold text-sm text-slate-900">{title || 'Trailer Relocation'}</p>

                    <div className="p-2.5 rounded bg-white border border-slate-200 flex justify-between font-medium">
                      <span>{pickupCity || 'Origin'}, {pickupState}</span>
                      <span className="text-slate-500 font-mono">{miles} mi (${calculateRpm()}/mi)</span>
                      <span>{dropoffCity || 'Destination'}, {dropoffState}</span>
                    </div>

                    <p className="text-slate-600 leading-relaxed">{description}</p>

                    <div className="pt-2 border-t border-slate-200 flex justify-between text-slate-600">
                      <span>Carrier: {companyName}</span>
                      <span>Dispatch: {dispatchPhone}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>{currentStep === 4 ? 'Publish Gig' : 'Continue'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
