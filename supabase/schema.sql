-- ============================================
-- CopyPunch — Supabase Database Schema
-- À exécuter dans le SQL Editor de Supabase
-- ============================================

-- 1. Table profiles (étend auth.users)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text not null,
  plan text not null default 'gratuit' check (plan in ('gratuit', 'pro', 'business')),
  stripe_customer_id text,
  referral_code text not null default encode(gen_random_bytes(6), 'hex'),
  referred_by text,
  bonus_generations integer not null default 0,
  generations_used_this_month integer not null default 0,
  current_period_start timestamptz not null default date_trunc('month', now()),
  created_at timestamptz not null default now()
);

-- 2. Table generations
create table public.generations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  content_type text not null,
  input_description text not null,
  input_tone text not null,
  input_custom_tone text,
  input_cta text,
  output text not null,
  created_at timestamptz not null default now()
);

-- 3. Table favorites
create table public.favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  generation_id uuid references public.generations(id) on delete cascade not null,
  created_at timestamptz not null default now(),
  unique(user_id, generation_id)
);

-- 4. Index
create index idx_generations_user_id on public.generations(user_id);
create index idx_generations_created_at on public.generations(created_at desc);
create index idx_favorites_user_id on public.favorites(user_id);
create index idx_favorites_generation_id on public.favorites(generation_id);

-- 5. RLS (Row Level Security)
alter table public.profiles enable row level security;
alter table public.generations enable row level security;
alter table public.favorites enable row level security;

-- Profiles: lecture et modification uniquement par le propriétaire
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Generations: CRUD uniquement par le propriétaire
create policy "Users can view own generations"
  on public.generations for select
  using (auth.uid() = user_id);

create policy "Users can insert own generations"
  on public.generations for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own generations"
  on public.generations for delete
  using (auth.uid() = user_id);

-- Favorites: CRUD uniquement par le propriétaire
create policy "Users can view own favorites"
  on public.favorites for select
  using (auth.uid() = user_id);

create policy "Users can insert own favorites"
  on public.favorites for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own favorites"
  on public.favorites for delete
  using (auth.uid() = user_id);

-- 6. Trigger: créer un profil automatiquement à l'inscription
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
