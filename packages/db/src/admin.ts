import "server-only";

import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";
import { requireEnv } from "./client";

/**
 * Secret-key client. **Bypasses RLS entirely.**
 *
 * Only used in apps/admin, and only for things RLS deliberately cannot express:
 * inviting an admin and setting the is_admin flag. Every other admin operation
 * goes through the ordinary session client so the policies stay the single
 * source of authorisation truth.
 *
 * The `server-only` import above turns any accidental client-component import
 * into a build error rather than a leaked key. The env var deliberately has no
 * NEXT_PUBLIC_ prefix — that prefix inlines values into browser JavaScript.
 *
 * Note this bypasses RLS but *not* triggers: guard_last_admin() still fires,
 * so even this client cannot strand the project without an admin.
 */
export function createAdminClient() {
  return createSupabaseClient<Database>(
    requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
    requireEnv("SUPABASE_SECRET_KEY"),
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
}

export interface InviteAdminOptions {
  /** Profile id of the admin performing the invite, for the audit trail. */
  invitedBy: string;
  fullName?: string;
  /** Where the emailed link lands — typically `${ADMIN_URL}/auth/callback`. */
  redirectTo: string;
}

/**
 * Invite a new admin by email. They receive a Supabase invite email (delivered
 * through the Resend SMTP integration), verify by OTP, then set their name on
 * first sign-in.
 *
 * Two steps, and the order matters. inviteUserByEmail() cannot set
 * app_metadata, and the handle_new_user() trigger fires during that insert — so
 * the profile is necessarily born with is_admin = false. We promote it
 * immediately afterwards using this same RLS-bypassing client. A failure
 * between the two leaves a non-admin profile, which is the safe direction to
 * fail: the invitee simply cannot get in, rather than getting in with rights
 * nobody granted.
 */
export async function inviteAdmin(email: string, options: InviteAdminOptions) {
  const admin = createAdminClient();

  const { data, error } = await admin.auth.admin.inviteUserByEmail(email, {
    redirectTo: options.redirectTo,
    data: options.fullName ? { full_name: options.fullName } : undefined,
  });

  if (error) return { user: null, error };

  const { error: promoteError } = await admin
    .from("profiles")
    .update({ is_admin: true, invited_by: options.invitedBy })
    .eq("id", data.user.id);

  if (promoteError) return { user: data.user, error: promoteError };

  return { user: data.user, error: null };
}

/** Revoke admin rights. guard_last_admin() rejects removing the final admin. */
export async function revokeAdmin(profileId: string) {
  const admin = createAdminClient();

  return admin.from("profiles").update({ is_admin: false }).eq("id", profileId);
}
