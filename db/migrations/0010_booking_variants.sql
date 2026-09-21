-- Stöd för tjänster med flera bokningsbara varianter (t.ex. olika
-- blodprovspaket eller olika vaccin) som patienten väljer innan tid.
-- Schema/kalender styrs fortfarande av service_slug (samma öppettider och
-- undersökningstid oavsett variant); variant_* beskriver bara vad patienten
-- faktiskt valde och vad det kostade.

alter table bookings add column if not exists variant_slug text;
alter table bookings add column if not exists variant_label text;
alter table bookings add column if not exists variant_price_ore integer;

-- Vitamininjektioner får nu ett fast pris och kan bokas/betalas direkt
-- (tidigare krävde tjänsten kontakt före bokning).
update service_durations set duration_minutes = 20, buffer_minutes = 10 where service_slug = 'vitamininjektioner';

-- Blodprovstagning och vaccination hemma: lägg till tillgänglighetsregler
-- (samma vardagar 08–17 som övriga tjänster) och tjänstlängd, om de saknas.
insert into service_durations (service_slug, duration_minutes, buffer_minutes) values
  ('blodprovstagning', 15, 5),
  ('vaccination-hemma', 15, 10)
on conflict (service_slug) do nothing;

insert into provider_availability_rules (weekday, start_time, end_time, service_slugs) values
  (1, '08:00', '17:00', array['blodprovstagning']),
  (2, '08:00', '17:00', array['blodprovstagning']),
  (3, '08:00', '17:00', array['blodprovstagning']),
  (4, '08:00', '17:00', array['blodprovstagning']),
  (5, '08:00', '17:00', array['blodprovstagning']),
  (1, '08:00', '17:00', array['vaccination-hemma']),
  (2, '08:00', '17:00', array['vaccination-hemma']),
  (3, '08:00', '17:00', array['vaccination-hemma']),
  (4, '08:00', '17:00', array['vaccination-hemma']),
  (5, '08:00', '17:00', array['vaccination-hemma'])
on conflict do nothing;
