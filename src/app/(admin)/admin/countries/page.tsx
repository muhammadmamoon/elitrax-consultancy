// src/app/(admin)/admin/countries/page.tsx
import { db } from "../../../lib/db";
import Link from "next/link";
import { Plus, Globe, Edit2, Trash2, Eye } from "lucide-react";
import Image from "next/image";

export default async function AdminCountriesPage() {
  const countries = await db.country.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Globe className="w-6 h-6 text-gold-500" /> Destination Frameworks
          </h1>
          <p className="text-xs text-gray-400 mt-1">Manage supported countries and visa guidelines.</p>
        </div>
        <button className="px-4 py-2 bg-gold-500 hover:bg-gold-400 text-navy-950 text-sm font-bold rounded-lg flex items-center gap-2 transition opacity-50 cursor-not-allowed" title="Available in expanded phase">
          <Plus className="w-4 h-4" /> Add Country
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {countries.map((country:any) => (
          <div key={country.id} className="bg-navy-900 border border-navy-800 rounded-xl overflow-hidden flex flex-col">
            <div className="relative h-32 w-full">
              <Image src={country.heroImageUrl} alt={country.name} fill className="object-cover brightness-50" />
              <div className="absolute top-4 left-4 text-3xl">{country.flagUrl}</div>
              <div className="absolute top-4 right-4 bg-navy-950/80 px-2 py-1 rounded text-xs text-gold-400 font-bold border border-gold-500/20 backdrop-blur-sm">
                {country.code}
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-lg font-bold text-white mb-2">{country.name}</h3>
              <p className="text-xs text-gray-400 line-clamp-2 flex-1 mb-4">{country.overview}</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-navy-800">
                <span className={`text-xs font-semibold ${country.isActive ? 'text-emerald-400' : 'text-red-400'}`}>
                  {country.isActive ? "Active" : "Disabled"}
                </span>
                <div className="flex gap-2">
                  <Link href={`/countries/${country.slug}`} target="_blank" className="p-1.5 text-gray-400 hover:text-white transition bg-navy-950 rounded">
                    <Eye className="w-4 h-4" />
                  </Link>
                  <button className="p-1.5 text-gray-400 hover:text-gold-400 transition bg-navy-950 rounded">
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}