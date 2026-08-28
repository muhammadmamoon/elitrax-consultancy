// src/components/layout/AdminSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, Package, Globe, Briefcase, 
  MessageSquare, Video, Settings, Image as ImageIcon, Compass 
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();
  if (pathname === "/admin/login") return null;

  const links = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Packages", href: "/admin/packages", icon: Package },
    { name: "Countries", href: "/admin/countries", icon: Globe },
    { name: "Services", href: "/admin/services", icon: Briefcase },
    { name: "Inquiries", href: "/admin/inquiries", icon: MessageSquare },
    { name: "Testimonials", href: "/admin/testimonials", icon: Video },
    { name: "Media", href: "/admin/media", icon: ImageIcon },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-navy-900 border-r border-navy-800 hidden md:flex flex-col">
      <div className="h-16 flex items-center gap-3 px-6 border-b border-navy-800">
        <Compass className="w-6 h-6 text-gold-500" />
        <span className="text-white font-bold tracking-wider">ELITRAX ADMIN</span>
      </div>
      <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive 
                  ? "bg-gold-500/10 text-gold-400 border border-gold-500/20" 
                  : "text-gray-400 hover:bg-navy-800 hover:text-gray-200"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium text-sm">{link.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}