import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { ArrowDownCircle, ArrowUpCircle, Wallet } from 'lucide-react';
import { Transaction } from '@/types/transactions';

interface SummaryProps {
    transactions: Transaction[];
}

export const Summary = ({ transactions }: SummaryProps) => {
    const getTotalBalance = () => {
        return transactions.reduce((total, transaction) => {
            return transaction.type === 'deposit'
                ? Number(total) + Number(transaction.amount)
                : Number(total) - Number(transaction.amount);
        }, 0);
    };

    const getExpenseTotal = () => {
        return transactions
            .filter((t) => t.type === 'expense')
            .reduce((total, transaction) => Number(total) + Number(transaction.amount), 0);
    };

    const getIncomeTotal = () => {
        return transactions
            .filter((t) => t.type === 'deposit')
            .reduce((total, transaction) => Number(total) + Number(transaction.amount), 0);
    };
    return (
        <div className="grid gap-4 md:grid-cols-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Balance Total
                    </CardTitle>
                    <Wallet className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div
                        className={`text-2xl font-bold ${getTotalBalance() >= 0
                                ? 'text-green-600'
                                : 'text-red-600'
                            }`}
                    >
                        {formatCurrency(getTotalBalance())}
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Total Ingresos
                    </CardTitle>
                    <ArrowUpCircle className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-green-600">
                        {formatCurrency(getIncomeTotal())}
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Total Gastos
                    </CardTitle>
                    <ArrowDownCircle className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-red-600">
                        {formatCurrency(getExpenseTotal())}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
