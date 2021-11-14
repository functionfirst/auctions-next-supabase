create or replace function create_bid(auction_id bigint, amount integer, user_id uuid)
returns void
language plpgsql
as $$
declare
  selected_bids bids%rowtype;
  selected_auctions auctions%rowtype;
begin
  <<bid_check>>
  begin
    -- Check if the bid amount is higher than the currently highest bid for this auction
    -- @todo check the user isn't upbidding themselves
    select bids.amount
    from bids
    into selected_bids
    where bids.auction_id = $1 and bids.amount >= $2
    limit 1;

    if found then
      raise exception 'The bid was too low';
      exit bid_check;
    end if;
  end;

  <<amount_check>>
  begin
    -- check if it's higher than or equal to the start amount for the auction itself
    select start_amount
    from auctions
    into selected_auctions
    where auctions.id = $1 and start_amount > $2;

    if found then
      raise exception 'The bid was too low';
      exit amount_check;
    end if;
  end;

  insert into bids (auction_id, amount, user_id)
  values ($1, $2, $3);
end;
$$;
