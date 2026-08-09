# Claude Code Build Prompt — Sujha Traders & Exports Website Rebuild

Copy everything below into Claude Code, in the root of the existing `sujhatraders.com` codebase folder.

---

## 1. ROLE AND MISSION

You are rebuilding the corporate website for **Sujha Traders**, a garment manufacturer based in Kathmandu, Nepal, replacing the current client-rendered React (create-react-app) site.

This site has two jobs, in this order:

1. **Get found — globally, not just locally.** The target buyer is searching "sustainable garment manufacturer," "ethical clothing manufacturer for startups," "low MOQ sustainable apparel manufacturer," from the US, Canada, UK, and Europe — not "garment manufacturer Nepal." The site needs to compete on the *sustainable/ethical production* keyword set, and needs to be the kind of page an AI answer engine (ChatGPT, Gemini, Perplexity, Claude) would surface and quote.
2. **Convert once found.** A buyer who lands here should leave with a clear, checkable sense of capacity, process, and ethics, and one obvious next step.

No generic SaaS-startup template look. No stock photography anywhere, under any circumstances — see Section 12.

**Scope note:** this build now includes a fully custom admin application (Section 5), deployed separately from the public site as `cms.sujha.com` alongside `sujha.com` — see Section 5 for the monorepo structure that keeps both in one repository without merging them into one app. Treat the admin app as first-class scope, not an afterthought bolted onto the marketing site.

---

## 2. BUSINESS CONTEXT (facts to use, do not invent beyond this)

**Company**
- Sujha Traders, registered in 1998. Kathmandu, Nepal.
- Manufactures readymade garments, apparel accessories, fashion apparel, and sustainable clothing — broad, proven capability, not a single narrow specialty.

**Capacity**
150+ employees · Monthly production: 60,000 pieces · MOQ: 100 pieces per style · Sample development: 72 hours · Lead times vary by order (quoted per RFQ).

**Machinery / capability list**
Flatlock, 4-thread and 5-thread overlock, single needle lockstitch, double needle lockstitch, bartack, embroidery, printing, CAD, pattern making, digitizer, eyelet/stud attachment machines, modern cutting machines.

**Export markets**
Already exported to the US, Canada, UK, France, Germany, Australia, Spain, Nepal, Italy, Japan, Czech Republic, Netherlands, Belgium — open to exporting anywhere, don't present the list as a limit.

**Ideal client**
Anyone producing sustainable readymade garments — startups, growing labels, established brands alike. Don't over-segment into rigid personas.

**Fair Trade Group Nepal**
Confirmed member (part of the WFTO network). State as fact.

**Certifications — get this exactly right, it's a legal and trust issue**
WFTO and SA8000 are **in progress**, not held. Never write "WFTO certified" or "SA8000 certified." Correct phrasing: "member of Fair Trade Group Nepal," "working toward WFTO and SA8000 certification." No other certifications exist — don't imply any (no BSCI, Sedex, ISO, OEKO-TEX, GOTS). State the honesty position directly on the Sustainability page: "We only list certifications we've actually earned. WFTO and SA8000 are in progress, and we'll update this page the day they're confirmed, not before."

**Social impact — the Kamlari program**
- 70 former Kamlari women currently employed. 300+ have gone through the program historically since 2015. Partner: Nepal Youth Foundation. Model: training, then direct employment.
- Brief factual context, once, where first introduced: the Kamlari system was a form of bonded domestic servitude historically affecting girls and young women from Nepal's Tharu community in the western Terai, officially abolished in 2013.
- **Tone:** center the numbers and outcome (70 in stable skilled employment, 300+ over a decade), not the trauma. No individual names, photos, or identifying stories without Sujhan's explicit confirmation of consent — applies everywhere this is mentioned, including the Team page (Section 7).
- Lives primarily on the Sustainability page; may be referenced briefly elsewhere with a link back — never repeat the full narrative in multiple places.

---

