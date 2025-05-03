import React from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Form } from "react-router";
import type { Allocation } from "~/interfaces/budgetInterface";

interface AllocationItemProps {
	allocation: Allocation;
	onEdit: (allocation: Allocation) => void;
}

const formatCurrency = (amount: number): string => {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(amount);
};

const AllocationItem: React.FC<AllocationItemProps> = ({ allocation, onEdit }) => {
	const spentPercentage =
		allocation.amount > 0
			? Math.min(
				((allocation.amount - allocation.amountRemaining) /
					allocation.amount) *
				100,
				100
			)
			: 0;

	const hasTransactions = (allocation: Allocation) => {
		return allocation.transactions && allocation.transactions.length === 0;
	};

	let progressBarColor = "bg-blue-500";
	if (spentPercentage > 90) {
		progressBarColor = "bg-red-500";
	} else if (spentPercentage > 70) {
		progressBarColor = "bg-yellow-500";
	}

	return (
		<div className="bg-white rounded-lg shadow p-4 transition hover:shadow-md flex flex-col justify-between">
			<div>
				<div className="flex justify-between items-start mb-2">
					<h3 className="text-lg font-semibold text-gray-800">
						{allocation.name}
					</h3>
					<div className="flex gap-1">
						<button
							onClick={() => onEdit(allocation)}
							className="text-gray-400 hover:text-blue-600 transition-colors p-1 -mt-1"
							aria-label={`Edit budget ${allocation.budgetId}`}
							type="button"
						>
							<CiEdit className="h-5 w-5" />
						</button>
						{hasTransactions(allocation) && (
							<Form method="post">
								<input type="hidden" name="allocationId" value={allocation.id} />
								<button
									type="submit"
									name="_action"
									value="delete"
									className="text-gray-400 hover:text-red-600 transition-colors p-1 -mt-1"
									aria-label={`Delete allocation ${allocation.name}`}
									onClick={e => {
										if (
											!window.confirm(
												`¿Seguro que quieres eliminar la asignación "${allocation.name}"?`
											)
										) {
											e.preventDefault();
										}
									}}
								>
									<MdDelete className="h-5 w-5" />
								</button>
							</Form>
						)}
					</div>
				</div>

				<p className="text-sm text-gray-500 mb-3">
					Asignado:{" "}
					<span className="font-medium text-gray-700">
						{formatCurrency(allocation.amount)}
					</span>
				</p>

				{/* Progress Bar */}
				<div className="mb-1">
					<div className="flex justify-between text-xs text-gray-600 mb-1">
						<span>
							Gastado: {formatCurrency(allocation.amount - allocation.amountRemaining)}
						</span>
						<span>{spentPercentage.toFixed(0)}%</span>
					</div>
					<div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
						<div
							className={`h-2 rounded-full ${progressBarColor} transition-all duration-300 ease-out`}
							style={{ width: `${spentPercentage}%` }}
						></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AllocationItem;
