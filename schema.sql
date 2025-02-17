/** 
 * USERS
 * Note: This table contains user data. Users should only be able to view and update their own data.
 */
create table users (
  -- UUID from auth.users
  id uuid references auth.users not null primary key,
  email text,
  full_name text,
  avatar_url text,
  count integer default 0,
  -- The customer's billing address, stored in JSON format.
  billing_address jsonb,
  -- Stores your customer's payment instruments.
  payment_method jsonb
);

alter table
  users enable row level security;

create policy "Can view own user data." on users for
select
  using (auth.uid() = id);

create policy "Can update own user data." on users for
update
  using (auth.uid() = id);

create policy "Can insert own user data." on users for
insert
  with check (auth.uid() = id);


/**
 * This trigger automatically creates a user entry when a new user signs up via Supabase Auth.
 */
create function public.handle_new_user() returns trigger as $ $ begin
insert into
  public.users (id, email, full_name, avatar_url)
values
  (
    new.id,
    new.raw_user_meta_data ->> 'email',
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'avatar_url'
  );

return new;

end;

$ $ language plpgsql security definer;

create trigger on_auth_user_created
after
insert
  on auth.users for each row execute procedure public.handle_new_user();


create table customers (
  -- UUID from auth.users
  id uuid references auth.users not null primary key,
  stripe_customer_id text
);

alter table
  customers enable row level security;

-- No policies as this is a private table that the user must not have access to.

/** 
 * PRODUCTS
 */
create table products (
  id text primary key,
  -- Whether the product is currently available for purchase.
  active boolean,
  -- The product's name, meant to be displayable to the customer. Whenever this product is sold via a subscription, name will show up on associated invoice line item descriptions.
  name text,
  -- The product's description, meant to be displayable to the customer. Use this field to optionally store a long form explanation of the product being sold for your own rendering purposes.
  description text,
  image text,
  -- Set of key-value pairs, used to store additional information about the object in a structured format.
  metadata jsonb
);

alter table
  products enable row level security;

create policy "Allow public read-only access." on products for
select
  using (true);

/**
 * PRICES
 */
create type pricing_type as enum ('one_time', 'recurring');

create type pricing_plan_interval as enum ('day', 'week', 'month', 'year');

create table prices (
  id text primary key,
  -- The ID of the prduct that this price belongs to.
  product_id text references products,
  -- Whether the price can be used for new purchases.
  active boolean,
  -- A brief description of the price.
  description text,
  -- The unit amount as a positive integer in the smallest currency unit (e.g., 100 cents for US$1.00 or 100 for ¥100, a zero-decimal currency).
  unit_amount bigint,
  -- Three-letter ISO currency code, in lowercase.
  currency text check (char_length(currency) = 3),
  -- One of `one_time` or `recurring` depending on whether the price is for a one-time purchase or a recurring (subscription) purchase.
  type pricing_type,
  -- The frequency at which a subscription is billed. One of `day`, `week`, `month` or `year`.
  interval pricing_plan_interval,
  -- The number of intervals (specified in the `interval` attribute) between subscription billings. For example, `interval=month` and `interval_count=3` bills every 3 months.
  interval_count integer,
  trial_period_days integer,
  -- Set of key-value pairs, used to store additional information about the object in a structured format.
  metadata jsonb
);

alter table
  prices enable row level security;

create policy "Allow public read-only access." on prices for
select
  using (true);

/**
 * SUBSCRIPTIONS
 */
create type subscription_status as enum (
  'trialing',
  'active',
  'canceled',
  'incomplete',
  'incomplete_expired',
  'past_due',
  'unpaid',
  'paused'
);

