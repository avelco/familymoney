import { redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';
import { verifyJwt, refreshAccessToken } from '$lib/utils/auth';
import { supabase } from '$lib/database/supabaseClient';

export const handle: Handle = async ({ event, resolve }) => {
	const accessToken = event.cookies.get('access_token');
	const refreshToken = event.cookies.get('refresh_token');

	event.locals.user = null; // Ensure the property is always set

	if (accessToken) {
		const decodedUser = verifyJwt(accessToken);
		if (decodedUser) {
			const {
				data: { user }
			} = await supabase.auth.getUser(accessToken);
			event.locals.user = { ...user };
		}
	}

	// If user is not authenticated but has refresh_token, refresh the access token
	if (!event.locals.user && refreshToken) {
		const newToken = await refreshAccessToken(refreshToken);
		if (newToken) {
			event.cookies.set('access_token', newToken.access_token, {
				httpOnly: true,
				secure: true,
				sameSite: 'strict',
				path: '/',
				maxAge: newToken.expires_in
			});

			const decodedUser = verifyJwt(newToken.access_token);
			if (decodedUser) {
				event.locals.user = decodedUser;
			}
		}
	}

	const protectedRoutes = ['/login', '/register'];
	if (
		!event.locals.user &&
		!protectedRoutes.some((route) => event.url.pathname.startsWith(route))
	) {
		throw redirect(302, '/login');
	}

	return resolve(event);
};
