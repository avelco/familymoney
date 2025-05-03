// src/components/AllocationModal.tsx
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import { NumberFormatBase, NumericFormat } from "react-number-format";
import { useActionData, useFetcher, useRevalidator } from "react-router";
import { LoadingButton, SubmitButton } from "~/components/Buttons";
import type { Allocation } from "~/interfaces/budgetInterface";
import { formatMoneyInput } from "~/lib/utils/format";

interface AllocationModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (allocationData: Omit<Allocation, "id" | "spentAmount"> & { id?: string }) => void;
	initialData?: Allocation | null; // Pass budget data for editing
}

const AllocationModal: React.FC<AllocationModalProps> = ({
	isOpen,
	onClose,
	onSubmit,
	initialData,
}) => {
	const [name, setName] = useState("");
	const [allocatedAmount, setAllocatedAmount] = useState<number | string>("");
	let fetcher = useFetcher();
	const { revalidate } = useRevalidator();
	let busy = fetcher.state !== "idle";

	useEffect(() => {
		if (fetcher.state === "idle" && fetcher.data?.success) {
		  toast.success(fetcher.data.success);
		  onClose();
		  fetcher.load(window.location.pathname);
		}
		if (fetcher.state === "idle" && fetcher.data?.errors) {
		  toast.error(Object.values(fetcher.data.errors).join(", "));
		}
	  }, [fetcher.state, fetcher.data, onClose, fetcher]);

	useEffect(() => {
		if (initialData) {
			setName(initialData.name || "");
			setAllocatedAmount(initialData.amount?.toString() || "");
		} else {
			setName("");
			setAllocatedAmount("");
		}
	}, [initialData, isOpen]);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-gray bg-opacity-60 backdrop-blur-sm">
			<div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md m-4 relative">
				<button
					onClick={onClose}
					className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition-colors"
					aria-label="Close modal"
				>
					<IoMdClose className="h-6 w-6" />
				</button>

				<h2 className="text-xl font-semibold mb-5 text-gray-800">
					{initialData ? "Edit Allocation" : "Create New Allocation"}
				</h2>

				<fetcher.Form method="post" className="space-y-4">
					<input type="hidden" name="id" value={initialData?.id} />
					<input type="hidden" name="_action" value={initialData ? "update" : "create"} />
					<div>
						<label
							htmlFor="name"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Budget Name
						</label>
						<input
							type="text"
							id="name"
							name="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
							className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
							placeholder="e.g., Groceries, Entertainment"
						/>
					</div>

					<div>
						<label
							htmlFor="allocatedAmount"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Allocated Amount ($)
						</label>
						<NumericFormat
							thousandSeparator={true}
							decimalScale={2}
							allowNegative={false}
							value={allocatedAmount}
							onValueChange={(values) => setAllocatedAmount(values.value)}
							className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
							placeholder="e.g., 500"
						/>
						<input
							type="hidden"
							name="amount"
							value={allocatedAmount}
						/>
					</div>

					<div className="flex justify-end space-x-3 pt-4">
						<button
							type="button"
							onClick={onClose}
							className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
						>
							Cancel
						</button>
						{busy ? (
							<LoadingButton text="Guardar" action="create" position="right" />
						) : (
							<SubmitButton text="Guardar" action="create" position="right" />
						)}
					</div>
				</fetcher.Form>
			</div>
		</div>
	);
};

export default AllocationModal;
