import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTransactions, getBudgets, getAccounts } from "../actions";
import type { Transaction } from "../types";

function calculateTotalsByType(transactions: Transaction[]) {
    return transactions.reduce(
        (acc, t) => {
            acc[t.type] += t.amount;
            return acc;
        },
        { income: 0, expense: 0 }
    );
}

export default async function Summary() {
    const transactions = await getTransactions();
    const budgets = await getBudgets();
    const accounts = await getAccounts();

    const { income: totalIncome, expense: totalExpenses } =
        calculateTotalsByType(transactions);
    const balance = totalIncome - totalExpenses;

    const totalBudget = budgets.reduce((sum, b) => sum + b.amount, 0);
    const totalAccountBalance = accounts.reduce((sum, a) => sum + a.balance, 0);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            <Card>
                <CardHeader>
                    <CardTitle>Total Income</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold text-green-600">
                        ${totalIncome.toFixed(2)}
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Total Expenses</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold text-red-600">
                        ${totalExpenses.toFixed(2)}
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Balance</CardTitle>
                </CardHeader>
                <CardContent>
                    <p
                        className={`text-2xl font-bold ${
                            balance >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                    >
                        ${balance.toFixed(2)}
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Total Budget</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold text-blue-600">
                        ${totalBudget.toFixed(2)}
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Total Account Balance</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold text-purple-600">
                        ${totalAccountBalance.toFixed(2)}
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
