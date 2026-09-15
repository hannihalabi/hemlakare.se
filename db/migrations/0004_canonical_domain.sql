update content_items
set canonical_url = replace(
  canonical_url,
  'https://hemlakare.se',
  'https://xn--hemlkare-3za.se'
)
where canonical_url like 'https://hemlakare.se%';

update content_versions
set snapshot = replace(
  snapshot::text,
  'https://hemlakare.se',
  'https://xn--hemlkare-3za.se'
)::jsonb
where snapshot::text like '%https://hemlakare.se%';

update content_items
set
  slug = replacements.new_slug,
  canonical_url = replace(content_items.canonical_url, replacements.old_slug, replacements.new_slug)
from (values
  ('migrän-behandling', 'migran-behandling'),
  ('sköldkörteln-symtom', 'skoldkorteln-symtom'),
  ('sår-som-inte-laker', 'sar-som-inte-laker'),
  ('njurbäckeninflammation', 'njurbackeninflammation'),
  ('sömnapne', 'somnapne'),
  ('kortisonet-bipåverkan', 'kortisonet-bipaverkan')
) as replacements(old_slug, new_slug)
where content_items.slug = replacements.old_slug;

update content_versions
set snapshot = replace(replace(replace(replace(replace(replace(
  snapshot::text,
  'migrän-behandling', 'migran-behandling'),
  'sköldkörteln-symtom', 'skoldkorteln-symtom'),
  'sår-som-inte-laker', 'sar-som-inte-laker'),
  'njurbäckeninflammation', 'njurbackeninflammation'),
  'sömnapne', 'somnapne'),
  'kortisonet-bipåverkan', 'kortisonet-bipaverkan')::jsonb
where snapshot::text ~ 'migrän-behandling|sköldkörteln-symtom|sår-som-inte-laker|njurbäckeninflammation|sömnapne|kortisonet-bipåverkan';
