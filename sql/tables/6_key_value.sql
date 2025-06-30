-- auto-generated definition
create table key_value
(
    key   varchar not null
        constraint key_value_pk
            primary key,
    value varchar
);

comment on column key_value.key is 'key';

comment on column key_value.value is 'value';
