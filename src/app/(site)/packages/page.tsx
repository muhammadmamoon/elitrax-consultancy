import PackageCard from "../../components/ui/PackageCard";
import { Briefcase } from "lucide-react";

export const metadata = {
  title: "Premium Travel Packages & Umrah | ELITRAX Consultancy",
  description: "Explore our curated executive travel itineraries and luxury Umrah packages.",
};

export default function PackagesPage() {
  // Static Dummy Data for Packages
  const staticPackages = [
    {
      id: "1",
      title: "Executive Royal Umrah Odyssey",
      slug: "executive-royal-umrah",
      destination: "Makkah & Madinah, KSA",
      price: 4950,
      duration: "12 Days / 11 Nights",
      image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1200&q=80",
      features: [
        "Luxury 5-Star Hotel Accommodations",
        "Private VIP Airport & Inter-city Transfers",
        "Umrah Visa E-Permit Processing",
        "Dedicated Ground Concierge"
      ],
    },
    {
      id: "2",
      title: "Corporate Expo Delegation",
      slug: "corporate-expo-dubai",
      destination: "Dubai, UAE",
      price: 2100,
      duration: "5 Days / 4 Nights",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
      features: [
        "Business Visa Processing",
        "Conference Registration Assistance",
        "Premium Executive Transport",
        "Corporate Hotel Stay"
      ],
    },
    {
      id: "3",
      title: "European Business Circuit",
      slug: "euro-business-circuit",
      destination: "Schengen Area (Multiple)",
      price: 3400,
      duration: "10 Days",
      image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1200&q=80",
      features: [
        "Schengen Multi-Entry Visa Support",
        "Cross-Border Rail Passes",
        "B2B Meeting Room Bookings",
        "Priority Consulate Appointments"
      ],
    }
  ];

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <div className="max-w-3xl mb-16">
        <div className="inline-flex items-center gap-2 text-gold-400 text-xs font-bold uppercase tracking-widest mb-4">
          <Briefcase className="w-4 h-4" /> Curated Itineraries
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
          Exclusive Travel Packages
        </h1>
        <p className="text-gray-400 text-lg">
          From VIP Umrah expeditions to structured corporate travel plans, review our premium global itineraries.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {staticPackages.map((pkg) => (
          <PackageCard
            key={pkg.id}
            title={pkg.title}
            slug={pkg.slug}
            destination={pkg.destination}
            price={pkg.price}
            duration={pkg.duration}
            image={pkg.image}
            features={pkg.features}
          />
        ))}
      </div>
    </div>
  );
}