import type { AllocationFormData } from "~/interfaces/budgetInterface";
import { db } from "./db.server";

export const getAllocation = async (allocationId: number) => {
  return db.allocation.findUnique({
    where: { id: Number(allocationId) },
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
