<script lang="ts">
	import { fade } from 'svelte/transition';
    import Icon from "@iconify/svelte";

	let email: string = '';
	let password: string = '';
	let errors: { email?: string; password?: string } = {};
	let isSubmitting: boolean = false;

	const validateForm = (): boolean => {
		errors = {};
		let isValid = true;

		// Email validation
		if (!email) {
			errors.email = 'Email es requerido';
			isValid = false;
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			errors.email = 'Por favor, ingresa un correo electrónico válido';
			isValid = false;
		}

		// Password validation
		if (!password) {
			errors.password = 'Password es requerido';
			isValid = false;
		} else if (password.length < 6) {
			errors.password = 'Password debe tener al menos 6 caracteres';
			isValid = false;
		}

		return isValid;
	};

	const handleSubmit = async () => {
		if (!validateForm()) return;

		isSubmitting = true;
		try {
			// Add your login logic here
			console.log('Login attempt with:', { email, password });
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000));
		} catch (error) {
			console.error('Login failed:', error);
		} finally {
			isSubmitting = false;
		}
	};
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-50">
	<div class="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg" transition:fade>
        <div class="text-center">
            <div class="flex items-center justify-center space-x-2 mb-2">
              <Icon
                icon="noto:money-bag"
                class="h-12 w-12 text-emerald-600"
                width="48"
                height="48"
              />
              <h2 class="text-4xl font-bold text-emerald-600">Family Money</h2>
            </div>
            <p class="text-gray-600">Velasco López family budget control</p>
          </div>

		<form class="mt-8 space-y-6" on:submit|preventDefault={handleSubmit}>
			<div class="space-y-4">
				<div>
					<label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
					<input
						id="email"
						type="email"
						bind:value={email}
						class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
						placeholder="Ingresa tu correo electrónico"
					/>
					{#if errors.email}
						<p class="mt-1 text-sm text-red-600" transition:fade>
							{errors.email}
						</p>
					{/if}
				</div>

				<div>
					<label for="password" class="block text-sm font-medium text-gray-700">Password</label>
					<input
						id="password"
						type="password"
						bind:value={password}
						class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
						placeholder="Ingresa tu contraseña"
					/>
					{#if errors.password}
						<p class="mt-1 text-sm text-red-600" transition:fade>
							{errors.password}
						</p>
					{/if}
				</div>
			</div>

			<div class="flex items-center justify-between">

				<div class="text-sm">
					<a href="/forgot-password" class="text-emerald-600 hover:text-emerald-500"
						>¿Olvidaste tu contraseña?</a
					>
				</div>
			</div>

			<button
				type="submit"
				disabled={isSubmitting}
				class="flex w-full justify-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
			>
				{#if isSubmitting}
					<svg
						class="mr-3 -ml-1 h-5 w-5 animate-spin text-white"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle
							class="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							stroke-width="4"
						/>
						<path
							class="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						/>
					</svg>
					Iniciando sesión...
				{:else}
					Iniciar sesión
				{/if}
			</button>

			<div class="text-center text-sm">
				<span class="text-gray-600">¿No tienes una cuenta?</span>
				<a href="/register" class="ml-1 text-emerald-600 hover:text-emerald-500">Regístrate</a>
			</div>
		</form>
	</div>
</div>
