create type subscription_status as enum ('trialing', 'active', 'canceled', 'incomplete', 'incomplete_expired', 'past_due', 'unpaid', 'paused');
-- auto-generated definition
create table stripe_subscriptions
(
    id                   text                                                          not null
        primary key,
    user_id              varchar,
    status               subscription_status,
    metadata             jsonb,
    price_id             text,
    quantity             integer,
    cancel_at_period_end boolean,
    created              timestamp with time zone default timezone('utc'::text, now()) not null,
    current_period_start timestamp with time zone default timezone('utc'::text, now()) not null,
    current_period_end   timestamp with time zone default timezone('utc'::text, now()) not null,
    ended_at             timestamp with time zone default timezone('utc'::text, now()),
    cancel_at            timestamp with time zone default timezone('utc'::text, now()),
    canceled_at          timestamp with time zone default timezone('utc'::text, now()),
    trial_start          timestamp with time zone default timezone('utc'::text, now()),
    trial_end            timestamp with time zone default timezone('utc'::text, now())
);

comment on table stripe_subscriptions is 'subscriptions';
