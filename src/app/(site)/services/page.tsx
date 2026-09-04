import Link from "next/link";
import { db } from "../../lib/db";
import { Briefcase, Globe2, ArrowRight, ShieldCheck } from "lucide-react";

export const revalidate = 0;

export default async function ServicesPage() {
  // Database se Visa Services include Country fetch karna
  const services = await db.visaService.findMany({
    include: { country: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-navy-950 text-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-gold-400 text-xs font-bold uppercase tracking-widest bg-gold-500/10 px-3 py-1 rounded-full border border-gold-500/20">
            Visa Facilitation
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Comprehensive Visa Solutions
          </h1>
          <p className="text-gray-400 text-base">
            Expert assistance for tourist, business, study, and pilgrimage visas worldwide.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.length === 0 ? (
            <div className="col-span-full text-center py-16 text-gray-400 bg-navy-900/50 rounded-2xl border border-navy-800">
              No visa services currently listed.
            </div>
          ) : (
            services.map((service) => {
              const reqs = Array.isArray(service.requirements)
                ? (service.requirements as string[])
                : [];

              return (
                <div
                  key={service.id}
                  className="bg-navy-900/70 border border-navy-800 hover:border-gold-500/40 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xl group"
                >
                  <div className="space-y-4">
                    {/* Category Badge & Country */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-gold-400 bg-navy-950 border border-navy-700 px-3 py-1 rounded-full">
                        {service.category.replace("_", " ")}
                      </span>
                      {service.country?.name && (
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                          <Globe2 className="w-3.5 h-3.5 text-gold-400" />
                          <span>{service.country.name}</span>
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white group-hover:text-gold-400 transition-colors flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-gold-500 flex-shrink-0" />
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 text-xs leading-relaxed line-clamp-3">
                      {service.description}
                    </p>

                    {/* Requirements Preview */}
                    {reqs.length > 0 && (
                      <div className="space-y-1.5 pt-2">
                        <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                          Key Requirements:
                        </span>
                        <ul className="space-y-1">
                          {reqs.slice(0, 3).map((r) => (
                            <li key={r} className="flex items-center gap-2 text-xs text-gray-300">
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                              <span className="truncate">{r}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <div className="pt-6 mt-6 border-t border-navy-800 flex justify-end">
                    <Link
                      href={`/contact?service=${encodeURIComponent(service.title)}`}
                      className="w-full text-center inline-flex items-center justify-center gap-2 bg-navy-950 hover:bg-gold-500 hover:text-navy-950 border border-gold-500/30 text-gold-400 text-xs font-bold px-4 py-2.5 rounded-lg uppercase tracking-wider transition duration-200"
                    >
                      Apply / Inquire <ArrowRight className="w-3.5 h-3.5" />
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