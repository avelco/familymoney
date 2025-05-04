import type { TransactionFormData } from "~/interfaces/transactionInterface";
import { db } from "../db/db.server";

export const getTransactionsByBudgetId = async (budgetId: number) => {
  const transactions = await db.transaction.findMany({
    where: { allocation: { budgetId: Number(budgetId) } },
    include: {
      allocation: true,
      wallet: true,
    },
    orderBy: { date: "desc" },
  });

  return { transactions };
};

export async function activeAllocations() {
  // 1. Obtener el último presupuesto según la fecha de inicio
  const lastBudget = await db.budget.findFirst({
    orderBy: {
      startDate: "desc",
    },
    include: {
      allocations: {
        include: {
          transactions: true,
        },
      },
    },
  });

  if (!lastBudget) {
    return [];
  }

  // 2. Mapear allocations y calcular cuánto se ha gastado por cada una
  const allocationsWithExpenses = lastBudget.allocations.map((allocation) => {
    const totalSpent = allocation.transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => acc + t.amount, 0);

    return {
      id: allocation.id,
      name: allocation.name,
      budgetId: allocation.budgetId,
      amount: allocation.amount,
      spent: totalSpent,
    };
  });

  return allocationsWithExpenses;
}

export async function createTransaction(transaction: TransactionFormData) {
  return db.transaction.create({
    data: transaction,
  });
}

