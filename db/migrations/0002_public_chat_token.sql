alter table chat_conversations
  add column if not exists public_token uuid not null default gen_random_uuid();

create unique index if not exists chat_conversations_public_token_idx
  on chat_conversations(public_token);
