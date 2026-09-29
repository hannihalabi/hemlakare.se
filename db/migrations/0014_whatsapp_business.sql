-- WhatsApp Business-inkorg för administrativa patientärenden.
-- Råa webhookpayloads och media lagras inte för att minimera personuppgifter.

create table if not exists whatsapp_conversations (
  id uuid primary key default gen_random_uuid(),
  wa_id text not null unique,
  display_name text not null default 'WhatsApp-kontakt',
  status text not null default 'new' check (status in ('new', 'open', 'waiting', 'resolved')),
  assigned_to uuid references admin_users(id) on delete set null,
  last_inbound_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists whatsapp_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references whatsapp_conversations(id) on delete cascade,
  whatsapp_message_id text unique,
  direction text not null check (direction in ('inbound', 'outbound', 'system')),
  message_type text not null default 'text',
  body text not null default '',
  delivery_status text not null default 'received' check (delivery_status in (
    'received', 'queued', 'sent', 'delivered', 'read', 'failed'
  )),
  read_by_staff boolean not null default false,
  sent_by uuid references admin_users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists whatsapp_conversations_updated_idx
  on whatsapp_conversations (updated_at desc);

create index if not exists whatsapp_conversations_status_idx
  on whatsapp_conversations (status, updated_at desc);

create index if not exists whatsapp_messages_conversation_idx
  on whatsapp_messages (conversation_id, created_at);

create index if not exists whatsapp_messages_unread_idx
  on whatsapp_messages (conversation_id, created_at)
  where direction = 'inbound' and read_by_staff = false;
