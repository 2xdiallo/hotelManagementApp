
import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://nnfdlgqkzkauqxncympt.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5uZmRsZ3FremthdXF4bmN5bXB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwODk1MTUsImV4cCI6MjA3ODY2NTUxNX0.WaCQGdXhaEUtQL7GBNjksXzibLCW15HRm-8cuWz9uto" 
const supabase = createClient(supabaseUrl, supabaseKey)

export default  supabase;