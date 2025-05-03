import React, { useState, useEffect } from "react";
import type { Budget, BudgetFormData } from "../../../interfaces/budgetInterface";
import { FaTimes } from "react-icons/fa";
import { useFetcher, useRevalidator } from "react-router";
import { SubmitButton } from "~/components/Buttons";

const defaultFormData: BudgetFormData = {
	name: "",
	startDate: "",
	endDate: "",
};

interface BudgetEditModalProps {
	budget: Budget | null;
	onClose: () => void;
}

const BudgetEditModal: React.FC<BudgetEditModalProps> = ({ budget, onClose }) => {
	let fetcher = useFetcher();
	let errors = fetcher.data?.errors;

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [showFade, setShowFade] = useState(false);
	const [formData, setFormData] = useState<BudgetFormData>(defaultFormData);
  
	// Open modal when budget prop changes to a non-null value
	useEffect(() => {
	  if (budget) {
		setFormData({
		  name: budget.name,
		  startDate: budget.startDate.toISOString().split("T")[0],
		  endDate: budget.endDate.toISOString().split("T")[0],
		});
		setIsModalOpen(true);
	  }
	}, [budget]);
  
	const handleCloseModal = () => {
	  setShowFade(false);
	  setTimeout(() => {
		setIsModalOpen(false);
		onClose();
	  }, 300);
	};
  
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
  
	useEffect(() => {
	  if (fetcher.state !== "idle") {
		handleCloseModal();
	  }
	}, [fetcher.state]);
  
	if (!isModalOpen) return null;

	return (
		<>
			<button
				onClick={handleCloseModal}
				type="button"
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
							Actualizar periodo de presupuesto
						</h2>

						<fetcher.Form method="post">
							<input type="hidden" name="id" value={budget?.id} />
							<input type="hidden" name="_action" value="update" />
							<div className="mb-4">
								<label
									htmlFor="name"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Nombre del presupuesto
								</label>
								<input
									type="text"
									id="name"
									name="name"
									defaultValue={formData.name}
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
										Fecha inicio
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
										Fecha fin
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
									Cancelar
								</button>
								<SubmitButton text="Actualizar periodo de presupuesto" action="update" position="right" />
							</div>
						</fetcher.Form>
					</div>
				</div>
			)}
		</>
	);
};

export default BudgetEditModal;
