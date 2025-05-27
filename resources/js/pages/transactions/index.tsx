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
    Receipt,
    MoreVertical,
    Edit,
    Trash2,
    ArrowUpCircle,
    ArrowDownCircle,
    Wallet,
    Filter,
} from 'lucide-react';
import { BreadcrumbItem } from '@/types';
import { PageProps } from '@/types/main';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { formatCurrency } from '@/lib/utils';
import { Summary } from './components/summary';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Transacciones',
        href: '/transactions',
    },
];

// Transaction type definition
interface Transaction {
    id: number;
    amount: number;
    description: string;
    type: 'expense' | 'deposit';
    date: string;
    allocation_id: number | null;
    user_id: number;
    wallet_id: number;
    created_at: string;
    updated_at: string;
    // Relations
    allocation?: {
        id: number;
        name: string;
        category: {
            id: number;
            name: string;
        };
    };
    wallet: {
        id: number;
        name: string;
    };
}

interface TransactionIndexProps {
    transactions: Transaction[];
}

export default function Index({ transactions }: TransactionIndexProps) {
    const { flash } = usePage<PageProps>().props;

    useEffect(() => {
        if (flash?.message) {
            toast.success(flash.message);
        }
    }, [flash]);

    const handleCreateTransaction = () => {
        router.visit('/transactions/create');
    };

    const handleEditTransaction = (transactionId: number) => {
        router.visit(`/transactions/${transactionId}/edit`);
    };

    const handleDeleteTransaction = (transactionId: number) => {
        if (
            confirm('¿Estás seguro de que quieres eliminar esta transacción?')
        ) {
            router.delete(`/transactions/${transactionId}`);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getTransactionIcon = (type: 'expense' | 'deposit') => {
        return type === 'expense' ? (
            <ArrowDownCircle className="h-5 w-5 text-red-500" />
        ) : (
            <ArrowUpCircle className="h-5 w-5 text-green-500" />
        );
    };

    const getTransactionBadge = (type: 'expense' | 'deposit') => {
        return type === 'expense' ? (
            <Badge variant="destructive">Gasto</Badge>
        ) : (
            <Badge variant="default" className="bg-green-100 text-green-800">
                Ingreso
            </Badge>
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Transacciones" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                {/* Header Section */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Transacciones
                        </h1>
                        <p className="text-muted-foreground">
                            Administra todos tus ingresos y gastos
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" className="gap-2">
                            <Filter className="h-4 w-4" />
                            Filtrar
                        </Button>
                        <Button onClick={handleCreateTransaction} className="gap-2">
                            <Plus className="h-4 w-4" />
                            Nueva Transacción
                        </Button>
                    </div>
                </div>

                {/* Summary Cards */}
                {transactions.length > 0 && (
                    <Summary transactions={transactions} />
                )}

                {/* Transactions Table */}
                {transactions.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Receipt className="h-5 w-5" />
                                Transacciones ({transactions.length})
                            </CardTitle>
                            <CardDescription>
                                Historial completo de todas tus transacciones
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Descripción</TableHead>
                                        <TableHead>Tipo</TableHead>
                                        <TableHead>Monto</TableHead>
                                        <TableHead>Billetera</TableHead>
                                        <TableHead>Asignación</TableHead>
                                        <TableHead>Fecha</TableHead>
                                        <TableHead className="w-[70px]">
                                            Acciones
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {transactions.map((transaction) => (
                                        <TableRow key={transaction.id}>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                                        {getTransactionIcon(
                                                            transaction.type
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold">
                                                            {transaction.description}
                                                        </div>
                                                        <div className="text-sm text-muted-foreground">
                                                            ID: {transaction.id}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {getTransactionBadge(
                                                    transaction.type
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <div
                                                    className={`font-semibold ${
                                                        transaction.type ===
                                                        'expense'
                                                            ? 'text-red-600'
                                                            : 'text-green-600'
                                                    }`}
                                                >
                                                    {transaction.type ===
                                                    'expense'
                                                        ? '-'
                                                        : '+'}
                                                    {formatCurrency(
                                                        transaction.amount
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-sm">
                                                    {transaction.wallet.name}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {transaction.allocation ? (
                                                    <div className="text-sm">
                                                        <div className="font-medium">
                                                            {
                                                                transaction
                                                                    .allocation
                                                                    .name
                                                            }
                                                        </div>
                                                        <div className="text-muted-foreground">
                                                            {
                                                                transaction
                                                                    .allocation
                                                                    .name
                                                            }
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <span className="text-muted-foreground">
                                                        Sin asignar
                                                    </span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-sm">
                                                    {formatDate(
                                                        transaction.date
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            className="h-8 w-8 p-0"
                                                        >
                                                            <MoreVertical className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem
                                                            onClick={() =>
                                                                handleEditTransaction(
                                                                    transaction.id
                                                                )
                                                            }
                                                            className="gap-2"
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                            Editar
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() =>
                                                                handleDeleteTransaction(
                                                                    transaction.id
                                                                )
                                                            }
                                                            className="gap-2 text-red-600"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                            Eliminar
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                )}

                {/* Empty State */}
                {transactions.length === 0 && (
                    <Card className="flex flex-col items-center justify-center py-16">
                        <Receipt className="h-16 w-16 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">
                            No hay transacciones
                        </h3>
                        <p className="text-muted-foreground mb-4 text-center max-w-sm">
                            Comienza registrando tu primera transacción para
                            llevar control de tus finanzas
                        </p>
                        <Button
                            onClick={handleCreateTransaction}
                            className="gap-2"
                        >
                            <Plus className="h-4 w-4" />
                            Crear tu Primera Transacción
                        </Button>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
