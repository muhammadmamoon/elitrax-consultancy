import type { Metadata } from "next";
import "@/app/globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import AirplaneCursor from "../components/ui/AirplaneCursor";
import WhatsAppButton from "../components/ui/WhatsAppButton";

export const metadata: Metadata = {
  title: "ELITRAX Consultancy | Premium Travel & Visa Services",
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning browser extensions (like Grammerly) ke error ko rokega
    <html lang="en" className="scroll-smooth bg-navy-950 text-gray-100" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="antialiased selection:bg-gold-500 selection:text-navy-950 flex flex-col min-h-screen">
        <AirplaneCursor />
        <WhatsAppButton />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}