import mongoose from "mongoose";

const SocialMediaSchema = new mongoose.Schema(
    {
        platform: {
            type: String,
            required: [true, "Platform name is required"],
        },
        url: {
            type: String,
            required: [true, "URL is required"],
        },
        icon: {
            type: String, // Store icon name (e.g., "FaFacebook") - Keeping for backward compatibility or alternative
            required: false,
        },
        svgContent: {
            type: String,
            required: false, // Optional if they use icon, but we'll prioritize this in UI
        },
        active: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

export default mongoose.models.SocialMedia || mongoose.model("SocialMedia", SocialMediaSchema);
