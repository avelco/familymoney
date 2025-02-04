import CategoryManager from "@/components/masters/CategoryManager";
import BudgetManager from "@/components/masters/BudgetManager";
import AccountManager from "@/components/masters/AccountManager";
import { getAccounts, getCategories } from "@/app/actions/masters";

export default async function MasterData() {
    const categories = await getCategories();
    // const budgets = await getBudgets();
    const accounts = await getAccounts();

    return (
        <>
            <h1 className="text-3xl font-bold my-6">Master Data</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CategoryManager categories={categories} />
                <AccountManager accounts={accounts} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* <BudgetManager budgets={budgets} categories={categories} /> */}
            </div>
        </>
    );
}