## 3. BRAND SYSTEM (finalized — apply throughout)

**Logo:** Use the existing logo file already present in the codebase directory as a placeholder. The new "Runway Flow" mark is still in development. Apply the color palette and typography below now, independent of the future logo swap.

**Color palette**

| Name | Hex | Use |
|---|---|---|
| Rich Deep Purple | `#3A2D56` | Primary — headlines, primary buttons, nav |
| Deep Forest Green | `#355E3B` | Secondary — accents, secondary buttons, sustainability content |
| Natural Ivory | `#F3EFE7` | Background — alternate with white for section rhythm |
| Charcoal Ink | `#2A2622` | Body text default |
| Warm Gray | `#D9D3C7` | Borders, dividers, disabled states |
| Pure White | `#FFFFFF` | Cards, reversed logo on dark photos |
| Purple Tint (~15%) | `#E6E2EC` | Badges, subtle backgrounds |
| Green Tint (~15%) | `#E1E8E2` | Badges, subtle backgrounds |

Purple leads; green supports (especially sustainability content). Don't use both at full saturation in the same tight area. Both core colors are contrast-verified (~8–12:1) for text/button use against white/ivory.

**Typography**
- **Display/headline:** DM Serif Display — Regular weight only, large sizes only (H1/H2, logo wordmark). Italic for short emphasis phrases, not full lines.
- **Everything else:** DM Sans — Regular (400) body, Medium (500) UI/labels, Bold (700) emphasis. Sub-headings (H3 and below) also use DM Sans.
- Load both via `next/font`. Load only: DM Serif Display Regular + Italic; DM Sans 400/500/700.

---

## 4. TECH STACK

- **Next.js**, App Router, **TypeScript**, **Tailwind CSS**.
- Server Components by default; `"use client"` only where interactivity is required.
- `next/image` for every image, no raw `<img>` tags.
- SSG for static marketing pages; blog uses ISR so new posts publish without a full redeploy.
- `generateMetadata()` per route.
- Migrate reusable assets and salvageable copy from the current CRA codebase before rebuilding — audit first.
- Deploy target: Vercel (existing hosting).

**Before touching anything: work on a new branch (e.g. `rebuild/monorepo`), not `main`.** The current CRA app is presumably still what's live and serving sujhatraders.com/sujha.com right now. Restructuring directly on `main` risks a broken or half-finished state being what's actually deployed mid-rebuild. Do the full restructure — asset audit, monorepo setup, both apps — on the branch; leave `main` deploying the existing site untouched until `apps/web` is genuinely ready to replace it, then cut over deliberately rather than merging as you go.

**Sequence for the restructure itself:**
1. Audit the existing folder — inventory every image asset, the current logo file, and any copy worth preserving. Do this before moving or deleting anything.
2. Set up the monorepo structure (`apps/web`, `apps/admin`, `packages/db`) inside this same repository.
3. Move the current CRA source into an archive folder (e.g. `/legacy-cra`) rather than deleting it outright — keep it referenceable until the new site is confirmed working end-to-end.
4. Build out `apps/web` and `apps/admin` per the rest of this spec.
5. Only once `apps/web` is verified working does the cutover (merging to `main`, repointing the production Vercel project) happen — treat this as a deliberate final step, not something that happens incrementally alongside development.

**Backend: Supabase (free tier) — Postgres database, file storage, and auth, all from one provider.**

This replaces the earlier Payload CMS plan. Rationale: rather than a pre-built CMS admin, Sujhan wants a fully custom admin application for maximum control and future extensibility (including a possible future move into selling directly from the site — not yet concrete, don't build commerce schema now, but the architecture shouldn't block it later). Supabase's free tier bundles what would otherwise be two separate services (a Postgres host + a file storage provider) into one: 500MB database storage, 1GB file storage, 5GB bandwidth, 50,000 monthly active users for auth. Comfortably covers this site well past launch.

