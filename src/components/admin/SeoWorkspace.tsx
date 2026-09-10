"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import type { AdminRole } from "@/lib/content-types";

type SeoSummary = {
  statusCounts: Array<{ status: string; count: number }>;
  totals: { impressions: number; clicks: number; conversions: number; ctr: number; conversion_rate: number };
  pages: Array<{ id: string; slug: string; title: string; status: string; target_query: string | null; metric_date: string | null; impressions: number | null; clicks: number | null; ctr: number | null; average_position: number | null; conversions: number | null; conversion_rate: number | null }>;
  recentMetrics: Array<{ metric_date: string; impressions: number; clicks: number; conversions: number }>;
};

type BrokenLink = { slug: string; kind: "link" | "image"; target: string; status: number };

const emptySummary: SeoSummary = { statusCounts: [], totals: { impressions: 0, clicks: 0, conversions: 0, ctr: 0, conversion_rate: 0 }, pages: [], recentMetrics: [] };

export default function SeoWorkspace({ role }: { role: AdminRole }) {
  const [summary, setSummary] = useState<SeoSummary>(emptySummary);
  const [broken, setBroken] = useState<BrokenLink[]>([]);
  const [importText, setImportText] = useState("");
  const [showImport, setShowImport] = useState(false);
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/seo/summary", { cache: "no-store" });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error ?? "SEO-statistik kunde inte hämtas.");
      setSummary(payload);
      setError("");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "SEO-statistik kunde inte hämtas.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { const timer = window.setTimeout(() => { void load(); }, 0); return () => window.clearTimeout(timer); }, [load]);

  async function runHealthCheck() {
    setChecking(true);
    setError("");
    const response = await fetch("/api/admin/seo/health", { method: "POST" });
    const payload = await response.json();
    if (!response.ok) setError(payload.error ?? "SEO-kontrollen kunde inte köras.");
    else {
      setBroken(payload.broken ?? []);
      setMessage(`Kontrollerade ${payload.checked} interna länkar och bilder.`);
    }
    setChecking(false);
  }

  async function importMetrics(event: FormEvent) {
    event.preventDefault();
    setError("");
    try {
      const parsed = JSON.parse(importText);
      const response = await fetch("/api/admin/seo/metrics", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(parsed) });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error ?? "Statistiken kunde inte importeras.");
      setMessage(`${payload.imported} mätvärden importerades.`);
      setImportText("");
      setShowImport(false);
      await load();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "JSON-formatet är ogiltigt.");
    }
  }

  const hasMetrics = summary.totals.impressions > 0 || summary.totals.clicks > 0;
  const published = summary.statusCounts.find((item) => item.status === "published")?.count ?? 0;
  const indexed = summary.statusCounts.filter((item) => !["noindex", "draft"].includes(item.status)).reduce((total, item) => total + item.count, 0);

  return <main className="min-h-0 flex-1 overflow-y-auto bg-[#f7f7f8] p-4 sm:p-6"><div className="mx-auto max-w-[1500px]"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#c81e70]">SEO & Search Console</p><h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-950">Mätning och hälsa</h1><p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">Här syns bara data som importerats från Search Console eller konverteringskällor. Inga siffror fylls i automatiskt utan underlag.</p></div><div className="flex flex-wrap gap-2"><button type="button" onClick={() => void runHealthCheck()} disabled={checking} className="min-h-10 rounded-xl border border-slate-200 bg-white px-3 text-xs font-extrabold text-slate-700 hover:bg-slate-50 disabled:opacity-50">{checking ? "Kontrollerar…" : "Kör länk-/bildkontroll"}</button>{(role === "admin" || role === "editor") && <button type="button" onClick={() => setShowImport((current) => !current)} className="btn-cta min-h-10 rounded-xl px-3 text-xs font-extrabold">{showImport ? "Stäng import" : "Importera mätvärden"}</button>}</div></div>
    {error && <div role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">{error}</div>}{message && <div role="status" className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">{message}</div>}
    {showImport && <form onSubmit={importMetrics} className="mt-5 rounded-2xl border border-pink-200 bg-pink-50/60 p-4 sm:p-5"><p className="text-sm font-extrabold text-slate-900">Importera JSON</p><p className="mt-1 text-xs leading-5 text-slate-600">Format: <code>{'{ "metrics": [{ "contentId": "uuid", "metricDate": "2026-09-09", "impressions": 10, "clicks": 2, "ctr": 20, "averagePosition": 4.2, "conversions": 1, "conversionRate": 50 }] }'}</code></p><textarea value={importText} onChange={(event) => setImportText(event.target.value)} rows={5} className="mt-3 w-full rounded-xl border border-pink-200 bg-white px-3 py-2 font-mono text-xs outline-none focus:ring-4 focus:ring-pink-100" required /><button type="submit" className="btn-cta mt-3 min-h-10 rounded-lg px-4 text-xs font-extrabold">Importera</button></form>}
    <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4"><MetricCard label="Impressions · 90 dagar" value={summary.totals.impressions.toLocaleString("sv-SE")} note={hasMetrics ? "Importerad data" : "Ingen data ännu"} /><MetricCard label="Klick · 90 dagar" value={summary.totals.clicks.toLocaleString("sv-SE")} note={hasMetrics ? `${Number(summary.totals.ctr).toFixed(2)} % CTR` : "–"} /><MetricCard label="Konverteringar" value={summary.totals.conversions.toLocaleString("sv-SE")} note={hasMetrics ? `${Number(summary.totals.conversion_rate).toFixed(2)} % av klick` : "–"} /><MetricCard label="Publicerade sidor" value={published.toLocaleString("sv-SE")} note={`${indexed} i publiceringsflödet`} /></div>
    <div className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]"><section className="rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="flex items-center justify-between gap-3 border-b border-slate-100 p-4"><div><h2 className="text-sm font-extrabold text-slate-950">URL-prestanda</h2><p className="mt-1 text-xs text-slate-500">Senaste importerade mätvärde per innehållssida.</p></div><span className="text-xs font-bold text-slate-400">{loading ? "Laddar…" : `${summary.pages.length} sidor`}</span></div><div className="overflow-x-auto"><table className="w-full min-w-[780px] text-left text-xs"><thead className="bg-slate-50 text-[0.65rem] uppercase tracking-wide text-slate-500"><tr><th className="px-4 py-3 font-bold">Sida</th><th className="px-4 py-3 font-bold">Status</th><th className="px-4 py-3 font-bold">Impressions</th><th className="px-4 py-3 font-bold">Klick</th><th className="px-4 py-3 font-bold">CTR</th><th className="px-4 py-3 font-bold">Position</th><th className="px-4 py-3 font-bold">Konv.</th></tr></thead><tbody>{summary.pages.map((page) => <tr key={page.id} className="border-t border-slate-100"><td className="max-w-[280px] px-4 py-3"><span className="block truncate font-bold text-slate-800">{page.title}</span><span className="mt-0.5 block truncate text-[0.62rem] text-slate-400">/{page.slug}{page.target_query ? ` · ${page.target_query}` : ""}</span></td><td className="px-4 py-3 text-slate-600">{page.status}</td><td className="px-4 py-3 text-slate-600">{page.impressions ?? "–"}</td><td className="px-4 py-3 text-slate-600">{page.clicks ?? "–"}</td><td className="px-4 py-3 text-slate-600">{page.ctr == null ? "–" : `${Number(page.ctr).toFixed(2)} %`}</td><td className="px-4 py-3 text-slate-600">{page.average_position ?? "–"}</td><td className="px-4 py-3 text-slate-600">{page.conversions ?? "–"}</td></tr>)}</tbody></table>{summary.pages.length === 0 && <div className="p-8 text-center text-sm leading-6 text-slate-500">Ingen innehållsstatistik ännu. Importera ett exportunderlag från Search Console eller ert konverteringssystem.</div>}</div></section>
      <aside className="space-y-5"><section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><h2 className="text-sm font-extrabold text-slate-950">Publiceringsstatus</h2><div className="mt-4 space-y-2">{summary.statusCounts.length === 0 ? <p className="text-xs text-slate-500">Ingen CMS-data ännu.</p> : summary.statusCounts.map((item) => <div key={item.status} className="flex items-center justify-between gap-3 text-xs"><span className="text-slate-600">{item.status}</span><span className="font-extrabold text-slate-900">{item.count}</span></div>)}</div></section><section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><div className="flex items-center justify-between gap-3"><h2 className="text-sm font-extrabold text-slate-950">Trasiga interna mål</h2><span className="rounded-full bg-slate-100 px-2 py-1 text-[0.62rem] font-bold text-slate-600">{broken.length}</span></div>{broken.length === 0 ? <p className="mt-3 text-xs leading-5 text-slate-500">Kör kontrollen för att kontrollera länkar, bilder och OG-bilder från CMS-innehållet.</p> : <ul className="mt-3 space-y-2">{broken.map((item, index) => <li key={`${item.target}-${index}`} className="rounded-lg bg-red-50 p-2.5 text-[0.68rem] text-red-800"><span className="font-bold">{item.kind === "image" ? "Bild" : "Länk"}</span> · /{item.slug}<span className="mt-0.5 block break-all">{item.target} ({item.status || "ingen respons"})</span></li>)}</ul>}</section><section className="rounded-2xl border border-amber-200 bg-amber-50 p-4"><h2 className="text-sm font-extrabold text-amber-950">Tolkning</h2><p className="mt-2 text-xs leading-5 text-amber-900/75">SEO-score och tekniska kontroller är varningssystem. De ersätter inte Search Console, medicinsk granskning eller en manuell innehållsrevision.</p></section></aside></div>
  </div></main>;
}

function MetricCard({ label, value, note }: { label: string; value: string; note: string }) { return <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><p className="text-[0.65rem] font-bold uppercase tracking-wide text-slate-500">{label}</p><p className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950">{value}</p><p className="mt-1 text-[0.68rem] font-semibold text-slate-400">{note}</p></div>; }
