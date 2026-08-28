// src/app/(admin)/admin/media/page.tsx
import { db } from "../../../lib/db";
import { Image as ImageIcon, Trash2, HardDrive } from "lucide-react";
import Image from "next/image";
import MediaUploader from "../../../components/admin/MediaUploader";

export default async function AdminMediaPage() {
  const mediaFiles = await db.media.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <HardDrive className="w-6 h-6 text-gold-500" /> Media Library
        </h1>
        <p className="text-xs text-gray-400 mt-1">Manage global assets, package imagery, and flags.</p>
      </div>

      {/* Since we can't do interactive uploads in server component directly, in a real app you'd wrap this upload section in a client component. We'll show the UI grid here. */}
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {mediaFiles.map((media:any) => (
          <div key={media.id} className="relative group rounded-xl overflow-hidden border border-navy-800 bg-navy-900 aspect-square">
            {media.mimeType.includes("image") ? (
              <Image src={media.url} alt={media.filename} fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs text-gray-500 break-all p-2 text-center">
                {media.filename}
              </div>
            )}
            
            <div className="absolute inset-0 bg-navy-950/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 gap-2 backdrop-blur-sm">
              <span className="text-[10px] text-gray-300 text-center truncate w-full">{media.filename}</span>
              <span className="text-[10px] text-gold-400">{(media.size / 1024).toFixed(1)} KB</span>
              <button className="mt-2 p-1.5 bg-red-500/20 text-red-400 rounded hover:bg-red-500 hover:text-white transition">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {mediaFiles.length === 0 && (
        <div className="text-center p-12 bg-navy-900 rounded-xl border border-navy-800 text-gray-400">
          No media files uploaded yet.
        </div>
      )}
    </div>
  );
}