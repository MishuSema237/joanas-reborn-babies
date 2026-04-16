"use client";

import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { TestimonialsModalContent } from "./modals/testimonials-modal";

interface Testimonial {
  quote: string;
  author: string;
  location: string;
}

export function TestimonialsSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("/api/admin/testimonials");
        if (res.ok) {
          const data = await res.json();
          setTestimonials(data.slice(0, 3));
        }
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  if (testimonials.length === 0) return null;

  return (
    <>
      <section className="py-12 md:py-20 bg-rose-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">Families Say</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-rose-400 to-pink-400 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group relative bg-white p-8 rounded-2xl border border-gray-100 shadow-md hover:shadow-xl hover:border-rose-200 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-rose-500/0 via-transparent to-rose-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="flex justify-center gap-1 text-yellow-400 text-lg mb-6">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <FaStar key={i} className="drop-shadow-sm" />
                    ))}
                  </div>
                  <p className="italic text-gray-600 leading-relaxed text-center mb-6">"{testimonial.content}"</p>
                  <div className="text-center">
                    <p className="font-semibold text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-rose-500 font-medium uppercase tracking-widest mt-1">{testimonial.role}</p>
                  </div>
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
              Read All Reviews
            </Button>
          </div>
        </div>
      </section>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="What Our Valued Collectors Say"
      >
        <TestimonialsModalContent />
      </Modal>
    </>
  );
}

