"use client";

import { useCallback, useEffect, useMemo, useState, type ComponentProps, type FormEvent, type ReactNode } from "react";
import { healthcareServices } from "@/data/services";
import { bookingStatusLabels, type AdminBooking, type BookingDashboard, type BookingStatus, type ScheduleBlock } from "@/lib/admin-booking-types";

type IconProps = ComponentProps<"svg">;
type StatusFilter = "all" | BookingStatus;
type SelectedItem = { kind: "booking" | "block"; id: string } | null;
type DragState = { dayKey: string; startIndex: number; currentIndex: number };
type DraftRange = { start: Date; end: Date };

const START_HOUR = 8;
const END_HOUR = 19;
const SLOT_MINUTES = 15;
const SLOT_COUNT = ((END_HOUR - START_HOUR) * 60) / SLOT_MINUTES;
const SCHEDULE_MINUTES = (END_HOUR - START_HOUR) * 60;

const emptyDashboard: BookingDashboard = { bookings: [], blocks: [], counts: { total: 0, pending: 0, confirmed: 0, cancelled: 0, expired: 0 } };
const dayFormatter = new Intl.DateTimeFormat("sv-SE", { weekday: "short", day: "numeric", month: "short" });
const fullDateFormatter = new Intl.DateTimeFormat("sv-SE", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
const monthFormatter = new Intl.DateTimeFormat("sv-SE", { month: "long", year: "numeric" });
const timeFormatter = new Intl.DateTimeFormat("sv-SE", { hour: "2-digit", minute: "2-digit" });

function startOfWeek(value: Date) {
  const date = new Date(value.getFullYear(), value.getMonth(), value.getDate());
  const day = date.getDay() || 7;
  date.setDate(date.getDate() - day + 1);
  return date;
}

function addDays(value: Date, days: number) {
  const date = new Date(value);
  date.setDate(date.getDate() + days);
  return date;
}

function localDateKey(value: Date | string) {
  const date = new Date(value);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function timeForSlot(day: Date, slotIndex: number) {
  const value = new Date(day);
  value.setHours(START_HOUR, slotIndex * SLOT_MINUTES, 0, 0);
  return value;
}

function schedulePosition(startValue: string, endValue: string) {
  const start = new Date(startValue);
  const end = new Date(endValue);
  const startMinutes = start.getHours() * 60 + start.getMinutes() - START_HOUR * 60;
  const endMinutes = end.getHours() * 60 + end.getMinutes() - START_HOUR * 60;
  const top = Math.max(0, startMinutes / SCHEDULE_MINUTES * 100);
  const bottom = Math.min(100, endMinutes / SCHEDULE_MINUTES * 100);
  return { top: `${top}%`, height: `${Math.max(100 / SLOT_COUNT, bottom - top)}%` };
}

export default function BookingsWorkspace() {
  const [weekStart, setWeekStart] = useState(() => startOfWeek(new Date()));
  const [dashboard, setDashboard] = useState<BookingDashboard>(emptyDashboard);
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [selected, setSelected] = useState<SelectedItem>(null);
  const [drag, setDrag] = useState<DragState | null>(null);
  const [draftRange, setDraftRange] = useState<DraftRange | null>(null);
  const [loading, setLoading] = useState(true);
  const [working, setWorking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const weekDays = useMemo(() => Array.from({ length: 7 }, (_, index) => addDays(weekStart, index)), [weekStart]);
  const rangeEnd = useMemo(() => addDays(weekStart, 7), [weekStart]);

  const loadBookings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const query = new URLSearchParams({ from: weekStart.toISOString(), to: rangeEnd.toISOString() });
      const response = await fetch(`/api/admin/bookings?${query}`, { cache: "no-store" });
      const data = (await response.json()) as BookingDashboard & { error?: string };
      if (!response.ok) throw new Error(data.error ?? "Bokningarna kunde inte hämtas.");
      setDashboard(data);
      setSelected((current) => {
        if (!current) return null;
        const exists = current.kind === "booking" ? data.bookings.some((item) => item.id === current.id) : data.blocks.some((item) => item.id === current.id);
        return exists ? current : null;
      });
    } catch (caught) {
      setDashboard(emptyDashboard);
      setError(caught instanceof Error ? caught.message : "Bokningarna kunde inte hämtas.");
    } finally {
      setLoading(false);
    }
  }, [rangeEnd, weekStart]);

  useEffect(() => {
    const timer = window.setTimeout(() => void loadBookings(), 0);
    return () => window.clearTimeout(timer);
  }, [loadBookings]);

  useEffect(() => {
    if (!drag) return;

    function finishDrag() {
      const currentDrag = drag;
      if (!currentDrag) return;
      const day = weekDays.find((candidate) => localDateKey(candidate) === currentDrag.dayKey);
      if (day) {
        const first = Math.min(currentDrag.startIndex, currentDrag.currentIndex);
        const last = Math.max(currentDrag.startIndex, currentDrag.currentIndex) + 1;
        setDraftRange({ start: timeForSlot(day, first), end: timeForSlot(day, last) });
      }
      setDrag(null);
    }

    function cancelDrag() {
      setDrag(null);
    }

    window.addEventListener("pointerup", finishDrag, { once: true });
    window.addEventListener("pointercancel", cancelDrag, { once: true });
    window.addEventListener("blur", cancelDrag, { once: true });

    return () => {
      window.removeEventListener("pointerup", finishDrag);
      window.removeEventListener("pointercancel", cancelDrag);
      window.removeEventListener("blur", cancelDrag);
    };
  }, [drag, weekDays]);

  const visibleBookings = useMemo(() => dashboard.bookings.filter((item) => filter === "all" || item.status === filter), [dashboard.bookings, filter]);
  const selectedBooking = selected?.kind === "booking" ? dashboard.bookings.find((item) => item.id === selected.id) ?? null : null;
  const selectedBlock = selected?.kind === "block" ? dashboard.blocks.find((item) => item.id === selected.id) ?? null : null;

  async function cancelBooking(booking: AdminBooking) {
    if (!window.confirm(`Avboka tiden för ${booking.patientName}? Betalningen återbetalas inte automatiskt.`)) return;
    setWorking(true);
    setError(null);
    try {
      const response = await fetch(`/api/admin/bookings/${booking.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: "cancelled" }) });
      const data = (await response.json()) as { error?: string; calendarWarning?: boolean };
      if (!response.ok) throw new Error(data.error ?? "Bokningen kunde inte avbokas.");
      setNotice(data.calendarWarning ? "Bokningen avbokades, men Google-händelsen behöver tas bort manuellt." : "Bokningen är avbokad.");
      await loadBookings();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Bokningen kunde inte avbokas.");
    } finally {
      setWorking(false);
    }
  }

  async function deleteBlock(block: ScheduleBlock) {
    if (!window.confirm(`Ta bort blockeringen ”${block.title}”?`)) return;
    setWorking(true);
    setError(null);
    try {
      const response = await fetch(`/api/admin/schedule-blocks/${block.id}`, { method: "DELETE" });
      const data = (await response.json()) as { error?: string; calendarWarning?: boolean };
      if (!response.ok) throw new Error(data.error ?? "Blockeringen kunde inte tas bort.");
      setNotice(data.calendarWarning ? "Blockeringen togs bort här, men Google-händelsen behöver tas bort manuellt." : "Blockeringen är borttagen.");
      setSelected(null);
      await loadBookings();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Blockeringen kunde inte tas bort.");
    } finally {
      setWorking(false);
    }
  }

  const weekLabel = weekStart.getMonth() === addDays(weekStart, 6).getMonth() ? monthFormatter.format(weekStart) : `${weekStart.toLocaleDateString("sv-SE", { month: "short" })}–${addDays(weekStart, 6).toLocaleDateString("sv-SE", { month: "short", year: "numeric" })}`;

  return (
    <main className="min-h-0 min-w-0 flex-1 overflow-hidden bg-[#f7f7f9] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto flex h-full max-w-[1700px] flex-col">
        <header className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div><p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#cf1f72]">Patientflöde</p><h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">Bokningar</h1><p className="mt-2 text-sm text-slate-500">Dra över en tid i schemat för att blockera den eller boka en patient manuellt.</p></div>
          <div className="flex flex-wrap items-center gap-2"><button type="button" onClick={() => setWeekStart(startOfWeek(new Date()))} className="min-h-10 rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50">I dag</button><div className="flex items-center rounded-xl border border-slate-200 bg-white p-1 shadow-sm"><button type="button" onClick={() => setWeekStart((current) => addDays(current, -7))} className="grid size-9 place-items-center rounded-lg text-slate-500 hover:bg-slate-100" aria-label="Föregående vecka"><ChevronLeftIcon className="size-4" /></button><p className="min-w-36 px-3 text-center text-sm font-extrabold capitalize text-slate-800">{weekLabel}</p><button type="button" onClick={() => setWeekStart((current) => addDays(current, 7))} className="grid size-9 place-items-center rounded-lg text-slate-500 hover:bg-slate-100" aria-label="Nästa vecka"><ChevronRightIcon className="size-4" /></button></div><button type="button" onClick={() => void loadBookings()} disabled={loading} className="grid size-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm hover:bg-slate-50 disabled:opacity-40" aria-label="Uppdatera bokningar"><RefreshIcon className={`size-4 ${loading ? "animate-spin" : ""}`} /></button></div>
        </header>

        <section className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label="Bokningsöversikt"><SummaryCard label="Bekräftade" value={dashboard.counts.confirmed} tone="emerald" /><SummaryCard label="Inväntar betalning" value={dashboard.counts.pending} tone="amber" /><SummaryCard label="Avbokade" value={dashboard.counts.cancelled} tone="rose" /><SummaryCard label="Totalt denna vecka" value={dashboard.counts.total} tone="slate" /></section>
        {(error || notice) && <div role={error ? "alert" : "status"} className={`mt-5 rounded-2xl border px-4 py-3 text-sm font-semibold ${error ? "border-red-200 bg-red-50 text-red-800" : "border-emerald-200 bg-emerald-50 text-emerald-800"}`}>{error ?? notice}</div>}
        <div className="mt-6 flex gap-1 overflow-x-auto rounded-xl border border-slate-200 bg-white p-1.5 shadow-sm" aria-label="Filtrera bokningar">{([["all", `Alla (${dashboard.counts.total})`], ["confirmed", `Bekräftade (${dashboard.counts.confirmed})`], ["pending", `Inväntar (${dashboard.counts.pending})`], ["cancelled", `Avbokade (${dashboard.counts.cancelled})`], ["expired", `Utgångna (${dashboard.counts.expired})`]] as Array<[StatusFilter, string]>).map(([value, label]) => <button key={value} type="button" onClick={() => setFilter(value)} className={`min-h-9 shrink-0 rounded-lg px-3 text-xs font-bold transition ${filter === value ? "bg-pink-50 text-[#c81e70]" : "text-slate-500 hover:bg-slate-50"}`}>{label}</button>)}</div>

        <div className={`mt-4 grid min-h-0 flex-1 gap-4 ${(selectedBooking || selectedBlock) ? "2xl:grid-cols-[minmax(0,1fr)_380px]" : ""}`}>
          <section className="relative min-h-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" aria-label="Veckoschema">
            {loading && <div className="absolute inset-x-0 top-0 z-40 h-1 overflow-hidden bg-pink-100"><span className="block h-full w-1/3 animate-pulse bg-[#e72e8a]" /></div>}
            <div className="h-full overflow-x-auto overflow-y-hidden"><div className="flex h-full min-w-[1120px] flex-col">
              <div className="grid shrink-0 grid-cols-[64px_repeat(7,minmax(145px,1fr))] border-b border-slate-200 bg-slate-50/80"><div className="border-r border-slate-200" />{weekDays.map((day) => { const today = localDateKey(day) === localDateKey(new Date()); const count = visibleBookings.filter((item) => localDateKey(item.startTime) === localDateKey(day)).length; return <div key={localDateKey(day)} className={`flex min-h-14 items-center justify-between border-r border-slate-200 px-3 last:border-r-0 ${today ? "bg-pink-50" : ""}`}><h2 className={`text-xs font-extrabold capitalize ${today ? "text-[#c81e70]" : "text-slate-700"}`}>{dayFormatter.format(day)}</h2><span className={`grid min-w-6 place-items-center rounded-full px-1.5 py-1 text-[0.62rem] font-extrabold ${today ? "bg-[#e72e8a] text-white" : "bg-white text-slate-400"}`}>{count}</span></div>; })}</div>
              <div className="grid min-h-0 flex-1 grid-cols-[64px_repeat(7,minmax(145px,1fr))]"><TimeGutter />{weekDays.map((day) => {
                const dayKey = localDateKey(day);
                const dayBookings = visibleBookings.filter((item) => localDateKey(item.startTime) === dayKey);
                const dayBlocks = dashboard.blocks.filter((item) => localDateKey(item.startTime) === dayKey);
                const dragFirst = drag?.dayKey === dayKey ? Math.min(drag.startIndex, drag.currentIndex) : -1;
                const dragLast = drag?.dayKey === dayKey ? Math.max(drag.startIndex, drag.currentIndex) : -1;
                return <div key={dayKey} className="relative h-full border-r border-slate-200 last:border-r-0 select-none" style={{ touchAction: "pan-y" }}>{Array.from({ length: SLOT_COUNT }, (_, slotIndex) => <button key={slotIndex} type="button" aria-label={`${dayFormatter.format(day)} ${timeFormatter.format(timeForSlot(day, slotIndex))}`} onPointerDown={(event) => { if (!event.isPrimary || event.button !== 0) return; if (event.pointerType !== "touch") event.preventDefault(); setSelected(null); setDrag({ dayKey, startIndex: slotIndex, currentIndex: slotIndex }); }} onPointerEnter={(event) => { if (event.buttons === 1 && drag?.dayKey === dayKey) setDrag((current) => current ? { ...current, currentIndex: slotIndex } : null); }} className={`block w-full border-t transition ${slotIndex % 4 === 0 ? "border-slate-200" : "border-slate-100"} ${dragFirst <= slotIndex && slotIndex <= dragLast ? "bg-pink-100" : "hover:bg-pink-50/70"}`} style={{ height: `${100 / SLOT_COUNT}%` }} />)}{dayBlocks.map((block) => <ScheduleBlockCard key={block.id} block={block} selected={selected?.kind === "block" && selected.id === block.id} onSelect={() => setSelected({ kind: "block", id: block.id })} />)}{dayBookings.map((booking) => <TimedBookingCard key={booking.id} booking={booking} selected={selected?.kind === "booking" && selected.id === booking.id} onSelect={() => setSelected({ kind: "booking", id: booking.id })} />)}</div>;
              })}</div>
            </div></div>
          </section>
          {selectedBooking && <BookingDetail booking={selectedBooking} working={working} onClose={() => setSelected(null)} onCancel={() => void cancelBooking(selectedBooking)} />}
          {selectedBlock && <BlockDetail block={selectedBlock} working={working} onClose={() => setSelected(null)} onDelete={() => void deleteBlock(selectedBlock)} />}
        </div>
      </div>
      {draftRange && <ScheduleCreateDialog range={draftRange} working={working} onClose={() => setDraftRange(null)} onCreated={async (message) => { setDraftRange(null); setNotice(message); await loadBookings(); }} onWorking={setWorking} onError={setError} />}
    </main>
  );
}

function TimeGutter() { return <div className="relative h-full border-r border-slate-200 bg-slate-50/50">{Array.from({ length: END_HOUR - START_HOUR + 1 }, (_, index) => <span key={index} className={`absolute right-2 text-[0.62rem] font-bold text-slate-400 ${index === 0 ? "translate-y-0" : index === END_HOUR - START_HOUR ? "-translate-y-full" : "-translate-y-1/2"}`} style={{ top: `${index / (END_HOUR - START_HOUR) * 100}%` }}>{String(START_HOUR + index).padStart(2, "0")}:00</span>)}</div>; }

function TimedBookingCard({ booking, selected, onSelect }: { booking: AdminBooking; selected: boolean; onSelect: () => void }) { const position = schedulePosition(booking.startTime, booking.endTime); const colors: Record<BookingStatus, string> = { confirmed: "border-emerald-300 bg-emerald-50 text-emerald-950", pending: "border-amber-300 bg-amber-50 text-amber-950", cancelled: "border-rose-200 bg-rose-50 text-rose-800 opacity-70", expired: "border-slate-200 bg-slate-100 text-slate-600 opacity-70" }; return <button type="button" onPointerDown={(event) => event.stopPropagation()} onClick={onSelect} className={`absolute inset-x-1 z-20 overflow-hidden rounded-lg border px-2 py-1 text-left shadow-sm transition hover:z-30 hover:shadow-md ${colors[booking.status]} ${selected ? "ring-2 ring-[#e72e8a] ring-offset-1" : ""}`} style={{ top: position.top, height: position.height }}><p className="truncate text-[0.64rem] font-extrabold">{timeFormatter.format(new Date(booking.startTime))} {booking.patientName}</p><p className="mt-0.5 truncate text-[0.58rem] opacity-70">{booking.serviceName}</p></button>; }

function ScheduleBlockCard({ block, selected, onSelect }: { block: ScheduleBlock; selected: boolean; onSelect: () => void }) { const position = schedulePosition(block.startTime, block.endTime); return <button type="button" onPointerDown={(event) => event.stopPropagation()} onClick={onSelect} className={`absolute inset-x-1 z-10 overflow-hidden rounded-lg border border-slate-300 bg-[repeating-linear-gradient(135deg,#f1f5f9,#f1f5f9_6px,#e2e8f0_6px,#e2e8f0_12px)] px-2 py-1 text-left text-slate-700 shadow-sm transition hover:z-30 hover:shadow-md ${selected ? "ring-2 ring-[#e72e8a] ring-offset-1" : ""}`} style={{ top: position.top, height: position.height }}><p className="truncate text-[0.64rem] font-extrabold">{block.title}</p><p className="mt-0.5 truncate text-[0.58rem]">{timeFormatter.format(new Date(block.startTime))}–{timeFormatter.format(new Date(block.endTime))}</p></button>; }

function ScheduleCreateDialog({ range, working, onClose, onCreated, onWorking, onError }: { range: DraftRange; working: boolean; onClose: () => void; onCreated: (message: string) => Promise<void>; onWorking: (value: boolean) => void; onError: (message: string | null) => void }) {
  const [kind, setKind] = useState<"block" | "booking">("block");
  const [title, setTitle] = useState("Blockerad tid");
  const [service, setService] = useState(healthcareServices[0]?.slug ?? "");
  const [patientName, setPatientName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [notes, setNotes] = useState("");

  async function submit(event: FormEvent) {
    event.preventDefault();
    onWorking(true);
    onError(null);
    try {
      const response = await fetch("/api/admin/bookings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(kind === "block" ? { kind, title, notes, startIso: range.start.toISOString(), endIso: range.end.toISOString() } : { kind, service, patientName, patientEmail, patientPhone, notes, startIso: range.start.toISOString(), endIso: range.end.toISOString() }) });
      const data = (await response.json()) as { error?: string; calendarWarning?: boolean };
      if (!response.ok) throw new Error(data.error ?? "Tiden kunde inte sparas.");
      await onCreated(data.calendarWarning ? "Tiden sparades, men den valfria kalenderspeglingen misslyckades." : kind === "block" ? "Tiden är blockerad och borttagen från patienternas lediga tider." : "Patienten är inbokad och tiden är inte längre tillgänglig.");
    } catch (caught) {
      onError(caught instanceof Error ? caught.message : "Tiden kunde inte sparas.");
    } finally {
      onWorking(false);
    }
  }

  return <div className="fixed inset-0 z-[70] grid place-items-center bg-slate-950/35 p-4" role="dialog" aria-modal="true" aria-labelledby="schedule-dialog-title"><form onSubmit={submit} className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl sm:p-6"><div className="flex items-start justify-between gap-4"><div><p className="text-[0.65rem] font-extrabold uppercase tracking-[0.14em] text-[#cf1f72]">Ny schemapost</p><h2 id="schedule-dialog-title" className="mt-2 text-xl font-extrabold capitalize text-slate-950">{fullDateFormatter.format(range.start)}</h2><p className="mt-1 text-sm font-bold text-slate-500">{timeFormatter.format(range.start)}–{timeFormatter.format(range.end)}</p></div><button type="button" onClick={onClose} className="grid size-9 place-items-center rounded-xl text-slate-400 hover:bg-slate-100" aria-label="Stäng"><CloseIcon className="size-4" /></button></div><div className="mt-5 grid grid-cols-2 rounded-xl bg-slate-100 p-1"><button type="button" onClick={() => setKind("block")} className={`min-h-10 rounded-lg text-xs font-extrabold ${kind === "block" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}>Blockera tid</button><button type="button" onClick={() => setKind("booking")} className={`min-h-10 rounded-lg text-xs font-extrabold ${kind === "booking" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}>Boka patient</button></div><div className="mt-5 grid gap-4">{kind === "block" ? <Field label="Rubrik"><input required value={title} onChange={(event) => setTitle(event.target.value)} className="form-input" /></Field> : <><Field label="Tjänst"><select required value={service} onChange={(event) => setService(event.target.value)} className="form-input">{healthcareServices.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}</select></Field><Field label="Patientens namn"><input required minLength={2} value={patientName} onChange={(event) => setPatientName(event.target.value)} className="form-input" /></Field><div className="grid gap-4 sm:grid-cols-2"><Field label="E-post (valfritt)"><input type="email" value={patientEmail} onChange={(event) => setPatientEmail(event.target.value)} className="form-input" /></Field><Field label="Telefon (valfritt)"><input type="tel" value={patientPhone} onChange={(event) => setPatientPhone(event.target.value)} className="form-input" /></Field></div></>}<Field label="Anteckning (valfritt)"><textarea rows={3} value={notes} onChange={(event) => setNotes(event.target.value)} className="form-input resize-none" /></Field></div><div className="mt-6 flex justify-end gap-2"><button type="button" onClick={onClose} className="min-h-11 rounded-xl border border-slate-200 px-4 text-xs font-bold text-slate-600 hover:bg-slate-50">Avbryt</button><button type="submit" disabled={working} className="btn-cta min-h-11 rounded-xl px-5 text-xs font-extrabold disabled:opacity-50">{working ? "Sparar…" : kind === "block" ? "Blockera tiden" : "Boka patienten"}</button></div></form></div>;
}

function Field({ label, children }: { label: string; children: ReactNode }) { return <label className="grid gap-1.5 text-xs font-bold text-slate-700 [&_input]:min-h-11 [&_input]:rounded-xl [&_input]:border [&_input]:border-slate-200 [&_input]:px-3 [&_input]:text-sm [&_input]:font-medium [&_input]:outline-none [&_input]:focus:border-pink-300 [&_select]:min-h-11 [&_select]:rounded-xl [&_select]:border [&_select]:border-slate-200 [&_select]:px-3 [&_select]:text-sm [&_select]:font-medium [&_textarea]:rounded-xl [&_textarea]:border [&_textarea]:border-slate-200 [&_textarea]:p-3 [&_textarea]:text-sm [&_textarea]:font-medium [&_textarea]:outline-none [&_textarea]:focus:border-pink-300"><span>{label}</span>{children}</label>; }
function BookingDetail({ booking, working, onClose, onCancel }: { booking: AdminBooking; working: boolean; onClose: () => void; onCancel: () => void }) { const canCancel = booking.status === "confirmed" || booking.status === "pending"; return <DetailPanel eyebrow={booking.source === "manual" ? "Manuell bokning" : "Onlinebokning"} title={booking.patientName} subtitle={fullDateFormatter.format(new Date(booking.startTime))} onClose={onClose}><div className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 p-4"><div><p className="text-2xl font-extrabold text-slate-950">{timeFormatter.format(new Date(booking.startTime))}–{timeFormatter.format(new Date(booking.endTime))}</p><p className="mt-1 text-xs text-slate-500">{booking.serviceName}</p></div><StatusBadge status={booking.status} /></div><DetailGroup title="Besök"><DetailRow label="Tjänst" value={booking.serviceName} />{booking.variantLabel && <DetailRow label="Alternativ" value={booking.variantLabel} />}<DetailRow label="Pris" value={booking.priceLabel} /><DetailRow label="Tillgänglighet" value="Styrs av adminschemat" /></DetailGroup><DetailGroup title="Kontakt">{booking.patientEmail ? <DetailRow label="E-post" value={booking.patientEmail} href={`mailto:${booking.patientEmail}`} /> : <DetailRow label="E-post" value="Ej angiven" />}{booking.patientPhone ? <DetailRow label="Telefon" value={booking.patientPhone} href={`tel:${booking.patientPhone}`} /> : <DetailRow label="Telefon" value="Ej angiven" />}</DetailGroup><DetailGroup title="Anteckning"><p className="whitespace-pre-wrap text-xs leading-5 text-slate-600">{booking.notes || "Ingen anteckning."}</p></DetailGroup>{canCancel && <button type="button" onClick={onCancel} disabled={working} className="min-h-11 w-full rounded-xl border border-red-200 bg-red-50 px-4 text-xs font-extrabold text-red-700 hover:bg-red-100 disabled:opacity-50">{working ? "Avbokar…" : "Avboka tiden"}</button>}</DetailPanel>; }
function BlockDetail({ block, working, onClose, onDelete }: { block: ScheduleBlock; working: boolean; onClose: () => void; onDelete: () => void }) { return <DetailPanel eyebrow="Blockerad tid" title={block.title} subtitle={fullDateFormatter.format(new Date(block.startTime))} onClose={onClose}><div className="rounded-xl bg-slate-100 p-4"><p className="text-2xl font-extrabold text-slate-950">{timeFormatter.format(new Date(block.startTime))}–{timeFormatter.format(new Date(block.endTime))}</p><p className="mt-1 text-xs text-slate-500">Ej bokningsbar för patienter</p></div><DetailGroup title="Information"><DetailRow label="Tillgänglighet" value="Blockerad i adminschemat" /><p className="whitespace-pre-wrap text-xs leading-5 text-slate-600">{block.notes || "Ingen anteckning."}</p></DetailGroup><button type="button" onClick={onDelete} disabled={working} className="min-h-11 w-full rounded-xl border border-red-200 bg-red-50 px-4 text-xs font-extrabold text-red-700 hover:bg-red-100 disabled:opacity-50">{working ? "Tar bort…" : "Ta bort blockering"}</button></DetailPanel>; }
function DetailPanel({ eyebrow, title, subtitle, onClose, children }: { eyebrow: string; title: string; subtitle: string; onClose: () => void; children: ReactNode }) { return <aside className="min-h-0 overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-sm" aria-label="Schemadetaljer"><div className="flex items-start justify-between border-b border-slate-200 p-5"><div><p className="text-[0.65rem] font-extrabold uppercase tracking-[0.14em] text-[#cf1f72]">{eyebrow}</p><h2 className="mt-2 text-xl font-extrabold text-slate-950">{title}</h2><p className="mt-1 text-xs capitalize text-slate-500">{subtitle}</p></div><button type="button" onClick={onClose} className="grid size-9 place-items-center rounded-xl text-slate-400 hover:bg-slate-100" aria-label="Stäng detaljer"><CloseIcon className="size-4" /></button></div><div className="space-y-5 p-5">{children}</div></aside>; }
function DetailGroup({ title, children }: { title: string; children: ReactNode }) { return <section><h3 className="mb-2 text-[0.65rem] font-extrabold uppercase tracking-[0.12em] text-slate-400">{title}</h3><div className="space-y-2">{children}</div></section>; }
function DetailRow({ label, value, href }: { label: string; value: string; href?: string }) { return <div className="flex items-start justify-between gap-4 text-xs"><span className="shrink-0 text-slate-400">{label}</span>{href ? <a href={href} className="min-w-0 break-all text-right font-bold text-[#c81e70] hover:underline">{value}</a> : <span className="min-w-0 text-right font-bold text-slate-700">{value}</span>}</div>; }
function SummaryCard({ label, value, tone }: { label: string; value: number; tone: "emerald" | "amber" | "rose" | "slate" }) { const tones = { emerald: "bg-emerald-50 text-emerald-700", amber: "bg-amber-50 text-amber-700", rose: "bg-rose-50 text-rose-700", slate: "bg-slate-100 text-slate-700" }; return <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><div><p className="text-[0.65rem] font-bold uppercase tracking-wide text-slate-400">{label}</p><p className="mt-1 text-2xl font-extrabold text-slate-950">{value}</p></div><span className={`grid size-10 place-items-center rounded-xl ${tones[tone]}`}><CalendarIcon className="size-5" /></span></div>; }
function StatusBadge({ status }: { status: BookingStatus }) { const colors: Record<BookingStatus, string> = { confirmed: "bg-emerald-100 text-emerald-700", pending: "bg-amber-100 text-amber-700", cancelled: "bg-rose-100 text-rose-700", expired: "bg-slate-200 text-slate-600" }; return <span className={`shrink-0 rounded-full px-2.5 py-1 text-[0.62rem] font-extrabold ${colors[status]}`}>{bookingStatusLabels[status]}</span>; }
function CalendarIcon(props: IconProps) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" /></svg>; }
function ChevronLeftIcon(props: IconProps) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d="m15 18-6-6 6-6" /></svg>; }
function ChevronRightIcon(props: IconProps) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d="m9 18 6-6-6-6" /></svg>; }
function RefreshIcon(props: IconProps) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d="M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7" /></svg>; }
function CloseIcon(props: IconProps) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" {...props}><path d="m6 6 12 12M18 6 6 18" /></svg>; }
