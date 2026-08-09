-- Storage buckets.
--
-- Three public content buckets, and one private bucket for anything a visitor
-- uploads. Free tier ceiling is 1GB, so per-bucket size limits are set here
-- rather than trusted to client-side validation alone.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('blog-images',    'blog-images',    true,  5  * 1024 * 1024,
     array['image/jpeg','image/png','image/webp','image/avif']),
  ('design-gallery', 'design-gallery', true,  5  * 1024 * 1024,
     array['image/jpeg','image/png','image/webp','image/avif']),
  ('team-photos',    'team-photos',    true,  5  * 1024 * 1024,
     array['image/jpeg','image/png','image/webp','image/avif']),
  -- Private. Holds CVs and client tech packs: personal data and commercially
  -- confidential material. A public bucket would make every upload readable by
  -- anyone who guessed or was given the URL. Admins read via signed URLs.
  ('inquiry-uploads','inquiry-uploads', false, 10 * 1024 * 1024,
     array['image/jpeg','image/png','image/webp','application/pdf',
           'application/msword',
           'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
           'application/zip'])
on conflict (id) do nothing;

-- ─── Public content buckets ──────────────────────────────────────────────────

create policy "public reads content buckets"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id in ('blog-images', 'design-gallery', 'team-photos'));

create policy "admins write content buckets"
  on storage.objects for all
  to authenticated
  using (
    bucket_id in ('blog-images', 'design-gallery', 'team-photos')
    and public.is_admin()
  )
  with check (
    bucket_id in ('blog-images', 'design-gallery', 'team-photos')
    and public.is_admin()
  );

-- ─── Private uploads ─────────────────────────────────────────────────────────

-- Write-only for the public: a visitor can attach a tech pack or CV, but there
-- is no matching SELECT policy for anon, so nobody can read back what others
-- uploaded — not even by guessing a path.
create policy "public uploads inquiry files"
  on storage.objects for insert
  to anon, authenticated
  with check (bucket_id = 'inquiry-uploads');

create policy "admins read inquiry files"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'inquiry-uploads' and public.is_admin());

create policy "admins delete inquiry files"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'inquiry-uploads' and public.is_admin());
