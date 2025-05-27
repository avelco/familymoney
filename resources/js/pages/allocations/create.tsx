import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head, useForm, Link } from "@inertiajs/react";
import { ArrowLeft, Loader2, PiggyBank, DollarSign } from "lucide-react";
import { toast } from "sonner";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface Budget {
    id: number;
    name: string;
    start_date: string;
    end_date: string;
}

interface CreateAllocationProps {
    budget: Budget;
    totalAllocated: number;
    budgetLimit: number;
}

export default function Create({ budget, totalAllocated, budgetLimit }: CreateAllocationProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: "Presupuestos",
            href: "/budgets",
        },
        {
            title: budget.name,
            href: `/budgets/${budget.id}`,
        },
        {
            title: "Nueva Asignación",
            href: "",
        },
    ];

    const { data, setData, post, processing, errors } = useForm({
        name: "",
        amount: "",
        description: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("budgets.allocations.store", budget.id), {
            onSuccess: () => {
                toast.success("Asignación creada exitosamente.");
            },
            onError: () => {
                toast.error("Error al crear la asignación.");
            },
        });
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const remainingBudget = budgetLimit - totalAllocated;
    const proposedAmount = parseFloat(data.amount) || 0;
    const wouldExceedBudget = proposedAmount > remainingBudget;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Nueva Asignación" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link
                        href={route("budgets.show", budget.id)}
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10"
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl font-bold">Nueva Asignación</h1>
                        <p className="text-sm text-muted-foreground">
                            Crea una nueva asignación para el presupuesto "{budget.name}".
                        </p>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Form */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <PiggyBank className="h-5 w-5" />
                                    Detalles de la Asignación
                                </CardTitle>
                                <CardDescription>
                                    Completa la información para crear una nueva asignación presupuestal.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Nombre de la asignación */}
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Nombre de la asignación</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            placeholder="Ej: Gastos de Marketing, Suministros de Oficina"
                                            value={data.name}
                                            onChange={(e) => setData("name", e.target.value)}
                                            className={errors.name ? "border-red-500" : ""}
                                            disabled={processing}
                                        />
                                        {errors.name && (
                                            <p className="text-sm text-red-600">{errors.name}</p>
                                        )}
                                    </div>

                                    {/* Monto */}
                                    <div className="space-y-2">
                                        <Label htmlFor="amount">Monto</Label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                            <Input
                                                id="amount"
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                max={remainingBudget}
                                                placeholder="0.00"
                                                value={data.amount}
                                                onChange={(e) => setData("amount", e.target.value)}
                                                className={`pl-10 ${errors.amount || wouldExceedBudget ? "border-red-500" : ""}`}
                                                disabled={processing}
                                            />
                                        </div>
                                        {errors.amount && (
                                            <p className="text-sm text-red-600">{errors.amount}</p>
                                        )}
                                        {wouldExceedBudget && !errors.amount && (
                                            <p className="text-sm text-red-600">
                                                El monto excede el presupuesto disponible ({formatCurrency(remainingBudget)})
                                            </p>
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
                                            <Link href={route("budgets.show", budget.id)}>Cancelar</Link>
                                        </Button>
                                        <Button
                                            type="submit"
                                            className="flex-1"
                                            disabled={processing || wouldExceedBudget}
                                        >
                                            {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                            {processing ? "Creando..." : "Crear Asignación"}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Budget Summary Sidebar */}
                    <div className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Resumen del Presupuesto</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Ya asignado:</span>
                                        <span className="font-medium">{formatCurrency(totalAllocated)}</span>
                                    </div>
                                </div>

                                {proposedAmount > 0 && (
                                    <div className="border-t pt-4 space-y-2">
                                        <h4 className="text-sm font-medium">Después de esta asignación:</h4>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Nuevo total asignado:</span>
                                            <span className="font-medium">
                                                {formatCurrency(Number(totalAllocated) + Number(data.amount))}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Consejos</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm text-muted-foreground">
                                <p>• Usa nombres descriptivos para tus asignaciones</p>
                                <p>• Considera dejar un margen para gastos imprevistos</p>
                                <p>• Puedes editar las asignaciones más tarde si es necesario</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
