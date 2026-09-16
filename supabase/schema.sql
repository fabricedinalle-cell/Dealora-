create extension if not exists pgcrypto;

create table public.profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 display_name text not null,
 avatar_url text,
 country text,
 verified boolean not null default false,
 rating numeric(2,1) not null default 0,
 created_at timestamptz not null default now()
);

create table public.listings (
 id uuid primary key default gen_random_uuid(),
 seller_id uuid not null references public.profiles(id) on delete cascade,
 title text not null check (char_length(title) between 3 and 100),
 description text not null check (char_length(description) between 10 and 5000),
 category text not null,
 condition text not null,
 mode text not null check (mode in ('sale','trade','auction')),
 price numeric(12,2) check (price >= 0),
 invoice boolean not null,
 pickup boolean not null default true,
 shipping boolean not null default false,
 international boolean not null default false,
 country text not null,
 status text not null default 'active' check(status in ('draft','active','reserved','sold','ended')),
 created_at timestamptz not null default now()
);

create table public.listing_images (
 id uuid primary key default gen_random_uuid(), listing_id uuid not null references public.listings(id) on delete cascade,
 path text not null, position smallint not null default 0, created_at timestamptz not null default now()
);

create table public.favorites (
 user_id uuid references public.profiles(id) on delete cascade,
 listing_id uuid references public.listings(id) on delete cascade,
 created_at timestamptz not null default now(), primary key(user_id,listing_id)
);

create table public.conversations (
 id uuid primary key default gen_random_uuid(), listing_id uuid references public.listings(id) on delete set null,
 buyer_id uuid not null references public.profiles(id) on delete cascade,
 seller_id uuid not null references public.profiles(id) on delete cascade,
 created_at timestamptz not null default now(), unique(listing_id,buyer_id,seller_id)
);

create table public.messages (
 id uuid primary key default gen_random_uuid(), conversation_id uuid not null references public.conversations(id) on delete cascade,
 sender_id uuid not null references public.profiles(id) on delete cascade,
 body text not null check(char_length(body) between 1 and 3000), read_at timestamptz, created_at timestamptz not null default now()
);

create table public.offers (
 id uuid primary key default gen_random_uuid(), listing_id uuid not null references public.listings(id) on delete cascade,
 buyer_id uuid not null references public.profiles(id) on delete cascade,
 amount numeric(12,2), trade_listing_id uuid references public.listings(id) on delete set null,
 status text not null default 'pending' check(status in ('pending','accepted','declined','cancelled','expired')),
 created_at timestamptz not null default now()
);

create table public.bids (
 id uuid primary key default gen_random_uuid(), listing_id uuid not null references public.listings(id) on delete cascade,
 bidder_id uuid not null references public.profiles(id) on delete cascade,
 amount numeric(12,2) not null check(amount > 0), created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.listings enable row level security;
alter table public.listing_images enable row level security;
alter table public.favorites enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.offers enable row level security;
alter table public.bids enable row level security;

create policy "profiles readable" on public.profiles for select using (true);
create policy "profile owner updates" on public.profiles for update using(auth.uid()=id);
create policy "active listings readable" on public.listings for select using(status='active' or auth.uid()=seller_id);
create policy "seller creates listing" on public.listings for insert with check(auth.uid()=seller_id);
create policy "seller updates listing" on public.listings for update using(auth.uid()=seller_id);
create policy "images readable" on public.listing_images for select using(true);
create policy "favorites owner" on public.favorites for all using(auth.uid()=user_id) with check(auth.uid()=user_id);
create policy "conversation members" on public.conversations for select using(auth.uid() in (buyer_id,seller_id));
create policy "buyer starts conversation" on public.conversations for insert with check(auth.uid()=buyer_id);
create policy "message members read" on public.messages for select using(exists(select 1 from public.conversations c where c.id=conversation_id and auth.uid() in(c.buyer_id,c.seller_id)));
create policy "message member sends" on public.messages for insert with check(auth.uid()=sender_id and exists(select 1 from public.conversations c where c.id=conversation_id and auth.uid() in(c.buyer_id,c.seller_id)));
create policy "offer parties read" on public.offers for select using(auth.uid()=buyer_id or exists(select 1 from public.listings l where l.id=listing_id and l.seller_id=auth.uid()));
create policy "buyer creates offer" on public.offers for insert with check(auth.uid()=buyer_id);
create policy "bids readable" on public.bids for select using(true);
create policy "bidder creates bid" on public.bids for insert with check(auth.uid()=bidder_id);

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values('listing-images','listing-images',true,10485760,array['image/jpeg','image/png','image/webp']) on conflict(id) do nothing;
