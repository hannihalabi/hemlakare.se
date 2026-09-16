update content_items
set canonical_url = replace(
  replace(canonical_url, 'https://xn--hemlkare-3za.se', 'https://hemlakare.se'),
  'https://www.hemlakare.se',
  'https://hemlakare.se'
)
where canonical_url = 'https://xn--hemlkare-3za.se'
   or canonical_url like 'https://xn--hemlkare-3za.se/%'
   or canonical_url = 'https://www.hemlakare.se'
   or canonical_url like 'https://www.hemlakare.se/%';

update content_versions
set snapshot = replace(
  replace(snapshot::text, 'https://xn--hemlkare-3za.se', 'https://hemlakare.se'),
  'https://www.hemlakare.se',
  'https://hemlakare.se'
)::jsonb
where snapshot::text like '%https://xn--hemlkare-3za.se%'
   or snapshot::text like '%https://www.hemlakare.se%';
