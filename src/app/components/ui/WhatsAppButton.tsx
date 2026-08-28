// src/components/ui/WhatsAppButton.tsx
"use client";

import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  defaultNumber?: string;
}

export default function WhatsAppButton({ defaultNumber = "+1234567890" }: WhatsAppButtonProps) {
  const [phone, setPhone] = useState(defaultNumber);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data?.whatsapp_number) setPhone(data.whatsapp_number);
      })
      .catch(() => {});
  }, []);

  const handleClick = () => {
    const url = `https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
      "Hello ELITRAX Consultancy, I would like to inquire about your premium visa and travel services."
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 group">
      <div className="absolute -top-10 left-0 hidden group-hover:block bg-navy-900 border border-gold-500/30 text-gold-300 text-xs py-1.5 px-3 rounded-md shadow-2xl backdrop-blur-md whitespace-nowrap">
        Chat with ELITRAX Consultancy
      </div>
      <button
        onClick={handleClick}
        aria-label="Direct WhatsApp Consultation"
        className="relative flex items-center justify-center w-14 h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all duration-300 transform hover:scale-110"
      >
        <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-25" />
        <MessageCircle className="w-7 h-7 relative z-10" />
      </button>
    </div>
  );
}