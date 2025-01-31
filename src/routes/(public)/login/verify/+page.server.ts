import type { Actions } from './$types';
import { fail, json, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { handleErrors } from '$lib/utils/validation';
import type { ErrorType } from '$lib/types/errorType';
import { supabase } from '$lib/database/supabaseClient';
import type { RequestEvent } from '../$types';

export async function load({ cookies }: RequestEvent) {
	// Retrieve the email from the cookie
	const email = cookies.get('email') || '';

	return {
		email
	};
}

export const actions = {
	default: async ({ request, cookies }) => {
		const email = cookies.get('email');
		const data = await request.formData();
		const code: string = data.get('code') as string;
		const schema = z.object({
			code: z.string().length(6)
		});

		if (!email) {
			return fail(400, { error: true, errors: [{ message: 'No se ha encontrado el correo' }] });
		}
		const validationResult = schema.safeParse({ code });
		if (!validationResult.success) {
			const errors: ErrorType[] = handleErrors(validationResult);
			return fail(400, { error: true, errors });
		}

		const {
			data: { session },
			error
		} = await supabase.auth.verifyOtp({
			email: email,
			token: code,
			type: 'email'
		});

		// Guardar JWT en una cookie segura
		if (session?.access_token) {
			// Guardar Access Token en una cookie HTTP-Only (seguro contra XSS)
			cookies.set('access_token', session.access_token, {
				httpOnly: true,
				secure: true,
				sameSite: 'strict',
				path: '/',
				maxAge: session.expires_in // Expira en el mismo tiempo que el token
			});

			// Guardar Refresh Token en otra cookie HTTP-Only
			cookies.set('refresh_token', session.refresh_token, {
				httpOnly: true,
				secure: true,
				sameSite: 'strict',
				path: '/',
				maxAge: 60 * 60 * 24 * 7 // 7 días
			});

			return redirect(300, '/dashboard');
		}

		if (error) {
			return fail(400, { error: true, errors: [{ message: error.message }] });
		}
	}
} satisfies Actions;
