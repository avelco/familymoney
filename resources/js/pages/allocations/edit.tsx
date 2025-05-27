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
import { EditAllocationProps } from "@/types/allocation";


export default function Edit({ budget, allocation, totalAllocated }: EditAllocationProps) {
    console.log(budget)
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
            title: "Editar Asignación",
            href: "",
        },
    ];

    const { data, setData, put, processing, errors, isDirty } = useForm({
        name: allocation.name || "",
        amount: allocation.amount.toString() || "",
        _method: "PUT",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route("budgets.allocations.update", [budget.id, allocation.id]), {
            onSuccess: () => {
                toast.success("Asignación actualizada exitosamente.");
            },
            onError: () => {
                toast.error("Error al actualizar la asignación.");
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

    // Calculate available budget excluding current allocation
    const proposedAmount = parseFloat(data.amount) || 0;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar Asignación" />
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
                        <h1 className="text-2xl font-bold">Editar Asignación</h1>
                        <p className="text-sm text-muted-foreground">
                            Modifica la asignación "{allocation.name}" del presupuesto "{budget.name}".
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
                                    Actualiza la información de esta asignación presupuestal.
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
                                                placeholder="0.00"
                                                value={data.amount}
                                                onChange={(e) => setData("amount", e.target.value)}
                                                className={`pl-10 ${errors.amount ? "border-red-500" : ""}`}
                                                disabled={processing}
                                            />
                                        </div>
                                        {errors.amount && (
                                            <p className="text-sm text-red-600">{errors.amount}</p>
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
                                            disabled={processing || !isDirty}
                                        >
                                            {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                            {processing ? "Guardando..." : "Guardar Cambios"}
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
                                        <span className="text-muted-foreground">Total asignado:</span>
                                        <span className="font-medium">{formatCurrency(totalAllocated)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Esta asignación:</span>
                                        <span className="font-medium text-blue-600">{formatCurrency(allocation.amount)}</span>
                                    </div>
                                </div>

                                {proposedAmount !== allocation.amount && proposedAmount > 0 && (
                                    <div className="border-t pt-4 space-y-2">
                                        <h4 className="text-sm font-medium">Después del cambio:</h4>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Nuevo monto:</span>
                                            <span className="font-medium">
                                                {formatCurrency(proposedAmount)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Diferencia:</span>
                                            <span className={`font-medium ${proposedAmount > allocation.amount ? 'text-red-600' : 'text-green-600'}`}>
                                                {proposedAmount > allocation.amount ? '+' : ''}{formatCurrency(proposedAmount - allocation.amount)}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Información</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm text-muted-foreground">
                                <p><strong>Creada:</strong> {new Date(allocation.created_at).toLocaleDateString('es-ES')}</p>
                                <p><strong>Última actualización:</strong> {new Date(allocation.updated_at).toLocaleDateString('es-ES')}</p>
                                <p><strong>ID:</strong> {allocation.id}</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
