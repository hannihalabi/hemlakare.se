"use client";

import { useCallback, useEffect, useState, type ComponentProps } from "react";
import type { AdminRole } from "@/lib/content-types";
import type { AdminEmailDetail, AdminEmailListItem, EmailDashboard, EmailStatus } from "@/lib/email-types";

type Filter = "all" | EmailStatus;
type IconProps = ComponentProps<"svg">;

const emptyDashboard: EmailDashboard = {
  configured: false,
  migrationRequired: false,
  lastSyncAt: null,
  lastError: null,
  unreadCount: 0,
  messages: [],
};

export default function EmailWorkspace({ role }: { role: AdminRole }) {
  const [filter, setFilter] = useState<Filter>("new");
  const [dashboard, setDashboard] = useState<EmailDashboard>(emptyDashboard);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detail, setDetail] = useState<AdminEmailDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const canSync = role === "admin" || role === "editor";

  const loadDashboard = useCallback(async () => {
    try {
      const query = filter === "all" ? "" : `?status=${filter}`;
      const response = await fetch(`/api/admin/email${query}`, { cache: "no-store" });
      const data = (await response.json()) as EmailDashboard & { error?: string };
      if (!response.ok) throw new Error(data.error ?? "E-posten kunde inte läsas.");
      setDashboard(data);
      setSelectedId((current) => current && data.messages.some((message) => message.id === current) ? current : null);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "E-posten kunde inte läsas.");
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    const timer = window.setTimeout(() => void loadDashboard(), 0);
    return () => window.clearTimeout(timer);
  }, [loadDashboard]);

  useEffect(() => {
    if (!selectedId) return;
    let cancelled = false;
    fetch(`/api/admin/email/${selectedId}`, { cache: "no-store" })
      .then(async (response) => {
        const data = (await response.json()) as AdminEmailDetail & { error?: string };
        if (!response.ok) throw new Error(data.error ?? "Mejlet kunde inte öppnas.");
        if (!cancelled) setDetail(data);
      })
      .catch((detailError: unknown) => {
        if (!cancelled) setError(detailError instanceof Error ? detailError.message : "Mejlet kunde inte öppnas.");
      })
      .finally(() => {
        if (!cancelled) setDetailLoading(false);
      });
    return () => { cancelled = true; };
  }, [selectedId]);

  async function syncInbox() {
    setSyncing(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/email/sync", { method: "POST" });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error ?? "Synkroniseringen misslyckades.");
      await loadDashboard();
    } catch (syncError) {
      setError(syncError instanceof Error ? syncError.message : "Synkroniseringen misslyckades.");
    } finally {
      setSyncing(false);
    }
  }

  async function setStatus(status: EmailStatus) {
    if (!detail) return;
    setError(null);
    try {
      const response = await fetch(`/api/admin/email/${detail.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, assignToSelf: status === "open" }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error ?? "Statusen kunde inte ändras.");
      setDetail({ ...detail, status });
      await loadDashboard();
    } catch (statusError) {
      setError(statusError instanceof Error ? statusError.message : "Statusen kunde inte ändras.");
    }
  }

  return (
    <main className="min-w-0 flex-1 overflow-y-auto bg-[#f7f7f9] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1500px]">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#cf1f72]">Kundservice</p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">E-post</h1>
            <p className="mt-2 text-sm text-slate-500">Inkommande meddelanden från one.com.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <p className="text-[0.65rem] font-bold uppercase tracking-wide text-slate-400">Anslutning</p>
              <p className={`mt-1 flex items-center gap-2 text-sm font-bold ${dashboard.configured ? "text-emerald-700" : "text-slate-600"}`}>
                <span className={`size-2 rounded-full ${dashboard.configured ? "bg-emerald-500" : "bg-slate-300"}`} />
                {dashboard.configured ? "one.com konfigurerat" : "Ej konfigurerad"}
              </p>
            </div>
            {canSync && (
              <button
                type="button"
                onClick={() => void syncInbox()}
                disabled={!dashboard.configured || syncing || loading}
                className="btn-cta min-h-11 rounded-xl px-4 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-40"
              >
                {syncing ? "Synkroniserar…" : "Synkronisera"}
              </button>
            )}
          </div>
        </header>

        {!dashboard.configured && !loading && !error && (
          <div className="mt-6 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
            <InfoIcon className="mt-0.5 size-5 shrink-0 text-amber-600" />
            <div>
              <p className="font-bold">One.com är inte anslutet ännu</p>
              <p className="mt-1 text-amber-800">Lägg in IMAP-uppgifterna som servervariabler. Fram tills dess visas inga mejl.</p>
            </div>
          </div>
        )}

        {dashboard.migrationRequired && !loading && !error && (
          <div className="mt-6 flex gap-3 rounded-2xl border border-sky-200 bg-sky-50 p-4 text-sm text-sky-950">
            <InfoIcon className="mt-0.5 size-5 shrink-0 text-sky-600" />
            <div>
              <p className="font-bold">Databasen behöver förberedas</p>
              <p className="mt-1 text-sky-800">Kör migration 0012_admin_email.sql innan den första synkroniseringen.</p>
            </div>
          </div>
        )}

        {error && (
          <div role="alert" className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">
            {error}
          </div>
        )}

        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col border-b border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div className="flex gap-1 overflow-x-auto" aria-label="Filtrera e-post">
              {([
                ["new", `Nya (${dashboard.unreadCount})`],
                ["open", "Pågående"],
                ["resolved", "Hanterade"],
                ["all", "Alla"],
              ] as Array<[Filter, string]>).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    setLoading(true);
                    setError(null);
                    setSelectedId(null);
                    setDetail(null);
                    setFilter(value);
                  }}
                  className={`min-h-9 shrink-0 rounded-lg px-3 text-xs font-bold transition ${filter === value ? "bg-pink-50 text-[#c81e70]" : "text-slate-500 hover:bg-slate-50"}`}
                >
                  {label}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-slate-400 sm:mt-0">
              {dashboard.lastSyncAt ? `Senast synkad ${formatDateTime(dashboard.lastSyncAt)}` : "Aldrig synkad"}
            </p>
          </div>

          <div className="grid min-h-[560px] lg:grid-cols-[390px_minmax(0,1fr)]">
            <section className="border-b border-slate-200 lg:border-b-0 lg:border-r" aria-label="Meddelanden">
              {loading ? (
                <EmptyState title="Hämtar e-post…" body="Vänta ett ögonblick." />
              ) : dashboard.messages.length === 0 ? (
                <EmptyState
                  title={dashboard.configured ? "Inga mejl här" : "Ingen e-post ansluten"}
                  body={dashboard.configured ? "Nya meddelanden visas efter nästa synkronisering." : "När one.com har konfigurerats visas riktiga mejl här."}
                />
              ) : dashboard.messages.map((message) => (
                <MessageRow
                  key={message.id}
                  message={message}
                  selected={selectedId === message.id}
                  onSelect={() => {
                    setDetail(null);
                    setDetailLoading(true);
                    setSelectedId(message.id);
                  }}
                />
              ))}
            </section>

            <section className="min-w-0 bg-[#fcfcfd]" aria-label="Öppnat meddelande">
              {detailLoading ? (
                <EmptyState title="Öppnar mejlet…" body="Vänta ett ögonblick." />
              ) : selectedId && detail ? (
                <article className="p-5 sm:p-7">
                  <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <div className="mb-3 flex items-center gap-3">
                        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#2d2639] text-sm font-extrabold text-white">
                          {initials(detail.fromName || detail.fromAddress)}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-slate-900">{detail.fromName || detail.fromAddress}</p>
                          <p className="truncate text-xs text-slate-500">{detail.fromAddress}</p>
                        </div>
                      </div>
                      <h2 className="text-xl font-extrabold text-slate-950">{detail.subject}</h2>
                      <p className="mt-2 text-xs text-slate-400">Till: {detail.toAddresses.join(", ") || "–"} · {formatDateTime(detail.receivedAt)}</p>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      {detail.status === "resolved" ? (
                        <button type="button" onClick={() => void setStatus("open")} className="min-h-10 rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 hover:bg-slate-50">Öppna igen</button>
                      ) : (
                        <button type="button" onClick={() => void setStatus("resolved")} className="min-h-10 rounded-xl bg-[#2d2639] px-3 text-xs font-bold text-white hover:bg-[#211c2b]">Markera hanterad</button>
                      )}
                    </div>
                  </div>

                  <div className="min-h-64 whitespace-pre-wrap break-words py-6 text-sm leading-7 text-slate-700">
                    {detail.textBody || "Det här mejlet saknar en läsbar textversion."}
                  </div>

                  {detail.attachments.length > 0 && (
                    <div className="border-t border-slate-200 pt-5">
                      <p className="text-xs font-extrabold uppercase tracking-wide text-slate-500">Bilagor ({detail.attachments.length})</p>
                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        {detail.attachments.map((attachment, index) => (
                          <div key={`${attachment.filename}-${index}`} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3">
                            <PaperclipIcon className="size-4 shrink-0 text-slate-400" />
                            <div className="min-w-0">
                              <p className="truncate text-xs font-bold text-slate-700">{attachment.filename}</p>
                              <p className="mt-0.5 text-[0.65rem] text-slate-400">{formatBytes(attachment.size)} · endast information</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </article>
              ) : (
                <EmptyState title="Välj ett mejl" body="Meddelandets innehåll visas här." large />
              )}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

function MessageRow({ message, selected, onSelect }: { message: AdminEmailListItem; selected: boolean; onSelect: () => void }) {
  return (
    <button type="button" onClick={onSelect} className={`relative block w-full border-b border-slate-100 px-5 py-4 text-left transition ${selected ? "bg-pink-50" : "hover:bg-slate-50"}`}>
      {selected && <span className="absolute inset-y-0 left-0 w-1 bg-[#e72e8a]" />}
      <div className="flex items-start justify-between gap-3">
        <p className={`truncate text-sm ${message.status === "new" ? "font-extrabold text-slate-950" : "font-bold text-slate-700"}`}>{message.fromName || message.fromAddress}</p>
        <time className="shrink-0 text-[0.65rem] text-slate-400">{formatDateTime(message.receivedAt)}</time>
      </div>
      <div className="mt-1 flex items-center gap-2">
        {message.status === "new" && <span className="size-2 shrink-0 rounded-full bg-[#e72e8a]" aria-label="Nytt" />}
        <p className="truncate text-xs font-semibold text-slate-700">{message.subject}</p>
        {message.hasAttachments && <PaperclipIcon className="size-3.5 shrink-0 text-slate-400" />}
      </div>
      <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-slate-400">{message.preview || "Ingen textförhandsvisning"}</p>
    </button>
  );
}

function EmptyState({ title, body, large = false }: { title: string; body: string; large?: boolean }) {
  return (
    <div className={`flex flex-col items-center justify-center px-6 text-center ${large ? "min-h-[560px]" : "min-h-56"}`}>
      <span className="grid size-12 place-items-center rounded-2xl bg-slate-100 text-slate-400"><MailIcon className="size-6" /></span>
      <p className="mt-4 text-sm font-bold text-slate-800">{title}</p>
      <p className="mt-1 max-w-xs text-xs leading-5 text-slate-400">{body}</p>
    </div>
  );
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("sv-SE", { dateStyle: "short", timeStyle: "short" }).format(new Date(value));
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} kB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function initials(value: string) {
  return value.split(/[\s@._-]+/).filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("") || "E";
}

function MailIcon(props: IconProps) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>;
}

function InfoIcon(props: IconProps) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></svg>;
}

function PaperclipIcon(props: IconProps) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d="m21.4 11.6-8.9 8.9a6 6 0 0 1-8.5-8.5l9.6-9.6a4 4 0 0 1 5.7 5.7l-9.6 9.6a2 2 0 0 1-2.8-2.8l8.9-8.9" /></svg>;
}
