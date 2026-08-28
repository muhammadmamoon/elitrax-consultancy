import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import AirplaneCursor from "./components/ui/AirplaneCursor";
import WhatsAppButton from "./components/ui/WhatsAppButton";

export const metadata: Metadata = {
  title: "ELITRAX Consultancy | Premium Travel & Visa Services",
  description: "Global travel strategy, visa documentation consulting, and executive Umrah tours.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth bg-navy-950 text-gray-100" data-scroll-behavior="smooth">
      <body className="antialiased selection:bg-gold-500 selection:text-navy-950 flex flex-col min-h-screen">
        
        {/* Custom Effects & Floating Buttons */}
        <AirplaneCursor />
        <WhatsAppButton />

        {/* Website Ka Header / Navbar */}
        <Navbar />
        
        {/* Main Page Content (Hero section waghera yahan show hoga) */}
        <main className="flex-1">
          {children}
        </main>

        {/* Website Ka Footer */}
        <Footer />
        
      </body>
    </html>
  );
}