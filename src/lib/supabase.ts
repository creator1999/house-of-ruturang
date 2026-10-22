import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// IMPORTANT: there are two clients on purpose.
//  - The *browser* client uses the anon key (safe to ship to the client).
//  - The *admin* client uses the service-role key and must ONLY be used in
//    server-side code (API routes / server components). Never expose it.

let browserClient: SupabaseClient | null = null;

export function getSupabaseBrowserClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (see .env.example).",
    );
  }
  if (!browserClient) browserClient = createClient(url, anonKey);
  return browserClient;
}

export function getSupabaseAdminClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error(
      "Supabase service-role key is not configured. Set SUPABASE_SERVICE_ROLE_KEY (see .env.example).",
    );
  }
  return createClient(url, serviceKey, { auth: { persistSession: false } });
}
