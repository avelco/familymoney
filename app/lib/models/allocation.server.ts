import type { AllocationFormData, AllocationUpdateFormData } from "~/interfaces/budgetInterface";
import prisma from "../db.server";

export const getAllocationByBudgetId = async (budgetId: number) => {
  const allocations = await prisma.allocation.findMany({
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
  return prisma.allocation.findMany({
    orderBy: { createdAt: "desc" },
  });
};

export const createAllocation = async (allocation: AllocationFormData) => {
  return prisma.allocation.create({
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
  allocation: AllocationUpdateFormData
) => {
  return prisma.allocation.update({
    where: { id: Number(allocationId) },
    data: {
      amount: allocation.amount,
      name: allocation.name,
    },
  });
};

export const deleteAllocation = async (allocationId: number) => {
  return prisma.allocation.delete({
    where: { id: Number(allocationId) },
  });
};

export const allocationHasTransactions = async (allocationId: number) => {
  const count = await prisma.transaction.count({
    where: { allocationId: Number(allocationId) },
  });
  return count > 0;
};