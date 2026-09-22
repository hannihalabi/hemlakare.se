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
    <div className="flex flex-col items-center justify-center gap-5 py-16 text-center">
      <span className="relative flex h-16 w-16 items-center justify-center">
        <span className="hl-loading-ping absolute inset-0 rounded-full bg-[#D81B7D]/15" />
        <span
          className="hl-loading-pulse absolute inset-0 rounded-full opacity-90"
          style={{ background: "linear-gradient(145deg, #f0529e 0%, #d81b7d 55%, #a71668 100%)" }}
        />
        <svg
          viewBox="0 0 128 128"
          fill="none"
          className="hl-loading-pulse relative h-8 w-8 text-white"
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
          50% { transform: scale(1.08); opacity: 0.88; }
        }
        @keyframes hl-loading-ping {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.9); opacity: 0; }
        }
        .hl-loading-pulse { animation: hl-breathe 1.8s ease-in-out infinite; }
        .hl-loading-ping { animation: hl-loading-ping 1.8s ease-out infinite; }
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
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Föregående månad"
            disabled={!canGoToPreviousMonth}
            onClick={() => setVisibleMonth((current) => new Date(current.getFullYear(), current.getMonth() - 1, 1))}
            className="flex h-9 w-9 items-center justify-center rounded-full text-lg text-gray-500 transition hover:bg-pink-50 hover:text-[#D81B7D] disabled:opacity-30 disabled:hover:bg-transparent"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Nästa månad"
            disabled={!canGoToNextMonth}
            onClick={() => setVisibleMonth((current) => new Date(current.getFullYear(), current.getMonth() + 1, 1))}
            className="flex h-9 w-9 items-center justify-center rounded-full text-lg text-gray-500 transition hover:bg-pink-50 hover:text-[#D81B7D] disabled:opacity-30 disabled:hover:bg-transparent"
          >
            ›
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1 text-center">
        {WEEKDAY_LABELS.map((label, index) => (
          <div key={`${label}-${index}`} className="text-xs font-semibold text-gray-400">
            {label}
          </div>
        ))}

        {gridDays.map((day) => {
          const inCurrentMonth = day.getMonth() === visibleMonth.getMonth();
          const key = dateKey(day);
          const count = slotsByDay.get(key)?.length ?? 0;
          const isPast = day < today;
          const isToday = isSameDay(day, today);
          const isBeyondWindow = day > furthestBookableDate;
          const hasSlots = count > 0 && inCurrentMonth && !isPast && !isBeyondWindow;

          return (
            <button
              key={key}
              type="button"
              disabled={!hasSlots}
              onClick={() => {
                setSelectedDay(day);
                setView("day");
              }}
              className={[
                "relative flex aspect-square flex-col items-center justify-center rounded-xl text-sm transition",
                !inCurrentMonth ? "text-transparent" : "",
                hasSlots
                  ? "font-semibold text-gray-900 hover:bg-pink-50 active:scale-95"
                  : "text-gray-300",
                isToday && inCurrentMonth ? "ring-1 ring-inset ring-pink-200" : "",
              ].join(" ")}
            >
              {day.getDate()}
              {hasSlots && (
                <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-[#D81B7D]" aria-hidden />
              )}
            </button>
          );
        })}
      </div>

      {slots.length === 0 && (
        <p className="mt-4 text-sm text-gray-500">Inga lediga tider just nu. Kontakta oss så hjälper vi dig.</p>
      )}
    </div>
  );
}
