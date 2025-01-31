import { SUPABASE_DATABASE_URL, SUPABASE_AUTH_TOKEN } from '$env/static/private';
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(SUPABASE_DATABASE_URL, SUPABASE_AUTH_TOKEN);
