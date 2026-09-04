// src/app/components/layout/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Phone, Compass, Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [settings, setSettings] = useState({
    siteName: "ELITRAX",
    contactPhone: "+92 300 1234567",
  });

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => (res.ok ? res.json() : {}))
      .then((data) => {
        if (data && Object.keys(data).length > 0) {
          setSettings((prev) => ({ ...prev, ...data }));
        }
      })
      .catch(() => {});
  }, []);

  if (pathname && pathname.startsWith("/admin")) {
    return null;
  }

  // Concise links to prevent desktop cramping
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Packages", href: "/packages" },
    { label: "Destinations", href: "/destinations" },
    { label: "Reviews", href: "/testimonials" },
    { label: "Terms", href: "/terms" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#050811]/90 backdrop-blur-md border-b border-navy-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo - Fixed size with no overlap */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 group-hover:scale-105 transition-transform shrink-0">
            <Compass className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-black tracking-tight text-white group-hover:text-gold-400 transition-colors leading-tight">
              {settings.siteName}
            </span>
            <span className="text-[9px] uppercase tracking-widest text-gold-400/80 font-bold">
              Visa & Travel
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7 shrink-0">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[11px] xl:text-xs font-semibold uppercase tracking-wider transition-all duration-200 relative py-1 ${
                  isActive
                    ? "text-gold-400 font-bold"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-400 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Button: Dynamic Phone Link */}
        <div className="hidden sm:flex items-center shrink-0">
          <a
            href={`tel:${settings.contactPhone}`}
            className="flex items-center gap-2 bg-gold-500/10 hover:bg-gold-500 hover:text-navy-950 text-gold-400 text-xs font-bold px-3.5 xl:px-4 py-2 rounded-lg border border-gold-500/30 transition-all duration-200"
          >
            <Phone className="w-3.5 h-3.5 shrink-0" />
            <span className="tracking-wide">{settings.contactPhone}</span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-gray-400 hover:text-white rounded-lg transition"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-gold-400" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#070c18] border-b border-navy-800 px-6 py-6 space-y-4">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block text-sm font-semibold uppercase tracking-wider ${
                pathname === item.href ? "text-gold-400 font-bold" : "text-gray-300"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-navy-800">
            <a
              href={`tel:${settings.contactPhone}`}
              className="flex items-center justify-center gap-2 bg-gold-500 text-navy-950 text-xs font-bold py-2.5 rounded-lg w-full"
            >
              <Phone className="w-4 h-4" />
              Call: {settings.contactPhone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}