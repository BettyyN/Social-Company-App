import { createClient } from "@supabase/supabase-js";

// Use anon key for client-side operations
const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY! // Anon key for client-side
);

const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Service role key for server-side operations
);

export { supabaseClient, supabaseServer };
