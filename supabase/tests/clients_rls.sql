-- Teste manual de RLS para tabela public.clients.
-- Execute com supabase db test ou psql em ambiente de desenvolvimento.

begin;

-- Arrange: dois usuarios ficticios
select set_config('request.jwt.claim.sub', '11111111-1111-1111-1111-111111111111', true);
insert into public.clients (name, phone, created_by)
values ('Cliente Dona', '(11) 90000-0001', '11111111-1111-1111-1111-111111111111');

select set_config('request.jwt.claim.sub', '22222222-2222-2222-2222-222222222222', true);
insert into public.clients (name, phone, created_by)
values ('Cliente Invasor', '(11) 90000-0002', '22222222-2222-2222-2222-222222222222');

-- Assert: usuario 1 so enxerga sua propria linha
select set_config('request.jwt.claim.sub', '11111111-1111-1111-1111-111111111111', true);
select id, name, phone, created_by from public.clients;

-- Assert: update cruzado deve falhar por policy
update public.clients
set name = 'Tentativa Invalida'
where created_by = '22222222-2222-2222-2222-222222222222';

rollback;
