-- Follow-up to 20260809120500.
--
-- That migration revoked EXECUTE on the trigger functions from `anon` and
-- `authenticated`, and the advisor still flagged both. Postgres grants EXECUTE
-- on every new function to PUBLIC by default, and both roles inherit from
-- PUBLIC — so revoking from the roles individually left the inherited grant
-- untouched. The revoke has to name PUBLIC.
--
-- Triggers are unaffected either way: a trigger invokes its function through
-- the table owner, not the role running the statement.

revoke execute on function public.set_updated_at()   from public;
revoke execute on function public.handle_new_user()  from public;
revoke execute on function public.guard_last_admin() from public;

-- private.is_admin() is reached only through RLS policy expressions, which are
-- evaluated as the querying role. Keep the explicit grant, drop the blanket one.
revoke execute on function private.is_admin() from public;
grant  execute on function private.is_admin() to authenticated;
