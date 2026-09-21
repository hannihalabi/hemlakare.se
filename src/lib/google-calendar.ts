import { google } from "googleapis";

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

/** Hämtar upptagna intervall (start/end) i kalendern inom ett tidsspann. */
export async function getBusyIntervals(rangeStart: Date, rangeEnd: Date): Promise<{ start: Date; end: Date }[]> {
  const calendar = getCalendarClient();
  const calendarId = getCalendarId();

  const response = await calendar.freebusy.query({
    requestBody: {
      timeMin: rangeStart.toISOString(),
      timeMax: rangeEnd.toISOString(),
      items: [{ id: calendarId }],
    },
  });

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
  patientEmail: string;
};

/** Skapar en kalenderhändelse för en bekräftad (betald) bokning. Returnerar Google-händelsens id. */
export async function createBookingEvent(input: CreateBookingEventInput): Promise<string> {
  const calendar = getCalendarClient();
  const calendarId = getCalendarId();

  const response = await calendar.events.insert({
    calendarId,
    requestBody: {
      summary: input.summary,
      description: input.description,
      start: { dateTime: input.start.toISOString() },
      end: { dateTime: input.end.toISOString() },
      attendees: [{ email: input.patientEmail }],
    },
    sendUpdates: "none",
  });

  if (!response.data.id) throw new Error("Google Calendar returnerade inget händelse-id.");
  return response.data.id;
}

/** Tar bort en kalenderhändelse, t.ex. vid avbokning eller om en hold går ut. */
export async function deleteBookingEvent(eventId: string): Promise<void> {
  const calendar = getCalendarClient();
  await calendar.events.delete({ calendarId: getCalendarId(), eventId }).catch((error) => {
    // Händelsen kan redan vara borttagen manuellt i kalendern – inte ett fel för oss.
    if (error?.code !== 410 && error?.code !== 404) throw error;
  });
}
