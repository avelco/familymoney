import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { handleErrors } from '$lib/utils/validation';
import type { ErrorType } from '$lib/types/errorType';
import { supabase } from '$lib/database/supabaseClient';

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const email: string = data.get('email') as string;

		const User = z.object({
			email: z.string().email('Debes ingresar un correo válido')
		});

		const validationResult = User.safeParse({ email });
		if (!validationResult.success) {
			const errors: ErrorType[] = handleErrors(validationResult);
			return fail(400, { error: true, errors });
		}
		const { data: responData, error } = await supabase.auth.signInWithOtp({
			email: email,
			options: {
				// set this to false if you do not want the user to be automatically signed up
				shouldCreateUser: false
			}
		});

		if (error) {
			return fail(400, { error: true, errors: [{ message: error.message }] });
		}

		// Set the email in a cookie (secure and HTTP-only for security)
		cookies.set('email', email, { path: '/', httpOnly: true, secure: true });

		redirect(303, '/login/verify');
	}
} satisfies Actions;
