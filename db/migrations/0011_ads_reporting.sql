create table if not exists ads_daily_metrics (
  platform text not null check (platform in ('google', 'meta', 'tiktok')),
  account_id text not null,
  campaign_id text not null,
  campaign_name text not null,
  metric_date date not null,
  currency text not null,
  spend numeric(18, 4) not null default 0,
  impressions bigint not null default 0,
  clicks bigint not null default 0,
  conversions numeric(18, 4),
  conversion_value numeric(18, 4),
  synced_at timestamptz not null default now(),
  primary key (platform, account_id, campaign_id, metric_date)
);

create index if not exists ads_daily_metrics_date_idx
  on ads_daily_metrics (metric_date desc, platform);

create table if not exists ads_sync_runs (
  id uuid primary key default gen_random_uuid(),
  platform text not null check (platform in ('google', 'meta', 'tiktok')),
  status text not null check (status in ('success', 'error')),
  row_count integer not null default 0,
  error_message text,
  completed_at timestamptz not null default now()
);

create index if not exists ads_sync_runs_latest_idx
  on ads_sync_runs (platform, completed_at desc);
