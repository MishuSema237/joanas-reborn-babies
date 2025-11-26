import { getGalleryItems } from "@/lib/utils/db-helpers";
import Image from "next/image";
import { GalleryGrid } from "@/components/sections/gallery-grid";

export const metadata = {
  title: "Gallery - Reborn Babies",
  description:
    "Explore a collection of our most cherished creations. Each photo highlights the artistry and lifelike detail of our silicone babies.",
};

export default async function GalleryPage() {
  // Fetch gallery items from database
  // For now, return empty array if database not connected
  let galleryItems = [];
  try {
    // Only try to fetch if MONGODB_URI is set
    if (process.env.MONGODB_URI) {
      galleryItems = await getGalleryItems({});
    }
  } catch (error) {
    console.error("Error fetching gallery items:", error);
  }

  // If no items in database, show placeholder items
  if (galleryItems.length === 0) {
    galleryItems = Array.from({ length: 6 }, (_, i) => ({
      _id: `placeholder-${i}`,
      title: `Gallery Image ${i + 1}`,
      imageUrl: "",
      tags: [],
      featured: false,
      order: i,
    }));
  }

  return (
    <div className="w-full max-w-viewport mx-auto">
      <h1 className="text-center mb-4">Our Reborn Babies Gallery</h1>
      <p className="text-sm text-gray-500 text-center pb-10">
        Explore a collection of our most cherished creations. Each photo
        highlights the artistry and lifelike detail of our silicone babies.
      </p>
      <GalleryGrid items={galleryItems} />
    </div>
  );
}

