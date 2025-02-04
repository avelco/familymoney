import { getAccounts, getCategories } from "@/app/actions/masters";
import AddTransactionForm from "@/components/dashboard/AddTransactionForm";
// import Summary from "./components/Summary";
// import TransactionList from "./components/TransactionList";

export default async function Dashboard() {
    const categories = await getCategories();
    const accounts = await getAccounts();

    return (
        <>
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <AddTransactionForm
                        categories={categories}
                        accounts={accounts}
                    />
                    {/* <Summary /> */}
                </div>
                {/* <TransactionList /> */}
            </div>
        </>
    );
}
