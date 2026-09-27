"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { adPlatformNames, adPlatforms, type AdPlatform, type AdsDashboard, type AdsSummary } from "@/lib/ads-types";
import type { AdminRole } from "@/lib/content-types";

type Days = 7 | 30 | 90;

const platformStyles: Record<AdPlatform, { dot: string; bar: string }> = {
  google: { dot: "bg-blue-500", bar: "bg-blue-500" },
  meta: { dot: "bg-indigo-500", bar: "bg-indigo-500" },
  tiktok: { dot: "bg-slate-800", bar: "bg-slate-800" },
};

const count = (value: number) => new Intl.NumberFormat("sv-SE", { maximumFractionDigits: 0 }).format(value);
const money = (value: number, currency: string) => new Intl.NumberFormat("sv-SE", {
  style: "currency", currency, maximumFractionDigits: 2,
}).format(value);
const decimal = (value: number) => new Intl.NumberFormat("sv-SE", { maximumFractionDigits: 2 }).format(value);
const dateLabel = (value: string) => new Intl.DateTimeFormat("sv-SE", { day: "numeric", month: "short" }).format(new Date(`${value}T12:00:00Z`));
const timeLabel = (value: string) => new Intl.DateTimeFormat("sv-SE", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));

function sumRows(rows: AdsSummary[]) {
  if (rows.length === 0) return null;
  if (new Set(rows.map((row) => row.currency)).size !== 1) return null;
  return rows.reduce<AdsSummary>((total, row) => ({
    currency: row.currency,
    spend: total.spend + row.spend,
    impressions: total.impressions + row.impressions,
    clicks: total.clicks + row.clicks,
    conversions: total.conversions === null || row.conversions === null ? null : total.conversions + row.conversions,
    conversionValue: total.conversionValue === null || row.conversionValue === null ? null : total.conversionValue + row.conversionValue,
  }), { currency: rows[0].currency, spend: 0, impressions: 0, clicks: 0, conversions: 0, conversionValue: 0 });
}

