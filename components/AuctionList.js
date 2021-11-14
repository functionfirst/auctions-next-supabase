import AuctionCard from '../components/AuctionCard'

function AuctionList({ auctions }) {
  return (
    <div className="grid gap-4">
      {
        auctions.map(auction => (
          <AuctionCard
            key={auction.id.toString()}
            auction={auction}
            className="w-1/3"
          />
        ))
      }
    </div>
  )
}

export default AuctionList
