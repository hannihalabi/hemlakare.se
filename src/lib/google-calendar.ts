import { google } from "googleapis";

/**
 * Google Calendar är en valfri spegling. Det egna adminschemat och databasen
 * är alltid sanningskällan. Integrationen är avstängd om flaggan saknas.
 */
export function googleCalendarSyncEnabled() {
  return process.env.GOOGLE_CALENDAR_SYNC_ENABLED === "true";
}

/**
 * Vårdgivarens Google Calendar är sanningskälla för upptagen tid.
 * Vi använder en engångs-refresh token (skapad av vårdgivaren själv, se
 * README) i stället för en full OAuth-inloggning per besökare – patienter
 * loggar aldrig in mot Google.
 */
function getOAuthClient() {
  const clientId = process.env.GOOGLE_CALENDAR_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CALENDAR_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_CALENDAR_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Google Calendar-uppgifter saknas (GOOGLE_CALENDAR_CLIENT_ID/SECRET/REFRESH_TOKEN).");
  }

  const client = new google.auth.OAuth2(clientId, clientSecret);
  client.setCredentials({ refresh_token: refreshToken });
  return client;
}

function getCalendarId() {
  return process.env.GOOGLE_CALENDAR_ID || "primary";
}

function getCalendarClient() {
  return google.calendar({ version: "v3", auth: getOAuthClient() });
}

function safeGoogleCalendarError(action: string, error: unknown) {
  const candidate = error as {
    code?: string | number;
    response?: { data?: { error?: string | { status?: string } } };
  } | null;
  const providerError = candidate?.response?.data?.error;
  const code = typeof providerError === "string"
    ? providerError
    : providerError?.status ?? candidate?.code ?? "unknown";

  // Google-klientens råa felobjekt innehåller OAuth-requesten och kan därmed
  // innehålla refresh-token. Returnera aldrig originalfelet eller dess cause.
  return new Error(`Google Calendar: ${action} misslyckades (${String(code)}).`);
}

/** Hämtar upptagna intervall (start/end) i kalendern inom ett tidsspann. */
export async function getBusyIntervals(rangeStart: Date, rangeEnd: Date): Promise<{ start: Date; end: Date }[]> {
  if (!googleCalendarSyncEnabled()) return [];
  const calendar = getCalendarClient();
  const calendarId = getCalendarId();

  let response;
  try {
    response = await calendar.freebusy.query({
      requestBody: {
        timeMin: rangeStart.toISOString(),
        timeMax: rangeEnd.toISOString(),
        items: [{ id: calendarId }],
      },
    });
  } catch (error) {
    throw safeGoogleCalendarError("hämtning av upptagen tid", error);
  }

  const busy = response.data.calendars?.[calendarId]?.busy ?? [];
  return busy
    .filter((slot) => slot.start && slot.end)
    .map((slot) => ({ start: new Date(slot.start as string), end: new Date(slot.end as string) }));
}

export type CreateBookingEventInput = {
  summary: string;
  description: string;
  start: Date;
  end: Date;
  patientEmail?: string;
};

/** Skapar en kalenderhändelse för en bekräftad (betald) bokning. Returnerar Google-händelsens id. */
export async function createBookingEvent(input: CreateBookingEventInput): Promise<string> {
  if (!googleCalendarSyncEnabled()) {
    throw new Error("Google Calendar-synkronisering är avstängd.");
  }
  const calendar = getCalendarClient();
  const calendarId = getCalendarId();

  let response;
  try {
    response = await calendar.events.insert({
      calendarId,
      requestBody: {
        summary: input.summary,
        description: input.description,
        start: { dateTime: input.start.toISOString() },
        end: { dateTime: input.end.toISOString() },
        attendees: input.patientEmail ? [{ email: input.patientEmail }] : undefined,
      },
      sendUpdates: "none",
    });
  } catch (error) {
    throw safeGoogleCalendarError("skapande av kalenderhändelse", error);
  }

  if (!response.data.id) throw new Error("Google Calendar returnerade inget händelse-id.");
  return response.data.id;
}

/** Tar bort en kalenderhändelse, t.ex. vid avbokning eller om en hold går ut. */
export async function deleteBookingEvent(eventId: string): Promise<void> {
  if (!googleCalendarSyncEnabled()) return;
  const calendar = getCalendarClient();
  await calendar.events.delete({ calendarId: getCalendarId(), eventId }).catch((error: unknown) => {
    // Händelsen kan redan vara borttagen manuellt i kalendern – inte ett fel för oss.
    const code = (error as { code?: number } | null)?.code;
    if (code !== 410 && code !== 404) throw safeGoogleCalendarError("borttagning av kalenderhändelse", error);
  });
}
