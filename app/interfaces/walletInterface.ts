import type { Transaction } from "./transactionInterface";

export interface Wallet {
    id: number;
    name: string;
    balance: number; // initial balance
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface WalletWithBalance extends Wallet {
    currentBalance: number;
    transactions: Transaction[];
  }
  
  export interface CreateWalletInput {
    name: string;
    balance: number;
  }
  
  export interface UpdateWalletInput {
    id: number;
    name?: string;
    balance?: number;
  }