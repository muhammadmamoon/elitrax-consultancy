// src/app/(admin)/layout.tsx
import "@/app/globals.css";
import AdminSidebar from "../components/layout/AdminSidebar";
import AdminHeader from "../components/layout/AdminHeader";

export const metadata = {
  title: "Admin Dashboard | ELITRAX Consultancy",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-navy-950 text-gray-100">
      <body className="flex h-screen overflow-hidden antialiased">
        <AdminSidebar />
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto p-6 md:p-10 bg-navy-950">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}