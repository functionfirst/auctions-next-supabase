create or replace function toggle_watchlist(auction_id bigint, user_id uuid)
returns boolean
language plpgsql
as $$
declare
  record integer;
begin
  with a as (
    delete
    from watchlist
    where watchlist.auction_id = $1
    and watchlist.user_id = $2
    returning 1
  )
  select count(*) into record from a;

  if record >= 1 then
    return false;
  else
    insert into watchlist (auction_id, user_id)
    values ($1, $2);
    return true;
  end if;
end;
$$;
