import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

export const metadata: Metadata = {
    title: "Familymoney",
    description: "Familymoney is a personal finance app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="bg-zinc-200 dark:bg-white">
                <main>{children}</main>
                <Toaster />
            </body>
        </html>
    );
}
