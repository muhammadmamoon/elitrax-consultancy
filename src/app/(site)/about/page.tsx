// cspell:words ELITRAX
import Image from "next/image";
import { Target, Shield } from "lucide-react";

export const metadata = {
  title: "About Us | ELITRAX Consultancy",
  description:
    "Learn about ELITRAX Consultancy, our mission, vision, and core values in premium travel and visa consulting.",
};

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white">
              Redefining <span className="text-gold-400">Global Mobility</span>
            </h1>
            <p className="text-gray-300 leading-relaxed text-lg font-light">
              ELITRAX Consultancy was founded on the principle that international borders should not be barriers to ambition. We provide meticulous, high-tier visa filing and travel logistics for discerning individuals and corporations.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Unlike standard agencies, our approach is rooted in profound regulatory comprehension. Whether structuring a complex academic permit for Canada, arranging VIP Umrah logistics in Saudi Arabia, or securing corporate access to the Schengen area, our team executes with absolute precision.
            </p>
            
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-navy-800">
              <div>
                <p className="text-3xl font-bold text-white mb-1">98%</p>
                <p className="text-xs uppercase text-gold-400 tracking-wider">File Accuracy Rating</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white mb-1">15+</p>
                <p className="text-xs uppercase text-gold-400 tracking-wider">Global Jurisdictions</p>
              </div>
            </div>
          </div>

          <div className="relative h-[500px] rounded-2xl overflow-hidden border border-gold-500/20 shadow-2xl">
            <Image 
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80" 
              alt="Corporate Consultation"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-navy-950/20" />
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-24">
          <div className="p-10 bg-navy-900/50 rounded-2xl border border-navy-800">
            <Target className="w-10 h-10 text-gold-500 mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
            <p className="text-gray-400 leading-relaxed">
              To dismantle the complexities of international travel and immigration documentation by providing transparent, highly strategic, and personalized consulting frameworks for every client.
            </p>
          </div>
          <div className="p-10 bg-navy-900/50 rounded-2xl border border-navy-800">
            <Shield className="w-10 h-10 text-gold-500 mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
            <p className="text-gray-400 leading-relaxed">
              To be recognized as the premier global standard in luxury travel architecture and authoritative visa consulting, built purely on trust, privacy, and impeccable execution.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}