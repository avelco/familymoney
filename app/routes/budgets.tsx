import { CiEdit } from "react-icons/ci";
import { FaCogs, FaTrashAlt } from "react-icons/fa";
import BudgetModal from "~/features/budgets/components/BudgetModal";
import type { Route } from "./+types/budgets";
import { getBudgets } from "~/lib/db/budget.server";
import { useNavigation } from "react-router";

export async function loader({ params }: Route.LoaderArgs) {
	const budget = await getBudgets()
	return budget;
  }
  
  export default function Budget({
	loaderData,
  }: Route.ComponentProps) {
	const navigation = useNavigation();

	if (navigation.state === "loading") {
	  return <div>Loading...</div>;
	}

	console.log(loaderData);
	return (
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
					<tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150 ease-in-out">
						<th
							scope="row"
							className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
						>
							Presupuesto Marzo 2025
						</th>
						<td className="px-6 py-4 text-gray-700 dark:text-gray-300 text-center">
							01/03/2025 - 31/03/2025
						</td>
						<td className="px-6 py-4 text-gray-700 dark:text-gray-300 text-center">
							$6.000.000
						</td>
						<td className="px-6 py-4 text-gray-700 dark:text-gray-300 text-center">
							$6.000.000
						</td>
						<td className="px-6 py-4 text-gray-700 dark:text-gray-300 text-center">
							$6.000.000
						</td>
						<td className="px-6 py-4 text-right">
							<button className="inline-flex items-center rounded-md bg-cyan-100 px-3 py-1.5 text-sm font-semibold text-cyan-700 hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 dark:bg-cyan-900/50 dark:text-cyan-300 dark:hover:bg-cyan-900 dark:focus:ring-offset-gray-800 transition-colors duration-150 ease-in-out">
								<CiEdit className="h-4 w-4" aria-hidden="true" />
							</button>
							<button className="ms-2 inline-flex items-center rounded-md bg-red-100 px-3 py-1.5 text-sm font-semibold text-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:bg-red-900/50 dark:text-red-300 dark:hover:bg-red-900 dark:focus:ring-offset-gray-800 transition-colors duration-150 ease-in-out">
								<FaTrashAlt className="h-4 w-4" aria-hidden="true" />
							</button>
							<button className="ms-2 inline-flex items-center rounded-md bg-cyan-100 px-3 py-1.5 text-sm font-semibold text-cyan-700 hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 dark:bg-cyan-900/50 dark:text-cyan-300 dark:hover:bg-cyan-900 dark:focus:ring-offset-gray-800 transition-colors duration-150 ease-in-out">
								<FaCogs className="h-4 w-4" aria-hidden="true" />
							</button>
						</td>
					</tr>
				</tbody>
			</table>
			<BudgetModal initialData={null}/>
		</div>
	);
};