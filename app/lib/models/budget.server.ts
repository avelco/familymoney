import type { BudgetFormData } from "~/interfaces/budgetInterface";
import prisma from "../db.server";

export const getCurrentBudget = async () => {
    const budget = await prisma.budget.findFirst({
        where: {
            startDate: {
                lte: new Date(),
            },
            endDate: {
                gte: new Date(),
            },
        },
    });
    return budget;
};

export const getBudget = async (budgetId: number) => {
  return prisma.budget.findUnique({
    where: { id: Number(budgetId) },
    include: {
      allocations: true,
    },
  });
};

export const existBudget = async (budgetId: number) => {
  return prisma.budget.findUnique({
    where: { id: Number(budgetId) },
  });
};

export const getBudgets = async () => {
  const budgets = await prisma.budget.findMany({
    include: {
      allocations: {
        include: {
          transactions: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return budgets.map((budget) => {
    // Sum of allocations
    const totalAllocations = budget.allocations.reduce(
      (sum, allocation) => sum + allocation.amount,
      0
    );

    // Total spend (sum of all transactions' amounts in all allocations)
    const totalSpend = budget.allocations.reduce((sum, allocation) => {
      const allocationSpend = allocation.transactions.reduce(
        (tSum, transaction) => tSum + transaction.amount,
        0
      );
      return sum + allocationSpend;
    }, 0);

    // Remaining budget
    const remainingBudget = totalAllocations - totalSpend;

    return {
      ...budget,
      totalAllocations,
      totalSpend,
      remainingBudget,
    };
  });
};

export const createBudget = async (budget: BudgetFormData) => {
  return prisma.budget.create({
    data: {
      name: budget.name,
      startDate: new Date(budget.startDate),
      endDate: new Date(budget.endDate),
    },
  });
};

export const updateBudget = async (
  budgetId: number,
  budget: BudgetFormData
) => {
  return prisma.budget.update({
    where: { id: Number(budgetId) },
    data: {
      name: budget.name,
      startDate: new Date(budget.startDate),
      endDate: new Date(budget.endDate),
    },
  });
};

export const deleteBudget = async (budgetId: number) => {
  return prisma.budget.delete({
    where: { id: Number(budgetId) },
  });
};
