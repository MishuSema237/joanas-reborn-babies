import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import SiteHeader from "@/components/layout/site-header";
import { BackToTop } from "@/components/layout/back-to-top";
import { CartProvider } from "@/lib/context/cart-context";
import { MainContent } from "@/components/layout/main-content";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const bodyFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

const displayFont = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Joanna's Reborns",
  description:
    "Handcrafted with love to bring comfort, relief, and healing to hearts grieving the loss of a child or seeking companionship.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bodyFont.variable} ${displayFont.variable} bg-white text-black antialiased`}
      >
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <MainContent>
              {children}
            </MainContent>
            <SiteFooter />
          </div>
          <BackToTop />
          <Toaster position="bottom-right" />
        </CartProvider>
      </body>
    </html>
  );
}
