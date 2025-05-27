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
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
    Plus,
    Wallet as WalletIcon,
    MoreVertical,
    Eye,
    Edit,
    Trash2,
    CreditCard,
    DollarSign,
    TrendingUp,
} from 'lucide-react';
import { BreadcrumbItem } from '@/types';
import { PageProps } from '@/types/main';
import { Wallet, WalletIndexProps } from '@/types/wallets';
import { formatCurrency } from '@/lib/utils';
import { Summary } from './components/summary';
import { toast } from 'sonner';
import { useEffect } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Cuentas',
        href: '/wallets',
    },
];


export default function Index({ wallets, totalBalance, depositsThisMonth, expensesThisMonth, lastTransaction }: WalletIndexProps) {
    const { flash } = usePage<PageProps>().props

    useEffect(() => {
        if (flash?.message) {
            toast.success(flash.message);
        }
    }, [flash]);

    const handleCreateWallet = () => {
        router.visit('/wallets/create');
    };

    const handleViewWallet = (walletId: number) => {
        router.visit(`/wallets/${walletId}`);
    };

    const handleEditWallet = (walletId: number) => {
        router.visit(`/wallets/${walletId}/edit`);
    };

    const handleDeleteWallet = (walletId: number) => {
        router.visit(`/wallets/${walletId}/delete`, {
            method: 'delete',
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cuentas" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                {/* Header Section */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Cuentas</h1>
                        <p className="text-muted-foreground">
                            Administra tus cuentas bancarias y controla sus balances
                        </p>
                    </div>
                    <Button onClick={handleCreateWallet} className="gap-2">
                        <Plus className="h-4 w-4" />
                        Crear Cuenta
                    </Button>
                </div>

                {/* Summary Cards */}
                <Summary
                    totalBalance={totalBalance}
                    depositsThisMonth={depositsThisMonth}
                    expensesThisMonth={expensesThisMonth}
                    lastTransaction={lastTransaction}
                />

                {/* Wallets Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {wallets.map((wallet) => (
                        <Card key={wallet.id} className="hover:shadow-md transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <div className="flex items-center space-x-3">
                                    <Avatar className="h-10 w-10">
                                        <AvatarFallback className="bg-blue-500">
                                        💰
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <CardTitle className="text-base">{wallet.name}</CardTitle>
                                        <CardDescription>{wallet.currency}</CardDescription>
                                    </div>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem
                                            onClick={() => handleViewWallet(wallet.id)}
                                        >
                                            <Eye className="mr-2 h-4 w-4" />
                                            Ver Detalles
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => handleEditWallet(wallet.id)}
                                        >
                                            <Edit className="mr-2 h-4 w-4" />
                                            Editar Cuenta
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => handleDeleteWallet(wallet.id)}
                                            className="text-red-600"
                                        >
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            Borrar
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div>
                                        <div className="text-2xl font-bold">
                                            {formatCurrency(wallet.current_balance, wallet.currency)}
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            Balance actual
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <Badge
                                            variant="secondary"
                                            className="bg-green-500"
                                        >
                                            {wallet.currency}
                                        </Badge>
                                        <span className="text-sm text-muted-foreground">
                                            {formatCurrency(wallet.current_balance, wallet.currency)}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Empty State */}
                {wallets.length === 0 && (
                    <Card className="flex flex-col items-center justify-center py-16">
                        <WalletIcon className="h-16 w-16 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No wallets found</h3>
                        <p className="text-muted-foreground mb-4 text-center max-w-sm">
                            Get started by creating your first wallet to track your finances
                        </p>
                        <Button onClick={handleCreateWallet} className="gap-2">
                            <Plus className="h-4 w-4" />
                            Create Your First Wallet
                        </Button>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
