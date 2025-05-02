import React, { useState, useEffect } from "react";
import type { Budget, BudgetFormData } from "../../../interfaces/budgetInterface";
import { FaTimes } from "react-icons/fa";
import { data, Form, useFetcher } from "react-router";
import type { Route } from ".react-router/types/app/+types/root";

const defaultFormData: BudgetFormData = {
	name: "",
	startDate: "",
	endDate: "",
};

interface BudgetModalProps {
	initialData?: Budget | null;
}

export async function action({
    request,
}: Route.ActionArgs) {

    const formData = await request.formData();
    const name = String(formData.get("name"));
    const startDate = String(formData.get("startDate"));
    const endDate = String(formData.get("endDate"));

	const errors: any = {}

	if(!name || name.length < 3) {
		errors.name = "EL nombre del presupuesto debe tener al menos 3 caracteres";
	}

	if(!startDate) {
		errors.startDate = "La fecha de inicio es requerida";
	}

	if(!endDate) {
		errors.endDate = "La fecha de fin es requerida";
	}

	if(startDate > endDate) {
		errors.startDate = "La fecha de inicio debe ser anterior a la fecha de fin";
	}

	if(Object.keys(errors).length > 0) {
		return data({ errors });
	}

	return data({ errors });

}

const BudgetModal: React.FC<BudgetModalProps> = ({ initialData }) => {
	let fetcher = useFetcher();
	let errors = fetcher.data?.errors;

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [showFade, setShowFade] = useState(false);

	const [formData, setFormData] = useState<BudgetFormData>(
		initialData
			? {
				name: initialData.name,
				startDate: initialData.startDate.toISOString().split("T")[0],
				endDate: initialData.endDate.toISOString().split("T")[0],
			}
			: defaultFormData
	);

	useEffect(() => {
		if (initialData) {
			setFormData({
				name: initialData.name,
				startDate: initialData.startDate.toISOString().split("T")[0],
				endDate: initialData.endDate.toISOString().split("T")[0],
			});
		} else {
			setFormData(defaultFormData);
		}
	}, [initialData]);

	const handleOpenModal = () => {
		if (!initialData) {
			setFormData(defaultFormData);
		}
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setShowFade(false);
		setTimeout(() => setIsModalOpen(false), 300); // Wait for fade-out
	};

	// Trigger fade-in when modal opens
	useEffect(() => {
		if (isModalOpen) {
			setTimeout(() => setShowFade(true), 10);
		} else {
			setShowFade(false);
		}
	}, [isModalOpen]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value, type } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: type === "number" ? parseFloat(value) || 0 : value,
		}));
	};

	return (
		<>
			<button
				onClick={handleOpenModal}
				type="button"
				className="fixed bottom-4 right-4 z-10 p-3 bg-cyan-600 text-white rounded-full shadow-lg hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition ease-in-out duration-150"
				aria-label={initialData ? "Edit budget" : "Add new budget"}
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
			</button>

			{isModalOpen && (
				<div
					className={`fixed inset-0 z-50 flex items-center justify-center bg-gray bg-opacity-60 backdrop-blur-sm transition-opacity duration-300 ${showFade ? "opacity-100" : "opacity-0"
						}`}
				>
					<div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md m-4 relative">
						<button
							onClick={handleCloseModal}
							className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition-colors"
							aria-label="Close modal"
						>
							<FaTimes className="h-5 w-5" />
						</button>

						<h2 className="text-xl font-semibold mb-5 text-gray-800">
							{initialData ? "Edit Budget Period" : "Create New Budget Period"}
						</h2>

						<fetcher.Form method="post">
							<div className="mb-4">
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
									value={formData.name}
									onChange={handleChange}
									required
									className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
								/>
								{errors?.name ? <em className="text-red-500">{errors.name}</em> : null}
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
								<div>
									<label
										htmlFor="startDate"
										className="block text-sm font-medium text-gray-700 mb-1"
									>
										Start Date
									</label>
									<input
										type="date"
										id="startDate"
										name="startDate"
										value={formData.startDate}
										onChange={handleChange}
										required
										className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
									/>
									{errors?.startDate ? <em className="text-red-500">{errors.startDate}</em> : null}
								</div>
								<div>
									<label
										htmlFor="endDate"
										className="block text-sm font-medium text-gray-700 mb-1"
									>
										End Date
									</label>
									<input
										type="date"
										id="endDate"
										name="endDate"
										value={formData.endDate}
										onChange={handleChange}
										required
										className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
									/>
									{errors?.endDate ? <em className="text-red-500">{errors.endDate}</em> : null}
								</div>
							</div>
							<div className="flex justify-end">
								<button
									type="button"
									onClick={handleCloseModal}
									className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
								>
									Cancel
								</button>
								<button
									type="submit"
									className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 rounded-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
								>
									{initialData ? "Update Budget" : "Create Budget"}
								</button>
							</div>
						</fetcher.Form>
					</div>
				</div>
			)}
		</>
	);
};

export default BudgetModal;
