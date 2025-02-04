"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ButtonLoading } from "../ui/buttonLoading";
import { addAccount } from "@/app/actions/masters";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { capitalizeFirstLetter } from "@/utils/dateUtil";
// import type { Account } from "../types"

interface AccountManagerProps {
    // accounts: Account[];
    accounts: any[];
}

export default function AccountManager({ accounts }: AccountManagerProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [name, setName] = useState("");
    const [balance, setBalance] = useState("");
    const [type, setType] = useState("");
    const [currency, setCurrency] = useState("USD");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        await addAccount({
            name,
            balance: Number.parseFloat(balance),
            type,
            currency,
        });
        setName("");
        setBalance("");
        router.refresh();
        setIsSubmitting(false);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Administrar Cuentas</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        placeholder="Nombre de la cuenta"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <Input
                        type="number"
                        placeholder="Saldo inicial"
                        value={balance}
                        onChange={(e) => setBalance(e.target.value)}
                        required
                        min="0"
                        step="0.01"
                    />
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                            <input
                                id="default-radio-1"
                                type="radio"
                                value="digital"
                                name="default-radio"
                                onChange={(e) => setType(e.target.value)}
                                className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label
                                htmlFor="default-radio-1"
                                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                Digital
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                id="default-radio-2"
                                type="radio"
                                value="efectivo"
                                name="default-radio"
                                onChange={(e) => setType(e.target.value)}
                                className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label
                                htmlFor="default-radio-2"
                                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                Efectivo
                            </label>
                        </div>
                    </div>
                    <Select onValueChange={(value) => setCurrency(value)}>
                        <SelectTrigger className="w-[100%]">
                            <SelectValue placeholder="Seleccione una divisa" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Divisas</SelectLabel>
                                <SelectItem value="cop">
                                    Pesos Colombianos
                                </SelectItem>
                                <SelectItem value="ars">
                                    Pesos Argentinos
                                </SelectItem>
                                <SelectItem value="usd">
                                    Dolares Americanos
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {!isSubmitting ? (
                        <Button type="submit" className="w-full">
                            Agregar Cuenta
                        </Button>
                    ) : (
                        <ButtonLoading className="w-full" />
                    )}
                </form>
                <div className="mt-4">
                    <h3 className="font-semibold mb-2">Cuentas existentes:</h3>
                    <ul className="list-disc list-inside">
                        {accounts.map((account) => (
                            <li key={account.id}>
                                {account.name}: ${account.balance.toFixed(2)} -{" "}
                                {capitalizeFirstLetter(account.type)}
                            </li>
                        ))}
                    </ul>
                </div>
            </CardContent>
        </Card>
    );
}
