import { data } from "react-router";
import { createAllocation } from "~/lib/models/allocation.server";

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
    return data({ errors });
  }

  const allocation = await createAllocation({
    name,
    amount: Number(amount),
    budgetId: Number(budgetId),
    userId: Number(userId),
  });

  if (!allocation) {
    return data({ errors: { allocation: "Error al crear la asignación" } });
  }
  return allocation;
}
