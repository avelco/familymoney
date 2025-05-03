import { data, redirect } from "react-router";
import { createBudget, deleteBudget, updateBudget } from "~/lib/models/budget.server";


export async function createBudgetAction(formData: FormData) {
    const name = String(formData.get("name"));
    const startDate = String(formData.get("startDate"));
    const endDate = String(formData.get("endDate"));

	const errors: any = {}

	if(!name || name.length < 3) {
		errors.name = "EL nombre del presupuesto debe tener al menos 3 caracteres";
	}

	if(!startDate) {
		errors.startDate = "La fecha de inicio es requerida";
	}

	if(!endDate) {
		errors.endDate = "La fecha de fin es requerida";
	}

	if(startDate > endDate) {
		errors.startDate = "La fecha de inicio debe ser anterior a la fecha de fin";
	}

	if(Object.keys(errors).length > 0) {
		return data({ errors });
	}

	const budget = await createBudget({ name, startDate, endDate });

	if(!budget) {
		return data({ errors: { budget: "Error al crear el presupuesto" } });
	}
	return budget;

}


export async function updateBudgetAction(formData: FormData) {
    const id = String(formData.get("id"));
    const name = String(formData.get("name"));
    const startDate = String(formData.get("startDate"));
    const endDate = String(formData.get("endDate"));

    const budget = await updateBudget(Number(id), { name, startDate, endDate });

    if(!budget) {
        return data({ errors: { budget: "Error al actualizar el presupuesto" } });
    }
    return data({ success: true });
}
export async function deleteBudgetAction(formData: FormData) {
    const id = String(formData.get("id"));

    const budget = await deleteBudget(Number(id));

    if(!budget) {
        return data({ errors: { budget: "Error al eliminar el presupuesto" } });
    }
    return data({ success: true });
}