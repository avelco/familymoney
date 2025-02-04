import Navbar from "@/components/navbar";
import React from "react";

export default function PrivateLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <Navbar />
            <main className="container mx-auto p-4">{children}</main>
        </div>
    );
}
