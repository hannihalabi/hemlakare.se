import { createHmac, timingSafeEqual } from "node:crypto";

const DEFAULT_GRAPH_API_VERSION = "v25.0";

function envValue(name: string) {
  return process.env[name]?.trim() ?? "";
}

export function getWhatsAppConfiguration() {
  const accessToken = envValue("WHATSAPP_ACCESS_TOKEN");
  const phoneNumberId = envValue("WHATSAPP_PHONE_NUMBER_ID");
  const verifyToken = envValue("WHATSAPP_WEBHOOK_VERIFY_TOKEN");
  const appSecret = envValue("WHATSAPP_APP_SECRET");
  const graphApiVersion = envValue("WHATSAPP_GRAPH_API_VERSION") || DEFAULT_GRAPH_API_VERSION;
  const missing = [
    !accessToken && "WHATSAPP_ACCESS_TOKEN",
    !phoneNumberId && "WHATSAPP_PHONE_NUMBER_ID",
    !verifyToken && "WHATSAPP_WEBHOOK_VERIFY_TOKEN",
    !appSecret && "WHATSAPP_APP_SECRET",
  ].filter((value): value is string => Boolean(value));

  return {
    accessToken,
    phoneNumberId,
    verifyToken,
    appSecret,
    graphApiVersion,
    status: {
      inbound: Boolean(verifyToken && appSecret),
      outbound: Boolean(accessToken && phoneNumberId),
      missing,
    },
  };
}

export function verifyWhatsAppSignature(body: Uint8Array, signature: string | null) {
  const { appSecret } = getWhatsAppConfiguration();
  if (!appSecret || !signature?.startsWith("sha256=")) return false;

  const expected = `sha256=${createHmac("sha256", appSecret).update(body).digest("hex")}`;
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  return actualBuffer.length === expectedBuffer.length && timingSafeEqual(actualBuffer, expectedBuffer);
}

export async function sendWhatsAppText(to: string, body: string) {
  const { accessToken, phoneNumberId, graphApiVersion } = getWhatsAppConfiguration();
  if (!accessToken || !phoneNumberId) throw new Error("WhatsApp-utskick är inte konfigurerat.");
  if (!/^v\d+\.\d+$/.test(graphApiVersion)) throw new Error("WHATSAPP_GRAPH_API_VERSION har ogiltigt format.");

  const response = await fetch(`https://graph.facebook.com/${graphApiVersion}/${encodeURIComponent(phoneNumberId)}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messaging_product: "whatsapp", recipient_type: "individual", to, type: "text", text: { preview_url: false, body } }),
    signal: AbortSignal.timeout(15_000),
  });

  const payload = await response.json().catch(() => ({})) as { messages?: Array<{ id?: string }>; error?: { message?: string; code?: number } };
  const messageId = payload.messages?.[0]?.id;
  if (!response.ok || !messageId) {
    const code = payload.error?.code ? ` (${payload.error.code})` : "";
    throw new Error(`Meta kunde inte skicka meddelandet${code}.`);
  }

  return messageId;
}

export function whatsappMessageBody(message: Record<string, unknown>) {
  const type = typeof message.type === "string" ? message.type : "unknown";
  const text = message.text as { body?: unknown } | undefined;
  if (type === "text" && typeof text?.body === "string") return { type, body: text.body };

  const button = message.button as { text?: unknown } | undefined;
  if (type === "button" && typeof button?.text === "string") return { type, body: button.text };

  const interactive = message.interactive as { button_reply?: { title?: unknown }; list_reply?: { title?: unknown } } | undefined;
  const interactiveTitle = interactive?.button_reply?.title ?? interactive?.list_reply?.title;
  if (type === "interactive" && typeof interactiveTitle === "string") return { type, body: interactiveTitle };

  const labels: Record<string, string> = {
    image: "[Bild mottagen – öppnas inte i adminpanelen]",
    document: "[Dokument mottaget – öppnas inte i adminpanelen]",
    audio: "[Ljudmeddelande mottaget – spelas inte upp i adminpanelen]",
    video: "[Video mottagen – öppnas inte i adminpanelen]",
    location: "[Platsdelning mottagen – koordinater lagras inte]",
    contacts: "[Kontaktkort mottaget – kontaktdata lagras inte]",
    sticker: "[Dekal mottagen]",
  };
  return { type, body: labels[type] ?? "[Meddelandetypen stöds inte i adminpanelen]" };
}
