-- BidTrack MVP Supabase schema scaffold.
-- Apply after creating a Supabase project and enabling email auth.

create type member_role as enum ('owner', 'editor', 'viewer');
create type opportunity_stage as enum ('PSQ', 'ITT', 'Presentation', 'Award', 'Won', 'Lost');
create type bid_decision as enum ('Bid', 'No bid', 'Pending');

create table organisations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  manual_access_override boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table organisation_members (
  organisation_id uuid not null references organisations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role member_role not null default 'viewer',
  created_at timestamptz not null default now(),
  primary key (organisation_id, user_id)
);

create table opportunities (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references organisations(id) on delete cascade,
  name text not null,
  buyer text not null,
  source text,
  region text,
  sector text,
  value_gbp numeric(12,2) not null default 0,
  deadline date not null,
  stage opportunity_stage not null default 'PSQ',
  owner_user_id uuid references auth.users(id),
  bid_decision bid_decision not null default 'Pending',
  psq_date date,
  itt_date date,
  presentation_date date,
  award_date date,
  outcome_date date,
  notes text,
  created_by uuid references auth.users(id),
  updated_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table opportunity_links (
  id uuid primary key default gen_random_uuid(),
  opportunity_id uuid not null references opportunities(id) on delete cascade,
  url text not null,
  label text,
  created_at timestamptz not null default now()
);

create table billing_customers (
  organisation_id uuid primary key references organisations(id) on delete cascade,
  stripe_customer_id text,
  stripe_subscription_id text,
  subscription_status text not null default 'incomplete',
  trial_ends_at timestamptz,
  updated_at timestamptz not null default now()
);

create table notification_preferences (
  user_id uuid primary key references auth.users(id) on delete cascade,
  telegram_chat_id text,
  remind_7_days boolean not null default true,
  remind_3_days boolean not null default true,
  remind_1_day boolean not null default true,
  remind_overdue boolean not null default true,
  updated_at timestamptz not null default now()
);

alter table organisations enable row level security;
alter table organisation_members enable row level security;
alter table opportunities enable row level security;
alter table opportunity_links enable row level security;
alter table billing_customers enable row level security;
alter table notification_preferences enable row level security;

create policy "members can read their organisations"
on organisations for select
using (exists (
  select 1 from organisation_members om
  where om.organisation_id = organisations.id
  and om.user_id = auth.uid()
));

create policy "members can read organisation membership"
on organisation_members for select
using (user_id = auth.uid() or exists (
  select 1 from organisation_members om
  where om.organisation_id = organisation_members.organisation_id
  and om.user_id = auth.uid()
));

create policy "members can read opportunities"
on opportunities for select
using (exists (
  select 1 from organisation_members om
  where om.organisation_id = opportunities.organisation_id
  and om.user_id = auth.uid()
));

create policy "owners and editors can manage opportunities"
on opportunities for all
using (exists (
  select 1 from organisation_members om
  where om.organisation_id = opportunities.organisation_id
  and om.user_id = auth.uid()
  and om.role in ('owner', 'editor')
))
with check (exists (
  select 1 from organisation_members om
  where om.organisation_id = opportunities.organisation_id
  and om.user_id = auth.uid()
  and om.role in ('owner', 'editor')
));
