// src/app/(admin)/admin/testimonials/page.tsx
import { db } from "../../../lib/db";
import { MessageSquareQuote, Check, X, Trash2 } from "lucide-react";

export default async function AdminTestimonialsPage() {
  const testimonials = await db.testimonial.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <MessageSquareQuote className="w-6 h-6 text-gold-500" /> Testimonials
        </h1>
        <p className="text-xs text-gray-400 mt-1">Approve and manage client success records.</p>
      </div>

      <div className="bg-navy-900 border border-navy-800 rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm text-gray-300">
          <thead className="bg-navy-950 text-gray-400 text-xs uppercase tracking-wider border-b border-navy-800">
            <tr>
              <th className="px-6 py-4">Client</th>
              <th className="px-6 py-4">Service</th>
              <th className="px-6 py-4">Comment</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-800">
            {testimonials.map((t) => (
              <tr key={t.id} className="hover:bg-navy-800/50 transition">
                <td className="px-6 py-4 font-semibold text-white">
                  {t.clientName}
                  <div className="text-xs text-gray-500 font-normal">{t.country}</div>
                </td>
                <td className="px-6 py-4">{t.serviceUsed}</td>
                <td className="px-6 py-4 max-w-xs truncate">{t.comment}</td>
                <td className="px-6 py-4">
                  {t.isApproved ? (
                    <span className="text-emerald-400 text-xs font-bold border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 rounded">Approved</span>
                  ) : (
                    <span className="text-yellow-400 text-xs font-bold border border-yellow-500/20 bg-yellow-500/10 px-2 py-1 rounded">Pending</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                  <button className="p-1.5 text-gray-400 hover:text-emerald-400 transition" title="Approve">
                    <Check className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 text-gray-400 hover:text-yellow-400 transition" title="Reject/Hide">
                    <X className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 text-gray-400 hover:text-red-400 transition" title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {testimonials.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  No testimonials available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}