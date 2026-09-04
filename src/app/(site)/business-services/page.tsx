// cspell:words ELITRAX
import { Briefcase, Building2, FileSignature, Presentation } from "lucide-react";
import ContactForm from "../contact/page";

export const metadata = {
  title: "Corporate & Business Services | ELITRAX Consultancy",
  description:
    "Enterprise travel management, business invitations, and expo delegation assistance.",
};

export default function BusinessServicesPage() {
  const corporateServices = [
    {
      title: "Business Invitation Sourcing",
      desc: "Procurement and verification of formal business invitations required for cross-border commercial visas.",
      icon: FileSignature,
    },
    {
      title: "Conference & Expo Delegation",
      desc: "Comprehensive registration and visa profiling for teams attending international summits.",
      icon: Presentation,
    },
    {
      title: "Enterprise Travel Management",
      desc: "End-to-end logistics including VIP flight booking, executive transfers, and luxury accommodation.",
      icon: Building2,
    },
    {
      title: "Document Attestation",
      desc: "Legalization and formal attestation routing for corporate and personal credentials.",
      icon: Briefcase,
    },
  ];

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight max-w-4xl leading-tight">
          Enterprise Logistics &amp; <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600">
            Corporate Mobility
          </span>
        </h1>
        <p className="text-gray-400 text-lg mt-6 max-w-2xl">
          Dedicated B2B frameworks designed to facilitate seamless international business operations, executive transitions, and global summit attendance.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
        {corporateServices.map((svc) => {
          const Icon = svc.icon;
          return (
            <div
              key={svc.title}
              className="p-8 rounded-2xl bg-gradient-to-b from-navy-900 to-navy-950 border border-navy-800"
            >
              <Icon className="w-8 h-8 text-gold-400 mb-6" />
              <h3 className="text-lg font-bold text-white mb-2">{svc.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{svc.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white">Initiate Corporate File</h2>
          <p className="text-gray-400 mt-2">Connect with our enterprise relations team.</p>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}