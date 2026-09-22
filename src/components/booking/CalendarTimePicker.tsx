"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export type AvailableSlot = { start: string; end: string };

const WEEKDAY_LABELS = ["M", "T", "O", "T", "F", "L", "S"];

function dateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function isSameDay(a: Date, b: Date): boolean {
  return dateKey(a) === dateKey(b);
}

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

/** Måndag som första kolumn i kalendergridet. */
function gridStartForMonth(monthStart: Date): Date {
  const jsWeekday = monthStart.getDay(); // 0 = söndag
  const mondayIndexedWeekday = (jsWeekday + 6) % 7; // 0 = måndag
  const start = new Date(monthStart);
  start.setDate(start.getDate() - mondayIndexedWeekday);
  return start;
}

function formatMonthLabel(date: Date): string {
  const label = date.toLocaleDateString("sv-SE", { month: "long", year: "numeric" });
  return label.charAt(0).toUpperCase() + label.slice(1);
}

function formatDayHeading(date: Date): string {
  const label = date.toLocaleDateString("sv-SE", { weekday: "long", day: "numeric", month: "long" });
  return label.charAt(0).toUpperCase() + label.slice(1);
}

function formatTimeLabel(iso: string) {
  return new Date(iso).toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" });
}

/**
 * PLATSHÅLLARDATA för investerardemo – ingen verklig bokningsstatistik.
 * Ger ett deterministiskt (samma dag → samma tal) men till synes slumpat
 * antal "bokade patienter" mellan 6 och 16 för passerade dagar som saknar
 * riktiga tider, för att visuellt kommunicera efterfrågan i prototypen.
 * Byt ut mot verklig beläggningsdata innan detta går mot skarp trafik.
 */
function demoBookedCountForPastDay(key: string): number {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  }
  return 6 + (hash % 11); // 6–16
}

function timeOfDayLabel(hour: number): string {
  if (hour < 12) return "Förmiddag";
  if (hour < 17) return "Eftermiddag";
  return "Kväll";
}

function groupSlotsByTimeOfDay(slots: AvailableSlot[]): { label: string; slots: AvailableSlot[] }[] {
  const order = ["Förmiddag", "Eftermiddag", "Kväll"];
  const groups = new Map<string, AvailableSlot[]>();
  for (const slot of slots) {
    const label = timeOfDayLabel(new Date(slot.start).getHours());
    if (!groups.has(label)) groups.set(label, []);
    groups.get(label)!.push(slot);
  }
  return order.filter((label) => groups.has(label)).map((label) => ({ label, slots: groups.get(label)! }));
}

