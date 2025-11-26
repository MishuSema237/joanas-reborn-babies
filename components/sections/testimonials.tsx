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
          // Take only the first 3 for the preview
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
      <section className="py-10 mb-6 bg-pink-50/50 rounded-3xl">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-center mb-12 font-serif text-3xl md:text-4xl text-gray-900">Hear From Our Happy Families Worldwide</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 text-center flex flex-col justify-between rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-pink-50 relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-300 to-purple-300" />
                <div className="mb-6 relative z-10">
                  <div className="flex justify-center gap-1 text-yellow-400 text-lg mb-6">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <FaStar key={i} className="drop-shadow-sm" />
                    ))}
                  </div>
                  <p className="italic text-gray-600 leading-relaxed text-lg font-light">"{testimonial.content}"</p>
                </div>
                <div className="relative z-10">
                  <div className="w-12 h-1 bg-pink-100 mx-auto mb-4 rounded-full" />
                  <p className="font-bold text-gray-900 text-lg">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-pink-500 font-bold uppercase tracking-widest mt-1">{testimonial.role}</p>
                </div>
                <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-pink-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
              </div>
            ))}
          </div>
          <div className="text-center">
            <Button variant="outline" onClick={() => setModalOpen(true)} className="bg-white hover:bg-gray-50">
              Read All Testimonials
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

