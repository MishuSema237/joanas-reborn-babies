"use client";
 
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { ProductGrid } from "@/components/sections/product-grid";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { TestimonialsMarquee } from "@/components/sections/testimonials-marquee";
import { FeaturesSection } from "@/components/sections/features";
import { ProcessModalContent } from "@/components/sections/modals/process-modal";
import Image from "next/image";
import { FaArrowRight, FaHandSparkles, FaHeart, FaStar, FaBaby, FaStethoscope, FaHands, FaGem, FaGift, FaMedal, FaShieldAlt, FaTruck, FaUndo, FaBirthdayCake, FaUsers, FaCube, FaQuestionCircle, FaBabyCarriage, FaBath, FaBed, FaMitten } from "react-icons/fa";

export default function Home() {
  const [processModalOpen, setProcessModalOpen] = useState(false);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsRes = await fetch("/api/admin/products");
        if (productsRes.ok) {
          const data = await productsRes.json();
          setProducts(data.filter((p: any) => p.status === 'active').slice(0, 5));
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  const heroIcons = [
    { icon: FaBaby, size: 48, top: '8%', left: '5%', delay: '0s', rotate: -8 },
    { icon: FaHands, size: 36, top: '15%', right: '8%', delay: '0.5s', rotate: 12 },
    { icon: FaStethoscope, size: 28, bottom: '25%', left: '8%', delay: '1s', rotate: -15 },
    { icon: FaGem, size: 42, bottom: '15%', right: '5%', delay: '1.5s', rotate: 20 },
    { icon: FaHeart, size: 24, top: '35%', left: '3%', delay: '2s', rotate: 5 },
    { icon: FaBaby, size: 20, top: '60%', right: '12%', delay: '0.8s', rotate: -10 },
    { icon: FaHeart, size: 32, bottom: '45%', left: '3%', delay: '1.2s', rotate: 15 },
    { icon: FaGem, size: 22, top: '85%', right: '10%', delay: '2.2s', rotate: -5 },
    { icon: FaHands, size: 26, bottom: '60%', left: '10%', delay: '0.3s', rotate: 8 },
  ];

  const benefits = [
    { icon: FaTruck, title: "Free Shipping", desc: "On orders over $200" },
    { icon: FaShieldAlt, title: "Secure Payment", desc: "100% protected" },
    { icon: FaMedal, title: "Premium Quality", desc: "Platinum silicone" },
    { icon: FaUndo, title: "Easy Returns", desc: "30-day policy" },
  ];

  const giftItems = [
    { icon: FaBirthdayCake, title: "Special Occasions", desc: "Birthdays, anniversaries, and holidays" },
    { icon: FaUsers, title: "New Mothers", desc: "A comforting companion for new moms" },
    { icon: FaCube, title: "Collectibles", desc: "Perfect for dedicated collectors" },
  ];

  return (
    <div className="w-full">
      {/* Hero Section - Video/Gradient Background */}
      <section className="relative w-full min-h-[90vh] overflow-hidden pt-[60px]">
        {/* Video Background with Fallback */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/assets/homehero.mp4" type="video/mp4" />
          </video>
          {/* Dark overlay for visibility */}
          <div className="absolute inset-0 bg-rose-50/50" />
          
          {/* Scattered Baby Icons */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <FaBaby className="absolute text-rose-200/40" style={{ top: '8%', left: '3%', fontSize: '35px' }} />
            <FaBabyCarriage className="absolute text-rose-300/30" style={{ top: '12%', right: '8%', fontSize: '45px' }} />
            <FaHeart className="absolute text-rose-200/30" style={{ top: '22%', left: '12%', fontSize: '30px' }} />
            <FaGift className="absolute text-pink-200/30" style={{ top: '30%', right: '18%', fontSize: '40px' }} />
            <FaBed className="absolute text-rose-200/25" style={{ top: '40%', left: '5%', fontSize: '35px' }} />
            <FaMitten className="absolute text-rose-300/30" style={{ top: '48%', right: '12%', fontSize: '30px' }} />
            <FaBaby className="absolute text-pink-200/30" style={{ top: '58%', left: '18%', fontSize: '28px' }} />
            <FaHeart className="absolute text-rose-200/25" style={{ top: '68%', right: '5%', fontSize: '35px' }} />
            <FaHands className="absolute text-rose-300/25" style={{ top: '78%', left: '10%', fontSize: '40px' }} />
            <FaStar className="absolute text-rose-200/30" style={{ top: '3%', right: '25%', fontSize: '22px' }} />
            <FaStar className="absolute text-pink-200/25" style={{ top: '35%', left: '22%', fontSize: '18px' }} />
            <FaStar className="absolute text-rose-300/30" style={{ top: '65%', right: '22%', fontSize: '22px' }} />
            <FaBaby className="absolute text-rose-200/25" style={{ top: '88%', right: '15%', fontSize: '32px' }} />
            <FaBabyCarriage className="absolute text-pink-200/20" style={{ top: '5%', left: '18%', fontSize: '25px' }} />
            <FaHeart className="absolute text-rose-300/20" style={{ top: '52%', left: '28%', fontSize: '20px' }} />
            <FaGift className="absolute text-rose-200/20" style={{ top: '82%', right: '30%', fontSize: '25px' }} />
            <FaHands className="absolute text-pink-200/20" style={{ top: '15%', left: '30%', fontSize: '20px' }} />
            <FaStar className="absolute text-rose-200/20" style={{ top: '90%', left: '20%', fontSize: '18px' }} />
          </div>
        </div>

        {/* Hero Content - Centered on mobile */}
        <div className="container mx-auto px-4 md:px-12 relative z-10 flex flex-col items-center md:items-start justify-center min-h-[90vh] py-10 md:py-16 text-center md:text-left">
          <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-4 md:mb-6 tracking-tight text-gray-900 max-w-3xl">
            Handcrafted with <span className="text-rose-500">Love</span>, 
            <br />
            Born to <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">Touch Hearts</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-xl leading-relaxed">
            Each reborn baby is a masterpiece of artistry, meticulously crafted to bring warmth and joy to your home.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button 
              href="/shop" 
              size="lg" 
              className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white border-none text-lg font-semibold rounded-full px-10 py-4 transition-all hover:scale-105"
            >
              Explore Collection
              <FaArrowRight className="ml-2" />
            </Button>
            <Button 
              href="/gallery" 
              variant="outline" 
              size="lg" 
              className="border-rose-300 text-gray-800 hover:bg-rose-50 text-lg font-medium rounded-full px-10 py-4"
            >
              View Gallery
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-8 mt-6 md:mt-12">
            <div className="text-center">
              <p className="text-2xl md:text-4xl font-bold text-gray-900">150+</p>
              <p className="text-sm text-gray-600">Happy Families</p>
            </div>
            <div className="w-px h-12 bg-rose-300 hidden md:block" />
            <div className="text-center">
              <p className="text-2xl md:text-4xl font-bold text-gray-900">8</p>
              <p className="text-sm text-gray-600">Artisans</p>
            </div>
            <div className="w-px h-12 bg-rose-300 hidden md:block" />
            <div className="text-center">
              <p className="text-2xl md:text-4xl font-bold text-gray-900">100%</p>
              <p className="text-sm text-gray-600">Handcrafted</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Bar - Touches Previous Section */}
      <section className="py-6 bg-white border-y border-rose-100 -mt-1">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="text-rose-500" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{benefit.title}</p>
                  <p className="text-xs text-gray-500">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Creations */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10 md:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-rose-50 border border-rose-100 mb-4 md:mb-6">
              <FaHandSparkles className="text-rose-500 text-xs" />
              <span className="text-sm font-medium text-rose-600">New Arrivals</span>
            </div>
            <h2 className="text-2xl md:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
              Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">Creations</span>
            </h2>
          </div>

          <ProductGrid 
              products={products} 
              itemsPerPage={5} 
              enablePagination={false}
              title=""
              showViewAll={true}
              mobileLayout="carousel"
            />
        </div>
      </section>

      {/* Custom Order CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-rose-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          {[FaGift, FaHeart, FaBaby, FaGem].map((Icon, i) => (
            <Icon key={i} className="absolute text-rose-200" style={{ 
              top: `${20 + i * 20}%`, 
              left: `${10 + i * 20}%`, 
              fontSize: `${60 + i * 20}px` 
            }} />
          ))}
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-14 md:w-20 h-14 md:h-20 rounded-full bg-rose-200/50 flex items-center justify-center mx-auto mb-4 md:mb-6">
              <FaGift className="text-rose-500 text-3xl" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Want Something <span className="text-rose-500">Unique?</span>
            </h2>
            <p className="text-gray-600 text-base md:text-lg mb-4 md:mb-8 max-w-xl mx-auto">
              We offer custom ordering services. Work directly with our artisans to create your perfect reborn baby.
            </p>
            <Button 
              href="/contact"
              className="bg-gray-900 hover:bg-gray-800 text-white rounded-full px-10 py-4 text-lg"
            >
              Request Custom Order
              <FaArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Craftsmanship - Image as Full Background */}
      <section className="py-10 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Artisan Craftsmanship"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-gray-900/50" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-rose-500/20 border border-rose-400/30 mb-4 md:mb-6">
                <FaHandSparkles className="text-rose-400 text-xs" />
                <span className="text-sm font-medium text-rose-300">The Craft</span>
              </div>
              <h2 className="text-2xl md:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight">
                The Art of <br />
                <span className="text-white">
                  Reborn Creation
                </span>
              </h2>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-4 md:mb-8 max-w-lg">
                Each reborn baby is a testament to patience and skill. Our artisans spend countless hours sculpting, painting, and weighting each piece to achieve an unparalleled level of realism.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  "Meticulous hand-sculpting and detailing",
                  "Premium platinum silicone construction",
                  "Weighted for authentic baby feel",
                  "Custom options available on request"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-rose-500/30 flex items-center justify-center">
                      <FaStar className="text-rose-400 text-xs" />
                    </div>
                    <span className="text-gray-200">{item}</span>
                  </div>
                ))}
              </div>

              <Button 
                onClick={() => setProcessModalOpen(true)}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full px-8 py-3 backdrop-blur-sm"
              >
                Learn About Our Process
                <FaArrowRight className="ml-2" />
              </Button>
            </div>

            {/* Creative Organic Shape - No Rectangle */}
            <div className="flex-1 hidden lg:flex justify-center">
              <div className="relative w-[320px] h-[380px]">
                <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/40 to-pink-500/40 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-xl animate-pulse" />
                <div className="relative w-full h-full bg-rose-100 rounded-[50%_50%_50%_50%/60%_40%_60%_40%] overflow-hidden shadow-2xl border-4 border-white/30 transform rotate-2">
                  <Image
                    src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Reborn Baby"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 border-2 border-rose-300 rounded-full" />
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-rose-200/50 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Marquee */}
      <TestimonialsMarquee />

      {/* Features Section */}
      <FeaturesSection />

      {/* Gift Guide - Icon Background Cards */}
      <section className="py-10 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              The Perfect <span className="text-rose-500">Gift</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              A reborn baby makes a meaningful gift for collectors, new mothers, or anyone who appreciates fine artistry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {giftItems.map((item, index) => (
              <div 
                key={index}
                className="relative overflow-hidden rounded-2xl h-[150px] group bg-rose-100"
              >
                {/* Pink Icon - Top Right */}
                <div className="absolute top-0 right-0 z-0">
                  <item.icon className="text-rose-200 text-[100px] -rotate-12 translate-x-5 -translate-y-5" />
                </div>
                {/* Content - Centered */}
                <div className="absolute inset-0 z-10 flex flex-col justify-center items-center p-4 text-center">
                  <h3 className="text-base font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-xs">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA - Full Color - Touches Footer */}
      <section className="py-20 md:py-24 bg-gradient-to-r from-rose-500 via-rose-400 to-pink-500 relative overflow-hidden mb-auto">
        <div className="absolute inset-0 opacity-10">
          {[FaQuestionCircle, FaHeart, FaBaby, FaGift].map((Icon, i) => (
            <Icon key={i} className="absolute text-white" style={{ 
              top: `${10 + i * 25}%`, 
              right: `${5 + i * 20}%`, 
              fontSize: `${40 + i * 15}px` 
            }} />
          ))}
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6">
              Have Questions? <span className="text-rose-100">Let's Talk</span>
            </h2>
            <p className="text-white/90 text-lg md:text-xl mb-8 md:mb-10 max-w-2xl mx-auto">
              We'd love to hear from you. Reach out with any questions about our babies or custom orders.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
              <Button 
                href="/contact" 
                size="lg" 
                className="!bg-white !text-gray-900 hover:!bg-gray-100 !border-0 rounded-full px-8 md:px-10 py-3 md:py-4 w-full sm:w-auto"
              >
                Contact Us
                <FaArrowRight className="ml-2" />
              </Button>
              <Button 
                href="/faq" 
                variant="outline" 
                size="lg" 
                className="!border-2 !border-white !text-white hover:!bg-white/20 !bg-transparent rounded-full px-8 md:px-10 py-3 md:py-4 w-full sm:w-auto"
              >
                Read FAQ
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Modal
        isOpen={processModalOpen}
        onClose={() => setProcessModalOpen(false)}
        title="Our Process: Crafting Perfection"
      >
        <ProcessModalContent />
      </Modal>
    </div>
  );
}