"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  CHAT_DEMO_EVENT,
  CHAT_DEMO_STORAGE_KEY,
  DEMO_EMPLOYEE,
  type ChatConversation,
  type ChatDemoState,
  type ChatTopic,
  type ConversationStatus,
  createDemoState,
  makeId,
} from "@/lib/chat-demo";

type StartConversationInput = {
  visitorName: string;
  topic: ChatTopic;
};

// The server snapshot must be deterministic so React can hydrate without a
// mismatch. The live browser snapshot is swapped in immediately afterwards.
const fallbackState = createDemoState(Date.UTC(2026, 6, 23, 10, 0));
let cachedState = fallbackState;
let cachedRawState: string | undefined;

function readState(): ChatDemoState {
  if (typeof window === "undefined") return fallbackState;

  const saved = window.localStorage.getItem(CHAT_DEMO_STORAGE_KEY);
  if (!saved) {
    const initial = createDemoState();
    const serialized = JSON.stringify(initial);
    window.localStorage.setItem(CHAT_DEMO_STORAGE_KEY, serialized);
    cachedState = initial;
    cachedRawState = serialized;
    return initial;
  }

  if (saved === cachedRawState) return cachedState;

  try {
    cachedState = JSON.parse(saved) as ChatDemoState;
    cachedRawState = saved;
    return cachedState;
  } catch {
    const initial = createDemoState();
    const serialized = JSON.stringify(initial);
    window.localStorage.setItem(CHAT_DEMO_STORAGE_KEY, serialized);
    cachedState = initial;
    cachedRawState = serialized;
    return initial;
  }
}

function saveState(next: ChatDemoState) {
  const serialized = JSON.stringify(next);
  cachedState = next;
  cachedRawState = serialized;
  window.localStorage.setItem(CHAT_DEMO_STORAGE_KEY, serialized);
  window.dispatchEvent(new CustomEvent(CHAT_DEMO_EVENT));
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(CHAT_DEMO_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(CHAT_DEMO_EVENT, onStoreChange);
  };
}

export function useChatDemo() {
  const state = useSyncExternalStore(
    subscribe,
    readState,
    () => fallbackState,
  );

  const update = useCallback(
    (updater: (current: ChatDemoState) => ChatDemoState) => {
      const next = updater(readState());
      saveState(next);
      return next;
    },
    [],
  );

  const startConversation = useCallback(
    ({ visitorName, topic }: StartConversationInput) => {
      const id = makeId("conversation");
      const now = Date.now();
      const referenceNumber = Math.floor(1043 + Math.random() * 800);
      const firstName = visitorName.trim() || "Besökare";
      const conversation: ChatConversation = {
        id,
        reference: `#${referenceNumber}`,
        visitorName: firstName,
        topic,
        status: "new",
        source: "Startsidan",
        createdAt: now,
        updatedAt: now,
        messages: [
          {
            id: makeId("message"),
            sender: "system",
            senderName: "Hemläkare",
            body: "Tack! En medarbetare ansluter snart.",
            createdAt: now,
            readByStaff: true,
          },
        ],
      };

      update((current) => ({
        conversations: [conversation, ...current.conversations],
        visitorConversationId: id,
      }));

      return id;
    },
    [update],
  );

  const sendMessage = useCallback(
    (
      conversationId: string,
      body: string,
      sender: "visitor" | "employee",
      senderName?: string,
    ) => {
      const trimmed = body.trim();
      if (!trimmed) return;

      update((current) => ({
        ...current,
        conversations: current.conversations.map((conversation) => {
          if (conversation.id !== conversationId) return conversation;

          const createdAt = Date.now();
          return {
            ...conversation,
            status:
              conversation.status === "resolved" ? "open" : conversation.status,
            updatedAt: createdAt,
            messages: [
              ...conversation.messages,
              {
                id: makeId("message"),
                sender,
                senderName:
                  senderName ??
                  (sender === "employee"
                    ? conversation.assignedTo ?? DEMO_EMPLOYEE
                    : conversation.visitorName),
                body: trimmed,
                createdAt,
                readByStaff: sender === "employee",
              },
            ],
          };
        }),
      }));
    },
    [update],
  );

  const assignConversation = useCallback(
    (conversationId: string, employeeName = DEMO_EMPLOYEE) => {
      update((current) => ({
        ...current,
        conversations: current.conversations.map((conversation) => {
          if (conversation.id !== conversationId) return conversation;
          const createdAt = Date.now();

          return {
            ...conversation,
            assignedTo: employeeName,
            status: "open",
            updatedAt: createdAt,
            messages: [
              ...conversation.messages,
              {
                id: makeId("message"),
                sender: "system",
                senderName: "Hemläkare",
                body: `${employeeName} från kundservice har anslutit.`,
                createdAt,
                readByStaff: true,
              },
            ],
          };
        }),
      }));
    },
    [update],
  );

  const setConversationStatus = useCallback(
    (conversationId: string, status: ConversationStatus) => {
      update((current) => ({
        ...current,
        conversations: current.conversations.map((conversation) =>
          conversation.id === conversationId
            ? { ...conversation, status, updatedAt: Date.now() }
            : conversation,
        ),
      }));
    },
    [update],
  );

  const markRead = useCallback(
    (conversationId: string) => {
      update((current) => ({
        ...current,
        conversations: current.conversations.map((conversation) =>
          conversation.id === conversationId
            ? {
                ...conversation,
                messages: conversation.messages.map((item) => ({
                  ...item,
                  readByStaff: true,
                })),
              }
            : conversation,
        ),
      }));
    },
    [update],
  );

  const rateConversation = useCallback(
    (conversationId: string, satisfaction: "yes" | "no") => {
      update((current) => ({
        ...current,
        conversations: current.conversations.map((conversation) =>
          conversation.id === conversationId
            ? { ...conversation, satisfaction }
            : conversation,
        ),
      }));
    },
    [update],
  );

  const startNewVisitorConversation = useCallback(() => {
    update((current) => ({ ...current, visitorConversationId: undefined }));
  }, [update]);

  const resetDemo = useCallback(() => {
    const next = createDemoState();
    saveState(next);
  }, []);

  const visitorConversation = state.visitorConversationId
    ? state.conversations.find(
        (conversation) => conversation.id === state.visitorConversationId,
      )
    : undefined;

  return {
    ...state,
    visitorConversation,
    startConversation,
    sendMessage,
    assignConversation,
    setConversationStatus,
    markRead,
    rateConversation,
    startNewVisitorConversation,
    resetDemo,
  };
}
