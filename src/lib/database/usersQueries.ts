import { supabase } from '$lib/database/supabaseClient';

export const getUserByEmail = async (email: string) => {
	const { data, error } = await supabase.from('users').select('*').eq('email', email);
	if (error) {
		throw error;
	}
	return data;
};
