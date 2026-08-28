import DestinationSlider from "../app/components/ui/DestinationSlider";
import ContactForm from "../app/components/ui/ContactForm";
import Link from "next/link";
import { ShieldCheck, Compass, Award, Briefcase, ChevronRight, Globe2 } from "lucide-react";

export default function HomePage() {
  const pillars = [
    { title: "Meticulous Compliance", desc: "Every dossier is double-audited against dynamic consulate criteria.", icon: ShieldCheck },
    { title: "VIP Ground Logistics", desc: "Seamless executive transport and five-star accommodations for private itineraries.", icon: Compass },
    { title: "Corporate Mobility", desc: "Fast-tracked business invitation structures and international summit documentation.", icon: Briefcase },
    { title: "Confidential Profiling", desc: "Enterprise-grade data discretion for all travel candidates and executives.", icon: Award },
  ];

  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 pb-16 px-6 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          
          {/* Hero Text */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center justify-center lg:justify-start gap-2 px-4 py-1.5 rounded-full border border-gold-500/40 bg-gold-500/10 text-gold-300 text-xs font-semibold tracking-widest uppercase">
              <Globe2 className="w-4 h-4" /> High-Tier Visa Architecture
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight">
              Your Journey. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600">
                Our Expertise.
              </span>
            </h1>

            <p className="text-gray-300 text-base md:text-lg font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
              ELITRAX Consultancy delivers comprehensive visa profiling, bespoke Umrah expeditions, and executive corporate migration guidance worldwide.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link
                href="/countries"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 font-bold text-sm uppercase tracking-wider hover:from-gold-400 hover:to-gold-500 shadow-[0_0_25px_rgba(212,175,55,0.3)] transition text-center"
              >
                Explore Destinations
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 rounded-xl border border-navy-700 bg-navy-900/60 hover:bg-navy-800 text-white font-semibold text-sm uppercase tracking-wider transition backdrop-blur-md text-center"
              >
                Request Assessment
              </Link>
            </div>
          </div>

          {/* Hero Slider */}
          <div className="w-full">
            <DestinationSlider />
          </div>

        </div>
      </section>

      {/* 2. TRUST & METHODOLOGY PILLARS */}
      <section className="max-w-7xl mx-auto px-6 w-full">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs uppercase tracking-widest text-gold-400 font-bold">The Strategic Difference</h2>
          <p className="text-3xl md:text-4xl font-bold text-white">Why Discerning Travelers Choose ELITRAX</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
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

      {/* 3. STRUCTURED SERVICES GRID */}
      <section className="max-w-7xl mx-auto px-6 w-full space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-navy-800 pb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-gold-400 font-bold">Consultancy Verticals</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-1">Core Service Disciplines</h2>
          </div>
          <Link href="/services" className="text-gold-400 hover:text-gold-300 text-sm font-semibold flex items-center gap-1 group">
            Browse all specialized services <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Vertical 1 */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-navy-900 to-navy-950 border border-gold-500/20 relative overflow-hidden flex flex-col justify-between h-96 hover:border-gold-500/50 transition">
            <div>
              <span className="text-xs font-semibold uppercase text-gold-400 tracking-wider">Vertical I</span>
              <h3 className="text-2xl font-bold text-white mt-2 mb-4">Umrah Operations</h3>
              <p className="text-sm text-gray-300">
                End-to-end bespoke, private, and family packages featuring tier-one hospitality alongside rawuh and ziyarat facilitation.
              </p>
            </div>
            <Link href="/umrah" className="inline-flex items-center gap-2 text-gold-400 text-sm font-bold mt-6 hover:text-gold-300">
              Review Umrah Programs <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Vertical 2 */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-navy-900 to-navy-950 border border-gold-500/20 relative overflow-hidden flex flex-col justify-between h-96 hover:border-gold-500/50 transition">
            <div>
              <span className="text-xs font-semibold uppercase text-gold-400 tracking-wider">Vertical II</span>
              <h3 className="text-2xl font-bold text-white mt-2 mb-4">Visa Strategy</h3>
              <p className="text-sm text-gray-300">
                Granular dossier reviews for USA, Canada, UK, Schengen, and Australasia with interview simulation and document attestation.
              </p>
            </div>
            <Link href="/countries" className="inline-flex items-center gap-2 text-gold-400 text-sm font-bold mt-6 hover:text-gold-300">
              Explore Visa Frameworks <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Vertical 3 */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-navy-900 to-navy-950 border border-gold-500/20 relative overflow-hidden flex flex-col justify-between h-96 hover:border-gold-500/50 transition">
            <div>
              <span className="text-xs font-semibold uppercase text-gold-400 tracking-wider">Vertical III</span>
              <h3 className="text-2xl font-bold text-white mt-2 mb-4">Corporate Solutions</h3>
              <p className="text-sm text-gray-300">
                Business invitation sourcing, global conference delegation arrangements, Turkey TRC assistance, and Canadian ODN notes audits.
              </p>
            </div>
            <Link href="/business-services" className="inline-flex items-center gap-2 text-gold-400 text-sm font-bold mt-6 hover:text-gold-300">
              Review Corporate Plans <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. INQUIRY & CONTACT SECTION */}
      <section className="max-w-5xl mx-auto px-6 w-full">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-gold-400 font-bold">Direct Client Intake</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Initiate Your Consultation</h2>
          <p className="text-gray-400 mt-3">Fill out the form below and our senior advisor will contact you.</p>
        </div>
        
        {/* Contact Form Component */}
        <ContactForm />
      </section>
    </div>
  );
}