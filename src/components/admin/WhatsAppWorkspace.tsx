"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import { useWhatsAppConversations } from "@/hooks/useWhatsAppConversations";
import type { WhatsAppConversation } from "@/lib/whatsapp-types";

type Filter = "new" | "mine" | "waiting" | "resolved" | "all";

export default function WhatsAppWorkspace({
  currentUser,
  onUnreadCountChange,
}: {
  currentUser: { name: string };
  onUnreadCountChange?: (count: number) => void;
}) {
  const {
    conversations,
    unreadCount,
    configuration,
    loading,
    error,
    sendMessage,
    assignConversation,
    setConversationStatus,
    markRead,
  } = useWhatsAppConversations();
  const [filter, setFilter] = useState<Filter>("new");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [actionError, setActionError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => onUnreadCountChange?.(unreadCount), [onUnreadCountChange, unreadCount]);

  useEffect(() => {
    const updateTime = () => setCurrentTime(Date.now());
    const initialTimer = window.setTimeout(updateTime, 0);
    const timer = window.setInterval(updateTime, 60_000);
    return () => {
      window.clearTimeout(initialTimer);
      window.clearInterval(timer);
    };
  }, []);

  const filtered = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("sv-SE");
    return conversations.filter((conversation) => {
      if (filter === "new" && conversation.status !== "new") return false;
      if (filter === "mine" && (conversation.assignedTo !== currentUser.name || conversation.status === "resolved")) return false;
      if (filter === "waiting" && conversation.status !== "waiting") return false;
      if (filter === "resolved" && conversation.status !== "resolved") return false;
      return !query || conversation.displayName.toLocaleLowerCase("sv-SE").includes(query) || conversation.waId.includes(query);
    });
  }, [conversations, currentUser.name, filter, search]);

  const selected = conversations.find((conversation) => conversation.id === selectedId) ?? filtered[0] ?? null;
  const selectedUnread = selected?.messages.some((message) => message.direction === "inbound" && !message.readByStaff) ?? false;

  useEffect(() => {
    if (!selected || !selectedUnread) return;
    void markRead(selected.id).catch(() => undefined);
  }, [markRead, selected, selectedUnread]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ block: "nearest" });
  }, [selected?.id, selected?.messages.length]);

  const withinServiceWindow = selected?.lastInboundAt
    ? currentTime > 0 && currentTime - new Date(selected.lastInboundAt).getTime() <= 24 * 60 * 60 * 1000
    : false;
  const canReply = Boolean(
    selected && configuration.outbound && withinServiceWindow && selected.status !== "resolved" &&
    (!selected.assignedTo || selected.assignedTo === currentUser.name),
  );

  async function runAction(action: () => Promise<unknown>) {
    setActionError(null);
    try {
      await action();
    } catch (actionFailure) {
      setActionError(actionFailure instanceof Error ? actionFailure.message : "Åtgärden misslyckades.");
    }
  }

  async function handleSend(event: FormEvent) {
    event.preventDefault();
    if (!selected || !draft.trim() || !canReply) return;
    const body = draft.trim();
    setSending(true);
    setActionError(null);
    try {
      await sendMessage(selected.id, body);
      setDraft("");
    } catch (sendError) {
      setActionError(sendError instanceof Error ? sendError.message : "Meddelandet kunde inte skickas.");
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="flex min-h-0 min-w-0 flex-1 flex-col bg-[#f7f7f9]">
      <header className="flex shrink-0 flex-col gap-3 border-b border-slate-200 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.18em] text-[#cf1f72]">Kundservice</p>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-950">WhatsApp Business</h1>
          <p className="mt-1 text-xs text-slate-500">Administrativa frågor – inga symtom eller personnummer.</p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-600">
          <span className={`size-2 rounded-full ${configuration.inbound && configuration.outbound ? "bg-emerald-500" : "bg-amber-400"}`} />
          {configuration.inbound && configuration.outbound ? "Meta anslutet" : "Meta ej fullständigt anslutet"}
        </div>
      </header>

      {configuration.missing.length > 0 && (
        <div className="shrink-0 border-b border-amber-200 bg-amber-50 px-5 py-3 text-xs text-amber-900">
          <strong>Konfiguration saknas:</strong> {configuration.missing.join(", ")}. Inkorgen aktiveras när variablerna finns i produktion.
        </div>
      )}
      {(error || actionError) && (
        <div role="alert" className="shrink-0 border-b border-red-200 bg-red-50 px-5 py-3 text-xs font-semibold text-red-800">
          {actionError ?? error}
        </div>
      )}

      <div className="grid min-h-0 flex-1 md:grid-cols-[340px_minmax(0,1fr)] xl:grid-cols-[360px_minmax(0,1fr)_260px]">
        <section className="flex min-h-0 flex-col border-r border-slate-200 bg-white" aria-label="WhatsApp-konversationer">
          <div className="shrink-0 border-b border-slate-200 p-4">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Sök namn eller nummer"
              aria-label="Sök WhatsApp-konversationer"
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
            />
            <div className="mt-3 flex gap-1 overflow-x-auto" aria-label="Filtrera WhatsApp-konversationer">
              {(["new", "mine", "waiting", "resolved", "all"] as Filter[]).map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setFilter(value)}
                  className={`shrink-0 rounded-lg px-2.5 py-2 text-[0.68rem] font-bold ${filter === value ? "bg-pink-50 text-[#c81e70]" : "text-slate-500 hover:bg-slate-50"}`}
                >
                  {{ new: "Nya", mine: "Mina", waiting: "Väntar", resolved: "Avslutade", all: "Alla" }[value]}
                </button>
              ))}
            </div>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto">
            {loading ? <Empty text="Hämtar WhatsApp…" /> : filtered.length === 0 ? <Empty text="Inga konversationer här." /> : filtered.map((conversation) => (
              <ConversationRow
                key={conversation.id}
                conversation={conversation}
                selected={selected?.id === conversation.id}
                onSelect={() => setSelectedId(conversation.id)}
              />
            ))}
          </div>
        </section>

        <section className="flex min-h-0 min-w-0 flex-col bg-[#f6f7f8]" aria-label="WhatsApp-tråd">
          {selected ? (
            <>
              <div className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-200 bg-white px-5 py-4">
                <div className="min-w-0">
                  <p className="truncate text-sm font-extrabold text-slate-950">{selected.displayName}</p>
                  <p className="mt-0.5 text-xs text-slate-400">+{selected.waId}</p>
                </div>
                <div className="flex gap-2">
                  {!selected.assignedTo && <ActionButton onClick={() => void runAction(() => assignConversation(selected.id))}>Ta ärendet</ActionButton>}
                  {selected.status !== "resolved" && <ActionButton onClick={() => void runAction(() => setConversationStatus(selected.id, "resolved"))}>Avsluta</ActionButton>}
                </div>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6">
                <div className="mx-auto max-w-3xl space-y-3">
                  {selected.messages.map((message) => (
                    <div key={message.id} className={`flex ${message.direction === "outbound" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[82%] rounded-2xl px-4 py-3 shadow-sm ${message.direction === "outbound" ? "rounded-br-md bg-[#d9fdd3]" : "rounded-bl-md bg-white"}`}>
                        <p className="whitespace-pre-wrap break-words text-sm leading-5 text-slate-800">{message.body}</p>
                        <p className="mt-1 text-right text-[0.6rem] text-slate-400">
                          {formatTime(message.createdAt)}{message.direction === "outbound" ? ` · ${deliveryLabel(message.deliveryStatus)}` : ""}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messageEndRef} />
                </div>
              </div>
              <div className="shrink-0 border-t border-slate-200 bg-white p-4">
                {!withinServiceWindow && (
                  <p className="mb-3 rounded-xl bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-800">
                    24-timmarsfönstret är stängt. En godkänd Meta-mall krävs för nästa kontakt.
                  </p>
                )}
                <form onSubmit={handleSend} className="mx-auto flex max-w-3xl items-end gap-2">
                  <textarea
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    disabled={!canReply || sending}
                    maxLength={2000}
                    rows={2}
                    placeholder={canReply ? "Skriv ett administrativt svar…" : "Ta ärendet och kontrollera 24-timmarsfönstret för att svara"}
                    className="min-h-12 flex-1 resize-none rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 disabled:bg-slate-100"
                  />
                  <button type="submit" disabled={!canReply || !draft.trim() || sending} className="btn-cta min-h-12 rounded-xl px-5 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-40">
                    {sending ? "Skickar…" : "Skicka"}
                  </button>
                </form>
              </div>
            </>
          ) : <Empty text="Välj en WhatsApp-konversation." />}
        </section>

        <aside className="hidden min-h-0 overflow-y-auto border-l border-slate-200 bg-white p-5 xl:block">
          {selected && (
            <>
              <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.14em] text-slate-400">Ärendeinformation</p>
              <dl className="mt-5 space-y-4 text-xs">
                <Detail label="Kontakt" value={selected.displayName} />
                <Detail label="WhatsApp-ID" value={`+${selected.waId}`} />
                <Detail label="Tilldelad" value={selected.assignedTo ?? "Ingen"} />
                <Detail label="Status" value={statusLabel(selected.status)} />
                <Detail label="Svarsfönster" value={withinServiceWindow ? "Öppet" : "Stängt"} />
              </dl>
              {selected.status !== "waiting" && selected.status !== "resolved" && (
                <button type="button" onClick={() => void runAction(() => setConversationStatus(selected.id, "waiting"))} className="mt-6 min-h-10 w-full rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50">
                  Markera som väntande
                </button>
              )}
            </>
          )}
        </aside>
      </div>
    </main>
  );
}

