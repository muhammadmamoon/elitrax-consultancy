// src/components/ui/VideoModal.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import Image from "next/image";

interface VideoModalProps {
  videoUrl: string;
  thumbnailUrl: string;
  clientName: string;
}

export default function VideoModal({ videoUrl, thumbnailUrl, clientName }: VideoModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div 
        onClick={() => setIsOpen(true)}
        className="relative w-full h-48 rounded-xl overflow-hidden cursor-pointer group border border-navy-700"
      >
        <Image src={thumbnailUrl} alt={clientName} fill className="object-cover transition-transform duration-700 group-hover:scale-110 brightness-75 group-hover:brightness-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-gold-500/90 text-navy-950 flex items-center justify-center transform group-hover:scale-110 transition shadow-[0_0_20px_rgba(212,175,55,0.4)]">
            <Play className="w-5 h-5 ml-1" />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/90 backdrop-blur-md"
          >
            <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-gold-500/30">
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-navy-900/80 text-white rounded-full flex items-center justify-center hover:bg-gold-500 hover:text-navy-950 transition"
              >
                <X className="w-5 h-5" />
              </button>
              <video 
                src={videoUrl} 
                controls 
                autoPlay 
                className="w-full h-auto max-h-[80vh] object-contain outline-none"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}