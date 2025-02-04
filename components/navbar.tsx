"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { User } from "lucide-react";
import { TbTransactionDollar } from "react-icons/tb";
import { GrConfigure } from "react-icons/gr";
import { GiPiggyBank } from "react-icons/gi";

export default function Navbar() {
    const [isMobile, setIsMobile] = useState(false);

    // Detect screen size
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <nav className="fixed w-full bg-white shadow-md dark:bg-gray-900">
            {/* Desktop Navbar */}
            {!isMobile && (
                <div className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center text-2xl font-semibold text-primary-400 dark:text-white">
                        <GiPiggyBank className="mr-1 h-8 w-8" />
                        FamilyMoney
                    </div>
                    <div className="space-x-6">
                        <Link
                            href="/dashboard"
                            className="text-gray-600 dark:text-gray-300 hover:text-primary"
                        >
                            Transacciones
                        </Link>
                        <Link
                            href="/masters"
                            className="text-gray-600 dark:text-gray-300 hover:text-primary"
                        >
                            Maestros
                        </Link>
                        <Link
                            href="/profile"
                            className="text-gray-600 dark:text-gray-300 hover:text-primary"
                        >
                            Perfil
                        </Link>
                    </div>
                </div>
            )}

            {/* Mobile Bottom Navigation */}
            {isMobile && (
                <div className="fixed bottom-0 left-0 w-full bg-white shadow-xl dark:bg-gray-900 flex justify-around py-3">
                    <Link
                        href="/search"
                        className="flex flex-col items-center text-gray-600 dark:text-gray-300 hover:text-primary"
                    >
                        <GrConfigure className="h-6 w-6" />
                        <span className="text-sm">Maestros</span>
                    </Link>
                    <Link
                        href="/"
                        className="flex flex-col items-center text-gray-600 dark:text-gray-300 hover:text-primary"
                    >
                        <TbTransactionDollar className="h-6 w-6" />
                        <span className="text-sm">Transacciones</span>
                    </Link>
                    <Link
                        href="/profile"
                        className="flex flex-col items-center text-gray-600 dark:text-gray-300 hover:text-primary"
                    >
                        <User className="h-6 w-6" />
                        <span className="text-sm">Perfil</span>
                    </Link>
                </div>
            )}
        </nav>
    );
}
