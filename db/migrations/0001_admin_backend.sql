create extension if not exists pgcrypto;

create table if not exists admin_users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  password_hash text not null,
  name text not null default 'Admin',
  role text not null default 'admin' check (role in ('admin','staff')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists chat_conversations (
  id uuid primary key default gen_random_uuid(),
  public_token uuid not null unique default gen_random_uuid(),
  reference text not null unique,
  visitor_name text not null,
  visitor_email text,
  topic text not null,
  status text not null default 'new' check (status in ('new','open','waiting','resolved')),
  assigned_to uuid references admin_users(id) on delete set null,
  source text not null default 'Webb',
  satisfaction text check (satisfaction in ('yes','no')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists chat_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references chat_conversations(id) on delete cascade,
  sender text not null check (sender in ('visitor','employee','system')),
  sender_name text not null,
  body text not null,
  read_by_staff boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists audit_events (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references admin_users(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id text,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create index if not exists chat_conversations_updated_idx on chat_conversations(updated_at desc);
create index if not exists chat_messages_conversation_idx on chat_messages(conversation_id, created_at);
create index if not exists audit_events_created_idx on audit_events(created_at desc);
