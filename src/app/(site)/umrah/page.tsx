// cspell:words ELITRAX ziyarat
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import ScrollReveal from "../../components/ui/ScrollReveal";

export const metadata = {
  title: "Executive Royal Umrah | ELITRAX Consultancy",
  description:
    "VIP Umrah packages featuring five-star clock tower accommodation and private logistics.",
};

export default function UmrahPage() {
  const features = [
    {
      title: "5-Star Clock Tower Stays",
      desc: "Premium suites overlooking the Haram in Makkah and rawdah access in Madinah.",
    },
    {
      title: "Private VIP Transport",
      desc: "Chauffeured GMC Yukon XL or luxury sedans for all inter-city and airport routes.",
    },
    {
      title: "Dedicated Concierge",
      desc: "On-ground support staff to manage check-ins, ziyarat, and wheelchair assistance if needed.",
    },
    {
      title: "Express Visa Issuance",
      desc: "Streamlined electronic Umrah permit processing within 24-48 hours.",
    },
  ];

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero */}
        <div className="relative h-[600px] rounded-3xl overflow-hidden border border-gold-500/20 shadow-2xl mb-20 flex items-center justify-center text-center px-4">
          <Image
            src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1200&q=80"
            alt="Makkah"
            fill
            priority
            sizes="100vw"
            className="object-cover brightness-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent" />

          <div className="relative z-10 max-w-3xl">
            <span className="text-gold-400 text-xs font-bold uppercase tracking-widest mb-4 block">
              Spiritual Excellence
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 drop-shadow-lg">
              Executive Royal Umrah
            </h1>
            <p className="text-gray-200 text-lg md:text-xl font-light mb-8 max-w-2xl mx-auto drop-shadow">
              Experience the highest standard of spiritual journeying with our impeccably curated VIP itineraries, where every logistical detail is handled with absolute precision.
            </p>
            <Link
              href="/packages"
              className="inline-block px-8 py-4 bg-gold-500 text-navy-950 font-bold uppercase tracking-wider rounded-xl hover:bg-gold-400 transition shadow-[0_0_25px_rgba(212,175,55,0.4)]"
            >
              View Umrah Packages
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {features.map((f, i) => (
            <ScrollReveal key={f.title} delay={i * 0.1}>
              <div className="p-8 rounded-2xl bg-navy-900/40 border border-navy-800 h-full">
                <Star className="w-8 h-8 text-gold-500 mb-6" />
                <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}