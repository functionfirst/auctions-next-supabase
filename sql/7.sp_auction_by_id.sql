create or replace function auction_by_id(auction_id bigint)
returns record
language plpgsql
as $$
declare
  result record;
begin
  select
    auctions.*,
    bids.amount as highest_bid,
    count(b.amount) as total_bids
  from auctions
  left join bids on auctions.id = bids.auction_id
  left join bids as b on auctions.id = b.auction_id
  into result
  where auctions.id = $1
  group by auctions.id, bids.amount
  order by bids.amount desc
  limit 1;

  if found then
    return result;
  else
    raise exception 'The auction was not found';
  end if;
end;
$$;
