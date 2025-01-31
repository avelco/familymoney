import { supabase } from '$lib/database/supabaseClient';
import jwt, { type JwtPayload } from 'jsonwebtoken';

interface DecodedToken extends JwtPayload {
	email: string;
	phone: string;
	role: string;
}

export interface RefreshTokenResponse {
	access_token: string;
	expires_in: number;
}

export function verifyJwt(token: string): DecodedToken | null {
	try {
		const decoded = jwt.decode(token) as DecodedToken | null;
		if (!decoded || !decoded.email || !decoded.role) return null;
		return decoded;
	} catch (error) {
		return null;
	}
}

export async function refreshAccessToken(refreshToken: string) {
	try {
		// Call Supabase's refresh token function
		const { data, error } = await supabase.auth.refreshSession({ refresh_token: refreshToken });

		if (error || !data.session) {
			console.error('Failed to refresh token:', error?.message);
			return null;
		}

		// Extract the new access and refresh tokens
		const { access_token, refresh_token, expires_in } = data.session;

		return { access_token, refresh_token, expires_in };
	} catch (error) {
		console.error('Unexpected error refreshing token:', error);
		return null;
	}
}
