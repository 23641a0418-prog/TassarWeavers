import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://neqkgmkopkxywlbngnkp.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_fXFngM9IoX0KyFDuSlSMrg_K5P6rKA9';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);