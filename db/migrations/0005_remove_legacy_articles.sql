-- Remove CMS articles published on or before 8 April 2026.
-- Related versions, sources and metrics are removed by their foreign keys.
delete from content_items
where published_at is not null
  and published_at < date '2026-04-09';
