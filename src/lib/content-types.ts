import { z } from "zod";

export const contentStatuses = [
  "draft",
  "seo_review",
  "medical_review",
  "legal_privacy_review",
  "ready",
  "scheduled",
  "published",
  "noindex",
] as const;

export type ContentStatus = (typeof contentStatuses)[number];
export type AdminRole = "admin" | "editor" | "medical_reviewer" | "staff";

export const contentStatusLabels: Record<ContentStatus, string> = {
  draft: "Utkast",
  seo_review: "SEO-granskning",
  medical_review: "Medicinsk granskning",
  legal_privacy_review: "Juridik/integritet",
  ready: "Klar att publicera",
  scheduled: "Schemalagd",
  published: "Publicerad",
  noindex: "Noindex",
};

export const contentWriteSchema = z.object({
  slug: z.string().trim().min(1).max(120).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Sluggen får bara innehålla a-z, 0-9 och bindestreck."),
  title: z.string().trim().min(1).max(180),
  h1: z.string().trim().min(1).max(180),
  excerpt: z.string().trim().max(320).default(""),
  body: z.string().trim().min(1).max(100_000),
  tag: z.string().trim().min(1).max(60).default("HÄLSA"),
  status: z.enum(contentStatuses).default("draft"),
  targetQuery: z.string().trim().max(160).nullable().optional(),
  intent: z.string().trim().max(80).nullable().optional(),
  ctaLabel: z.string().trim().max(100).nullable().optional(),
  ctaHref: z.string().trim().max(500).nullable().optional(),
  metaTitle: z.string().trim().max(180).nullable().optional(),
  metaDescription: z.string().trim().max(320).nullable().optional(),
  canonicalUrl: z.string().trim().url().max(500).nullable().optional(),
  ogImage: z.string().trim().max(500).nullable().optional(),
  schemaType: z.string().trim().min(1).max(80).default("Article"),
  robots: z.string().trim().min(1).max(120).default("index,follow"),
  authorId: z.string().uuid().nullable().optional(),
  reviewerId: z.string().uuid().nullable().optional(),
  reviewedAt: z.string().datetime().nullable().optional(),
  scheduledAt: z.string().datetime().nullable().optional(),
  sourceIds: z.array(z.string().uuid()).max(30).default([]),
});

export type ContentWrite = z.infer<typeof contentWriteSchema>;

export type ContentSource = {
  id: string;
  title: string;
  url: string;
  publisher: string;
  sourceType: "primary" | "official" | "research" | "guideline" | "other";
  lastCheckedAt: string | null;
};

export type ContentMetric = {
  metricDate: string;
  impressions: number;
  clicks: number;
  ctr: number;
  averagePosition: number;
  conversions: number;
  conversionRate: number;
};

export type ContentItem = {
  id: string;
  slug: string;
  title: string;
  h1: string;
  excerpt: string;
  body: string;
  tag: string;
  status: ContentStatus;
  targetQuery: string | null;
  intent: string | null;
  ctaLabel: string | null;
  ctaHref: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  canonicalUrl: string | null;
  ogImage: string | null;
  schemaType: string;
  robots: string;
  authorId: string | null;
  reviewerId: string | null;
  authorName: string | null;
  reviewerName: string | null;
  reviewedAt: string | null;
  scheduledAt: string | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  sources: ContentSource[];
  latestMetrics: ContentMetric | null;
  versionCount: number;
};

export type SeoCheck = { label: string; ok: boolean; detail: string };

export function calculateSeoScore(item: Pick<ContentItem, "title" | "h1" | "body" | "excerpt" | "metaTitle" | "metaDescription" | "canonicalUrl" | "ctaHref" | "sources" | "targetQuery" | "ogImage" | "schemaType">) {
  const bodyWords = item.body.trim().split(/\s+/).filter(Boolean).length;
  const checks: SeoCheck[] = [
    { label: "H1", ok: Boolean(item.h1.trim()), detail: item.h1.trim() ? "H1 finns" : "Lägg till en tydlig H1" },
    { label: "Title", ok: Boolean(item.metaTitle?.trim() || item.title.trim()), detail: item.metaTitle?.trim() || item.title.trim() ? "Title finns" : "Meta title saknas" },
    { label: "Meta description", ok: Boolean(item.metaDescription?.trim() || item.excerpt.trim()), detail: item.metaDescription?.trim() || item.excerpt.trim() ? "Beskrivning finns" : "Meta description saknas" },
    { label: "Längd", ok: bodyWords >= 450, detail: `${bodyWords} ord (varningsnivå under 450)` },
    { label: "CTA", ok: Boolean(item.ctaHref?.trim()), detail: item.ctaHref?.trim() ? "Konverteringslänk finns" : "Lägg till CTA-länk" },
    { label: "Källor", ok: item.sources.length > 0, detail: item.sources.length > 0 ? `${item.sources.length} källa/källor` : "Minst en källa krävs för vårdinnehåll" },
    { label: "Canonical", ok: Boolean(item.canonicalUrl?.trim()), detail: item.canonicalUrl?.trim() ? "Canonical finns" : "Canonical saknas" },
    { label: "Schema", ok: Boolean(item.schemaType.trim()), detail: item.schemaType.trim() ? item.schemaType : "Schema-typ saknas" },
    { label: "OG-bild", ok: Boolean(item.ogImage?.trim()), detail: item.ogImage?.trim() ? "OG-bild finns" : "OG-bild saknas" },
    { label: "Sökintention", ok: Boolean(item.targetQuery?.trim()), detail: item.targetQuery?.trim() ? "Målsökord finns" : "Målsökord saknas" },
  ];
  const passed = checks.filter((check) => check.ok).length;
  return { score: Math.round((passed / checks.length) * 100), checks, bodyWords };
}

export function canManageContent(role: AdminRole) {
  return role === "admin" || role === "editor";
}

export function canReviewMedical(role: AdminRole) {
  return role === "admin" || role === "editor" || role === "medical_reviewer";
}

export function canManageSources(role: AdminRole) {
  return role === "admin" || role === "editor" || role === "medical_reviewer";
}

export function isContentStatus(value: unknown): value is ContentStatus {
  return typeof value === "string" && (contentStatuses as readonly string[]).includes(value);
}
