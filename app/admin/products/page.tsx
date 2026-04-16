"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/admin/data-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { FaPlus, FaUpload } from "react-icons/fa";

export default function ManageProductsPage() {
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            const res = await fetch("/api/admin/products");
            if (res.ok) {
                const data = await res.json();
                setProducts(data);
            }
        } catch (error) {
            console.error("Failed to fetch products:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (product: any) => {
        if (!confirm(`Are you sure you want to delete "${product.name}"?`)) return;

        try {
            const res = await fetch(`/api/admin/products?id=${product._id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                fetchProducts(); // Refresh list
            } else {
                alert("Failed to delete product");
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const columns = [
        {
            header: "Image",
            accessor: (product: any) => (
                <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                    {product.images?.[0] && (
                        <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover"
                        />
                    )}
                </div>
            ),
        },
        {
            header: "Name",
            accessor: (product: any) => (
                <div>
                    <div className="font-medium text-gray-900">{product.name}</div>
                    <div className="text-xs text-gray-500">{product.slug}</div>
                </div>
            ),
        },
        {
            header: "Price",
            accessor: (product: any) => (
                <span className="font-medium">${product.price?.toFixed(2) || "0.00"}</span>
            ),
        },
        {
            header: "Status",
            accessor: (product: any) => (
                <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
          ${product.status === "active"
                        ? "bg-green-100 text-green-800"
                        : product.status === "sold_out"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                >
                    {product.status?.replace("_", " ") || "active"}
                </span>
            ),
        },
    ];

    const handleBulkUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const text = await file.text();
            let productsData;

            if (file.name.endsWith('.json')) {
                productsData = JSON.parse(text);
            } else if (file.name.endsWith('.csv')) {
                const lines = text.split('\n').filter(line => line.trim());
                const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
                productsData = lines.slice(1).map(line => {
                    const values = line.match(/(".*?"|[^,]+)(?=\s*,|\s*$)/g) || [];
                    const obj: any = {};
                    headers.forEach((h, i) => {
                        const val = values[i]?.trim().replace(/^"|"$/g, '') || '';
                        if (h === 'price') {
                            obj[h] = parseFloat(val) || 0;
                        } else if (h === 'testimonial') {
                            try { obj.testimonial = JSON.parse(val); } catch { obj.testimonial = {}; }
                        } else if (h === 'images') {
                            try { obj.images = JSON.parse(val); } catch { obj.images = []; }
                        } else {
                            obj[h] = val;
                        }
                    });
                    return obj;
                });
            } else {
                alert('Please upload a .json or .csv file');
                return;
            }

            if (!Array.isArray(productsData)) {
                productsData = [productsData];
            }

            const res = await fetch('/api/admin/products/bulk', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ products: productsData }),
            });

            if (res.ok) {
                alert(`Successfully uploaded ${productsData.length} products!`);
                fetchProducts();
            } else {
                const err = await res.json();
                alert('Failed to upload: ' + err.error);
            }
        } catch (err: any) {
            alert('Error parsing file: ' + err.message);
        }

        e.target.value = '';
    };

    const bulkProducts = [
        { name: "Lily Rose", slug: "lily-rose", price: 425, description: "A gorgeous infant with delicate features and premium silicone construction.", status: "active" },
        { name: "Emma Grace", slug: "emma-grace", price: 380, description: "A beautiful newborn with realistic sleeping expression and soft features.", status: "active" },
        { name: "Sofia Joy", slug: "sofia-joy", price: 520, description: "A joyful baby with expressive eyes and beautiful hand-painted details.", status: "active" },
        { name: "Chloe Anne", slug: "chloe-anne", price: 445, description: "A precious little one with delicate coloring and authentic weighted body.", status: "active" },
        { name: "Ava Marie", slug: "ava-marie", price: 395, description: "An adorable baby with the sweetest smile and gentle expression.", status: "active" },
        { name: "Nora Faith", slug: "nora-faith", price: 480, description: "A serene baby with peaceful features and premium silicone skin.", status: "active" },
        { name: "Ella Belle", slug: "ella-belle", price: 540, description: "A stunning creation with realistic veins and beautiful hand-rooted hair.", status: "active" },
        { name: "Mia Faith", slug: "mia-faith", price: 365, description: "A compact baby with the softest cuddly body and loving presence.", status: "active" },
        { name: "Olivia Hope", slug: "olivia-hope", price: 510, description: "A precious baby with detailed features and natural positioning.", status: "active" },
        { name: "Grace Lynn", slug: "grace-lynn", price: 465, description: "A wonderful creation with realistic expressions and premium quality.", status: "active" },
    ];

    const handleBulkAdd10 = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/admin/products/bulk', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ products: bulkProducts }),
            });

            if (res.ok) {
                alert('Successfully added 10 new babies!');
                fetchProducts();
            } else {
                const err = await res.json();
                alert('Failed: ' + err.error);
            }
        } catch (err: any) {
            alert('Error: ' + err.message);
        }
        setIsLoading(false);
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-2">
                        Products
                    </h1>
                    <p className="text-gray-500">Manage your babies inventory.</p>
                </div>
                <div className="flex gap-3">
                    <label className="cursor-pointer">
                        <input
                            type="file"
                            accept=".json,.csv"
                            onChange={handleBulkUpload}
                            className="hidden"
                        />
                        <span className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                            <FaUpload /> Bulk Upload
                        </span>
                    </label>
                    <Button variant="outline" onClick={handleBulkAdd10} className="flex items-center gap-2">
                        <FaPlus /> Bulk Add (10)
                    </Button>
                    <Link href="/admin/babies/add">
                        <Button className="flex items-center gap-2">
                            <FaPlus /> Add Baby
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                {isLoading ? (
                    <div className="p-8 text-center text-gray-500">Loading products...</div>
                ) : products.length > 0 ? (
                    <DataTable
                        data={products}
                        columns={columns}
                        keyField="_id"
                        onDelete={handleDelete}
                        onEdit={(product) => router.push(`/admin/products/edit/${product._id}`)}
                        isLoading={isLoading}
                    />
                ) : (
                    <div className="p-12 text-center">
                        <p className="text-gray-500 mb-4">No babies found.</p>
                        <Link href="/admin/babies/add">
                            <Button variant="outline">Add your first baby</Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
