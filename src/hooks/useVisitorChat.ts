"use client";

import { useCallback, useEffect, useState } from "react";
import type { ChatConversation, ChatTopic } from "@/lib/chat-demo";

const tokenKey = "hemlakare-visitor-chat-token";

function mapConversation(row: Record<string, unknown>): ChatConversation {
  return {
    id: String(row.id),
    reference: String(row.reference),
    visitorName: String(row.visitor_name),
    topic: String(row.topic) as ChatTopic,
    status: String(row.status) as ChatConversation["status"],
    source: String(row.source),
    satisfaction: row.satisfaction === "yes" || row.satisfaction === "no" ? row.satisfaction : undefined,
    createdAt: new Date(String(row.created_at)).getTime(),
    updatedAt: new Date(String(row.updated_at)).getTime(),
    messages: (Array.isArray(row.messages) ? row.messages : []).map((message) => {
      const item = message as Record<string, unknown>;
      return { id: String(item.id), sender: item.sender as "visitor" | "employee" | "system", senderName: String(item.senderName), body: String(item.body), createdAt: new Date(String(item.createdAt)).getTime(), readByStaff: item.sender !== "visitor" };
    }),
  };
}

export function useVisitorChat() {
  const [token, setToken] = useState<string | null>(() =>
    typeof window === "undefined" ? null : window.localStorage.getItem(tokenKey),
  );
  const [visitorConversation, setVisitorConversation] = useState<ChatConversation>();

  const refresh = useCallback(async (publicToken: string) => {
    const response = await fetch(`/api/chat/conversations/${publicToken}`, { cache: "no-store" });
    if (!response.ok) return;
    const payload = await response.json();
    setVisitorConversation(mapConversation(payload.conversation));
  }, []);

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    fetch(`/api/chat/conversations/${token}`, { cache: "no-store" })
      .then(async (response) => (response.ok ? response.json() : null))
      .then((payload) => {
        if (!cancelled && payload?.conversation) setVisitorConversation(mapConversation(payload.conversation));
      });
    return () => { cancelled = true; };
  }, [token]);

  const startConversation = useCallback(async ({ visitorName, topic }: { visitorName: string; topic: ChatTopic }) => {
    const response = await fetch("/api/chat/conversations", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ visitorName, topic, source: "Startsidan" }) });
    if (!response.ok) return;
    const payload = await response.json();
    const publicToken = String(payload.publicToken);
    window.localStorage.setItem(tokenKey, publicToken);
    setToken(publicToken);
    await refresh(publicToken);
  }, [refresh]);

  const sendMessage = useCallback(async (_: string, body: string) => {
    if (!token) return;
    const response = await fetch(`/api/chat/conversations/${token}/messages`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ body }) });
    if (response.ok) await refresh(token);
  }, [refresh, token]);

  const rateConversation = useCallback(async (_: string, satisfaction: "yes" | "no") => {
    if (!token) return;
    const response = await fetch(`/api/chat/conversations/${token}/rating`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ satisfaction }) });
    if (response.ok) await refresh(token);
  }, [refresh, token]);

  const startNewVisitorConversation = useCallback(() => {
    window.localStorage.removeItem(tokenKey);
    setToken(null);
    setVisitorConversation(undefined);
  }, []);

  return { visitorConversation, startConversation, sendMessage, rateConversation, startNewVisitorConversation };
}