create table subscriptions (
  id text primary key,
  user_id uuid references auth.users not null,
  -- The status of the subscription object, one of subscription_status type above.
  status subscription_status,
  -- Set of key-value pairs, used to store additional information about the object in a structured format.
  metadata jsonb,
  -- ID of the price that created this subscription.
  price_id text references prices,
  -- Quantity multiplied by the unit amount of the price creates the amount of the subscription. Can be used to charge multiple seats.
  quantity integer,
  -- If true the subscription has been canceled by the user and will be deleted at the end of the billing period.
  cancel_at_period_end boolean,
  -- Time at which the subscription was created.
  created timestamp with time zone default timezone('utc' :: text, now()) not null,
  -- Start of the current period that the subscription has been invoiced for.
  current_period_start timestamp with time zone default timezone('utc' :: text, now()) not null,
  -- End of the current period that the subscription has been invoiced for. At the end of this period, a new invoice will be created.
  current_period_end timestamp with time zone default timezone('utc' :: text, now()) not null,
  -- If the subscription has ended, the timestamp of the date the subscription ended.
  ended_at timestamp with time zone default timezone('utc' :: text, now()),
  -- A date in the future at which the subscription will automatically get canceled.
  cancel_at timestamp with time zone default timezone('utc' :: text, now()),
  -- If the subscription has been canceled, the date of that cancellation. If the subscription was canceled with `cancel_at_period_end`, `canceled_at` will still reflect the date of the initial cancellation request, not the end of the subscription period when the subscription is automatically moved to a canceled state.
  canceled_at timestamp with time zone default timezone('utc' :: text, now()),
  -- If the subscription has a trial, the beginning of that trial.
  trial_start timestamp with time zone default timezone('utc' :: text, now()),
  -- If the subscription has a trial, the end of that trial.
  trial_end timestamp with time zone default timezone('utc' :: text, now())
);

alter table
  subscriptions enable row level security;

create policy "Can only view own subs data." on subscriptions for
select
  using (auth.uid() = user_id);

/**
 * REALTIME SUBSCRIPTIONS
 * Only allow realtime listening on public tables.
 */
drop publication if exists supabase_realtime;

create publication supabase_realtime for table products,
prices;

create table newsletter (
  id uuid default uuid_generate_v4() primary key,
  email text unique not null,
  subscribed_at timestamp with time zone default current_timestamp
);

create table contact (
  id uuid default uuid_generate_v4() primary key,
  firstName text,
  lastName text,
  email text unique not null,
  message text,
  created_at timestamp with time zone default current_timestamp
);

-- Create the messages table
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  role VARCHAR(10) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the function to delete old messages
CREATE
OR REPLACE FUNCTION delete_old_messages() RETURNS VOID AS $ $ BEGIN
DELETE FROM
  messages
WHERE
  created_at < NOW() - INTERVAL '3 days';

END;

$ $ LANGUAGE plpgsql;

-- Ensure the pg_cron extension is enabled
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Schedule the function to run daily at midnight
SELECT
  cron.schedule(
    'daily_message_cleanup',
    '0 0 * * *',
    'CALL delete_old_messages()'
  );

-- Create the bookmarks table
CREATE TABLE bookmarks (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES users(id) NOT NULL,
  model_info text NOT NULL,
  model_title text NOT NULL,
  model_image text NOT NULL,
  model_description text NOT NULL,
  saved_at timestamp with time zone DEFAULT now()
);

-- Enable row-level security on the bookmarks table
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own bookmarks
CREATE POLICY "Can view own bookmarks" ON bookmarks
FOR SELECT
USING (auth.uid() = user_id);

-- Policy: Users can insert their own bookmarks
CREATE POLICY "Can insert own bookmarks" ON bookmarks
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own bookmarks
CREATE POLICY "Can update own bookmarks" ON bookmarks
FOR UPDATE
USING (auth.uid() = user_id);

-- Policy: Users can delete their own bookmarks
CREATE POLICY "Can delete own bookmarks" ON bookmarks
FOR DELETE
USING (auth.uid() = user_id);

CREATE TABLE temporary_redemptions (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE,
    code VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    redeemed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security
ALTER TABLE temporary_redemptions ENABLE ROW LEVEL SECURITY;

-- Create policy for inserting records
CREATE POLICY "Allow insert for authenticated users"
    ON temporary_redemptions
    FOR INSERT
    USING (auth.uid() IS NOT NULL);

-- Create policy for selecting records
CREATE POLICY "Allow select for authenticated users"
    ON temporary_redemptions
    FOR SELECT
    USING (user_id = auth.uid());

-- Optional: Create policy for updating records
CREATE POLICY "Allow update for record owner"
    ON temporary_redemptions
    FOR UPDATE
    USING (user_id = auth.uid());
