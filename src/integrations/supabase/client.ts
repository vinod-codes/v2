import { createClient } from "@supabase/supabase-js"
import type { Database } from "./types"

const SUPABASE_URL = "https://ohpdylrzdxhkkyzekfpq.supabase.co"
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ocGR5bHJ6ZHhoa2t5emVrZnBxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2MjA0MDksImV4cCI6MjA1NzE5NjQwOX0.LxNVnxxGi9u2sCKXsYRDSFCJPPfH4LXC5MAKYo-7BRo"

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY)

