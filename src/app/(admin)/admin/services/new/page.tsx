"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowLeft, Save, Briefcase, Loader2, Globe2 } from "lucide-react";

interface CountryOption {
  id: string;
  name: string;
  code: string;
  flagUrl?: string | null;
}

export default function NewVisaServicePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [countries, setCountries] = useState<CountryOption[]>([]);
  const [loadingCountries, setLoadingCountries] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    category: "TOURIST",
    countryId: "",
    description: "",
    requirements: "",
    processSteps: "",
  });

  // Database se countries load karna dropdown ke liye
  useEffect(() => {
    fetch("/api/countries")
      .then((res) => (res.ok ? res.json() : []))
      .then((data: CountryOption[]) => {
        setCountries(data);
        if (data.length > 0) {
          setFormData((prev) => ({ ...prev, countryId: data[0].id }));
        }
        setLoadingCountries(false);
      })
      .catch((err) => {
        console.error("Error loading countries:", err);
        setLoadingCountries(false);
      });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.countryId) {
      alert("Please select a destination country first. If none exist, add one in the Countries page.");
      return;
    }

    setIsLoading(true);

    const payload = {
      ...formData,
      requirements: formData.requirements
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line !== ""),
      processSteps: formData.processSteps
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line !== ""),
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
        const errorData = await response.json().catch(() => ({}));
        alert(errorData.error || "Failed to save the visa service.");
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
              href="/admin/dashboard"
              className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 text-sm font-semibold uppercase tracking-wider mb-2 transition-colors"
            >
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
              {/* Visa Title */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Visa Title *
                </label>
                <input
                  required
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. 30 Days Tourist E-Visa"
                  className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 cursor-pointer"
                >
                  <option value="TOURIST">Tourist Visa</option>
                  <option value="BUSINESS">Business Visa</option>
                  <option value="WORK">Work Visa</option>
                  <option value="STUDENT">Student Visa</option>
                  <option value="UMRAH">Umrah / Pilgrim Visa</option>
                </select>
              </div>

              {/* Destination Country */}
              <div className="md:col-span-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Globe2 className="w-4 h-4 text-gold-400" /> Destination Country *
                  </label>
                  <Link
                    href="/admin/countries"
                    className="text-xs text-gold-400 hover:underline"
                  >
                    + Add New Country
                  </Link>
                </div>

                {loadingCountries ? (
                  <div className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-3 text-gray-400 text-sm flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-gold-500" />
                    Loading available countries...
                  </div>
                ) : countries.length === 0 ? (
                  <div className="w-full bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-xs flex items-center justify-between">
                    <span>No countries found in database. Please create a country first.</span>
                    <Link
                      href="/admin/countries"
                      className="underline font-bold hover:text-white ml-2"
                    >
                      Go to Countries
                    </Link>
                  </div>
                ) : (
                  <select
                    required
                    name="countryId"
                    value={formData.countryId}
                    onChange={handleChange}
                    className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 cursor-pointer"
                  >
                    <option value="" disabled>
                      -- Select Destination Country --
                    </option>
                    {countries.map((c) => (
                      <option key={c.id} value={c.id} className="bg-navy-950 text-white">
                        {c.name} ({c.code})
                      </option>
                    ))}
                  </select>
                )}
                <p className="text-[11px] text-gray-500 mt-1.5">
                  Select the country this visa belongs to. The ID will be attached automatically.
                </p>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Description *
              </label>
              <textarea
                required
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                placeholder="Overview of the visa process, eligibility criteria, and validity..."
                className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 resize-none"
              />
            </div>

            {/* Requirements & Process Steps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Requirements (Line by Line) *
                </label>
                <textarea
                  required
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  rows={5}
                  placeholder={"Original Passport (6 Months validity)\nRecent White Background Photograph\n6-Month Bank Statement\nNational Identity Card Copy"}
                  className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 resize-none text-xs leading-relaxed"
                />
                <p className="text-[11px] text-gray-500 mt-1">
                  Har requirement ko new line (Enter press karke) likhein.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Process Steps (Line by Line) *
                </label>
                <textarea
                  required
                  name="processSteps"
                  value={formData.processSteps}
                  onChange={handleChange}
                  rows={5}
                  placeholder={"Submit Documents Online or In-Office\nDocument Verification and Processing\nConsulate Submission and Biometrics\nReceive Visa via Email or Courier"}
                  className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 resize-none text-xs leading-relaxed"
                />
                <p className="text-[11px] text-gray-500 mt-1">
                  Har step ko new line (Enter press karke) likhein.
                </p>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-4 pt-6 border-t border-navy-800">
              <Link
                href="/admin/dashboard"
                className="px-6 py-3 text-sm font-bold text-gray-400 hover:text-white uppercase tracking-wider transition-colors"
              >
                Cancel
              </Link>
              <button
                disabled={isLoading || loadingCountries || countries.length === 0}
                type="submit"
                className="flex items-center gap-2 bg-gold-500 hover:bg-gold-400 disabled:opacity-50 text-navy-950 font-bold px-8 py-3 rounded-lg uppercase tracking-wider text-sm transition-all shadow-[0_0_15px_rgba(212,175,55,0.2)] cursor-pointer disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {isLoading ? "Saving..." : "Save Visa Service"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}