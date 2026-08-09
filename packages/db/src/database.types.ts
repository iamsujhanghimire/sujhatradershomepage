/**
 * Database types.
 *
 * ⚠️ Hand-authored to match supabase/migrations/*.sql so both apps can be typed
 * before a local Supabase instance exists. Regenerate from the migrations —
 * which are the source of truth — as soon as Docker is available:
 *
 *   pnpm db:start && pnpm db:types
 *
 * That overwrites this file with generated output. Until then, treat any
 * mismatch between this file and the migrations as a bug in this file.
 */

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type InquiryType = "quick" | "rfq" | "careers_cv";
export type InquiryStatus = "new" | "read" | "archived";
export type EmploymentType =
  | "FULL_TIME"
  | "PART_TIME"
  | "CONTRACTOR"
  | "TEMPORARY"
  | "INTERN";

type Timestamps = {
  created_at: string;
  updated_at: string;
}

export type Profile = Timestamps & {
  id: string;
  email: string;
  full_name: string | null;
  is_admin: boolean;
  invited_by: string | null;
}

export type BlogCategory = {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export type BlogPost = Timestamps & {
  id: string;
  title: string;
  slug: string;
  category_id: string | null;
  body: Json;
  excerpt: string | null;
  hero_image_url: string | null;
  meta_title: string | null;
  meta_description: string | null;
  faq_items: Json;
  published: boolean;
  published_at: string | null;
}

export type DesignGalleryItem = Timestamps & {
  id: string;
  image_url: string;
  caption: string | null;
  garment_type: string | null;
  display_order: number;
}

export type CareersListing = Timestamps & {
  id: string;
  title: string;
  department: string | null;
  description: string;
  how_to_apply: string | null;
  employment_type: EmploymentType;
  location: string;
  valid_through: string | null;
  is_active: boolean;
}

export type LeadershipProfile = Timestamps & {
  id: string;
  name: string;
  role: string;
  photo_url: string | null;
  bio: string | null;
  display_order: number;
}

export type Department = Timestamps & {
  id: string;
  name: string;
  description: string | null;
  headcount: number | null;
  photo_url: string | null;
  display_order: number;
}

export type Inquiry = Timestamps & {
  id: string;
  type: InquiryType;
  name: string;
  email: string;
  company: string | null;
  country: string | null;
  message: string | null;
  details: Json;
  uploaded_file_path: string | null;
  status: InquiryStatus;
}

type Row<T> = {
  Row: T;
  Insert: Partial<T>;
  Update: Partial<T>;
  Relationships: [];
};

export type Database = {
  public: {
    Tables: {
      profiles: Row<Profile>;
      blog_categories: Row<BlogCategory>;
      blog_posts: Row<BlogPost>;
      design_gallery_items: Row<DesignGalleryItem>;
      careers_listings: Row<CareersListing>;
      leadership_profiles: Row<LeadershipProfile>;
      departments: Row<Department>;
      inquiries: Row<Inquiry>;
    };
    Views: Record<never, never>;
    Functions: {
      is_admin: {
        Args: Record<string, never>;
        Returns: boolean;
      };
    };
    Enums: {
      inquiry_type: InquiryType;
      inquiry_status: InquiryStatus;
    };
    CompositeTypes: Record<never, never>;
  };
}
