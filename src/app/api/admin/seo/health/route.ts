import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { getSql } from "@/lib/db";

type LinkTarget = { contentId: string; slug: string; kind: "link" | "image"; target: string };

function errorResponse(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

function extractTargets(contentId: string, slug: string, body: string, ogImage: string | null): LinkTarget[] {
  const targets: LinkTarget[] = [];
  const seen = new Set<string>();
  const add = (kind: LinkTarget["kind"], target: string) => {
    const value = target.trim();
    if (!value || value.startsWith("#") || value.startsWith("mailto:") || value.startsWith("tel:")) return;
    let parsed: URL;
    try {
      parsed = new URL(value, "https://hemlakare.se");
    } catch {
      return;
    }
    if (parsed.origin !== "https://hemlakare.se") return;
    const normalized = `${kind}:${parsed.pathname}${parsed.search}`;
    if (seen.has(normalized)) return;
    seen.add(normalized);
    targets.push({ contentId, slug, kind, target: `${parsed.pathname}${parsed.search}` });
  };
  for (const match of body.matchAll(/!\[[^\]]*\]\(([^)\s]+)[^)]*\)/g)) add("image", match[1]);
  for (const match of body.matchAll(/\[[^\]]+\]\(([^)\s]+)[^)]*\)/g)) add("link", match[1]);
  for (const match of body.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)) add("image", match[1]);
  for (const match of body.matchAll(/(?:href|src)=["']([^"']+)["']/gi)) add("link", match[1]);
  if (ogImage) add("image", ogImage);
  return targets;
}

async function checkTarget(target: LinkTarget) {
  const url = `https://hemlakare.se${target.target}`;
  try {
    const response = await fetch(url, { method: "HEAD", redirect: "manual", signal: AbortSignal.timeout(4000) });
    return { ...target, status: response.status, ok: response.ok };
  } catch {
    return { ...target, status: 0, ok: false };
  }
}

export async function POST() {
  const session = await getAdminSession();
  if (!session) return errorResponse("Obehörig", 401);
  try {
    const sql = getSql();
    const rows = await sql`select id, slug, body, og_image from content_items order by updated_at desc limit 500`;
    const targets = rows.flatMap((row) => extractTargets(String(row.id), String(row.slug), String(row.body ?? ""), typeof row.og_image === "string" ? row.og_image : null)).slice(0, 100);
    const checked = await Promise.all(targets.map(checkTarget));
    const broken = checked.filter((item) => !item.ok);
    await sql`
      insert into audit_events (actor_id, action, entity_type, metadata)
      values (${session.id}::uuid, 'seo_health_check', 'content', ${JSON.stringify({ checked: checked.length, broken: broken.length })}::jsonb)
    `;
    return NextResponse.json({ checked: checked.length, broken, checkedAt: new Date().toISOString() });
  } catch {
    return errorResponse("SEO-kontrollen kunde inte köras. Kör CMS-migrationen i Neon.", 503);
  }
}
