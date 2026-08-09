-- Public content tables. Read by apps/web via the publishable key (anon role),
-- written only by admins in apps/admin.

-- ─────────────────────────────────────────────────────────────────────────────
-- Blog
-- ─────────────────────────────────────────────────────────────────────────────

create table public.blog_categories (
  id         uuid primary key default gen_random_uuid(),
  name       text        not null,
  slug       text        not null unique,
  created_at timestamptz not null default now()
);

create table public.blog_posts (
  id               uuid primary key default gen_random_uuid(),
  title            text        not null,
  slug             text        not null unique,
  category_id      uuid        references public.blog_categories (id) on delete set null,
  -- Tiptap document. Rendered in apps/web by a matching renderer; the shape is
  -- typed once in packages/db so editor and renderer cannot drift.
  body             jsonb       not null default '{"type":"doc","content":[]}'::jsonb,
  excerpt          text,
  hero_image_url   text,
  -- Per-post SEO overrides. Section 8 requires a unique 50–60 char title and
  -- 140–160 char description per post; falls back to title/excerpt when null.
  meta_title       text,
  meta_description text,
  -- [{question, answer}] — drives FAQPage schema when non-empty.
  faq_items        jsonb       not null default '[]'::jsonb,
  published        boolean     not null default false,
  published_at     timestamptz,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),

  constraint blog_posts_faq_items_is_array check (jsonb_typeof(faq_items) = 'array'),
  constraint blog_posts_published_has_date  check (not published or published_at is not null)
);

create index blog_posts_published_idx on public.blog_posts (published_at desc)
  where published;
create index blog_posts_category_idx on public.blog_posts (category_id);

create trigger blog_posts_set_updated_at
  before update on public.blog_posts
  for each row execute function public.set_updated_at();

-- ─────────────────────────────────────────────────────────────────────────────
-- Design gallery
-- ─────────────────────────────────────────────────────────────────────────────

-- Client confidentiality is enforced structurally: there is deliberately no
-- client_name, client_logo_url, or brand column here. Copy rules can be
-- forgotten; a column that does not exist cannot be populated by accident.
create table public.design_gallery_items (
  id            uuid primary key default gen_random_uuid(),
  image_url     text        not null,
  caption       text,
  garment_type  text,
  display_order integer     not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index design_gallery_order_idx on public.design_gallery_items (display_order, created_at);

create trigger design_gallery_set_updated_at
  before update on public.design_gallery_items
  for each row execute function public.set_updated_at();

-- ─────────────────────────────────────────────────────────────────────────────
-- Careers
-- ─────────────────────────────────────────────────────────────────────────────

create table public.careers_listings (
  id              uuid primary key default gen_random_uuid(),
  title           text        not null,
  department      text,
  description     text        not null,
  how_to_apply    text,
  -- JobPosting schema fields. Emitted only for rows where is_active.
  employment_type text        not null default 'FULL_TIME',
  location        text        not null default 'Kathmandu, Nepal',
  valid_through   timestamptz,
  is_active       boolean     not null default false,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index careers_active_idx on public.careers_listings (created_at desc)
  where is_active;

create trigger careers_set_updated_at
  before update on public.careers_listings
  for each row execute function public.set_updated_at();

-- ─────────────────────────────────────────────────────────────────────────────
-- Team
-- ─────────────────────────────────────────────────────────────────────────────

-- photo_url is nullable by design: the page renders a marked initials avatar
-- when null, so /team is complete on day one and improves as real photos land.
create table public.leadership_profiles (
  id            uuid primary key default gen_random_uuid(),
  name          text        not null,
  role          text        not null,
  photo_url     text,
  bio           text,
  display_order integer     not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index leadership_order_idx on public.leadership_profiles (display_order, created_at);

create trigger leadership_set_updated_at
  before update on public.leadership_profiles
  for each row execute function public.set_updated_at();

-- Departments are grouped rather than individual: profiling all 150+ staff
-- individually is not standard practice and raises a real consent concern
-- given the share of the floor workforce who are former Kamlari women.
create table public.departments (
  id            uuid primary key default gen_random_uuid(),
  name          text        not null,
  description   text,
  headcount     integer,
  photo_url     text,
  display_order integer     not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),

  constraint departments_headcount_sane check (headcount is null or headcount >= 0)
);

create index departments_order_idx on public.departments (display_order, created_at);

create trigger departments_set_updated_at
  before update on public.departments
  for each row execute function public.set_updated_at();
