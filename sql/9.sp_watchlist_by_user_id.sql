create or replace function watchlist_by_user_id(auction_id bigint, user_id uuid)
returns boolean
language plpgsql
as $$
declare
  record integer;
begin
  select count(*)
  from watchlist
  into record
  where watchlist.auction_id = $1
  and watchlist.user_id = $2;

  if record = 1 then
    return true;
  end if;

  return false;
end;
$$;
