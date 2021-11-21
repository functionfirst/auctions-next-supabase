import AuctionCard from '../components/AuctionCard'

function AuctionList({ auctions }) {
  return (
    <div className="grid gap-6">
      {
        auctions.map(auction => (
          <AuctionCard
            key={auction.id.toString()}
            auction={auction}
            className="text-center sm:text-left sm:w-1/4"
          />
        ))
      }
    </div>
  )
}

export default AuctionList