**Known free-tier behavior to build around:** Supabase free projects auto-pause after 7 consecutive days with no database activity. A live site with regular form submissions and admin usage is unlikely to go quiet that long, but note it as a known quirk, not a bug, if it ever happens. No automated backups on the free tier — fine at launch; revisit (Supabase Pro, $25/mo, adds backups) once real business content has accumulated and losing it would actually hurt.

**Transactional email: Resend (free tier — 3,000 emails/month, 100/day, 1 verified domain).** Replaces EmailJS entirely. Used only for notification emails (new RFQ/inquiry/CV submission, admin alerts) — the actual submission data and any uploaded files live in Supabase, not in the email itself, so there's no attachment-size ceiling to design around.

---

## 5. MONOREPO STRUCTURE + CUSTOM ADMIN APPLICATION ARCHITECTURE

**Two separate Next.js apps, one repository.** Not `/admin` routes bolted onto the public site — a real monorepo, structured like this:

```
/                       repo root
  supabase/              CLI config + migrations — GitHub integration working directory
  apps/
    web/                the public site — deploys to sujha.com
    admin/               the admin app — deploys to cms.sujha.com
  packages/
    db/                 shared Supabase client, generated DB types, Zod validation schemas
    ui/                 (optional) shared design tokens/primitives if genuinely reused between both apps
```

Use **pnpm workspaces** (or Turborepo on top of pnpm if build orchestration gets complex — start with plain pnpm workspaces, only add Turborepo if the build actually needs it) to wire the packages together. `apps/web` and `apps/admin` both import their Supabase client and types from `packages/db` — this is the part that matters: **one source of truth for what the data looks like, consumed by two independent apps.** Without this shared package, the admin app's forms and the public site's rendering will eventually disagree about a field's shape or a table's structure, and that kind of drift is invisible until it silently breaks something in production.

**Deployment:** two separate Vercel projects pointing at the same repo, each with a different root directory setting (`apps/web`, `apps/admin`) and a different custom domain (`sujha.com`, `cms.sujha.com`). Independent deploys — a change to the admin app never requires redeploying the public site and vice versa. Both connect to the same Supabase project.

**Local development + GitHub integration — stay on the free tier, don't enable paid branching.** Supabase's GitHub integration does two separable things: (1) auto-deploying migrations to the live project on merge to `main` — free on any plan — and (2) isolated preview databases per branch/PR, which requires the Supabase **Pro plan ($25/mo)**. Use only (1) for now:
- The `supabase/` CLI folder is the GitHub integration's working directory (`.`, repo root).
- Develop against a **local Supabase instance** via `supabase start` (Postgres in Docker locally, no cost) rather than a live preview branch. Write every schema change as a migration file in `supabase/migrations/*.sql` on the `rebuild/monorepo` branch — reviewable and version-controlled, which is the actual benefit being sought, independent of whether paid branching is enabled.
- Only enable "deploy on merge to main" in the GitHub integration settings — production Supabase stays untouched until the branch actually merges.
- `packages/db`'s generated types (`supabase gen types typescript`, run against the local instance) come from these same migrations, so the schema and the types both apps import stay in sync by construction.
- Revisit the Pro plan later only if isolated cloud preview databases per branch become genuinely worth it — not a day-one requirement.

**Auth:** Supabase Auth, email/password, for Sujhan (and any future staff), scoped to the admin app only — the public site (`apps/web`) never needs its own auth. Protect all routes in `apps/admin` with middleware that checks for a valid Supabase session and an `is_admin` flag on the user record. No public sign-up path — admin accounts are created directly in the Supabase dashboard.

