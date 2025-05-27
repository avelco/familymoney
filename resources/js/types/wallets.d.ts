import { Transaction } from "./transactions";

export interface Wallet {
    id: number;
    name: string;
    currency: string;
    deposit_total: number;
    expense_total: number;
    current_balance: number;
}

export interface WalletIndexProps {
    wallets: Wallet[];
    totalBalance: number;
    expensesThisMonth: number;
    depositsThisMonth: number;
    lastTransaction: Transaction;
}

