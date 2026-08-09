-- Hardening pass, prompted by `supabase db advisors --type security`.
--
-- Three problems with the original definitions:
--
--   1. Everything in the `public` schema is published by PostgREST as an RPC
--      endpoint. set_updated_at(), handle_new_user() and guard_last_admin() are
--      trigger functions — they were never meant to be callable, least of all
--      by anon, and least of all as SECURITY DEFINER.
--   2. is_admin() had the same exposure. It is genuinely needed by RLS, so it
--      moves to a `private` schema that PostgREST does not publish, rather than
--      being revoked outright.
--   3. set_updated_at() had a mutable search_path.
--
-- Triggers invoke their function through the table owner, so revoking EXECUTE
-- from anon/authenticated does not stop any trigger from firing.

create schema if not exists private;

-- authenticated needs to reach the function because RLS policy expressions are
-- evaluated with the querying role's privileges. anon deliberately gets no
-- USAGE: no anon-facing policy calls it.
grant usage on schema private to authenticated;

create or replace function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select coalesce(
    (select p.is_admin from public.profiles p where p.id = auth.uid()),
    false
  );
$$;

-- ─── Repoint every policy at private.is_admin() ──────────────────────────────
-- A policy's expression cannot be altered in place, so each is dropped and
-- recreated. Behaviour is unchanged; only the function's schema moves.

drop policy "admins read all profiles"  on public.profiles;
drop policy "admins update any profile" on public.profiles;
drop policy "admins delete profiles"    on public.profiles;

create policy "admins read all profiles"
  on public.profiles for select
  to authenticated
  using (private.is_admin());

create policy "admins update any profile"
  on public.profiles for update
  to authenticated
  using (private.is_admin())
  with check (private.is_admin());

create policy "admins delete profiles"
  on public.profiles for delete
  to authenticated
  using (private.is_admin() and id <> auth.uid());

do $$
declare
  t text;
begin
  foreach t in array array[
    'blog_categories',
    'blog_posts',
    'design_gallery_items',
    'careers_listings',
    'leadership_profiles',
    'departments',
    'inquiries'
  ]
  loop
    execute format('drop policy "admins full access" on public.%I', t);
    execute format(
      'create policy "admins full access" on public.%I
         for all to authenticated
         using (private.is_admin())
         with check (private.is_admin())', t
    );
  end loop;
end;
$$;

drop policy "admins write content buckets" on storage.objects;
drop policy "admins read inquiry files"    on storage.objects;
drop policy "admins delete inquiry files"  on storage.objects;

create policy "admins write content buckets"
  on storage.objects for all
  to authenticated
  using (
    bucket_id in ('blog-images', 'design-gallery', 'team-photos')
    and private.is_admin()
  )
  with check (
    bucket_id in ('blog-images', 'design-gallery', 'team-photos')
    and private.is_admin()
  );

create policy "admins read inquiry files"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'inquiry-uploads' and private.is_admin());

create policy "admins delete inquiry files"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'inquiry-uploads' and private.is_admin());

drop function public.is_admin();

-- ─── Pin search_path and close the trigger functions ─────────────────────────

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public, pg_temp
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

revoke execute on function public.set_updated_at()   from anon, authenticated;
revoke execute on function public.handle_new_user()  from anon, authenticated;
revoke execute on function public.guard_last_admin() from anon, authenticated;
