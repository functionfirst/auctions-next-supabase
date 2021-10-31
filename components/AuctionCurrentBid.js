import { formatCurrency } from '@/lib/filters'

function AuctionCurrentBid ({ bids = [], minimumBid = 0 }) {
  const hasBids = bids.length
  const minimumBidFormatted = minimumBid && formatCurrency(minimumBid)
  const bidText = hasBids ? 'Current Bid' : 'Starting Bid'
  const bidCount = bids.length ? <div>{bids.length} Bids</div> : null

  if (minimumBidFormatted) {
    return (
      <div>
        <h3>
          <span className="block text-gray-600 text-sm uppercase">
            {bidText}
          </span>

          <span className="block text-indigo-900 font-semibold text-2xl">
            {minimumBidFormatted}
          </span>
        </h3>

        {bidCount}
      </div>
    )  
  }

  return null
}

export default AuctionCurrentBid
