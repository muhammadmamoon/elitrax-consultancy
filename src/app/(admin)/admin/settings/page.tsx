// src/app/(admin)/admin/settings/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, Settings2 } from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        setSettings(data);
        setLoading(false);
      });
  }, []);

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        setMessage("Settings updated successfully.");
      } else {
        setMessage("Failed to update settings.");
      }
    } catch (err) {
      setMessage("An error occurred.");
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  if (loading) {
    return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 text-gold-500 animate-spin" /></div>;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Settings2 className="w-6 h-6 text-gold-500" /> System Settings
        </h1>
        <p className="text-xs text-gray-400 mt-1">Configure global application variables and contact details.</p>
      </div>

      <form onSubmit={handleSave} className="bg-navy-900 border border-navy-800 rounded-xl p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">Company Name</label>
            <input
              type="text"
              value={settings.company_name || ""}
              onChange={(e) => handleChange("company_name", e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-navy-950 border border-navy-700 text-white focus:border-gold-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">WhatsApp Number</label>
            <input
              type="text"
              value={settings.whatsapp_number || ""}
              onChange={(e) => handleChange("whatsapp_number", e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-navy-950 border border-navy-700 text-white focus:border-gold-500 outline-none"
              placeholder="+1234567890"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">Contact Email</label>
            <input
              type="email"
              value={settings.contact_email || ""}
              onChange={(e) => handleChange("contact_email", e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-navy-950 border border-navy-700 text-white focus:border-gold-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">Contact Phone</label>
            <input
              type="text"
              value={settings.contact_phone || ""}
              onChange={(e) => handleChange("contact_phone", e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-navy-950 border border-navy-700 text-white focus:border-gold-500 outline-none"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">Headquarters Address</label>
            <input
              type="text"
              value={settings.address || ""}
              onChange={(e) => handleChange("address", e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-navy-950 border border-navy-700 text-white focus:border-gold-500 outline-none"
            />
          </div>
        </div>

        {message && (
          <div className="p-3 bg-navy-950 border border-gold-500/30 text-gold-400 text-sm rounded-lg">
            {message}
          </div>
        )}

        <div className="flex justify-end border-t border-navy-800 pt-6">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-gold-500 hover:bg-gold-400 text-navy-950 text-sm font-bold uppercase tracking-wider rounded-lg flex items-center gap-2 transition"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Configuration
          </button>
        </div>
      </form>
    </div>
  );
}