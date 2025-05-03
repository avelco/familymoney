import { allocationHasTransactions, createAllocation, deleteAllocation } from "~/lib/models/allocation.server";

export async function createAllocationAction(formData: FormData) {
  const name = String(formData.get("name"));
  const amount = String(formData.get("amount")).replace(/,/g, "");
  const budgetId = String(formData.get("budgetId"));
  const userId = String(formData.get("userId"));

  console.log(amount);
  const errors: any = {};

  if (!name || name.length < 3) {
    errors.name = "EL nombre de la asignación debe tener al menos 3 caracteres";
  }

  if (!amount) {
    errors.amount = "El valor de la asignación es requerido";
  }

  if (!budgetId) {
    errors.budgetId = "El id del presupuesto es requerido";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const allocation = await createAllocation({
    name,
    amount: Number(amount),
    budgetId: Number(budgetId),
    userId: Number(userId),
  });

  if (!allocation) {
    return { errors: { allocation: "Error al crear la asignación" } };
  }

  return { data: allocation };
}


export async function deleteAllocationAction(formData: FormData) {
  const allocationId = String(formData.get("allocationId"));
  const errors: any = {};
  const hasTransactions = await allocationHasTransactions(Number(allocationId));
  if (hasTransactions) {
    errors.allocation = "No se puede eliminar la asignación porque tiene transacciones";
    return { errors };
  }
  const allocation = await deleteAllocation(Number(allocationId));

  if (!allocation) {
    return { errors: { allocation: "Error al eliminar la asignación" } };
  }
  
  return { data: allocation };
}