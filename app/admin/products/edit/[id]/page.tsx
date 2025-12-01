"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FormInput, FormTextarea, FormSelect } from "@/components/ui/form-input";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/admin/image-upload";
import { use } from "react";

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        price: 0,
        description: "",
        detailedDescription: "",
        materialsAndCare: "",
        shippingInfo: "",
        status: "active",
        images: [] as string[],
        testimonial: {
            quote: "",
            author: "",
            title: "",
        },
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // We can reuse the public API or the admin list API if it supports ID filtering
                // For now, let's assume we can fetch by ID from the admin API or just use the public helper if needed
                // But better to have a dedicated endpoint or query param.
                // Let's use the admin products API with an ID query param if we implemented it, or just fetch all and find.
                // Actually, we should update the GET API to support fetching a single product by ID.
                const res = await fetch(`/api/admin/products?id=${id}`);
                if (res.ok) {
                    const product = await res.json();
                    setFormData({
                        name: product.name,
                        slug: product.slug,
                        price: product.price,
                        description: product.description,
                        detailedDescription: product.detailedDescription || "",
                        materialsAndCare: product.materialsAndCare || "",
                        shippingInfo: product.shippingInfo || "",
                        status: product.status,
                        images: product.images || [],
                        testimonial: {
                            quote: product.testimonial?.quote || "",
                            author: product.testimonial?.author || "",
                            title: product.testimonial?.title || "",
                        },
                    });
                } else {
                    alert("Failed to fetch product");
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            const res = await fetch(`/api/admin/products?id=${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push("/admin/products");
            } else {
                const data = await res.json();
                alert(data.error || "Failed to update product");
            }
        } catch (error) {
            console.error("Error updating product:", error);
            alert("An error occurred");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return <div className="p-8 text-center">Loading...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-2">
                    Edit Baby
                </h1>
                <p className="text-gray-500">Update details for {formData.name}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Info */}
                <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormInput
                            id="name"
                            label="Name"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        <FormInput
                            id="slug"
                            label="Slug (URL friendly)"
                            required
                            value={formData.slug}
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        />
                        <FormInput
                            id="price"
                            label="Price ($)"
                            type="number"
                            required
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                        />
                        <FormSelect
                            id="status"
                            label="Status"
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            options={[
                                { value: "active", label: "Active" },
                                { value: "sold_out", label: "Sold Out" },
                                { value: "hidden", label: "Hidden" },
                            ]}
                        />
                        <div className="col-span-2">
                            <FormTextarea
                                id="description"
                                label="Short Description"
                                required
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows={3}
                            />
                        </div>
                    </div>
                </div>

                {/* Images */}
                <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900">Images</h2>
                    <ImageUpload
                        value={formData.images}
                        onChange={(images) => setFormData({ ...formData, images })}
                    />
                </div>

                {/* Detailed Info */}
                <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900">Detailed Information</h2>
                    <FormTextarea
                        id="detailedDescription"
                        label="Full Description"
                        value={formData.detailedDescription}
                        onChange={(e) => setFormData({ ...formData, detailedDescription: e.target.value })}
                        rows={6}
                    />
                    <FormTextarea
                        id="materialsAndCare"
                        label="Materials & Care"
                        value={formData.materialsAndCare}
                        onChange={(e) => setFormData({ ...formData, materialsAndCare: e.target.value })}
                        rows={4}
                    />
                    <FormTextarea
                        id="shippingInfo"
                        label="Shipping Information"
                        value={formData.shippingInfo}
                        onChange={(e) => setFormData({ ...formData, shippingInfo: e.target.value })}
                        rows={4}
                    />
                </div>

                {/* Testimonial */}
                <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900">Product Testimonial</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormInput
                            id="testimonialAuthor"
                            label="Author Name"
                            value={formData.testimonial.author}
                            onChange={(e) => setFormData({
                                ...formData,
                                testimonial: { ...formData.testimonial, author: e.target.value }
                            })}
                        />
                        <FormInput
                            id="testimonialTitle"
                            label="Author Title (e.g. Collector)"
                            value={formData.testimonial.title}
                            onChange={(e) => setFormData({
                                ...formData,
                                testimonial: { ...formData.testimonial, title: e.target.value }
                            })}
                        />
                        <div className="col-span-2">
                            <FormTextarea
                                id="testimonialQuote"
                                label="Quote"
                                value={formData.testimonial.quote}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    testimonial: { ...formData.testimonial, quote: e.target.value }
                                })}
                                rows={3}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.back()}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isSaving}>
                        {isSaving ? "Saving..." : "Update Baby"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
