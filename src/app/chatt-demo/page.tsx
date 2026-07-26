import type { Metadata } from "next";
import ChatDemoPresentation from "@/components/chat/ChatDemoPresentation";

export const metadata: Metadata = {
  title: "Chat MVP – presentationsvy",
  description:
    "Presentationsvy för Hemläkares interaktiva MVP av administrativ kundservicechatt.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ChatDemoPage() {
  return <ChatDemoPresentation />;
}
