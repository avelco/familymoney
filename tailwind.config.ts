import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@shadcn/ui/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: {
                    "50": "#fff1f2",
                    "100": "#ffe4e6",
                    "200": "#fccee8",
                    "300": "#fcc0d6",
                    "400": "#fda5d5",
                    "500": "#fb64b6",
                    "600": "#f6339a",
                    "700": "#e60076",
                    "800": "#c6005c",
                    "900": "#a3004c",
                    "950": "#510424",
                },
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
} satisfies Config;
