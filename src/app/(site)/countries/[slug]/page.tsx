import Image from "next/image";
import ContactForm from "../../../components/ui/ContactForm";
import { Check, HelpCircle, FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";

// Component ko 'async' banaya aur params ko Promise ki type di
export default async function StaticCountryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  // Params ko await kar ke slug extract kiya
  const resolvedParams = await params;
  const currentSlug = resolvedParams.slug;

  // Static Fallback Data
  const country = {
    name: currentSlug.toUpperCase(),
    flagUrl: "🌎",
    heroImageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80",
    overview: "Comprehensive visa and migration consultancy. Specialized guidance for visits, business, and study pathways with elite verification standards.",
    visaServices: [
      {
        id: "1",
        category: "VISIT_VISA",
        title: "Visit Visa Consultation",
        description: "End-to-end documentation auditing, itinerary structuring, and application filing assistance.",
        requirements: ["Valid Passport (6+ Months)", "Financial Records (6 Months)", "Ties to Home Country Verification", "Cover Letter & Travel Deck"]
      },
      {
        id: "2",
        category: "STUDY_VISA",
        title: "Study Visa Track",
        description: "Academic application alignment, financial sponsorship structuring, and permit processing support.",
        requirements: ["Acceptance Letter (LOA/CAS/I-20)", "Academic Transcripts", "Language Proficiency Proof", "Financial Solvency Proof"]
      }
    ],
    faqs: [
      {
        id: "f1",
        question: "What is the standard processing duration?",
        answer: "Processing periods are governed directly by the respective consulate authorities. We ensure accurate filing to avoid preventable delays."
      },
      {
        id: "f2",
        question: "Are visa approvals guaranteed?",
        answer: "No consultancy can ethically guarantee visa issuance. ELITRAX offers high-tier regulatory compliance, application structuring, and risk reduction."
      }
    ]
  };

  return (
    <div className="pt-24 pb-24">
      {/* Hero Section */}
      <div className="relative h-[450px] w-full flex items-center justify-center overflow-hidden border-b border-gold-500/20">
        <Image src={country.heroImageUrl} alt={country.name} fill priority className="object-cover brightness-50" />
        <div className="absolute inset-0 bg-navy-950/70" />
        
        <div className="relative z-10 text-center max-w-4xl px-6 space-y-4 mt-12">
          <Link href="/countries" className="inline-flex items-center gap-2 text-xs font-semibold text-gold-400 hover:text-gold-300 uppercase tracking-widest mb-2 transition">
            <ArrowLeft className="w-4 h-4" /> Return to Destinations
          </Link>
          <div className="text-5xl mb-2">{country.flagUrl}</div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
            {country.name} Visa Consultancy
          </h1>
          <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed mt-4">
            {country.overview}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-16 space-y-20">
        {/* Visa Services Section */}
        <section className="space-y-8">
          <h2 className="text-2xl font-bold text-white border-l-4 border-gold-500 pl-4">
            Available Application Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {country.visaServices.map((svc) => (
              <div key={svc.id} className="p-8 rounded-2xl bg-navy-900/60 border border-navy-800 space-y-6 hover:border-gold-500/30 transition">
                <div>
                  <span className="text-xs uppercase font-bold text-gold-400 tracking-wider">
                    {svc.category.replace("_", " ")}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-2">{svc.title}</h3>
                  <p className="text-sm text-gray-300 mt-2 leading-relaxed">{svc.description}</p>
                </div>

                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-gray-400 mb-3 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-gold-400" /> Key Required Documentation
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    {svc.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white border-l-4 border-gold-500 pl-4">
            Jurisdiction FAQs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {country.faqs.map((faq) => (
              <div key={faq.id} className="p-6 rounded-xl bg-navy-900/40 border border-navy-800 space-y-2">
                <h3 className="font-semibold text-white text-sm flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                  <span>{faq.question}</span>
                </h3>
                <p className="text-xs text-gray-400 pl-6 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="space-y-6">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="text-3xl font-bold text-white">
              Apply for {country.name} Representation
            </h2>
            <p className="text-gray-400 mt-2">
              Submit your preliminary details for strategic file review.
            </p>
          </div>
          <ContactForm />
        </section>
      </div>
    </div>
  );
}