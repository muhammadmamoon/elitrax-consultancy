import Link from "next/link";
import Image from "next/image";
import { ArrowRight, FileText } from "lucide-react";

interface CountryCardProps {
  name: string;
  slug: string;
  flag: string;
  image: string;
  servicesCount: number;
}

export default function CountryCard({ name, slug, flag, image, servicesCount }: CountryCardProps) {
  return (
    <Link href={`/countries/${slug}`} className="group block h-[320px] relative rounded-2xl overflow-hidden border border-navy-700 hover:border-gold-500/50 transition-all duration-500 shadow-lg">
      <Image 
        src={image} 
        alt={name} 
        fill 
        className="object-cover transition-transform duration-700 group-hover:scale-110 brightness-50 group-hover:brightness-75" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-transparent" />
      
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <div className="flex items-center justify-between mb-2">
          <span className="text-3xl">{flag}</span>
          <span className="flex items-center gap-1.5 text-xs font-semibold text-navy-950 bg-gold-400 px-3 py-1 rounded-full shadow-md">
            <FileText className="w-3.5 h-3.5" /> {servicesCount} Services
          </span>
        </div>
        <h3 className="text-2xl font-bold text-white tracking-tight mb-2">{name}</h3>
        
        <div className="flex items-center gap-2 text-sm text-gold-400 font-bold translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          View Requirements <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}