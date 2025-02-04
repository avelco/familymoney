"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addCategory } from "@/app/actions/masters";
import { ButtonLoading } from "../ui/buttonLoading";
// import type { Category } from "../types"

interface CategoryManagerProps {
    categories: any[];
}

export default function CategoryManager({ categories }: CategoryManagerProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [name, setName] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        await addCategory({ name });
        setName("");
        router.refresh();
        setIsSubmitting(false);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Administrar Categorías</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        placeholder="Nombre de la categoría"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    {!isSubmitting ? (
                        <Button type="submit" className="w-full">
                            Agregar Cuenta
                        </Button>
                    ) : (
                        <ButtonLoading className="w-full" />
                    )}
                </form>
                <div className="mt-4">
                    <h3 className="font-semibold mb-2">
                        Categorías existentes:
                    </h3>
                    <ul className="list-disc list-inside">
                        {categories.map((category) => (
                            <li key={category.id}>{category.name}</li>
                        ))}
                    </ul>
                </div>
            </CardContent>
        </Card>
    );
}
