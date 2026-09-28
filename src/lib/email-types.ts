export const emailStatuses = ["new", "open", "resolved"] as const;
export type EmailStatus = (typeof emailStatuses)[number];

export type EmailAttachment = {
  filename: string;
  contentType: string;
  size: number;
};

export type AdminEmailListItem = {
  id: string;
  fromName: string | null;
  fromAddress: string;
  subject: string;
  preview: string;
  status: EmailStatus;
  receivedAt: string;
  hasAttachments: boolean;
};

export type AdminEmailDetail = AdminEmailListItem & {
  toAddresses: string[];
  textBody: string;
  attachments: EmailAttachment[];
  assignedToName: string | null;
};

export type EmailDashboard = {
  configured: boolean;
  migrationRequired: boolean;
  lastSyncAt: string | null;
  lastError: string | null;
  unreadCount: number;
  messages: AdminEmailListItem[];
};
