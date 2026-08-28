import CountryCard from "../../components/ui/CountryCard";
import { Globe2 } from "lucide-react";

export const metadata = {
  title: "Global Destinations | ELITRAX Consultancy",
  description: "Browse our supported countries for visit visas, study permits, and corporate migration.",
};

export default function CountriesPage() {
  // Static Dummy Data for Countries
  const staticCountries = [
    {
      id: "c1",
      name: "United States",
      slug: "usa",
      flagUrl: "🇺🇸",
      heroImageUrl: "https://images.unsplash.com/photo-1508433957232-3107f5fd5995?auto=format&fit=crop&w=1200&q=80",
      servicesCount: 3,
    },
    {
      id: "c2",
      name: "United Kingdom",
      slug: "uk",
      flagUrl: "🇬🇧",
      heroImageUrl: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80",
      servicesCount: 2,
    },
    {
      id: "c3",
      name: "Canada",
      slug: "canada",
      flagUrl: "🇨🇦",
      heroImageUrl: "https://images.unsplash.com/photo-1517935703635-271905454087?auto=format&fit=crop&w=1200&q=80",
      servicesCount: 4,
    },
    {
      id: "c4",
      name: "Schengen Area",
      slug: "schengen",
      flagUrl: "🇪🇺",
      heroImageUrl: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1200&q=80",
      servicesCount: 2,
    },
    {
      id: "c5",
      name: "Australia",
      slug: "australia",
      flagUrl: "🇦🇺",
      heroImageUrl: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=1200&q=80",
      servicesCount: 2,
    },
    {
      id: "c6",
      name: "Turkey",
      slug: "turkey",
      flagUrl: "🇹🇷",
      heroImageUrl: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80",
      servicesCount: 3,
    }
  ];

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <div className="max-w-3xl mb-16">
        <div className="inline-flex items-center gap-2 text-gold-400 text-xs font-bold uppercase tracking-widest mb-4">
          <Globe2 className="w-4 h-4" /> Destination Frameworks
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
          Global Visa Connectivity
        </h1>
        <p className="text-gray-400 text-lg">
          Select a region to review standard processing protocols, mandatory documentation, and consultancy assistance packages.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {staticCountries.map((country) => (
          <CountryCard
            key={country.id}
            name={country.name}
            slug={country.slug}
            flag={country.flagUrl}
            image={country.heroImageUrl}
            servicesCount={country.servicesCount}
          />
        ))}
      </div>
    </div>
  );
}