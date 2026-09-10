"use client";

import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import {
  calculateSeoScore,
  canManageContent,
  contentStatusLabels,
  contentStatuses,
  type AdminRole,
  type ContentItem,
  type ContentSource,
  type ContentStatus,
} from "@/lib/content-types";

type Suggestion = { slug: string; title: string; tag: string };
type Version = { id: string; version: number; created_at: string; created_by_name: string | null };
type AdminUser = { id: string; name: string; email: string; role: string };
type FormState = {
  slug: string;
  title: string;
  h1: string;
  excerpt: string;
  body: string;
  tag: string;
  status: ContentStatus;
  targetQuery: string;
  intent: string;
  ctaLabel: string;
  ctaHref: string;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  ogImage: string;
  schemaType: string;
  robots: string;
  reviewerId: string;
  authorId: string;
  reviewedAt: string;
  scheduledAt: string;
  sourceIds: string[];
};

const blankForm: FormState = {
  slug: "",
  title: "",
  h1: "",
  excerpt: "",
  body: "",
  tag: "HÄLSA",
  status: "draft",
  targetQuery: "",
  intent: "",
  ctaLabel: "Boka tid",
  ctaHref: "/mottagningar",
  metaTitle: "",
  metaDescription: "",
  canonicalUrl: "",
  ogImage: "/og-image.jpg",
  schemaType: "Article",
  robots: "index,follow",
  reviewerId: "",
  authorId: "",
  reviewedAt: "",
  scheduledAt: "",
  sourceIds: [],
};

function toForm(item: ContentItem): FormState {
  return {
    slug: item.slug,
    title: item.title,
    h1: item.h1,
    excerpt: item.excerpt,
    body: item.body,
    tag: item.tag,
    status: item.status,
    targetQuery: item.targetQuery ?? "",
    intent: item.intent ?? "",
    ctaLabel: item.ctaLabel ?? "",
    ctaHref: item.ctaHref ?? "",
    metaTitle: item.metaTitle ?? "",
    metaDescription: item.metaDescription ?? "",
    canonicalUrl: item.canonicalUrl ?? "",
    ogImage: item.ogImage ?? "",
    schemaType: item.schemaType,
    robots: item.robots,
    reviewerId: item.reviewerId ?? "",
    authorId: item.authorId ?? "",
    reviewedAt: item.reviewedAt ? item.reviewedAt.slice(0, 16) : "",
    scheduledAt: item.scheduledAt ? item.scheduledAt.slice(0, 16) : "",
    sourceIds: item.sources.map((source) => source.id),
  };
}

function toPayload(form: FormState) {
  const isoOrNull = (value: string) => {
    if (!value) return null;
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date.toISOString();
  };
  return {
    ...form,
    targetQuery: form.targetQuery || null,
    intent: form.intent || null,
    ctaLabel: form.ctaLabel || null,
    ctaHref: form.ctaHref || null,
    metaTitle: form.metaTitle || null,
    metaDescription: form.metaDescription || null,
    canonicalUrl: form.canonicalUrl || null,
    ogImage: form.ogImage || null,
    reviewerId: form.reviewerId || null,
    authorId: form.authorId || null,
    reviewedAt: isoOrNull(form.reviewedAt),
    scheduledAt: isoOrNull(form.scheduledAt),
  };
}

