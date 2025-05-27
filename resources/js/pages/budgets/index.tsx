import AppLayout from '@/layouts/app-layout';
import { usePage } from '@inertiajs/react';
import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Plus,
    Calendar,
    MoreVertical,
    Eye,
    Edit,
    Trash2,
    CalendarDays,
} from 'lucide-react';
import { BreadcrumbItem } from '@/types';
import { PageProps } from '@/types/main';
import { toast } from 'sonner';
import { useEffect } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Presupuestos',
        href: '/budgets',
    },
];

// Budget type definition
interface Budget {
    id: number;
    name: string;
    start_date: string;
    end_date: string;
    created_at: string;
    updated_at: string;
}

interface BudgetIndexProps {
    budgets: Budget[];
}

export default function Index({ budgets }: BudgetIndexProps) {
    const { flash } = usePage<PageProps>().props;

    useEffect(() => {
        if (flash?.message) {
            toast.success(flash.message);
        }
    }, [flash]);

    const handleCreateBudget = () => {
        router.visit('/budgets/create');
    };

    const handleViewAllocations = (budgetId: number) => {
        router.visit(`/budgets/${budgetId}/allocations`);
    };

    const handleEditBudget = (budgetId: number) => {
        router.visit(`/budgets/${budgetId}/edit`);
    };

    const handleDeleteBudget = (budgetId: number) => {
        if (confirm('¿Estás seguro de que quieres eliminar este presupuesto?')) {
            router.delete(`/budgets/${budgetId}`);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
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

    const getDaysRemaining = (endDate: string) => {
        const now = new Date();
        const end = new Date(endDate);
        const diffTime = end.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return 'Expirado';
        if (diffDays === 0) return 'Hoy';
        if (diffDays === 1) return '1 día';
        return `${diffDays} días`;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Presupuestos" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                {/* Header Section */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Presupuestos</h1>
                        <p className="text-muted-foreground">
                            Administra tus presupuestos y controla sus períodos de vigencia
                        </p>
                    </div>
                    <Button onClick={handleCreateBudget} className="gap-2">
                        <Plus className="h-4 w-4" />
                        Crear Presupuesto
                    </Button>
                </div>

                {/* Budgets Table */}
                {budgets.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="h-5 w-5" />
                                Presupuestos ({budgets.length})
                            </CardTitle>
                            <CardDescription>
                                Lista de todos tus presupuestos y su estado actual
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nombre</TableHead>
                                        <TableHead>Fecha de Inicio</TableHead>
                                        <TableHead>Fecha de Fin</TableHead>
                                        <TableHead>Estado</TableHead>
                                        <TableHead>Tiempo Restante</TableHead>
                                        <TableHead className="w-[70px]">Acciones</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {budgets.map((budget) => {
                                        const budgetStatus = getBudgetStatus(budget.start_date, budget.end_date);
                                        const daysRemaining = getDaysRemaining(budget.end_date);

                                        return (
                                            <TableRow key={budget.id}>
                                                <TableCell className="font-medium">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                                            <CalendarDays className="h-5 w-5 text-primary" />
                                                        </div>
                                                        <div>
                                                            <div className="font-semibold">{budget.name}</div>
                                                            <div className="text-sm text-muted-foreground">
                                                                ID: {budget.id}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="text-sm">
                                                        {formatDate(budget.start_date)}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="text-sm">
                                                        {formatDate(budget.end_date)}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant={budgetStatus.variant}>
                                                        {budgetStatus.label}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="text-sm font-medium">
                                                        {daysRemaining}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                                <MoreVertical className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem
                                                                onClick={() => handleViewAllocations(budget.id)}
                                                                className="gap-2"
                                                            >
                                                                <Eye className="h-4 w-4" />
                                                                Asignaciones
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                onClick={() => handleEditBudget(budget.id)}
                                                                className="gap-2"
                                                            >
                                                                <Edit className="h-4 w-4" />
                                                                Editar
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                onClick={() => handleDeleteBudget(budget.id)}
                                                                className="gap-2 text-red-600"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                                Eliminar
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                )}

                {/* Empty State */}
                {budgets.length === 0 && (
                    <Card className="flex flex-col items-center justify-center py-16">
                        <Calendar className="h-16 w-16 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No hay presupuestos</h3>
                        <p className="text-muted-foreground mb-4 text-center max-w-sm">
                            Comienza creando tu primer presupuesto para organizar tus finanzas por períodos
                        </p>
                        <Button onClick={handleCreateBudget} className="gap-2">
                            <Plus className="h-4 w-4" />
                            Crear tu Primer Presupuesto
                        </Button>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