function ConversationRow({ conversation, selected, onSelect }: { conversation: WhatsAppConversation; selected: boolean; onSelect: () => void }) {
  const latest = conversation.messages.at(-1);
  const unread = conversation.messages.filter((message) => message.direction === "inbound" && !message.readByStaff).length;
  return (
    <button type="button" onClick={onSelect} className={`w-full border-b border-slate-100 px-4 py-4 text-left transition ${selected ? "bg-pink-50" : "hover:bg-slate-50"}`}>
      <span className="flex items-start justify-between gap-3">
        <span className={`truncate text-sm ${unread ? "font-extrabold" : "font-bold"}`}>{conversation.displayName}</span>
        <span className="shrink-0 text-[0.62rem] text-slate-400">{formatRelative(conversation.updatedAt)}</span>
      </span>
      <span className="mt-1 block truncate text-xs text-slate-500">{latest?.body ?? "Ny konversation"}</span>
      <span className="mt-2 flex items-center justify-between">
        <span className="rounded-full bg-slate-100 px-2 py-1 text-[0.62rem] font-bold text-slate-500">{statusLabel(conversation.status)}</span>
        {unread > 0 && <span className="grid size-5 place-items-center rounded-full bg-[#e72e8a] text-[0.6rem] font-extrabold text-white">{unread > 9 ? "9+" : unread}</span>}
      </span>
    </button>
  );
}

