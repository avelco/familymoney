import AppLayout from '@/layouts/app-layout';
import { usePage } from '@inertiajs/react';
import { Head, router, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
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
import { ArrowLeft, Repeat, Save } from 'lucide-react';
import { BreadcrumbItem } from '@/types';
import { PageProps } from '@/types/main';
import { toast } from 'sonner';
import { useEffect } from 'react';

interface Wallet {
    id: number;
    name: string;
}

interface TransferProps {
    wallets: Wallet[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Transacciones', href: '/transactions' },
    { title: 'Transferir', href: '/transactions/transfer' },
];

export default function Transfer({ wallets }: TransferProps) {
    const { flash } = usePage<PageProps>().props;

    const { data, setData, post, processing, errors } = useForm<{
        amount: string;
        description: string;
        date: string;
        wallet_from_id: string;
        wallet_to_id: string;
        type: 'transfer';
    }>({
        amount: '',
        description: '',
        date: new Date().toISOString().slice(0, 16),
        wallet_from_id: '',
        wallet_to_id: '',
        type: 'transfer',
    });

    useEffect(() => {
        if (flash?.message) {
            toast.error(flash.message);
        }
    }, [flash]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (data.wallet_from_id === data.wallet_to_id) {
            toast.error('Las cuentas origen y destino deben ser diferentes');
            return;
        }

        post('/transactions/transfer', {
            onSuccess: () => {
                toast.success('Transferencia realizada correctamente');
                router.visit('/transactions');
            },
            onError: () => {
                toast.error('Error al realizar la transferencia');
            },
        });
    };

    const handleCancel = () => router.visit('/transactions');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Transferir" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={handleCancel}
                        className="h-10 w-10"
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Nueva Transferencia
                        </h1>
                        <p className="text-muted-foreground">
                            Mueve dinero entre tus cuentas
                        </p>
                    </div>
                </div>

                <Card className="max-w-2xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Repeat className="h-5 w-5" /> Información de la Transferencia
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4" onSubmit={handleSubmit}>
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
                                />
                                {errors.amount && (
                                    <p className="text-sm text-red-600">{errors.amount}</p>
                                )}
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <Label htmlFor="description">Descripción</Label>
                                <Input
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                />
                                {errors.description && (
                                    <p className="text-sm text-red-600">{errors.description}</p>
                                )}
                            </div>

                            {/* Date */}
                            <div className="space-y-2">
                                <Label htmlFor="date">Fecha</Label>
                                <Input
                                    id="date"
                                    type="datetime-local"
                                    value={data.date}
                                    onChange={(e) => setData('date', e.target.value)}
                                />
                                {errors.date && (
                                    <p className="text-sm text-red-600">{errors.date}</p>
                                )}
                            </div>

                            {/* Wallet From */}
                            <div className="space-y-2">
                                <Label htmlFor="wallet_from_id">Cuenta Origen</Label>
                                <Select
                                    value={data.wallet_from_id}
                                    onValueChange={(value) => setData('wallet_from_id', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona la cuenta de origen" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {wallets.map((wallet) => (
                                            <SelectItem key={wallet.id} value={wallet.id.toString()}>
                                                {wallet.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.wallet_from_id && (
                                    <p className="text-sm text-red-600">{errors.wallet_from_id}</p>
                                )}
                            </div>

                            {/* Wallet To */}
                            <div className="space-y-2">
                                <Label htmlFor="wallet_to_id">Cuenta Destino</Label>
                                <Select
                                    value={data.wallet_to_id}
                                    onValueChange={(value) => setData('wallet_to_id', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona la cuenta de destino" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {wallets.map((wallet) => (
                                            <SelectItem key={wallet.id} value={wallet.id.toString()}>
                                                {wallet.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.wallet_to_id && (
                                    <p className="text-sm text-red-600">{errors.wallet_to_id}</p>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 pt-4">
                                <Button type="submit" disabled={processing} className="gap-2">
                                    <Save className="h-4 w-4" /> {processing ? 'Procesando...' : 'Transferir'}
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
