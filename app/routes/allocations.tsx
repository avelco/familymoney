// src/components/Allocation.tsx
import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import Breadcrumb from "~/components/Breadcrumb";
import AllocationItem from "~/features/allocation/components/AllocationItem";
import AllocationModal from "~/features/allocation/components/AllocationModal";
import type { Allocation } from "~/interfaces/budgetInterface";
import type { Route } from "../+types/root";
import { getAllocationByBudgetId } from "~/lib/models/allocation.server";
import { redirect, useActionData, useLoaderData, useNavigation, useParams, useRevalidator } from "react-router";
import { getSession } from "~/sessions.server";
import { createAllocationAction, deleteAllocationAction, updateAllocationAction } from "~/features/allocation/allocationActions";
import { existBudget } from "~/lib/models/budget.server";
import toast from "react-hot-toast";

export async function loader({ params }: Route.LoaderArgs) {
	const budgetId = Number(params.budgetId);
	if (!budgetId) {
		return [];
	}

	const existBudgetVal = await existBudget(budgetId);
	if (!existBudgetVal) {
		return redirect("/budgets");
	}
	const allocations = await getAllocationByBudgetId(budgetId);
	return allocations;
}


export async function action({
	request,
	params
}: Route.ActionArgs) {
	const session = await getSession(request.headers.get("Cookie"));
	const budgetId = Number(params.budgetId);
	const formData = await request.formData();
	const actionType = formData.get("_action");
	formData.set("budgetId", String(budgetId));
	formData.set("userId", String(session.get("userId")));

	if (actionType === "create") {
		const result = await createAllocationAction(formData);
		if (result.errors) {
			return result;
		}
		return { success: "Asignación creada correctamente" };
	} else if (actionType === "delete") {
		const result = await deleteAllocationAction(formData);
		if (result?.errors) {
			return result;
		}
		return { success: "Asignación eliminada correctamente" };
	} else if (actionType === "update") {
		const result = await updateAllocationAction(formData);
		if (result?.errors) {
			return result;
		}
		return { success: "Asignación actualizada correctamente" };
	} else {
		return { errors: { _action: "Acción no reconocida" } };
	}
}

const Allocation: React.FC = () => {
	const actionData = useActionData();
	const data = useLoaderData() as Allocation[];
	const navigation = useNavigation();
	const { revalidate } = useRevalidator();

	const [isLoading, setIsLoading] = useState(true);
	const [allocations, setAllocations] = useState<Allocation[]>([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingAllocation, setEditingAllocation] = useState<Allocation | null>(null);

	// Simulate fetching data
	// useEffect(() => {
	// 	setAllocations(data);
	// 	setIsLoading(false);
	// }, [navigation.state]);

	useEffect(() => {
		setAllocations(data);
		setIsLoading(false);
	  }, [data]);

	useEffect(() => {
		console.log(actionData);
		if (actionData?.success) {
			toast.success(actionData.success);
		}
		if (actionData?.errors) {
			toast.error("Ocurrió un error:" + actionData.errors);
		}
	}, [actionData]);

	const handleOpenCreateModal = () => {
		setEditingAllocation(null); // Ensure we are in create mode
		setIsModalOpen(true);
	};

	const handleOpenEditModal = (budget: Allocation) => {
		setEditingAllocation(budget);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setEditingAllocation(null); // Clear editing state on close
	};

	return (
		<div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
			{/* Header */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
				<div className="flex flex-col">
					<Breadcrumb crumbs={[
						{ label: "Home", path: "/" },
						{ label: "Presupuestos", path: "/budgets" },
						{ label: "Asignaciones", path: undefined },
					]} />
					<h1 className="text-2xl md:text-3xl font-bold text-gray-800">Asignaciones</h1>
				</div>
			</div>

			{isLoading ? (
				<div className="text-center text-gray-500 py-10 bg-gray-50 rounded-lg">
					<p>Cargando asignaciones...</p>
				</div>
			) : allocations.length === 0 ? (
				<div className="text-center text-gray-500 py-10 bg-gray-50 rounded-lg">
					<p>No asignaciones creadas.</p>
					<button
						onClick={handleOpenCreateModal}
						className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
					>
						Crear tu primer asignación
					</button>
				</div>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
					{allocations.map((allocation) => (
						<AllocationItem
							key={allocation.id}
							allocation={allocation}
							onEdit={handleOpenEditModal}
						/>
					))}
				</div>
			)}

			{/* Allocation Modal */}
			<AllocationModal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				onSubmit={() => {
					/* your submit handler */
				}}
				initialData={editingAllocation}
			/>

			{/* Mobile FAB */}
			<button
				onClick={handleOpenCreateModal}
				className="fixed bottom-4 right-4 p-4 bg-blue-600 text-white rounded-full shadow-lg"
				aria-label="Nueva asignación"
			>
				<FaPlus />
			</button>
		</div>
	);
};

export default Allocation;