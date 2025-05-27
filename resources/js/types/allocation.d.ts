export interface Allocation {
    id: number;
    name: string;
    amount: number;
    budget_id: number;
    user_id: number;
    transactions_sum_amount?: number;
    created_at: string;
    updated_at: string;
}

export interface AllocationIndexProps {
    allocations: Allocation[];
    budget: Budget;
    totalAllocated: number;
    totalSpent: number;
}

export interface EditAllocationProps {
    budget: Budget;
    allocation: Allocation;
    totalAllocated: number;
}
