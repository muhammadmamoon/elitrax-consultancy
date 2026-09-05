
export const dynamic = "force-dynamic";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Package, 
  Globe2, 
  Briefcase, 
  MessageSquare, 
  Video, 
  Image as ImageIcon, 
  Settings, 
  User, 
  LogOut 
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Packages", href: "/admin/packages", icon: Package },
    { name: "Countries", href: "/admin/countries", icon: Globe2 },
    { name: "Services", href: "/admin/services", icon: Briefcase },
    { name: "Inquiries", href: "/admin/inquiries", icon: MessageSquare },
    { name: "Testimonials", href: "/admin/testimonials", icon: Video },
    { name: "Media", href: "/admin/media", icon: ImageIcon },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen w-full bg-navy-950 text-gray-100 overflow-hidden">
      {/* 1. FIXED LEFT SIDEBAR */}
      <aside className="w-64 flex-shrink-0 bg-navy-900/80 border-r border-navy-800 flex flex-col justify-between">
        <div>
          {/* Logo */}
          <div className="h-16 flex items-center px-6 border-b border-navy-800">
            <Link href="/admin" className="flex items-center gap-2">
              <span className="text-xl font-black tracking-wider text-white">
                ELITRAX <span className="text-gold-400 text-xs font-semibold block">CONSULTANCY</span>
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-300 rounded-xl hover:bg-navy-800 hover:text-gold-400 transition-all duration-150"
                >
                  <Icon className="w-5 h-5 text-gray-400 group-hover:text-gold-400" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer / User Info */}
        <div className="p-4 border-t border-navy-800">
          <div className="flex items-center gap-3 px-3 py-2 text-xs text-gray-400">
            <span>Admin Portal v1.0</span>
          </div>
        </div>
      </aside>

      {/* 2. RIGHT SIDE WRAPPER */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        {/* TOP HEADER */}
        <header className="h-16 flex-shrink-0 bg-navy-900/60 border-b border-navy-800 px-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white tracking-wide">Control Panel</h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-navy-800/80 border border-navy-700 px-3 py-1.5 rounded-lg text-sm text-gray-200">
              <User className="w-4 h-4 text-gold-400" />
              <span>Admin User</span>
            </div>
            <button 
              type="button"
              title="Logout"
              className="p-2 text-gray-400 hover:text-red-400 hover:bg-navy-800 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* MAIN CONTENT AREA (PAGES SCROLL HERE) */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-navy-950">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}