function ActionButton({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return <button type="button" onClick={onClick} className="min-h-9 rounded-lg border border-slate-200 px-3 text-xs font-bold text-slate-600 hover:bg-slate-50">{children}</button>;
}

function Detail({ label, value }: { label: string; value: string }) {
  return <div><dt className="font-bold text-slate-400">{label}</dt><dd className="mt-1 break-words font-semibold text-slate-700">{value}</dd></div>;
}

function Empty({ text }: { text: string }) {
  return <div className="grid h-full min-h-48 place-items-center p-8 text-center text-sm font-semibold text-slate-400">{text}</div>;
}

function statusLabel(status: string) {
  return ({ new: "Ny", open: "Pågående", waiting: "Väntar", resolved: "Avslutad" } as Record<string, string>)[status] ?? status;
}

function deliveryLabel(status: string) {
  return ({ queued: "Köad", sent: "Skickad", delivered: "Levererad", read: "Läst", failed: "Misslyckades", received: "Mottagen" } as Record<string, string>)[status] ?? status;
}

function formatTime(value: string) {
  return new Intl.DateTimeFormat("sv-SE", { hour: "2-digit", minute: "2-digit" }).format(new Date(value));
}

function formatRelative(value: string) {
  const timestamp = new Date(value).getTime();
  const diffMinutes = Math.max(0, Math.floor((Date.now() - timestamp) / 60_000));
  if (diffMinutes < 1) return "nu";
  if (diffMinutes < 60) return `${diffMinutes} min`;
  if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)} h`;
  return new Intl.DateTimeFormat("sv-SE", { day: "numeric", month: "short" }).format(new Date(value));
}
