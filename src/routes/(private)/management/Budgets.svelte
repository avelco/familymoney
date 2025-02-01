<script lang="ts">
	import Icon from '@iconify/svelte';
	import { enhance } from '$app/forms';
	import { epochToYMD } from '$lib/utils/date';
	import { formatMoney } from '$lib/utils/money';

	const { budgets, categories } = $props();

	let isProcessing = $state(false);
	let showModal = $state(false);
	let newBudget = $state({ name: '', amount: 0 });
	let editBudget = $state(null);

	function openModal() {
		showModal = true;
	}

	function closeModal() {
		showModal = false;
		newBudget = { name: '', amount: 0 };
		editBudget = null;
	}
</script>

<div class="mx-auto max-w-3xl p-4">
	<div
		class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
	>
		<h1 class="mb-4 text-center text-2xl font-bold text-gray-800 dark:text-white">
			Mis Presupuestos
		</h1>

		<!-- Create Budget Button -->
		{#if categories.length > 0}
			<button
				onclick={openModal}
				class="mb-4 w-full rounded-lg bg-primary-400 px-4 py-2 text-white transition-all hover:bg-primary-600 md:w-auto"
			>
				+ Crear Presupuesto
			</button>
		{/if}

		<!-- Budget List -->
		<div class="space-y-2">
			<div class="overflow-x-auto">
				<table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
					<thead
						class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
					>
						<tr>
							<th scope="col" class="px-4 py-3">Nombre</th>
							<th scope="col" class="px-4 py-3">Categoría</th>
							<th scope="col" class="px-4 py-3">Monto</th>
							<th scope="col" class="px-4 py-3">F. Actualización</th>
							<th scope="col" class="px-4 py-3">
								<span class="sr-only">Actions</span>
							</th>
						</tr>
					</thead>
					<tbody>
						{#if budgets.length > 0}
							{#each budgets as budget}
								<tr class="border-b dark:border-gray-700">
									<th
										scope="row"
										class="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white"
										>{budget.name}</th
									>
									<td class="px-4 py-3">{budget.categories.name}</td>
									<td class="px-4 py-3">{formatMoney(budget.amount)}</td>
									<td class="px-4 py-3">{epochToYMD(Number(budget.updated_at))}</td>
									<td class="px-4 py-3">
										<div
											class="inline-flex items-center rounded-lg p-0.5 text-center text-sm font-medium text-gray-500 hover:text-gray-800 focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
										>
											<Icon icon="tabler:edit" class="cursor-pointer text-yellow-500" />
										</div>
										<form
											method="POST"
											action="?/deleteAccount"
											class="inline"
											use:enhance={() => {
												return async ({ update }) => {
													await update();
												};
											}}
										>
											<input type="hidden" name="id" value={budget.id} />
											<button
												type="submit"
												class="inline-flex items-center rounded-lg p-0.5 text-center text-sm font-medium text-gray-500 hover:text-gray-800 focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
											>
												<Icon icon="tabler:trash" class="cursor-pointer text-red-500" />
											</button>
										</form>
									</td>
								</tr>
							{/each}
						{:else}
							<tr>
								<td class="px-4 py-3 text-center" colspan="4">No hay presupuestos registrados</td>
							</tr>
						{/if}
					</tbody>
				</table>
			</div>
		</div>

		<!-- Modal -->
		{#if showModal}
			<div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
				<div class="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900">
					<h2 class="mb-4 text-xl font-bold text-gray-800 dark:text-white">
						{editBudget ? 'Editar Budget' : 'Crear Presupuesto'}
					</h2>

					<form
						method="POST"
						action="?/registerBudget"
						class="space-y-4"
						use:enhance={() => {
							isProcessing = true;
							return async ({ update }) => {
								await update();
								closeModal();
								isProcessing = false;
							};
						}}
					>
						<!-- Name Input -->
						<div>
							<label
								for="budget-name"
								class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre</label
							>
							<input
								id="budget-name"
								name="name"
								class="w-full rounded-md border bg-gray-100 p-2 dark:bg-gray-800 dark:text-white"
								required
							/>
						</div>

						<!-- Amount Input -->
						<div>
							<label
								for="budget-name"
								class="block text-sm font-medium text-gray-700 dark:text-gray-300">Cantidad</label
							>
							<input
								id="budget-name"
								name="amount"
								type="number"
								class="w-full rounded-md border bg-gray-100 p-2 dark:bg-gray-800 dark:text-white"
								required
							/>
						</div>

						<!-- Amount Input -->
						<div>
							<label
								for="budget-amount"
								class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tipo</label
							>
							<select
								name="category_id"
								class="w-full rounded-md border bg-gray-100 p-2 dark:bg-gray-800 dark:text-white"
							>
								<option value="">Seleccione</option>
								{#each categories as category}
									<option value={category.id}>{category.name}</option>
								{/each}
							</select>
						</div>

						<!-- Action Buttons -->
						<div class="grid grid-cols-2 gap-4">
							<button
								type="button"
								onclick={closeModal}
								class="rounded-lg bg-gray-500 px-4 py-2 text-white transition-all hover:bg-gray-600"
							>
								Cancel
							</button>
							<button
								disabled={isProcessing}
								type="submit"
								class="rounded-lg bg-primary-400 px-4 py-2 text-white transition-all hover:bg-primary-600 disabled:cursor-not-allowed disabled:bg-primary-300 disabled:hover:bg-primary-300"
							>
								{#if isProcessing}
									Guardando...
								{:else}
									Guardar
								{/if}
							</button>
						</div>
					</form>
				</div>
			</div>
		{/if}
	</div>
</div>
