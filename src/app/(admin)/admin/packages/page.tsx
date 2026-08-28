// src/app/(admin)/admin/packages/page.tsx
import { db } from "../../../lib/db";
import Link from "next/link";
import { Plus, Edit2, Trash2, CheckCircle, XCircle } from "lucide-react";

export default async function AdminPackagesPage() {
  const packages = await db.package.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Package Management</h1>
          <p className="text-xs text-gray-400">Create and manage travel and Umrah itineraries.</p>
        </div>
        <Link 
          href="/admin/packages/new" 
          className="px-4 py-2 bg-gold-500 hover:bg-gold-400 text-navy-950 text-sm font-bold rounded-lg flex items-center gap-2 transition"
        >
          <Plus className="w-4 h-4" /> New Package
        </Link>
      </div>

      <div className="bg-navy-900 border border-navy-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-navy-950 text-gray-400 text-xs uppercase tracking-wider border-b border-navy-800">
              <tr>
                <th className="px-6 py-4">Title & Destination</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-800">
              {packages.map((pkg:any) => (
                <tr key={pkg.id} className="hover:bg-navy-800/50 transition">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-white">{pkg.title}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{pkg.destination}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-navy-800 rounded text-xs border border-navy-700">
                      {pkg.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-gold-400">
                    ${Number(pkg.price)}
                  </td>
                  <td className="px-6 py-4">
                    {pkg.isActive ? (
                      <span className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold">
                        <CheckCircle className="w-4 h-4" /> Active
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-red-400 text-xs font-semibold">
                        <XCircle className="w-4 h-4" /> Inactive
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right flex items-center justify-end gap-3">
                    <Link href={`/admin/packages/${pkg.id}/edit`} className="text-gray-400 hover:text-gold-400 transition">
                      <Edit2 className="w-4 h-4" />
                    </Link>
                    <button className="text-gray-400 hover:text-red-400 transition">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {packages.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No packages found. Click "New Package" to add one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}