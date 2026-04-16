import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary pink palette - soft and baby-friendly
        pink: {
          50: "#fef7f9",
          100: "#fdeef2",
          200: "#fce0e8",
          300: "#f9c8d6",
          400: "#f5a5bd",
          500: "#f08ba8", // Primary pink
          600: "#e66b8f",
          700: "#d44d75",
          800: "#b83d62",
          900: "#9a3552",
        },
        // Soft lavender accents
        lavender: {
          50: "#faf8fc",
          100: "#f4f0f8",
          200: "#e8e0f0",
          300: "#d6c8e5",
          400: "#b8a4d3",
          500: "#9d82c0",
        },
        // Baby blue accents
        babyblue: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
        },
        // Neutrals matching wireframe
        gray: {
          50: "#f9fafb",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#666666",
          600: "#555555",
          700: "#333333",
          800: "#222222",
          900: "#000000",
        },
        // Legacy colors for compatibility
        ink: "#000000",
        porcelain: "#ffffff",
        surface: {
          DEFAULT: "#ffffff",
          muted: "#f5f5f5",
        },
        border: {
          DEFAULT: "#cccccc",
          soft: "#e5e7eb",
        },
        text: {
          DEFAULT: "#000000",
          muted: "#666666",
        },
      },
      fontFamily: {
        sans: ["var(--font-body)", "Inter", "sans-serif"],
        display: ["var(--font-display)", "Playfair Display", "serif"],
        body: ["var(--font-body)", "Inter", "sans-serif"],
      },
      fontSize: {
        // Matching wireframe typography
        xs: ["12px", { lineHeight: "1.5" }],
        sm: ["14px", { lineHeight: "1.5" }],
        base: ["16px", { lineHeight: "1.5" }],
        lg: ["18px", { lineHeight: "1.2" }],
        xl: ["20px", { lineHeight: "1.2" }],
        "2xl": ["24px", { lineHeight: "1.2" }],
        "3xl": ["28px", { lineHeight: "1.2" }],
        "4xl": ["32px", { lineHeight: "1.2" }],
        "5xl": ["40px", { lineHeight: "1.2" }],
      },
      spacing: {
        // Wireframe spacing system
        "8": "8px",
        "16": "16px",
        "24": "24px",
        "32": "32px",
        "48": "48px",
      },
      boxShadow: {
        soft: "0 4px 8px rgba(0, 0, 0, 0.1)",
        card: "0 8px 16px rgba(0, 0, 0, 0.1)",
        modal: "0 10px 30px rgba(0, 0, 0, 0.2)",
      },
      maxWidth: {
        viewport: "1728px",
        content: "1200px",
      },
      borderRadius: {
        none: "0",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        marquee: "marquee 25s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;


