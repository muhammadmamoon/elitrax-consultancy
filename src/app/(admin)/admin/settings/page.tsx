// cspell:words ELITRAX elitrax Shahrah Faisal
"use client";

import { useEffect, useState } from "react";
import { 
  Settings, 
  Save, 
  Loader2, 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Share2, 
  CheckCircle2,
  MessageCircle
} from "lucide-react";

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [formData, setFormData] = useState({
    siteName: "ELITRAX Consultancy",
    tagline: "Premier Travel, Umrah & Visa Solutions",
    contactEmail: "info@elitrax.com",
    contactPhone: "+92 300 1234567",
    whatsappNumber: "+92 300 1234567",
    officeAddress: "Suite #402, Business Tower, Shahrah-e-Faisal, Karachi, Pakistan",
    businessHours: "Mon - Sat: 9:00 AM - 6:00 PM (Sunday Closed)",
    facebookUrl: "",
    instagramUrl: "",
    linkedinUrl: "",
  });

  // Load Settings
  useEffect(() => {
    fetch("/api/settings")
      .then((res) => (res.ok ? res.json() : {}))
      .then((data) => {
        if (data && Object.keys(data).length > 0) {
          setFormData((prev) => ({ ...prev, ...data }));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load settings:", err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      } else {
        alert("Failed to save settings.");
      }
    } catch {
      alert("Error occurred while saving configurations.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-28 text-gray-400 space-y-3">
        <Loader2 className="w-8 h-8 animate-spin text-gold-500" />
        <span className="text-xs uppercase tracking-wider">Loading configurations...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-navy-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Settings className="w-6 h-6 text-gold-400" /> Global Website Settings
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Manage contact channels, branding meta, and agency address across all pages.
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-2 rounded-xl text-xs font-semibold animate-in fade-in">
            <CheckCircle2 className="w-4 h-4" /> Changes saved successfully!
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: General Branding */}
        <div className="bg-navy-900 border border-navy-800 rounded-2xl p-6 space-y-5 shadow-xl">
          <div className="flex items-center gap-2.5 border-b border-navy-800/80 pb-3">
            <Building2 className="w-5 h-5 text-gold-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Branding &amp; Identity
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Company / Portal Name
              </label>
              <input
                type="text"
                name="siteName"
                value={formData.siteName}
                onChange={handleChange}
                className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-gold-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Hero Tagline / Subtitle
              </label>
              <input
                type="text"
                name="tagline"
                value={formData.tagline}
                onChange={handleChange}
                className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-gold-500"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Contact Numbers & WhatsApp */}
        <div className="bg-navy-900 border border-navy-800 rounded-2xl p-6 space-y-5 shadow-xl">
          <div className="flex items-center gap-2.5 border-b border-navy-800/80 pb-3">
            <Phone className="w-5 h-5 text-gold-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Contact Communication
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Primary Phone
              </label>
              <input
                type="text"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-gold-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" /> WhatsApp Support
              </label>
              <input
                type="text"
                name="whatsappNumber"
                value={formData.whatsappNumber}
                onChange={handleChange}
                className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-gold-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-gold-400" /> Official Email
              </label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-gold-500"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Office Location & Hours */}
        <div className="bg-navy-900 border border-navy-800 rounded-2xl p-6 space-y-5 shadow-xl">
          <div className="flex items-center gap-2.5 border-b border-navy-800/80 pb-3">
            <MapPin className="w-5 h-5 text-gold-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Location &amp; Timings
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Physical Office Address
              </label>
              <textarea
                rows={2}
                name="officeAddress"
                value={formData.officeAddress}
                onChange={handleChange}
                className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-gold-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-gray-400" /> Business Operating Hours
              </label>
              <input
                type="text"
                name="businessHours"
                value={formData.businessHours}
                onChange={handleChange}
                className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-gold-500"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Social Media Links */}
        <div className="bg-navy-900 border border-navy-800 rounded-2xl p-6 space-y-5 shadow-xl">
          <div className="flex items-center gap-2.5 border-b border-navy-800/80 pb-3">
            <Share2 className="w-5 h-5 text-gold-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Social Channels
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Facebook Page URL
              </label>
              <input
                type="url"
                name="facebookUrl"
                placeholder="https://facebook.com/..."
                value={formData.facebookUrl}
                onChange={handleChange}
                className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-gold-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Instagram URL
              </label>
              <input
                type="url"
                name="instagramUrl"
                placeholder="https://instagram.com/..."
                value={formData.instagramUrl}
                onChange={handleChange}
                className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-gold-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                LinkedIn Profile URL
              </label>
              <input
                type="url"
                name="linkedinUrl"
                placeholder="https://linkedin.com/company/..."
                value={formData.linkedinUrl}
                onChange={handleChange}
                className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-gold-500"
              />
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-end pt-4">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-gold-500 hover:bg-gold-400 disabled:opacity-50 text-navy-950 font-bold px-8 py-3 rounded-xl uppercase tracking-wider text-xs transition shadow-lg shadow-gold-500/20 cursor-pointer disabled:cursor-not-allowed"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? "Saving Changes..." : "Save All Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}