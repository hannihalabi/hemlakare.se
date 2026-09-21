-- Lägger till en intern testtjänst (10 kr) för att verifiera hela
-- bokningsflödet: schema, Stripe Checkout och Google Calendar-koppling.
-- Tas bort igen med DELETE-satsen längst ner i den här filen (kommenterad)
-- när testningen är klar.

insert into service_durations (service_slug, duration_minutes, buffer_minutes) values
  ('testtjanst', 15, 5)
on conflict (service_slug) do nothing;

-- Samma tillgänglighet som övriga tjänster (vardagar 08–17).
insert into provider_availability_rules (weekday, start_time, end_time, service_slugs) values
  (1, '08:00', '17:00', array['testtjanst']),
  (2, '08:00', '17:00', array['testtjanst']),
  (3, '08:00', '17:00', array['testtjanst']),
  (4, '08:00', '17:00', array['testtjanst']),
  (5, '08:00', '17:00', array['testtjanst'])
on conflict do nothing;

-- Städa bort testtjänsten när ni är klara:
-- delete from provider_availability_rules where service_slugs = array['testtjanst'];
-- delete from service_durations where service_slug = 'testtjanst';
