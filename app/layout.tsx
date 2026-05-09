import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GlamComm — Premier Event Organizer Indonesia",
  description:
    "GlamComm is a premier event organizer based in Jakarta, Indonesia. We specialize in concerts, corporate events, weddings, exhibitions, product launches, and festivals. Delivering unforgettable experiences.",
  keywords: [
    "GlamComm",
    "event organizer",
    "EO Jakarta",
    "konser",
    "corporate event",
    "wedding organizer",
    "festival",
    "event production",
    "Indonesia",
  ],
  openGraph: {
    title: "GlamComm — Premier Event Organizer",
    description:
      "Delivering unforgettable events across Indonesia. Concerts, corporate, weddings, exhibitions & more.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${outfit.variable} ${inter.variable}`}>
      <body className="text-stone-100 antialiased" style={{ backgroundColor: '#0A0A0A' }} suppressHydrationWarning>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
