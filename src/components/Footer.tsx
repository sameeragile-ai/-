import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, ShieldCheck, MapPin, Mail, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#070B14] border-t border-white/10 pt-16 pb-12 relative overflow-hidden">
      {/* Road Lane Dashed Line Motif at the top */}
      <div className="absolute top-0 left-0 right-0 road-divider-subtle" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl gradient-amber flex items-center justify-center">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-2xl text-white">
                Haul<span className="gradient-text-amber">Gig</span>
              </span>
            </Link>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              The direct trucking gig directory connecting qualified CDL drivers with FMCSA-verified carriers. Find local trailer moves, yard shifts, and regional point A-to-B linehauls with zero middleman deductions.
            </p>

            <div className="p-3.5 rounded-xl bg-[#111A2E] border border-white/5 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#2DD4BF] shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-bold text-white block">Direct-to-Carrier Network</span>
                <span className="text-slate-400">
                  Negotiate, book, and settle directly with carriers. 0% broker fee. 100% of the agreed haul rate goes straight to the driver.
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: For Drivers */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-300">
              For CDL Drivers
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
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
                  Hotshot & Expedited
                </Link>
              </li>
              <li>
                <Link to="/gigs?urgency=Urgent" className="hover:text-white transition-colors flex items-center gap-1.5 text-[#FFB547]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A1A]" />
                  <span>Urgent Today Runs</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: For Carriers */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-300">
              For Carriers & Fleets
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
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
              <li>
                <span className="text-slate-500">FMCSA SafeStat Sync</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Top Freight Corridors */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-300">
              Top Freight Lanes
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
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

        {/* Legal Disclaimer Box */}
        <div className="mt-8 p-4 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-slate-400 leading-relaxed">
          <p className="font-semibold text-slate-300 mb-1">
            Information Directory Notice & Regulatory Disclaimer:
          </p>
          <p>
            HaulGig operates exclusively as an electronic information matching directory and classified advertising service for commercial motor vehicle operations under 49 U.S.C. and related federal motor carrier statutes. HaulGig is neither a property broker, freight forwarder, motor carrier, nor an employer of truck drivers. HaulGig does not collect freight revenue, negotiate freight contracts, dispatch drivers, issue carrier rate confirmations, or process driver wage compensation. All contracts, settlements, insurance verification, and logistics arrangements occur strictly and directly between the hiring verified carrier and the qualified CDL driver.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} HaulGig Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-slate-400">Direct-to-Carrier · Zero Middleman Fees</span>
            <span>·</span>
            <span className="text-slate-400">FMCSA Verified Network</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
