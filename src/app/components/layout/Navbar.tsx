// src/components/layout/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Compass, Menu, X, Globe, PhoneCall } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Umrah", href: "/umrah" },
    { name: "Business", href: "/business-services" },
    { name: "Packages", href: "/packages" },
    { name: "Destinations", href: "/countries" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-navy-950/90 backdrop-blur-md border-b border-gold-500/20 py-3.5 shadow-2xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand identity */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.4)]">
            <Compass className="w-6 h-6 text-navy-950 transform group-hover:rotate-45 transition duration-500" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-wider text-white">
              ELITRAX
            </span>
            <span className="text-[10px] tracking-widest text-gold-400 font-semibold uppercase -mt-1">
              Consultancy
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-gray-300 hover:text-gold-400 transition"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/contact"
            className="px-5 py-2.5 rounded-full border border-gold-500/50 bg-gold-500/10 hover:bg-gold-500 hover:text-navy-950 text-gold-400 font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-sm"
          >
            Get Consultation
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
          className="lg:hidden text-gray-300 hover:text-white"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-navy-950/95 backdrop-blur-xl border-b border-navy-800 p-6 flex flex-col gap-4 shadow-2xl animate-in slide-in-from-top-5">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="text-base font-medium text-gray-200 hover:text-gold-400 transition py-2 border-b border-navy-900"
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="w-full text-center py-3 mt-2 rounded-lg bg-gold-500 text-navy-950 font-bold uppercase tracking-wider text-xs"
          >
            Get Consultation
          </Link>
        </div>
      )}
    </header>
  );
}