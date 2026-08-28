import Link from "next/link";
import { Compass, Mail, Phone, MapPin, ShieldCheck, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-gold-500/20 text-gray-400 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Column 1 */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-gold-500 flex items-center justify-center text-navy-950 font-bold">
              <Compass className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-white tracking-wider">ELITRAX</span>
          </div>
          <p className="text-sm leading-relaxed text-gray-400">
            ELITRAX Consultancy delivers high-standard international visa filing assistance, corporate immigration strategy, and bespoke Umrah itineraries.
          </p>
          <div className="flex items-center gap-2 text-xs text-gold-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Regulated Documentation Practices</span>
          </div>
        </div>

        {/* Column 2 */}
        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-l-2 border-gold-500 pl-3">
            Main Verticals
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/umrah" className="hover:text-gold-400 transition">VIP Umrah Operations</Link></li>
            <li><Link href="/countries" className="hover:text-gold-400 transition">USA Visit & Study Track</Link></li>
            <li><Link href="/countries" className="hover:text-gold-400 transition">Canada ODN & Visa Review</Link></li>
            <li><Link href="/countries" className="hover:text-gold-400 transition">UK Standard Visitor & Study</Link></li>
            <li><Link href="/business-services" className="hover:text-gold-400 transition">Corporate Invitation Arranging</Link></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-l-2 border-gold-500 pl-3">
            Navigation
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/about" className="hover:text-gold-400 transition">About Our Firm</Link></li>
            <li><Link href="/packages" className="hover:text-gold-400 transition">Curated Travel Packages</Link></li>
            <li><Link href="/countries" className="hover:text-gold-400 transition">Destinations Directory</Link></li>
            <li><Link href="/testimonials" className="hover:text-gold-400 transition">Client Case Studies</Link></li>
            <li><Link href="/admin/login" className="hover:text-gold-400 transition flex items-center gap-1">Administrative Gateway <ExternalLink className="w-3 h-3" /></Link></li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-l-2 border-gold-500 pl-3">
            Headquarters
          </h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-gold-400 mt-0.5 flex-shrink-0" />
              <span>Suite 400, Financial District Tower, Global Plaza</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-gold-400 flex-shrink-0" />
              <span>+1 (800) 555-ELIT</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-gold-400 flex-shrink-0" />
              <span>consult@elitrax.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 border-t border-navy-800 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 gap-4">
        <p>© 2026 ELITRAX Consultancy. All Rights Reserved. Professional consultancy & documentation assistance.</p>
        <div className="flex gap-6">
          <Link href="/" className="hover:text-gold-400">Terms of Representation</Link>
          <Link href="/" className="hover:text-gold-400">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}