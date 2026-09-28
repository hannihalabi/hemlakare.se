"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { useAdminConversations } from "@/hooks/useAdminConversations";
import {
  formatClock,
  formatRelativeTime,
  type ChatConversation,
  type ConversationStatus,
} from "@/lib/chat-demo";
import type { AdminRole } from "@/lib/content-types";
import AdsWorkspace from "@/components/admin/AdsWorkspace";
import CallcenterWorkspace from "@/components/admin/CallcenterWorkspace";
import EmailWorkspace from "@/components/admin/EmailWorkspace";
import HealthDataWorkspace from "@/components/admin/HealthDataWorkspace";

type AdminSection = "callcenter" | "chat" | "ads" | "health-data" | "email";

type QueueFilter = "new" | "mine" | "waiting" | "resolved" | "all";

const queueItems: Array<{
  id: QueueFilter;
  label: string;
  icon: "inbox" | "user" | "clock" | "check" | "layers";
}> = [
  { id: "new", label: "Nya", icon: "inbox" },
  { id: "mine", label: "Mina ärenden", icon: "user" },
  { id: "waiting", label: "Väntar", icon: "clock" },
  { id: "resolved", label: "Avslutade", icon: "check" },
  { id: "all", label: "Alla ärenden", icon: "layers" },
];

const quickReplies = [
  {
    label: "Säker bokning",
    body: "Jag hjälper dig gärna. Av integritetsskäl ska du inte skriva personnummer här. Jag skickar en säker länk där du kan identifiera dig och hantera din bokning.",
  },
  {
    label: "Inga hälsouppgifter",
    body: "Tack för din fråga. Skriv inte symtom eller andra känsliga hälsouppgifter i den här chatten. Jag hjälper dig vidare till vår säkra patientkontakt.",
  },
  {
    label: "Kontrollerar",
    body: "Tack! Jag kontrollerar detta och återkommer strax.",
  },
];

