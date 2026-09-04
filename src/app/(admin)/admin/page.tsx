// cspell:words ELITRAX
import { 
  Briefcase, 
  Package, 
  Globe2 
} from "lucide-react";
import Link from "next/link";
import { db } from "../../lib/db";

export default async function AdminDashboardPage() {
  // Stats count fetch karna
  const [totalPackages, totalServices, totalCountries] = await Promise.all([
    db.package.count().catch(() => 0),
    db.visaService.count().catch(() => 0),
    db.country.count().catch(() => 0),
  ]);

  const cards = [
    { title: "Total Packages", value: totalPackages, href: "/admin/packages", icon: Package, color: "text-amber-400" },
    { title: "Visa Services", value: totalServices, href: "/admin/services", icon: Briefcase, color: "text-blue-400" },
    { title: "Countries", value: totalCountries, href: "/admin/countries", icon: Globe2, color: "text-emerald-400" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Dashboard Overview</h1>
        <p className="text-gray-400 text-sm mt-1">Welcome back to the ELITRAX management console.</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              href={card.href}
              className="bg-navy-900/60 border border-navy-800 hover:border-navy-700 p-6 rounded-2xl transition block group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">{card.title}</span>
                <Icon className={`w-5 h-5 ${card.color}`} />
              </div>
              <div className="text-3xl font-black text-white group-hover:text-gold-400 transition">
                {card.value}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}