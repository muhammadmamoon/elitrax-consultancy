"use client";

import { useEffect, useState, useRef } from "react";
import { 
  Image as ImageIcon, 
  UploadCloud, 
  Trash2, 
  Copy, 
  Check, 
  Loader2, 
  ExternalLink,
  Search
} from "lucide-react";

interface MediaAsset {
  id: string;
  name: string;
  url: string;
  size: string;
  createdAt: string;
}

export default function AdminMediaPage() {
  const [mediaList, setMediaList] = useState<MediaAsset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 1. Fetch Media List
  const loadMedia = () => {
    fetch("/api/media")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        setMediaList(Array.isArray(data) ? data : []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching media:", err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadMedia();
  }, []);

  // 2. Upload Handler
  const handleUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file (JPG, PNG, WEBP, etc.)");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/media", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        loadMedia();
      } else {
        const err = await res.json();
        alert(err.error || "Upload failed");
      }
    } catch {
      alert("An error occurred while uploading.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // 3. Copy Link to Clipboard
  const handleCopy = (relativeUrl: string) => {
    const fullUrl = `${window.location.origin}${relativeUrl}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedUrl(relativeUrl);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  // 4. Delete Media File
  const handleDelete = async (fileName: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this media asset?")) return;

    try {
      const res = await fetch(`/api/media?fileName=${encodeURIComponent(fileName)}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setMediaList((prev) => prev.filter((item) => item.name !== fileName));
      } else {
        alert("Failed to delete media asset.");
      }
    } catch {
      alert("Error deleting file.");
    }
  };

  // Filter by Search
  const filteredList = mediaList.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <ImageIcon className="w-6 h-6 text-gold-400" /> Media &amp; Asset Library
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Upload images, banners, and thumbnails. Copy absolute links directly to forms.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-500" />
          <input
            type="text"
            placeholder="Search assets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-navy-900 border border-navy-800 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gold-500"
          />
        </div>
      </div>

      {/* Drag and Drop / Upload Banner */}
      <div
        onClick={() => fileInputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            fileInputRef.current?.click();
          }
        }}
        role="button"
        tabIndex={0}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          if (e.dataTransfer.files?.[0]) {
            handleUpload(e.dataTransfer.files[0]);
          }
        }}
        className="border-2 border-dashed border-navy-700 hover:border-gold-500/60 bg-navy-900/40 hover:bg-navy-900/80 transition-all rounded-2xl p-8 text-center cursor-pointer flex flex-col items-center justify-center space-y-3 group"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.[0]) handleUpload(e.target.files[0]);
          }}
        />
        <div className="w-14 h-14 rounded-full bg-navy-950 border border-navy-800 group-hover:border-gold-500/40 flex items-center justify-center transition-colors shadow-inner">
          {isUploading ? (
            <Loader2 className="w-6 h-6 text-gold-500 animate-spin" />
          ) : (
            <UploadCloud className="w-6 h-6 text-gold-400 group-hover:scale-110 transition-transform" />
          )}
        </div>
        <div>
          <p className="text-sm font-semibold text-white">
            {isUploading ? "Uploading to media assets..." : "Click or drag images here to upload"}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">Supports PNG, JPG, WEBP, SVG (Max 10MB)</p>
        </div>
      </div>

      {/* Media Assets Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-gray-400 border-b border-navy-800 pb-2">
          <span>Total Assets: {filteredList.length}</span>
        </div>

        {isLoading ? (
          <div className="py-20 text-center text-gray-400 space-y-2">
            <Loader2 className="w-6 h-6 animate-spin text-gold-500 mx-auto" />
            <p className="text-xs">Loading media library...</p>
          </div>
        ) : filteredList.length === 0 ? (
          <div className="py-16 text-center text-gray-500 bg-navy-900/30 rounded-2xl border border-navy-800/80">
            No media assets found. Upload an image above to get started.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredList.map((asset) => (
              <div
                key={asset.id}
                className="bg-navy-900 border border-navy-800 hover:border-gold-500/40 rounded-xl overflow-hidden group flex flex-col justify-between transition-all duration-200 shadow-lg"
              >
                {/* Thumbnail Container */}
                <div className="relative aspect-square w-full bg-navy-950 overflow-hidden">
                  <img
                    src={asset.url}
                    alt={asset.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    {/* View full size in new tab */}
                    <a
                      href={asset.url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 bg-navy-950/80 hover:bg-gold-500 hover:text-navy-950 text-white rounded-lg transition"
                      title="Open full image"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => handleDelete(asset.name)}
                      className="p-2 bg-navy-950/80 hover:bg-red-500 text-white rounded-lg transition"
                      title="Delete asset"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Info & Copy Action */}
                <div className="p-3 space-y-2 bg-navy-900">
                  <div className="truncate text-xs font-medium text-gray-200" title={asset.name}>
                    {asset.name}
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-gray-500">
                    <span>{asset.size}</span>
                    <span>{new Date(asset.createdAt).toLocaleDateString()}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(asset.url)}
                    className={`w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition border ${
                      copiedUrl === asset.url
                        ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                        : "bg-navy-950 text-gold-400 border-navy-800 hover:border-gold-500/40"
                    }`}
                  >
                    {copiedUrl === asset.url ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copy URL
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}