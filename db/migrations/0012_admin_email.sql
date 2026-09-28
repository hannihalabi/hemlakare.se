create table if not exists admin_email_messages (
  id uuid primary key default gen_random_uuid(),
  mailbox text not null,
  uid_validity text not null,
  imap_uid bigint not null,
  message_id text,
  from_name text,
  from_address text not null default '',
  to_addresses jsonb not null default '[]',
  subject text not null default '(inget ämne)',
  preview text not null default '',
  text_body text not null default '',
  attachments jsonb not null default '[]',
  source_seen boolean not null default false,
  status text not null default 'new' check (status in ('new', 'open', 'resolved')),
  assigned_to uuid references admin_users(id) on delete set null,
  received_at timestamptz not null,
  synced_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (mailbox, uid_validity, imap_uid)
);

create index if not exists admin_email_messages_received_idx
  on admin_email_messages (received_at desc);

create index if not exists admin_email_messages_status_idx
  on admin_email_messages (status, received_at desc);

create table if not exists admin_email_sync_state (
  mailbox text primary key,
  uid_validity text,
  last_uid bigint not null default 0,
  last_sync_at timestamptz,
  last_error text,
  updated_at timestamptz not null default now()
);
