import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0F172A] text-white pt-14 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-800 text-xs">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-3">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <Truck className="w-4 h-4 text-[#F97316]" />
              </div>
              <span className="font-display font-bold text-xl text-white">
                Haul<span className="text-[#F97316]">Gig</span>
              </span>
            </Link>

            <p className="text-slate-400 max-w-sm leading-relaxed">
              The direct trucking gig directory connecting qualified CDL drivers with FMCSA-verified carriers. Find local trailer moves, yard shifts, and regional point A-to-B linehauls with zero middleman deductions.
            </p>

            <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block">Direct-to-Carrier Network</span>
                <span className="text-slate-400">
                  Negotiate and settle directly with carriers. 0% broker fee. 100% of the agreed haul rate goes straight to the driver.
                </span>
              </div>
            </div>
          </div>

          {/* For Drivers */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">
              For Drivers
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link to="/gigs" className="hover:text-white transition-colors">
                  Browse All Gigs
                </Link>
              </li>
              <li>
                <Link to="/gigs?type=Trailer+Move" className="hover:text-white transition-colors">
                  Trailer Relocations
                </Link>
              </li>
              <li>
                <Link to="/gigs?type=Yard+Move" className="hover:text-white transition-colors">
                  Yard Spotting & Shunts
                </Link>
              </li>
              <li>
                <Link to="/gigs?type=Hotshot" className="hover:text-white transition-colors">
                  Hotshot Runs
                </Link>
              </li>
              <li>
                <Link to="/gigs?urgency=Urgent" className="hover:text-white transition-colors text-orange-400">
                  Today / Urgent Runs
                </Link>
              </li>
            </ul>
          </div>

          {/* For Carriers */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">
              For Carriers
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link to="/post" className="hover:text-white transition-colors">
                  Post a Gig Listing
                </Link>
              </li>
              <li>
                <Link to="/carriers" className="hover:text-white transition-colors">
                  Verified Carrier Directory
                </Link>
              </li>
              <li>
                <Link to="/#pricing" className="hover:text-white transition-colors">
                  Carrier Subscriptions
                </Link>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  How Direct Hiring Works
                </a>
              </li>
            </ul>
          </div>

          {/* Top Lanes */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">
              Top Freight Lanes
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link to="/gigs?pickup=Dallas" className="hover:text-white transition-colors">
                  Dallas TX → Fort Worth TX
                </Link>
              </li>
              <li>
                <Link to="/gigs?pickup=Houston" className="hover:text-white transition-colors">
                  Houston TX → Port Facilities
                </Link>
              </li>
              <li>
                <Link to="/gigs?pickup=Fresno" className="hover:text-white transition-colors">
                  Fresno CA → Phoenix AZ
                </Link>
              </li>
              <li>
                <Link to="/gigs?pickup=Chicago" className="hover:text-white transition-colors">
                  Chicago IL → Indianapolis IN
                </Link>
              </li>
              <li>
                <Link to="/gigs?pickup=Atlanta" className="hover:text-white transition-colors">
                  Atlanta GA → Charlotte NC
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="mt-6 p-4 rounded-lg bg-slate-800/40 border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
          <p className="font-semibold text-slate-300 mb-1">
            Information Directory Notice & Direct Settlement Disclaimer:
          </p>
          <p>
            HaulGig operates strictly as an electronic information directory and classified advertising service for commercial motor vehicle operations. HaulGig is neither a freight broker, freight forwarder, motor carrier, nor an employer of truck drivers. All negotiations, rate confirmation agreements, settlements, insurance verification, and logistics arrangements occur strictly and directly between the hiring verified carrier and the qualified CDL driver.
          </p>
        </div>

        {/* Bottom */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} HaulGig Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Direct-to-Carrier · Zero Middleman Fees</span>
            <span>·</span>
            <span>FMCSA SafeStat Verified</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
