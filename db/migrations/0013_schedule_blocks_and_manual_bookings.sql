-- Eget personalschema: manuella blockeringar och källa för bokningar.
-- Google Calendar fortsätter vara en spegling/integration, medan dessa
-- poster gör att det egna schemat kan styra webbens tillgänglighet.

alter table bookings
  add column if not exists booking_source text not null default 'online'
  check (booking_source in ('online', 'manual'));

create table if not exists schedule_blocks (
  id uuid primary key default gen_random_uuid(),
  title text not null default 'Blockerad tid',
  notes text,
  start_time timestamptz not null,
  end_time timestamptz not null check (end_time > start_time),
  google_event_id text,
  created_by uuid references admin_users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists schedule_blocks_time_idx
  on schedule_blocks (start_time, end_time);
