import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://zsrdodsaknsrnjgkcyzi.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_UJgI7t8JypH0NDdU8EG-Ag_jFAxA3xk";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
