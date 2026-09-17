"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { chatFaqLinks as articles } from "@/data/chatFaqLinks";
import { formatClock, topicOptions, type ChatTopic } from "@/lib/chat-demo";
import { useVisitorChat } from "@/hooks/useVisitorChat";

type WidgetView = "intro" | "topic" | "conversation";

const BUBBLE_SHOW_DELAY_MS = 2_500;
const BUBBLE_AUTO_DISMISS_MS = 10_000;

export default function ChatWidget() {
  const {
    visitorConversation,
    startConversation,
    sendMessage,
    rateConversation,
    startNewVisitorConversation,
  } = useVisitorChat();
  const [open, setOpen] = useState(false);
  const [bubble, setBubble] = useState(false);
  const [view, setView] = useState<WidgetView>("intro");
  const [visitorName, setVisitorName] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<ChatTopic>(
    "Boka eller omboka",
  );
  const [safetyAccepted, setSafetyAccepted] = useState(false);
  const [draft, setDraft] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(
      () => setBubble(true),
      BUBBLE_SHOW_DELAY_MS,
    );
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!bubble) return;

    const timer = window.setTimeout(
      () => setBubble(false),
      BUBBLE_AUTO_DISMISS_MS,
    );
    return () => window.clearTimeout(timer);
  }, [bubble]);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const focusable = panel?.querySelectorAll<HTMLElement>(
      'button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    focusable?.[0]?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeWidget();
        return;
      }

      if (event.key !== "Tab" || !panel) return;
      const items = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (view !== "conversation") return;
    messageEndRef.current?.scrollIntoView({ block: "nearest" });
  }, [view, visitorConversation?.messages.length]);

  function openWidget() {
    setBubble(false);
    setOpen(true);
    setView(visitorConversation ? "conversation" : "intro");
  }

  function closeWidget() {
    setOpen(false);
    window.setTimeout(() => launcherRef.current?.focus(), 0);
  }

  async function handleStartConversation(event: FormEvent) {
    event.preventDefault();
    if (!safetyAccepted) return;

    await startConversation({
      visitorName: visitorName.trim() || "Besökare",
      topic: selectedTopic,
    });
    setView("conversation");
  }

  function handleSend(event: FormEvent) {
    event.preventDefault();
    if (!visitorConversation || !draft.trim()) return;
    sendMessage(visitorConversation.id, draft);
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

  function beginAnotherConversation() {
    startNewVisitorConversation();
    setVisitorName("");
    setSafetyAccepted(false);
    setDraft("");
    setView("topic");
  }

  const assignedName = visitorConversation?.assignedTo;
  const isResolved = visitorConversation?.status === "resolved";

  return (
    <div className="fixed bottom-5 right-5 z-[70] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {bubble && !open && (
        <div className="relative hidden w-[326px] rounded-[22px] border border-slate-200/80 bg-white p-4 shadow-[0_18px_55px_rgba(26,26,46,0.16)] sm:block">
          <button
            onClick={() => setBubble(false)}
            className="absolute right-2.5 top-2.5 grid size-9 place-items-center rounded-full text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e72e8a]"
            aria-label="Stäng välkomstmeddelandet"
          >
            <CloseIcon className="size-4" />
          </button>

          <div className="flex items-center gap-3 pr-8">
            <TeamAvatar size="md" />
            <div>
              <p className="text-[0.9rem] font-bold text-slate-900">
                Helena från Hemläkare
              </p>
              <p className="mt-0.5 flex items-center gap-1.5 text-xs font-medium text-emerald-700">
                <span className="size-2 rounded-full bg-emerald-500" />
                Online · svar inom ca 2 min
              </p>
            </div>
          </div>

          <p className="mt-3 text-[0.9rem] leading-6 text-slate-600">
            Hej! Vi hjälper dig gärna med bokning, priser och hur tjänsten
            fungerar.
          </p>
          <button
            onClick={openWidget}
            className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#e72e8a] px-4 text-sm font-bold text-white shadow-sm transition hover:bg-[#d81b7d] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pink-200"
          >
            Starta chatt
            <ArrowRightIcon className="size-4" />
          </button>
          <div className="absolute -bottom-2 right-8 size-4 rotate-45 border-b border-r border-slate-200/80 bg-white" />
        </div>
      )}

      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="chat-widget-title"
          className="fixed inset-0 flex h-dvh flex-col overflow-hidden bg-white shadow-2xl sm:static sm:h-[min(680px,calc(100vh-112px))] sm:w-[390px] sm:rounded-[26px] sm:border sm:border-slate-200/80"
        >
          <header className="shrink-0 border-b border-slate-100 bg-white px-4 py-3.5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                {view !== "intro" && (
                  <button
                    onClick={() =>
                      setView(
                        view === "conversation" && visitorConversation
                          ? "intro"
                          : "intro",
                      )
                    }
                    className="grid size-11 shrink-0 place-items-center rounded-full text-slate-600 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e72e8a]"
                    aria-label="Tillbaka till chattens startsida"
                  >
                    <ArrowLeftIcon className="size-5" />
                  </button>
                )}
                <TeamAvatar size="sm" online />
                <div className="min-w-0">
                  <h2
                    id="chat-widget-title"
                    className="truncate text-sm font-bold text-slate-950"
                  >
                    {assignedName ?? "Helena från Hemläkare"}
                  </h2>
                </div>
              </div>
              <button
                onClick={closeWidget}
                className="grid size-11 shrink-0 place-items-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e72e8a]"
                aria-label="Stäng chatten"
              >
                <CloseIcon className="size-5" />
              </button>
            </div>
          </header>

          {view === "intro" && (
            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-[#faf7f9]">
              <div className="bg-[linear-gradient(145deg,#fff2f8_0%,#fff_68%)] px-5 pb-5 pt-6">
                <h3 className="text-[1.55rem] font-bold leading-tight tracking-[-0.025em] text-slate-950">
                  Hej! Hur kan vi hjälpa dig?
                </h3>
                <div className="relative mt-4 h-48 overflow-hidden rounded-2xl border border-white/70 bg-pink-50 shadow-sm">
                  <Image
                    src="/landningspage/hemlakare-grupp.png"
                    alt="Hemläkare.se team"
                    fill
                    sizes="(max-width: 640px) 100vw, 360px"
                    className="object-cover object-[center_28%]"
                  />
                </div>
                <a
                  href="tel:0108086084"
                  className="btn-cta mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl px-5 text-sm font-bold"
                >
                  <PhoneIcon className="size-5" />
                  Ring 010-808 60 84
                </a>
                <p className="mt-2 text-center text-[0.72rem] font-medium text-slate-500">
                  Vi har öppet dygnet runt
                </p>
                <a
                  href="https://wa.me/46108086084"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border-2 border-[#25d366] bg-white px-5 text-sm font-bold text-[#128c4a] transition hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-100"
                >
                  <ChatIcon className="size-5" />
                  WhatsApp 010-808 60 84
                </a>
              </div>

              <div className="mx-4 mb-5 mt-4 rounded-2xl border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-[0.1em] text-slate-500">
                    Vanliga frågor
                  </p>
                  <Link
                    href="/faq"
                    className="text-xs font-bold text-[#d81b7d] hover:underline"
                  >
                    Visa alla
                  </Link>
                </div>
                <div className="mt-2">
                  {articles.slice(0, 3).map((article) => (
                    <Link
                      key={article.href}
                      href={article.href}
                      className="flex min-h-11 items-center justify-between gap-3 border-b border-slate-100 text-sm font-medium text-slate-700 last:border-0 hover:text-[#d81b7d]"
                    >
                      <span>{article.label}</span>
                      <ArrowRightIcon className="size-4 shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {view === "topic" && (
            <form
              onSubmit={handleStartConversation}
              className="flex min-h-0 flex-1 flex-col bg-white"
            >
              <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#d81b7d]">
                  Steg 1 av 1
                </p>
                <h3 className="mt-2 text-xl font-bold tracking-tight text-slate-950">
                  Vad gäller din fråga?
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Då hamnar du snabbare hos rätt medarbetare.
                </p>

                <fieldset className="mt-5 space-y-2">
                  <legend className="sr-only">Välj ämne</legend>
                  {topicOptions.map((topic) => {
                    const checked = selectedTopic === topic.value;
                    return (
                      <label
                        key={topic.value}
                        className={`flex min-h-[58px] cursor-pointer items-center gap-3 rounded-2xl border px-3.5 py-2.5 transition ${
                          checked
                            ? "border-[#e72e8a] bg-pink-50/60 ring-1 ring-[#e72e8a]"
                            : "border-slate-200 bg-white hover:border-slate-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="topic"
                          value={topic.value}
                          checked={checked}
                          onChange={() => setSelectedTopic(topic.value)}
                          className="size-4 accent-[#e72e8a]"
                        />
                        <span className="min-w-0">
                          <span className="block text-sm font-bold text-slate-900">
                            {topic.value}
                          </span>
                          <span className="mt-0.5 block text-xs text-slate-500">
                            {topic.description}
                          </span>
                        </span>
                      </label>
                    );
                  })}
                </fieldset>

                <label className="mt-5 block">
                  <span className="text-sm font-bold text-slate-800">
                    Förnamn{" "}
                    <span className="font-normal text-slate-400">(valfritt)</span>
                  </span>
                  <input
                    value={visitorName}
                    onChange={(event) => setVisitorName(event.target.value)}
                    maxLength={40}
                    autoComplete="given-name"
                    placeholder="Till exempel Anna"
                    className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#e72e8a] focus:ring-4 focus:ring-pink-100"
                  />
                </label>

                <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-xl bg-slate-50 p-3.5">
                  <input
                    type="checkbox"
                    checked={safetyAccepted}
                    onChange={(event) =>
                      setSafetyAccepted(event.target.checked)
                    }
                    className="mt-0.5 size-4 shrink-0 accent-[#e72e8a]"
                  />
                  <span className="text-xs leading-5 text-slate-600">
                    Jag förstår att jag inte ska skriva personnummer, symtom
                    eller andra känsliga hälsouppgifter i den här chatten.
                  </span>
                </label>
              </div>

              <div className="shrink-0 border-t border-slate-100 bg-white p-4">
                <button
                  type="submit"
                  disabled={!safetyAccepted}
                  className="btn-cta flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl px-5 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-45"
                >
                  Starta konversation
                  <ArrowRightIcon className="size-4" />
                </button>
              </div>
            </form>
          )}

          {view === "conversation" && visitorConversation && (
            <div className="flex min-h-0 flex-1 flex-col bg-[#f7f5f6]">
              <div className="border-b border-pink-100 bg-pink-50 px-4 py-2.5">
                <p className="flex items-center gap-2 text-[0.72rem] font-medium leading-5 text-[#9f1f5f]">
                  <ShieldIcon className="size-4 shrink-0" />
                  Administrativ chatt · skriv inga känsliga hälsouppgifter
                </p>
              </div>

              <div
                className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-5"
                aria-live="polite"
                aria-label="Meddelanden"
              >
                <div className="flex justify-center">
                  <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[0.68rem] font-semibold text-slate-500">
                    {visitorConversation.topic} ·{" "}
                    {visitorConversation.reference}
                  </span>
                </div>

                {visitorConversation.messages.map((item) =>
                  item.sender === "system" ? (
                    <div key={item.id} className="flex justify-center px-4">
                      <p className="rounded-xl bg-slate-200/70 px-3 py-2 text-center text-[0.72rem] font-medium leading-5 text-slate-600">
                        {item.body}
                      </p>
                    </div>
                  ) : (
                    <div
                      key={item.id}
                      className={`flex ${
                        item.sender === "visitor"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[82%] ${
                          item.sender === "visitor" ? "text-right" : ""
                        }`}
                      >
                        {item.sender === "employee" && (
                          <p className="mb-1 ml-1 text-[0.68rem] font-bold text-slate-500">
                            {item.senderName}
                          </p>
                        )}
                        <div
                          className={`rounded-2xl px-3.5 py-2.5 text-left text-sm leading-[1.45] shadow-sm ${
                            item.sender === "visitor"
                              ? "rounded-br-md bg-[#df247f] text-white"
                              : "rounded-bl-md border border-slate-200 bg-white text-slate-800"
                          }`}
                        >
                          {item.body}
                        </div>
                        <p className="mx-1 mt-1 text-[0.64rem] font-medium text-slate-400">
                          {formatClock(item.createdAt)}
                          {item.sender === "visitor" ? " · Skickat" : ""}
                        </p>
                      </div>
                    </div>
                  ),
                )}
                <div ref={messageEndRef} />
              </div>

              {isResolved ? (
                <div className="shrink-0 border-t border-slate-200 bg-white p-4">
                  {visitorConversation.satisfaction ? (
                    <div className="rounded-2xl bg-emerald-50 p-4 text-center">
                      <CheckIcon className="mx-auto size-6 text-emerald-600" />
                      <p className="mt-2 text-sm font-bold text-emerald-950">
                        Tack för din återkoppling!
                      </p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="text-sm font-bold text-slate-900">
                        Chatten är avslutad
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Fick du den hjälp du behövde?
                      </p>
                      <div className="mt-3 flex justify-center gap-2">
                        <button
                          onClick={() =>
                            rateConversation(visitorConversation.id, "yes")
                          }
                          className="min-h-11 rounded-xl border border-slate-200 px-5 text-sm font-bold text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e72e8a]"
                        >
                          Ja
                        </button>
                        <button
                          onClick={() =>
                            rateConversation(visitorConversation.id, "no")
                          }
                          className="min-h-11 rounded-xl border border-slate-200 px-5 text-sm font-bold text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e72e8a]"
                        >
                          Nej
                        </button>
                      </div>
                    </div>
                  )}
                  <button
                    onClick={beginAnotherConversation}
                    className="mt-3 min-h-11 w-full text-sm font-bold text-[#d81b7d] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e72e8a]"
                  >
                    Starta en ny chatt
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSend}
                  className="shrink-0 border-t border-slate-200 bg-white p-3"
                >
                  <div className="flex items-end gap-2 rounded-2xl border border-slate-300 bg-white p-1.5 pl-3 focus-within:border-[#e72e8a] focus-within:ring-4 focus-within:ring-pink-100">
                    <label htmlFor="visitor-message" className="sr-only">
                      Meddelande till Helena från Hemläkare
                    </label>
                    <textarea
                      id="visitor-message"
                      value={draft}
                      onChange={(event) => setDraft(event.target.value)}
                      onKeyDown={handleComposerKeyDown}
                      rows={1}
                      maxLength={1_000}
                      placeholder="Skriv ditt meddelande…"
                      className="max-h-24 min-h-10 flex-1 resize-none bg-transparent py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                    />
                    <button
                      type="submit"
                      disabled={!draft.trim()}
                      className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#e72e8a] text-white transition hover:bg-[#d81b7d] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e72e8a] focus-visible:ring-offset-2"
                      aria-label="Skicka meddelande"
                    >
                      <SendIcon className="size-5" />
                    </button>
                  </div>
                  <p className="mt-2 text-center text-[0.65rem] text-slate-400">
                    Enter skickar · Skift + Enter ger ny rad
                  </p>
                </form>
              )}
            </div>
          )}
        </div>
      )}

      {!open && (
        <button
          ref={launcherRef}
          onClick={openWidget}
          className="chat-launcher-attention group flex min-h-14 items-center rounded-full bg-[#e72e8a] text-white shadow-[0_8px_28px_rgba(231,46,138,0.38)] transition hover:-translate-y-0.5 hover:bg-[#d81b7d] hover:shadow-[0_12px_34px_rgba(231,46,138,0.44)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pink-200 active:translate-y-0"
          aria-label="Öppna chatten – kundservice är online"
          aria-haspopup="dialog"
        >
          <span className="hidden pl-5 pr-2 text-sm font-bold sm:inline">
            Chatta med oss
          </span>
          <span className="grid size-14 place-items-center">
            <TeamAvatar size="lg" online />
          </span>
        </button>
      )}
    </div>
  );
}

function TeamAvatar({
  size,
  online = false,
}: {
  size: "sm" | "md" | "lg";
  online?: boolean;
}) {
  const dimensions =
    size === "lg" ? "size-12" : size === "md" ? "size-11" : "size-10";
  const imageSize = size === "lg" ? "48px" : size === "md" ? "44px" : "40px";

  return (
    <div className={`relative ${dimensions} shrink-0`} aria-hidden="true">
      <div className="relative size-full overflow-hidden rounded-full bg-pink-50 ring-2 ring-white">
        <Image
          src="/bilder/chatt och admin/kundservice.jpg"
          alt=""
          fill
          sizes={imageSize}
          className="object-cover"
        />
      </div>
      {online && (
        <span className="absolute bottom-0.5 right-0.5 size-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
      )}
    </div>
  );
}

type IconProps = { className?: string };

function ChatIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
    </svg>
  );
}

function PhoneIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function CloseIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

function ArrowRightIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function ArrowLeftIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ShieldIcon({ className }: IconProps) {
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
      <path d="M12 22s8-3.8 8-10V5l-8-3-8 3v7c0 6.2 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function SendIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

function CheckIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 2.5 2.5L16 9" />
    </svg>
  );
}
