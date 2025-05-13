import { activeAllocations, deleteTransaction } from "~/lib/models/transaction.server"


export const activeAllocationsAction = async () => {
    return await activeAllocations()
}

export const deleteTransactionAction = async (transactionId: number) => {
    return await deleteTransaction(transactionId)
}