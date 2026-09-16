create extension if not exists pgcrypto;

create table public.profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 display_name text not null default 'Membre Dealora', avatar_url text, country text default 'France',
 verified boolean not null default false, rating numeric(2,1) not null default 0,
 created_at timestamptz not null default now()
);
create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path=public as $$ begin insert into public.profiles(id,display_name) values(new.id,coalesce(new.raw_user_meta_data->>'display_name',split_part(new.email,'@',1),'Membre Dealora')) on conflict(id) do nothing; return new; end; $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

create table public.listings (
 id uuid primary key default gen_random_uuid(), seller_id uuid not null references public.profiles(id) on delete cascade,
 title text not null check(char_length(title) between 3 and 100), description text not null check(char_length(description) between 10 and 5000),
 category text not null, condition text not null, transaction_mode text not null check(transaction_mode in ('buy','swap','auction')),
 price numeric(12,2) check(price is null or price>=0), has_invoice boolean not null, pickup boolean not null default true,
 shipping boolean not null default false, international boolean not null default false, country text not null default 'France',
 status text not null default 'active' check(status in ('draft','active','reserved','sold','ended')), created_at timestamptz not null default now()
);
create table public.listing_contacts (
 listing_id uuid primary key references public.listings(id) on delete cascade,
 seller_id uuid not null references public.profiles(id) on delete cascade,
 phone text not null check(char_length(trim(phone)) between 6 and 30),
 show_phone boolean not null default false, created_at timestamptz not null default now()
);
create table public.listing_photos (
 id uuid primary key default gen_random_uuid(), listing_id uuid not null references public.listings(id) on delete cascade,
 storage_path text not null, public_url text not null, position smallint not null default 0, created_at timestamptz not null default now()
);
create table public.favorites (user_id uuid references public.profiles(id) on delete cascade,listing_id uuid references public.listings(id) on delete cascade,created_at timestamptz not null default now(),primary key(user_id,listing_id));
create table public.conversations (id uuid primary key default gen_random_uuid(),listing_id uuid references public.listings(id) on delete set null,buyer_id uuid not null references public.profiles(id) on delete cascade,seller_id uuid not null references public.profiles(id) on delete cascade,created_at timestamptz not null default now(),unique(listing_id,buyer_id,seller_id));
create table public.messages (id uuid primary key default gen_random_uuid(),conversation_id uuid not null references public.conversations(id) on delete cascade,sender_id uuid not null references public.profiles(id) on delete cascade,body text not null check(char_length(body) between 1 and 3000),read_at timestamptz,created_at timestamptz not null default now());
create table public.offers (id uuid primary key default gen_random_uuid(),listing_id uuid not null references public.listings(id) on delete cascade,buyer_id uuid not null references public.profiles(id) on delete cascade,type text not null check(type in ('offer','swap','bid')),amount numeric(12,2) check(amount is null or amount>0),trade_listing_id uuid references public.listings(id) on delete set null,status text not null default 'pending' check(status in ('pending','accepted','declined','cancelled','expired')),created_at timestamptz not null default now());
create table public.notifications (id uuid primary key default gen_random_uuid(),user_id uuid not null references public.profiles(id) on delete cascade,title text not null default 'Dealora',body text not null,kind text not null default 'info',read_at timestamptz,created_at timestamptz not null default now());
create table public.reviews (id uuid primary key default gen_random_uuid(),reviewer_id uuid not null references public.profiles(id) on delete cascade,reviewed_user_id uuid not null references public.profiles(id) on delete cascade,transaction_id uuid,rating smallint not null check(rating between 1 and 5),comment text check(comment is null or char_length(comment)<=1500),created_at timestamptz not null default now(),check(reviewer_id<>reviewed_user_id));

