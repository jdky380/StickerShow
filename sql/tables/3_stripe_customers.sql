-- auto-generated definition
create table stripe_customers
(
    user_id            varchar not null
        primary key,
    stripe_customer_id text
);

comment on table stripe_customers is 'stripe customers';