**Database schema (Postgres tables via Supabase, defined once in `packages/db`):**
- `blog_posts` — title, slug, category_id (FK), body (rich JSON — see editor note below), excerpt, hero_image_url, published (boolean), published_at, faq_items (JSON array of {question, answer} for `FAQPage` schema).
- `blog_categories` — name, slug.
- `design_gallery_items` — image_url, caption, category/type, display_order. No client name/logo fields — enforce the confidentiality rule at the schema level by not creating a field for it.
- `careers_listings` — title, department, description, how_to_apply, is_active (boolean) — public page shows evergreen state when no rows have `is_active = true`.
- `leadership_profiles` — name, role, photo_url (nullable — render a placeholder avatar when null), bio, display_order.
- `departments` — name, description, headcount, photo_url (nullable, same placeholder behavior).
- `inquiries` — type (`quick` / `rfq` / `careers_cv`), all relevant form fields (Section 10) as JSON or discrete columns, uploaded_file_url (nullable, points to Supabase Storage), created_at, status (`new` / `read` / `archived`) so Sujhan has a working inbox in the admin app, not just a fire-and-forget form.

**Row-Level Security (RLS) — set explicitly, don't leave tables open:**
- Public (anon) role, used by `apps/web`: read-only on `blog_posts` where `published = true`, `blog_categories`, `design_gallery_items`, `careers_listings` where `is_active = true`, `leadership_profiles`, `departments`. Insert-only (no read) on `inquiries` — a visitor can submit a form but can never read other people's submissions.
- Authenticated admin role, used by `apps/admin`: full read/write on everything.

**Rich text editor for blog posts:** **Tiptap** in `apps/admin`, storing content as structured JSON, rendered in `apps/web` with a matching renderer (share the JSON schema/types via `packages/db` or a small shared renderer package so the two stay in sync). Keep the toolbar simple — headings, bold/italic, links, images, lists.

**Image uploads:** admin forms upload directly to Supabase Storage buckets (e.g. `blog-images`, `design-gallery`, `team-photos`), returning a public URL stored on the relevant row. Compress/resize on upload where practical to protect the 1GB storage ceiling.

**Admin UI scope — keep it plain and functional, not a design showcase:** a simple dashboard listing each content type, standard list/create/edit/delete views per table, the Tiptap editor for blog post bodies, an inquiries inbox view (list + mark as read/archived). It can share Tailwind config with `apps/web` for consistency, but treat it as an internal tool — clarity and speed of data entry matter more than visual polish here.

---

## 6. SITE ARCHITECTURE — MULTI-PAGE, WITH A STORYTELLING HOMEPAGE

Multi-page, not a single scrolling homepage — the SEO/AEO strategy (Section 8) depends on each page owning a distinct keyword cluster with its own metadata and schema, and the blog structurally requires it. The homepage still carries a lot of the narrative through strong preview/teaser sections linking to each deeper page, so a visitor gets the full pitch in one scroll if they want it, while every page underneath exists and ranks independently.

**Public site (`apps/web`, deploys to sujha.com):**
```
/                       Home
/about                  About / Our Story
/capabilities           What We Make & How
/design                 Design Showcase (previous work, view-only)
/team                   Team & Organization
/sustainability         Fair Trade Group Nepal, certification status, Kamlari program
/blog                   Blog
/blog/[slug]            Individual post
/blog/category/[cat]    Category archive
/careers                Careers
/contact                Contact — quick inquiry AND full RFQ (Section 10)
```

**Admin app (`apps/admin`, deploys to cms.sujha.com):** dashboard + list/create/edit/delete views per content type (Section 5), inquiries inbox. Entirely separate app, not linked from the public site's nav or footer.

9 public top-level destinations is a lot for a flat nav bar — group About / Team / Sustainability / Careers under a "Company" dropdown if it feels crowded once real content is in, keeping Home, Capabilities, Design, Blog, Contact as the primary flat items. Footer should list every public page regardless of header grouping.

---

## 7. TEAM & ORGANIZATION PAGE (`/team`)

Two tables, deliberately structured differently (Section 5 schema):

