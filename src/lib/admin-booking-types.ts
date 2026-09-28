export const bookingStatuses = ["pending", "confirmed", "cancelled", "expired"] as const;

export type BookingStatus = (typeof bookingStatuses)[number];

export const bookingStatusLabels: Record<BookingStatus, string> = {
  pending: "Inväntar betalning",
  confirmed: "Bekräftad",
  cancelled: "Avbokad",
  expired: "Utgången",
};

export type AdminBooking = {
  id: string;
  serviceSlug: string;
  serviceName: string;
  variantLabel: string | null;
  startTime: string;
  endTime: string;
  status: BookingStatus;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  notes: string | null;
  priceOre: number | null;
  priceLabel: string;
  hasCalendarEvent: boolean;
  holdExpiresAt: string | null;
  createdAt: string;
  source: "online" | "manual";
};

export type ScheduleBlock = {
  id: string;
  title: string;
  notes: string | null;
  startTime: string;
  endTime: string;
  hasCalendarEvent: boolean;
  createdAt: string;
};

export type BookingDashboard = {
  bookings: AdminBooking[];
  blocks: ScheduleBlock[];
  counts: Record<BookingStatus, number> & { total: number };
};
