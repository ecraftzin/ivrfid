import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseUrl = 'https://jkyrsprkqcualoiirumk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpreXJzcHJrcWN1YWxvaWlydW1rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3NDI2NjQsImV4cCI6MjA4MjMxODY2NH0.vBfZwhnvblDxHXvBn4l42ggZSHXmp-uJjJkqlW97wLI';



export const supabase = createClient(supabaseUrl, supabaseAnonKey);