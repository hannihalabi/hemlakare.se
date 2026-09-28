import { getSql } from "@/lib/db";
import type { AdminEmailDetail, AdminEmailListItem, EmailAttachment, EmailDashboard, EmailStatus } from "@/lib/email-types";

type EmailListRow = {
  id: string;
  from_name: string | null;
  from_address: string;
  subject: string;
  preview: string;
  status: EmailStatus;
  received_at: string | Date;
  has_attachments: boolean;
};

const iso = (value: string | Date) => new Date(value).toISOString();

function mapListRow(row: EmailListRow): AdminEmailListItem {
  return {
    id: row.id,
    fromName: row.from_name,
    fromAddress: row.from_address,
    subject: row.subject,
    preview: row.preview,
    status: row.status,
    receivedAt: iso(row.received_at),
    hasAttachments: row.has_attachments,
  };
}

export function emailConfigured() {
  return Boolean(process.env.ONECOM_IMAP_USER && process.env.ONECOM_IMAP_PASSWORD);
}

export async function getEmailDashboard(status?: EmailStatus): Promise<EmailDashboard> {
  const sql = getSql();
  const rows = status
    ? await sql`
        select id, from_name, from_address, subject, preview, status, received_at,
          jsonb_array_length(attachments) > 0 as has_attachments
        from admin_email_messages where status = ${status}
        order by received_at desc limit 100
      `
    : await sql`
        select id, from_name, from_address, subject, preview, status, received_at,
          jsonb_array_length(attachments) > 0 as has_attachments
        from admin_email_messages order by received_at desc limit 100
      `;
  const [summary] = await sql`
    select
      (select count(*)::int from admin_email_messages where status = 'new') as unread_count,
      last_sync_at,
      last_error
    from (values (1)) as seed(value)
    left join admin_email_sync_state on mailbox = ${process.env.ONECOM_IMAP_MAILBOX ?? "INBOX"}
  `;
  return {
    configured: emailConfigured(),
    migrationRequired: false,
    lastSyncAt: summary?.last_sync_at ? iso(summary.last_sync_at as string | Date) : null,
    lastError: (summary?.last_error as string | null) ?? null,
    unreadCount: Number(summary?.unread_count ?? 0),
    messages: (rows as EmailListRow[]).map(mapListRow),
  };
}

export async function getEmailDetail(id: string, actorId: string): Promise<AdminEmailDetail | null> {
  const sql = getSql();
  const rows = await sql`
    select m.id, m.from_name, m.from_address, m.to_addresses, m.subject, m.preview,
      m.text_body, m.attachments, m.status, m.received_at,
      jsonb_array_length(m.attachments) > 0 as has_attachments,
      u.name as assigned_to_name
    from admin_email_messages m
    left join admin_users u on u.id = m.assigned_to
    where m.id = ${id}::uuid limit 1
  `;
  const row = rows[0];
  if (!row) return null;
  await sql`
    insert into audit_events (actor_id, action, entity_type, entity_id)
    values (${actorId}::uuid, 'email_opened', 'admin_email', ${id})
  `;
  return {
    ...mapListRow(row as EmailListRow),
    toAddresses: (row.to_addresses as string[]) ?? [],
    textBody: String(row.text_body ?? ""),
    attachments: (row.attachments as EmailAttachment[]) ?? [],
    assignedToName: (row.assigned_to_name as string | null) ?? null,
  };
}

export async function updateEmail(id: string, actorId: string, status: EmailStatus, assignToSelf: boolean) {
  const sql = getSql();
  await sql`
    update admin_email_messages
    set status = ${status},
      assigned_to = case when ${assignToSelf} then ${actorId}::uuid else assigned_to end,
      updated_at = now()
    where id = ${id}::uuid
  `;
  await sql`
    insert into audit_events (actor_id, action, entity_type, entity_id, metadata)
    values (${actorId}::uuid, 'email_status_changed', 'admin_email', ${id}, ${JSON.stringify({ status })}::jsonb)
  `;
}
