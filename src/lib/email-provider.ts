import { ImapFlow } from "imapflow";
import { simpleParser, type AddressObject } from "mailparser";
import { getSql } from "@/lib/db";

const DEFAULT_MAILBOX = "INBOX";
const INITIAL_MESSAGE_LIMIT = 50;
const MAX_MESSAGE_BYTES = 10 * 1024 * 1024;
const MAX_BODY_LENGTH = 100_000;

type SyncResult = {
  imported: number;
  skipped: number;
};

function getConfig() {
  const user = process.env.ONECOM_IMAP_USER;
  const password = process.env.ONECOM_IMAP_PASSWORD;
  if (!user || !password) {
    throw new Error("One.com-kontot är inte konfigurerat ännu.");
  }

  return {
    host: process.env.ONECOM_IMAP_HOST ?? "imap.one.com",
    port: Number(process.env.ONECOM_IMAP_PORT ?? "993"),
    mailbox: process.env.ONECOM_IMAP_MAILBOX ?? DEFAULT_MAILBOX,
    user,
    password,
  };
}

function addressValues(value: AddressObject | AddressObject[] | undefined) {
  if (!value) return [];
  return (Array.isArray(value) ? value : [value]).flatMap((entry) =>
    entry.value.map((address) => address.address).filter((address): address is string => Boolean(address)),
  );
}

function cleanPreview(value: string) {
  return value.replace(/\s+/g, " ").trim().slice(0, 240);
}

function publicError(error: unknown) {
  if (!(error instanceof Error)) return "Synkroniseringen misslyckades.";
  if (/auth|login|credential|password/i.test(error.message)) {
    return "Inloggningen mot one.com misslyckades. Kontrollera kontouppgifterna.";
  }
  return "Synkroniseringen mot one.com misslyckades.";
}

async function recordSyncError(mailbox: string, message: string) {
  const sql = getSql();
  await sql`
    insert into admin_email_sync_state (mailbox, last_error, updated_at)
    values (${mailbox}, ${message}, now())
    on conflict (mailbox) do update
      set last_error = excluded.last_error, updated_at = now()
  `;
}

export async function syncOneComInbox(): Promise<SyncResult> {
  const config = getConfig();
  const sql = getSql();
  const stateRows = await sql`
    select uid_validity, last_uid
    from admin_email_sync_state
    where mailbox = ${config.mailbox}
    limit 1
  `;
  const state = stateRows[0];
  const client = new ImapFlow({
    host: config.host,
    port: config.port,
    secure: true,
    auth: { user: config.user, pass: config.password },
    logger: false,
  });

  let imported = 0;
  let skipped = 0;

  try {
    await client.connect();
    const mailbox = await client.mailboxOpen(config.mailbox, { readOnly: true });
    const uidValidity = mailbox.uidValidity.toString();
    const previousValidity = state?.uid_validity ? String(state.uid_validity) : null;
    const previousUid = previousValidity === uidValidity ? Number(state?.last_uid ?? 0) : 0;
    const initialSync = previousUid === 0;
    const range = initialSync
      ? `${Math.max(1, mailbox.exists - INITIAL_MESSAGE_LIMIT + 1)}:*`
      : `${previousUid + 1}:*`;
    let highestUid = previousUid;

    if (mailbox.exists > 0) {
      for await (const message of client.fetch(
        range,
        { uid: true, flags: true, internalDate: true, size: true, source: { maxLength: MAX_MESSAGE_BYTES + 1 } },
        { uid: !initialSync },
      )) {
        if (!initialSync && message.uid <= previousUid) continue;
        highestUid = Math.max(highestUid, message.uid);
        if (!message.source || (message.size ?? message.source.length) > MAX_MESSAGE_BYTES) {
          skipped += 1;
          continue;
        }

        const parsed = await simpleParser(message.source, { skipHtmlToText: false });
        const sender = parsed.from?.value[0];
        const textBody = (parsed.text ?? "").trim().slice(0, MAX_BODY_LENGTH);
        const attachments = parsed.attachments.map((attachment) => ({
          filename: attachment.filename ?? "Bilaga",
          contentType: attachment.contentType,
          size: attachment.size,
        }));
        const receivedAt = parsed.date ?? message.internalDate ?? new Date();

        await sql`
          insert into admin_email_messages (
            mailbox, uid_validity, imap_uid, message_id, from_name, from_address,
            to_addresses, subject, preview, text_body, attachments, source_seen, received_at
          ) values (
            ${config.mailbox}, ${uidValidity}, ${message.uid}, ${parsed.messageId ?? null},
            ${sender?.name ?? null}, ${sender?.address ?? ""},
            ${JSON.stringify(addressValues(parsed.to))}::jsonb,
            ${parsed.subject?.trim() || "(inget ämne)"}, ${cleanPreview(textBody)}, ${textBody},
            ${JSON.stringify(attachments)}::jsonb, ${message.flags?.has("\\Seen") ?? false},
            ${new Date(receivedAt)}
          )
          on conflict (mailbox, uid_validity, imap_uid) do nothing
        `;
        imported += 1;
      }
    }

    await sql`
      insert into admin_email_sync_state (mailbox, uid_validity, last_uid, last_sync_at, last_error, updated_at)
      values (${config.mailbox}, ${uidValidity}, ${highestUid}, now(), null, now())
      on conflict (mailbox) do update set
        uid_validity = excluded.uid_validity,
        last_uid = excluded.last_uid,
        last_sync_at = excluded.last_sync_at,
        last_error = null,
        updated_at = now()
    `;

    return { imported, skipped };
  } catch (error) {
    await recordSyncError(config.mailbox, publicError(error));
    throw new Error(publicError(error));
  } finally {
    if (client.usable) await client.logout().catch(() => undefined);
  }
}
