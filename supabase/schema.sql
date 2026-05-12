-- SQL Schema for AI Spend Audit

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- AUDITS table: Stores the raw audit data and results
create table if not exists public.audits (
    id uuid primary key default uuid_generate_v4(),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    team_size integer not null,
    use_case text not null,
    input_data jsonb not null, -- Stores the tools[] array
    result_data jsonb not null, -- Stores the AuditResult (savings, recommendations)
    share_token text unique default encode(gen_random_bytes(12), 'base64'),
    is_public boolean default false
);

-- LEADS table: Stores contact info for high-savings users (Credex consultation)
create table if not exists public.leads (
    id uuid primary key default uuid_generate_v4(),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    email text not null,
    company_name text,
    audit_id uuid references public.audits(id),
    savings_amount numeric(10, 2),
    status text default 'new' -- new, contacted, closed
);

-- PUBLIC_REPORTS table: Optimized for viewing shared reports
create table if not exists public.public_reports (
    id uuid primary key default uuid_generate_v4(),
    audit_id uuid references public.audits(id) on delete cascade,
    slug text unique not null,
    view_count integer default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Indices for performance
create index if not exists idx_audits_share_token on public.audits(share_token);
create index if not exists idx_public_reports_slug on public.public_reports(slug);
create index if not exists idx_leads_email on public.leads(email);

-- Row Level Security (RLS)
alter table public.audits enable row level security;
alter table public.leads enable row level security;
alter table public.public_reports enable row level security;

-- Basic Policies (To be refined based on auth needs)
create policy "Public can view shared reports" on public.audits
    for select using (is_public = true);

create policy "Public can view public report metadata" on public.public_reports
    for select using (true);
