-- Supabase > SQL Editor ga to'liq joylab, "Run" bosing.
create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  fish text not null,
  sana date not null default current_date,
  guruh text default '',
  tur text default 'Boshqa',
  imzo text default '',
  b1 date,
  b2 date,
  bno text default '',
  img_path text,
  created_by uuid default auth.uid()
);
alter table public.applications enable row level security;
drop policy if exists "auth all" on public.applications;
create policy "auth all" on public.applications for all to authenticated using (true) with check (true);

insert into storage.buckets (id, name, public) values ('scans', 'scans', false) on conflict (id) do nothing;
drop policy if exists "scans auth all" on storage.objects;
create policy "scans auth all" on storage.objects for all to authenticated
  using (bucket_id = 'scans') with check (bucket_id = 'scans');
