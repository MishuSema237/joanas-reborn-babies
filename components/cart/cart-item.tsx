"use client";

import Image from "next/image";
import { FaTimes } from "react-icons/fa";
import { useCart } from "@/lib/context/cart-context";
import type { CartItem } from "@/lib/context/cart-context";

interface CartItemProps {
  item: CartItem;
}

export function CartItemComponent({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();

  const handleQuantityChange = (delta: number) => {
    const newQuantity = item.quantity + delta;
    updateQuantity(item.id, newQuantity);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center py-4 border-b border-pink-200 gap-4 last:border-b-0 hover:bg-pink-50 transition-colors rounded-lg px-2">
      {/* Top Section: Image and Details */}
      <div className="flex items-center gap-4 w-full sm:w-auto flex-grow">
        {/* Image */}
        <div className="w-20 h-20 flex-shrink-0 bg-gray-100 border border-gray-300 flex items-center justify-center overflow-hidden rounded-md">
          {item.imageUrl || (item.images && item.images.length > 0) ? (
            <Image
              src={item.imageUrl || item.images![0]}
              alt={item.name}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-400 text-xs">Product Image</span>
          )}
        </div>

        {/* Details */}
        <div className="flex-grow">
          <p className="font-medium text-black mb-1">{item.name}</p>
          {item.attributes && (
            <p className="text-sm text-gray-500 mb-0">
              {item.attributes.hairColor && `${item.attributes.hairColor} Hair`}
              {item.attributes.hairColor && item.attributes.eyeColor && ", "}
              {item.attributes.eyeColor && `${item.attributes.eyeColor} Eyes`}
              {item.attributes.size && `, ${item.attributes.size}`}
            </p>
          )}
        </div>
      </div>

      {/* Bottom Section (Mobile) / Right Section (Desktop): Quantity and Price */}
      <div className="flex items-center justify-between w-full sm:w-auto gap-2 ">
        {/* Quantity Control */}
        <div className="flex items-center border border-gray-300 h-8 text-sm">
          <button
            type="button"
            onClick={() => handleQuantityChange(-1)}
            className="bg-transparent border-0 text-black h-full w-8 cursor-pointer p-0 text-base hover:bg-gray-100 flex items-center justify-center"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="px-2 border-l border-r border-gray-300 min-w-8 text-center flex items-center justify-center h-full">
            {item.quantity}
          </span>
          <button
            type="button"
            onClick={() => handleQuantityChange(1)}
            className="bg-transparent border-0 text-black h-full w-8 cursor-pointer p-0 text-base hover:bg-gray-100 flex items-center justify-center"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <div className="flex items-center gap-4 md:gap-2">
          {/* Price */}
          <span className="font-medium text-black min-w-[80px] text-right">
            ${(item.price * item.quantity).toFixed(2)}
          </span>

          {/* Remove Button */}
          <button
            type="button"
            onClick={() => removeItem(item.id)}
            className="bg-transparent border-0 text-gray-500 cursor-pointer text-sm hover:text-red-600 p-2"
            aria-label="Remove item"
          >
            <FaTimes />
          </button>
        </div>
      </div>
    </div>
  );
}