**Leadership — individual profiles.** Photos aren't all available yet — render a clearly-marked placeholder avatar (initials on a brand-color background, not a stock headshot) for anyone without a `photo_url` set. Sujhan adds real photos through the admin app as they become available; the page looks complete on day one with placeholders and updates seamlessly as photos are swapped in.

**Departments — grouped, not individual.** Cutting, Sewing, Finishing, QC, Design/Sampling, Admin (confirm exact names with Sujhan). Real department-specific photos are limited right now — Sujhan is arranging more before this page goes live; ship with clearly-marked placeholders wherever a real photo isn't yet available. Never substitute a stock photo (Section 12).

**Why not a flat roster of all 150+ employees:** individually profiling every floor worker isn't standard practice and raises a real dignity/consent concern given a meaningful share of the floor workforce are former Kamlari women. This structure tells the "150+ people, real factory" story honestly without requiring individual consent from every employee.

**Kamlari program reference:** one brief, numbers-led paragraph (70 currently employed, 300+ since 2015, Nepal Youth Foundation partnership) with a clear link to the Sustainability page for the full story. Don't repeat the full narrative here.

---

## 8. SEO + AEO REQUIREMENTS

**Keyword targeting** — primary market US/Canada/UK/Europe, primary angle sustainability, not geography: sustainable garment manufacturer · ethical clothing manufacturer for startups · low MOQ sustainable clothing manufacturer · private label sustainable apparel manufacturer · Fair Trade garment manufacturer · CMT manufacturer Nepal / garment manufacturer Nepal (secondary).

**On-page:** unique title (50–60 char) and meta description (140–160 char) per page/post; one `<h1>` per page; heading hierarchy phrased as answerable questions where natural; Open Graph + Twitter Card tags; canonical URL — on every page and post.

**Structured data (JSON-LD):** `Organization` on every page; `LocalBusiness`/manufacturing-adjacent markup on Home/About; `FAQPage` on Capabilities and Sustainability; `Article` on every blog post (built from the `blog_posts` FAQ/body data); `BreadcrumbList` on all non-home pages; `JobPosting` conditionally on Careers (only rows where `is_active = true`).

**AEO — first-class requirement:**
- Lead every key page with 1–2 standalone, factual, quotable sentences before any marketing framing — e.g. "Sujha Traders is a Kathmandu-based garment manufacturer producing 60,000 pieces monthly with a 100-piece MOQ and 72-hour sample turnaround. The company is a member of Fair Trade Group Nepal and employs 70 former Kamlari women through an ongoing partnership with Nepal Youth Foundation."
- FAQ schema is the highest-leverage AEO tool — build real question/answer pairs.
- Blog content should directly answer real buyer questions (Section 9 pillars) — this is what positions Sujha as a source an AI model cites.

**Technical:** `sitemap.xml` / `robots.txt` via Next.js route handlers, reusing the existing Google Search Console property. Core Web Vitals targets: LCP < 2.5s, CLS ~0, INP < 200ms. Mobile-first responsive build. Descriptive, specific alt text on every image.

---

## 9. BLOG ARCHITECTURE

- Blog index: paginated, filterable by category (queried from `blog_posts`/`blog_categories`). Category archives: own metadata, own `<h1>`. Post page: auto-generated sticky table of contents from headings in the Tiptap content, related posts (same category), `Article` schema, `FAQPage` schema when `faq_items` is populated.
- Content pillars (structure matters more than final copy right now — Sujhan will replace placeholder posts): buyer education (MOQ, sample timelines, evaluating certification claims), process transparency (cutting/sewing/finishing/QC walkthroughs), sustainability & impact (Kamlari program, FTG Nepal, certification journey), Nepal/CMT context for buyers unfamiliar with sourcing from Nepal.
- Populate a handful of placeholder posts across these categories through the admin app itself once it's built, so the templates, filtering, and schema all render against something real.

---

## 10. CONTACT + RFQ SYSTEM (Supabase + Resend)

**Path 1 — Quick Inquiry:** Name, Company, Email, Country, Message.