function LoadingMark() {
  return (
    <div className="flex flex-col items-center justify-center gap-7 py-16 text-center">
      <h2 className="text-2xl font-bold text-gray-900">Välj en tid</h2>
      <span className="relative flex h-28 w-28 items-center justify-center">
        <span className="hl-loading-ping absolute inset-0 rounded-full bg-[#D81B7D]/20 [animation-delay:0s]" />
        <span className="hl-loading-ping absolute inset-0 rounded-full bg-[#D81B7D]/20 [animation-delay:0.9s]" />
        <span
          className="hl-loading-pulse absolute inset-2 rounded-full opacity-95 shadow-[0_18px_46px_-14px_rgba(216,27,125,0.65)]"
          style={{ background: "linear-gradient(145deg, #f0529e 0%, #d81b7d 55%, #a71668 100%)" }}
        />
        <svg
          viewBox="0 0 128 128"
          fill="none"
          className="hl-loading-pulse relative h-12 w-12 text-white"
          aria-hidden="true"
        >
          <g stroke="currentColor" strokeWidth="7.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M64 88
                     C45 75 27 59 27 41
                     C27 29 36 22 48 22
                     C56 22 61 26 64 32
                     C67 26 72 22 80 22
                     C92 22 101 29 101 41
                     C101 59 83 75 64 88Z" />
            <path d="M64 88
                     V99
                     C64 111 75 116 84 108
                     L95 98" />
            <circle cx="101" cy="84" r="10" />
            <path d="M91 101 L95 97" />
          </g>
        </svg>
      </span>
      <p className="text-sm font-medium text-gray-500">Letar tillgängliga tider</p>
      <style>{`
        @keyframes hl-breathe {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.09); opacity: 0.9; }
        }
        @keyframes hl-loading-ping {
          0% { transform: scale(0.9); opacity: 0.55; }
          100% { transform: scale(1.85); opacity: 0; }
        }
        .hl-loading-pulse { animation: hl-breathe 2.1s ease-in-out infinite; }
        .hl-loading-ping { animation: hl-loading-ping 2.1s cubic-bezier(0.2, 0.6, 0.4, 1) infinite; }
        @media (prefers-reduced-motion: reduce) {
          .hl-loading-pulse,
          .hl-loading-ping {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}

type View = "month" | "day";

type Props = {
  slots: AvailableSlot[] | null;
  slotsError: string | null;
  onSelectSlot: (slot: AvailableSlot) => void;
  /** Hur många dagar framåt som ska gå att bläddra till, oavsett om det finns lediga tider där. */
  maxDaysAhead: number;
};

export default function CalendarTimePicker({ slots, slotsError, onSelectSlot, maxDaysAhead }: Props) {
  const today = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now;
  }, []);

  const furthestBookableDate = useMemo(() => {
    const date = new Date(today);
    date.setDate(date.getDate() + maxDaysAhead);
    return date;
  }, [today, maxDaysAhead]);

  const slotsByDay = useMemo(() => {
    const map = new Map<string, AvailableSlot[]>();
    for (const slot of slots ?? []) {
      const key = dateKey(new Date(slot.start));
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(slot);
    }
    return map;
  }, [slots]);

  const [visibleMonth, setVisibleMonth] = useState<Date>(() => startOfMonth(today));
  const [view, setView] = useState<View>("month");
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  // Om lediga tider dyker upp i en senare månad än den som visas (vanligast
  // direkt efter första laddningen), hoppar vyn dit automatiskt en gång så
  // patienten inte behöver klicka fram till första lediga tiden själv.
  const hasAutoJumped = useRef(false);
  useEffect(() => {
    if (hasAutoJumped.current || !slots || slots.length === 0) return;
    hasAutoJumped.current = true;
    const first = new Date(slots[0].start);
    setVisibleMonth((current) => (startOfMonth(first) > current ? startOfMonth(first) : current));
  }, [slots]);

  const canGoToPreviousMonth = startOfMonth(visibleMonth) > startOfMonth(today);
  const canGoToNextMonth = startOfMonth(visibleMonth) < startOfMonth(furthestBookableDate);

  const goToPreviousMonth = () => {
    if (!canGoToPreviousMonth) return;
    setVisibleMonth((current) => new Date(current.getFullYear(), current.getMonth() - 1, 1));
  };
  const goToNextMonth = () => {
    if (!canGoToNextMonth) return;
    setVisibleMonth((current) => new Date(current.getFullYear(), current.getMonth() + 1, 1));
  };

  // Vertikal swipe: dra uppåt → nästa månad, dra nedåt → föregående månad.
  // Ligger som en native (icke-passiv) touchmove-lyssnare eftersom vi måste
  // kunna avbryta sidans egen scroll så draget känns som att bläddra kalendern
  // och inte scrollar iväg sidan under fingret.
  //
  // Elementet monteras/avmonteras när komponenten växlar mellan sina villkorliga
  // return-grenar (laddning → månadsvy → dagsvy). En vanlig useRef + useEffect med
  // tom deps-array kör bara EN gång direkt efter första render – om elementet inte
  // fanns då (t.ex. för att kalendern fortfarande visade laddningsläget) hade
  // lyssnaren aldrig satts upp, oavsett vad som hände senare. Ett callback ref
  // anropas däremot av React varje gång just den här noden faktiskt monteras
  // eller avmonteras, så vi missar aldrig tillfället att koppla på lyssnarna.
  const touchStartY = useRef<number | null>(null);
  const swipeLockedAxis = useRef<"vertical" | "horizontal" | null>(null);
  const [swipeHint, setSwipeHint] = useState<"up" | "down" | null>(null);
  const SWIPE_THRESHOLD = 48;
  const AXIS_LOCK_THRESHOLD = 8;

  const canGoToPreviousMonthRef = useRef(canGoToPreviousMonth);
  const canGoToNextMonthRef = useRef(canGoToNextMonth);
  const goToPreviousMonthRef = useRef(goToPreviousMonth);
  const goToNextMonthRef = useRef(goToNextMonth);
  useEffect(() => {
    canGoToPreviousMonthRef.current = canGoToPreviousMonth;
    canGoToNextMonthRef.current = canGoToNextMonth;
    goToPreviousMonthRef.current = goToPreviousMonth;
    goToNextMonthRef.current = goToNextMonth;
  });

  const swipeCleanupRef = useRef<(() => void) | null>(null);
  const swipeAreaCallbackRef = (el: HTMLDivElement | null) => {
    // Städa bort ev. tidigare lyssnare innan vi kopplar på en ny (eller inga alls
    // om noden avmonterades).
    swipeCleanupRef.current?.();
    swipeCleanupRef.current = null;
    if (!el) return;

    let startX = 0;

    const onStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      startX = e.touches[0].clientX;
      swipeLockedAxis.current = null;
    };

    const onMove = (e: TouchEvent) => {
      if (touchStartY.current == null) return;
      const deltaY = e.touches[0].clientY - touchStartY.current;
      const deltaX = e.touches[0].clientX - startX;

      if (!swipeLockedAxis.current) {
        if (Math.abs(deltaY) < AXIS_LOCK_THRESHOLD && Math.abs(deltaX) < AXIS_LOCK_THRESHOLD) return;
        swipeLockedAxis.current = Math.abs(deltaY) > Math.abs(deltaX) ? "vertical" : "horizontal";
      }
      if (swipeLockedAxis.current !== "vertical") return;

      // Blockera sidans scroll så länge vi tolkar detta som en kalender-swipe.
      e.preventDefault();

      if (deltaY < -12 && canGoToNextMonthRef.current) setSwipeHint("up");
      else if (deltaY > 12 && canGoToPreviousMonthRef.current) setSwipeHint("down");
      else setSwipeHint(null);
    };

    const onEnd = (e: TouchEvent) => {
      if (touchStartY.current == null) return;
      const deltaY = e.changedTouches[0].clientY - touchStartY.current;
      if (swipeLockedAxis.current === "vertical") {
        if (deltaY <= -SWIPE_THRESHOLD) goToNextMonthRef.current();
        else if (deltaY >= SWIPE_THRESHOLD) goToPreviousMonthRef.current();
      }
      touchStartY.current = null;
      swipeLockedAxis.current = null;
      setSwipeHint(null);
    };

    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: false });
    el.addEventListener("touchend", onEnd, { passive: true });
    el.addEventListener("touchcancel", onEnd, { passive: true });

    swipeCleanupRef.current = () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onEnd);
      el.removeEventListener("touchcancel", onEnd);
    };
  };

  const [openBookedPopoverKey, setOpenBookedPopoverKey] = useState<string | null>(null);

  useEffect(() => {
    if (!openBookedPopoverKey) return;

    const closeOnOutsidePointer = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element) || !target.closest(`[data-booked-popover="${openBookedPopoverKey}"]`)) {
        setOpenBookedPopoverKey(null);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenBookedPopoverKey(null);
    };

    document.addEventListener("pointerdown", closeOnOutsidePointer);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [openBookedPopoverKey]);

  const gridDays = useMemo(() => {
    const monthStart = startOfMonth(visibleMonth);
    const monthEnd = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0);
    const gridStart = gridStartForMonth(monthStart);
    const gridEnd = gridStartForMonth(monthEnd);
    gridEnd.setDate(gridEnd.getDate() + 6); // sista dagen i den veckan som innehåller månadens sista dag

    const days: Date[] = [];
    for (let day = new Date(gridStart); day <= gridEnd; day.setDate(day.getDate() + 1)) {
      days.push(new Date(day));
    }
    return days;
  }, [visibleMonth]);

  const daySlots = useMemo(
    () => (selectedDay ? slotsByDay.get(dateKey(selectedDay)) ?? [] : []),
    [selectedDay, slotsByDay],
  );
  const dayGroups = useMemo(() => groupSlotsByTimeOfDay(daySlots), [daySlots]);

  if (slotsError) {
    return <p className="text-sm text-red-600">{slotsError}</p>;
  }

  if (!slots) {
    return <LoadingMark />;
  }

  if (view === "day" && selectedDay) {
    return (
      <div>
        <button
          type="button"
          onClick={() => setView("month")}
          className="mb-3 inline-flex items-center gap-1 text-sm font-medium text-gray-500 transition hover:text-[#D81B7D]"
        >
          ← Välj en annan dag
        </button>
        <h3 className="text-base font-bold text-gray-900">{formatDayHeading(selectedDay)}</h3>

        {daySlots.length === 0 ? (
          <p className="mt-3 text-sm text-gray-500">Inga lediga tider den här dagen.</p>
        ) : (
          <div className="mt-4 grid gap-4">
            {dayGroups.map((group) => (
              <div key={group.label}>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">{group.label}</p>
                <div className="flex flex-wrap gap-2">
                  {group.slots.map((slot) => (
                    <button
                      key={slot.start}
                      type="button"
                      onClick={() => onSelectSlot(slot)}
                      className="rounded-full border border-pink-200 px-4 py-2 text-sm font-semibold text-[#D81B7D] transition hover:border-[#D81B7D] hover:bg-pink-50 active:scale-95"
                    >
                      {formatTimeLabel(slot.start)}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-gray-900">{formatMonthLabel(visibleMonth)}</h3>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Föregående månad"
            disabled={!canGoToPreviousMonth}
            onClick={goToPreviousMonth}
            className="flex h-11 w-11 items-center justify-center rounded-full text-xl text-gray-500 transition hover:bg-pink-50 hover:text-[#D81B7D] active:scale-90 disabled:opacity-30 disabled:hover:bg-transparent"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Nästa månad"
            disabled={!canGoToNextMonth}
            onClick={goToNextMonth}
            className="flex h-11 w-11 items-center justify-center rounded-full text-xl text-gray-500 transition hover:bg-pink-50 hover:text-[#D81B7D] active:scale-90 disabled:opacity-30 disabled:hover:bg-transparent"
          >
            ›
          </button>
        </div>
      </div>

      <div ref={swipeAreaCallbackRef} className="relative touch-pan-x">
        {canGoToPreviousMonth && (
          <div
            className={[
              "hl-swipe-hint-up pointer-events-none absolute inset-x-0 -top-1 flex justify-center transition-opacity",
              swipeHint === "down" ? "opacity-100" : "opacity-40",
            ].join(" ")}
            aria-hidden
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-pink-50 text-[#D81B7D]">
              <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
                <path d="M18 15 12 9 6 15" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        )}

        <div className="mt-4 grid grid-cols-7 gap-1 text-center">
          {WEEKDAY_LABELS.map((label, index) => (
            <div key={`${label}-${index}`} className="text-xs font-semibold text-gray-400">
              {label}
            </div>
          ))}

          {gridDays.map((day, dayIndex) => {
            const inCurrentMonth = day.getMonth() === visibleMonth.getMonth();
            const key = dateKey(day);
            const count = slotsByDay.get(key)?.length ?? 0;
            const isPast = day < today;
            const isToday = isSameDay(day, today);
            const isBeyondWindow = day > furthestBookableDate;
            const hasSlots = count > 0 && inCurrentMonth && !isPast && !isBeyondWindow;
            // Platshållare för investerardemo: visa en känsla av efterfrågan på
            // passerade dagar som saknar riktiga tider i underlaget.
            const showDemoBookedBadge = inCurrentMonth && isPast && count === 0;
            const isBookedPopoverOpen = openBookedPopoverKey === key;
            const columnIndex = dayIndex % 7;
            const popoverAlignment =
              columnIndex <= 1
                ? "left-0"
                : columnIndex >= 5
                  ? "right-0"
                  : "left-1/2 -translate-x-1/2";
            const popoverArrowAlignment =
              columnIndex <= 1 ? "left-2" : columnIndex >= 5 ? "right-2" : "left-1/2 -translate-x-1/2";

            // showDemoBookedBadge-dagar är alltid !hasSlots (de saknar per definition
            // riktiga tider), vilket gör dagsknappen `disabled`. En disabled HTML-knapp
            // blockerar pointer-events för HELA sitt innehåll, så en badge som låg som
            // barn till knappen kunde aldrig ta emot klick oavsett egna handlers. Badgen
            // ligger därför nu som ett eget syskon-element i en gemensam wrapper, inte
            // nästlad inuti dagsknappen.
            return (
              <div key={key} className="relative">
                <button
                  type="button"
                  disabled={!hasSlots}
                  onClick={() => {
                    setSelectedDay(day);
                    setView("day");
                  }}
                  className={[
                    "relative flex aspect-square w-full flex-col items-center justify-center rounded-xl text-sm transition",
                    !inCurrentMonth ? "text-transparent" : "",
                    hasSlots
                      ? "font-semibold text-gray-900 hover:bg-pink-50 active:scale-95"
                      : "text-gray-300",
                    isToday && inCurrentMonth ? "ring-1 ring-inset ring-pink-200" : "",
                  ].join(" ")}
                >
                  {day.getDate()}
                  {hasSlots && (
                    <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                  )}
                </button>
                {showDemoBookedBadge && (
                  <button
                    type="button"
                    data-booked-popover={key}
                    title="Antal bokade patienter denna dag"
                    aria-label={`${demoBookedCountForPastDay(key)} bokade patienter ${formatDayHeading(day).toLowerCase()}`}
                    aria-expanded={isBookedPopoverOpen}
                    aria-describedby={isBookedPopoverOpen ? `booked-popover-${key}` : undefined}
                    onClick={() => setOpenBookedPopoverKey((current) => (current === key ? null : key))}
                    className="hl-booked-badge absolute -right-1.5 -top-1.5 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-emerald-200 bg-white text-emerald-600 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50 hover:shadow active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                  >
                    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden>
                      <path
                        d="m5 10.25 3.1 3.1L15.5 6"
                        stroke="currentColor"
                        strokeWidth="2.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="absolute -right-1.5 -top-1.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-white px-0.5 text-[0.48rem] font-bold leading-none text-emerald-800 shadow-[0_1px_3px_rgba(15,23,42,0.18)] ring-1 ring-emerald-100">
                      {demoBookedCountForPastDay(key)}
                    </span>
                    {isBookedPopoverOpen && (
                      <span
                        id={`booked-popover-${key}`}
                        role="tooltip"
                        className={`absolute bottom-8 z-30 w-max max-w-[11rem] rounded-xl bg-slate-900 px-3 py-2 text-left text-xs font-medium leading-snug text-white shadow-xl ${popoverAlignment}`}
                      >
                        <span className="block font-bold">{demoBookedCountForPastDay(key)} bokningar</span>
                        <span className="mt-0.5 block whitespace-nowrap text-slate-300">
                          {formatDayHeading(day)}
                        </span>
                        <span
                          className={`absolute -bottom-1 h-2.5 w-2.5 rotate-45 bg-slate-900 ${popoverArrowAlignment}`}
                          aria-hidden
                        />
                      </span>
                    )}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {canGoToNextMonth && (
          <div
            className={[
              "hl-swipe-hint-down pointer-events-none absolute inset-x-0 -bottom-1 flex justify-center transition-opacity",
              swipeHint === "up" ? "opacity-100" : "opacity-40",
            ].join(" ")}
            aria-hidden
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-pink-50 text-[#D81B7D]">
              <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
                <path d="M6 9 12 15 18 9" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        )}
      </div>

      {slots.length === 0 && (
        <p className="mt-4 text-sm text-gray-500">Inga lediga tider just nu. Kontakta oss så hjälper vi dig.</p>
      )}

      <style>{`
        @keyframes hl-swipe-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(3px); }
        }
        .hl-swipe-hint-up span { animation: hl-swipe-bob 1.6s ease-in-out infinite reverse; }
        .hl-swipe-hint-down span { animation: hl-swipe-bob 1.6s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .hl-swipe-hint-up span,
          .hl-swipe-hint-down span {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
