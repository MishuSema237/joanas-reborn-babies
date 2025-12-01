"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/admin/data-table";
import { Modal } from "@/components/ui/modal";
import { FormInput } from "@/components/ui/form-input";
import { ImageUpload } from "@/components/admin/image-upload";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import Image from "next/image";

export default function ManageHeroPage() {
    const [images, setImages] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingImage, setEditingImage] = useState<any | null>(null);

    // Form State
    const [imageUrl, setImageUrl] = useState("");
    const [order, setOrder] = useState(0);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const res = await fetch("/api/admin/hero");
            if (res.ok) {
                const data = await res.json();
                setImages(data);
            }
        } catch (error) {
            console.error("Failed to fetch hero images:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (image: any) => {
        setEditingImage(image);
        setImageUrl(image.imageUrl);
        setOrder(image.order || 0);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this hero image?")) return;

        try {
            const res = await fetch(`/api/admin/hero?id=${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setImages(images.filter((i) => i._id !== id));
            } else {
                alert("Failed to delete hero image");
            }
        } catch (error) {
            console.error("Error deleting hero image:", error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            title: "Hero Image", // Default title
            subtitle: "",
            imageUrl,
            link: "/shop", // Default link
            order: Number(order),
            active: true, // Always active
        };

        try {
            const url = editingImage
                ? `/api/admin/hero?id=${editingImage._id}`
                : "/api/admin/hero";

            const method = editingImage ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                fetchImages();
                setIsModalOpen(false);
                resetForm();
            } else {
                const error = await res.json();
                alert(error.error || "Failed to save hero image");
            }
        } catch (error) {
            console.error("Error saving hero image:", error);
        }
    };

    const resetForm = () => {
        setEditingImage(null);
        setImageUrl("");
        setOrder(0);
    };

    const columns = [
        {
            header: "Image",
            accessor: (row: any) => (
                <div className="w-24 h-12 relative rounded-md overflow-hidden border border-gray-200">
                    <Image src={row.imageUrl} alt="Hero" fill className="object-cover" />
                </div>
            ),
        },
        {
            header: "Order",
            accessor: (row: any) => row.order
        },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-xl md:text-2xl font-bold text-gray-900">Hero Slider</h1>
                    <p className="text-gray-500">Manage images for the homepage slider</p>
                </div>
                <Button onClick={() => { resetForm(); setIsModalOpen(true); }}>
                    <FaPlus className="mr-2" /> Add Slide
                </Button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <DataTable
                    columns={columns}
                    data={images}
                    isLoading={isLoading}
                    keyField="_id"
                    onEdit={handleEdit}
                    onDelete={(item) => handleDelete(item._id)}
                />
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingImage ? "Edit Slide" : "Add Slide"}
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Hero Image
                        </label>
                        <ImageUpload
                            value={imageUrl ? [imageUrl] : []}
                            onChange={(urls) => setImageUrl(urls[0] || "")}
                            maxFiles={1}
                        />
                    </div>

                    <FormInput
                        label="Order"
                        type="number"
                        value={order}
                        onChange={(e) => setOrder(Number(e.target.value))}
                        placeholder="0"
                    />

                    <div className="flex justify-end gap-4 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit">
                            {editingImage ? "Update Slide" : "Add Slide"}
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
