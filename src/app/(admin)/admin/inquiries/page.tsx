"use client";

import { useEffect, useState } from "react";
import { 
  MessageSquare, 
  Trash2, 
  Mail, 
  Phone, 
  Calendar, 
  Loader2, 
  Globe2, 
  Briefcase 
} from "lucide-react";

interface InquiryItem {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  service: string;
  travelType: string;
  message: string;
  status: string;
  createdAt: string;
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Fetch Inquiries
  useEffect(() => {
    fetch("/api/inquiries")
      .then((res) => res.json())
      .then((data) => {
        setInquiries(Array.isArray(data) ? data : []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load inquiries:", err);
        setIsLoading(false);
      });
  }, []);

  // 2. Update Status Function
  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/inquiries", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (res.ok) {
        setInquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
      } else {
        alert("Failed to update status.");
      }
    } catch {
      alert("Error updating status.");
    }
  };

  // 3. Delete Function
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this inquiry?")) return;

    try {
      const res = await fetch(`/api/inquiries?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setInquiries((prev) => prev.filter((item) => item.id !== id));
      } else {
        alert("Failed to delete.");
      }
    } catch {
      alert("Error deleting inquiry.");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <MessageSquare className="w-6 h-6 text-gold-400" /> Lead &amp; Client Inquiries
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Review incoming messages, consultant requests, and contact submissions.
        </p>
      </div>

      <div className="bg-navy-900 border border-navy-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-navy-950 text-gray-400 text-xs uppercase tracking-wider border-b border-navy-800">
              <tr>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Service &amp; Destination</th>
                <th className="px-6 py-4">Message</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-800">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-gold-500" />
                    Loading inquiries...
                  </td>
                </tr>
              ) : inquiries.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    No inquiries received yet.
                  </td>
                </tr>
              ) : (
                inquiries.map((item) => (
                  <tr key={item.id} className="hover:bg-navy-800/40 transition-colors">
                    {/* Client Name */}
                    <td className="px-6 py-4">
                      <div className="font-semibold text-white">
                        {item.fullName || "Unnamed Client"}
                      </div>
                      <div className="text-[11px] text-gray-500 mt-0.5">
                        Type: {item.travelType || "Standard"}
                      </div>
                    </td>

                    {/* Contact Info */}
                    <td className="px-6 py-4 space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-gray-300">
                        <Mail className="w-3.5 h-3.5 text-gray-500" />
                        <a href={`mailto:${item.email}`} className="hover:underline hover:text-gold-400">
                          {item.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <Phone className="w-3.5 h-3.5 text-gray-500" />
                        <span>{item.phone}</span>
                      </div>
                    </td>

                    {/* Service & Destination */}
                    <td className="px-6 py-4 space-y-1 text-xs">
                      <div className="flex items-center gap-1.5 text-gold-400 font-medium">
                        <Briefcase className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                        <span>{item.service}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-400">
                        <Globe2 className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
                        <span>{item.country}</span>
                      </div>
                    </td>

                    {/* Message */}
                    <td className="px-6 py-4 max-w-xs">
                      <p className="line-clamp-2 text-xs text-gray-300 whitespace-pre-wrap">
                        {item.message}
                      </p>
                    </td>

                    {/* Status Dropdown */}
                    <td className="px-6 py-4">
                      <select
                        value={item.status}
                        onChange={(e) => handleStatusChange(item.id, e.target.value)}
                        className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border outline-none cursor-pointer ${
                          item.status === "RESOLVED"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                            : item.status === "IN_PROGRESS"
                            ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                            : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                        }`}
                      >
                        <option value="NEW" className="bg-navy-950 text-white">NEW / Pending</option>
                        <option value="IN_PROGRESS" className="bg-navy-950 text-white">In Progress</option>
                        <option value="RESOLVED" className="bg-navy-950 text-white">Resolved</option>
                        <option value="CLOSED" className="bg-navy-950 text-white">Closed</option>
                      </select>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 text-xs text-gray-400 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-gray-500" />
                        {new Date(item.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="text-gray-400 hover:text-red-400 p-1.5 rounded-lg transition-colors"
                        title="Delete Inquiry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}