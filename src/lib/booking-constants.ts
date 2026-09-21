/**
 * Delade konstanter för bokningsflödet som både server (src/lib/booking.ts)
 * och klientkomponenter (t.ex. CalendarTimePicker) behöver – utan att dra
 * in server-only-kod (databas, Google-klient) i klientbunten.
 */
export const BOOKING_WINDOW_DAYS = 21;
