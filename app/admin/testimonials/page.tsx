"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/admin/data-table";
import { Button } from "@/components/ui/button";
import { FormInput, FormTextarea, FormSelect } from "@/components/ui/form-input";
import { Modal } from "@/components/ui/modal";
import { FaPlus, FaStar } from "react-icons/fa";

export default function ManageTestimonialsPage() {
    const [testimonials, setTestimonials] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        role: "",
        content: "",
        rating: 5,
    });

    const fetchTestimonials = async () => {
        try {
            const res = await fetch("/api/admin/testimonials");
            if (res.ok) {
                const data = await res.json();
                setTestimonials(data);
            }
        } catch (error) {
            console.error("Failed to fetch testimonials:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const handleEdit = (item: any) => {
        setEditingId(item._id);
        setFormData({
            name: item.name,
            role: item.role,
            content: item.content,
            rating: item.rating,
        });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingId(null);
        setFormData({ name: "", role: "", content: "", rating: 5 });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const url = editingId
                ? `/api/admin/testimonials?id=${editingId}`
                : "/api/admin/testimonials";

            const method = editingId ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                handleCloseModal();
                fetchTestimonials();
            } else {
                alert("Failed to save testimonial");
            }
        } catch (error) {
            console.error("Error saving testimonial:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (item: any) => {
        if (!confirm("Are you sure you want to delete this testimonial?")) return;

        try {
            const res = await fetch(`/api/admin/testimonials?id=${item._id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                fetchTestimonials();
            } else {
                alert("Failed to delete testimonial");
            }
        } catch (error) {
            console.error("Error deleting testimonial:", error);
        }
    };

    const bulkTestimonials = [
        { name: "Amanda H.", role: "New Mom", content: "This baby saved me. After my loss I was drowning in grief and now I have something to hold. She feels real in my arms and the weight is perfect. Thank you Mia Catherine.", rating: 5 },
        { name: "Marcus W.", role: "Collector", content: "Been collecting for 8 years. This is hands down the best quality silicone I've ever seen. The veining and skin texture are incredible. Worth every dollar.", rating: 5 },
        { name: "Janet K.", role: "Grandmother", content: "Bought for my granddaughter's 6th birthday. She named her 'Princess' and takes her everywhere. The look on her face is priceless. Great quality for the price.", rating: 5 },
        { name: "Robert M.", role: "Father", content: "Got this for my daughter who has autism. It's become her comfort object. She sleeps better now. The silicone is soft and safe.", rating: 5 },
        { name: "Patricia L.", role: "New Mom", content: "After my stillborn I needed something to help me heal. This baby gave me that. The craftsmanship is beautiful.", rating: 5 },
        { name: "James R.", role: "Collector", content: "Quality is solid but shipping took forever. Waited 3 weeks which is too long. Baby itself is gorgeous though.", rating: 4 },
        { name: "Susan T.", role: "Gift Giver", content: "Bought for my friend who lost her baby at 20 weeks. She cried when she opened it but said it was exactly what she needed.", rating: 5 },
        { name: "Linda P.", role: "Customer", content: "The eyebrows look lighter than the photo. It's still cute though. Quality is good for the price point.", rating: 4 },
        { name: "Michelle S.", role: "New Mom", content: "My baby girl sleeps with me every night. The weighted body feels just like a real newborn. Best decision I ever made.", rating: 5 },
        { name: "David C.", role: "Father", content: "Was skeptical at first but my wife wanted one for her healing. Now we both love it. Realistic details are amazing.", rating: 5 },
        { name: "Karen B.", role: "Customer", content: "Got a different baby than ordered. The one in my box was supposed to be a boy with brown hair but got a blonde girl. Contacted support no response yet.", rating: 1 },
        { name: "Jennifer F.", role: "New Mom", content: "Weighs almost exactly like a real newborn! I can feel her when I hold her. The realism is insane. Love her so much.", rating: 5 },
        { name: "Thomas G.", role: "Collector", content: "As a pro collector I rate this 5 stars. The artist really knows what they're doing. The rooted hair and glass eyes are perfect.", rating: 5 },
        { name: "Michelle R.", role: "New Mom", content: "The limbs are a bit stiff compared to my other reborns but overall happy. Good starter baby for the price.", rating: 3 },
        { name: "Sarah L.", role: "New Mom", content: "This baby helped my sister so much after her loss. She says holding her gives her peace. Beautiful and meaningful gift.", rating: 5 },
        { name: "Brian K.", role: "Customer", content: "Box arrived damaged and baby had a scratch on her cheek. Customer service is sending a replacement. Hope it's better next time.", rating: 2 },
        { name: "Elizabeth W.", role: "Grandmother", content: "Perfect gift for my daughter who couldn't have children. She treats this baby like her own. The quality is outstanding.", rating: 5 },
        { name: "Christopher P.", role: "Collector", content: "I've bought dozens and this is top 5 quality. The realistic breathing mechanism is insane. Best reborn I've ever owned.", rating: 5 },
        { name: "Nancy D.", role: "New Mom", content: "Was nervous ordering online but I'm so glad I did. She exceeded my expectations. The details are museum worthy.", rating: 5 },
        { name: "Steven M.", role: "Customer", content: "Shipping to Canada took over a month which was frustrating. Baby is beautiful when arrived though. Just wish shipping was faster.", rating: 3 },
    ];

    const handleBulkAdd = async () => {
        setIsSubmitting(true);
        try {
            for (const testimonial of bulkTestimonials) {
                const res = await fetch("/api/admin/testimonials", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(testimonial),
                });
                if (!res.ok) {
                    throw new Error("Failed to add testimonial");
                }
            }
            fetchTestimonials();
            alert("10 testimonials added successfully!");
        } catch (error) {
            console.error("Error bulk adding testimonials:", error);
            alert("Failed to add testimonials");
        } finally {
            setIsSubmitting(false);
        }
    };

    const columns = [
        {
            header: "Author",
            accessor: (item: any) => (
                <div>
                    <div className="font-medium text-gray-900">{item.name}</div>
                    <div className="text-xs text-gray-500">{item.role}</div>
                </div>
            ),
        },
        {
            header: "Rating",
            accessor: (item: any) => (
                <div className="flex text-yellow-400 text-sm">
                    {[...Array(item.rating)].map((_, i) => (
                        <FaStar key={i} />
                    ))}
                </div>
            ),
        },
        {
            header: "Content",
            accessor: (item: any) => (
                <p className="text-sm text-gray-600 line-clamp-2 max-w-md">
                    {item.content}
                </p>
            ),
        },
        {
            header: "Date",
            accessor: (item: any) => (
                <span className="text-sm text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString()}
                </span>
            ),
        },
    ];

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-2">
                        Testimonials
                    </h1>
                    <p className="text-gray-500">Manage customer reviews.</p>
                </div>
                <div className="flex gap-2">
                <Button onClick={() => { setEditingId(null); setIsModalOpen(true); }} className="flex items-center gap-2">
                    <FaPlus /> Add Testimonial
                </Button>
                <Button variant="outline" onClick={handleBulkAdd} className="flex items-center gap-2">
                    <FaPlus /> Bulk Add (20)
                </Button>
            </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                {isLoading ? (
                    <div className="p-8 text-center text-gray-500">Loading testimonials...</div>
                ) : testimonials.length > 0 ? (
                    <DataTable
                        data={testimonials}
                        columns={columns}
                        keyField="_id"
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                        isLoading={isLoading}
                    />
                ) : (
                    <div className="p-12 text-center">
                        <p className="text-gray-500 mb-4">No testimonials yet.</p>
                        <Button variant="outline" onClick={() => { setEditingId(null); setIsModalOpen(true); }}>
                            Add your first testimonial
                        </Button>
                    </div>
                )}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={editingId ? "Edit Testimonial" : "Add Testimonial"}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <FormInput
                        id="name"
                        label="Name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <FormInput
                        id="role"
                        label="Role (e.g. Happy Mom)"
                        required
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    />
                    <FormSelect
                        id="rating"
                        label="Rating"
                        value={formData.rating}
                        onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                        options={[
                            { value: "5", label: "5 Stars" },
                            { value: "4", label: "4 Stars" },
                            { value: "3", label: "3 Stars" },
                            { value: "2", label: "2 Stars" },
                            { value: "1", label: "1 Star" },
                        ]}
                    />
                    <FormTextarea
                        id="content"
                        label="Content"
                        required
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        rows={4}
                    />
                    <div className="flex justify-end gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleCloseModal}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Saving..." : "Save Testimonial"}
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