export default function StaffInbox({ onSignOut, currentUser }: { onSignOut?: () => void; currentUser: { id?: string; email: string; name: string; role: AdminRole } }) {
  const {
    conversations,
    sendMessage,
    assignConversation,
    setConversationStatus,
    markRead,
  } = useAdminConversations();
  const [filter, setFilter] = useState<QueueFilter>("new");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState("demo-1041");
  const [draft, setDraft] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [mobileThreadOpen, setMobileThreadOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<AdminSection>("chat");
  const [unreadEmailCount, setUnreadEmailCount] = useState(0);
  const messageEndRef = useRef<HTMLDivElement>(null);

  const counts = useMemo(
    () => ({
      new: conversations.filter((item) => item.status === "new").length,
      mine: conversations.filter(
        (item) =>
          item.assignedTo === currentUser.name && item.status !== "resolved",
      ).length,
      waiting: conversations.filter((item) => item.status === "waiting").length,
      resolved: conversations.filter((item) => item.status === "resolved")
        .length,
      all: conversations.length,
    }),
    [conversations, currentUser.name],
  );

  const unreadChatCount = useMemo(
    () =>
      conversations.reduce(
        (total, conversation) =>
          total +
          conversation.messages.filter(
            (message) =>
              message.sender === "visitor" && !message.readByStaff,
          ).length,
        0,
      ),
    [conversations],
  );

  const filteredConversations = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase("sv-SE");

    return conversations
      .filter((conversation) => {
        if (filter === "new") return conversation.status === "new";
        if (filter === "mine")
          return (
            conversation.assignedTo === currentUser.name &&
            conversation.status !== "resolved"
          );
        if (filter === "waiting") return conversation.status === "waiting";
        if (filter === "resolved") return conversation.status === "resolved";
        return true;
      })
      .filter((conversation) => {
        if (!normalizedSearch) return true;
        return [
          conversation.visitorName,
          conversation.reference,
          conversation.topic,
          conversation.messages.at(-1)?.body ?? "",
        ].some((value) =>
          value.toLocaleLowerCase("sv-SE").includes(normalizedSearch),
        );
      })
      .sort((a, b) => b.updatedAt - a.updatedAt);
  }, [conversations, currentUser.name, filter, search]);

  const selectedConversation =
    conversations.find((conversation) => conversation.id === selectedId) ??
    filteredConversations[0];

  const unreadCount =
    selectedConversation?.messages.filter(
      (item) => item.sender === "visitor" && !item.readByStaff,
    ).length ?? 0;

  useEffect(() => {
    if (!selectedConversation || unreadCount === 0) return;
    markRead(selectedConversation.id);
  }, [markRead, selectedConversation, unreadCount]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ block: "nearest" });
  }, [selectedConversation?.id, selectedConversation?.messages.length]);

  useEffect(() => {
    let cancelled = false;
    async function refreshEmailCount() {
      try {
        const response = await fetch("/api/admin/email?status=new", { cache: "no-store" });
        if (!response.ok) return;
        const data = (await response.json()) as { unreadCount?: number };
        if (!cancelled) setUnreadEmailCount(data.unreadCount ?? 0);
      } catch {
        // E-post kan vara oansluten eller migrationen ännu inte körd.
      }
    }
    void refreshEmailCount();
    const timer = window.setInterval(() => void refreshEmailCount(), 60_000);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [activeSection]);

  function selectConversation(conversation: ChatConversation) {
    setSelectedId(conversation.id);
    setMobileThreadOpen(true);
  }

  function handleSend(event: FormEvent) {
    event.preventDefault();
    if (!selectedConversation || !draft.trim()) return;

    if (!selectedConversation.assignedTo) {
      assignConversation(selectedConversation.id);
    }
    sendMessage(selectedConversation.id, draft);
    setDraft("");
  }

  function handleComposerKeyDown(
    event: ReactKeyboardEvent<HTMLTextAreaElement>,
  ) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  }

  function takeConversation() {
    if (!selectedConversation) return;
    assignConversation(selectedConversation.id);
    setFilter("mine");
  }

  function referToSecureChannel() {
    if (!selectedConversation) return;
    if (!selectedConversation.assignedTo) {
      assignConversation(selectedConversation.id);
    }
    sendMessage(selectedConversation.id, quickReplies[1].body);
  }

  const canReply =
    selectedConversation &&
    selectedConversation.status !== "resolved" &&
    (!selectedConversation.assignedTo ||
      selectedConversation.assignedTo === currentUser.name);

  return (
    <div className="flex h-dvh min-h-[680px] flex-col overflow-hidden bg-[#f4f5f7] text-slate-900">
      <header className="flex h-16 shrink-0 items-center justify-end border-b border-slate-200 bg-white px-4 sm:px-5">
        <div className="flex items-center gap-2">
          <div className="ml-1 flex items-center gap-2">
            <EmployeeAvatar />
            <div className="hidden sm:block">
              <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
              <p className="text-[0.65rem] font-semibold text-emerald-700">
                Tillgänglig
              </p>
            </div>
            <ChevronDownIcon className="hidden size-4 text-slate-400 sm:block" />
          </div>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        <AdminSidebar
          activeSection={activeSection}
          onSelectSection={setActiveSection}
          unreadChatCount={unreadChatCount}
          unreadEmailCount={unreadEmailCount}
          onSignOut={onSignOut}
        />

      {activeSection === "callcenter" ? <CallcenterWorkspace /> : activeSection === "ads" ? <AdsWorkspace role={currentUser.role} /> : activeSection === "health-data" ? <HealthDataWorkspace /> : activeSection === "email" ? <EmailWorkspace role={currentUser.role} /> : (
      <div className="grid min-h-0 flex-1 md:grid-cols-[310px_minmax(0,1fr)] lg:grid-cols-[220px_330px_minmax(0,1fr)] 2xl:grid-cols-[220px_350px_minmax(460px,1fr)_290px]">
        <aside className="hidden min-h-0 flex-col border-r border-slate-200 bg-[#fbfbfc] lg:flex">
          <nav className="flex-1 px-3 py-5" aria-label="Ärendeköer">
            <p className="px-3 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-slate-400">
              Inkorg
            </p>
            <div className="mt-2 space-y-1">
              {queueItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setFilter(item.id)}
                  className={`flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e72e8a] ${
                    filter === item.id
                      ? "bg-pink-50 text-[#c81e70]"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <QueueIcon
                    name={item.icon}
                    className="size-[18px] shrink-0"
                  />
                  <span className="flex-1">{item.label}</span>
                  <span
                    className={`min-w-6 rounded-full px-1.5 py-0.5 text-center text-[0.65rem] font-extrabold ${
                      filter === item.id
                        ? "bg-pink-100 text-[#c81e70]"
                        : "bg-slate-200/70 text-slate-500"
                    }`}
                  >
                    {counts[item.id]}
                  </span>
                </button>
              ))}
            </div>

            <p className="mt-7 px-3 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-slate-400">
              Team
            </p>
            <div className="mt-3 rounded-xl border border-slate-200 bg-white p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-emerald-500" />
                  <span className="text-xs font-bold text-slate-700">
                    Kundservice
                  </span>
                </div>
                <span className="text-[0.65rem] font-semibold text-slate-400">
                  2 online
                </span>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <div className="flex -space-x-2">
                  <EmployeeAvatar compact />
                  <div className="grid size-7 place-items-center rounded-full border-2 border-white bg-[#f2d1df] text-[0.6rem] font-extrabold text-[#9f1f5f]">
                    VS
                  </div>
                </div>
                <span className="text-[0.68rem] text-slate-500">
                  Hanna, Victoria
                </span>
              </div>
            </div>
          </nav>

          <div className="border-t border-slate-200 p-3">
            <div className="rounded-xl bg-slate-100 p-3">
              <div className="flex items-center gap-2">
                <ShieldIcon className="size-4 text-slate-500" />
                <p className="text-[0.68rem] font-bold text-slate-700">
                  Administrativ kanal
                </p>
              </div>
              <p className="mt-1.5 text-[0.65rem] leading-4 text-slate-500">
                Medicinska frågor hänvisas till säker patientkontakt.
              </p>
            </div>
          </div>
        </aside>

        <section
          className={`min-h-0 flex-col border-r border-slate-200 bg-white ${
            mobileThreadOpen ? "hidden md:flex" : "flex"
          }`}
          aria-label="Konversationer"
        >
          <div className="shrink-0 border-b border-slate-200 px-4 pb-3 pt-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h1 className="text-lg font-extrabold tracking-tight text-slate-950">
                  {queueItems.find((item) => item.id === filter)?.label}
                </h1>
                <p className="mt-0.5 text-[0.68rem] font-medium text-slate-400">
                  {counts[filter]}{" "}
                  {counts[filter] === 1 ? "konversation" : "konversationer"}
                </p>
              </div>
              <button
                className="grid size-10 place-items-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e72e8a]"
                aria-label="Fler filter"
              >
                <FilterIcon className="size-4" />
              </button>
            </div>

            <label className="mt-3 flex min-h-10 items-center gap-2 rounded-xl bg-slate-100 px-3 focus-within:ring-2 focus-within:ring-[#e72e8a]">
              <SearchIcon className="size-4 shrink-0 text-slate-400" />
              <span className="sr-only">Sök konversationer</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Sök namn, ärende eller ämne"
                className="min-w-0 flex-1 bg-transparent text-xs text-slate-800 outline-none placeholder:text-slate-400"
              />
              <kbd className="hidden rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[0.6rem] font-semibold text-slate-400 sm:block">
                ⌘ K
              </kbd>
            </label>

            <div className="mt-3 flex gap-1 overflow-x-auto lg:hidden">
              {queueItems.slice(0, 4).map((item) => (
                <button
                  key={item.id}
                  onClick={() => setFilter(item.id)}
                  className={`min-h-9 shrink-0 rounded-lg px-2.5 text-[0.68rem] font-bold ${
                    filter === item.id
                      ? "bg-pink-50 text-[#c81e70]"
                      : "text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  {item.label} {counts[item.id]}
                </button>
              ))}
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto">
            {filteredConversations.length > 0 ? (
              filteredConversations.map((conversation) => (
                <ConversationRow
                  key={conversation.id}
                  conversation={conversation}
                  selected={conversation.id === selectedConversation?.id}
                  onClick={() => selectConversation(conversation)}
                />
              ))
            ) : (
              <div className="flex h-full min-h-64 flex-col items-center justify-center px-8 text-center">
                <div className="grid size-12 place-items-center rounded-2xl bg-slate-100 text-slate-400">
                  <InboxIcon className="size-6" />
                </div>
                <p className="mt-3 text-sm font-bold text-slate-800">
                  Inga ärenden här
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Nya konversationer visas automatiskt i den här kön.
                </p>
              </div>
            )}
          </div>
        </section>

        <main
          className={`min-h-0 flex-col bg-[#f7f7f8] ${
            mobileThreadOpen ? "flex" : "hidden md:flex"
          }`}
        >
          {selectedConversation ? (
            <>
              <div className="flex min-h-[72px] shrink-0 items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 sm:px-5">
                <div className="flex min-w-0 items-center gap-3">
                  <button
                    onClick={() => setMobileThreadOpen(false)}
                    className="grid size-10 shrink-0 place-items-center rounded-xl text-slate-500 hover:bg-slate-100 md:hidden"
                    aria-label="Tillbaka till konversationer"
                  >
                    <ArrowLeftIcon className="size-5" />
                  </button>
                  <VisitorAvatar name={selectedConversation.visitorName} />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h2 className="truncate text-sm font-extrabold text-slate-950">
                        {selectedConversation.visitorName}
                      </h2>
                      <StatusBadge status={selectedConversation.status} />
                    </div>
                    <p className="mt-1 truncate text-[0.68rem] font-medium text-slate-400">
                      {selectedConversation.reference} ·{" "}
                      {selectedConversation.topic}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  {!selectedConversation.assignedTo ? (
                    <button
                      onClick={takeConversation}
                      className="btn-cta min-h-10 rounded-xl px-3.5 text-xs font-bold"
                    >
                      Ta ärendet
                    </button>
                  ) : selectedConversation.assignedTo !== currentUser.name &&
                    selectedConversation.status !== "resolved" ? (
                    <button
                      onClick={takeConversation}
                      className="min-h-10 rounded-xl border border-slate-200 bg-white px-3.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
                    >
                      Ta över
                    </button>
                  ) : (
                    <div className="hidden items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 sm:flex">
                      <span className="size-2 rounded-full bg-emerald-500" />
                      <span className="text-[0.68rem] font-bold text-emerald-800">
                        Tilldelad dig
                      </span>
                    </div>
                  )}
                  <button
                    onClick={() => setShowDetails((current) => !current)}
                    className="grid size-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e72e8a] 2xl:hidden"
                    aria-label="Visa ärendeinformation"
                  >
                    <InfoIcon className="size-4" />
                  </button>
                  <button
                    className="grid size-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e72e8a]"
                    aria-label="Fler åtgärder"
                  >
                    <MoreIcon className="size-4" />
                  </button>
                </div>
              </div>

              <div className="flex min-h-0 flex-1">
                <div className="flex min-w-0 flex-1 flex-col">
                  <div
                    className="min-h-0 flex-1 space-y-5 overflow-y-auto px-4 py-6 sm:px-7"
                    aria-live="polite"
                    aria-label={`Konversation med ${selectedConversation.visitorName}`}
                  >
                    <div className="flex justify-center">
                      <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[0.65rem] font-semibold text-slate-400">
                        Startad {formatClock(selectedConversation.createdAt)} från{" "}
                        {selectedConversation.source}
                      </span>
                    </div>

                    {selectedConversation.messages.map((item) =>
                      item.sender === "system" ? (
                        <div key={item.id} className="flex justify-center">
                          <p className="rounded-lg bg-slate-200/70 px-3 py-1.5 text-center text-[0.68rem] font-semibold text-slate-500">
                            {item.body}
                          </p>
                        </div>
                      ) : (
                        <div
                          key={item.id}
                          className={`flex gap-2.5 ${
                            item.sender === "employee"
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          {item.sender === "visitor" && (
                            <VisitorAvatar
                              name={selectedConversation.visitorName}
                              compact
                            />
                          )}
                          <div
                            className={`max-w-[min(76%,620px)] ${
                              item.sender === "employee" ? "text-right" : ""
                            }`}
                          >
                            <div className="mb-1 flex items-center gap-2 px-1 text-[0.65rem] font-semibold text-slate-400">
                              <span
                                className={
                                  item.sender === "employee" ? "ml-auto" : ""
                                }
                              >
                                {item.senderName}
                              </span>
                              <span>{formatClock(item.createdAt)}</span>
                            </div>
                            <div
                              className={`rounded-2xl px-4 py-3 text-left text-[0.84rem] leading-6 shadow-sm ${
                                item.sender === "employee"
                                  ? "rounded-br-md bg-[#332d3d] text-white"
                                  : "rounded-bl-md border border-slate-200 bg-white text-slate-800"
                              }`}
                            >
                              {item.body}
                            </div>
                            {item.sender === "employee" && (
                              <p className="mt-1 px-1 text-[0.62rem] font-semibold text-slate-400">
                                Levererat
                              </p>
                            )}
                          </div>
                          {item.sender === "employee" && (
                            <EmployeeAvatar compact />
                          )}
                        </div>
                      ),
                    )}
                    <div ref={messageEndRef} />
                  </div>

                  {selectedConversation.status === "resolved" ? (
                    <div className="shrink-0 border-t border-slate-200 bg-white p-4">
                      <div className="flex items-center justify-between gap-4 rounded-xl bg-emerald-50 px-4 py-3">
                        <div className="flex items-center gap-3">
                          <span className="grid size-9 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                            <CheckIcon className="size-4" />
                          </span>
                          <div>
                            <p className="text-xs font-bold text-emerald-950">
                              Ärendet är avslutat
                            </p>
                            <p className="mt-0.5 text-[0.68rem] text-emerald-800/70">
                              Konversationen är skrivskyddad.
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            setConversationStatus(
                              selectedConversation.id,
                              "open",
                            )
                          }
                          className="min-h-10 rounded-xl bg-white px-3 text-xs font-bold text-emerald-800 shadow-sm hover:bg-emerald-100"
                        >
                          Öppna igen
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="shrink-0 border-t border-slate-200 bg-white px-4 pb-4 pt-3 sm:px-5">
                      <div className="mb-2.5 flex items-center gap-2 overflow-x-auto pb-0.5">
                        <span className="shrink-0 text-[0.65rem] font-bold uppercase tracking-[0.1em] text-slate-400">
                          Snabbsvar
                        </span>
                        {quickReplies.map((reply) => (
                          <button
                            key={reply.label}
                            onClick={() => setDraft(reply.body)}
                            disabled={!canReply}
                            className="min-h-8 shrink-0 rounded-lg border border-slate-200 bg-white px-2.5 text-[0.68rem] font-bold text-slate-600 transition hover:border-pink-200 hover:bg-pink-50 hover:text-[#c81e70] disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            {reply.label}
                          </button>
                        ))}
                      </div>

                      <form onSubmit={handleSend}>
                        <div
                          className={`rounded-2xl border bg-white p-2 transition focus-within:ring-4 ${
                            canReply
                              ? "border-slate-300 focus-within:border-[#e72e8a] focus-within:ring-pink-100"
                              : "border-slate-200 bg-slate-50"
                          }`}
                        >
                          <label htmlFor="staff-message" className="sr-only">
                            Svar till {selectedConversation.visitorName}
                          </label>
                          <textarea
                            id="staff-message"
                            value={draft}
                            onChange={(event) => setDraft(event.target.value)}
                            onKeyDown={handleComposerKeyDown}
                            disabled={!canReply}
                            rows={2}
                            maxLength={2_000}
                            placeholder={
                              selectedConversation.assignedTo &&
                              selectedConversation.assignedTo !== currentUser.name
                                ? `Tilldelad ${selectedConversation.assignedTo}`
                                : "Skriv ett svar…"
                            }
                            className="max-h-32 min-h-14 w-full resize-none bg-transparent px-2 py-1 text-sm leading-6 text-slate-900 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed"
                          />
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                disabled
                                className="grid size-9 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 disabled:cursor-not-allowed"
                                aria-label="Bifoga fil, inte tillgängligt i MVP"
                                title="Bilagor ingår inte i MVP"
                              >
                                <PaperclipIcon className="size-4" />
                              </button>
                              <span className="hidden text-[0.62rem] font-medium text-slate-400 sm:inline">
                                Bilagor ingår inte i MVP
                              </span>
                            </div>
                            <button
                              type="submit"
                              disabled={!canReply || !draft.trim()}
                              className="btn-cta flex min-h-10 items-center gap-2 rounded-xl px-4 text-xs font-bold disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              Skicka svar
                              <SendIcon className="size-4" />
                            </button>
                          </div>
                        </div>
                      </form>

                      <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2">
                        <button
                          onClick={referToSecureChannel}
                          disabled={!canReply}
                          className="flex min-h-9 items-center gap-2 rounded-lg px-2 text-[0.68rem] font-bold text-[#b11e65] hover:bg-pink-50 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <ShieldIcon className="size-4" />
                          Hänvisa till säker patientkontakt
                        </button>
                        <div className="flex gap-1.5">
                          <button
                            onClick={() =>
                              setConversationStatus(
                                selectedConversation.id,
                                "waiting",
                              )
                            }
                            disabled={!canReply}
                            className="min-h-9 rounded-lg border border-slate-200 px-3 text-[0.68rem] font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-40"
                          >
                            Markera väntande
                          </button>
                          <button
                            onClick={() =>
                              setConversationStatus(
                                selectedConversation.id,
                                "resolved",
                              )
                            }
                            disabled={!canReply}
                            className="min-h-9 rounded-lg border border-slate-200 px-3 text-[0.68rem] font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-40"
                          >
                            Avsluta
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {showDetails && (
                  <div className="absolute inset-x-4 top-[120px] z-20 max-h-[calc(100%-150px)] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl md:inset-x-auto md:right-5 md:w-72 2xl:hidden">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-extrabold text-slate-900">
                        Ärendeinformation
                      </p>
                      <button
                        onClick={() => setShowDetails(false)}
                        className="grid size-9 place-items-center rounded-lg text-slate-400 hover:bg-slate-100"
                        aria-label="Stäng ärendeinformation"
                      >
                        <CloseIcon className="size-4" />
                      </button>
                    </div>
                    <DetailsContent conversation={selectedConversation} />
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center p-8 text-center">
              <div className="grid size-14 place-items-center rounded-2xl bg-white text-slate-400 shadow-sm">
                <ChatIcon className="size-7" />
              </div>
              <p className="mt-4 text-sm font-bold text-slate-800">
                Välj en konversation
              </p>
              <p className="mt-1 max-w-xs text-xs leading-5 text-slate-400">
                Ärendet och dess meddelanden visas här.
              </p>
            </div>
          )}
        </main>

        <aside className="hidden min-h-0 overflow-y-auto border-l border-slate-200 bg-white 2xl:block">
          {selectedConversation && (
            <div className="p-5">
              <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-slate-500">
                Ärendeinformation
              </p>
              <DetailsContent conversation={selectedConversation} />
            </div>
          )}
        </aside>
      </div>
      )}
      </div>
    </div>
  );
}

function AdminSidebar({
  activeSection,
  onSelectSection,
  unreadChatCount,
  unreadEmailCount,
  onSignOut,
}: {
  activeSection: AdminSection;
  onSelectSection: (section: AdminSection) => void;
  unreadChatCount: number;
  unreadEmailCount: number;
  onSignOut?: () => void;
}) {
  return (
    <aside className="flex w-[76px] shrink-0 flex-col items-center border-r border-slate-200 bg-[#211c2b] px-2 py-4 text-white">
      <nav className="flex flex-1 flex-col items-center gap-2" aria-label="Adminmeny">
        <button
          type="button"
          onClick={() => onSelectSection("callcenter")}
          className={`grid size-12 place-items-center rounded-2xl transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 ${activeSection === "callcenter" ? "bg-[#e72e8a] text-white shadow-lg shadow-pink-950/20" : "text-white/55 hover:bg-white/10 hover:text-white"}`}
          aria-current={activeSection === "callcenter" ? "page" : undefined}
          aria-label="Callcenter"
          title="Callcenter"
        >
          <PhoneIcon className="size-[22px]" />
        </button>
        <button
          type="button"
          onClick={() => onSelectSection("chat")}
          className={`relative grid size-12 place-items-center rounded-2xl transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 ${activeSection === "chat" ? "bg-[#e72e8a] text-white shadow-lg shadow-pink-950/20" : "text-white/55 hover:bg-white/10 hover:text-white"}`}
          aria-current={activeSection === "chat" ? "page" : undefined}
          aria-label="Chatt"
          title="Chatt"
        >
          <ChatIcon className="size-[22px]" />
          {unreadChatCount > 0 && (
            <span
              className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-red-600 text-[0.6rem] font-extrabold leading-none text-white ring-2 ring-[#211c2b]"
              aria-label={`${unreadChatCount} olästa meddelanden`}
            >
              {unreadChatCount > 9 ? "9+" : unreadChatCount}
            </span>
          )}
        </button>
        <button
          type="button"
          onClick={() => onSelectSection("ads")}
          className={`grid size-12 place-items-center rounded-2xl transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 ${activeSection === "ads" ? "bg-[#e72e8a] text-white shadow-lg shadow-pink-950/20" : "text-white/55 hover:bg-white/10 hover:text-white"}`}
          aria-current={activeSection === "ads" ? "page" : undefined}
          aria-label="Annonsering"
          title="Annonsering"
        >
          <AdsIcon className="size-[22px]" />
        </button>
        <button
          type="button"
          onClick={() => onSelectSection("health-data")}
          className={`grid size-12 place-items-center rounded-2xl transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 ${activeSection === "health-data" ? "bg-[#e72e8a] text-white shadow-lg shadow-pink-950/20" : "text-white/55 hover:bg-white/10 hover:text-white"}`}
          aria-current={activeSection === "health-data" ? "page" : undefined}
          aria-label="GoHealth"
          title="GoHealth"
        >
          <HealthDataIcon className="size-[22px]" />
        </button>
        <button
          type="button"
          onClick={() => onSelectSection("email")}
          className={`relative grid size-12 place-items-center rounded-2xl transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 ${activeSection === "email" ? "bg-[#e72e8a] text-white shadow-lg shadow-pink-950/20" : "text-white/55 hover:bg-white/10 hover:text-white"}`}
          aria-current={activeSection === "email" ? "page" : undefined}
          aria-label="E-post"
          title="E-post"
        >
          <EmailIcon className="size-[22px]" />
          {unreadEmailCount > 0 && (
            <span
              className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-red-600 text-[0.6rem] font-extrabold leading-none text-white ring-2 ring-[#211c2b]"
              aria-label={`${unreadEmailCount} nya mejl`}
            >
              {unreadEmailCount > 9 ? "9+" : unreadEmailCount}
            </span>
          )}
        </button>
      </nav>

      {onSignOut && (
        <button
          type="button"
          onClick={onSignOut}
          className="grid size-11 place-items-center rounded-2xl text-white/55 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300"
          aria-label="Logga ut"
          title="Logga ut"
        >
          <LogOutIcon className="size-5" />
        </button>
      )}
    </aside>
  );
}

function ConversationRow({
  conversation,
  selected,
  onClick,
}: {
  conversation: ChatConversation;
  selected: boolean;
  onClick: () => void;
}) {
  const latest = conversation.messages.at(-1);
  const unread = conversation.messages.some(
    (item) => item.sender === "visitor" && !item.readByStaff,
  );

  return (
    <button
      onClick={onClick}
      className={`relative flex w-full gap-3 border-b border-slate-100 px-4 py-4 text-left transition focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#e72e8a] ${
        selected ? "bg-[#fff4f8]" : "bg-white hover:bg-slate-50"
      }`}
    >
      {selected && (
        <span className="absolute inset-y-0 left-0 w-1 bg-[#e72e8a]" />
      )}
      <VisitorAvatar name={conversation.visitorName} />
      <span className="min-w-0 flex-1">
        <span className="flex items-start justify-between gap-2">
          <span
            className={`truncate text-xs ${
              unread ? "font-extrabold text-slate-950" : "font-bold text-slate-800"
            }`}
          >
            {conversation.visitorName}
          </span>
          <span
            suppressHydrationWarning
            className="shrink-0 text-[0.62rem] font-semibold text-slate-400"
          >
            {formatRelativeTime(conversation.updatedAt)}
          </span>
        </span>
        <span className="mt-1 flex items-center gap-1.5">
          <span className="truncate text-[0.66rem] font-bold text-[#c81e70]">
            {conversation.topic}
          </span>
          <span className="text-[0.62rem] text-slate-300">·</span>
          <span className="text-[0.62rem] font-semibold text-slate-400">
            {conversation.reference}
          </span>
        </span>
        <span
          className={`mt-1.5 block truncate text-[0.72rem] leading-5 ${
            unread ? "font-semibold text-slate-700" : "text-slate-500"
          }`}
        >
          {latest?.sender === "employee" ? "Du: " : ""}
          {latest?.body}
        </span>
        <span className="mt-2 flex items-center justify-between gap-2">
          <StatusBadge status={conversation.status} />
          {unread && (
            <span className="grid size-5 place-items-center rounded-full bg-[#e72e8a] text-[0.58rem] font-extrabold text-white">
              {
                conversation.messages.filter(
                  (item) => item.sender === "visitor" && !item.readByStaff,
                ).length
              }
            </span>
          )}
        </span>
      </span>
    </button>
  );
}

function DetailsContent({
  conversation,
}: {
  conversation: ChatConversation;
}) {
  return (
    <div className="mt-4">
      <div className="flex flex-col items-center border-b border-slate-100 pb-5 text-center">
        <VisitorAvatar name={conversation.visitorName} large />
        <p className="mt-3 text-sm font-extrabold text-slate-950">
          {conversation.visitorName}
        </p>
        <p className="mt-1 text-[0.68rem] font-medium text-slate-400">
          {conversation.reference}
        </p>
      </div>

      <dl className="space-y-4 py-5">
        <DetailRow label="Ämne" value={conversation.topic} />
        <DetailRow label="Källa" value={conversation.source} />
        <DetailRow
          label="Tilldelad"
          value={conversation.assignedTo ?? "Inte tilldelad"}
        />
        <DetailRow
          label="Startad"
          value={`${new Intl.DateTimeFormat("sv-SE", {
            day: "numeric",
            month: "short",
          }).format(conversation.createdAt)}, ${formatClock(
            conversation.createdAt,
          )}`}
        />
        {conversation.visitorEmail && (
          <DetailRow label="Avisering" value={conversation.visitorEmail} />
        )}
      </dl>

      <div className="border-t border-slate-100 pt-5">
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.1em] text-slate-400">
          Säkerhetsklassning
        </p>
        <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-3">
          <div className="flex items-center gap-2">
            <ShieldIcon className="size-4 text-amber-700" />
            <p className="text-[0.68rem] font-bold text-amber-950">
              Administrativ kundservice
            </p>
          </div>
          <p className="mt-1.5 text-[0.65rem] leading-4 text-amber-900/70">
            Inga medicinska bedömningar eller patientuppgifter ska hanteras i
            denna kanal.
          </p>
        </div>
      </div>

      <div className="mt-5 border-t border-slate-100 pt-5">
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.1em] text-slate-400">
          Händelselogg
        </p>
        <div className="mt-3 space-y-3">
          <TimelineItem
            title="Konversation startad"
            time={formatClock(conversation.createdAt)}
          />
          {conversation.assignedTo && (
            <TimelineItem
              title={`Tilldelad ${conversation.assignedTo}`}
              time={formatClock(
                conversation.messages.find((item) =>
                  item.body.includes("har anslutit"),
                )?.createdAt ?? conversation.updatedAt,
              )}
            />
          )}
          {conversation.status === "resolved" && (
            <TimelineItem
              title="Ärendet avslutat"
              time={formatClock(conversation.updatedAt)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[0.62rem] font-bold uppercase tracking-[0.08em] text-slate-400">
        {label}
      </dt>
      <dd className="mt-1 break-words text-xs font-semibold text-slate-700">
        {value}
      </dd>
    </div>
  );
}

function TimelineItem({ title, time }: { title: string; time: string }) {
  return (
    <div className="flex gap-2.5">
      <span className="mt-1 size-2 shrink-0 rounded-full bg-slate-300" />
      <div className="min-w-0">
        <p className="text-[0.68rem] font-semibold text-slate-600">{title}</p>
        <p className="mt-0.5 text-[0.62rem] text-slate-400">{time}</p>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: ConversationStatus }) {
  const config: Record<
    ConversationStatus,
    { label: string; className: string }
  > = {
    new: { label: "Ny", className: "bg-pink-100 text-[#b11e65]" },
    open: { label: "Pågår", className: "bg-blue-100 text-blue-700" },
    waiting: { label: "Väntar", className: "bg-amber-100 text-amber-800" },
    resolved: { label: "Avslutad", className: "bg-emerald-100 text-emerald-700" },
  };

  return (
    <span
      className={`inline-flex rounded-full px-2 py-0.5 text-[0.6rem] font-extrabold ${config[status].className}`}
    >
      {config[status].label}
    </span>
  );
}

function VisitorAvatar({
  name,
  compact = false,
  large = false,
}: {
  name: string;
  compact?: boolean;
  large?: boolean;
}) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const size = large ? "size-14 text-sm" : compact ? "size-7 text-[0.58rem]" : "size-10 text-xs";

  return (
    <div
      className={`grid ${size} shrink-0 place-items-center rounded-full bg-[#efe4ea] font-extrabold text-[#9f1f5f]`}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}

function EmployeeAvatar({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`grid ${
        compact ? "size-7 text-[0.58rem]" : "size-10 text-xs"
      } shrink-0 place-items-center rounded-full bg-[#312a3c] font-extrabold text-white`}
      aria-hidden="true"
    >
      HL
    </div>
  );
}

type IconProps = { className?: string };

function QueueIcon({
  name,
  className,
}: IconProps & {
  name: "inbox" | "user" | "clock" | "check" | "layers";
}) {
  if (name === "user") return <UserIcon className={className} />;
  if (name === "clock") return <ClockIcon className={className} />;
  if (name === "check") return <CheckIcon className={className} />;
  if (name === "layers") return <LayersIcon className={className} />;
  return <InboxIcon className={className} />;
}

function BaseIcon({
  className,
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function InboxIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M4 4h16v16H4zM4 14h4l2 3h4l2-3h4" />
    </BaseIcon>
  );
}

function UserIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c.7-4.5 3.3-7 8-7s7.3 2.5 8 7" />
    </BaseIcon>
  );
}

function ClockIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </BaseIcon>
  );
}

function CheckIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m5 12 4 4L19 6" />
    </BaseIcon>
  );
}

function LayersIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5M3 16l9 5 9-5" />
    </BaseIcon>
  );
}

function SearchIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </BaseIcon>
  );
}

function FilterIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M4 6h16M7 12h10M10 18h4" />
    </BaseIcon>
  );
}

function ShieldIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 22s8-3.8 8-10V5l-8-3-8 3v7c0 6.2 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </BaseIcon>
  );
}

function ChevronDownIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m7 10 5 5 5-5" />
    </BaseIcon>
  );
}

function ArrowLeftIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m15 18-6-6 6-6" />
    </BaseIcon>
  );
}

function MoreIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="5" cy="12" r="1" fill="currentColor" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
      <circle cx="19" cy="12" r="1" fill="currentColor" />
    </BaseIcon>
  );
}

function InfoIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8h.01" />
    </BaseIcon>
  );
}

function PaperclipIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m21 11-8.8 8.8a6 6 0 0 1-8.5-8.5l9.2-9.2a4 4 0 0 1 5.7 5.7l-9.2 9.2a2 2 0 0 1-2.8-2.8l8.5-8.5" />
    </BaseIcon>
  );
}

function SendIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </BaseIcon>
  );
}

function CloseIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m6 6 12 12M18 6 6 18" />
    </BaseIcon>
  );
}

function ChatIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
    </BaseIcon>
  );
}

function PhoneIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" />
    </BaseIcon>
  );
}

function AdsIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M4 19V5M4 19h16M8 16v-4m4 4V8m4 8v-6" />
    </BaseIcon>
  );
}

function HealthDataIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M3 12h4l2-5 4 10 2-5h6" />
      <path d="M5 4.5a9 9 0 1 1-1.5 12" />
    </BaseIcon>
  );
}

function EmailIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function LogOutIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M10 17 15 12 10 7" />
      <path d="M15 12H3" />
      <path d="M21 4v16" />
    </BaseIcon>
  );
}
