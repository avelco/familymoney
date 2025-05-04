import Breadcrumb from "~/components/Breadcrumb";
import type { Route } from "../+types/root";
import { NumericFormat } from "react-number-format";
import { useState, useEffect } from "react";
import { getBudgets } from "~/lib/models/budget.server";
import { Form, redirect, useLoaderData } from "react-router";
import { getWallets } from "~/lib/models/wallet.server";
import type { Allocation } from "~/interfaces/budgetInterface";
import type { Transaction, TransactionFormData } from "~/interfaces/transactionInterface";
import { createTransaction } from "~/lib/models/transaction.server";
import { getSession } from "~/sessions.server";

export async function loader({ params }: Route.LoaderArgs) {
	const budgets = await getBudgets();
    const wallets = await getWallets();
	return {budgets, wallets};
}

export async function action({ request }: Route.ActionArgs) {
    const session = await getSession(
        request.headers.get("Cookie")
    );
	const formData = await request.formData();
    const transaction: TransactionFormData = {
        amount: Number(formData.get("amount")),
        type: formData.get("type") as "expense" | "deposit",
        date: new Date(formData.get("date") as string),
        allocationId: Number(formData.get("allocation")),
        userId: Number(session.get("userId")),
        walletId: Number(formData.get("wallet")),
        description: formData.get("description") as string,
    };
    console.log(transaction);
    await createTransaction(transaction);
    return redirect("/transactions");
}

const TransactionCreate = () => {
	const {budgets, wallets} = useLoaderData<typeof loader>();
	const [amount, setAmount] = useState<number | string>("");
	const [selectedBudgetId, setSelectedBudgetId] = useState<number | null>(
		budgets[0]?.id ?? null
	);
	const [allocations, setAllocations] = useState<Allocation[]>([]);

	useEffect(() => {
		if (selectedBudgetId) {
			const budget = budgets.find((b: any) => b.id === Number(selectedBudgetId));
			const newAllocations = budget?.allocations.map((a: any) => ({
				...a,
				amountRemaining: a.amount - a.transactions.reduce((sum: number, t: Transaction) => sum + t.amount, 0),
			})) || [];
			setAllocations(newAllocations);
		}
	}, [selectedBudgetId, budgets]);

	return (
		<>
			<div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
				<div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
					<div className="flex flex-col">
						<Breadcrumb
							crumbs={[
								{ label: "Home", path: "/" },
								{ label: "Transacciones", path: "/transactions" },
								{ label: "Create", path: "/transactions/create" },
							]}
						/>
						<h1 className="text-2xl md:text-3xl font-bold text-gray-800">
							Registrar Transacción
						</h1>
					</div>
				</div>
			</div>

			<section className="max-w-xl mx-auto p-6 bg-white shadow-xl rounded-2xl space-y-6">
				<Form method="post" className="space-y-6">
					<NumericFormat
						thousandSeparator={true}
						decimalScale={2}
						allowNegative={false}
						value={amount}
						onValueChange={(values) => setAmount(values.value)}
						className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
						placeholder="e.g., 500"
					/>
					<input type="hidden" name="amount" value={amount} />

					<div>
						<label htmlFor="description" className="block text-sm font-medium text-gray-700">
							Descripción
						</label>
						<input
							type="text"
							name="description"
							id="description"
							placeholder="Ej: Compra de ropa"
							className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
						/>
					</div>

					<div>
						<label htmlFor="type" className="block text-sm font-medium text-gray-700">
							Tipo
						</label>
						<select
							name="type"
							id="type"
							className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-2 bg-white shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
						>
							<option value="expense">Gasto</option>
							<option value="deposit">Depósito</option>
						</select>
					</div>

					<div>
						<label htmlFor="date" className="block text-sm font-medium text-gray-700">
							Fecha
						</label>
						<input
							type="date"
							name="date"
							id="date"
							defaultValue={new Date().toISOString().split("T")[0]}
							className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
						/>
					</div>

					<div>
						<label htmlFor="budget" className="block text-sm font-medium text-gray-700">
							Presupuesto
						</label>
						<select
							name="budget"
							id="budget"
							value={selectedBudgetId ?? ""}
							onChange={(e) => setSelectedBudgetId(Number(e.target.value))}
							className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-2 bg-white shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
						>
							{budgets.map((b: any) => (
								<option key={b.id} value={b.id}>
									{b.name}
								</option>
							))}
						</select>
					</div>

					<div>
						<label htmlFor="allocation" className="block text-sm font-medium text-gray-700">
							Asignación
						</label>
						<select
							name="allocation"
							id="allocation"
							className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-2 bg-white shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
						>
							<option value="">Seleccione una asignación</option>
							{allocations.map((a: any) => (
								<option key={a.id} value={a.id}>
									{a.name}
								</option>
							))}
						</select>
					</div>

					<div>
						<label htmlFor="wallet" className="block text-sm font-medium text-gray-700">
							Billetera
						</label>
						<select
							name="wallet"
							id="wallet"
							className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-2 bg-white shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
						>
							<option value="">Seleccione una billetera</option>
							{wallets.map((w: any) => (
								<option key={w.id} value={w.id}>
									{w.name}
								</option>
							))}
						</select>
					</div>

					<div className="pt-4">
						<button
							type="submit"
							className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition duration-150"
						>
							Guardar Transacción
						</button>
					</div>
				</Form>
			</section>
		</>
	);
};

export default TransactionCreate;
