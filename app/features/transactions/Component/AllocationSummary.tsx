import { formatMoney } from "~/lib/utils/format";

const AllocationSummary = ({ allocations }: { allocations?: any }) => {
    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-4 my-6">
            {allocations && allocations.map((allocation: any) => (
                <div className={`bg-white ${allocation.amount - allocation.spent < 0
                    && "border-2 border-red-500"} overflow-hidden shadow sm:rounded-lg dark:bg-gray-900`} key={allocation.id}>
                    <div className="px-4 py-2">
                        <dl>
                            <div className="flex items-center justify-between">
                                <dt className="text-xl leading-5 font-medium text-gray-800 truncate dark:text-gray-400">
                                    {allocation.name}
                                </dt>
                            </div>
                            <dd className="text-md leading-6 font-semibold text-blue-500 dark:text-indigo-400">
                            <span className="text-gray-800">Asignado:</span> {formatMoney(allocation.amount)}
                            </dd>
                            <dd className="text-md leading-6 font-semibold text-red-600 dark:text-indigo-400">
                            <span className="text-gray-800">Gastado:</span> {formatMoney(allocation.spent)}
                            </dd>
                            <dd
                                className={`text-md leading-6 font-semibold ${
                                    allocation.amount - allocation.spent < 0
                                        ? "text-red-600"
                                        : "text-green-600"
                                } dark:text-indigo-400`}
                            >
                                <span className="text-gray-800">Restante:</span> {formatMoney(allocation.amount - allocation.spent)}
                            </dd>
                        </dl>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AllocationSummary