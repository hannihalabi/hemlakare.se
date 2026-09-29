"use client";

import { useCallback, useEffect, useState } from "react";
import type { ConversationStatus } from "@/lib/chat-demo";
import type {
  WhatsAppConfiguration,
  WhatsAppConversation,
  WhatsAppInboxPayload,
} from "@/lib/whatsapp-types";

const emptyConfiguration: WhatsAppConfiguration = { inbound: false, outbound: false, missing: [] };

function mapConversation(row: Record<string, unknown>): WhatsAppConversation {
  const messages = Array.isArray(row.messages) ? row.messages : [];
  return {
    id: String(row.id),
    waId: String(row.wa_id),
    displayName: String(row.display_name || "WhatsApp-kontakt"),
    status: String(row.status) as ConversationStatus,
    assignedTo: typeof row.assigned_to_name === "string" ? row.assigned_to_name : null,
    lastInboundAt: row.last_inbound_at ? String(row.last_inbound_at) : null,
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
    messages: messages.map((rawMessage) => {
      const message = rawMessage as Record<string, unknown>;
      return {
        id: String(message.id),
        externalId: typeof message.whatsapp_message_id === "string" ? message.whatsapp_message_id : null,
        direction: message.direction as "inbound" | "outbound" | "system",
        messageType: String(message.message_type),
        body: String(message.body),
        deliveryStatus: message.delivery_status as "received" | "queued" | "sent" | "delivered" | "read" | "failed",
        readByStaff: Boolean(message.read_by_staff),
        senderName: typeof message.sender_name === "string" ? message.sender_name : null,
        createdAt: String(message.created_at),
      };
    }),
  };
}

export function useWhatsAppConversations() {
  const [conversations, setConversations] = useState<WhatsAppConversation[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [configuration, setConfiguration] = useState(emptyConfiguration);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/whatsapp", { cache: "no-store" });
      const payload = await response.json() as WhatsAppInboxPayload & { error?: string };
      if (!response.ok) throw new Error(payload.error ?? "WhatsApp-inkorgen kunde inte läsas.");
      setConversations((payload.conversations as unknown as Record<string, unknown>[]).map(mapConversation));
      setUnreadCount(payload.unreadCount ?? 0);
      setConfiguration(payload.configuration ?? emptyConfiguration);
      setError(null);
    } catch (refreshError) {
      setError(refreshError instanceof Error ? refreshError.message : "WhatsApp-inkorgen kunde inte läsas.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const initialTimer = window.setTimeout(() => void refresh(), 0);
    const timer = window.setInterval(() => void refresh(), 20_000);
    return () => {
      window.clearTimeout(initialTimer);
      window.clearInterval(timer);
    };
  }, [refresh]);

  const update = useCallback(async (id: string, payload: Record<string, unknown>) => {
    const response = await fetch(`/api/admin/whatsapp/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json() as { error?: string };
    if (!response.ok) throw new Error(result.error ?? "WhatsApp-konversationen kunde inte uppdateras.");
    await refresh();
  }, [refresh]);

  return {
    conversations,
    unreadCount,
    configuration,
    loading,
    error,
    refresh,
    sendMessage: (id: string, body: string) => update(id, { body }),
    assignConversation: (id: string) => update(id, { assignToSelf: true }),
    setConversationStatus: (id: string, status: ConversationStatus) => update(id, { status }),
    markRead: (id: string) => update(id, { markRead: true }),
  };
}
