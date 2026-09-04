"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Save, Box, Loader2 } from "lucide-react";

export default function NewPackagePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "UMRAH",
    destination: "",
    price: "",
    duration: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/packages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/admin/packages");
        router.refresh();
      } else {
        alert("Failed to save the package.");
      }
    } catch {
      alert("An error occurred while saving.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              href="/admin/packages"
              className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 text-sm font-semibold uppercase tracking-wider mb-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Packages
            </Link>
            <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <Box className="w-8 h-8 text-gold-500" /> Create New Package
            </h1>
          </div>
        </div>

        <div className="bg-navy-900/60 border border-navy-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Package Title
                </label>
                <input
                  required
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Executive Royal Umrah"
                  className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors"
                >
                  <option value="UMRAH">Umrah Package</option>
                  <option value="TOUR">International Tour</option>
                  <option value="VISA">Visa Service</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Destination
                </label>
                <input
                  required
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  placeholder="e.g. Makkah and Madinah"
                  className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Price (USD)
                </label>
                <input
                  required
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g. 4950"
                  className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Duration
              </label>
              <input
                required
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g. 12 Days / 11 Nights"
                className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Description
              </label>
              <textarea
                required
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Detailed overview of the itinerary..."
                className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-4 pt-6 border-t border-navy-800">
              <Link
                href="/admin/packages"
                className="px-6 py-3 text-sm font-bold text-gray-300 hover:text-white uppercase tracking-wider transition-colors"
              >
                Cancel
              </Link>
              <button
                disabled={isLoading}
                type="submit"
                className="flex items-center gap-2 bg-gold-500 hover:bg-gold-400 disabled:opacity-50 disabled:cursor-not-allowed text-navy-950 font-bold px-8 py-3 rounded-lg uppercase tracking-wider text-sm transition-all shadow-[0_0_15px_rgba(212,175,55,0.2)] cursor-pointer"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {isLoading ? "Saving..." : "Save Package"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}