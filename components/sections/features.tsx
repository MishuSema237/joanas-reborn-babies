"use client";

import { useState } from "react";
import { FaHandSparkles, FaGem, FaHeart } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { StoryModalContent } from "./modals/story-modal";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <FaHandSparkles className="text-4xl text-pink-500" />,
    title: "Unmatched Craftsmanship",
    description:
      "Each baby is a unique piece, meticulously sculpted, painted, and weighted by expert artists to achieve peak realism and quality.",
  },
  {
    icon: <FaGem className="text-4xl text-pink-500" />,
    title: "Premium Silicone Materials",
    description:
      "We use only the highest-grade platinum cure silicone, ensuring durability, a soft-touch feel, and hypoallergenic properties.",
  },
  {
    icon: <FaHeart className="text-4xl text-pink-500" />,
    title: "Personalized Ordering Experience",
    description:
      "Enjoy dedicated customer support and a transparent order-to-delivery process, tailored to provide peace of mind.",
  },
];

export function FeaturesSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="mb-8 py-12 bg-white">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif mb-4 text-gray-900">Why Choose Our Handcrafted Silicone Babies?</h2>
          <div className="w-24 h-1 bg-pink-300 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto px-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center flex flex-col items-center gap-4 group"
            >
              <div className="w-20 h-20 rounded-full bg-pink-50 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-serif text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button variant="outline" onClick={() => setModalOpen(true)} className="px-8 border-pink-300 text-pink-700 hover:bg-pink-50">
            Our Story & Values
          </Button>
        </div>
      </section>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Our Story & Values"
      >
        <StoryModalContent />
      </Modal>
    </>
  );
}
