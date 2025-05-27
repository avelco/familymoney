import AppLayout from '@/layouts/app-layout';
import { usePage } from '@inertiajs/react';
import { Head, router, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';
import {
    Plus,
    Calendar,
    MoreVertical,
    Eye,
    Edit,
    Trash2,
    DollarSign,
    Target,
    TrendingUp,
    ArrowLeft,
    PiggyBank,
} from 'lucide-react';
import { BreadcrumbItem } from '@/types';
import { PageProps } from '@/types/main';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { Summary } from './components/summary';
import { AllocationIndexProps } from '@/types/allocation';

// Type definitions
interface Budget {
    id: number;
    name: string;
    start_date: string;
    end_date: string;
    created_at: string;
    updated_at: string;
}

export default function Show({ budget, allocations, totalAllocated, totalSpent }: AllocationIndexProps) {
    const { flash } = usePage<PageProps>().props

    useEffect(() => {
        if (flash?.message) {
            toast.success(flash.message);
        }
    }, [flash]);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Presupuestos',
            href: '/budgets',
        },
        {
            title: budget.name,
            href: '',
        },
    ];

    useEffect(() => {
        if (flash?.message) {
            toast.success(flash.message);
        }
    }, [flash]);

    const handleCreateAllocation = () => {
        router.visit(`/budgets/${budget.id}/allocations/create`);
    };

    const handleEditAllocation = (allocationId: number) => {
        router.visit(`/budgets/${budget.id}/allocations/${allocationId}/edit`);
    };

    const handleDeleteAllocation = (allocationId: number) => {
        if (confirm('¿Estás seguro de que quieres eliminar esta asignación?')) {
            router.delete(`/budgets/${budget.id}/allocations/${allocationId}`);
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const getBudgetStatus = (startDate: string, endDate: string) => {
        const now = new Date();
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (now < start) {
            return { status: 'upcoming', label: 'Próximo', variant: 'secondary' as const };
        } else if (now >= start && now <= end) {
            return { status: 'active', label: 'Activo', variant: 'default' as const };
        } else {
            return { status: 'expired', label: 'Expirado', variant: 'destructive' as const };
        }
    };

    const budgetStatus = getBudgetStatus(budget.start_date, budget.end_date);
    const progressPercentage = totalAllocated > 0 ? (totalAllocated / totalSpent) * 100 : 0;
    console.log(allocations)
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${budget.name} - Asignaciones`} />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                {/* Header Section */}
                <div className="flex items-center gap-4">
                    <Link
                        href="/budgets"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10"
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                    <div className="flex flex-col gap-1 flex-1">
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-bold tracking-tight">{budget.name}</h1>
                            <Badge variant={budgetStatus.variant}>
                                {budgetStatus.label}
                            </Badge>
                        </div>
                        <p className="text-muted-foreground">
                            {formatDate(budget.start_date)} - {formatDate(budget.end_date)}
                        </p>
                    </div>
                    <Button onClick={handleCreateAllocation} className="gap-2">
                        <Plus className="h-4 w-4" />
                        Nueva Asignación
                    </Button>
                </div>

                {/* Budget Overview Cards */}
                <Summary totalAllocated={totalAllocated} allocations={allocations} totalSpent={totalSpent} progressPercentage={progressPercentage} />

                {/* Allocations Grid */}
                {allocations.length > 0 ? (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold">Asignaciones</h2>
                            <p className="text-sm text-muted-foreground">
                                {allocations.length} de {allocations.length} asignaciones
                            </p>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {allocations.map((allocation) => {
                                const allocationPercentage = allocation.transactions_sum_amount! > 0 ? (allocation.amount / allocation.transactions_sum_amount!) * 100 : 0;

                                return (
                                    <Card key={allocation.id} className="relative group hover:shadow-md transition-shadow">
                                        <CardHeader className="pb-3">
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                                        <PiggyBank className="h-5 w-5 text-primary" />
                                                    </div>
                                                    <div>
                                                        <CardTitle className="text-base">{allocation.name}</CardTitle>
                                                        <CardDescription className="text-sm">
                                                            ID: {allocation.id}
                                                        </CardDescription>
                                                    </div>
                                                </div>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                                        >
                                                            <MoreVertical className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem
                                                            onClick={() => handleEditAllocation(allocation.id)}
                                                            className="gap-2"
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                            Editar
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => handleDeleteAllocation(allocation.id)}
                                                            className="gap-2 text-red-600"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                            Eliminar
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="space-y-3">
                                            <div className="space-y-1">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-muted-foreground">Monto</span>
                                                    <span className="text-lg font-bold">{formatCurrency(allocation.amount)}</span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-muted-foreground">% del total</span>
                                                    <span className="text-sm font-medium">{allocationPercentage.toFixed(1)}%</span>
                                                </div>
                                            </div>
                                            <Progress value={allocationPercentage} className="h-2" />
                                            <p className="text-xs text-muted-foreground">
                                                Creado: {formatDate(allocation.created_at)}
                                            </p>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    /* Empty State */
                    <Card className="flex flex-col items-center justify-center py-16">
                        <PiggyBank className="h-16 w-16 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No hay asignaciones</h3>
                        <p className="text-muted-foreground mb-4 text-center max-w-sm">
                            Comienza creando tu primera asignación para organizar el presupuesto de {budget.name}
                        </p>
                        <Button onClick={handleCreateAllocation} className="gap-2">
                            <Plus className="h-4 w-4" />
                            Crear Primera Asignación
                        </Button>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
