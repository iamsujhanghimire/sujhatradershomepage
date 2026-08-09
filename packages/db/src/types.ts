import type { Database } from "./database.types";

/**
 * Convenience aliases over the generated types.
 *
 * `database.types.ts` is generated output — never hand-edit it, it gets
 * overwritten by `pnpm db:types`. Anything derived lives here instead, so a
 * regeneration can't silently delete it.
 */

type Tables = Database["public"]["Tables"];

export type Profile = Tables["profiles"]["Row"];
export type BlogCategory = Tables["blog_categories"]["Row"];
export type BlogPost = Tables["blog_posts"]["Row"];
export type DesignGalleryItem = Tables["design_gallery_items"]["Row"];
export type CareersListing = Tables["careers_listings"]["Row"];
export type LeadershipProfile = Tables["leadership_profiles"]["Row"];
export type Department = Tables["departments"]["Row"];
export type Inquiry = Tables["inquiries"]["Row"];

export type ProfileInsert = Tables["profiles"]["Insert"];
export type BlogPostInsert = Tables["blog_posts"]["Insert"];
export type InquiryInsert = Tables["inquiries"]["Insert"];

export type BlogPostUpdate = Tables["blog_posts"]["Update"];

export type InquiryType = Database["public"]["Enums"]["inquiry_type"];
export type InquiryStatus = Database["public"]["Enums"]["inquiry_status"];

/** employment_type is a plain text column with a default rather than an enum,
 *  so the valid set is asserted here and mirrored in careersListingSchema. */
export type EmploymentType =
  | "FULL_TIME"
  | "PART_TIME"
  | "CONTRACTOR"
  | "TEMPORARY"
  | "INTERN";

/** Shape of blog_posts.faq_items, which is jsonb on the database side. */
export interface FaqItemRow {
  question: string;
  answer: string;
}

/** A post joined to its category — the shape the blog index and post pages read. */
export type BlogPostWithCategory = BlogPost & {
  blog_categories: Pick<BlogCategory, "name" | "slug"> | null;
};
