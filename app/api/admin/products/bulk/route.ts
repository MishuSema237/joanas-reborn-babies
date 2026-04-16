import { NextResponse } from "next/server";
import connectMongoose from "@/lib/db/mongodb";
import Product from "@/lib/models/Product";

export async function POST(request: Request) {
    try {
        await connectMongoose();
        const body = await request.json();
        const { products } = body;

        if (!products || !Array.isArray(products) || products.length === 0) {
            return NextResponse.json(
                { error: "No products provided" },
                { status: 400 }
            );
        }

        const created = [];
        const errors = [];

        for (let i = 0; i < products.length; i++) {
            try {
                const p = products[i];
                
                // Ensure required fields
                if (!p.name) {
                    errors.push(`Row ${i + 1}: Missing name`);
                    continue;
                }
                if (!p.price) p.price = 0;
                if (!p.slug) {
                    p.slug = p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                }
                if (!p.description) p.description = '';
                if (!p.status) p.status = 'active';
                if (!p.images) p.images = [];
                if (!p.testimonial) p.testimonial = { quote: '', author: '', title: '' };

                const product = await Product.create(p);
                created.push(product);
            } catch (err: any) {
                errors.push(`Row ${i + 1}: ${err.message}`);
            }
        }

        return NextResponse.json({
            success: true,
            created: created.length,
            errors: errors.length > 0 ? errors : undefined
        });
    } catch (error: any) {
        console.error("Bulk upload error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to bulk upload" },
            { status: 500 }
        );
    }
}