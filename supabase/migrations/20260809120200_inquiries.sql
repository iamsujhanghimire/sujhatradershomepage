-- Inquiries: quick enquiry, full RFQ, and careers CV submissions.
--
-- The submission row is written first and the Resend notification fires after,
-- so a bounced or delayed email never loses a lead.

create type public.inquiry_type   as enum ('quick', 'rfq', 'careers_cv');
create type public.inquiry_status as enum ('new', 'read', 'archived');

create table public.inquiries (
  id                uuid primary key default gen_random_uuid(),
  type              public.inquiry_type   not null,

  -- Shared across all three forms — discrete so the inbox can filter and sort.
  name              text        not null,
  email             text        not null,
  company           text,
  country           text,
  message           text,

  -- Type-specific payload. RFQ carries product_type, quantity, fabric, gsm,
  -- printing, embroidery, labels, packaging, target_price, delivery_country,
  -- timeline; careers_cv carries role_of_interest. Kept as jsonb so adding an
  -- RFQ field later is an app change, not a migration.
  details           jsonb       not null default '{}'::jsonb,

  -- Points at the private inquiry-uploads bucket. Tech packs and CVs are
  -- confidential, so this is a storage path served via short-lived signed URL,
  -- never a public URL.
  uploaded_file_path text,

  status            public.inquiry_status not null default 'new',
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),

  constraint inquiries_email_shape  check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  constraint inquiries_details_object check (jsonb_typeof(details) = 'object')
);

create index inquiries_status_idx on public.inquiries (status, created_at desc);
create index inquiries_type_idx   on public.inquiries (type, created_at desc);

create trigger inquiries_set_updated_at
  before update on public.inquiries
  for each row execute function public.set_updated_at();
