import { getProducts } from "@/lib/utils/db-helpers";
import { ShopClient } from "@/components/shop/shop-client";

export const metadata = {
  title: "Shop Reborn Baby Dolls | Mia Catherine Reborns",
  description: "Browse our premium collection of handcrafted silicone reborn baby dolls. Medical-grade platinum silicone, artisan-crafted realism, weighted for authentic feel. Find your perfect reborn companion today.",
  keywords: [
    "buy reborn dolls",
    "reborn baby dolls for sale",
    "silicone reborn baby",
    "realistic reborn dolls shop",
    "premium reborn dolls",
    "handcrafted reborn babies",
    "reborn doll store",
  ],
  openGraph: {
    title: "Shop Reborn Baby Dolls | Mia Catherine Reborns",
    description: "Browse our premium collection of handcrafted silicone reborn baby dolls.",
    type: "website",
  },
};

export default async function ShopPage() {
  let products = [];
  try {
    if (process.env.MONGODB_URI) {
      products = await getProducts({ status: "active" });
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  return <ShopClient initialProducts={products} />;
}

