// import Link from "next/link";
// import { Compass, Mail, Phone, MapPin, ShieldCheck, ExternalLink } from "lucide-react";


// export default function Footer() {
  
//   return (
//     <footer className="bg-navy-950 border-t border-gold-500/20 text-gray-400 pt-16 pb-12">
//       <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
//         {/* Column 1 */}
//         <div className="space-y-4">
//           <div className="flex items-center gap-3">
//             <div className="w-8 h-8 rounded bg-gold-500 flex items-center justify-center text-navy-950 font-bold">
//               <Compass className="w-5 h-5" />
//             </div>
//             <span className="text-xl font-bold text-white tracking-wider">ELITRAX</span>
//           </div>
//           <p className="text-sm leading-relaxed text-gray-400">
//             ELITRAX Consultancy delivers high-standard international visa filing assistance, corporate immigration strategy, and bespoke Umrah itineraries.
//           </p>
//           <div className="flex items-center gap-2 text-xs text-gold-400">
//             <ShieldCheck className="w-4 h-4" />
//             <span>Regulated Documentation Practices</span>
//           </div>
//         </div>

//         {/* Column 2 */}
//         <div>
//           <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-l-2 border-gold-500 pl-3">
//             Main Verticals
//           </h4>
//           <ul className="space-y-2.5 text-sm">
//             <li><Link href="/umrah" className="hover:text-gold-400 transition">VIP Umrah Operations</Link></li>
//             <li><Link href="/countries" className="hover:text-gold-400 transition">USA Visit & Study Track</Link></li>
//             <li><Link href="/countries" className="hover:text-gold-400 transition">Canada ODN & Visa Review</Link></li>
//             <li><Link href="/countries" className="hover:text-gold-400 transition">UK Standard Visitor & Study</Link></li>
//             <li><Link href="/business-services" className="hover:text-gold-400 transition">Corporate Invitation Arranging</Link></li>
//           </ul>
//         </div>

//         {/* Column 3 */}
//         <div>
//           <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-l-2 border-gold-500 pl-3">
//             Navigation
//           </h4>
//           <ul className="space-y-2.5 text-sm">
//             <li><Link href="/about" className="hover:text-gold-400 transition">About Our Firm</Link></li>
//             <li><Link href="/packages" className="hover:text-gold-400 transition">Curated Travel Packages</Link></li>
//             <li><Link href="/countries" className="hover:text-gold-400 transition">Destinations Directory</Link></li>
//             <li><Link href="/testimonials" className="hover:text-gold-400 transition">Client Case Studies</Link></li>
//             <li><Link href="/admin/login" className="hover:text-gold-400 transition flex items-center gap-1">Administrative Gateway <ExternalLink className="w-3 h-3" /></Link></li>
//           </ul>
//         </div>

//         {/* Column 4 */}
//         <div>
//           <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-l-2 border-gold-500 pl-3">
//             Headquarters
//           </h4>
//           <ul className="space-y-3 text-sm">
//             <li className="flex items-start gap-3">
//               <MapPin className="w-4 h-4 text-gold-400 mt-0.5 flex-shrink-0" />
//               <span>Suite 400, Financial District Tower, Global Plaza</span>
//             </li>
//             <li className="flex items-center gap-3">
//               <Phone className="w-4 h-4 text-gold-400 flex-shrink-0" />
//               <span>+1 (800) 555-ELIT</span>
//             </li>
//             <li className="flex items-center gap-3">
//               <Mail className="w-4 h-4 text-gold-400 flex-shrink-0" />
//               <span>consult@elitrax.com</span>
//             </li>
//           </ul>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-6 border-t border-navy-800 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 gap-4">
//         <p> © 2026 ELITRAX Consultancy. All Rights Reserved. Professional consultancy & documentation assistance.</p>
//         <div className="flex gap-6">
//           <Link href="/" className="hover:text-gold-400">Terms of Representation</Link>
//           <Link href="/" className="hover:text-gold-400">Privacy Policy</Link>
//         </div>
//       </div>
//     </footer>
//   );
// }

// src/app/components/layout/Footer.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { 
  Compass, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck
} from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
  const [settings, setSettings] = useState({
    siteName: "ELITRAX",
    tagline: "Premier Travel, Umrah & Visa Solutions",
    contactEmail: "info@elitrax.com",
    contactPhone: "+92 300 1234567",
    officeAddress: "Suite #402, Business Tower, Shahrah-e-Faisal, Karachi, Pakistan",
    businessHours: "Mon - Sat: 9:00 AM - 6:00 PM",
    facebookUrl: "",
    instagramUrl: "",
    linkedinUrl: "",
  });

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => (res.ok ? res.json() : {}))
      .then((data) => {
        if (data && Object.keys(data).length > 0) {
          setSettings((prev) => ({ ...prev, ...data }));
        }
      })
      .catch(() => {});
  }, []);

  // Admin routes par footer hide rakhna
  if (pathname && pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-[#050811] text-gray-400 border-t border-navy-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                {settings.siteName}
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-gray-400">
              {settings.tagline}
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-semibold pt-2">
              <ShieldCheck className="w-4 h-4" /> Government Registered Consultancy
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/services" className="hover:text-gold-400 transition-colors">
                  Visa & Immigration
                </Link>
              </li>
              <li>
                <Link href="/packages" className="hover:text-gold-400 transition-colors">
                  Umrah & Tour Packages
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="hover:text-gold-400 transition-colors">
                  Explore Destinations
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="hover:text-gold-400 transition-colors">
                  Client Experiences
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold-400 transition-colors">
                  Book a Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">
              Direct Contact
            </h4>
            <div className="flex items-start gap-2.5 text-xs">
              <MapPin className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
              <span>{settings.officeAddress}</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs">
              <Phone className="w-4 h-4 text-gold-400 flex-shrink-0" />
              <a href={`tel:${settings.contactPhone}`} className="hover:text-white transition">
                {settings.contactPhone}
              </a>
            </div>
            <div className="flex items-center gap-2.5 text-xs">
              <Mail className="w-4 h-4 text-gold-400 flex-shrink-0" />
              <a href={`mailto:${settings.contactEmail}`} className="hover:text-white transition">
                {settings.contactEmail}
              </a>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-gray-500 pt-1">
              <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span>{settings.businessHours}</span>
            </div>
          </div>

          {/* Social Channels */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">
              Connect With Us
            </h4>
            <p className="text-xs text-gray-400 mb-4">
              Follow our official handles for visa policy changes, visa alerts, and package updates.
            </p>
            <div className="flex items-center gap-3">
              {/* {settings.facebookUrl && (
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-navy-900 border border-navy-800 flex items-center justify-center text-gray-400 hover:text-gold-400 hover:border-gold-500/40 transition"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )} */}
              {/* {settings.instagramUrl && (
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-navy-900 border border-navy-800 flex items-center justify-center text-gray-400 hover:text-gold-400 hover:border-gold-500/40 transition"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )} */}
              {/* {settings.linkedinUrl && (
                <a
                  href={settings.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-navy-900 border border-navy-800 flex items-center justify-center text-gray-400 hover:text-gold-400 hover:border-gold-500/40 transition"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )} */}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-navy-900 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} {settings.siteName}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-gray-400 transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-400 transition">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}