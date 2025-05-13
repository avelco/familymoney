// src/pages/Transactions.jsx
import { CiEdit } from "react-icons/ci";
import Breadcrumb from "~/components/Breadcrumb";
import AllocationSummary from "~/features/transactions/Component/AllocationSummary";
import { Link, useLoaderData } from "react-router";
import { activeAllocationsAction, deleteTransactionAction } from "~/features/transactions/transactionActions";
import { getCurrentBudget } from "~/lib/models/budget.server";
import { getTransactionsByBudgetId } from "~/lib/models/transaction.server";
import TransactionDelete from "~/features/transactions/Component/TransactionDelete";
import { formatMoney } from "~/lib/utils/format";

export async function loader() {
	const allocations = await activeAllocationsAction();
	const budget = await getCurrentBudget();
	if (!budget) {
		return { allocations, transactions: [] };
	}
	const transactions = await getTransactionsByBudgetId(budget.id);
	return { allocations, transactions };
}

export async function action({ request }: any) {
	const formData = new URLSearchParams(await request.text());
	const action = formData.get("_action");
	if (action === "delete") {
		const transactionId = Number(formData.get("id"));
		await deleteTransactionAction(transactionId);
	}
}

export default function Transactions() {
	const { allocations, transactions } = useLoaderData();
	return (
		<div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
			{/* Header & Breadcrumb */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
				<div className="flex flex-col">
					<Breadcrumb
						crumbs={[
							{ label: "Home", path: "/" },
							{ label: "Transactions", path: "/transactions" },
						]}
					/>
					<h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
						Transacciones
					</h1>
				</div>

			</div>

			<AllocationSummary allocations={allocations} />

			{/* Filters */}
			<div className="flex flex-wrap gap-4 mb-6">
				<select className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg px-3 py-2 text-gray-700 dark:text-gray-200">
					<option value="">Todos los tipos</option>
					<option value="expense">Gasto</option>
					<option value="deposit">Deposito</option>
				</select>
				<select className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg px-3 py-2 text-gray-700 dark:text-gray-200">
					<option value="">Todas las cuentas</option>
					<option value="1">Main Wallet</option>
					<option value="2">Emergency Fund</option>
				</select>
				<select className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg px-3 py-2 text-gray-700 dark:text-gray-200">
					<option value="">Todas las asignaciones</option>
					<option value="1">Checking</option>
					<option value="2">Savings</option>
				</select>
				<input
					type="date"
					className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg px-3 py-2 text-gray-700 dark:text-gray-200"
					placeholder="Start Date"
				/>
				<input
					type="date"
					className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg px-3 py-2 text-gray-700 dark:text-gray-200"
					placeholder="End Date"
				/>
			</div>

			{/* Table */}
			<div className="relative overflow-x-auto shadow-lg sm:rounded-lg bg-white dark:bg-gray-800">
				<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 divide-y divide-gray-200 dark:divide-gray-700">
					<thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
						<tr>
							<th className="px-6 py-4 font-medium text-center">Fecha</th>
							<th className="px-6 py-4 font-medium text-center">Tipo</th>
							<th className="px-6 py-4 font-medium text-center">Cantidad</th>
							<th className="px-6 py-4 font-medium text-center">Billetera</th>
							<th className="px-6 py-4 font-medium text-center">Asignación</th>
							<th className="px-6 py-4">
								<span className="sr-only">Actions</span>
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200 dark:divide-gray-700">
						{transactions.length === 0 && (
							<tr>
								<td colSpan={7} className="px-6 py-4 text-center">
									No se encontraron transacciones.
								</td>
							</tr>
						)}
						{transactions.map((transaction: any) => (
							<tr
								key={transaction.id}
								className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150 ease-in-out"
							>
								<td className="px-6 py-4 text-center">{transaction.date.toLocaleDateString()}</td>
								<td className="px-6 py-4 text-center capitalize">
									{transaction.type === "expense" ? "Gasto" : "Deposito"}
								</td>
								<td
									className={`px-6 py-4 text-center font-medium ${transaction.type === "expense"
										? "text-red-600 dark:text-red-400"
										: "text-green-600 dark:text-green-400"
										}`}
								>
									{formatMoney(transaction.amount)}
								</td>
								<td className="px-6 py-4 text-center">{transaction.wallet.name}</td>
								<td className="px-6 py-4 text-center">{transaction.allocation.name}</td>
								<td className="px-6 py-4 text-right">
									<div className="flex items-center gap-x-1 justify-end">
										<button
											className="inline-flex items-center rounded-md border border-blue-500 px-3 py-1.5 text-sm font-semibold text-blue-700 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:border-blue-400 dark:text-blue-300 dark:hover:bg-blue-900/20 dark:focus:ring-offset-gray-800 transition-colors duration-150 ease-in-out"
											type="button"
										// onClick={...}
										>
											<CiEdit className="h-4 w-4" aria-hidden="true" />
										</button>
										<TransactionDelete transactionId={transaction.id} />
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Pagination */}
			<div className="flex justify-end items-center gap-2 mt-4">
				<button className="px-3 py-1 border rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
					Prev
				</button>
				<span className="text-sm text-gray-600 dark:text-gray-300">
					Page 1 of 5
				</span>
				<button className="px-3 py-1 border rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
					Next
				</button>
			</div>
			<Link
                        to="/transactions/create"
                        className="fixed bottom-4 right-4 z-10 p-3 bg-cyan-600 text-white rounded-full shadow-lg hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition ease-in-out duration-150"
                        aria-label={"Add new budget"}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                    </Link>			
		</div>

	);
}
