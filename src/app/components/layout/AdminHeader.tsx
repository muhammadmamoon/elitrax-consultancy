// src/components/layout/AdminHeader.tsx
"use client";

import { usePathname, useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";

export default function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();
  
  if (pathname === "/admin/login") return null;

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <header className="h-16 bg-navy-900 border-b border-navy-800 flex items-center justify-between px-6 sticky top-0 z-10">
      <h2 className="text-white font-semibold text-lg hidden sm:block">Control Panel</h2>
      <div className="flex items-center gap-4 ml-auto">
        <div className="flex items-center gap-2 text-sm text-gray-300 bg-navy-950 px-3 py-1.5 rounded-full border border-navy-800">
          <User className="w-4 h-4 text-gold-400" />
          <span>Admin User</span>
        </div>
        <button 
          onClick={handleLogout}
          className="p-2 text-gray-400 hover:text-red-400 transition rounded-lg hover:bg-navy-800"
          title="Logout"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}