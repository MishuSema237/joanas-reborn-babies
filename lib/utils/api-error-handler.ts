import { NextResponse } from "next/server";

export function handleApiError(error: any) {
    console.error("API Error:", error);

    // Check for MongoDB connection errors
    if (
        error.name === "MongoServerSelectionError" ||
        error.name === "MongoNetworkError" ||
        error.message?.includes("buffering timed out") ||
        error.message?.includes("connection timed out")
    ) {
        return NextResponse.json(
            { error: "Service temporarily unavailable. Please try again later." },
            { status: 503 }
        );
    }

    // Check for Mongoose validation errors
    if (error.name === "ValidationError") {
        const messages = Object.values(error.errors).map((err: any) => err.message);
        return NextResponse.json(
            { error: messages.join(", ") },
            { status: 400 }
        );
    }

    // Default error
    return NextResponse.json(
        { error: error.message || "An unexpected error occurred" },
        { status: 500 }
    );
}
