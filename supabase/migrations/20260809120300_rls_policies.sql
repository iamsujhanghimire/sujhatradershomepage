-- Row-Level Security for every public table.
--
-- Shape: the anon role (apps/web, publishable key) gets narrowly scoped reads
-- and exactly one write — inserting an inquiry. Everything else requires
-- is_admin(). No table is left open.

alter table public.blog_categories      enable row level security;
alter table public.blog_posts           enable row level security;
alter table public.design_gallery_items enable row level security;
alter table public.careers_listings     enable row level security;
alter table public.leadership_profiles  enable row level security;
alter table public.departments          enable row level security;
alter table public.inquiries            enable row level security;

-- ─────────────────────────────────────────────────────────────────────────────
-- Public reads (anon + authenticated)
-- ─────────────────────────────────────────────────────────────────────────────

create policy "public reads categories"
  on public.blog_categories for select
  to anon, authenticated
  using (true);

-- Drafts stay invisible to the public site. Admins get their own policy below.
create policy "public reads published posts"
  on public.blog_posts for select
  to anon, authenticated
  using (published and published_at is not null and published_at <= now());

create policy "public reads design gallery"
  on public.design_gallery_items for select
  to anon, authenticated
  using (true);

create policy "public reads active listings"
  on public.careers_listings for select
  to anon, authenticated
  using (is_active);

create policy "public reads leadership"
  on public.leadership_profiles for select
  to anon, authenticated
  using (true);

create policy "public reads departments"
  on public.departments for select
  to anon, authenticated
  using (true);

-- ─────────────────────────────────────────────────────────────────────────────
-- Inquiries — insert-only for the public
-- ─────────────────────────────────────────────────────────────────────────────

-- A visitor may submit a form. There is deliberately no SELECT policy for anon,
-- so one visitor can never read another's submission. These tables become a
-- spam target once indexed; honeypot and validation live in the app layer.
create policy "public submits inquiries"
  on public.inquiries for insert
  to anon, authenticated
  with check (status = 'new');

-- ─────────────────────────────────────────────────────────────────────────────
-- Admin — full access, gated on is_admin()
-- ─────────────────────────────────────────────────────────────────────────────

-- `to authenticated` alone would be wrong: a signed-in non-admin is still
-- authenticated. is_admin() is the actual gate.
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
    execute format(
      'create policy "admins full access" on public.%I
         for all to authenticated
         using (public.is_admin())
         with check (public.is_admin())', t
    );
  end loop;
end;
$$;
