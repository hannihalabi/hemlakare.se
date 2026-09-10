"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import Link from "next/link";
import { useAdminConversations } from "@/hooks/useAdminConversations";
import {
  formatClock,
  formatRelativeTime,
  type ChatConversation,
  type ConversationStatus,
} from "@/lib/chat-demo";
import type { AdminRole } from "@/lib/content-types";
import ContentWorkspace from "@/components/admin/ContentWorkspace";
import SeoWorkspace from "@/components/admin/SeoWorkspace";

type QueueFilter = "new" | "mine" | "waiting" | "resolved" | "all";
type AdminTab = "chat" | "blog" | "statistics";

const adminTabs: Array<{
  id: AdminTab;
  label: string;
  icon: "chat" | "blog" | "statistics";
}> = [
  { id: "chat", label: "Chatt", icon: "chat" },
  { id: "blog", label: "Blogg", icon: "blog" },
  { id: "statistics", label: "Statistik", icon: "statistics" },
];

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
    refresh,
  } = useAdminConversations();
  const [filter, setFilter] = useState<QueueFilter>("new");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState("demo-1041");
  const [draft, setDraft] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [mobileThreadOpen, setMobileThreadOpen] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState<AdminTab>("chat");
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
      <div className="flex min-h-9 shrink-0 items-center justify-center gap-2 bg-[#312a3c] px-4 text-center text-[0.7rem] font-semibold tracking-wide text-white">
        <BeakerIcon className="size-3.5 text-pink-300" />
        <span className="sm:hidden">ADMIN MVP · DATABAS</span>
        <span className="hidden sm:inline">
          ADMIN MVP
          <span className="mx-2 text-white/45">·</span>
          DATABASANSLUTEN
          <span className="mx-2 text-white/45">·</span>
          <span className="text-white/70">
            SÄKER SESSION OCH RIKTIG BACKEND
          </span>
        </span>
      </div>

      <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <BrandMark />
          <div className="min-w-0">
            <p className="truncate text-[0.92rem] font-extrabold tracking-tight text-slate-950">
              hemläkare<span className="text-[#e72e8a]">.se</span>
            </p>
            <p className="text-[0.68rem] font-semibold text-slate-400">
              Kundservice
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/chatt-demo"
            className="hidden min-h-10 items-center gap-2 rounded-xl border border-slate-200 px-3 text-xs font-bold text-slate-600 transition hover:bg-slate-50 md:flex"
          >
            <PresentationIcon className="size-4" />
            Presentationsvy
          </Link>
          <Link
            href="/"
            target="_blank"
            className="hidden min-h-10 items-center gap-2 rounded-xl border border-slate-200 px-3 text-xs font-bold text-slate-600 transition hover:bg-slate-50 sm:flex"
          >
            <ExternalIcon className="size-4" />
            Öppna besökarvy
          </Link>
          <button
            onClick={() => void refresh()}
            className="grid size-10 place-items-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e72e8a]"
            aria-label="Uppdatera inkorg"
            title="Uppdatera inkorg"
          >
            <RefreshIcon className="size-4" />
          </button>
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
          activeTab={activeAdminTab}
          unreadChatCount={unreadChatCount}
          onSelectTab={setActiveAdminTab}
          onSignOut={onSignOut}
        />

        {activeAdminTab === "blog" ? (
          <ContentWorkspace role={currentUser.role} />
        ) : activeAdminTab === "statistics" ? (
          <SeoWorkspace role={currentUser.role} />
        ) : (
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
  activeTab,
  unreadChatCount,
  onSelectTab,
  onSignOut,
}: {
  activeTab: AdminTab;
  unreadChatCount: number;
  onSelectTab: (tab: AdminTab) => void;
  onSignOut?: () => void;
}) {
  return (
    <aside className="flex w-[76px] shrink-0 flex-col items-center border-r border-slate-200 bg-[#211c2b] px-2 py-4 text-white">
      <nav className="flex flex-1 flex-col items-center gap-2" aria-label="Adminmeny">
        {adminTabs.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelectTab(item.id)}
            className={`group relative flex min-h-[58px] w-full flex-col items-center justify-center gap-1 rounded-2xl text-[0.62rem] font-extrabold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 ${
              activeTab === item.id
                ? "bg-[#e72e8a] text-white shadow-lg shadow-pink-950/20"
                : "text-white/55 hover:bg-white/10 hover:text-white"
            }`}
            aria-current={activeTab === item.id ? "page" : undefined}
            title={item.label}
          >
            <AdminTabIcon name={item.icon} className="size-5" />
            <span>{item.label}</span>
            {item.id === "chat" && unreadChatCount > 0 && (
              <span
                className="absolute right-1.5 top-1.5 grid size-5 place-items-center rounded-full bg-red-600 text-[0.6rem] font-extrabold leading-none text-white ring-2 ring-[#211c2b]"
                aria-label={`${unreadChatCount} olästa meddelanden`}
              >
                {unreadChatCount > 9 ? "9+" : unreadChatCount}
              </span>
            )}
          </button>
        ))}
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

function BrandMark() {
  return (
    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[linear-gradient(180deg,#e72e8a,#d81b7d)] text-white shadow-sm">
      <HeartIcon className="size-5" />
    </span>
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

function AdminTabIcon({
  name,
  className,
}: IconProps & {
  name: "chat" | "blog" | "statistics";
}) {
  if (name === "blog") return <BlogIcon className={className} />;
  if (name === "statistics") return <StatsIcon className={className} />;
  return <ChatIcon className={className} />;
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

function HeartIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
    </BaseIcon>
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

function RefreshIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M20 7h-6V1" />
      <path d="M20 7a9 9 0 1 0 1 8" />
    </BaseIcon>
  );
}

function ExternalIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M14 4h6v6M20 4l-9 9" />
      <path d="M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6" />
    </BaseIcon>
  );
}

function PresentationIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M4 4h16v11H4zM8 20l4-5 4 5" />
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

function BlogIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </BaseIcon>
  );
}

function StatsIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M4 19V5M4 19h16" />
      <path d="M8 16v-5M12 16V8M16 16v-8" />
    </BaseIcon>
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

function BeakerIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M9 3h6M10 3v5l-5 9a3 3 0 0 0 2.6 4h8.8a3 3 0 0 0 2.6-4l-5-9V3" />
      <path d="M7.5 15h9" />
    </BaseIcon>
  );
}
