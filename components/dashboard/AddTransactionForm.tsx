"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    addTransaction,
    updateAccountBalance,
} from "@/app/actions/transactions";

interface AddTransactionFormProps {
    categories: any[];
    accounts: any[];
}

export default function AddTransactionForm({
    categories,
    accounts,
}: AddTransactionFormProps) {
    const [date, setDate] = useState<Date>(new Date());
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("egreso");
    const [categoryId, setCategoryId] = useState("");
    const [accountId, setAccountId] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (categories.length > 0) {
            setCategoryId(categories[0].id);
        }
        if (accounts.length > 0) {
            setAccountId(accounts[0].id);
        }
    }, [categories, accounts]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const parsedAmount = Number.parseFloat(amount);
        await addTransaction({
            description,
            amount: parsedAmount,
            type: type as "ingreso" | "egreso",
            date: new Date().toISOString(),
            categoryId,
            accountId,
        });
        await updateAccountBalance(
            accountId,
            type === "ingreso" ? parsedAmount : -parsedAmount
        );
        setDescription("");
        setAmount("");
        setType("expense");
        setCategoryId("");
        setAccountId("");
        router.refresh();
    };

    if (categories.length === 0 || accounts.length === 0) {
        return;
    }

    console.log(categories);
    return (
        <Card>
            <CardHeader>
                <CardTitle>Agregar transacción</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        placeholder="Descripción"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <Input
                        type="number"
                        placeholder="Cantidad"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        min="0"
                        step="0.01"
                    />
                    <div className="grid gap-4">
                        <input
                            type="date"
                            value={date.toISOString().split("T")[0]}
                            onChange={(e) => setDate(new Date(e.target.value))}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                        />
                    </div>
                    <Select value={type} onValueChange={setType}>
                        <SelectTrigger>
                            <SelectValue placeholder="Seleccione" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ingreso">Ingreso</SelectItem>
                            <SelectItem value="egreso">Gasto</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={categoryId} onValueChange={setCategoryId}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories
                                .filter((c) => c.type === type)
                                .map((category) => (
                                    <SelectItem
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </SelectItem>
                                ))}
                        </SelectContent>
                    </Select>
                    <Select value={accountId} onValueChange={setAccountId}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select account" />
                        </SelectTrigger>
                        <SelectContent>
                            {accounts.map((account) => (
                                <SelectItem key={account.id} value={account.id}>
                                    {account.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button type="submit" className="w-full">
                        Add Transaction
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
