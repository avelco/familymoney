import { CiEdit } from "react-icons/ci";
import { FaCogs, FaPlus } from "react-icons/fa";
import type { Route } from "./+types/budgets";
import { getBudgets } from "~/lib/models/budget.server";
import { Link, useLoaderData, useNavigation } from "react-router";
import { createBudgetAction, deleteBudgetAction, updateBudgetAction } from "~/features/budgets/budgetActions";
import BudgetDelete from "~/features/budgets/components/BudgetDelete";
import type { Budget } from "~/interfaces/budgetInterface";
import { useState } from "react";
import BudgetCreateModal from "~/features/budgets/components/BudgetCreateModal";
import BudgetEditModal from "~/features/budgets/components/BudgetEditModal";
import Breadcrumb from "~/components/Breadcrumb";
import { formatMoney } from "~/lib/utils/format";

export async function loader({ params }: Route.LoaderArgs) {
	const budget = await getBudgets()
	return budget;
}

export async function action({
	request,
}: Route.ActionArgs) {
	const formData = await request.formData();
	const actionType = formData.get("_action");

	switch (actionType) {
		case "create":
			return createBudgetAction(formData);
		case "update":
			return updateBudgetAction(formData);
		case "delete":
			return deleteBudgetAction(formData);
	}
}

export default function Budget() {
	const navigation = useNavigation();
	const [editingBudget, setEditingBudget] = useState<Budget | null>(null);
	let data = useLoaderData();

	if (navigation.state === "loading") {
		return <div>Loading...</div>;
	}

	const handleEdit = (budget: Budget) => {
		setEditingBudget(budget);
	};

	const budgets = data;
	console.log(budgets);
	return (
		<>
		<div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
			{/* Header */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
				<div className="flex flex-col">
					<Breadcrumb crumbs={[
						{ label: "Home", path: "/" },
						{ label: "Presupuestos", path: "/budgets" },
					]} />
					<h1 className="text-2xl md:text-3xl font-bold text-gray-800">Presupuestos</h1>
				</div>
			</div>
				<div className="relative overflow-x-auto shadow-lg sm:rounded-lg bg-white dark:bg-gray-800">
					<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 divide-y divide-gray-200 dark:divide-gray-700">
						<thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
							<tr>
								<th scope="col" className="px-6 py-4 font-medium text-center">
									Nombre del presupuesto
								</th>
								<th scope="col" className="px-6 py-4 font-medium text-center">
									Periodo
								</th>
								<th scope="col" className="px-6 py-4 font-medium text-center">
									Total presupuesto
								</th>
								<th scope="col" className="px-6 py-4 font-medium text-center">
									Total gastado
								</th>
								<th scope="col" className="px-6 py-4 font-medium text-center">
									Restante
								</th>
								<th scope="col" className="px-6 py-4">
									<span className="sr-only">Edit</span>
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200 dark:divide-gray-700">
							{budgets && budgets.length === 0 && (
								<tr>
									<td colSpan={6} className="px-6 py-4 text-center">No hay presupuestos</td>
								</tr>
							)}
							{budgets && budgets.length > 0 && budgets.map((budget: Budget) => (
								<tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150 ease-in-out" key={budget.id}>
									<th
										scope="row"
										className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
									>
										<Link to={`/budgets/${budget.id}/allocations`}>
											{budget.name}
										</Link>
									</th>
									<td className="px-6 py-4 text-gray-700 dark:text-gray-300 text-center">
										{budget.startDate.toISOString().split("T")[0]} - {budget.endDate.toISOString().split("T")[0]}
									</td>
									<td className="px-6 py-4 text-gray-700 dark:text-gray-300 text-center">
										{formatMoney(Number(budget.totalAllocations || 0))}
									</td>
									<td className="px-6 py-4 text-gray-700 dark:text-gray-300 text-center">
										{formatMoney(Number(budget.totalSpend || 0))}
									</td>
									<td className="px-6 py-4 text-gray-700 dark:text-gray-300 text-center">
										{formatMoney(Number(budget.remainingBudget || 0))}
									</td>
									<td className="px-6 py-4 text-right">
										<div className="flex items-center gap-x-1">
											<button
												className="inline-flex items-center rounded-md border border-blue-500 px-3 py-1.5 text-sm font-semibold text-blue-700 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:border-blue-400 dark:text-blue-300 dark:hover:bg-blue-900/20 dark:focus:ring-offset-gray-800 transition-colors duration-150 ease-in-out"
												type="button"
												onClick={() => handleEdit(budget)}
											>
												<CiEdit className="h-4 w-4" aria-hidden="true" />
											</button>
											<BudgetDelete budgetId={budget.id} />
											<Link
												to={`/budgets/${budget.id}/allocations`}
												className="ms-2 inline-flex items-center rounded-md border border-blue-500 px-3 py-1.5 text-sm font-semibold text-blue-700 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:border-blue-400 dark:text-blue-300 dark:hover:bg-blue-900/20 dark:focus:ring-offset-gray-800 transition-colors duration-150 ease-in-out"
											>
												<FaCogs className="h-4 w-4" aria-hidden="true" />
											</Link>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<BudgetCreateModal />
					<BudgetEditModal budget={editingBudget} onClose={() => setEditingBudget(null)} />
				</div>
			</div>
		</>
	);
};