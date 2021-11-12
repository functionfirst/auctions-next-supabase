import { useEffect, useState } from 'react'
import { supabase } from '@/lib/initSupabase'
import parseISO from 'date-fns/parseISO'
import toDate from 'date-fns/toDate'
import isAfter from 'date-fns/isAfter'
import AuctionBidForm from '@/components/AuctionBidForm'
import AuctionCurrentBid from '@/components/AuctionCurrentBid'
import AuctionCountdown from '@/components/AuctionCountdown'
import AuctionEstimate from '@/components/AuctionEstimate'
import AuctionGallery from '@/components/AuctionGallery'
import AuctionSignin from '@/components/AuctionSignin'
import AuctionWatch from '@/components/AuctionWatch'
import BidAPIService from '@/services/BidAPIService'

const bidAPIService = new BidAPIService(supabase)

function Auction ({
  auction
}) {
  const minBid = auction.bids.length ? auction.bids[0].value : auction.startAmount
  const now = toDate(new Date())
  const end = parseISO(auction.endDate)
  const hasEnded = isAfter(now, end)
  const [minimumBid, setMinimumBid] = useState(minBid)

  useEffect(() => {
    const removeSubscription = bidAPIService.subscribeToAuctionBids(auction.id, setMinimumBid)
    return removeSubscription
  }, [])

  return (
    <>
      <div className="max-w-6xl mx-auto md:my-12 p-6">
        <div className="grid md:grid-cols-2 auto-rows-min gap-16">
          <AuctionGallery images={[]} />

          <div className="grid auto-rows-min grid-cols-2 gap-6">
            <h1 className="text-2xl font-semibold text-gray-700 col-span-2">
              {auction.name}
            </h1>

            <hr className="border-t border-gray-200 col-span-2" />

            <AuctionCurrentBid
              bids={auction.bids}
              minimumBid={minimumBid}
            />

            <AuctionEstimate
              estimateMin={auction.estimateMin}
              estimateMax={auction.estimateMax}
            />

            <AuctionCountdown
              hasEnded={hasEnded}
              startDate={auction.startDate}
              endDate={auction.endDate}
            />

            <AuctionSignin className="col-span-2" />

            <AuctionBidForm
              auctionId={auction.id}
              hasEnded={hasEnded}
              minimumBid={minimumBid}
              className="col-span-2"
            />

            <AuctionWatch auctionId={auction.id} />
          </div>
        </div>
      </div>

      <div className="bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid gap-12 grid-cols-3">
          <div className="col-span-2">
            <h2 className="text-lg font-semibold border-b border-gray-300 py-2">
              Details
            </h2>

            <div className="py-4">
              <p className="leading-7 text-gray-600">
                {auction.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


export default Auction
