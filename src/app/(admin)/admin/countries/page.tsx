"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Save, Globe2, Loader2 } from "lucide-react";

export default function NewCountryPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  // State updated to match your Prisma Schema
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    flagUrl: "",
    heroImageUrl: "",
    overview: "",
    order: "0"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/countries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/admin/dashboard"); // Wapas dashboard pe
        router.refresh(); 
      } else {
        alert("Failed to save the country. Check console for errors.");
      }
    } catch (error) {
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
            <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 text-sm font-semibold uppercase tracking-wider mb-2 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </Link>
            <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <Globe2 className="w-8 h-8 text-gold-500" /> Add New Country
            </h1>
          </div>
        </div>

        <div className="bg-navy-900/60 border border-navy-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Country Name</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Saudi Arabia" className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Country Code (Unique)</label>
                <input required type="text" name="code" value={formData.code} onChange={handleChange} placeholder="e.g. KSA, UAE, UK" className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 uppercase" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Flag Image URL</label>
                <input required type="text" name="flagUrl" value={formData.flagUrl} onChange={handleChange} placeholder="e.g. https://domain.com/flag.png" className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Display Order</label>
                <input required type="number" name="order" value={formData.order} onChange={handleChange} placeholder="0" className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Hero Image URL</label>
              <input required type="text" name="heroImageUrl" value={formData.heroImageUrl} onChange={handleChange} placeholder="e.g. https://images.unsplash.com/..." className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Overview / Description</label>
              <textarea required name="overview" value={formData.overview} onChange={handleChange} rows={4} placeholder="Detailed description of the country..." className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 resize-none"></textarea>
            </div>

            <div className="flex items-center justify-end gap-4 pt-6 border-t border-navy-800">
              <Link href="/admin/dashboard" className="px-6 py-3 text-sm font-bold text-gray-300 hover:text-white uppercase tracking-wider transition-colors">Cancel</Link>
              <button disabled={isLoading} type="submit" className="flex items-center gap-2 bg-gold-500 hover:bg-gold-400 disabled:opacity-50 text-navy-950 font-bold px-8 py-3 rounded-lg uppercase tracking-wider text-sm transition-all shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} 
                {isLoading ? "Saving..." : "Save Country"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}