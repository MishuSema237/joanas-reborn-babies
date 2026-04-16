import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { Button } from "./button";
import { FaShoppingCart } from "react-icons/fa";
import toast from "react-hot-toast";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  slug: string;
  description?: string;
}

import { useCart } from "@/lib/context/cart-context";

export function ProductCard({
  id,
  name,
  price,
  imageUrl,
  slug,
  description,
}: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    addItem({
      id,
      name,
      price,
      slug,
      imageUrl,
    });
    toast.success("Added to cart");
  };

  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/product/${slug}`}>
      <div 
        className="group relative bg-white md:rounded-2xl rounded-lg overflow-hidden border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}

          {/* Gradient Overlay on Hover */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

          {/* Quick Add Button */}
          <div className={`absolute bottom-3 right-3 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            <Button
              onClick={handleAddToCart}
              size="sm"
              className="bg-rose-500 hover:bg-rose-600 text-white border-none rounded-full px-3 py-1.5 h-8 shadow-lg flex items-center gap-1.5 text-xs font-medium"
            >
              <FaShoppingCart className="text-xs" />
              Add
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-900 capitalize truncate mb-1">
            {name}
          </h3>
          <p className="text-xs text-gray-500 line-clamp-2 mb-3">
            {description || "Handcrafted silicone reborn baby with lifelike details."}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-base font-bold text-gray-900">
              ${(price || 0).toFixed(0)}
            </span>
            <span className="text-xs text-rose-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              View →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

