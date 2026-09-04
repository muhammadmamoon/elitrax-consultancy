// src/components/ui/DestinationSlider.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Destination {
  name: string;
  slug: string;
  img: string;
  desc: string;
}

const destinations: Destination[] = [
  { name: "United States", slug: "usa", img: "https://images.unsplash.com/photo-1508433957232-3107f5fd5995?auto=format&fit=crop&w=1200&q=80", desc: "B1/B2, F1 Academic Track & Appointment Support" },
  { name: "United Kingdom", slug: "uk", img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80", desc: "Standard Visitor, CAS Study Routes & Concierge Filing" },
  { name: "Canada", slug: "canada", img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80", desc: "Visitor Visa, Study Direct Stream & ATIP/ODN File Review" },
  { name: "Schengen Area", slug: "schengen", img: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1200&q=80", desc: "Multi-Entry Business & Tourism Access to 27 States" },
  { name: "Australia", slug: "australia", img: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=1200&q=80", desc: "Subclass 600, Subclass 500 Higher Ed Placement" },
];

export default function DestinationSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % destinations.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[520px] overflow-hidden rounded-2xl border border-gold-500/20 bg-navy-900 shadow-2xl">
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: "0%", opacity: 1 }}
          exit={{ x: "-100%", opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={destinations[index].img}
            alt={destinations[index].name}
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 flex flex-col items-start gap-3">
            <span className="text-gold-400 font-semibold tracking-wider text-xs uppercase px-3 py-1 bg-gold-400/10 border border-gold-400/30 rounded-full">
              Global Gateway
            </span>
            <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              {destinations[index].name}
            </h3>
            <p className="text-gray-300 max-w-xl text-sm md:text-base leading-relaxed">
              {destinations[index].desc}
            </p>
            <Link
              href={`/countries/${destinations[index].slug}`}
              className="mt-2 inline-flex items-center gap-2 text-gold-400 font-medium hover:text-gold-300 transition group"
            >
              Explore Specific Protocols
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition" />
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-6 right-8 flex gap-2 z-10">
        {destinations.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-1.5 transition-all duration-300 rounded-full ${
              i === index ? "w-8 bg-gold-400" : "w-2 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}