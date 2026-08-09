-- Helpers, profiles, and the admin authorisation boundary.
--
-- Authorisation is enforced in RLS, not in Next.js middleware. Middleware is a
-- convenience redirect; a signed-in non-admin can call the Supabase REST API
-- directly and bypass Next.js entirely, so the policies below are the real
-- boundary.

create extension if not exists "pgcrypto";

-- Keeps updated_at honest without the app having to remember.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ─────────────────────────────────────────────────────────────────────────────
-- profiles
-- ─────────────────────────────────────────────────────────────────────────────

create table public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  email       text        not null,
  full_name   text,
  is_admin    boolean     not null default false,
  invited_by  uuid        references auth.users (id) on delete set null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index profiles_is_admin_idx on public.profiles (is_admin) where is_admin;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- Admin check. SECURITY DEFINER is load-bearing: it bypasses RLS on profiles,
-- which is what stops the policies below from recursing infinitely when they
-- call this function while evaluating access *to* profiles.
-- The pinned search_path prevents search_path injection against a definer fn.
create or replace function public.is_admin()
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

-- Mint a profile whenever an auth user is created.
--
-- is_admin is read from raw_app_meta_data, never raw_user_meta_data: user
-- metadata is writable by the user themselves via updateUser(), so trusting it
-- here would let any invited user promote themselves to admin. app_metadata is
-- writable only by the secret key.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  insert into public.profiles (id, email, full_name, is_admin, invited_by)
  values (
    new.id,
    new.email,
    nullif(new.raw_user_meta_data ->> 'full_name', ''),
    coalesce((new.raw_app_meta_data ->> 'is_admin')::boolean, false),
    nullif(new.raw_app_meta_data ->> 'invited_by', '')::uuid
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Never allow the last admin to be demoted or deleted — that would lock
-- everyone out of cms.sujha.com with no in-app way back in.
create or replace function public.guard_last_admin()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  remaining int;
begin
  if tg_op = 'DELETE' or (tg_op = 'UPDATE' and old.is_admin and not new.is_admin) then
    select count(*) into remaining
    from public.profiles
    where is_admin and id <> old.id;

    if remaining = 0 then
      raise exception
        'Cannot remove the last admin. Promote another admin first.'
        using errcode = 'check_violation';
    end if;
  end if;

  return case when tg_op = 'DELETE' then old else new end;
end;
$$;

create trigger profiles_guard_last_admin
  before update or delete on public.profiles
  for each row execute function public.guard_last_admin();

-- ─────────────────────────────────────────────────────────────────────────────
-- profiles RLS
-- ─────────────────────────────────────────────────────────────────────────────

alter table public.profiles enable row level security;

create policy "admins read all profiles"
  on public.profiles for select
  to authenticated
  using (public.is_admin());

create policy "users read own profile"
  on public.profiles for select
  to authenticated
  using (id = auth.uid());

create policy "users update own profile"
  on public.profiles for update
  to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

create policy "admins update any profile"
  on public.profiles for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "admins delete profiles"
  on public.profiles for delete
  to authenticated
  using (public.is_admin() and id <> auth.uid());

-- Column-level grants are what actually stop privilege escalation. RLS policies
-- gate *rows*, not columns — without this, "users update own profile" would let
-- any signed-in user set is_admin = true on their own row.
-- Promotion therefore only happens through the secret key in apps/admin.
revoke update on public.profiles from authenticated;
grant update (full_name) on public.profiles to authenticated;
