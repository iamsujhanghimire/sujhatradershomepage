import { createServerClient } from "@supabase/ssr";
import type { Database } from "./database.types";
import { requireEnv } from "./client";

interface CookieStore {
  getAll(): { name: string; value: string }[];
  set(name: string, value: string, options?: Record<string, unknown>): void;
}

type CookieToSet = {
  name: string;
  value: string;
  options?: Record<string, unknown>;
};

/**
 * Server client for Server Components, Route Handlers, and Server Actions.
 * Still the publishable key — the user's session cookie is what elevates
 * access, evaluated by RLS.
 *
 * Pass `cookies()` from next/headers. Writing cookies throws in a Server
 * Component (only Actions and Route Handlers may set them); that's expected and
 * safe to swallow, because middleware refreshes the session on every request.
 */
export function createServerSupabase(cookieStore: CookieStore) {
  return createServerClient<Database>(
    requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
    requireEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"),
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookies: CookieToSet[]) => {
          try {
            for (const { name, value, options } of cookies) {
              cookieStore.set(name, value, options);
            }
          } catch {
            // Server Component render — middleware handles the refresh.
          }
        },
      },
    },
  );
}
