import AppLayout from '@/layouts/app-layout';
import { usePage } from '@inertiajs/react';
import { Head, router, useForm } from '@inertiajs/react';
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
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, Receipt, Save } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { BreadcrumbItem } from '@/types';
import { PageProps } from '@/types/main';
import { toast } from 'sonner';
import { useEffect } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Transacciones',
        href: '/transactions',
    },
    {
        title: 'Crear Transacción',
        href: '/transactions/create',
    },
];

interface Wallet {
    id: number;
    name: string;
}

interface Allocation {
    id: number;
    name: string;
    budget?: {
        id: number;
        start_date: string;
        end_date: string;
    };
}

interface CreateTransactionProps {
    wallets: Wallet[];
    allocations: Allocation[];
}

export default function Create({ wallets, allocations }: CreateTransactionProps) {
    const { flash } = usePage<PageProps>().props;

    const { data, setData, post, processing, errors } = useForm<{
        amount: string;
        description: string;
        type: 'expense' | 'deposit';
        date: string;
        allocation_id: string;
        wallet_id: string;
        is_transfer: string;
    }>({
        amount: '',
        description: '',
        type: 'expense' as 'expense' | 'deposit',
        date: new Date().toLocaleDateString('en-CA'), // YYYY-MM-DD for date input
        allocation_id: '',
        wallet_id: '',
        is_transfer: '0',
    });

    useEffect(() => {
        if (flash?.message) {
            toast.error(flash.message);
        }
    }, [flash]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/transactions', {
            onSuccess: () => {
                toast.success('Transacción creada exitosamente');
                router.visit('/transactions');
            },
            onError: () => {
                toast.error('Error al crear la transacción');
            },
        });
    };

    const handleCancel = () => {
        router.visit('/transactions');
    };

    const selectedDate = new Date(`${data.date}T00:00:00`);
    const filteredAllocations =
        data.type === 'expense'
            ? allocations.filter((allocation) => {
                  if (!allocation.budget) return false;
                  const start = new Date(allocation.budget.start_date);
                  const end = new Date(allocation.budget.end_date);
                  // Include allocation if selected date falls within its budget period
                  return selectedDate >= start && selectedDate <= end;
              })
            : [];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear Transacción" />
            <div className="w-full min-w-0 overflow-x-hidden flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                {/* Header Section */}
                <div className="flex items-center gap-4 min-w-0">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={handleCancel}
                        className="h-10 w-10"
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div className="min-w-0">
                        <h1 className="text-3xl font-bold tracking-tight">
                            Crear Transacción
                        </h1>
                        <p className="text-muted-foreground">
                            Registra un nuevo ingreso o gasto
                        </p>
                    </div>
                </div>

                {/* Form Card */}
                <Card className="max-w-2xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Receipt className="h-5 w-5" />
                            Información de la Transacción
                        </CardTitle>
                        <CardDescription>
                            Completa los datos de tu nueva transacción
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Transaction Type */}
                            <div className="space-y-2">
                                <Label htmlFor="type">Tipo de Transacción</Label>
                                <Select
                                    value={data.type}
                                    onValueChange={(value: 'expense' | 'deposit') => {
                                        setData('type', value);
                                        // Clear allocation when switching to deposit
                                        if (value === 'deposit') {
                                            setData('allocation_id', '');
                                        }
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona el tipo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="expense">Gasto</SelectItem>
                                        <SelectItem value="deposit">Ingreso</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.type && (
                                    <p className="text-sm text-red-600">{errors.type}</p>
                                )}
                            </div>

                            {/* Amount */}
                            <div className="space-y-2">
                                <Label htmlFor="amount">Monto</Label>
                                <Input
                                    id="amount"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    placeholder="0.00"
                                    value={data.amount}
                                    onChange={(e) => setData('amount', e.target.value)}
                                    className={errors.amount ? 'border-red-500' : ''}
                                />
                                {errors.amount && (
                                    <p className="text-sm text-red-600">{errors.amount}</p>
                                )}
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <Label htmlFor="description">Descripción</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Describe la transacción..."
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className={errors.description ? 'border-red-500' : ''}
                                    rows={3}
                                />
                                {errors.description && (
                                    <p className="text-sm text-red-600">
                                        {errors.description}
                                    </p>
                                )}
                            </div>

                            {/* Date */}
                            <div className="space-y-2">
                                <Label htmlFor="date">Fecha</Label>
                                <Input
                                    id="date"
                                    type="date"
                                    value={data.date}
                                    onChange={(e) => setData('date', e.target.value)}
                                    className={errors.date ? 'border-red-500' : ''}
                                />
                                {errors.date && (
                                    <p className="text-sm text-red-600">{errors.date}</p>
                                )}
                            </div>

                            {/* Wallet */}
                            <div className="space-y-2">
                                <Label htmlFor="wallet_id">Billetera</Label>
                                <Select
                                    value={data.wallet_id}
                                    onValueChange={(value) => setData('wallet_id', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona una billetera" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {wallets.map((wallet) => (
                                            <SelectItem
                                                key={wallet.id}
                                                value={wallet.id.toString()}
                                            >
                                                {wallet.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.wallet_id && (
                                    <p className="text-sm text-red-600">
                                        {errors.wallet_id}
                                    </p>
                                )}
                            </div>

                        {/* Allocation (only for expenses) */}
                            {data.type === 'expense' && (
                                <div className="space-y-2">
                                    <Label htmlFor="allocation_id">
                                        Asignación (Opcional)
                                    </Label>
                                     <Select
                                        value={data.allocation_id}
                                        onValueChange={(value) => {
                                            const finalValue = value === 'none' ? '' : value;
                                            setData('allocation_id', finalValue);
                                        }}
                                     >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecciona una asignación" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="none">Sin asignación</SelectItem>
                                            {filteredAllocations.map((allocation) => (
                                                <SelectItem
                                                    key={allocation.id}
                                                    value={allocation.id.toString()}
                                                >
                                                    {allocation.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.allocation_id && (
                                        <p className="text-sm text-red-600">
                                            {errors.allocation_id}
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Form Actions */}
                            <div className="flex gap-3 pt-4">
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="gap-2"
                                >
                                    <Save className="h-4 w-4" />
                                    {processing ? 'Guardando...' : 'Crear Transacción'}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleCancel}
                                    disabled={processing}
                                >
                                    Cancelar
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
