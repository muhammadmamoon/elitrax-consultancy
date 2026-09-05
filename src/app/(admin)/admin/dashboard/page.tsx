// cspell:words ELITRAX

export const dynamic = "force-dynamic";
import Link from "next/link";
import { Package, Globe, MessageSquare, ShieldCheck } from "lucide-react";
import { db } from "../../../lib/db";

export default async function AdminDashboardPage() {
  const [packageCount, countryCount, inquiryCount, pendingInquiries] = await Promise.all([
    db.package.count(),
    db.country.count(),
    db.inquiry.count(),
    db.inquiry.count({ where: { status: "NEW" } }),
  ]);

  const stats = [
    { title: "Total Packages", val: packageCount, icon: Package, href: "/admin/packages" },
    { title: "Active Destinations", val: countryCount, icon: Globe, href: "/admin/countries" },
    { title: "Total Inquiries", val: inquiryCount, icon: MessageSquare, href: "/admin/inquiries" },
    { title: "Pending Audits", val: pendingInquiries, icon: ShieldCheck, href: "/admin/inquiries", highlight: true },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Executive Control Console</h1>
        <p className="text-xs text-gray-400 mt-1">Operational metrics for ELITRAX Consultancy.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.title}
              href={s.href}
              className={`p-6 rounded-2xl border transition-all ${
                s.highlight
                  ? "bg-gold-500/10 border-gold-500/40 hover:bg-gold-500/20"
                  : "bg-navy-900/60 border-navy-800 hover:border-navy-700"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold text-gray-400">{s.title}</span>
                <Icon className={`w-5 h-5 ${s.highlight ? "text-gold-400" : "text-gray-400"}`} />
              </div>
              <p className="text-3xl font-extrabold text-white mt-4">{s.val}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}