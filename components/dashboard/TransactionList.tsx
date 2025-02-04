import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTransactions } from "../actions";

export default async function TransactionList() {
    const transactions = await getTransactions();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {transactions.map((transaction, index) => (
                        <li
                            key={index}
                            className="flex justify-between items-center"
                        >
                            <div>
                                <p className="font-semibold">
                                    {transaction.description}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {new Date(
                                        transaction.date
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                            <p
                                className={`font-bold ${
                                    transaction.type === "income"
                                        ? "text-green-600"
                                        : "text-red-600"
                                }`}
                            >
                                {transaction.type === "income" ? "+" : "-"}$
                                {transaction.amount.toFixed(2)}
                            </p>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
}
