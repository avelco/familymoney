import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Wallet } from "@/types/wallets";
import { Head, useForm, Link } from "@inertiajs/react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Cuentas",
        href: "/wallets",
    },
    {
        title: "Editar Cuenta",
        href: "",
    },
];

const currencies = [
    { value: "USD", label: "US Dollar", symbol: "$" },
    { value: "EUR", label: "Euro", symbol: "€" },
    { value: "JPY", label: "Japanese Yen", symbol: "¥" },
    { value: "CAD", label: "Canadian Dollar", symbol: "C$" },
    { value: "COP", label: "Colombian Peso", symbol: "$" },
    { value: "ARS", label: "Argentine Peso", symbol: "$" },
];

export default function Edit({ wallet }: { wallet: Wallet }) {
    const { data, setData, put, processing, errors, isDirty } = useForm({
        name: wallet.name || "",
        currency: wallet.currency || "USD",
        _method: "PUT",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route("wallets.update", wallet.id), {
            onSuccess: () => {
                toast("Cuenta actualizada exitosamente.")
            },
            onError: () => {
                toast("Error al actualizar la cuenta.")
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar Cuenta" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link
                        href={route("wallets.index")}
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10"
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl font-bold">Editar Cuenta</h1>
                        <p className="text-sm text-muted-foreground">
                            Edita una cuenta existente para gestionar tus activos.
                        </p>
                    </div>
                </div>

                {/* Form */}
                <div className="mx-auto w-full max-w-md">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Nombre de la cuenta */}
                        <div className="space-y-2">
                            <Label htmlFor="name">Nombre de la cuenta</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Ej: Cuenta Principal"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                className={errors.name ? "border-red-500" : ""}
                                disabled={processing}
                            />
                            {errors.name && (
                                <p className="text-sm text-red-600">{errors.name}</p>
                            )}
                        </div>

                        {/* Moneda */}
                        <div className="space-y-2">
                            <Label htmlFor="currency">Moneda</Label>
                            <Select
                                value={data.currency}
                                onValueChange={(value) => setData("currency", value)}
                                disabled={processing}
                            >
                                <SelectTrigger
                                    className={errors.currency ? "border-red-500" : ""}
                                >
                                    <SelectValue placeholder="Selecciona una moneda" />
                                </SelectTrigger>
                                <SelectContent>
                                    {currencies.map((currency) => (
                                        <SelectItem key={currency.value} value={currency.value}>
                                            <span className="flex items-center gap-2">
                                                <span className="font-mono text-sm">
                                                    {currency.symbol}
                                                </span>
                                                <span>{currency.label}</span>
                                            </span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.currency && (
                                <p className="text-sm text-red-600">{errors.currency}</p>
                            )}
                        </div>

                        {/* Botones */}
                        <div className="flex gap-3 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                className="flex-1"
                                asChild
                                disabled={processing}
                            >
                                <Link href={route("wallets.index")}>Cancelar</Link>
                            </Button>
                            <Button
                                type="submit"
                                className="flex-1"
                                disabled={processing || !isDirty}
                            >
                                {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {processing ? "Guardando..." : "Guardar Cambios"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
