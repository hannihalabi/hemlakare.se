import type { Metadata } from "next";
import StaffInbox from "@/components/chat/StaffInbox";

export const metadata: Metadata = {
  title: "Chattinkorg – interaktiv MVP",
  description:
    "Interaktiv prototyp av Hemläkares medarbetarvy för administrativ kundservice.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function StaffChatPage() {
  return <StaffInbox />;
}
