// cspell:words Shahrah Faisal elitrax
"use client";

import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loadingSettings, setLoadingSettings] = useState(true);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "Saudi Arabia",
    service: "Umrah Package",
    travelType: "Family",
    travelDate: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Settings Load
  useEffect(() => {
    fetch("/api/settings")
      .then((res) => (res.ok ? res.json() : {}))
      .then((data) => {
        setSettings(data);
        setLoadingSettings(false);
      })
      .catch(() => setLoadingSettings(false));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/inquiries/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsSuccess(true);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          country: "Saudi Arabia",
          service: "Umrah Package",
          travelType: "Family",
          travelDate: "",
          message: "",
        });
      } else {
        const data = await res.json();
        alert(data.error || "Failed to send inquiry.");
      }
    } catch {
      alert("Network error. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 text-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-gold-400 text-xs font-bold uppercase tracking-widest bg-gold-500/10 px-3 py-1 rounded-full border border-gold-500/20">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Consult Our Experts
          </h1>
          <p className="text-gray-400 text-base">
            Submit your itinerary requirements for visa evaluations and travel packages.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Dynamic Settings Info */}
          <div className="bg-navy-900 border border-navy-800 p-8 rounded-2xl space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white">Office Details</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-gray-500 block">Phone</span>
                    <span className="text-sm font-semibold text-white">
                      {loadingSettings ? "Loading..." : settings.contactPhone || "+92 300 1234567"}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-gray-500 block">Email</span>
                    <span className="text-sm font-semibold text-white">
                      {loadingSettings ? "Loading..." : settings.contactEmail || "info@elitrax.com"}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-gray-500 block">Location</span>
                    <span className="text-sm font-semibold text-white">
                      {loadingSettings ? "Loading..." : settings.officeAddress || "Main Shahrah-e-Faisal, Karachi"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 bg-navy-950 border border-navy-800 rounded-xl text-xs text-gray-400">
              Operating Hours: {settings.businessHours || "Mon - Sat: 9:00 AM - 6:00 PM"}
            </div>
          </div>

          {/* Submission Form */}
          <div className="lg:col-span-2 bg-navy-900 border border-navy-800 p-8 rounded-2xl shadow-xl">
            {isSuccess ? (
              <div className="text-center py-12 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-2xl font-bold text-white">Inquiry Received!</h3>
                <p className="text-sm text-gray-400 max-w-md mx-auto">
                  Your request has been logged. Our consultants will review your details in the administrative portal and get back to you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSuccess(false)}
                  className="mt-4 px-6 py-2.5 bg-gold-500 text-navy-950 font-bold text-xs rounded-lg uppercase tracking-wider hover:bg-gold-400 transition cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-gold-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                      Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-gold-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                      Phone Number *
                    </label>
                    <input
                      required
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-gold-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                      Destination Country *
                    </label>
                    <input
                      required
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-gold-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                      Service *
                    </label>
                    <input
                      required
                      type="text"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-gold-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                      Travel Type *
                    </label>
                    <select
                      name="travelType"
                      value={formData.travelType}
                      onChange={handleChange}
                      className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-gold-500 cursor-pointer"
                    >
                      <option value="Individual">Individual</option>
                      <option value="Family">Family</option>
                      <option value="Group">Group</option>
                      <option value="Corporate">Corporate</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                      Tentative Travel Date
                    </label>
                    <input
                      type="date"
                      name="travelDate"
                      value={formData.travelDate}
                      onChange={handleChange}
                      className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-gold-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Case Details / Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-gold-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold py-3 px-6 rounded-lg uppercase tracking-wider text-xs transition disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Submit Inquiry
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}