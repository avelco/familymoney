import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
	'https://mwsymimtxeimlustokof.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13c3ltaW10eGVpbWx1c3Rva29mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxMTIzOTEsImV4cCI6MjA1MzY4ODM5MX0.ECu60t1XBGHMcQ9yHNvuHD9uJ0D9MGGHKDM-XcpCHmo'
);
