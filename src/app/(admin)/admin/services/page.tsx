"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Save, Briefcase, Loader2 } from "lucide-react";

export default function NewVisaServicePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    category: "TOURIST", // Apne Prisma Enum ke mutabiq values set karein (e.g. TOURIST, BUSINESS)
    countryId: "",
    description: "",
    requirements: "",
    processSteps: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Textarea ke text ko Line-by-Line (JSON Array) mein convert kar rahe hain
    const payload = {
      ...formData,
      requirements: formData.requirements.split('\n').filter(line => line.trim() !== ""),
      processSteps: formData.processSteps.split('\n').filter(line => line.trim() !== ""),
    };

    try {
      const response = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        router.push("/admin/dashboard");
        router.refresh(); 
      } else {
        alert("Failed to save the service. Ensure the Country ID is valid.");
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
              <Briefcase className="w-8 h-8 text-gold-500" /> Add Visa Service
            </h1>
          </div>
        </div>

        <div className="bg-navy-900/60 border border-navy-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Visa Title</label>
                <input required type="text" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. 30 Days Tourist Visa" className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500" />
              </div>

              <div>
  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Category</label>
  <select 
    name="category" 
    value={formData.category} 
    onChange={handleChange} 
    className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500"
  >
    {/* IN VALUES KO APNE SCHEMA KE EXACT ENUM SE MATCH KAREIN */}
    <option value="TOURIST">Tourist Visa</option>
    <option value="BUSINESS">Business Visa</option>
    <option value="WORK">Work Visa</option>
  </select>
</div>

              {/* Country ID (Relation k liye) */}
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Country ID (Required)</label>
                <input required type="text" name="countryId" value={formData.countryId} onChange={handleChange} placeholder="Paste valid Country ID from database here..." className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500" />
                <p className="text-xs text-gray-500 mt-1">This must be an exact ID from your Countries table.</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Description</label>
              <textarea required name="description" value={formData.description} onChange={handleChange} rows={3} placeholder="Overview of the visa process..." className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 resize-none"></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Requirements (JSON)</label>
                <textarea required name="requirements" value={formData.requirements} onChange={handleChange} rows={5} placeholder="Passport copy&#10;Passport size photo&#10;Bank Statement" className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 resize-none"></textarea>
                <p className="text-xs text-gray-500 mt-1">Write each requirement on a new line.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Process Steps (JSON)</label>
                <textarea required name="processSteps" value={formData.processSteps} onChange={handleChange} rows={5} placeholder="Submit application&#10;Pay fees&#10;Receive Visa" className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 resize-none"></textarea>
                <p className="text-xs text-gray-500 mt-1">Write each step on a new line.</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-4 pt-6 border-t border-navy-800">
              <Link href="/admin/dashboard" className="px-6 py-3 text-sm font-bold text-gray-300 hover:text-white uppercase tracking-wider transition-colors">Cancel</Link>
              <button disabled={isLoading} type="submit" className="flex items-center gap-2 bg-gold-500 hover:bg-gold-400 disabled:opacity-50 text-navy-950 font-bold px-8 py-3 rounded-lg uppercase tracking-wider text-sm transition-all shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} 
                {isLoading ? "Saving..." : "Save Visa Service"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}