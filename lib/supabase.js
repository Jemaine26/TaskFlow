import { createClient } from '@supabase/supabase-js';



const supabaseUrl = "https://zsrdodsaknsrnjgkcyzi.supabase.co";


const supabaseKey = "sb_publishable_UJgI7t8JypH0NDdU8EG-Ag_jFAxA3xk";



export const supabase = createClient(

supabaseUrl,

supabaseKey

);