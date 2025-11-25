"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageViewer } from "./image-viewer";

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

export function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  // If no images provided, create 5 placeholder images
  const displayImages = images.length > 0 ? images : Array(5).fill("");
  const mainImage = displayImages[selectedIndex];
  const hasRealImages = images.length > 0 && images[0] !== "";

  return (
    <div>
      {/* Main Image */}
      <div
        className="w-full h-[500px] mb-4 bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center cursor-zoom-in"
        onClick={() => hasRealImages && setIsViewerOpen(true)}
      >
        {hasRealImages && mainImage ? (
          <Image
            src={mainImage}
            alt={`${productName} - Image ${selectedIndex + 1}`}
            width={800}
            height={500}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <span className="text-gray-400 text-xl">Full Photo of {productName}</span>
        )}
      </div>

      {/* Thumbnail Gallery */}
      <div className="flex gap-4 overflow-x-auto p-2">
        {displayImages.map((image, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setSelectedIndex(index)}
            className={`w-[100px] h-[100px] flex-shrink-0 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center hover:opacity-80 transition-opacity ${selectedIndex === index ? "ring-2 ring-pink-400" : ""
              }`}
          >
            {hasRealImages && image ? (
              <Image
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-400 text-xs">Thumb {index + 1}</span>
            )}
          </button>
        ))}
      </div>

      <ImageViewer
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        images={images}
        initialIndex={selectedIndex}
      />
    </div>
  );
}

