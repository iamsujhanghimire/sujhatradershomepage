import { z } from "zod";

/**
 * Validation schemas shared by apps/web (form submission) and apps/admin
 * (content entry). Defined once here so the two apps cannot disagree about
 * what a valid row looks like — that kind of drift stays invisible until it
 * breaks something in production.
 */

// ─── Shared primitives ───────────────────────────────────────────────────────

const trimmed = (max: number) => z.string().trim().max(max);

export const emailSchema = trimmed(254)
  .min(1, "Email is required")
  .email("Enter a valid email address");

/** SEO budgets from Section 8. Advisory rather than hard limits: an over-long
 *  title still renders, it just gets truncated in the SERP. */
export const META_TITLE_MAX = 60;
export const META_DESCRIPTION_MAX = 160;

export const slugSchema = trimmed(120)
  .min(1, "Slug is required")
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase words separated by hyphens");

// ─── Public forms (Section 10) ───────────────────────────────────────────────

/** Honeypot. A real visitor never sees this field, so anything in it is a bot.
 *  Checked server-side; the response still looks like success so scrapers get
 *  no signal about what tripped. */
export const honeypotSchema = z.string().max(0).optional().or(z.literal(""));

const contactBase = z.object({
  name: trimmed(120).min(1, "Name is required"),
  email: emailSchema,
  company: trimmed(160).optional(),
  country: trimmed(80).optional(),
  website: honeypotSchema,
});

export const quickInquirySchema = contactBase.extend({
  message: trimmed(4000).min(1, "Tell us a little about what you need"),
});

export const rfqSchema = contactBase.extend({
  productType: trimmed(160).min(1, "Product type is required"),
  quantity: z.coerce
    .number()
    .int("Enter a whole number")
    .min(100, "Our MOQ is 100 pieces per style"),
  fabric: trimmed(160).optional(),
  gsm: trimmed(40).optional(),
  printing: z.boolean().default(false),
  printingDetail: trimmed(500).optional(),
  embroidery: z.boolean().default(false),
  embroideryDetail: trimmed(500).optional(),
  labels: trimmed(500).optional(),
  packaging: trimmed(500).optional(),
  targetPrice: trimmed(80).optional(),
  deliveryCountry: trimmed(80).min(1, "Delivery country is required"),
  timeline: trimmed(160).optional(),
  message: trimmed(4000).optional(),
});

export const careersCvSchema = contactBase.extend({
  roleOfInterest: trimmed(160).min(1, "Which role interests you?"),
  message: trimmed(4000).optional(),
});

// ─── Uploads ─────────────────────────────────────────────────────────────────

/** Mirrors the bucket limits in the storage migration. Client-side checks are
 *  a courtesy; the bucket config is the real enforcement. */
export const UPLOAD_LIMITS = {
  techPack: {
    maxBytes: 10 * 1024 * 1024,
    mimeTypes: [
      "image/jpeg",
      "image/png",
      "image/webp",
      "application/pdf",
      "application/zip",
    ],
  },
  cv: {
    maxBytes: 10 * 1024 * 1024,
    mimeTypes: [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
  },
  image: {
    maxBytes: 5 * 1024 * 1024,
    mimeTypes: ["image/jpeg", "image/png", "image/webp", "image/avif"],
  },
} as const;

export function validateUpload(
  file: { size: number; type: string },
  limit: { maxBytes: number; mimeTypes: readonly string[] },
): string | null {
  if (!limit.mimeTypes.includes(file.type)) return "That file type isn't supported";
  if (file.size > limit.maxBytes) {
    return `Please keep files under ${Math.round(limit.maxBytes / 1024 / 1024)}MB`;
  }
  return null;
}

// ─── Admin content ───────────────────────────────────────────────────────────

export const faqItemSchema = z.object({
  question: trimmed(300).min(1, "Question is required"),
  answer: trimmed(2000).min(1, "Answer is required"),
});

export const blogPostSchema = z.object({
  title: trimmed(200).min(1, "Title is required"),
  slug: slugSchema,
  categoryId: z.string().uuid().nullable().optional(),
  body: z.unknown(),
  excerpt: trimmed(500).optional(),
  heroImageUrl: z.string().url().nullable().optional(),
  metaTitle: trimmed(META_TITLE_MAX).optional(),
  metaDescription: trimmed(META_DESCRIPTION_MAX).optional(),
  faqItems: z.array(faqItemSchema).default([]),
  published: z.boolean().default(false),
  publishedAt: z.string().datetime().nullable().optional(),
});

export const designGalleryItemSchema = z.object({
  imageUrl: z.string().url("An image is required"),
  caption: trimmed(300).optional(),
  garmentType: trimmed(120).optional(),
  displayOrder: z.coerce.number().int().default(0),
});

export const careersListingSchema = z.object({
  title: trimmed(160).min(1, "Title is required"),
  department: trimmed(120).optional(),
  description: trimmed(8000).min(1, "Description is required"),
  howToApply: trimmed(2000).optional(),
  employmentType: z
    .enum(["FULL_TIME", "PART_TIME", "CONTRACTOR", "TEMPORARY", "INTERN"])
    .default("FULL_TIME"),
  location: trimmed(160).default("Kathmandu, Nepal"),
  validThrough: z.string().datetime().nullable().optional(),
  isActive: z.boolean().default(false),
});

export const leadershipProfileSchema = z.object({
  name: trimmed(160).min(1, "Name is required"),
  role: trimmed(160).min(1, "Role is required"),
  photoUrl: z.string().url().nullable().optional(),
  bio: trimmed(3000).optional(),
  displayOrder: z.coerce.number().int().default(0),
});

export const departmentSchema = z.object({
  name: trimmed(120).min(1, "Name is required"),
  description: trimmed(3000).optional(),
  headcount: z.coerce.number().int().min(0).nullable().optional(),
  photoUrl: z.string().url().nullable().optional(),
  displayOrder: z.coerce.number().int().default(0),
});

export const adminInviteSchema = z.object({
  email: emailSchema,
  fullName: trimmed(160).optional(),
});

export type QuickInquiryInput = z.infer<typeof quickInquirySchema>;
export type RfqInput = z.infer<typeof rfqSchema>;
export type CareersCvInput = z.infer<typeof careersCvSchema>;
export type BlogPostInput = z.infer<typeof blogPostSchema>;
export type FaqItem = z.infer<typeof faqItemSchema>;
export type DesignGalleryItemInput = z.infer<typeof designGalleryItemSchema>;
export type CareersListingInput = z.infer<typeof careersListingSchema>;
export type LeadershipProfileInput = z.infer<typeof leadershipProfileSchema>;
export type DepartmentInput = z.infer<typeof departmentSchema>;
export type AdminInviteInput = z.infer<typeof adminInviteSchema>;