function formatDate(value: string | null) {
  if (!value) return "–";
  return new Intl.DateTimeFormat("sv-SE", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

function scoreTone(score: number) {
  if (score >= 80) return "text-emerald-700 bg-emerald-50 border-emerald-200";
  if (score >= 55) return "text-amber-700 bg-amber-50 border-amber-200";
  return "text-red-700 bg-red-50 border-red-200";
}

function mapSourcePayload(row: Record<string, unknown>): ContentSource {
  return {
    id: String(row.id),
    title: String(row.title),
    url: String(row.url),
    publisher: String(row.publisher ?? ""),
    sourceType: String(row.sourceType ?? row.source_type) as ContentSource["sourceType"],
    lastCheckedAt: typeof row.lastCheckedAt === "string" ? row.lastCheckedAt : typeof row.last_checked_at === "string" ? row.last_checked_at : null,
  };
}

export default function ContentWorkspace({ role }: { role: AdminRole }) {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [sources, setSources] = useState<ContentSource[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(blankForm);
  const [filter, setFilter] = useState<ContentStatus | "all">("all");
  const [query, setQuery] = useState("");
  const [preview, setPreview] = useState(false);
  const [versions, setVersions] = useState<Version[]>([]);
  const [sourceDraft, setSourceDraft] = useState({ title: "", url: "", publisher: "", sourceType: "official" });
  const [showSources, setShowSources] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const editable = canManageContent(role);
  const selected = content.find((item) => item.id === selectedId) ?? null;
  const previewItem = useMemo(() => ({
    ...form,
    targetQuery: form.targetQuery || null,
    ctaHref: form.ctaHref || null,
    metaTitle: form.metaTitle || null,
    metaDescription: form.metaDescription || null,
    canonicalUrl: form.canonicalUrl || null,
    ogImage: form.ogImage || null,
    sources: sources.filter((source) => form.sourceIds.includes(source.id)),
  }), [form, sources]);
  const seo = useMemo(() => calculateSeoScore(previewItem), [previewItem]);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const [contentResponse, sourceResponse, usersResponse] = await Promise.all([
        fetch("/api/admin/content", { cache: "no-store" }),
        fetch("/api/admin/content/sources", { cache: "no-store" }),
        fetch("/api/admin/users", { cache: "no-store" }),
      ]);
      const contentPayload = await contentResponse.json();
      const sourcePayload = await sourceResponse.json();
      const usersPayload = await usersResponse.json();
      if (!contentResponse.ok) throw new Error(contentPayload.error ?? "CMS kunde inte hämtas.");
      setContent(contentPayload.content ?? []);
      setSuggestions(contentPayload.suggestions ?? []);
      setSources((sourcePayload.sources ?? []).map((source: Record<string, unknown>) => mapSourcePayload(source)));
      if (usersResponse.ok) setUsers(usersPayload.users ?? []);
      if (selectedId) {
        const refreshed = (contentPayload.content as ContentItem[]).find((item) => item.id === selectedId);
        if (refreshed) setForm(toForm(refreshed));
      }
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "CMS kunde inte hämtas.");
    } finally {
      setIsLoading(false);
    }
  }, [selectedId]);

  useEffect(() => { const timer = window.setTimeout(() => { void load(); }, 0); return () => window.clearTimeout(timer); }, [load]);

  const visibleContent = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("sv-SE");
    return content.filter((item) => {
      if (filter !== "all" && item.status !== filter) return false;
      if (!normalized) return true;
      return [item.title, item.slug, item.targetQuery ?? "", item.tag].some((value) => value.toLocaleLowerCase("sv-SE").includes(normalized));
    });
  }, [content, filter, query]);

  function selectItem(item: ContentItem) {
    setSelectedId(item.id);
    setForm(toForm(item));
    setPreview(false);
    setMessage("");
    setError("");
    void loadVersions(item.id);
  }

  function createNew() {
    setSelectedId(null);
    setForm({ ...blankForm, sourceIds: [] });
    setVersions([]);
    setPreview(false);
    setMessage("");
    setError("");
  }

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function save(event?: FormEvent, formOverride?: FormState) {
    event?.preventDefault();
    if (!editable) return;
    setIsSaving(true);
    setError("");
    setMessage("");
    try {
      const response = await fetch(selectedId ? `/api/admin/content/${selectedId}` : "/api/admin/content", {
        method: selectedId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toPayload(formOverride ?? form)),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error ?? "Innehållet kunde inte sparas.");
      const saved = payload.content as ContentItem;
      setSelectedId(saved.id);
      setForm(toForm(saved));
      setMessage("Sparat och loggat i versionshistoriken.");
      await load();
      await loadVersions(saved.id);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Innehållet kunde inte sparas.");
    } finally {
      setIsSaving(false);
    }
  }

  async function changeStatus(status: ContentStatus) {
    const nextForm = { ...form, status };
    setForm(nextForm);
    await save(undefined, nextForm);
  }

  async function removeContent() {
    if (!selectedId || role !== "admin") return;
    if (!window.confirm("Ta bort innehållet permanent?")) return;
    const response = await fetch(`/api/admin/content/${selectedId}`, { method: "DELETE" });
    if (!response.ok) {
      const payload = await response.json();
      setError(payload.error ?? "Kunde inte ta bort innehållet.");
      return;
    }
    createNew();
    await load();
    setMessage("Innehållet togs bort.");
  }

  async function importLegacy() {
    if (role !== "admin") return;
    setError("");
    const response = await fetch("/api/admin/content/import-legacy", { method: "POST" });
    const payload = await response.json();
    if (!response.ok) {
      setError(payload.error ?? "Befintliga artiklar kunde inte importeras.");
      return;
    }
    setMessage(`${payload.imported} befintliga artiklar importerades som noindex-utkast för granskning.`);
    await load();
  }

  async function loadVersions(id: string) {
    const response = await fetch(`/api/admin/content/${id}/versions`, { cache: "no-store" });
    if (response.ok) setVersions((await response.json()).versions ?? []);
  }

  async function rollback(version: number) {
    if (!selectedId || !editable) return;
    const response = await fetch(`/api/admin/content/${selectedId}/versions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ version }),
    });
    const payload = await response.json();
    if (!response.ok) {
      setError(payload.error ?? "Kunde inte återställa versionen.");
      return;
    }
    setMessage(`Version ${version} återställd som nytt utkast.`);
    await load();
    const refreshedResponse = await fetch(`/api/admin/content/${selectedId}`, { cache: "no-store" });
    if (refreshedResponse.ok) {
      const refreshedPayload = await refreshedResponse.json();
      if (refreshedPayload.content) setForm(toForm(refreshedPayload.content as ContentItem));
    }
    await loadVersions(selectedId);
  }

  async function addSource(event: FormEvent) {
    event.preventDefault();
    setError("");
    const response = await fetch("/api/admin/content/sources", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sourceDraft),
    });
    const payload = await response.json();
    if (!response.ok) {
      setError(payload.error ?? "Källan kunde inte sparas.");
      return;
    }
    const source = mapSourcePayload(payload.source as Record<string, unknown>);
    setSources((current) => [source, ...current.filter((item) => item.id !== source.id)]);
    setForm((current) => ({ ...current, sourceIds: current.sourceIds.includes(source.id) ? current.sourceIds : [...current.sourceIds, source.id] }));
    setSourceDraft({ title: "", url: "", publisher: "", sourceType: "official" });
    setMessage("Källan sparades.");
  }

  const statusCount = (status: ContentStatus) => content.filter((item) => item.status === status).length;

  return (
    <main className="min-h-0 flex-1 overflow-y-auto bg-[#f7f7f8] p-4 sm:p-6">
      <div className="mx-auto max-w-[1500px]">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#c81e70]">SEO-operativsystem</p>
            <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-950">Innehåll</h1>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">Planera, granska, schemalägg och publicera innehåll med källor, SEO-varningar och versionshistorik.</p>
          </div>
          <div className="flex flex-wrap gap-2">{role === "admin" && <button type="button" onClick={() => void importLegacy()} className="min-h-10 rounded-xl border border-slate-200 bg-white px-3 text-xs font-extrabold text-slate-700 hover:bg-slate-50">Importera 143 artiklar</button>}{editable && <button type="button" onClick={createNew} className="btn-cta min-h-10 rounded-xl px-4 text-xs font-extrabold">+ Nytt innehåll</button>}</div>
        </div>

        {error && <div role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">{error}</div>}
        {message && <div role="status" className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">{message}</div>}

        <div className="mt-6 grid gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {contentStatuses.map((status) => <button key={status} type="button" onClick={() => setFilter(status)} className={`rounded-xl border px-3 py-3 text-left transition ${filter === status ? "border-pink-300 bg-pink-50" : "border-slate-200 bg-white hover:border-pink-200"}`}><p className="text-[0.65rem] font-bold uppercase tracking-wide text-slate-500">{contentStatusLabels[status]}</p><p className="mt-1 text-xl font-extrabold text-slate-950">{statusCount(status)}</p></button>)}
          <button type="button" onClick={() => setFilter("all")} className={`rounded-xl border px-3 py-3 text-left transition ${filter === "all" ? "border-pink-300 bg-pink-50" : "border-slate-200 bg-white hover:border-pink-200"}`}><p className="text-[0.65rem] font-bold uppercase tracking-wide text-slate-500">Totalt</p><p className="mt-1 text-xl font-extrabold text-slate-950">{content.length}</p></button>
        </div>

        <div className="mt-6 grid min-h-[600px] gap-5 xl:grid-cols-[350px_minmax(0,1fr)]">
          <section className="min-h-0 rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-4">
              <label className="block text-xs font-bold text-slate-700" htmlFor="content-search">Sök innehåll</label>
              <input id="content-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Titel, slug eller sökord" className="mt-2 min-h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100" />
            </div>
            <div className="max-h-[720px] overflow-y-auto">
              {isLoading ? <p className="p-5 text-sm text-slate-500">Laddar CMS…</p> : visibleContent.length === 0 ? <p className="p-5 text-sm leading-6 text-slate-500">Inget innehåll matchar filtret. Skapa ett utkast eller kör migrationen om databasen är tom.</p> : visibleContent.map((item) => {
                const itemSeo = calculateSeoScore(item);
                return <button key={item.id} type="button" onClick={() => selectItem(item)} className={`w-full border-b border-slate-100 p-4 text-left transition hover:bg-slate-50 ${selectedId === item.id ? "bg-pink-50/60" : ""}`}><div className="flex items-start justify-between gap-2"><span className="truncate text-sm font-extrabold text-slate-900">{item.title}</span><span className={`shrink-0 rounded-full border px-1.5 py-0.5 text-[0.58rem] font-bold ${scoreTone(itemSeo.score)}`}>{itemSeo.score}</span></div><p className="mt-1 truncate text-[0.68rem] text-slate-400">/{item.slug}</p><div className="mt-2 flex items-center justify-between gap-2"><span className="rounded-full bg-slate-100 px-2 py-1 text-[0.62rem] font-bold text-slate-600">{contentStatusLabels[item.status]}</span><span className="text-[0.62rem] text-slate-400">{formatDate(item.updatedAt)}</span></div></button>;
              })}
            </div>
          </section>

          <section className="min-w-0 rounded-2xl border border-slate-200 bg-white shadow-sm">
            {!selectedId && !form.title ? <div className="grid min-h-[600px] place-items-center p-8 text-center"><div><div className="mx-auto grid size-14 place-items-center rounded-2xl bg-pink-50 text-2xl text-[#c81e70]">✎</div><h2 className="mt-4 text-lg font-extrabold text-slate-900">Välj eller skapa innehåll</h2><p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">Alla ändringar sparas i databasen och får en versionspost. SEO-score ger varningar, men ersätter inte medicinsk granskning.</p></div></div> : <form onSubmit={save}>
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-4 sm:p-5"><div><p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">{selected ? "Redigerar innehåll" : "Nytt utkast"}</p><h2 className="mt-1 text-lg font-extrabold text-slate-950">{form.title || "Namnlöst innehåll"}</h2></div><div className="flex flex-wrap items-center gap-2"><span className={`rounded-full border px-2.5 py-1 text-[0.65rem] font-extrabold ${scoreTone(seo.score)}`}>SEO {seo.score}/100</span><button type="button" onClick={() => setPreview((current) => !current)} className="min-h-9 rounded-lg border border-slate-200 px-3 text-xs font-bold text-slate-700 hover:bg-slate-50">{preview ? "Redigera" : "Förhandsgranska"}</button>{role === "admin" && selectedId && <button type="button" onClick={removeContent} className="min-h-9 rounded-lg border border-red-200 px-3 text-xs font-bold text-red-700 hover:bg-red-50">Ta bort</button>}</div></div>

              {preview ? <Preview item={previewItem} /> : <div className="grid gap-6 p-4 sm:p-5 2xl:grid-cols-[minmax(0,1fr)_310px]">
                <div className="space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2"><Field label="Titel" value={form.title} onChange={(value) => updateField("title", value)} disabled={!editable && role !== "medical_reviewer"} maxLength={180} /><Field label="Slug" hint="a-z, 0-9 och bindestreck" value={form.slug} onChange={(value) => updateField("slug", value)} disabled={Boolean(selectedId) || !editable} maxLength={120} /></div>
                  <Field label="H1" value={form.h1} onChange={(value) => updateField("h1", value)} disabled={!editable} maxLength={180} />
                  <div className="grid gap-4 sm:grid-cols-2"><Field label="Etikett" value={form.tag} onChange={(value) => updateField("tag", value)} disabled={!editable} maxLength={60} /><Field label="Målsökord" value={form.targetQuery} onChange={(value) => updateField("targetQuery", value)} disabled={!editable} maxLength={160} /></div>
                  <Field label="Ingress" value={form.excerpt} onChange={(value) => updateField("excerpt", value)} disabled={!editable} maxLength={320} textarea />
                  <Field label="Brödtext" hint="Vanlig text eller Markdown; inga osanerade HTML-taggar" value={form.body} onChange={(value) => updateField("body", value)} disabled={!editable} textarea rows={16} />
                  <div className="grid gap-4 sm:grid-cols-2"><Field label="CTA-text" value={form.ctaLabel} onChange={(value) => updateField("ctaLabel", value)} disabled={!editable} maxLength={100} /><Field label="CTA-länk" value={form.ctaHref} onChange={(value) => updateField("ctaHref", value)} disabled={!editable} maxLength={500} /></div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4"><div className="flex items-center justify-between gap-3"><div><p className="text-xs font-extrabold text-slate-900">Källor</p><p className="mt-1 text-[0.68rem] leading-5 text-slate-500">Välj primära eller officiella källor och kontrollera dem på nytt vid medicinska ändringar.</p></div>{editable && <button type="button" onClick={() => setShowSources((current) => !current)} className="min-h-8 rounded-lg border border-slate-200 bg-white px-2.5 text-[0.68rem] font-bold text-slate-700">{showSources ? "Stäng bibliotek" : "Hantera bibliotek"}</button>}</div><div className="mt-3 grid gap-2 sm:grid-cols-2">{sources.map((source) => <label key={source.id} className="flex items-start gap-2 rounded-lg border border-slate-200 bg-white p-2.5 text-xs"><input type="checkbox" checked={form.sourceIds.includes(source.id)} onChange={(event) => updateField("sourceIds", event.target.checked ? [...form.sourceIds, source.id] : form.sourceIds.filter((id) => id !== source.id))} disabled={!editable} className="mt-0.5 accent-pink-600" /><span><span className="block font-bold text-slate-800">{source.title}</span><span className="mt-0.5 block truncate text-[0.62rem] text-slate-400">{source.publisher || source.url}</span></span></label>)}{sources.length === 0 && <p className="text-xs text-slate-500">Inga källor ännu.</p>}</div>{showSources && <div className="mt-4 border-t border-slate-200 pt-4"><p className="text-xs font-extrabold text-slate-800">Lägg till källa</p><div className="mt-2 grid gap-2 sm:grid-cols-2"><input value={sourceDraft.title} onChange={(event) => setSourceDraft({ ...sourceDraft, title: event.target.value })} placeholder="Titel" className="min-h-9 rounded-lg border border-slate-200 px-3 text-xs" /><input value={sourceDraft.url} onChange={(event) => setSourceDraft({ ...sourceDraft, url: event.target.value })} placeholder="https://…" type="url" className="min-h-9 rounded-lg border border-slate-200 px-3 text-xs" /><input value={sourceDraft.publisher} onChange={(event) => setSourceDraft({ ...sourceDraft, publisher: event.target.value })} placeholder="Utgivare" className="min-h-9 rounded-lg border border-slate-200 px-3 text-xs" /><button type="button" onClick={(event) => void addSource(event as unknown as React.FormEvent)} disabled={!sourceDraft.title || !sourceDraft.url} className="min-h-9 rounded-lg bg-slate-900 px-3 text-xs font-bold text-white disabled:opacity-40">Spara källa</button></div></div>}</div>
                </div>

                <aside className="space-y-4"><div className="rounded-xl border border-slate-200 bg-white p-4"><p className="text-xs font-extrabold text-slate-900">Publiceringsflöde</p><select value={form.status} onChange={(event) => void changeStatus(event.target.value as ContentStatus)} disabled={!editable && role !== "medical_reviewer"} className="mt-3 min-h-10 w-full rounded-lg border border-slate-200 px-3 text-xs font-bold"><option value="draft">Utkast</option>{contentStatuses.filter((status) => status !== "draft").map((status) => <option key={status} value={status}>{contentStatusLabels[status]}</option>)}</select><p className="mt-2 text-[0.66rem] leading-5 text-slate-500">Publicering kräver status Klar att publicera. Admin kan göra undantag; medicinskt innehåll ska alltid ha granskare och källa.</p><div className="mt-3 grid gap-2">{["seo_review", "medical_review", "legal_privacy_review", "ready"].map((status) => <button key={status} type="button" onClick={() => void changeStatus(status as ContentStatus)} disabled={!editable && !(role === "medical_reviewer" && ["medical_review", "ready"].includes(status))} className="min-h-9 rounded-lg border border-slate-200 px-3 text-left text-[0.68rem] font-bold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40">→ {contentStatusLabels[status as ContentStatus]}</button>)}</div>{editable && <button type="submit" disabled={isSaving} className="btn-cta mt-3 min-h-10 w-full rounded-lg px-3 text-xs font-extrabold">{isSaving ? "Sparar…" : selectedId ? "Spara ändringar" : "Skapa utkast"}</button>}</div>
                  <div className="rounded-xl border border-slate-200 bg-white p-4"><div className="flex items-center justify-between gap-3"><p className="text-xs font-extrabold text-slate-900">SEO-varningar</p><span className={`rounded-full border px-2 py-0.5 text-[0.62rem] font-extrabold ${scoreTone(seo.score)}`}>{seo.bodyWords} ord</span></div><ul className="mt-3 space-y-2">{seo.checks.map((check) => <li key={check.label} className="flex gap-2 text-[0.68rem] leading-5"><span className={check.ok ? "text-emerald-600" : "text-amber-600"}>{check.ok ? "✓" : "!"}</span><span className={check.ok ? "text-slate-600" : "font-semibold text-amber-800"}>{check.label}: {check.detail}</span></li>)}</ul></div>
                  <div className="rounded-xl border border-slate-200 bg-white p-4"><p className="text-xs font-extrabold text-slate-900">Internlänksförslag</p><p className="mt-1 text-[0.66rem] leading-5 text-slate-500">Länka bara när det hjälper läsaren och sidan är relevant.</p><div className="mt-3 space-y-2">{suggestions.filter((item) => item.slug !== form.slug).slice(0, 6).map((item) => <button key={item.slug} type="button" onClick={() => updateField("body", `${form.body}\n\n[${item.title}](/aktuellt/${item.slug})`)} disabled={!editable} className="block w-full truncate rounded-lg bg-slate-50 px-2.5 py-2 text-left text-[0.66rem] font-bold text-slate-700 hover:bg-pink-50 disabled:opacity-50">+ {item.title}</button>)}{suggestions.length === 0 && <p className="text-xs text-slate-500">Publicerade sidor visas här när de finns.</p>}</div></div>
                  {versions.length > 0 && <div className="rounded-xl border border-slate-200 bg-white p-4"><p className="text-xs font-extrabold text-slate-900">Versionshistorik</p><div className="mt-3 space-y-2">{versions.map((version) => <div key={version.id} className="flex items-center justify-between gap-2 rounded-lg bg-slate-50 px-2.5 py-2"><span><span className="block text-[0.68rem] font-bold text-slate-700">Version {version.version}</span><span className="block text-[0.6rem] text-slate-400">{formatDate(version.created_at)} · {version.created_by_name ?? "Okänd"}</span></span>{editable && <button type="button" onClick={() => void rollback(version.version)} className="text-[0.62rem] font-bold text-[#c81e70]">Återställ</button>}</div>)}</div></div>}
                  <div className="rounded-xl border border-slate-200 bg-white p-4"><p className="text-xs font-extrabold text-slate-900">Ansvariga</p><div className="mt-3 space-y-2"><label className="block text-[0.68rem] font-bold text-slate-600">Författare<select value={form.authorId} onChange={(event) => updateField("authorId", event.target.value)} disabled={!editable} className="mt-1 min-h-9 w-full rounded-lg border border-slate-200 bg-white px-2 text-xs"><option value="">Välj författare</option>{users.map((user) => <option key={user.id} value={user.id}>{user.name} · {user.role}</option>)}</select></label><label className="block text-[0.68rem] font-bold text-slate-600">Medicinsk granskare<select value={form.reviewerId} onChange={(event) => updateField("reviewerId", event.target.value)} disabled={!editable && role !== "medical_reviewer"} className="mt-1 min-h-9 w-full rounded-lg border border-slate-200 bg-white px-2 text-xs"><option value="">Välj granskare</option>{users.filter((user) => ["admin", "editor", "medical_reviewer"].includes(user.role)).map((user) => <option key={user.id} value={user.id}>{user.name} · {user.role}</option>)}</select></label><label className="block text-[0.68rem] font-bold text-slate-600">Publiceringsdatum <input type="datetime-local" value={form.scheduledAt} onChange={(event) => updateField("scheduledAt", event.target.value)} disabled={!editable} className="mt-1 min-h-9 w-full rounded-lg border border-slate-200 bg-white px-2 text-xs" /></label></div></div>
                </aside>
              </div>}
            </form>}
          </section>
        </div>
      </div>
    </main>
  );
}

function Field({ label, hint, value, onChange, disabled, maxLength, textarea, rows = 3 }: { label: string; hint?: string; value: string; onChange: (value: string) => void; disabled?: boolean; maxLength?: number; textarea?: boolean; rows?: number }) {
  return <label className="block"><span className="flex items-baseline justify-between gap-3 text-xs font-bold text-slate-700"><span>{label}</span>{hint && <span className="text-[0.6rem] font-medium text-slate-400">{hint}</span>}</span>{textarea ? <textarea value={value} onChange={(event) => onChange(event.target.value)} disabled={disabled} maxLength={maxLength} rows={rows} className="mt-2 w-full resize-y rounded-xl border border-slate-200 px-3 py-2.5 text-sm leading-6 text-slate-900 outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100 disabled:cursor-not-allowed disabled:bg-slate-50" /> : <input value={value} onChange={(event) => onChange(event.target.value)} disabled={disabled} maxLength={maxLength} className="mt-2 min-h-10 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-900 outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100 disabled:cursor-not-allowed disabled:bg-slate-50" />}</label>;
}

function Preview({ item }: { item: { tag: string; h1: string; title: string; excerpt: string; body: string; ctaHref: string | null; ctaLabel: string; sources: ContentSource[] } }) {
  return <article className="mx-auto max-w-3xl p-6 sm:p-10"><div className="flex items-center gap-2"><span className="rounded-full bg-pink-600 px-3 py-1 text-[0.65rem] font-bold text-white">{item.tag}</span><span className="text-xs text-slate-400">Förhandsvisning</span></div><h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950">{item.h1 || item.title || "Rubrik saknas"}</h1>{item.excerpt && <p className="mt-4 text-lg leading-8 text-slate-600">{item.excerpt}</p>}<div className="prose prose-slate mt-8 max-w-none text-sm leading-7">{item.body.split(/\n{2,}/).filter(Boolean).map((paragraph, index) => <p key={`${index}-${paragraph.slice(0, 12)}`}>{paragraph}</p>)}</div>{item.ctaHref && <a href={item.ctaHref} className="btn-cta mt-8 inline-flex min-h-11 items-center rounded-xl px-5 text-sm font-extrabold">{item.ctaLabel || "Läs mer"}</a>}<div className="mt-10 border-t border-slate-200 pt-5 text-xs text-slate-500"><p className="font-bold text-slate-700">Källor ({item.sources.length})</p>{item.sources.map((source) => <a key={source.id} href={source.url} target="_blank" rel="noreferrer" className="mt-1 block text-[#c81e70] hover:underline">{source.title}</a>)}</div></article>;
}
