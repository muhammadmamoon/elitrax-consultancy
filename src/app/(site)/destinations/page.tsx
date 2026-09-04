import Link from "next/link";
import { db } from "../../lib/db";
import { ArrowRight, ShieldCheck } from "lucide-react";

export const revalidate = 0; // Fresh database data on every request

export default async function DestinationsPage() {
  const countries = await db.country.findMany({
    where: { isActive: true },
    include: {
      visaServices: {
        select: {
          id: true,
          title: true,
          category: true,
        },
      },
    },
    orderBy: [{ order: "asc" }, { name: "asc" }],
  });

  return (
    <div className="min-h-screen bg-navy-950 text-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-gold-400 text-xs font-bold uppercase tracking-widest bg-gold-500/10 px-3 py-1 rounded-full border border-gold-500/20">
            Global Horizons
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Destinations &amp; Visa Portals
          </h1>
          <p className="text-gray-400 text-base">
            Select a destination to view verified immigration, business, and tourist visa pathways.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {countries.length === 0 ? (
            <div className="col-span-full text-center py-16 text-gray-400 bg-navy-900/50 rounded-2xl border border-navy-800">
              No destinations listed yet. Add countries via the Admin Panel.
            </div>
          ) : (
            countries.map((country) => (
              <div
                key={country.id}
                className="bg-navy-900/70 border border-navy-800 hover:border-gold-500/40 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-xl group"
              >
                {/* Hero Banner Preview */}
                <div className="relative h-44 w-full overflow-hidden bg-navy-950">
                  <img
                    src={country.heroImageUrl}
                    alt={country.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90 group-hover:brightness-100"
                  />
                  <div className="absolute top-3 left-3 bg-navy-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-navy-700 flex items-center gap-2">
                    <img
                      src={country.flagUrl}
                      alt={`${country.name} Flag`}
                      className="w-5 h-3.5 object-cover rounded-sm"
                    />
                    <span className="text-xs font-bold text-gold-400 font-mono">
                      {country.code}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-gold-400 transition-colors">
                        {country.name}
                      </h3>
                      <p className="line-clamp-2 text-xs text-gray-400 mt-1 leading-relaxed">
                        {country.overview}
                      </p>
                    </div>

                    <div className="pt-2 space-y-2">
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
                        Available Visas ({country.visaServices.length}):
                      </span>
                      {country.visaServices.length === 0 ? (
                        <p className="text-xs text-gray-500 italic">No services linked yet.</p>
                      ) : (
                        <ul className="space-y-1.5">
                          {country.visaServices.map((srv) => (
                            <li key={srv.id} className="flex items-center gap-2 text-xs text-gray-300">
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                              <span className="truncate">{srv.title}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-navy-800 flex justify-end">
                    <Link
                      href={`/services?country=${encodeURIComponent(country.id)}`}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-400 hover:text-gold-300 transition"
                    >
                      View Services <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}