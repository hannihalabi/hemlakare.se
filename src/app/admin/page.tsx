import type { Metadata } from "next";
import AdminLogin from "@/components/admin/AdminLogin";

export const metadata: Metadata = {
  title: "Admin – Hemläkare",
  description:
    "Administrativ arbetsyta för Hemläkares chatt, blogg och SEO-statistik.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <AdminLogin />;
}
