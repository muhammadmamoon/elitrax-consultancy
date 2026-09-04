"use client";

import { useEffect, useState } from "react";
import { 
  Video, 
  Trash2, 
  Edit2, 
  Plus, 
  CheckCircle, 
  XCircle, 
  Loader2, 
  MessageSquare, 
  Globe2, 
  Briefcase,
  Star,
  X 
} from "lucide-react";

interface TestimonialItem {
  id: string;
  clientName: string;
  country: string;
  serviceUsed: string;
  comment: string;
  rating: number;
  videoUrl?: string | null;
  isApproved: boolean;
  order: number;
  createdAt: string;
}

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const initialFormState = {
    clientName: "",
    country: "Pakistan",
    serviceUsed: "Umrah Package",
    comment: "",
    rating: 5,
    videoUrl: "",
    isApproved: true,
    order: 0,
  };

  const [formData, setFormData] = useState(initialFormState);

  const loadTestimonials = () => {
    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((data) => {
        setTestimonials(Array.isArray(data) ? data : []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching testimonials:", err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const handleOpenCreate = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: TestimonialItem) => {
    setIsEditing(true);
    setEditingId(item.id);
    setFormData({
      clientName: item.clientName,
      country: item.country,
      serviceUsed: item.serviceUsed,
      comment: item.comment,
      rating: item.rating || 5,
      videoUrl: item.videoUrl || "",
      isApproved: item.isApproved,
      order: item.order || 0,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const method = isEditing ? "PUT" : "POST";
    const payload = isEditing ? { ...formData, id: editingId } : formData;

    try {
      const res = await fetch("/api/testimonials", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsModalOpen(false);
        setFormData(initialFormState);
        loadTestimonials();
      } else {
        const err = await res.json();
        alert(err.error || "Operation failed.");
      }
    } catch {
      alert("An error occurred while saving.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleApproval = async (id: string, currentApproved: boolean) => {
    try {
      const res = await fetch("/api/testimonials", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isApproved: !currentApproved }),
      });

      if (res.ok) {
        setTestimonials((prev) =>
          prev.map((item) => (item.id === id ? { ...item, isApproved: !currentApproved } : item))
        );
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?")) return;

    try {
      const res = await fetch(`/api/testimonials?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setTestimonials((prev) => prev.filter((item) => item.id !== id));
      }
    } catch {
      alert("Error deleting testimonial.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Video className="w-6 h-6 text-gold-400" /> Client Testimonials &amp; Stories
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Manage feedback ratings, reviews, video endorsements, and visibility.
          </p>
        </div>
        <button
          type="button"
          onClick={handleOpenCreate}
          className="px-4 py-2 bg-gold-500 hover:bg-gold-400 text-navy-950 text-sm font-bold rounded-lg flex items-center gap-2 transition cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      <div className="bg-navy-900 border border-navy-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-navy-950 text-gray-400 text-xs uppercase tracking-wider border-b border-navy-800">
              <tr>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4">Country &amp; Service</th>
                <th className="px-6 py-4">Review Comment</th>
                <th className="px-6 py-4">Video Link</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-800">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-gold-500" />
                    Loading testimonials...
                  </td>
                </tr>
              ) : testimonials.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    No testimonials found.
                  </td>
                </tr>
              ) : (
                testimonials.map((item) => (
                  <tr key={item.id} className="hover:bg-navy-800/40 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-white">{item.clientName}</div>
                      <div className="text-[11px] text-gray-500 mt-0.5">Order: {item.order}</div>
                    </td>

                    {/* Star Rating Display */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-0.5 text-gold-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3.5 h-3.5 ${
                              i < (item.rating || 5) ? "fill-gold-400 text-gold-400" : "text-gray-600"
                            }`} 
                          />
                        ))}
                      </div>
                    </td>

                    <td className="px-6 py-4 space-y-1 text-xs">
                      <div className="flex items-center gap-1.5 text-gold-400 font-medium">
                        <Briefcase className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{item.serviceUsed}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-400">
                        <Globe2 className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{item.country}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4 max-w-sm">
                      <p className="line-clamp-2 text-xs text-gray-300">
                        {item.comment}
                      </p>
                    </td>

                    <td className="px-6 py-4 text-xs">
                      {item.videoUrl ? (
                        <a 
                          href={item.videoUrl} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-gold-400 hover:underline flex items-center gap-1"
                        >
                          <Video className="w-3.5 h-3.5" /> Watch
                        </a>
                      ) : (
                        <span className="text-gray-500">None</span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <button
                        type="button"
                        onClick={() => handleToggleApproval(item.id, item.isApproved)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold cursor-pointer border transition ${
                          item.isApproved
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-red-500/10 text-red-400 border-red-500/20"
                        }`}
                      >
                        {item.isApproved ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                        {item.isApproved ? "Approved" : "Hidden"}
                      </button>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          type="button"
                          onClick={() => handleOpenEdit(item)} 
                          className="text-gray-400 hover:text-gold-400 p-1.5 transition cursor-pointer"
                          title="Edit Testimonial"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          type="button"
                          onClick={() => handleDelete(item.id)} 
                          className="text-gray-400 hover:text-red-400 p-1.5 transition cursor-pointer"
                          title="Delete Testimonial"
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

      {/* Modal with Star Picker */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-navy-900 border border-navy-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-navy-800 pb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-gold-400" />
                {isEditing ? "Edit Testimonial" : "Add Testimonial"}
              </h2>
              <button 
                type="button" 
                onClick={() => setIsModalOpen(false)} 
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">
                  Client Name *
                </label>
                <input
                  required
                  type="text"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-gold-500"
                />
              </div>

              {/* Interactive Star Rating Selector */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1.5">
                  Rating (Stars)
                </label>
                <div className="flex items-center gap-2 bg-navy-950 border border-navy-700 p-2.5 rounded-lg">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className="p-0.5 focus:outline-none transition hover:scale-110 cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= formData.rating
                              ? "fill-gold-400 text-gold-400"
                              : "text-gray-600 hover:text-gold-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <span className="text-xs font-bold text-gold-400 ml-2">
                    {formData.rating} out of 5 Stars
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">
                    Country *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-gold-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">
                    Service Used *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.serviceUsed}
                    onChange={(e) => setFormData({ ...formData, serviceUsed: e.target.value })}
                    className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">
                    Video URL (Optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://youtube.com/..."
                    value={formData.videoUrl}
                    onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                    className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-gold-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                    className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">
                  Review Comment *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-gold-500 resize-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isApprovedModal"
                  checked={formData.isApproved}
                  onChange={(e) => setFormData({ ...formData, isApproved: e.target.checked })}
                  className="w-4 h-4 accent-gold-500 cursor-pointer"
                />
                <label htmlFor="isApprovedModal" className="text-xs text-gray-300 font-semibold cursor-pointer">
                  Approved &amp; Visible to Public
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-navy-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-gray-400 hover:text-white uppercase cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2 bg-gold-500 hover:bg-gold-400 text-navy-950 text-xs font-bold rounded-lg uppercase tracking-wider transition disabled:opacity-50 flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                >
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  {isEditing ? "Update Review" : "Save Review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}