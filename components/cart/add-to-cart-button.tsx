"use client";

import { useState } from "react";
import { useCart } from "@/lib/context/cart-context";
import { Button } from "@/components/ui/button";
import { FaShoppingCart } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";

interface AddToCartButtonProps {
  product: {
    id?: string;
    _id?: string;
    name: string;
    price: number;
    slug: string;
    imageUrl?: string;
    images?: string[];
  };
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);

    // Simulate a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));

    addItem({
      id: product.id || product._id || "",
      name: product.name,
      price: product.price,
      slug: product.slug,
      imageUrl: product.imageUrl || (product.images && product.images[0]),
      images: product.images,
    });

    toast.success("Added to cart!");
    setIsLoading(false);
    // Optionally redirect to cart or show a toast notification
    // router.push("/cart");
  };

  return (
    <div className="w-full mb-8">
      <Button
        className="w-full mb-4"
        onClick={handleAddToCart}
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Adding...
          </span>
        ) : (
          <>
            <FaShoppingCart className="mr-2" />
            Add to Cart
          </>
        )}
      </Button>

      {/* Trust Badges */}
      <div className="flex justify-center items-center gap-6 mt-4 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
        <div className="flex flex-col items-center gap-1">
          <div className="relative h-8 w-24">
            <Image
              src="/assets/fortinet logo.png"
              alt="Fortinet Secured"
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="relative h-8 w-24">
            <Image
              src="/assets/cloudflare logo.jpeg"
              alt="Cloudflare Protected"
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="relative h-8 w-16">
            <Image
              src="/assets/okta logo.png"
              alt="Okta Verified"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

