"use client";

import { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface FAQItem {
    _id: string;
    question: string;
    answer: string;
}

export default function FAQPage() {
    const faqs: FAQItem[] = [
        {
            _id: "1",
            question: "What is a Reborn Baby?",
            answer: "A Reborn Baby is a manufactured skin doll that has been transformed by an artist to resemble a human infant with as much realism as possible. The process of creating a reborn doll is referred to as reborning and the doll artists are referred to as reborners."
        },
        {
            _id: "2",
            question: "Are these dolls suitable for children?",
            answer: "Reborn babies are primarily collector's items and art pieces. While they can be enjoyed by responsible older children, they are not recommended for young children as play dolls due to their delicate features, weighted bodies, and potential for damage if handled roughly."
        },
        {
            _id: "3",
            question: "How do I care for my Reborn Baby?",
            answer: "Reborn babies should be treated like real infants. Support their head when lifting, avoid direct sunlight and extreme heat, and keep them away from pets. Dust them gently with a soft brush and avoid getting the cloth body wet."
        },
        {
            _id: "4",
            question: "Can I wash my Reborn Baby?",
            answer: "No, you should never submerge your reborn baby in water, especially if it has a cloth body. If the vinyl parts get dirty, you can gently wipe them with a damp cloth, but avoid harsh chemicals or baby wipes which can damage the paint."
        },
        {
            _id: "5",
            question: "What materials are used to make them?",
            answer: "Our babies are typically created from high-quality vinyl or silicone kits. They are painted with multiple layers of heat-set paints to achieve realistic skin tones. The bodies are usually soft cloth filled with glass beads and poly-fil for weight and cuddliness."
        },
        {
            _id: "6",
            question: "Do they come with a birth certificate?",
            answer: "Yes, every Mia Catherine Reborn baby comes with a beautiful birth certificate and a certificate of authenticity, making your adoption official."
        },
        {
            _id: "7",
            question: "Can I change their clothes?",
            answer: "Absolutely! One of the joys of owning a reborn is dressing them up. Most of our babies fit into standard real baby clothes. The size (Preemie, Newborn, 0-3 months) will be specified in the baby's description."
        },
        {
            _id: "8",
            question: "Do you offer custom orders?",
            answer: "Yes, we accept custom orders! If you have a specific sculpt or look in mind, please contact us. We can work together to create your dream baby with your preferred hair color, eye color, and weight."
        },
        {
            _id: "9",
            question: "Can the hair be styled?",
            answer: "If your baby has rooted mohair, it can be gently styled using a soft baby brush and a little water or leave-in conditioner. Painted hair does not require styling but looks incredibly realistic and is maintenance-free."
        },
        {
            _id: "10",
            question: "How are the babies weighted?",
            answer: "We use fine glass beads and high-quality poly-fil to weight our babies. This gives them a realistic 'dead weight' feel, so they flop and settle in your arms just like a real sleeping infant."
        },
        {
            _id: "11",
            question: "What payment methods do you accept?",
            answer: "We accept secure payments via Zelle, Cash App, and Apple Pay. We prioritize secure transactions to ensure your peace of mind."
        },
        {
            _id: "12",
            question: "Do you offer layaway or payment plans?",
            answer: "We understand that a reborn is a special investment. Please contact us directly to discuss potential flexible payment arrangements for higher-priced babies."
        },
        {
            _id: "13",
            question: "How long does shipping take?",
            answer: "Once your order is processed, shipping typically takes 3-7 business days depending on the destination. We ensure every baby is packed securely for their journey home."
        },
        {
            _id: "14",
            question: "Do you ship internationally?",
            answer: "Yes, we can ship our babies to loving homes worldwide. Shipping costs and delivery times will vary based on the destination country."
        },
        {
            _id: "15",
            question: "What is your return policy?",
            answer: "Due to the custom and artistic nature of our creations, all sales are typically final. However, we want you to be happy with your adoption. If there is an issue with your order upon arrival, please contact us immediately so we can resolve it."
        }
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const isLoading = false;

    /*
    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                const res = await fetch("/api/admin/faqs");
                if (res.ok) {
                    const data = await res.json();
                    // Filter only active FAQs if the API returns all, or rely on API to filter
                    // Assuming API returns all for admin, we might need to filter here or update API
                    // For now, let's filter client-side if 'active' property exists, or just show all
                    setFaqs(data.filter((f: any) => f.active !== false));
                }
            } catch (error) {
                console.error("Failed to fetch FAQs:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFaqs();
    }, []);
    */

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-16">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-serif mb-4 text-gray-900">
                    Frequently Asked Questions
                </h1>
                <p className="text-gray-500 text-lg">
                    Find answers to common questions about our Reborn Babies.
                </p>
            </div>

            <div className="space-y-4">
                {isLoading ? (
                    <p className="text-center text-gray-500">Loading FAQs...</p>
                ) : faqs.length > 0 ? (
                    faqs.map((faq, index) => (
                        <div
                            key={faq._id}
                            className="border border-pink-100 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full px-6 py-4 flex items-center justify-between text-left bg-white hover:bg-pink-50/50 transition-colors"
                            >
                                <span className="font-medium text-lg text-gray-800">
                                    {faq.question}
                                </span>
                                <span className="text-pink-500 ml-4">
                                    {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                                </span>
                            </button>
                            <div
                                className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                    }`}
                            >
                                <div className="px-6 pb-6 pt-2 text-gray-600 leading-relaxed border-t border-pink-50">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No FAQs available at the moment.</p>
                )}
            </div>
        </div>
    );
}