**Path 2 — Full RFQ:** Product type, Quantity, Fabric, GSM, Printing (yes/no + detail), Embroidery (yes/no + detail), Labels, Packaging, Target price (optional), Delivery country, Timeline, and now a real **tech pack / reference image upload** — since files go to Supabase Storage, not an email attachment, there's no size ceiling to design around the way there was on EmailJS. Set a sane practical limit anyway (e.g. 10MB per file) to protect the storage quota, and validate file type client-side.

**Careers CV submission:** name, email, role of interest, message, and a real CV file upload to Supabase Storage — same pattern, no EmailJS attachment limitation to work around anymore.

**Flow:** form submits → row written to the `inquiries` table (with `uploaded_file_url` if applicable) → a Supabase Edge Function (or a Next.js API route, whichever is simpler in the final implementation) calls Resend to send a notification email to Sujhan's inbox with the key details and a link into the admin inquiries view → inline success/error state shown to the visitor immediately, not dependent on the email step succeeding. The submission record persisting in Supabase regardless of email delivery is the actual reliability win here — nothing is lost if an email bounces or gets delayed.

Present the two Contact paths as tabs/toggle, not one long intimidating form. Client-side validation on all forms. Honeypot or lightweight spam mitigation on all three (Quick Inquiry, Full RFQ, Careers CV) — public insert-only RLS access makes these tables a real spam target once indexed, don't skip this.

---

## 11. PAGE-BY-PAGE SPEC (Home / About / Capabilities / Design / Sustainability / Careers)

Content rule: specific over impressive — every claim checkable.

### Homepage
Hero headline (draft): `"A Kathmandu garment factory that publishes its numbers, not just its promises."` Subhead (draft): `"Sujha Traders has manufactured garments since 1998. We're a Fair Trade Group Nepal member, and 70 of our team members are former Kamlari women building stable careers through our partnership with Nepal Youth Foundation."` Primary CTA: `"Request a Quote"` → Contact. Secondary: `"See What We Make"` → Capabilities. Trust bar: `Est. 1998` · `150+ Employees` · `60,000 pcs/month` · `100-pc MOQ` · `72-hr Samples` · `Fair Trade Group Nepal Member`. Export footprint teaser, Team/Kamlari teaser, closing CTA band.

### About
Founding story (1998 → today), broad production capability. FAQ candidates: location / years in business / what's produced.

### Capabilities
Production model, full machinery list, process walkthrough (fabric intake → cutting → sewing → finishing/QC → packing/dispatch), capacity block. FAQ candidates: MOQ / sample turnaround / machinery.

### Design
View-only showcase — **no client names or logos anywhere**, enforced in copy, captions, and the schema itself (Section 5). Framing line: `"A look at the range of garments we've produced, shown here without client attribution, per our clients' confidentiality."`

### Sustainability
Fair Trade Group Nepal membership, certification status (exact wording per Section 2, including the honesty line), Kamlari program in full. FAQ candidates: WFTO certification status / what is FTG Nepal / what is the Kamlari employment program.

### Careers
Dual-mode off the `careers_listings` table: evergreen state (default, no active rows) + CV submission; live-listings state activates automatically when a row has `is_active = true`, no code changes needed to post a job. `JobPosting` schema conditionally applied.

---

## 12. NO STOCK PHOTOGRAPHY — HARD RULE

Applies everywhere: hero images, Capabilities process photos, Design gallery, Team/Department photos, blog post images. Use only real photos already present in the codebase's asset directory. Where a photo doesn't exist yet, use a clearly-marked placeholder instead of a stock photo standing in for something real — flag every gap explicitly in a build summary rather than silently filling it. A stock photo undermines the "specific and checkable" positioning the entire site is built on.

---

## 13. DESIGN DIRECTION

