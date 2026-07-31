import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import Link from "next/link";
import { CartProvider } from "@/components/cart-provider";
import { Header } from "@/components/header";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["500", "600", "700"],
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Hearth & Crumb | Small-batch bakery",
    template: "%s | Hearth & Crumb",
  },
  description: "Small-batch scones, banana bread and seasonal bakes, handmade for local collection.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <CartProvider>
          <a href="#main" className="skip">Skip to content</a>
          <Header />
          <main id="main">{children}</main>
          <footer className="mt-24 border-t border-cocoa/10 bg-cocoa text-cream">
            <div className="shell grid gap-10 py-14 md:grid-cols-3">
              <div>
                <p className="font-serif text-3xl">Hearth & Crumb</p>
                <p className="mt-3 max-w-xs text-sm text-cream/70">Small-batch baking, made by hand and ready for your table.</p>
              </div>
              <div>
                <p className="font-semibold">Visit</p>
                <p className="mt-3 text-sm text-cream/70">Collection by appointment<br />Tuesday–Saturday</p>
              </div>
              <div className="flex gap-5 text-sm">
                <Link href="/contact">Contact</Link>
                <Link href="/admin/login">Admin</Link>
              </div>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
