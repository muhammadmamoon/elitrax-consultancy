// src/app/(admin)/admin/inquiries/page.tsx
import { db } from "../../../lib/db";
import { MessageSquare, Calendar, Globe, Phone } from "lucide-react";

export default async function AdminInquiriesPage() {
  const inquiries = await db.inquiry.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-gold-500" /> Client Inquiries
        </h1>
        <p className="text-xs text-gray-400 mt-1">Review and manage consultation requests.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {inquiries.map((inquiry:any) => (
          <div key={inquiry.id} className="bg-navy-900 border border-navy-800 rounded-xl p-6 flex flex-col md:flex-row gap-6 hover:border-gold-500/20 transition">
            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">{inquiry.fullName}</h3>
                <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                  inquiry.status === 'NEW' ? 'bg-gold-500/10 text-gold-400 border border-gold-500/20' : 'bg-navy-800 text-gray-400 border border-navy-700'
                }`}>
                  {inquiry.status}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                <div className="flex items-center gap-1.5"><Phone className="w-4 h-4 text-gray-500" /> {inquiry.phone}</div>
                <div className="flex items-center gap-1.5"><Globe className="w-4 h-4 text-gray-500" /> {inquiry.country}</div>
                <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-gray-500" /> {new Date(inquiry.createdAt).toLocaleDateString()}</div>
              </div>

              <div className="p-4 bg-navy-950 rounded-lg text-sm text-gray-400 italic">
                "{inquiry.message || "No specific details provided."}"
              </div>
            </div>
          </div>
        ))}
        {inquiries.length === 0 && (
          <div className="text-center p-12 bg-navy-900 rounded-xl border border-navy-800 text-gray-400">
            No inquiries received yet.
          </div>
        )}
      </div>
    </div>
  );
}