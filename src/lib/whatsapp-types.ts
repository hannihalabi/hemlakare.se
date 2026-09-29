import type { ConversationStatus } from "@/lib/chat-demo";

export type WhatsAppDeliveryStatus = "received" | "queued" | "sent" | "delivered" | "read" | "failed";
export type WhatsAppDirection = "inbound" | "outbound" | "system";

export type WhatsAppMessage = {
  id: string;
  externalId: string | null;
  direction: WhatsAppDirection;
  messageType: string;
  body: string;
  deliveryStatus: WhatsAppDeliveryStatus;
  readByStaff: boolean;
  senderName: string | null;
  createdAt: string;
};

export type WhatsAppConversation = {
  id: string;
  waId: string;
  displayName: string;
  status: ConversationStatus;
  assignedTo: string | null;
  lastInboundAt: string | null;
  createdAt: string;
  updatedAt: string;
  messages: WhatsAppMessage[];
};

export type WhatsAppConfiguration = {
  inbound: boolean;
  outbound: boolean;
  missing: string[];
};

export type WhatsAppInboxPayload = {
  conversations: WhatsAppConversation[];
  unreadCount: number;
  configuration: WhatsAppConfiguration;
};
