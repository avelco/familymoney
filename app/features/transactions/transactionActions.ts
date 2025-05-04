import { activeAllocations } from "~/lib/models/transaction.server"


export const activeAllocationsAction = async () => {
    return await activeAllocations()
}