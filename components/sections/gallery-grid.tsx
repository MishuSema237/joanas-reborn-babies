"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageViewer } from "@/components/ui/image-viewer";

interface GalleryItem {
  _id: string;
  title?: string;
  description?: string;
  imageUrl: string;
  tags?: string[];
}

interface GalleryGridProps {
  items: GalleryItem[];
}

export function GalleryGrid({ items }: GalleryGridProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const images = items.map(item => item.imageUrl).filter(Boolean);

  const handleImageClick = (item: GalleryItem) => {
    const index = items.findIndex(i => i._id === item._id);
    if (index !== -1) {
      setSelectedIndex(index);
    }
  };

return (
    <>
      <div className="columns-3 md:columns-4 lg:columns-5 gap-2 md:gap-3 space-y-2 md:space-y-3">
        {items.map((item) => (
          <button
            key={item._id}
            type="button"
            onClick={() => handleImageClick(item)}
            className="w-full break-inside-avoid bg-gray-100 border border-gray-200 rounded-lg overflow-hidden relative hover:scale-[1.02] transition-transform cursor-pointer group block"
          >
            {item.imageUrl ? (
              <div className="relative w-full">
                <Image
                  src={item.imageUrl}
                  alt={item.title || "Gallery image"}
                  width={400}
                  height={400}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </div>
            ) : (
              <div className="h-40 md:h-48 flex items-center justify-center">
                <span className="text-gray-400 text-sm">No Image</span>
              </div>
            )}
          </button>
        ))}
      </div>

      <ImageViewer
        isOpen={selectedIndex !== null}
        onClose={() => setSelectedIndex(null)}
        images={images}
        initialIndex={selectedIndex || 0}
      />
    </>
  );
}


