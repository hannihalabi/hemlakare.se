"use client";

import { useCallback, useEffect, useState } from "react";
import type { ChatConversation, ConversationStatus } from "@/lib/chat-demo";

function mapConversation(row: Record<string, unknown>): ChatConversation {
  const messages = Array.isArray(row.messages) ? row.messages : [];
  return {
    id: String(row.id),
    reference: String(row.reference),
    visitorName: String(row.visitor_name),
    visitorEmail: typeof row.visitor_email === "string" ? row.visitor_email : undefined,
    topic: String(row.topic) as ChatConversation["topic"],
    status: String(row.status) as ConversationStatus,
    assignedTo: typeof row.assigned_to_name === "string" ? row.assigned_to_name : undefined,
    source: String(row.source),
    createdAt: new Date(String(row.created_at)).getTime(),
    updatedAt: new Date(String(row.updated_at)).getTime(),
    messages: messages.map((message) => {
      const item = message as Record<string, unknown>;
      return { id: String(item.id), sender: item.sender as "visitor" | "employee" | "system", senderName: String(item.sender_name), body: String(item.body), createdAt: new Date(String(item.created_at)).getTime(), readByStaff: Boolean(item.read_by_staff) };
    }),
  };
}

export function useAdminConversations() {
  const [conversations, setConversations] = useState<ChatConversation[]>([]);

  const refresh = useCallback(async () => {
    const response = await fetch("/api/admin/conversations", { cache: "no-store" });
    if (!response.ok) return;
    const payload = await response.json();
    setConversations((payload.conversations as Record<string, unknown>[]).map(mapConversation));
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/admin/conversations", { cache: "no-store" })
      .then(async (response) => (response.ok ? response.json() : { conversations: [] }))
      .then((payload) => {
        if (!cancelled) setConversations((payload.conversations as Record<string, unknown>[]).map(mapConversation));
      })
      .catch(() => {
        if (!cancelled) setConversations([]);
      });
    return () => { cancelled = true; };
  }, []);

  const update = useCallback(async (id: string, payload: Record<string, unknown>) => {
    const response = await fetch(`/api/admin/conversations/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (response.ok) await refresh();
  }, [refresh]);

  return {
    conversations,
    sendMessage: (id: string, body: string) => update(id, { body }),
    assignConversation: (id: string) => update(id, { assignToSelf: true }),
    setConversationStatus: (id: string, status: ConversationStatus) => update(id, { status }),
    markRead: (id: string) => update(id, { markRead: true }),
    refresh,
  };
}
