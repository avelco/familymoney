// src/components/Allocation.tsx
import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import Breadcrumb from "~/components/Breadcrumb";
import AllocationItem from "~/features/allocation/components/AllocationItem";
import AllocationModal from "~/features/allocation/components/AllocationModal";
import type { Allocation } from "~/interfaces/budgetInterface";
import type { Route } from "../+types/root";
import { getAllocationByBudgetId } from "~/lib/models/allocation.server";
import { redirect, useActionData, useLoaderData, useNavigation, useParams } from "react-router";
import { getSession } from "~/sessions.server";
import { createAllocationAction, deleteAllocationAction } from "~/features/allocation/allocationActions";
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
	console.log(formData);
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
	}
}

const Allocation: React.FC = () => {
	const actionData = useActionData();
	const data = useLoaderData() as Allocation[];
	const navigation = useNavigation();

	const [isLoading, setIsLoading] = useState(true);
	const [allocations, setAllocations] = useState<Allocation[]>([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingAllocation, setEditingAllocationeditingAllocation] = useState<Allocation | null>(null);

	// Simulate fetching data
	useEffect(() => {
		setAllocations(data);
		setIsLoading(false);
	}, [navigation.state]);

	useEffect(() => {
		if (actionData?.success) {
			toast.success(actionData.success);
		}
		if (actionData?.errors) {
			toast.error("Ocurrió un error");
		}
	}, [actionData]);

	const handleOpenCreateModal = () => {
		setEditingAllocationeditingAllocation(null); // Ensure we are in create mode
		setIsModalOpen(true);
	};

	const handleOpenEditModal = (budget: Allocation) => {
		setEditingAllocationeditingAllocation(budget);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setEditingAllocationeditingAllocation(null); // Clear editing state on close
	};

	const handleSubmitAllocation = (
		budgetData: Omit<Allocation, "id" | "spentAmount"> & { id?: string }
	) => {
		if (budgetData.id) {
			// --- Editing Existing Budget ---
			// In a real app, send PUT/PATCH request to API
			setAllocations((prevAllocations) =>
				prevAllocations.map((b) =>
					b.id === Number(budgetData.id) ? { ...b, amount: budgetData.amount } : b
				)
			);
			console.log("Updating budget:", budgetData);
		} else {
			// --- Creating New Budget ---
			// In a real app, send POST request to API and get back the new ID
			const newBudget: Allocation = {
				...budgetData,
				id: Date.now(), // Generate simple unique numeric ID for demo
				amountRemaining: 0, // New allocations start with 0 spent
			};
			setAllocations((prevAllocations) => [...prevAllocations, newBudget]);
			console.log("Creating new budget:", newBudget);
		}
		handleCloseModal(); // Close modal after submission
	};
	console.log(navigation.state);
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
				className="fixed bottom-4 right-4 p-4 bg-blue-600 text-white rounded-full shadow-lg sm:hidden"
				aria-label="Nueva asignación"
			>
				<FaPlus />
			</button>
		</div>
	);
};

export default Allocation;