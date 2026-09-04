// cspell:words ELITRAX rawuh ziyarat
import DestinationSlider from "../components/ui/DestinationSlider";
import ContactForm from "../(site)/contact/page";
import Link from "next/link";
import {
  ShieldCheck,
  Compass,
  Award,
  ChevronRight,
  Globe2,
  Briefcase,
} from "lucide-react";

export default function HomePage() {
  const pillars = [
    {
      title: "Meticulous Compliance",
      desc: "Every dossier is double-audited against dynamic consulate criteria.",
      icon: ShieldCheck,
    },
    {
      title: "VIP Ground Logistics",
      desc: "Seamless executive transport and five-star accommodations for private itineraries.",
      icon: Compass,
    },
    {
      title: "Corporate Mobility",
      desc: "Fast-tracked business invitation structures and international summit documentation.",
      icon: Briefcase,
    },
    {
      title: "Confidential Profiling",
      desc: "Enterprise-grade data discretion for all travel candidates and executives.",
      icon: Award,
    },
  ];

  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="max-w-6xl mx-auto text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/40 bg-gold-500/10 text-gold-300 text-xs font-semibold tracking-widest uppercase">
            <Globe2 className="w-3.5 h-3.5" /> High-Tier Visa Architecture &amp; Travel Consultancy
          </div>

          <h1 className="text-4xl md:text-7xl font-extrabold text-white tracking-tight leading-tight">
            Your Journey.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600">
              Our Expertise.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-gray-300 text-base md:text-xl font-light leading-relaxed">
            ELITRAX Consultancy delivers comprehensive visa profiling, bespoke Umrah expeditions, and executive corporate migration guidance worldwide.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/countries"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 font-bold text-sm uppercase tracking-wider hover:from-gold-400 hover:to-gold-500 shadow-[0_0_25px_rgba(212,175,55,0.3)] transition"
            >
              Explore Destinations
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 rounded-xl border border-navy-700 bg-navy-900/60 hover:bg-navy-800 text-white font-semibold text-sm uppercase tracking-wider transition backdrop-blur-md"
            >
              Request Assessment
            </Link>
          </div>

          <div className="pt-12">
            <DestinationSlider />
          </div>
        </div>
      </section>

      {/* Trust & Methodology Pillars */}
      <section className="max-w-7xl mx-auto px-6 w-full">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs uppercase tracking-widest text-gold-400 font-bold">
            The Strategic Difference
          </h2>
          <p className="text-3xl font-bold text-white">
            Why Discerning Travelers Choose ELITRAX
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="p-8 rounded-2xl bg-navy-900/50 border border-navy-800 hover:border-gold-500/40 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-navy-800 flex items-center justify-center text-gold-400 mb-6 group-hover:scale-110 group-hover:bg-gold-500 group-hover:text-navy-950 transition">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Structured Services Grid Preview */}
      <section className="max-w-7xl mx-auto px-6 w-full space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-navy-800 pb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-gold-400 font-bold">
              Consultancy Verticals
            </span>
            <h2 className="text-3xl font-bold text-white mt-1">
              Core Service Disciplines
            </h2>
          </div>
          <Link
            href="/services"
            className="text-gold-400 hover:text-gold-300 text-sm font-semibold flex items-center gap-1"
          >
            Browse all specialized services <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-gradient-to-b from-navy-900 to-navy-950 border border-gold-500/20 relative overflow-hidden flex flex-col justify-between h-96">
            <div>
              <span className="text-xs font-semibold uppercase text-gold-400">
                Vertical I
              </span>
              <h3 className="text-2xl font-bold text-white mt-2 mb-4">
                Umrah Operations
              </h3>
              <p className="text-sm text-gray-300">
                End-to-end bespoke, private, and family packages featuring tier-one hospitality alongside rawuh and ziyarat facilitation.
              </p>
            </div>
            <Link
              href="/umrah"
              className="inline-flex items-center gap-2 text-gold-400 text-sm font-bold mt-6"
            >
              Review Umrah Programs <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="p-8 rounded-2xl bg-gradient-to-b from-navy-900 to-navy-950 border border-gold-500/20 relative overflow-hidden flex flex-col justify-between h-96">
            <div>
              <span className="text-xs font-semibold uppercase text-gold-400">
                Vertical II
              </span>
              <h3 className="text-2xl font-bold text-white mt-2 mb-4">
                Visa Strategy
              </h3>
              <p className="text-sm text-gray-300">
                Granular dossier reviews for USA, Canada, UK, Schengen, and Australasia with interview simulation and document attestation.
              </p>
            </div>
            <Link
              href="/countries"
              className="inline-flex items-center gap-2 text-gold-400 text-sm font-bold mt-6"
            >
              Explore Visa Frameworks <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="p-8 rounded-2xl bg-gradient-to-b from-navy-900 to-navy-950 border border-gold-500/20 relative overflow-hidden flex flex-col justify-between h-96">
            <div>
              <span className="text-xs font-semibold uppercase text-gold-400">
                Vertical III
              </span>
              <h3 className="text-2xl font-bold text-white mt-2 mb-4">
                Corporate Solutions
              </h3>
              <p className="text-sm text-gray-300">
                Business invitation sourcing, global conference delegation arrangements, Turkey TRC assistance, and Canadian ODN notes audits.
              </p>
            </div>
            <Link
              href="/business-services"
              className="inline-flex items-center gap-2 text-gold-400 text-sm font-bold mt-6"
            >
              Review Corporate Plans <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Inquiry & Case File Section */}
      <section className="max-w-5xl mx-auto px-6 w-full">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-gold-400 font-bold">
            Direct Client Intake
          </span>
          <h2 className="text-3xl font-bold text-white mt-2">
            Initiate Your Consultation
          </h2>
        </div>
        <ContactForm />
      </section>
    </div>
  );
}