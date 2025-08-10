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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
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
    Repeat,
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
import { useEffect, useState } from 'react';
import { formatCurrency } from '@/lib/utils';
// Summary cards moved to dashboard

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
    type: 'expense' | 'deposit' | 'transfer';
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

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedTransactions {
    data: Transaction[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
    links: PaginationLink[];
}

interface WalletOption {
    id: number;
    name: string;
}

interface AllocationOption {
    id: number;
    name: string;
}

interface TransactionIndexProps {
    transactions: PaginatedTransactions;
    wallets: WalletOption[];
    allocations: AllocationOption[];
    filters: {
        search?: string;
        type?: 'expense' | 'deposit' | 'transfer';
        wallet_id?: string | number;
        allocation_id?: string | number | null;
        start_date?: string;
        end_date?: string;
    };
}

export default function Index({ transactions, wallets, allocations, filters }: TransactionIndexProps) {
    const { flash } = usePage<PageProps>().props;

    useEffect(() => {
        if (flash?.message) {
            toast.success(flash.message);
        }
    }, [flash]);

    const [showFilters, setShowFilters] = useState(
        Boolean(
            (filters && (
                filters.search ||
                filters.type ||
                filters.wallet_id ||
                filters.allocation_id ||
                filters.start_date ||
                filters.end_date
            ))
        )
    );
    const [localFilters, setLocalFilters] = useState({
        search: (filters?.search as string) || '',
        type: (filters?.type as string) || '',
        wallet_id: (filters?.wallet_id as string | number | undefined)?.toString?.() || '',
        allocation_id: (filters?.allocation_id as string | number | null | undefined)?.toString?.() || '',
        start_date: (filters?.start_date as string) || '',
        end_date: (filters?.end_date as string) || '',
    });

    const buildQuery = (f: typeof localFilters) => {
        return Object.fromEntries(
            Object.entries(f).filter(([_, v]) => v !== undefined && v !== null && v !== '')
        );
    };

    const applyFilters = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        router.get('/transactions', buildQuery(localFilters), {
            preserveState: true,
            replace: true,
            preserveScroll: true,
        });
    };

    const resetFilters = () => {
        const empty = {
            search: '',
            type: '',
            wallet_id: '',
            allocation_id: '',
            start_date: '',
            end_date: '',
        };
        setLocalFilters(empty);
        router.get('/transactions', {}, {
            preserveState: true,
            replace: true,
            preserveScroll: true,
        });
    };

    const handleCreateTransaction = () => {
        router.visit('/transactions/create');
    };

    const handleTransfer = () => {
        router.visit('/transactions/transfer');
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

    const getTransactionIcon = (type: 'expense' | 'deposit' | 'transfer') => {
        if (type === 'expense') {
            return <ArrowDownCircle className="h-5 w-5 text-red-500" />;
        } else if (type === 'deposit') {
            return <ArrowUpCircle className="h-5 w-5 text-green-500" />;
        }
        return <Repeat className="h-5 w-5 text-blue-500" />;
    };
        

    const getTransactionBadge = (type: 'expense' | 'deposit' | 'transfer') => {
        if (type === 'expense') {
            return <Badge variant="destructive">Gasto</Badge>;
        } else if (type === 'deposit') {
            return (
                <Badge variant="default" className="bg-green-100 text-green-800">
                    Ingreso
                </Badge>
            );
        }
        return <Badge variant="secondary">Transferencia</Badge>;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Transacciones" />
            <div className="w-full min-w-0 overflow-x-hidden flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                {/* Header Section */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Transacciones
                        </h1>
                        <p className="text-muted-foreground">
                            Administra todos tus ingresos y gastos
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2 sm:justify-end">
                        <Button variant="outline" className="gap-2" onClick={() => setShowFilters((v) => !v)}>
                            <Filter className="h-4 w-4" />
                            Filtrar
                        </Button>
                        <Button onClick={handleTransfer} variant="outline" className="gap-2">
                            <Repeat className="h-4 w-4" />
                            Transferir
                        </Button>
                        <Button
                            onClick={handleCreateTransaction}
                            aria-label="Nueva Transacción"
                            title="Nueva Transacción"
                            className="gap-1 sm:gap-2 whitespace-nowrap"
                        >
                            <Plus className="h-4 w-4" />
                            <span className="hidden sm:inline">Nueva Transacción</span>
                        </Button>
                    </div>
                </div>

                {/* Summary cards moved to Dashboard */}

                {/* Filters */}
                {showFilters && (
                    <Card>
                        <CardContent className="pt-6">
                            <form onSubmit={applyFilters} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="search">Buscar</Label>
                                    <Input
                                        id="search"
                                        placeholder="Descripción..."
                                        value={localFilters.search}
                                        onChange={(e) => setLocalFilters((s) => ({ ...s, search: e.target.value }))}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="type">Tipo</Label>
                                    <Select
                                        value={localFilters.type || 'none'}
                                        onValueChange={(value) => setLocalFilters((s) => ({ ...s, type: value === 'none' ? '' : value }))}
                                    >
                                        <SelectTrigger id="type">
                                            <SelectValue placeholder="Todos" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="none">Todos</SelectItem>
                                            <SelectItem value="expense">Gasto</SelectItem>
                                            <SelectItem value="deposit">Ingreso</SelectItem>
                                            <SelectItem value="transfer">Transferencia</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="wallet_id">Billetera</Label>
                                    <Select
                                        value={localFilters.wallet_id || 'none'}
                                        onValueChange={(value) => setLocalFilters((s) => ({ ...s, wallet_id: value === 'none' ? '' : value }))}
                                    >
                                        <SelectTrigger id="wallet_id">
                                            <SelectValue placeholder="Todas" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="none">Todas</SelectItem>
                                            {wallets.map((w) => (
                                                <SelectItem key={w.id} value={w.id.toString()}>
                                                    {w.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="allocation_id">Asignación</Label>
                                    <Select
                                        value={localFilters.allocation_id || 'none'}
                                        onValueChange={(value) => setLocalFilters((s) => ({ ...s, allocation_id: value === 'none' ? '' : value }))}
                                    >
                                        <SelectTrigger id="allocation_id">
                                            <SelectValue placeholder="Todas" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="none">Todas</SelectItem>
                                            {allocations.map((a) => (
                                                <SelectItem key={a.id} value={a.id.toString()}>
                                                    {a.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="start_date">Desde</Label>
                                    <Input
                                        id="start_date"
                                        type="date"
                                        value={localFilters.start_date}
                                        onChange={(e) => setLocalFilters((s) => ({ ...s, start_date: e.target.value }))}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="end_date">Hasta</Label>
                                    <Input
                                        id="end_date"
                                        type="date"
                                        value={localFilters.end_date}
                                        onChange={(e) => setLocalFilters((s) => ({ ...s, end_date: e.target.value }))}
                                    />
                                </div>

                                <div className="flex items-end gap-2 md:col-span-2 lg:col-span-3">
                                    <Button type="submit" className="gap-2">Aplicar</Button>
                                    <Button type="button" variant="outline" onClick={resetFilters}>Limpiar</Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                )}

                {/* Transactions Table */}
                {transactions.data.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Receipt className="h-5 w-5" />
                                Transacciones ({transactions.total})
                            </CardTitle>
                            <CardDescription>
                                Historial completo de todas tus transacciones
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="w-full overflow-x-auto">
                            <Table className="min-w-[720px]">
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
                                    {transactions.data.map((transaction) => (
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
                            </div>
                            {/* Pagination */}
                            {transactions.links && transactions.links.length > 0 && (
                                <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                                    {transactions.links.map((link, idx) => (
                                        <Button
                                            key={idx}
                                            variant={link.active ? 'default' : 'outline'}
                                            size="sm"
                                            disabled={!link.url}
                                            onClick={() => link.url && router.visit(link.url)}
                                        >
                                            <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                        </Button>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}

                {/* Empty State */}
                {transactions.data.length === 0 && (
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
