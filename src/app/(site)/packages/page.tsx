import Link from "next/link";
import { db } from "../../lib/db"; 
import { Clock, MapPin, CheckCircle, ArrowRight } from "lucide-react";

export const revalidate = 0; // Har request par fresh data layega

export default async function PackagesPage() {
  const packages = await db.package.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-navy-950 text-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-gold-400 text-xs font-bold uppercase tracking-widest bg-gold-500/10 px-3 py-1 rounded-full border border-gold-500/20">
            Curated Journeys
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Explore Travel &amp; Umrah Packages
          </h1>
          <p className="text-gray-400 text-base">
            Discover bespoke itineraries crafted for comfort, spirituality, and luxury.
          </p>
        </div>

        {/* Dynamic Package Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.length === 0 ? (
            <div className="col-span-full text-center py-16 text-gray-400 bg-navy-900/50 rounded-2xl border border-navy-800">
              No packages currently available. Please check back soon!
            </div>
          ) : (
            packages.map((pkg) => {
              const includedItems = Array.isArray(pkg.included)
                ? (pkg.included as string[])
                : [];

              return (
                <div
                  key={pkg.id}
                  className="bg-navy-900/70 border border-navy-800 hover:border-gold-500/40 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xl group"
                >
                  <div className="space-y-4">
                    {/* Category & Status */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-gold-400 bg-navy-950 border border-navy-700 px-3 py-1 rounded-full">
                        {pkg.category}
                      </span>
                      {pkg.isFeatured && (
                        <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          Featured
                        </span>
                      )}
                    </div>

                    {/* Title & Destination */}
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-gold-400 transition-colors">
                        {pkg.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-gold-400" />
                        <span>{pkg.destination}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 text-xs line-clamp-3 leading-relaxed">
                      {pkg.description}
                    </p>

                    {/* Duration */}
                    <div className="flex items-center gap-2 text-xs text-gray-300 bg-navy-950/60 p-2.5 rounded-lg border border-navy-800">
                      <Clock className="w-4 h-4 text-gold-400" />
                      <span>Duration: <strong>{pkg.duration}</strong></span>
                    </div>

                    {/* Features (Included) Preview */}
                    {includedItems.length > 0 && (
                      <div className="space-y-1.5 pt-2">
                        <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                          Highlights:
                        </span>
                        <ul className="space-y-1">
                          {includedItems.slice(0, 3).map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-xs text-gray-300">
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                              <span className="truncate">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Pricing & CTA */}
                  <div className="pt-6 mt-6 border-t border-navy-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase text-gray-500 font-semibold block">Starting from</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-gold-400">
                          ${Number(pkg.price)}
                        </span>
                        {pkg.discount && (
                          <span className="text-xs text-gray-500 line-through">
                            ${Number(pkg.discount)}
                          </span>
                        )}
                      </div>
                    </div>

                    <Link
                      href={`/contact?package=${encodeURIComponent(pkg.title)}`}
                      className="inline-flex items-center gap-1.5 bg-gold-500 hover:bg-gold-400 text-navy-950 text-xs font-bold px-4 py-2.5 rounded-lg uppercase tracking-wider transition"
                    >
                      Book Now <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}