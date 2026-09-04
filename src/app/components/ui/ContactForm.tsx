// src/components/ui/ContactForm.tsx
"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "USA",
    service: "Visit Visa",
    travelType: "Individual",
    travelDate: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Could not transmit case profile");
      setSuccess(true);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        country: "USA",
        service: "Visit Visa",
        travelType: "Individual",
        travelDate: "",
        message: "",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 rounded-2xl bg-navy-900/80 border border-gold-500/20 backdrop-blur-xl shadow-2xl space-y-6"
    >
      {success && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 flex items-center gap-3 text-emerald-200">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm">Inquiry registered. Our senior advisor will contact you within 24 hours.</p>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-red-950/80 border border-red-500/50 flex items-center gap-3 text-red-200">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gold-400 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            required
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-navy-950 border border-navy-700 text-white focus:outline-none focus:border-gold-500 transition"
            placeholder="Johnathan Doe"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gold-400 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-navy-950 border border-navy-700 text-white focus:outline-none focus:border-gold-500 transition"
            placeholder="johnathan@domain.com"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gold-400 mb-2">
            Phone / WhatsApp *
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-navy-950 border border-navy-700 text-white focus:outline-none focus:border-gold-500 transition"
            placeholder="+1 555 019 283"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gold-400 mb-2">
            Destination Country
          </label>
          <select
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-navy-950 border border-navy-700 text-white focus:outline-none focus:border-gold-500 transition"
          >
            <option value="USA">United States</option>
            <option value="Canada">Canada</option>
            <option value="UK">United Kingdom</option>
            <option value="Australia">Australia</option>
            <option value="Schengen">Schengen Area</option>
            <option value="Saudi Arabia">Saudi Arabia (Umrah)</option>
            <option value="Turkey">Turkey</option>
            <option value="Other">Other Global Zone</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gold-400 mb-2">
            Service Class
          </label>
          <select
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-navy-950 border border-navy-700 text-white focus:outline-none focus:border-gold-500 transition"
          >
            <option value="Visit Visa">Visit / Tourist Visa Consultancy</option>
            <option value="Study Visa">Study Permit / Student Visa</option>
            <option value="Umrah Luxury">Umrah Packages</option>
            <option value="Corporate Invitation">Business Invitation / Expo Assistance</option>
            <option value="Canada ODN">Canada ODN / ATIP Support</option>
            <option value="Turkey TRC">Turkey TRC Application Review</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gold-400 mb-2">
            Target Travel Date
          </label>
          <input
            type="date"
            value={formData.travelDate}
            onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-navy-950 border border-navy-700 text-white focus:outline-none focus:border-gold-500 transition"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-gold-400 mb-2">
          Case Brief & Documentation Overview
        </label>
        <textarea
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Please outline previous travel history, visa refusals (if any), and core requirements."
          className="w-full px-4 py-3 rounded-lg bg-navy-950 border border-navy-700 text-white focus:outline-none focus:border-gold-500 transition"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950 font-bold tracking-wider uppercase text-sm rounded-lg transition-all shadow-lg flex items-center justify-center gap-2"
      >
        {loading ? "Transmitting..." : "Request Consultation"}
        <Send className="w-4 h-4" />
      </button>
    </form>
  );
}