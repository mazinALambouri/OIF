// src/supabaseClient.js

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://glbyfqyavllzvaozaqle.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdsYnlmcXlhdmxsenp2YW96YXFsZSIsInJlZ2lvbl91cmwiOiJnbGFieXF5YXZsbHp2YW96YXFsZSIsInJlc291cmNlX3Bvc2l0aW9uIjoicmVzb3VyY2U6Z2xhYnlmcXlhdmxsenp2YW96YXFsZSIsImZlYXR1cmVfZGVzdHJveWVkIjpmYWxzZSwiaWF0IjoxNzIwMjYxMjYxLCJhdWQiOiJhdWRpZW5jZSJ9.0000000000000000000000000000000000000000"

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
