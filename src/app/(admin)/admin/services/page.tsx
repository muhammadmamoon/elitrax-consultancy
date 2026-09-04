"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Briefcase, Loader2 } from "lucide-react";

interface VisaServiceItem {
  id: string;
  title: string;
  category: string;
  country?: {
    name: string;
  } | null;
}

export default function ServicesListPage() {
  const [services, setServices] = useState<VisaServiceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Error-free Data Fetching
  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => {
        setServices(Array.isArray(data) ? data : []);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  // Delete Function (Optimized)
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this service?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/services?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Service deleted successfully!");
        setServices((prev) => prev.filter((service) => service.id !== id));
      } else {
        alert("Failed to delete service.");
      }
    } catch {
      alert("Error deleting service.");
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 p-6 md:p-10 text-gray-100">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <Briefcase className="w-8 h-8 text-gold-500" /> Manage Visa Services
            </h1>
            <p className="text-gray-400 mt-2">
              View, update, or delete your visa services.
            </p>
          </div>

          <Link
            href="/admin/services/new"
            className="flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold px-6 py-3 rounded-lg uppercase tracking-wider text-sm transition-all shadow-[0_0_15px_rgba(212,175,55,0.2)]"
          >
            <Plus className="w-5 h-5" /> Add New Service
          </Link>
        </div>

        {/* Table Container */}
        <div className="bg-navy-900/60 border border-navy-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-navy-900/80 border-b border-navy-700">
                  <th className="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Country
                  </th>
                  <th className="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-800">
                {isLoading ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-gray-400">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-gold-500" />
                      Loading services...
                    </td>
                  </tr>
                ) : services.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-gray-400">
                      No Visa Services found. Click &quot;Add New Service&quot; to create one.
                    </td>
                  </tr>
                ) : (
                  services.map((service) => (
                    <tr
                      key={service.id}
                      className="hover:bg-navy-800/50 transition-colors"
                    >
                      <td className="p-4 text-white font-medium">
                        {service.title}
                      </td>
                      <td className="p-4">
                        <span className="px-3 py-1 rounded-full bg-navy-800 text-gold-400 text-xs font-bold uppercase tracking-wider">
                          {service.category}
                        </span>
                      </td>
                      <td className="p-4 text-gray-300">
                        {service.country?.name || "Unknown"}
                      </td>
                      <td className="p-4 flex items-center justify-end gap-3">
                        <Link
                          href={`/admin/services/edit/${service.id}`}
                          className="text-gray-400 hover:text-white transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-5 h-5" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(service.id)}
                          className="text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}