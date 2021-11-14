import { formatCurrency } from "@/lib/filters"

function bidText (totalBids) {
  if (totalBids === 1) {
    return '1 bid'
  } else if (totalBids) {
    return `${totalBids} bids`
  }

  return 'No bids'
}

function AuctionCurrentBid ({ highestBid, startAmount, totalBids }) {
  const label = totalBids ? 'Current Bid' : 'Starting Bid'
  const text = bidText(totalBids)

  return (
    <dl>
      <dt className="flex gap-2 items-center">
        {label}

        <span className="inline-block text-sm font-semibold bg-gray-200 rounded-full px-3 py-0.5">
          {text}
        </span>
      </dt>
      <dd className="font-semibold">
        {formatCurrency(highestBid || startAmount)}
      </dd>
    </dl>
  )  
}

export default AuctionCurrentBid
