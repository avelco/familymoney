<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { PageProps } from './$types';
	import { enhance } from '$app/forms';

	let { form }: PageProps = $props();

	let isSubmitting = $state(false);
</script>

<section class="bg-gray-50 dark:bg-gray-900">
	<div class="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
		<a
			href={'#'}
			class="mb-6 flex items-center text-2xl font-semibold text-gray-900 dark:text-white"
		>
			<Icon icon="tabler:pig-money" class="mr-1 h-8 w-8" />
			FamilyMoney
		</a>
		<div
			class="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0"
		>
			<div class="space-y-4 p-6 sm:p-8 md:space-y-6">
				<h1
					class="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl"
				>
					Ingresa tu correo
				</h1>
				{#if form?.error}
					{#each form.errors as error}
						<p class="text-sm text-red-500 dark:text-red-400">{error.message}</p>
					{/each}
				{/if}
				<form
					class="space-y-4 md:space-y-6"
					method="POST"
					use:enhance={() => {
						isSubmitting = true;

						return async ({ update }) => {
							await update();
							isSubmitting = false;
						};
					}}
				>
					<div>
						<label for="email" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
							>Tu email</label
						>
						<input
							type="text"
							name="email"
							id="email"
							class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
							placeholder="name@domain.com"
							required
						/>
					</div>
					<div class="flex items-center justify-between">
						<!-- <a
							href={"#"}
							class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
							>Forgot password?</a
						> -->
					</div>
					<button
						class="w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white
        hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300
        disabled:cursor-not-allowed disabled:bg-primary-400 disabled:hover:bg-primary-400
        dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800
        dark:disabled:bg-primary-500 dark:disabled:hover:bg-primary-500"
						disabled={isSubmitting}
					>
						{#if isSubmitting}
							Validando...
						{:else}
							Enviar código ingreso
						{/if}
					</button>
					<!-- <p class="text-sm font-light text-gray-500 dark:text-gray-400">
						Don’t have an account yet? <a
							href={"#"}
							class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a
						>
					</p> -->
				</form>
			</div>
		</div>
	</div>
</section>
