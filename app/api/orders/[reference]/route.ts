import { NextRequest, NextResponse } from "next/server";
import { getOrderByReference } from "@/lib/utils/db-helpers";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ reference: string }> }
) {
    try {
        const { reference } = await params;
        const order = await getOrderByReference(reference.toUpperCase());

        if (!order) {
            return NextResponse.json(
                { error: "Order not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(order);
    } catch (error) {
        console.error("Error fetching order:", error);
        return NextResponse.json(
            { error: "Failed to fetch order" },
            { status: 500 }
        );
    }
}
