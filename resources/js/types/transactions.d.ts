export interface Transaction {
    id: number;
    type: string;
    amount: number;
    wallet_id: number;
    description: string;
    created_at: string;
}