Grounded, precise, industrial-craft aesthetic, not generic SaaS-startup. No decorative cultural motifs used superficially. Real photography as primary visual material wherever it exists; icons only for process steps and category tiles. Load the `frontend-design` skill for this environment's design-token and styling constraints before writing component code. Apply this to the public site — the admin app (Section 5) can be visually plain and functional.

---

## 14. CONVERSION MECHANICS

One consistent primary CTA ("Request a Quote") across nav, hero, mid-page, footer. Objection-mapping per page: Homepage → is this real and established; Capabilities → can they handle my volume; Team → is this a real organization; Sustainability → is the ethics claim real; Blog → do they know this space; Contact → will this go anywhere. No dead-end pages. Above-the-fold clarity within 3 seconds on every page.

---

## 15. LANGUAGE, SCOPE, AND WHAT NOT TO BUILD

English only. Do **not** build: news/factory-updates section, downloadable company profile/brochure/capability-statement PDFs, case studies, client portal login, any commerce/product/order schema (not yet concrete — the architecture doesn't block adding it later, but don't build it now).

---

## 16. THINGS TO CONFIRM WITH SUJHAN BEFORE FINALIZING

1. Exact department names/structure for the Team page.
2. Exact role titles for Careers evergreen copy.
3. Whether to name any individual leadership members beyond what's already planned.
4. Real department/leadership photos as they become available — added via the admin app as ready.
5. Whether to group About/Team/Sustainability/Careers under a "Company" nav dropdown or keep the header flat, once real content is in place.
6. Domain to verify with Resend for outbound email (needs one verified sending domain on the free tier).
7. Who gets admin accounts (Sujhan only, or additional staff) — provision directly in Supabase, no public admin sign-up.
8. DNS: add a `cms` subdomain record (in Namecheap, per existing DNS setup) pointing to the second Vercel project — separate from the existing sujhatraders.com → sujha.com redirect work, and separate from the MX records for email, per the same domain/DNS caution already established for this project.

---

## 17. DELIVERABLES CHECKLIST

- [ ] pnpm workspace monorepo set up: `apps/web`, `apps/admin`, `packages/db` (shared Supabase client + types + schemas)
- [ ] `apps/web` (Next.js, App Router, TypeScript, Tailwind) migrated from existing codebase, deploys to sujha.com
- [ ] Brand system applied throughout `apps/web`: new color palette, DM Serif Display + DM Sans typography, existing logo file used as placeholder
- [ ] Supabase project set up: Postgres schema (Section 5 tables), Storage buckets, Auth, RLS policies on every table
- [ ] `apps/admin` built, auth-gated, deploys to cms.sujha.com — CRUD views for every content type, Tiptap editor for blog posts, image upload to Storage, inquiries inbox view
- [ ] Resend integrated for notification emails (RFQ/inquiry/CV submissions), verified sending domain
- [ ] All public pages built and responsive (Home, About, Capabilities, Design, Team, Sustainability, Blog index/category/post, Careers, Contact)
- [ ] Per-page/per-post metadata, Open Graph, canonical URLs
- [ ] JSON-LD: Organization, LocalBusiness, FAQPage, Article, BreadcrumbList, conditional JobPosting
- [ ] AEO-oriented lead sentences and real FAQ sections with schema on every key page
- [ ] `sitemap.xml`, `robots.txt` generated; existing GSC property reused
- [ ] Quick Inquiry + Full RFQ (with real file upload) + Careers CV (with real file upload) forms, writing to Supabase, spam mitigation on all three
- [ ] Careers page dual-mode working off the `careers_listings` table
- [ ] Team page with leadership placeholders + department groupings, brief Kamlari reference linking to Sustainability
- [ ] Design page enforces no-client-attribution rule at both copy and schema level
- [ ] Zero stock photography anywhere; every gap explicitly flagged instead of filled
- [ ] All images through `next/image`, real descriptive alt text
- [ ] Lighthouse check: LCP < 2.5s, CLS ~0, INP < 200ms
- [ ] Section 16 open items confirmed before copy is locked
