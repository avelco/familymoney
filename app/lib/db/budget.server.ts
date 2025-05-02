import type { BudgetFormData } from "~/interfaces/budgetInterface";
import { db } from "./db.server";

export const getBudget = async (budgetId: number) => {
  return db.budget.findUnique({
    where: { id: Number(budgetId) },
    include: {
      allocations: true,
    },
  });
};

export const getBudgets = async () => {
  return db.budget.findMany({
    include: {
      allocations: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

export const createBudget = async (budget: BudgetFormData) => {
  return db.budget.create({
    data: {
      name: budget.name,
      startDate: new Date(budget.startDate),
      endDate: new Date(budget.endDate),
    },
  });
};

export const updateBudget = async (budgetId: number, budget: BudgetFormData) => {
  return db.budget.update({
    where: { id: Number(budgetId) },
    data: {
      name: budget.name,
      startDate: new Date(budget.startDate),
      endDate: new Date(budget.endDate),
    },
  });
};

export const deleteBudget = async (budgetId: number) => {
  return db.budget.delete({
    where: { id: Number(budgetId) },
  });
};
