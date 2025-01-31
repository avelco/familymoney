import { supabase } from '$lib/database/supabaseClient';

export const storeToken = async (token: string, userId: string, expiresAt: number) => {
	const { error } = await supabase
		.from('access_request')
		.insert({ token: token, user_id: userId, expires_at: expiresAt });
	return error;
};
