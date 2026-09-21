-- Bokning: tillgänglighetsregler, tjänstlängder och bokningar.
-- Google Calendar (en vårdgivarkalender) är sanningskälla för upptagen tid;
-- reglerna här styr bara vilka fönster som överhuvudtaget erbjuds.

create table if not exists service_durations (
  service_slug text primary key,
  duration_minutes integer not null check (duration_minutes > 0),
  buffer_minutes integer not null default 0 check (buffer_minutes >= 0),
  updated_at timestamptz not null default now()
);

create table if not exists provider_availability_rules (
  id uuid primary key default gen_random_uuid(),
  weekday integer not null check (weekday between 0 and 6), -- 0 = söndag ... 6 = lördag
  start_time time not null,
  end_time time not null check (end_time > start_time),
  service_slugs text[], -- null = gäller alla tjänster
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  service_slug text not null,
  start_time timestamptz not null,
  end_time timestamptz not null check (end_time > start_time),
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled', 'expired')),
  patient_name text not null,
  patient_email text not null,
  patient_phone text not null,
  notes text,
  stripe_payment_intent_id text unique,
  google_event_id text,
  hold_expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Förhindrar dubbelbokning: en starttid kan bara ha EN aktiv (pending eller confirmed) bokning.
create unique index if not exists bookings_active_start_time_idx
  on bookings (start_time)
  where status in ('pending', 'confirmed');

create index if not exists bookings_status_idx on bookings(status);
create index if not exists bookings_hold_expires_idx on bookings(hold_expires_at) where status = 'pending';

insert into service_durations (service_slug, duration_minutes, buffer_minutes) values
  ('fysiskt-lakarbesok', 30, 15),
  ('digitalt-lakarbesok', 15, 5),
  ('receptfornyelse', 15, 5),
  ('hudforandringar', 15, 5),
  ('medicinsk-viktminskning', 20, 10),
  ('vitamininjektioner', 20, 10)
on conflict (service_slug) do nothing;

-- Exempel: vardagar 08:00–17:00 för alla tjänster. Justera i admin/databasen efter behov.
insert into provider_availability_rules (weekday, start_time, end_time, service_slugs) values
  (1, '08:00', '17:00', null),
  (2, '08:00', '17:00', null),
  (3, '08:00', '17:00', null),
  (4, '08:00', '17:00', null),
  (5, '08:00', '17:00', null)
on conflict do nothing;
