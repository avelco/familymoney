import type { Transaction } from "./transactionInterface";

export interface Budget {
	id: number;
	name: string;
	startDate: Date;
	endDate: Date;
	createdAt: Date;
	updatedAt: Date;
	allocatedAmount: number;
	spentAmount: number;
	allocations: Allocation[];
	totalAllocations?: number;
	totalSpend?: number;
	remainingBudget?: number;
}

export type BudgetFormData = {
	name: string;
	startDate: string;
	endDate: string;
	id?: number;
};

export interface Allocation {
	id: number;
	amount: number;
	name: string;
	budgetId: number;
	userId: number;
	createdAt: Date;
	updatedAt: Date;
	amountRemaining: number;
	transactions: Transaction[];
}

export type AllocationFormData = {
	amount: number;
	budgetId: number;
	userId: number;
	name: string;
	id?: number;
};

export type AllocationUpdateFormData = {
	amount: number;
	name: string;
	id?: number;
};

export interface User {
	id: number;
	name: string;
	email: string;
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
}