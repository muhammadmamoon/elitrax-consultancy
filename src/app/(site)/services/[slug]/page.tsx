import Image from "next/image";
import Link from "next/link";
import ContactForm from "../../contact/page";
import { ArrowLeft, CheckCircle2, ChevronRight, FileCheck, ShieldCheck } from "lucide-react";

export default async function StaticServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const currentSlug = resolvedParams.slug;

  // Static Fallback Data (Database connect hone tak yeh show hoga)
  const service = {
    title: currentSlug.replace(/-/g, " ").toUpperCase(),
    heroImage:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    overview:
      "We provide high-tier regulatory compliance and application structuring. Our consultants audit your profile, extract necessary documentation, and build a risk-averse pathway for your global mobility goals.",
    keyBenefits: [
      "End-to-End Documentation Auditing",
      "Strategic Profile Risk Assessment",
      "Dedicated Senior Consultant",
      "Priority Application Filing Support",
    ],
    processSteps: [
      {
        title: "Initial Profile Assessment",
        description:
          "A comprehensive review of your current standing, financial solvency, and travel history.",
      },
      {
        title: "Strategy & Documentation",
        description:
          "Gathering and structuring all mandatory and supporting documents to align with consulate requirements.",
      },
      {
        title: "Application Filing",
        description:
          "Precision data entry and submission of your file to the respective embassy or high commission.",
      },
      {
        title: "Interview Prep & Dispatch",
        description:
          "Mock interview sessions (if required) and final application dispatch tracking.",
      },
    ],
  };

  return (
    <div className="pt-24 pb-24">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full flex items-center justify-center overflow-hidden border-b border-gold-500/20">
        <Image
          src={service.heroImage}
          alt={service.title}
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-navy-950/70" />

        <div className="relative z-10 text-center max-w-4xl px-6 space-y-4 mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gold-400 hover:text-gold-300 uppercase tracking-widest mb-2 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Services
          </Link>
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-lg bg-gold-500/20 border border-gold-500/50 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-gold-400" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            {service.title}
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Details & Steps */}
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 border-l-4 border-gold-500 pl-4">
              Service Overview
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              {service.overview}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-gold-500 pl-4">
              Execution Protocol
            </h2>
            <div className="space-y-6">
              {service.processSteps.map((step, idx) => (
                <div
                  key={step.title}
                  className="flex gap-4 p-6 rounded-xl bg-navy-900/40 border border-navy-800"
                >
                  <div className="w-10 h-10 rounded-full bg-navy-950 border border-gold-500/30 flex items-center justify-center text-gold-400 font-bold flex-shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{step.title}</h3>
                    <p className="text-gray-400 text-sm mt-1 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Sidebar / Contact */}
        <div className="space-y-8">
          {/* Key Benefits Card */}
          <div className="p-8 rounded-2xl bg-navy-900 border border-navy-800 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-gold-400" /> Key Deliverables
            </h3>
            <ul className="space-y-4">
              {service.keyBenefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-3 text-sm text-gray-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Contact Form */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-gold-600 to-gold-400 text-navy-950 shadow-[0_0_30px_rgba(212,175,55,0.15)] relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl font-extrabold mb-2">Initiate Consultation</h3>
              <p className="text-navy-900 text-sm mb-6 font-medium">
                Connect with our senior analysts to evaluate your specific case.
              </p>

              <Link
                href="/contact"
                className="w-full flex items-center justify-between px-6 py-3.5 bg-navy-950 text-white rounded-xl font-bold uppercase tracking-wider text-xs hover:bg-navy-900 transition-colors"
              >
                Proceed to Secure Form <ChevronRight className="w-4 h-4 text-gold-400" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-5xl mx-auto px-6 mt-16">
        <ContactForm />
      </div>
    </div>
  );
}