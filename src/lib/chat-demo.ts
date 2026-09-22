export type ConversationStatus = "new" | "open" | "waiting" | "resolved";
export type MessageSender = "visitor" | "employee" | "system";

export type ChatTopic =
  | "Boka eller omboka"
  | "Priser och betalning"
  | "Så fungerar tjänsten"
  | "Annat";

export interface ChatMessage {
  id: string;
  sender: MessageSender;
  senderName: string;
  body: string;
  createdAt: number;
  readByStaff: boolean;
}

export interface ChatConversation {
  id: string;
  reference: string;
  visitorName: string;
  visitorEmail?: string;
  topic: ChatTopic;
  status: ConversationStatus;
  assignedTo?: string;
  source: string;
  createdAt: number;
  updatedAt: number;
  messages: ChatMessage[];
  satisfaction?: "yes" | "no";
}

export interface ChatDemoState {
  conversations: ChatConversation[];
  visitorConversationId?: string;
}

export const CHAT_DEMO_STORAGE_KEY = "hemlakare-chat-mvp-v1";
export const CHAT_DEMO_EVENT = "hemlakare-chat-mvp-update";
export const DEMO_EMPLOYEE = "Hanna Lind";

const minute = 60_000;

function message(
  id: string,
  sender: MessageSender,
  senderName: string,
  body: string,
  createdAt: number,
  readByStaff = true,
): ChatMessage {
  return { id, sender, senderName, body, createdAt, readByStaff };
}

export function createDemoState(now = Date.now()): ChatDemoState {
  return {
    conversations: [
      {
        id: "demo-1042",
        reference: "#1042",
        visitorName: "Elin Andersson",
        visitorEmail: "elin@example.se",
        topic: "Boka eller omboka",
        status: "open",
        assignedTo: DEMO_EMPLOYEE,
        source: "Startsidan",
        createdAt: now - 26 * minute,
        updatedAt: now - 2 * minute,
        messages: [
          message(
            "m-1042-1",
            "visitor",
            "Elin Andersson",
            "Hej! Jag behöver flytta tiden för ett hembesök. Hur gör jag?",
            now - 26 * minute,
          ),
          message(
            "m-1042-2",
            "system",
            "Hemläkare",
            "Tack! En medarbetare ansluter snart.",
            now - 26 * minute + 8_000,
          ),
          message(
            "m-1042-3",
            "employee",
            DEMO_EMPLOYEE,
            "Hej Elin! Jag hjälper dig gärna. Av integritetsskäl ska du inte skriva personnummer här. Jag kan skicka dig vidare till vår säkra bokning.",
            now - 8 * minute,
          ),
          message(
            "m-1042-4",
            "visitor",
            "Elin Andersson",
            "Tack! Det låter bra. Kan jag välja en ny tid där?",
            now - 2 * minute,
            false,
          ),
        ],
      },
      {
        id: "demo-1041",
        reference: "#1041",
        visitorName: "Markus Berg",
        topic: "Priser och betalning",
        status: "new",
        source: "Patientavgifter",
        createdAt: now - 7 * minute,
        updatedAt: now - 7 * minute,
        messages: [
          message(
            "m-1041-1",
            "visitor",
            "Markus Berg",
            "Ingår uppföljning i priset för ett digitalt besök?",
            now - 7 * minute,
            false,
          ),
          message(
            "m-1041-2",
            "system",
            "Hemläkare",
            "Tack! En medarbetare ansluter snart.",
            now - 7 * minute + 5_000,
          ),
        ],
      },
      {
        id: "demo-1039",
        reference: "#1039",
        visitorName: "Sofia Lind",
        topic: "Så fungerar tjänsten",
        status: "waiting",
        assignedTo: "Victoria Stensönes",
        source: "Så fungerar det",
        createdAt: now - 54 * minute,
        updatedAt: now - 18 * minute,
        messages: [
          message(
            "m-1039-1",
            "visitor",
            "Sofia Lind",
            "Gör ni hembesök i hela Stockholmsområdet?",
            now - 54 * minute,
          ),
          message(
            "m-1039-2",
            "employee",
            "Victoria Stensönes",
            "Hej Sofia! Vi täcker stora delar av Stockholm. Vilket postnummer gäller det?",
            now - 42 * minute,
          ),
          message(
            "m-1039-3",
            "visitor",
            "Sofia Lind",
            "Det gäller 131 41.",
            now - 18 * minute,
          ),
        ],
      },
      {
        id: "demo-1038",
        reference: "#1038",
        visitorName: "Amir Hassan",
        topic: "Annat",
        status: "resolved",
        assignedTo: DEMO_EMPLOYEE,
        source: "Mottagningar",
        createdAt: now - 3 * 60 * minute,
        updatedAt: now - 2 * 60 * minute,
        satisfaction: "yes",
        messages: [
          message(
            "m-1038-1",
            "visitor",
            "Amir Hassan",
            "Finns det parkering vid mottagningen?",
            now - 3 * 60 * minute,
          ),
          message(
            "m-1038-2",
            "employee",
            DEMO_EMPLOYEE,
            "Ja, det finns besöksparkering precis utanför entrén.",
            now - 2 * 60 * minute,
          ),
        ],
      },
    ],
  };
}

export function makeId(prefix: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function formatClock(timestamp: number) {
  return new Intl.DateTimeFormat("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(timestamp);
}

export function formatRelativeTime(timestamp: number, now = Date.now()) {
  const diffMinutes = Math.max(0, Math.floor((now - timestamp) / minute));

  if (diffMinutes < 1) return "Nu";
  if (diffMinutes < 60) return `${diffMinutes} min`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours} tim`;

  return `${Math.floor(diffHours / 24)} d`;
}

export const topicOptions: Array<{
  value: ChatTopic;
  description: string;
}> = [
  {
    value: "Boka eller omboka",
    description: "Hjälp med tider och bokningar",
  },
  {
    value: "Priser och betalning",
    description: "Avgifter, kvitton och betalning",
  },
  {
    value: "Så fungerar tjänsten",
    description: "Om besök, områden och tjänster",
  },
  {
    value: "Annat",
    description: "Övriga administrativa frågor",
  },
];
