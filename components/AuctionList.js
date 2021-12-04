import AuctionCard from '../components/AuctionCard'

function AuctionList({ auctions }) {
  const cards = auctions.map(
    auction => (
      <AuctionCard
        key={auction.id.toString()}
        auction={auction}
      />
    )
  )

  return (
    <div className="grid gap-6 sm:grid-cols-4">
      {cards}
    </div>
  )
}

export default AuctionList
