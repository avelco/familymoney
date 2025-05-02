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
	budgetId: number;
	userId: number;
	createdAt: Date;
	updatedAt: Date;
	spentAmount: number;
}

export type AllocationFormData = {
	amount: number;
	budgetId: number;
	userId: number;
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

export interface Transaction {
	id: number;
	amount: number;
	date: Date;
	allocationId: number;
	userId: number;
	accountId: number;
	walletId: number;
	createdAt: Date;
	updatedAt: Date;
}
