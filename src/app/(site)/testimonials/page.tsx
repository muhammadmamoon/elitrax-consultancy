// src/app/(site)/testimonials/page.tsx
import { db } from "../../lib/db";
import VideoModal from "../../components/ui/VideoModal";
import { MessageSquareQuote, Star } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "Client Case Studies & Testimonials | ELITRAX",
};

export default async function TestimonialsPage() {
  // Fetch only approved testimonials
  const testimonials = await db.testimonial.findMany({
    where: { isApproved: true },
    orderBy: { order: "asc" },
  });

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <div className="max-w-3xl mb-16 text-center mx-auto">
        <MessageSquareQuote className="w-10 h-10 text-gold-500 mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
          Client Success Records
        </h1>
        <p className="text-gray-400 text-lg">
          Direct insights from executives, students, and travelers who trusted ELITRAX with their mobility frameworks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((t:any) => (
          <div key={t.id} className="bg-navy-900/50 border border-navy-800 rounded-2xl p-6 flex flex-col hover:border-gold-500/30 transition">
            {t.videoUrl && t.thumbnailUrl && (
              <div className="mb-6">
                <VideoModal videoUrl={t.videoUrl} thumbnailUrl={t.thumbnailUrl} clientName={t.clientName} />
              </div>
            )}
            {!t.videoUrl && (
              <div className="flex text-gold-400 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
            )}
            <p className="text-sm text-gray-300 italic leading-relaxed flex-1 mb-6">
              "{t.comment}"
            </p>
            <div className="flex items-center gap-3 border-t border-navy-800 pt-4">
              <div className="w-10 h-10 rounded-full bg-navy-800 flex items-center justify-center font-bold text-gold-500 uppercase">
                {t.clientName.charAt(0)}
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">{t.clientName}</h4>
                <p className="text-xs text-gold-400">{t.serviceUsed} • {t.country}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {testimonials.length === 0 && (
        <div className="text-center py-20 border border-navy-800 rounded-2xl bg-navy-900/30">
          <p className="text-gray-400">Testimonials are currently being updated.</p>
        </div>
      )}
    </div>
  );
}