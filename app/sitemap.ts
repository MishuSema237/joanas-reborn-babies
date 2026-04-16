import { MetadataRoute } from "next";
import { getProducts, getGalleryItems } from "@/lib/utils/db-helpers";

const BASE_URL = "https://www.miacatherinereborns.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily" as const, priority: 1.0 },
    { url: `${BASE_URL}/shop`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${BASE_URL}/gallery`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${BASE_URL}/faq`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${BASE_URL}/track-order`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.5 },
  ];

  try {
    if (process.env.MONGODB_URI) {
      const products = await getProducts({ status: "active" });
      const galleryItems = await getGalleryItems({});

      const productUrls = products.map((product: any) => ({
        url: `${BASE_URL}/product/${product.slug}`,
        lastModified: new Date(product.updatedAt || product.createdAt),
        changeFrequency: "weekly" as const,
        priority: 0.8,
        images: product.images?.[0] ? [{ url: product.images[0], title: product.name }] : [],
      }));

      return [...pages, ...productUrls];
    }
  } catch (error) {
    console.error("Error generating sitemap:", error);
  }

  return pages;
}