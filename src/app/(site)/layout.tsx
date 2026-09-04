// cspell:words ELITRAX Grammerly
import type { Metadata } from "next";
import "@/app/globals.css";
import AirplaneCursor from "../components/ui/AirplaneCursor";
import WhatsAppButton from "../components/ui/WhatsAppButton";

export const metadata: Metadata = {
  title: "ELITRAX Consultancy | Premium Travel & Visa Services",
  description:
    "Premier corporate mobility, luxury Umrah itineraries, and regulatory visa filing solutions.",
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning browser extensions (like Grammarly) ke mismatch errors ko rokega
    <html
      lang="en"
      className="scroll-smooth bg-navy-950 text-gray-100"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="antialiased selection:bg-gold-500 selection:text-navy-950 flex flex-col min-h-screen">
        <AirplaneCursor />
        <WhatsAppButton />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}