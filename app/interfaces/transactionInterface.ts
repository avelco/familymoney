export interface Transaction {
  id: number;
  amount: number;
  type: "expense" | "deposit";
  date: Date;
  allocationId?: number | null;
  userId: number;
  accountId?: number | null;
  walletId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface TransactionFormData {
    id?: number;
    amount: number;
    type: "expense" | "deposit";
    date: Date;
    allocationId?: number | null;
    userId: number;
    accountId?: number | null;
    walletId: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface AllocationSumary {
    id: number;
    name: string;
    totalAmount: number;
}
