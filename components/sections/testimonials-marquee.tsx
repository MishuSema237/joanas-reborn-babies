"use client";

import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

export function TestimonialsMarquee() {
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("/api/admin/testimonials");
        if (res.ok) {
          const data = await res.json();
          setTestimonials(data);
        }
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  if (testimonials.length === 0) return null;

  const displayItems = [...testimonials, ...testimonials];

  return (
    <section className="py-10 md:py-16 bg-gradient-to-b from-rose-50 to-white overflow-hidden">
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: scroll 60s linear infinite;
        }
        section:hover .marquee-track {
          animation-play-state: paused;
        }
      `}</style>
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            What Our <span className="text-rose-500">Families Say</span>
          </h2>
        </div>
        
        <div className="overflow-hidden cursor-pointer">
          <div className="flex gap-4 w-max marquee-track">
            {displayItems.map((t, i) => (
              <div key={i} className="flex-shrink-0 w-[240px]">
                <div className="bg-white p-4 rounded-xl border border-rose-100">
                  <div className="flex gap-1 text-yellow-400 text-xs mb-2">
                    {[...Array(t.rating || 5)].map((_, s) => <FaStar key={s} />)}
                  </div>
                  <p className="text-gray-700 text-xs italic mb-2">"{t.content}"</p>
                  <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-xs text-rose-500 uppercase">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}