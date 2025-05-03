import type { AllocationFormData } from "~/interfaces/budgetInterface";
import { db } from "../db/db.server";

export const getAllocationByBudgetId = async (budgetId: number) => {
  const allocations = await db.allocation.findMany({
    where: { budgetId: Number(budgetId) },
    orderBy: { createdAt: "desc" },
    include: {
      transactions: {
        select: { amount: true }
      }
    }
  });

  // Calculate remaining amount for each allocation
  return allocations.map(allocation => {
    const spent = allocation.transactions.reduce(
      (sum, tx) => sum + tx.amount,
      0
    );
    return {
      ...allocation,
      amountRemaining: allocation.amount - spent
    };
  });
};

export const getAllocations = async () => {
  return db.allocation.findMany({
    orderBy: { createdAt: "desc" },
  });
};

export const createAllocation = async (allocation: AllocationFormData) => {
  return db.allocation.create({
    data: {
      name: allocation.name,
      amount: allocation.amount,
      budgetId: allocation.budgetId,
      userId: allocation.userId,
    },
  });
};

export const updateAllocation = async (
  allocationId: number,
  allocation: AllocationFormData
) => {
  return db.allocation.update({
    where: { id: Number(allocationId) },
    data: {
      amount: allocation.amount,
      budgetId: allocation.budgetId,
      userId: allocation.userId,
    },
  });
};

export const deleteAllocation = async (allocationId: number) => {
  return db.allocation.delete({
    where: { id: Number(allocationId) },
  });
};

export const allocationHasTransactions = async (allocationId: number) => {
  const count = await db.transaction.count({
    where: { allocationId: Number(allocationId) },
  });
  return count > 0;
};