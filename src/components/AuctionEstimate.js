import { formatCurrency } from '@/lib/filters'

function AuctionEstimate ({ estimateMin, estimateMax }) {
  return (
    <dl>
      <dt>
        Estimate
      </dt>
      <dd className="font-semibold">
        {formatCurrency(estimateMin)} - {formatCurrency(estimateMax)}
      </dd>
    </dl>
  )
}

export default AuctionEstimate
