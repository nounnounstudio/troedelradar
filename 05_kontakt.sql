-- Trödelradar: Kontaktformular. Einmal nach 04_app.sql ausführen.
create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 120),
  mail text not null check (char_length(mail) between 3 and 200 and mail like '%@%'),
  message text not null check (char_length(message) between 5 and 4000),
  status text not null default 'offen' check (status in ('offen','erledigt')),
  created_at timestamptz not null default now()
);
alter table public.contact_messages enable row level security;
create policy contact_insert on public.contact_messages for insert to anon, authenticated with check (status = 'offen');
create policy contact_admin_read on public.contact_messages for select to authenticated using (public.is_admin());
create policy contact_admin_update on public.contact_messages for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy contact_admin_delete on public.contact_messages for delete to authenticated using (public.is_admin());
revoke all on public.contact_messages from anon, authenticated;
grant insert (name, mail, message) on public.contact_messages to anon, authenticated;
grant select, update, delete on public.contact_messages to authenticated;
