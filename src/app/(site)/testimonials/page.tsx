"use client";

import { useEffect, useState } from "react";
import { 
  Play, 
  Quote, 
  Globe2, 
  Briefcase, 
  X, 
  Sparkles, 
  Loader2,
  Star
} from "lucide-react";

interface TestimonialItem {
  id: string;
  clientName: string;
  country: string;
  serviceUsed: string;
  comment: string;
  rating?: number;
  videoUrl?: string | null;
  thumbnailUrl?: string | null;
  avatarUrl?: string | null;
  isApproved: boolean;
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        const approved = Array.isArray(data) ? data.filter((t) => t.isApproved) : [];
        setTestimonials(approved);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const getYouTubeId = (url?: string | null) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-gray-100 py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-bold uppercase tracking-widest shadow-inner">
            <Sparkles className="w-3.5 h-3.5" /> Client Experiences
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Journeys of Faith &amp; Success
          </h1>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            Watch real client video endorsements and read verified testimonials from pilgrims and travelers across the globe.
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400 space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-gold-500" />
            <span className="text-sm tracking-wide">Loading client stories...</span>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-20 bg-[#0d1322] border border-gray-800 rounded-3xl max-w-xl mx-auto">
            <p className="text-gray-400 text-sm">No testimonials published yet.</p>
          </div>
        ) : (
          /* Testimonials Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((item) => {
              const ytId = getYouTubeId(item.videoUrl);
              const thumbnail =
                item.thumbnailUrl ||
                (ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : null);

              return (
                <div
                  key={item.id}
                  className="bg-[#0b1120] border border-gray-800/80 hover:border-gold-500/50 rounded-2xl overflow-hidden flex flex-col justify-between shadow-2xl transition-all duration-300 hover:-translate-y-1.5 group"
                >
                  <div>
                    {/* Video Banner Container */}
                    <div 
                      onClick={() => ytId && setActiveVideo(ytId)}
                      onKeyDown={(e) => {
                        if (ytId && (e.key === "Enter" || e.key === " ")) {
                          setActiveVideo(ytId);
                        }
                      }}
                      role={ytId ? "button" : undefined}
                      tabIndex={ytId ? 0 : undefined}
                      className={`relative w-full h-52 overflow-hidden bg-gray-900 border-b border-gray-800/60 ${ytId ? "cursor-pointer" : ""}`}
                    >
                      {thumbnail ? (
                        <img
                          src={thumbnail}
                          alt={item.clientName}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90 group-hover:brightness-100"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0c1427] to-[#080d1a] p-4 text-center">
                          <Quote className="w-10 h-10 text-gold-500/20 mb-2" />
                          <span className="text-xs text-gray-500 tracking-wider font-semibold uppercase">Verified Client Story</span>
                        </div>
                      )}

                      {/* Video Play Overlay */}
                      {ytId && (
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 flex items-center justify-center transition-all">
                          <div className="w-14 h-14 rounded-full bg-gold-500 text-navy-950 flex items-center justify-center shadow-lg shadow-gold-500/30 group-hover:scale-110 transition-transform">
                            <Play className="w-6 h-6 fill-navy-950 ml-1 text-navy-950" />
                          </div>
                          <span className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold px-2 py-1 rounded-md">
                            Click to Watch
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content Area */}
                    <div className="p-6 space-y-4">
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1.5 font-bold text-gold-400 bg-gold-500/10 border border-gold-500/20 px-3 py-1 rounded-full">
                          <Briefcase className="w-3.5 h-3.5" />
                          {item.serviceUsed}
                        </span>
                        <span className="flex items-center gap-1 text-gray-400 font-medium">
                          <Globe2 className="w-3.5 h-3.5 text-gray-500" />
                          {item.country}
                        </span>
                      </div>

                      {/* Star Rating */}
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < (item.rating || 5)
                                ? "fill-gold-400 text-gold-400"
                                : "text-gray-700"
                            }`}
                          />
                        ))}
                      </div>

                      {/* Comment */}
                      <p className="text-gray-300 text-sm italic line-clamp-3 leading-relaxed">
                        &quot;{item.comment}&quot;
                      </p>
                    </div>
                  </div>

                  {/* Client Info Footer */}
                  <div className="px-6 py-4 bg-[#080d19]/80 border-t border-gray-800/80 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-amber-600 text-navy-950 font-black text-sm flex items-center justify-center flex-shrink-0 shadow-md">
                      {item.clientName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-gold-400 transition-colors">
                        {item.clientName}
                      </h4>
                      <span className="text-[11px] text-emerald-400 font-semibold block">
                        Verified Traveler
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Video Modal Popup */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
            <button
              type="button"
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/60 hover:bg-gold-500 hover:text-navy-950 text-white rounded-full transition cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative pt-[56.25%]">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0`}
                title="Client Video Review"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}