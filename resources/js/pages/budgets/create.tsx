import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head, useForm, Link } from "@inertiajs/react";
import { ArrowLeft, Loader2, Calendar } from "lucide-react";
import { toast } from "sonner";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Presupuestos",
        href: "/budgets",
    },
    {
        title: "Crear Presupuesto",
        href: "",
    },
];

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        start_date: "",
        end_date: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("budgets.store"), {
            onSuccess: () => {
                toast.success("Presupuesto creado exitosamente.");
            },
            onError: () => {
                toast.error("Error al crear el presupuesto.");
            },
        });
    };

    // Get today's date in YYYY-MM-DD format for min attribute
    const today = new Date().toISOString().split('T')[0];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear Presupuesto" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link
                        href={route("budgets.index")}
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10"
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl font-bold">Crear Nuevo Presupuesto</h1>
                        <p className="text-sm text-muted-foreground">
                            Crea un nuevo presupuesto para organizar tus finanzas por períodos.
                        </p>
                    </div>
                </div>

                {/* Form */}
                <div className="mx-auto w-full max-w-md">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Nombre del presupuesto */}
                        <div className="space-y-2">
                            <Label htmlFor="name">Nombre del presupuesto</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Ej: Presupuesto Mensual Enero"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                className={errors.name ? "border-red-500" : ""}
                                disabled={processing}
                            />
                            {errors.name && (
                                <p className="text-sm text-red-600">{errors.name}</p>
                            )}
                        </div>

                        {/* Fecha de inicio */}
                        <div className="space-y-2">
                            <Label htmlFor="start_date">Fecha de inicio</Label>
                            <div className="relative">
                                <Input
                                    id="start_date"
                                    type="date"
                                    value={data.start_date}
                                    onChange={(e) => setData("start_date", e.target.value)}
                                    className={errors.start_date ? "border-red-500" : ""}
                                    disabled={processing}
                                />
                                <Calendar className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                            </div>
                            {errors.start_date && (
                                <p className="text-sm text-red-600">{errors.start_date}</p>
                            )}
                        </div>

                        {/* Fecha de fin */}
                        <div className="space-y-2">
                            <Label htmlFor="end_date">Fecha de fin</Label>
                            <div className="relative">
                                <Input
                                    id="end_date"
                                    type="date"
                                    value={data.end_date}
                                    onChange={(e) => setData("end_date", e.target.value)}
                                    className={errors.end_date ? "border-red-500" : ""}
                                    disabled={processing}
                                    min={data.start_date || today}
                                />
                                <Calendar className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                            </div>
                            {errors.end_date && (
                                <p className="text-sm text-red-600">{errors.end_date}</p>
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
                                <Link href={route("budgets.index")}>Cancelar</Link>
                            </Button>
                            <Button
                                type="submit"
                                className="flex-1"
                                disabled={processing}
                            >
                                {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {processing ? "Creando..." : "Crear Presupuesto"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
