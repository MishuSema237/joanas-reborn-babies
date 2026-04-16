import { NextResponse } from "next/server";
import connectMongoose from "@/lib/db/mongodb";
import Product from "@/lib/models/Product";

export async function GET(request: Request) {
    try {
        await connectMongoose();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (id) {
            const product = await Product.findById(id);
            if (!product) {
                return NextResponse.json({ error: "Product not found" }, { status: 404 });
            }
            return NextResponse.json(product);
        }

        const products = await Product.find({}).sort({ createdAt: -1 });
        return NextResponse.json(products);
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Failed to fetch products" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        await connectMongoose();
        const body = await request.json();

        // Basic validation
        if (!body.name || !body.price || !body.slug) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const product = await Product.create(body);
        return NextResponse.json(product, { status: 201 });
    } catch (error: any) {
        console.error("Error creating product:", error);
        return NextResponse.json(
            { error: error.message || "Failed to create product" },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request) {
    try {
        await connectMongoose();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "Missing id parameter" }, { status: 400 });
        }

        const body = await request.json();
        const product = await Product.findByIdAndUpdate(id, body, { new: true });

        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        return NextResponse.json(product);
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Failed to update product" },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request) {
    try {
        await connectMongoose();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json(
                { error: "Missing id parameter" },
                { status: 400 }
            );
        }

        await Product.findByIdAndDelete(id);
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Failed to delete product" },
            { status: 500 }
        );
    }
}