-- Wrap auth.uid() in a scalar subquery so the planner treats it as an InitPlan
-- evaluated once per statement, rather than re-running it for every candidate
-- row. Flagged by `supabase db advisors --type performance`.
--
-- Behaviour is identical; only the evaluation count changes.

drop policy "users read own profile"   on public.profiles;
drop policy "users update own profile" on public.profiles;
drop policy "admins delete profiles"   on public.profiles;

create policy "users read own profile"
  on public.profiles for select
  to authenticated
  using (id = (select auth.uid()));

create policy "users update own profile"
  on public.profiles for update
  to authenticated
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

create policy "admins delete profiles"
  on public.profiles for delete
  to authenticated
  using (private.is_admin() and id <> (select auth.uid()));

-- The advisor also reports overlapping permissive SELECT policies for the
-- `authenticated` role on the content tables. That overlap is deliberate and
-- stays: the public policy exposes only published posts and active listings,
-- while "admins full access" must also reach drafts and inactive rows. Merging
-- them would either hide drafts from the CMS or leak them to the public site.
-- The cost is a second policy evaluation on tables holding tens of rows.
