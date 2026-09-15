import type { ContentItem, ContentMetric, ContentSource, ContentStatus } from "@/lib/content-types";
import { getSql } from "@/lib/db";

const MIN_PUBLISHED_AT = "2026-04-09";

type Row = Record<string, unknown>;

function nullableString(value: unknown) {
  return typeof value === "string" && value.length > 0 ? value : null;
}

function nullableDate(value: unknown) {
  return value instanceof Date ? value.toISOString() : nullableString(value);
}

function numberValue(value: unknown) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

export function mapSource(row: Row): ContentSource {
  return {
    id: String(row.id),
    title: String(row.title),
    url: String(row.url),
    publisher: String(row.publisher ?? ""),
    sourceType: String(row.source_type) as ContentSource["sourceType"],
    lastCheckedAt: nullableDate(row.last_checked_at),
  };
}

export function mapMetric(row: Row | null | undefined): ContentMetric | null {
  if (!row) return null;
  return {
    metricDate: String(row.metric_date),
    impressions: numberValue(row.impressions),
    clicks: numberValue(row.clicks),
    ctr: numberValue(row.ctr),
    averagePosition: numberValue(row.average_position),
    conversions: numberValue(row.conversions),
    conversionRate: numberValue(row.conversion_rate),
  };
}

export function mapContent(row: Row, sources: ContentSource[] = []): ContentItem {
  return {
    id: String(row.id),
    slug: String(row.slug),
    title: String(row.title),
    h1: String(row.h1),
    excerpt: String(row.excerpt ?? ""),
    body: String(row.body ?? ""),
    tag: String(row.tag ?? "HÄLSA"),
    status: String(row.status) as ContentStatus,
    targetQuery: nullableString(row.target_query),
    intent: nullableString(row.intent),
    ctaLabel: nullableString(row.cta_label),
    ctaHref: nullableString(row.cta_href),
    metaTitle: nullableString(row.meta_title),
    metaDescription: nullableString(row.meta_description),
    canonicalUrl: nullableString(row.canonical_url),
    ogImage: nullableString(row.og_image),
    schemaType: String(row.schema_type ?? "Article"),
    robots: String(row.robots ?? "index,follow"),
    authorId: nullableString(row.author_id),
    reviewerId: nullableString(row.reviewer_id),
    authorName: nullableString(row.author_name),
    reviewerName: nullableString(row.reviewer_name),
    reviewedAt: nullableDate(row.reviewed_at),
    scheduledAt: nullableDate(row.scheduled_at),
    publishedAt: nullableDate(row.published_at),
    createdAt: nullableDate(row.created_at) ?? new Date(0).toISOString(),
    updatedAt: nullableDate(row.updated_at) ?? new Date(0).toISOString(),
    sources,
    latestMetrics: mapMetric(row),
    versionCount: numberValue(row.version_count),
  };
}

const itemColumns = `
  c.id, c.slug, c.title, c.h1, c.excerpt, c.body, c.tag, c.status,
  c.target_query, c.intent, c.cta_label, c.cta_href, c.meta_title,
  c.meta_description, c.canonical_url, c.og_image, c.schema_type, c.robots,
  c.author_id, c.reviewer_id, author.name as author_name, reviewer.name as reviewer_name,
  c.reviewed_at, c.scheduled_at, c.published_at, c.created_at, c.updated_at,
  (select count(*) from content_versions v where v.content_id = c.id) as version_count,
  metrics.metric_date, metrics.impressions, metrics.clicks, metrics.ctr,
  metrics.average_position, metrics.conversions, metrics.conversion_rate
`;

export async function queryContentItems(status?: ContentStatus) {
  const sql = getSql();
  if (status) {
    return sql.query(`
      select ${itemColumns}
      from content_items c
      left join admin_users author on author.id = c.author_id
      left join admin_users reviewer on reviewer.id = c.reviewer_id
      left join lateral (
        select * from content_metrics m where m.content_id = c.id order by m.metric_date desc limit 1
      ) metrics on true
      where c.status = $1
      order by c.updated_at desc
      limit 500
    `, [status]);
  }
  return sql.query(`
    select ${itemColumns}
    from content_items c
    left join admin_users author on author.id = c.author_id
    left join admin_users reviewer on reviewer.id = c.reviewer_id
    left join lateral (
      select * from content_metrics m where m.content_id = c.id order by m.metric_date desc limit 1
    ) metrics on true
    order by c.updated_at desc
    limit 500
  `, []);
}

export async function queryContentById(id: string) {
  const sql = getSql();
  const rows = await sql.query(`
    select ${itemColumns}
    from content_items c
    left join admin_users author on author.id = c.author_id
    left join admin_users reviewer on reviewer.id = c.reviewer_id
    left join lateral (
      select * from content_metrics m where m.content_id = c.id order by m.metric_date desc limit 1
    ) metrics on true
    where c.id = $1::uuid
    limit 1
  `, [id]);
  return rows[0] as Row | undefined;
}

export async function querySourcesForContent(contentId: string) {
  const sql = getSql();
  return sql.query(`
    select s.id, s.title, s.url, s.publisher, s.source_type, s.last_checked_at
    from content_sources s
    join content_source_links l on l.source_id = s.id
    where l.content_id = $1::uuid
    order by s.title asc
  `, [contentId]);
}

export async function queryPublishedContentBySlug(slug: string) {
  const row = await queryContentBySlug(slug);
  return row;
}

async function queryContentBySlug(slug: string) {
  const sql = getSql();
  const rows = await sql.query(`
    select ${itemColumns}
    from content_items c
    left join admin_users author on author.id = c.author_id
    left join admin_users reviewer on reviewer.id = c.reviewer_id
    left join lateral (
      select * from content_metrics m where m.content_id = c.id order by m.metric_date desc limit 1
    ) metrics on true
    where c.slug = $1 and c.status = 'published' and c.published_at >= date '${MIN_PUBLISHED_AT}'
    limit 1
  `, [slug]);
  if (!rows[0]) return null;
  const sources = await querySourcesForContent(String((rows[0] as Row).id));
  return mapContent(rows[0] as Row, sources.map((source) => mapSource(source as Row)));
}

export async function queryPublishedContent() {
  const rows = (await queryContentItems("published")).filter((row) => {
    const publishedAt = (row as Row).published_at;
    return publishedAt && new Date(String(publishedAt)) >= new Date(`${MIN_PUBLISHED_AT}T00:00:00Z`);
  });
  const mapped = await Promise.all(rows.map(async (row) => {
    const item = row as Row;
    const sources = await querySourcesForContent(String(item.id));
    return mapContent(item, sources.map((source) => mapSource(source as Row)));
  }));
  return mapped;
}

export async function getPublishedContentSafe() {
  try {
    return await queryPublishedContent();
  } catch {
    return [];
  }
}

export async function getPublishedContentBySlugSafe(slug: string) {
  try {
    return await queryPublishedContentBySlug(slug);
  } catch {
    return null;
  }
}

export async function getPublishedContentSlugsSafe() {
  try {
    const sql = getSql();
    const rows = await sql`select slug from content_items where status = 'published' and published_at >= ${MIN_PUBLISHED_AT}::date order by published_at desc`;
    return rows.map((row) => String(row.slug));
  } catch {
    return [];
  }
}
