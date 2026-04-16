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
    icon: <FaHandSparkles className="text-2xl text-rose-500" />,
    title: "Unmatched Craftsmanship",
    description:
      "Each baby is a unique piece, meticulously sculpted, painted, and weighted by expert artists to achieve peak realism and quality.",
  },
  {
    icon: <FaGem className="text-2xl text-rose-500" />,
    title: "Premium Silicone Materials",
    description:
      "We use only the highest-grade platinum cure silicone, ensuring durability, a soft-touch feel, and hypoallergenic properties.",
  },
  {
    icon: <FaHeart className="text-2xl text-rose-500" />,
    title: "Personalized Experience",
    description:
      "Enjoy dedicated customer support and a transparent order-to-delivery process, tailored to provide peace of mind.",
  },
];

export function FeaturesSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">Mia Catherine Reborns</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-rose-400 to-pink-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 border border-gray-100 shadow-md hover:shadow-xl hover:border-rose-200 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-rose-500/0 via-transparent to-rose-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-rose-50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-rose-100 transition-all duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              onClick={() => setModalOpen(true)} 
              className="border-rose-200 text-rose-700 hover:bg-rose-50 hover:border-rose-300 rounded-full px-8"
            >
              Our Story & Values
            </Button>
          </div>
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
