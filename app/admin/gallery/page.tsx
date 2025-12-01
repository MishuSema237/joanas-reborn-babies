"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/admin/image-upload";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";

export default function ManageGalleryPage() {
    const [images, setImages] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newImages, setNewImages] = useState<string[]>([]);
    const [isUploading, setIsUploading] = useState(false);

    const fetchImages = async () => {
        try {
            const res = await fetch("/api/admin/gallery");
            if (res.ok) {
                const data = await res.json();
                setImages(data);
            }
        } catch (error) {
            console.error("Failed to fetch gallery images:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const handleUpload = async () => {
        if (newImages.length === 0) return;
        setIsUploading(true);

        try {
            // Create a gallery item for each uploaded image
            for (const url of newImages) {
                await fetch("/api/admin/gallery", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ imageUrl: url }),
                });
            }
            setNewImages([]);
            fetchImages();
        } catch (error) {
            console.error("Error uploading images:", error);
            alert("Failed to upload images");
        } finally {
            setIsUploading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this image?")) return;

        try {
            const res = await fetch(`/api/admin/gallery?id=${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                fetchImages();
            } else {
                alert("Failed to delete image");
            }
        } catch (error) {
            console.error("Error deleting image:", error);
        }
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-2">
                    Gallery
                </h1>
                <p className="text-gray-500">Manage your gallery images.</p>
            </div>

            {/* Upload Section */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-12">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Add New Images
                </h2>
                <div className="mb-6">
                    <ImageUpload value={newImages} onChange={setNewImages} />
                </div>
                <div className="flex justify-end">
                    <Button
                        onClick={handleUpload}
                        disabled={newImages.length === 0 || isUploading}
                    >
                        {isUploading ? "Saving..." : "Add to Gallery"}
                    </Button>
                </div>
            </div>

            {/* Gallery Grid */}
            <div className="columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
                {images.map((item) => (
                    <div
                        key={item._id}
                        className="break-inside-avoid group relative bg-gray-100 rounded-xl overflow-hidden border border-gray-200"
                    >
                        <Image
                            src={item.imageUrl}
                            alt="Gallery image"
                            width={500}
                            height={500}
                            className="w-full h-auto object-cover"
                        />
                        <div className="absolute inset-0 flex items-start justify-end p-2 md:items-center md:justify-center md:bg-black/50 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => handleDelete(item._id)}
                                className="p-2 md:p-3 bg-white text-red-600 rounded-full hover:bg-red-50 transition-colors shadow-lg"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {!isLoading && images.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    No images in gallery yet.
                </div>
            )}
        </div>
    );
}
