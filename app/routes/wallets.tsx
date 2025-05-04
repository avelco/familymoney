import { useEffect } from 'react'
import Breadcrumb from '~/components/Breadcrumb'
import { deleteWallet, getAllWalletsWithBalance } from '~/lib/models/wallet.server';
import type { Route } from './+types/wallets';
import { Form, Link, redirect, useLoaderData, useSearchParams } from 'react-router';
import { formatMoney } from '~/lib/utils/format';
import { CiEdit } from 'react-icons/ci';
import { FaCogs } from 'react-icons/fa';
import type { WalletWithBalance } from '~/interfaces/walletInterface';
import toast from 'react-hot-toast';
import WalletDelete from '~/features/wallets/Components/WalletDelete';

export async function action({
    request,
}: Route.ActionArgs) {
    const formData = await request.formData();
    const _action = formData.get("_action");
    if (_action === "delete") {
        const id = Number(formData.get("id"));
        if (!id) return { errors: { id: "ID inválido" } };
        await deleteWallet(id);
        // Redirect with toast param
        return redirect("/wallets?toast=deleted");
    }

}

export async function loader({ params }: Route.LoaderArgs) {
    const wallets = await getAllWalletsWithBalance()
    return wallets;
}

const wallets = () => {
    let data = useLoaderData();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        if (searchParams.get("toast") === "created") {
            toast.success("¡Wallet creado correctamente!");
            // Remove the toast param from the URL without navigation
            const params = new URLSearchParams(searchParams);
            params.delete("toast");
            window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);
        }
    }, [searchParams]);

    const wallets = data;
    return (
        <>
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
                    <div className="flex flex-col">
                        <Breadcrumb crumbs={[
                            { label: "Home", path: "/" },
                            { label: "Wallets", path: "/wallets" },
                        ]} />
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Cuentas / Wallets</h1>
                    </div>
                </div>
                <div className="relative overflow-x-auto shadow-lg sm:rounded-lg bg-white dark:bg-gray-800">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
                            <tr>
                                <th scope="col" className="px-6 py-4 font-medium text-center">
                                    Nombre del wallet
                                </th>
                                <th scope="col" className="px-6 py-4 font-medium text-center">
                                    Saldo actual
                                </th>
                                <th scope="col" className="px-6 py-4 font-medium text-center">
                                    Total depositado
                                </th>
                                <th scope="col" className="px-6 py-4 font-medium text-center">
                                    Total gastado
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {wallets && wallets.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-4 text-center">No hay wallets</td>
                                </tr>
                            )}
                            {wallets && wallets.length > 0 && wallets.map((wallet: WalletWithBalance) => {
                                // Calculate total deposit and expense
                                const totalDeposit = wallet.transactions
                                    ? wallet.transactions.filter(t => t.type === "deposit").reduce((sum, t) => sum + t.amount, 0)
                                    : 0;
                                const totalExpense = wallet.transactions
                                    ? wallet.transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)
                                    : 0;

                                return (
                                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150 ease-in-out" key={wallet.id}>
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            <Link to={`/wallets/${wallet.id}/transactions`}>
                                                {wallet.name}
                                            </Link>
                                        </th>
                                        <td className="px-6 py-4 text-gray-700 dark:text-gray-300 text-center">
                                            {formatMoney(wallet.currentBalance)}
                                        </td>
                                        <td className="px-6 py-4 text-gray-700 dark:text-gray-300 text-center">
                                            {formatMoney(totalDeposit)}
                                        </td>
                                        <td className="px-6 py-4 text-gray-700 dark:text-gray-300 text-center">
                                            {formatMoney(totalExpense)}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center gap-x-1">
                                                <button
                                                    className="inline-flex items-center rounded-md border border-blue-500 px-3 py-1.5 text-sm font-semibold text-blue-700 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:border-blue-400 dark:text-blue-300 dark:hover:bg-blue-900/20 dark:focus:ring-offset-gray-800 transition-colors duration-150 ease-in-out"
                                                    type="button"
                                                >
                                                    <CiEdit className="h-4 w-4" aria-hidden="true" />
                                                </button>
                                                <WalletDelete walletId={wallet.id} />
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <Link
                        to="/wallets/create"
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
                    </Link>
                </div>
            </div>
        </>
    )
}

export default wallets