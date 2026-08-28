// src/components/ui/PackageCard.tsx
import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, CheckCircle } from "lucide-react";

interface PackageCardProps {
  title: string;
  slug: string;
  destination: string;
  price: number;
  duration: string;
  image: string;
  features: string[];
}

export default function PackageCard({ title, slug, destination, price, duration, image, features }: PackageCardProps) {
  return (
    <div className="bg-navy-900/60 border border-navy-800 rounded-2xl overflow-hidden hover:border-gold-500/30 transition-all duration-300 flex flex-col h-full group shadow-lg">
      <div className="relative h-56 w-full overflow-hidden">
        <Image src={image} alt={title} fill className="object-cover group-hover:scale-105 transition duration-700" />
        <div className="absolute top-4 right-4 bg-navy-950/90 text-gold-400 text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-md">
          {duration}
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-1.5 text-xs text-gray-400 uppercase tracking-wider mb-2">
          <MapPin className="w-3.5 h-3.5 text-gold-500" /> {destination}
        </div>
        <h3 className="text-xl font-bold text-white leading-tight mb-4">{title}</h3>
        
        <ul className="space-y-2 mb-6 flex-1">
          {features.slice(0, 3).map((feat, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
              <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>{feat}</span>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-navy-800">
          <div>
            <p className="text-xs text-gray-400">Starting from</p>
            <p className="text-xl font-bold text-gold-400">${price}</p>
          </div>
          <Link href={`/packages`} className="px-5 py-2.5 bg-navy-800 hover:bg-gold-500 hover:text-navy-950 text-white text-sm font-semibold rounded-lg transition-colors">
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}