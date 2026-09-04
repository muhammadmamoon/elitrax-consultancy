"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, use } from "react"; 
import { ArrowLeft, Save, Briefcase, Loader2 } from "lucide-react";

export default function EditVisaServicePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  
  const unwrappedParams = use(params);
  const serviceId = unwrappedParams.id;
  
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  
  const [formData, setFormData] = useState({
    title: "",
    category: "TOURIST", 
    countryId: "",
    description: "",
    requirements: "",
    processSteps: "",
  });

  useEffect(() => {
    fetch(`/api/services?id=${serviceId}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          title: data.title || "",
          category: data.category || "TOURIST",
          countryId: data.countryId || "",
          description: data.description || "",
          requirements: Array.isArray(data.requirements) ? data.requirements.join("\n") : "",
          processSteps: Array.isArray(data.processSteps) ? data.processSteps.join("\n") : "",
        });
        setIsFetching(false);
      })
      .catch((err) => {
        console.error("Error fetching service details:", err);
        setIsFetching(false);
      });
  }, [serviceId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const payload = {
      id: serviceId,
      ...formData,
      requirements: formData.requirements.split("\n").filter((line) => line.trim() !== ""),
      processSteps: formData.processSteps.split("\n").filter((line) => line.trim() !== ""),
    };

    try {
      const response = await fetch("/api/services", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Visa Service updated successfully!");
        router.push("/admin/services");
        router.refresh(); 
      } else {
        alert("Failed to update.");
      }
    } catch {
      alert("An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="min-h-screen bg-navy-950 flex justify-center items-center text-gold-500">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-950 p-6 md:p-10 text-gray-100">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link 
              href="/admin/services" 
              className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 text-sm font-semibold uppercase tracking-wider mb-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Services
            </Link>
            <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <Briefcase className="w-8 h-8 text-gold-500" /> Edit Visa Service
            </h1>
          </div>
        </div>

        <div className="bg-navy-900/60 border border-navy-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Visa Title
                </label>
                <input 
                  required 
                  type="text" 
                  name="title" 
                  value={formData.title} 
                  onChange={handleChange} 
                  className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500" 
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
                  className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500"
                >
                  <option value="TOURIST">Tourist Visa</option>
                  <option value="BUSINESS">Business Visa</option>
                  <option value="UMRAH">Umrah Visa</option>
                  <option value="VISIT_VISA">Visit Visa</option>
                  <option value="STUDY_VISA">Study Visa</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Country ID (Required)
                </label>
                <input 
                  required 
                  type="text" 
                  name="countryId" 
                  value={formData.countryId} 
                  onChange={handleChange} 
                  className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500" 
                />
              </div>
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
                rows={3} 
                className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 resize-none" 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Requirements
                </label>
                <textarea 
                  required 
                  name="requirements" 
                  value={formData.requirements} 
                  onChange={handleChange} 
                  rows={5} 
                  className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 resize-none" 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Process Steps
                </label>
                <textarea 
                  required 
                  name="processSteps" 
                  value={formData.processSteps} 
                  onChange={handleChange} 
                  rows={5} 
                  className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 resize-none" 
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-4 pt-6 border-t border-navy-800">
              <Link 
                href="/admin/services" 
                className="px-6 py-3 text-sm font-bold text-gray-300 hover:text-white uppercase tracking-wider transition-colors"
              >
                Cancel
              </Link>
              <button 
                disabled={isLoading} 
                type="submit" 
                className="flex items-center gap-2 bg-gold-500 hover:bg-gold-400 disabled:opacity-50 text-navy-950 font-bold px-8 py-3 rounded-lg uppercase tracking-wider text-sm transition-all cursor-pointer"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} 
                {isLoading ? "Updating..." : "Update Service"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}