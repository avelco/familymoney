import { formatMoney } from "~/lib/utils/format";

const AllocationSummary = ({ allocations }: { allocations?: any }) => {
    console.log(allocations);
    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-4 my-6">
            {allocations && allocations.map((allocation: any) => (
                <div className="bg-white overflow-hidden shadow sm:rounded-lg dark:bg-gray-900">
                    <div className="px-4 py-2">
                        <dl>
                            <div className="flex items-center justify-between">
                                <dt className="text-xs leading-5 font-medium text-gray-500 truncate dark:text-gray-400">
                                    {allocation.name}
                                </dt>
                                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 ml-2">
                                    Presupuesto: {formatMoney(allocation.amount)}
                                </span>
                            </div>
                            <dd className="text-lg leading-6 font-semibold text-red-600 dark:text-indigo-400">
                                Gastado: {formatMoney(allocation.spent)}
                            </dd>
                            <dd className="text-lg leading-6 font-semibold text-green-600 dark:text-indigo-400">
                                Restante: {formatMoney(allocation.amount - allocation.spent)}
                            </dd>
                        </dl>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AllocationSummary