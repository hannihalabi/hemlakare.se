alter table admin_users drop constraint if exists admin_users_role_check;
alter table admin_users
  add constraint admin_users_role_check
  check (role in ('admin', 'editor', 'medical_reviewer', 'staff'));

create table if not exists content_items (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  h1 text not null,
  excerpt text not null default '',
  body text not null default '',
  tag text not null default 'HÄLSA',
  status text not null default 'draft' check (status in (
    'draft', 'seo_review', 'medical_review', 'legal_privacy_review',
    'ready', 'scheduled', 'published', 'noindex'
  )),
  target_query text,
  intent text,
  cta_label text,
  cta_href text,
  meta_title text,
  meta_description text,
  canonical_url text,
  og_image text,
  schema_type text not null default 'Article',
  robots text not null default 'index,follow',
  author_id uuid references admin_users(id) on delete set null,
  reviewer_id uuid references admin_users(id) on delete set null,
  reviewed_at timestamptz,
  scheduled_at timestamptz,
  published_at timestamptz,
  created_by uuid references admin_users(id) on delete set null,
  updated_by uuid references admin_users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists content_items_status_idx on content_items(status, updated_at desc);
create index if not exists content_items_published_idx on content_items(published_at desc)
  where status = 'published';

create table if not exists content_versions (
  id uuid primary key default gen_random_uuid(),
  content_id uuid not null references content_items(id) on delete cascade,
  version integer not null,
  snapshot jsonb not null,
  created_by uuid references admin_users(id) on delete set null,
  created_at timestamptz not null default now(),
  unique (content_id, version)
);

create index if not exists content_versions_content_idx
  on content_versions(content_id, version desc);

create table if not exists content_sources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  url text not null unique,
  publisher text not null default '',
  source_type text not null default 'official' check (source_type in (
    'primary', 'official', 'research', 'guideline', 'other'
  )),
  last_checked_at timestamptz,
  checked_by uuid references admin_users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists content_source_links (
  content_id uuid not null references content_items(id) on delete cascade,
  source_id uuid not null references content_sources(id) on delete cascade,
  primary key (content_id, source_id)
);

create table if not exists content_metrics (
  id uuid primary key default gen_random_uuid(),
  content_id uuid not null references content_items(id) on delete cascade,
  metric_date date not null,
  impressions integer not null default 0 check (impressions >= 0),
  clicks integer not null default 0 check (clicks >= 0),
  ctr numeric(7,4) not null default 0 check (ctr >= 0),
  average_position numeric(8,2) not null default 0 check (average_position >= 0),
  conversions integer not null default 0 check (conversions >= 0),
  conversion_rate numeric(7,4) not null default 0 check (conversion_rate >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (content_id, metric_date)
);

create index if not exists content_metrics_date_idx
  on content_metrics(metric_date desc);
