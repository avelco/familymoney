<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { PageProps } from './$types';
	import { enhance } from '$app/forms';
	let { data, form }: PageProps = $props();

	let otpValue = $state('');

	// Handler to paste text from the clipboard into the OTP field.
	async function pasteFromClipboard() {
		if (!navigator.clipboard) {
			console.error('Clipboard API not supported in this browser.');
			return;
		}
		try {
			const text = await navigator.clipboard.readText();
			// Keep only digits, and truncate to max length of 6.
			otpValue = text.replace(/\D/g, '').slice(0, 6);
		} catch (err) {
			console.error('Failed to read clipboard contents:', err);
		}
	}
</script>

<section class="bg-gray-50 dark:bg-gray-900">
	<div class="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
		<div class="mb-6 flex items-center text-2xl font-semibold text-gray-900 dark:text-white">
			<Icon icon="tabler:pig-money" class="mr-1 h-8 w-8" />
			FamilyMoney
		</div>
		<div
			class="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800
				sm:max-w-md md:mt-0 xl:p-0"
		>
			<div class="space-y-4 p-6 sm:p-8 md:space-y-6">
				<h1
					class="text-xl font-bold leading-tight tracking-tight
						text-gray-900 dark:text-white md:text-2xl"
				>
					Ingresa tu código de acceso que te enviamos a {data.email}
				</h1>
				{#if form?.error}
					{#each form.errors as error}
						<p class="text-sm text-red-500 dark:text-red-400">{error.message}</p>
					{/each}
				{/if}
				<form class="space-y-4 md:space-y-6" method="POST" use:enhance>
					<div>
						<label for="otp" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
							Código de Acceso (6 dígitos)
						</label>
						<div class="flex items-center space-x-2">
							<input
								type="number"
								name="code"
								id="code"
								bind:value={otpValue}
								maxlength="6"
								class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900
									focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600
									dark:bg-gray-700 dark:text-white dark:placeholder-gray-400
									dark:focus:border-blue-500 dark:focus:ring-blue-500"
								placeholder="Ingresa los 6 dígitos"
								required
							/>
							<!-- Paste button -->
							<button
								type="button"
								class="rounded bg-gray-200 px-3 py-2 text-sm text-gray-600
									hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200
									dark:hover:bg-gray-600"
								onclick={pasteFromClipboard}
								aria-label="Pegar OTP desde portapapeles"
							>
								Pegar
							</button>
						</div>
					</div>
					<button
						class="w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium
							text-white hover:bg-primary-700 focus:outline-none focus:ring-4
							focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700
							dark:focus:ring-primary-800"
					>
						Validar Código
					</button>
				</form>
			</div>
		</div>
	</div>
</section>
