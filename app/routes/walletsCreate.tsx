import React, { useState } from "react";
import { FaWallet } from "react-icons/fa";
import type { Route } from "../+types/root";
import { createWallet } from "~/lib/models/wallet.server";
import { Form, redirect, useNavigation } from "react-router";
import { LoadingButton, SubmitButton } from "~/components/Buttons";
import Breadcrumb from "~/components/Breadcrumb";

export async function action({
	request,
}: Route.ActionArgs) {
	const formData = await request.formData();
	const name = String(formData.get("name"));
	const balance = String(formData.get("balance"));

	const errors: any = {}

	if (!name || name.length < 3) {
		errors.name = "El nombre debe tener al menos 3 caracteres";
	}

	if (!balance || isNaN(Number(balance))) {
		errors.balance = "El saldo debe ser un número";
	}

	if (Object.keys(errors).length > 0) {
		return { errors }
	}

	const wallet = await createWallet({ name, balance: Number(balance) });

	if (!wallet) {
		return { errors: { wallet: "Error al crear el wallet" } }
	}

	return redirect("/wallets?toast=created");
}


const walletsCreate = () => {
	const navigation = useNavigation();

	return (
		<>
			<div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
					<div className="flex flex-col">
						<Breadcrumb crumbs={[
							{ label: "Home", path: "/" },
							{ label: "Wallets", path: "/wallets" },
							{ label: "Create", path: "/wallets/create" },
						]} />
						<h1 className="text-2xl md:text-3xl font-bold text-gray-800">Cuentas / Wallets</h1>
					</div>
				</div>
			</div>
			<div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 mt-6">
				<div className="flex items-center mb-4">
					<FaWallet className="text-blue-600 h-6 w-6 mr-2" />
					<h2 className="text-lg font-semibold text-gray-800">Crear nueva cuenta</h2>
				</div>
				<Form method="post" className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Nombre de la cuenta
						</label>
						<input
							type="text"
							className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
							name="name"
							placeholder="Ej: Efectivo, Banco, Ahorros"
							required
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Saldo inicial
						</label>
						<input
							type="number"
							className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
							name="balance"
							placeholder="Ej: 1000"
							min="0"
							step="0.01"
							required
						/>
					</div>
					{navigation.formAction === "/wallets/create" ? (
						<LoadingButton
							position="center"
							text="Creando cuenta..."
						/>
					) : (
						<SubmitButton
							position="center"
							text="Crear cuenta"
						/>
					)}
				</Form>
			</div>
		</>
	);
};

export default walletsCreate;
