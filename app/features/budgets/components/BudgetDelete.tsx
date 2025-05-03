import { useEffect, useRef } from 'react';
import { FaTrashAlt } from 'react-icons/fa'
import { useRevalidator } from 'react-router';
import { useFetcher } from 'react-router';

const BudgetDelete = ({ budgetId }: { budgetId: number }) => {
    let fetcher = useFetcher();

    let busy = fetcher.state !== "idle";

    return (
        <fetcher.Form method="post">
            <input type="hidden" name="id" value={budgetId} />
            {!busy ? (
                <button
                    name="_action"
                    value="delete"
                    type='submit'
                    className="ms-2 inline-flex items-center rounded-md border border-red-500 px-3 py-1.5 text-sm font-semibold text-red-700 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:border-red-400 dark:text-red-300 dark:hover:bg-red-900/20 dark:focus:ring-offset-gray-800 transition-colors duration-150 ease-in-out"
                >
                    <FaTrashAlt className="h-4 w-4" aria-hidden="true" />
                </button>) : (
                <button
                    disabled
                    className="ms-2 inline-flex items-center rounded-md border border-red-500 px-3 py-1.5 text-sm font-semibold text-red-700 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:border-red-400 dark:text-red-300 dark:hover:bg-red-900/20 dark:focus:ring-offset-gray-800 transition-colors duration-150 ease-in-out"
                >
                    <svg
                        className="animate-spin h-5 w-5 text-red-700 dark:text-red-300"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                </button>
            )}
        </fetcher.Form>
    )
}

export default BudgetDelete