alter table public.profiles enable row level security; alter table public.listings enable row level security; alter table public.listing_contacts enable row level security; alter table public.listing_photos enable row level security; alter table public.favorites enable row level security; alter table public.conversations enable row level security; alter table public.messages enable row level security; alter table public.offers enable row level security; alter table public.notifications enable row level security; alter table public.reviews enable row level security;
create policy "profiles readable" on public.profiles for select using(true); create policy "profile owner updates" on public.profiles for update using(auth.uid()=id);
create policy "listings readable" on public.listings for select using(status='active' or auth.uid()=seller_id); create policy "seller creates listing" on public.listings for insert with check(auth.uid()=seller_id); create policy "seller updates listing" on public.listings for update using(auth.uid()=seller_id);
grant select on public.listing_contacts to anon, authenticated; grant insert, update, delete on public.listing_contacts to authenticated;
create policy "visible listing phone" on public.listing_contacts for select to anon, authenticated using(show_phone or (select auth.uid())=seller_id);
create policy "seller creates listing phone" on public.listing_contacts for insert to authenticated with check((select auth.uid())=seller_id and exists(select 1 from public.listings l where l.id=listing_id and l.seller_id=(select auth.uid())));
create policy "seller updates listing phone" on public.listing_contacts for update to authenticated using((select auth.uid())=seller_id) with check((select auth.uid())=seller_id and exists(select 1 from public.listings l where l.id=listing_id and l.seller_id=(select auth.uid())));
create policy "seller deletes listing phone" on public.listing_contacts for delete to authenticated using((select auth.uid())=seller_id);
create policy "photos readable" on public.listing_photos for select using(true); create policy "seller adds photos" on public.listing_photos for insert with check(exists(select 1 from public.listings l where l.id=listing_id and l.seller_id=auth.uid()));
create policy "favorites owner" on public.favorites for all using(auth.uid()=user_id) with check(auth.uid()=user_id);
create policy "conversation members" on public.conversations for select using(auth.uid() in(buyer_id,seller_id)); create policy "buyer starts conversation" on public.conversations for insert with check(auth.uid()=buyer_id and auth.uid()<>seller_id);
create policy "message members read" on public.messages for select using(exists(select 1 from public.conversations c where c.id=conversation_id and auth.uid() in(c.buyer_id,c.seller_id))); create policy "message member sends" on public.messages for insert with check(auth.uid()=sender_id and exists(select 1 from public.conversations c where c.id=conversation_id and auth.uid() in(c.buyer_id,c.seller_id)));
create policy "offer parties read" on public.offers for select using(auth.uid()=buyer_id or exists(select 1 from public.listings l where l.id=listing_id and l.seller_id=auth.uid())); create policy "buyer creates offer" on public.offers for insert with check(auth.uid()=buyer_id and exists(select 1 from public.listings l where l.id=listing_id and l.seller_id<>auth.uid()));
create policy "notifications owner" on public.notifications for select using(auth.uid()=user_id); create policy "notifications owner update" on public.notifications for update using(auth.uid()=user_id);
create policy "reviews readable" on public.reviews for select using(true); create policy "reviewer creates review" on public.reviews for insert with check(auth.uid()=reviewer_id and reviewer_id<>reviewed_user_id);

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values('listing-images','listing-images',true,10485760,array['image/jpeg','image/png','image/webp']) on conflict(id) do update set public=true,file_size_limit=excluded.file_size_limit,allowed_mime_types=excluded.allowed_mime_types;
create policy "public listing photos" on storage.objects for select using(bucket_id='listing-images');
create policy "users upload own listing photos" on storage.objects for insert to authenticated with check(bucket_id='listing-images' and (storage.foldername(name))[1]=auth.uid()::text);
create policy "users delete own listing photos" on storage.objects for delete to authenticated using(bucket_id='listing-images' and (storage.foldername(name))[1]=auth.uid()::text);

create index listings_created_idx on public.listings(created_at desc); create index listings_mode_idx on public.listings(transaction_mode); create index listing_contacts_seller_idx on public.listing_contacts(seller_id); create index messages_conversation_idx on public.messages(conversation_id,created_at); create index offers_listing_idx on public.offers(listing_id,created_at); create index notifications_user_idx on public.notifications(user_id,created_at desc);
