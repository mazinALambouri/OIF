import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://glbyfqyavllzvaozaqle.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdsYnlmcXlhdmxsenZhb3phcWxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA5MDg1NDMsImV4cCI6MjA1NjQ4NDU0M30.DdKtsP4nbNEHXJ7XWsZ4jitX3dGplD23mHZe_Ma1HH8';

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey); 