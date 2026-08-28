// src/components/admin/MediaUploader.tsx
"use client";

import { useState } from "react";
import { UploadCloud, X, Loader2, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface MediaUploaderProps {
  onUploadSuccess: (url: string) => void;
  currentImage?: string | null;
}

export default function MediaUploader({ onUploadSuccess, currentImage }: MediaUploaderProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(currentImage || "");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      setError("File exceeds 15MB limit.");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setPreview(data.media.url);
        onUploadSuccess(data.media.url);
      } else {
        setError(data.error || "Upload failed");
      }
    } catch (err) {
      setError("Network error during upload");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      {preview ? (
        <div className="relative w-full h-48 rounded-xl overflow-hidden border border-navy-700 group bg-navy-950">
          <Image src={preview} alt="Preview" fill className="object-cover" />
          <div className="absolute inset-0 bg-navy-950/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
            <button
              type="button"
              onClick={() => { setPreview(""); onUploadSuccess(""); }}
              className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-navy-700 rounded-xl hover:bg-navy-800/50 hover:border-gold-500/50 transition cursor-pointer bg-navy-900/30">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {loading ? (
              <Loader2 className="w-8 h-8 text-gold-500 animate-spin mb-3" />
            ) : (
              <UploadCloud className="w-8 h-8 text-gray-400 mb-3" />
            )}
            <p className="text-sm text-gray-400">
              <span className="font-semibold text-gold-400">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500 mt-1">SVG, PNG, JPG or WEBP (Max 15MB)</p>
          </div>
          <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} disabled={loading} />
        </label>
      )}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}