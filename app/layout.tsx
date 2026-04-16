import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import SiteHeader from "@/components/layout/site-header";
import { BackToTop } from "@/components/layout/back-to-top";
import { CartProvider } from "@/lib/context/cart-context";
import { MainContent } from "@/components/layout/main-content";
import { Toaster } from "react-hot-toast";
import { OfflineIndicator } from "@/components/ui/offline-indicator";
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://www.miacatherinereborns.com"),
  title: {
    default: "Mia Catherine Reborns | Premium Handcrafted Silicone Reborn Baby Dolls",
    template: "%s | Mia Catherine Reborns",
  },
  description:
    "Discover premium handcrafted silicone reborn baby dolls at Mia Catherine Reborns. Our lifelike, weighted reborn babies bring comfort, healing, and joy. Free shipping on orders over $200. Medical-grade platinum silicone, artisan-crafted realism.",
  keywords: [
    "reborn baby dolls",
    "silicone reborn baby",
    "realistic reborn dolls",
    "lifelike silicone baby",
    "premium reborn dolls",
    "handcrafted reborn babies",
    "full body silicone baby",
    "weighted reborn baby",
    "collectible reborn dolls",
    "therapeutic reborn dolls",
    "silicone baby dolls",
    "reborn doll for grief",
    "reborn doll collector",
    "realistic baby doll",
    "silicone newborn doll",
    "platinum silicone baby",
    "baby reborn dolls",
    "real baby doll realistic",
    "reborn dolls for sale",
    "silicone doll baby",
  ],
  authors: [{ name: "Mia Catherine Reborns" }],
  creator: "Mia Catherine Reborns",
  publisher: "Mia Catherine Reborns",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.miacatherinereborns.com",
    title: "Mia Catherine Reborns | Premium Handcrafted Silicone Reborn Baby Dolls",
    description:
      "Discover premium handcrafted silicone reborn baby dolls. Medical-grade platinum silicone, artisan-crafted realism, weighted for authentic feel. Free shipping on orders over $200.",
    siteName: "Mia Catherine Reborns",
    images: [
      {
        url: '/assets/og-logo.jpg',
        width: 1200,
        height: 630,
        alt: "Mia Catherine Reborns - Premium Handcrafted Silicone Reborn Baby Dolls",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Mia Catherine Reborns | Premium Handcrafted Silicone Reborn Baby Dolls",
    description: "Discover premium handcrafted silicone reborn baby dolls. Medical-grade platinum silicone, artisan-crafted realism, weighted for authentic feel.",
    images: ['/assets/og-logo.jpg'],
    creator: '@miacatherinereborns',
  },
  alternates: {
    canonical: "https://www.miacatherinereborns.com",
    languages: {
      en: "https://www.miacatherinereborns.com",
    },
  },
  icons: {
    icon: [
      { url: '/assets/baby1.png', type: 'image/png' },
    ],
    apple: [
      { url: '/assets/baby1.png' },
    ],
  },
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
          <OfflineIndicator />
        </CartProvider>
      </body>
    </html>
  );
}