export default function AdsWorkspace({ role }: { role: AdminRole }) {
  const [days, setDays] = useState<Days>(30);
  const [data, setData] = useState<AdsDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const canSync = role === "admin" || role === "editor";

  const load = useCallback(async (selectedDays: Days, signal?: AbortSignal) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/ads?days=${selectedDays}`, { cache: "no-store", signal });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error ?? "Annonsdata kunde inte hämtas.");
      setData(payload as AdsDashboard);
      setError("");
    } catch (caught) {
      if (signal?.aborted) return;
      setError(caught instanceof Error ? caught.message : "Annonsdata kunde inte hämtas.");
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const timer = window.setTimeout(() => void load(days, controller.signal), 0);
    return () => { window.clearTimeout(timer); controller.abort(); };
  }, [days, load]);

  async function sync() {
    setSyncing(true);
    setNotice("");
    setError("");
    try {
      const response = await fetch("/api/admin/ads/sync", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" });
      const payload = await response.json();
      if (!response.ok && response.status !== 207) throw new Error(payload.error ?? "Synkroniseringen misslyckades.");
      const results = payload.results as Array<{ platform: AdPlatform; status: "success" | "error"; rows?: number; error?: string }>;
      const succeeded = results.filter((result) => result.status === "success");
      const failed = results.filter((result) => result.status === "error");
      await load(days);
      if (succeeded.length) setNotice(`${succeeded.map((result) => adPlatformNames[result.platform]).join(", ")} synkroniserades.`);
      if (failed.length) setError(failed.map((result) => `${adPlatformNames[result.platform]}: ${result.error}`).join(" "));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Synkroniseringen misslyckades.");
    } finally {
      setSyncing(false);
    }
  }

  const overall = useMemo(() => sumRows(data?.summaries.map((item) => item.summary) ?? []), [data]);
  const hasAnyData = Boolean(data?.summaries.length);
  const hasConnected = Boolean(data?.connections.some((connection) => connection.configured));
  const dailyMax = Math.max(1, ...(data?.daily.map((item) => item.summary.spend) ?? []));

  return (
    <main className="min-h-0 min-w-0 flex-1 overflow-y-auto bg-[#f7f7f8] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1500px] space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#c81e70]">Marknadsföring</p>
            <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">Annonsering</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Resultat från Google Ads, Meta Ads och TikTok Ads. Uppgifterna visas efter synkronisering.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex rounded-xl border border-slate-200 bg-white p-1" aria-label="Tidsperiod">
              {([7, 30, 90] as const).map((option) => (
                <button key={option} type="button" onClick={() => setDays(option)}
                  aria-pressed={days === option}
                  className={`min-h-9 rounded-lg px-3 text-xs font-bold transition ${days === option ? "bg-[#312a3c] text-white" : "text-slate-500 hover:bg-slate-50"}`}>
                  {option} dagar
                </button>
              ))}
            </div>
            {canSync && <button type="button" onClick={() => void sync()} disabled={syncing || !hasConnected}
              className="btn-cta min-h-11 rounded-xl px-4 text-xs font-extrabold disabled:cursor-not-allowed disabled:opacity-50">
              {syncing ? "Synkroniserar…" : "Synkronisera nu"}
            </button>}
          </div>
        </div>

        {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">{error}</p>}
        {notice && <p role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">{notice}</p>}

        <section aria-label="Anslutningar" className="grid gap-3 md:grid-cols-3">
          {adPlatforms.map((platform) => {
            const connection = data?.connections.find((item) => item.platform === platform);
            return <div key={platform} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5"><span className={`size-2.5 rounded-full ${platformStyles[platform].dot}`} /><h2 className="text-sm font-extrabold text-slate-900">{adPlatformNames[platform]}</h2></div>
                <span className={`rounded-full px-2.5 py-1 text-[0.65rem] font-bold ${connection?.status === "success" ? "bg-emerald-50 text-emerald-700" : connection?.status === "error" ? "bg-red-50 text-red-700" : "bg-slate-100 text-slate-500"}`}>
                  {connection?.status === "success" ? "Ansluten" : connection?.status === "error" ? "Synkfel" : connection?.status === "ready" ? "Redo att synka" : "Ej ansluten"}
                </span>
              </div>
              <p className="mt-3 text-xs text-slate-500">{connection?.lastSyncAt ? `Senast synkad ${timeLabel(connection.lastSyncAt)}` : connection?.configured ? "Ingen synkronisering ännu" : "API-uppgifter saknas"}</p>
              {connection?.lastError && <p className="mt-2 text-xs text-red-700">{connection.lastError}</p>}
            </div>;
          })}
        </section>

        {loading && !data ? <p className="rounded-2xl border border-slate-200 bg-white p-8 text-sm text-slate-500">Hämtar annonsdata…</p> : !hasAnyData ? (
          <section className="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm">
            <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-pink-50 text-[#c81e70]"><ChartIcon /></div>
            <h2 className="mt-4 text-lg font-extrabold text-slate-950">Ingen annonsdata ännu</h2>
            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">{hasConnected ? "Synkronisera ett anslutet annonskonto för att se kampanjer och nyckeltal." : "Lägg till API-uppgifter för ett annonskonto. När kontot är anslutet kan du synkronisera rapporterna här."}</p>
          </section>
        ) : <>
          <section aria-label="Översikt" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard label="Annonskostnad" value={overall ? money(overall.spend, overall.currency) : "Flera valutor"} note="Summeras bara i samma valuta" />
            <MetricCard label="Visningar" value={count(data!.summaries.reduce((sum, item) => sum + item.summary.impressions, 0))} note="Alla anslutna plattformar" />
            <MetricCard label="Klick" value={count(data!.summaries.reduce((sum, item) => sum + item.summary.clicks, 0))} note="Alla anslutna plattformar" />
            <MetricCard label="CTR" value={(() => { const impressions = data!.summaries.reduce((sum, item) => sum + item.summary.impressions, 0); const clicks = data!.summaries.reduce((sum, item) => sum + item.summary.clicks, 0); return impressions ? `${decimal(clicks / impressions * 100)} %` : "–"; })()} note="Klick / visningar" />
          </section>

          <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_330px]">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-sm font-extrabold text-slate-950">Kostnad över tid</h2><p className="mt-1 text-xs text-slate-500">Daglig kostnad per plattform</p></div><span className="text-xs text-slate-400">{dateLabel(data!.from)} – {dateLabel(data!.to)}</span></div>
              <div className="mt-6 max-h-72 space-y-2 overflow-y-auto pr-2">
                {data!.daily.map((item) => <div key={`${item.date}-${item.platform}-${item.summary.currency}`} className="grid grid-cols-[58px_72px_minmax(0,1fr)_100px] items-center gap-2 text-[0.68rem] sm:grid-cols-[70px_92px_minmax(0,1fr)_120px]">
                  <span className="text-slate-400">{dateLabel(item.date)}</span><span className="font-bold text-slate-600">{adPlatformNames[item.platform].replace(" Ads", "")}</span>
                  <span className="h-2.5 overflow-hidden rounded-full bg-slate-100"><span className={`block h-full rounded-full ${platformStyles[item.platform].bar}`} style={{ width: `${Math.max(2, item.summary.spend / dailyMax * 100)}%` }} /></span>
                  <span className="text-right font-semibold text-slate-700">{money(item.summary.spend, item.summary.currency)}</span>
                </div>)}
              </div>
            </section>
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-sm font-extrabold text-slate-950">Per plattform</h2>
              <div className="mt-4 space-y-4">{data!.summaries.map((item) => <div key={`${item.platform}-${item.summary.currency}`} className="rounded-xl bg-slate-50 p-3">
                <div className="flex items-center justify-between gap-3"><span className="text-xs font-extrabold text-slate-800">{adPlatformNames[item.platform]}</span><span className="text-xs font-extrabold text-slate-900">{money(item.summary.spend, item.summary.currency)}</span></div>
                <p className="mt-2 text-[0.68rem] text-slate-500">{count(item.summary.impressions)} visningar · {count(item.summary.clicks)} klick · {item.summary.conversions === null ? "Konverteringar ej valda" : `${decimal(item.summary.conversions)} konverteringar`}</p>
              </div>)}</div>
              <p className="mt-4 text-[0.68rem] leading-5 text-slate-400">Konverteringar följer respektive plattforms definition och jämförs därför inte som ett gemensamt totalvärde.</p>
            </section>
          </div>

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-5"><h2 className="text-sm font-extrabold text-slate-950">Kampanjer</h2><p className="mt-1 text-xs text-slate-500">Rapporterade kampanjer under vald period</p></div>
            <div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left text-xs"><thead className="bg-slate-50 text-[0.65rem] uppercase tracking-wide text-slate-500"><tr><th className="px-4 py-3">Kampanj</th><th className="px-4 py-3">Plattform</th><th className="px-4 py-3 text-right">Kostnad</th><th className="px-4 py-3 text-right">Visningar</th><th className="px-4 py-3 text-right">Klick</th><th className="px-4 py-3 text-right">CTR</th><th className="px-4 py-3 text-right">Konv.</th></tr></thead><tbody>
              {data!.campaigns.map((item) => <tr key={`${item.platform}-${item.accountId}-${item.campaignId}`} className="border-t border-slate-100"><td className="max-w-[260px] px-4 py-3"><span className="block truncate font-bold text-slate-800">{item.campaignName}</span><span className="text-[0.65rem] text-slate-400">{item.campaignId}</span></td><td className="px-4 py-3 text-slate-600">{adPlatformNames[item.platform]}</td><td className="px-4 py-3 text-right font-bold text-slate-800">{money(item.summary.spend, item.summary.currency)}</td><td className="px-4 py-3 text-right text-slate-600">{count(item.summary.impressions)}</td><td className="px-4 py-3 text-right text-slate-600">{count(item.summary.clicks)}</td><td className="px-4 py-3 text-right text-slate-600">{item.summary.impressions ? `${decimal(item.summary.clicks / item.summary.impressions * 100)} %` : "–"}</td><td className="px-4 py-3 text-right text-slate-600">{item.summary.conversions === null ? "–" : decimal(item.summary.conversions)}</td></tr>)}
            </tbody></table></div>
          </section>
        </>}
      </div>
    </main>
  );
}

function MetricCard({ label, value, note }: { label: string; value: string; note: string }) {
  return <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-[0.68rem] font-bold uppercase tracking-wide text-slate-500">{label}</p><p className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950">{value}</p><p className="mt-1 text-[0.68rem] text-slate-400">{note}</p></div>;
}

function ChartIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-7" aria-hidden="true"><path d="M4 19V5M4 19h16M8 16v-4m4 4V8m4 8v-6" /></svg>;
}
