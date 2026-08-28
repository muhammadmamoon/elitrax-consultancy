import Link from "next/link";
import { ShieldCheck, Globe, BookOpen, Briefcase, FileSearch, ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Premium Services | ELITRAX Consultancy",
  description: "Comprehensive visa processing, corporate migration, and VIP travel services.",
};

export default function ServicesPage() {
  // Static Dummy Data for Services
  const services = [
    {
      id: "s1",
      title: "Global Visit Visas",
      description: "Comprehensive documentation structuring and strategic filing for tourist and family visit visas across North America, UK, and Schengen states.",
      icon: <Globe className="w-6 h-6 text-navy-950" />,
      features: ["Profile Auditing", "Itinerary Planning", "Interview Preparation", "Embassy Appointment Booking"],
      link: "/countries"
    },
    {
      id: "s2",
      title: "Study Direct Stream",
      description: "End-to-end academic pathway management, from university admissions to student visa processing and financial solvency documentation.",
      icon: <BookOpen className="w-6 h-6 text-navy-950" />,
      features: ["University Shortlisting", "Offer Letter Procurement", "SOP Drafting", "Visa File Preparation"],
      link: "/contact"
    },
    {
      id: "s3",
      title: "Corporate & B2B Migration",
      description: "Executive travel management, business invitation arrangements, and corporate delegation visas for international conferences and expos.",
      icon: <Briefcase className="w-6 h-6 text-navy-950" />,
      features: ["B2B Invitations", "Expo Registrations", "Group Visa Processing", "Executive Transport"],
      link: "/packages"
    },
    {
      id: "s4",
      title: "VIP Umrah Expeditions",
      description: "Bespoke spiritual journeys featuring 5-star accommodations, private inter-city transport, and dedicated ground concierge services in KSA.",
      icon: <ShieldCheck className="w-6 h-6 text-navy-950" />,
      features: ["Luxury Hotels", "Private Transfers", "E-Visa Processing", "Guided Ziyarat"],
      link: "/umrah"
    },
    {
      id: "s5",
      title: "Application Auditing (ATIP/ODN)",
      description: "Detailed review of previously refused applications. We extract official officer notes and restructure your file to mitigate future risks.",
      icon: <FileSearch className="w-6 h-6 text-navy-950" />,
      features: ["Refusal Note Extraction", "Risk Assessment", "File Restructuring", "Legal Compliance Check"],
      link: "/contact"
    }
  ];

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="max-w-3xl mb-20">
        <div className="inline-flex items-center gap-2 text-gold-400 text-xs font-bold uppercase tracking-widest mb-4">
          <ShieldCheck className="w-4 h-4" /> Core Competencies
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
          Premium Migration & <br className="hidden md:block" /> Travel Consultancy
        </h1>
        <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
          ELITRAX provides high-tier regulatory compliance and application structuring for individuals and corporations seeking seamless global mobility.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {services.map((service) => (
          <div 
            key={service.id} 
            className="group relative flex flex-col p-8 rounded-2xl bg-navy-900/40 border border-navy-800 hover:border-gold-500/40 transition-all duration-500 overflow-hidden"
          >
            {/* Background Glow Effect on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10 flex-1">
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500">
                {service.icon}
              </div>
              
              {/* Content */}
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
                {service.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-8">
                {service.description}
              </p>

              {/* Features List */}
              <ul className="space-y-3 mb-8">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Link */}
            <div className="relative z-10 pt-6 border-t border-navy-800 group-hover:border-gold-500/20 transition-colors mt-auto">
              <Link 
                href={service.link} 
                className="inline-flex items-center gap-2 text-sm font-bold text-gold-400 hover:text-gold-300 transition-colors uppercase tracking-wider"
              >
                Explore Protocol <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA Section */}
      <div className="relative rounded-3xl overflow-hidden bg-navy-900 border border-gold-500/20 p-10 md:p-16 text-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80')] opacity-5 bg-cover bg-center" />
        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Need a Specialized Strategy?</h2>
          <p className="text-gray-400">
            Schedule a one-on-one session with our senior consultants to audit your profile and design a structured path for your visa or corporate travel needs.
          </p>
          <div className="pt-4">
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold uppercase tracking-widest text-sm transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transform hover:-translate-y-1"
            >
              Book Initial Consultation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}