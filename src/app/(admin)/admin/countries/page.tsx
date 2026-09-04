"use client";

import { useEffect, useState } from "react";
import { 
  Globe2, 
  Plus, 
  Trash2, 
  Edit2, 
  CheckCircle, 
  XCircle, 
  Loader2, 
  X, 
  Briefcase,
  HelpCircle
} from "lucide-react";

interface CountryItem {
  id: string;
  name: string;
  slug: string;
  code: string;
  flagUrl: string;
  heroImageUrl: string;
  overview: string;
  order: number;
  isActive: boolean;
  _count?: {
    visaServices: number;
    faqs: number;
  };
}

export default function AdminCountriesPage() {
  const [countries, setCountries] = useState<CountryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const initialForm = {
    name: "",
    code: "",
    flagUrl: "",
    heroImageUrl: "",
    overview: "",
    order: 0,
    isActive: true,
  };

  const [formData, setFormData] = useState(initialForm);

  const loadCountries = () => {
    fetch("/api/countries")
      .then((res) => res.json())
      .then((data) => {
        setCountries(Array.isArray(data) ? data : []);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  };

  useEffect(() => {
    loadCountries();
  }, []);

  const handleOpenCreate = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (country: CountryItem) => {
    setIsEditing(true);
    setEditingId(country.id);
    setFormData({
      name: country.name,
      code: country.code,
      flagUrl: country.flagUrl,
      heroImageUrl: country.heroImageUrl,
      overview: country.overview,
      order: country.order || 0,
      isActive: country.isActive,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const method = isEditing ? "PUT" : "POST";
    const payload = isEditing ? { ...formData, id: editingId } : formData;

    try {
      const res = await fetch("/api/countries", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsModalOpen(false);
        setFormData(initialForm);
        loadCountries();
      } else {
        const err = await res.json();
        alert(err.error || "Operation failed.");
      }
    } catch {
      alert("Error occurred while saving.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch("/api/countries", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isActive: !currentStatus }),
      });

      if (res.ok) {
        setCountries((prev) =>
          prev.map((c) => (c.id === id ? { ...c, isActive: !currentStatus } : c))
        );
      }
    } catch {
      alert("Error updating status.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure? Deleting this country will also remove linked services and FAQs!")) return;

    try {
      const res = await fetch(`/api/countries?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setCountries((prev) => prev.filter((c) => c.id !== id));
      }
    } catch {
      alert("Failed to delete country.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Globe2 className="w-6 h-6 text-gold-400" /> Destination Countries
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Manage global countries, hero banners, destination overviews, and visa allocations.
          </p>
        </div>
        <button
          type="button"
          onClick={handleOpenCreate}
          className="px-4 py-2 bg-gold-500 hover:bg-gold-400 text-navy-950 text-sm font-bold rounded-lg flex items-center gap-2 transition"
        >
          <Plus className="w-4 h-4" /> Add Destination
        </button>
      </div>

      <div className="bg-navy-900 border border-navy-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-navy-950 text-gray-400 text-xs uppercase tracking-wider border-b border-navy-800">
              <tr>
                <th className="px-6 py-4">Country &amp; Flag</th>
                <th className="px-6 py-4">Slug &amp; Code</th>
                <th className="px-6 py-4">Overview</th>
                <th className="px-6 py-4">Visas &amp; FAQs</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-800">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-gold-500" />
                    Loading countries...
                  </td>
                </tr>
              ) : countries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No destinations listed yet. Click &quot;Add Destination&quot; to create one.
                  </td>
                </tr>
              ) : (
                countries.map((item) => (
                  <tr key={item.id} className="hover:bg-navy-800/40 transition-colors">
                    {/* Country & Flag */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-7 rounded border border-navy-700 overflow-hidden bg-navy-950 flex-shrink-0 relative">
                          <img
                            src={item.flagUrl}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://placehold.co/40x30/png?text=🏳";
                            }}
                          />
                        </div>
                        <div>
                          <div className="font-semibold text-white">{item.name}</div>
                          <span className="text-[11px] text-gray-500">Priority: {item.order}</span>
                        </div>
                      </div>
                    </td>

                    {/* Slug & Code */}
                    <td className="px-6 py-4 space-y-1">
                      <span className="font-mono text-xs bg-navy-950 px-2 py-0.5 rounded border border-navy-800 text-gold-400">
                        {item.code}
                      </span>
                      <div className="text-xs text-gray-400">{item.slug}</div>
                    </td>

                    {/* Overview snippet */}
                    <td className="px-6 py-4 max-w-xs">
                      <p className="line-clamp-2 text-xs text-gray-400">
                        {item.overview}
                      </p>
                    </td>

                    {/* Relations Count */}
                    <td className="px-6 py-4 space-y-1 text-xs">
                      <div className="flex items-center gap-1.5 text-gray-300">
                        <Briefcase className="w-3.5 h-3.5 text-gold-400" />
                        <span>{item._count?.visaServices ?? 0} Visas</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-400">
                        <HelpCircle className="w-3.5 h-3.5 text-gray-500" />
                        <span>{item._count?.faqs ?? 0} FAQs</span>
                      </div>
                    </td>

                    {/* Status Toggle */}
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(item.id, item.isActive)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold cursor-pointer border transition ${
                          item.isActive
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-red-500/10 text-red-400 border-red-500/20"
                        }`}
                      >
                        {item.isActive ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                        {item.isActive ? "Active" : "Disabled"}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(item)}
                          className="text-gray-400 hover:text-gold-400 p-1.5 transition"
                          title="Edit Country"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          className="text-gray-400 hover:text-red-400 p-1.5 transition"
                          title="Delete Country"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-navy-900 border border-navy-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-5 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-navy-800 pb-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Globe2 className="w-5 h-5 text-gold-400" />
                {isEditing ? "Edit Country Destination" : "Add Country Destination"}
              </h2>
              <button 
                type="button" 
                onClick={() => setIsModalOpen(false)} 
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Country Name *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. United Kingdom"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-gold-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">ISO Code *</label>
                  <input
                    required
                    type="text"
                    maxLength={4}
                    placeholder="e.g. UK / GBR"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-gold-500 uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Flag Image URL *</label>
                <input
                  required
                  type="url"
                  placeholder="https://flagcdn.com/w80/gb.png"
                  value={formData.flagUrl}
                  onChange={(e) => setFormData({ ...formData, flagUrl: e.target.value })}
                  className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Hero Image URL *</label>
                <input
                  required
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={formData.heroImageUrl}
                  onChange={(e) => setFormData({ ...formData, heroImageUrl: e.target.value })}
                  className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Display Order</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                  className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Overview / Description *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Key immigration rules, travel guidelines, and destination perks..."
                  value={formData.overview}
                  onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                  className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-gold-500 resize-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="countryActiveModal"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 accent-gold-500 cursor-pointer"
                />
                <label htmlFor="countryActiveModal" className="text-xs text-gray-300 font-semibold cursor-pointer">
                  Active &amp; Displayed on Public Portal
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-navy-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-gray-400 hover:text-white uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2 bg-gold-500 hover:bg-gold-400 text-navy-950 text-xs font-bold rounded-lg uppercase tracking-wider transition disabled:opacity-50 flex items-center gap-2"
                >
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  {isEditing ? "Update Destination" : "Save Destination"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}