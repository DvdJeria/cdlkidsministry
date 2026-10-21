import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://edmelbseaovqbqlgutem.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkbWVsYnNlYW92cWJxbGd1dGVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIxNjg0MjYsImV4cCI6MjEwNzc0NDQyNn0.nFzDTuSPj5PIQ8_y7FaQcMfdxE9L4OqIZUG0Cby9PhE';

export const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
