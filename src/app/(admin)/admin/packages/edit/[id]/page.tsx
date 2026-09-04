"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, use } from "react"; 
import { ArrowLeft, Save, PackageSearch, Loader2 } from "lucide-react";

export default function EditPackagePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  
  // Next.js params unwrapping
  const unwrappedParams = use(params);
  const packageId = unwrappedParams.id;
  
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    destination: "",
    description: "",
    price: "",
    discount: "",
    duration: "",
    hotel: "",
    transport: "",
    flightInfo: "",
    included: "",
    excluded: "",
    isFeatured: false,
    isActive: true,
  });

  // Fetch package data
  useEffect(() => {
    fetch(`/api/packages?id=${packageId}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          title: data.title || "",
          category: data.category || "",
          destination: data.destination || "",
          description: data.description || "",
          price: data.price || "",
          discount: data.discount || "",
          duration: data.duration || "",
          hotel: data.hotel || "",
          transport: data.transport || "",
          flightInfo: data.flightInfo || "",
          included: Array.isArray(data.included) ? data.included.join("\n") : "",
          excluded: Array.isArray(data.excluded) ? data.excluded.join("\n") : "",
          isFeatured: data.isFeatured || false,
          isActive: data.isActive !== undefined ? data.isActive : true,
        });
        setIsFetching(false);
      })
      .catch((err) => {
        console.error("Error fetching package:", err);
        setIsFetching(false);
      });
  }, [packageId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.currentTarget;

    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [target.name]: target.checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [target.name]: target.value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const payload = {
      id: packageId,
      ...formData,
      price: parseFloat(formData.price),
      discount: formData.discount ? parseFloat(formData.discount) : null,
      included: formData.included.split("\n").filter((line) => line.trim() !== ""),
      excluded: formData.excluded.split("\n").filter((line) => line.trim() !== ""),
    };

    try {
      const response = await fetch("/api/packages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Package updated successfully!");
        router.push("/admin/packages");
        router.refresh(); 
      } else {
        alert("Failed to update package.");
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
              href="/admin/packages" 
              className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 text-sm font-semibold uppercase tracking-wider mb-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Packages
            </Link>
            <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <PackageSearch className="w-8 h-8 text-gold-500" /> Edit Package
            </h1>
          </div>
        </div>

        <div className="bg-navy-900/60 border border-navy-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Title</label>
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
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Category</label>
                <input 
                  required 
                  type="text" 
                  name="category" 
                  value={formData.category} 
                  onChange={handleChange} 
                  className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500" 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Destination</label>
                <input 
                  required 
                  type="text" 
                  name="destination" 
                  value={formData.destination} 
                  onChange={handleChange} 
                  className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500" 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Duration (e.g. 7 Days)</label>
                <input 
                  required 
                  type="text" 
                  name="duration" 
                  value={formData.duration} 
                  onChange={handleChange} 
                  className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500" 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Price</label>
                <input 
                  required 
                  type="number" 
                  step="0.01" 
                  name="price" 
                  value={formData.price} 
                  onChange={handleChange} 
                  className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500" 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Discount Price (Optional)</label>
                <input 
                  type="number" 
                  step="0.01" 
                  name="discount" 
                  value={formData.discount} 
                  onChange={handleChange} 
                  className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500" 
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Description</label>
              <textarea 
                required 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                rows={3} 
                className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 resize-none" 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Hotel Info</label>
                <input 
                  required 
                  type="text" 
                  name="hotel" 
                  value={formData.hotel} 
                  onChange={handleChange} 
                  className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500" 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Transport Info</label>
                <input 
                  required 
                  type="text" 
                  name="transport" 
                  value={formData.transport} 
                  onChange={handleChange} 
                  className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500" 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Flight Info</label>
                <input 
                  type="text" 
                  name="flightInfo" 
                  value={formData.flightInfo} 
                  onChange={handleChange} 
                  placeholder="e.g. Return flights included"
                  className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Included (Each on new line)</label>
                <textarea 
                  required 
                  name="included" 
                  value={formData.included} 
                  onChange={handleChange} 
                  rows={4} 
                  className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 resize-none" 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Excluded (Each on new line)</label>
                <textarea 
                  required 
                  name="excluded" 
                  value={formData.excluded} 
                  onChange={handleChange} 
                  rows={4} 
                  className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 resize-none" 
                />
              </div>
            </div>

            <div className="flex gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  name="isFeatured" 
                  checked={formData.isFeatured} 
                  onChange={handleChange} 
                  className="w-5 h-5 accent-gold-500" 
                />
                <span className="text-sm font-semibold text-gray-300">Featured Package</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  name="isActive" 
                  checked={formData.isActive} 
                  onChange={handleChange} 
                  className="w-5 h-5 accent-gold-500" 
                />
                <span className="text-sm font-semibold text-gray-300">Active</span>
              </label>
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
                className="flex items-center gap-2 bg-gold-500 hover:bg-gold-400 disabled:opacity-50 text-navy-950 font-bold px-8 py-3 rounded-lg uppercase tracking-wider text-sm transition-all cursor-pointer"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} 
                {isLoading ? "Updating..." : "Update Package"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}