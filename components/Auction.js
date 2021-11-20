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
import { BidContextProvider } from '@/contexts/BidContext'

function Auction ({
  auction
}) {
  const now = toDate(new Date())
  const end = parseISO(auction.end_date)
  const hasEnded = isAfter(now, end)

  return (
    <BidContextProvider supabase={supabase} auction_id={auction.id}>
      <div className="max-w-6xl mx-auto md:my-12 p-6">
        <div className="grid md:grid-cols-2 auto-rows-min gap-16">
          <AuctionGallery images={auction.auction_images} />

          <div className="grid auto-rows-min grid-cols-2 gap-6">
            <h1 className="text-2xl font-semibold text-gray-700 col-span-2">
              {auction.name}
            </h1>

            <hr className="border-t border-gray-200 col-span-2" />

            <AuctionCurrentBid startAmount={auction.start_amount} />

            <AuctionEstimate
              estimateMin={auction.estimate_min}
              estimateMax={auction.estimate_max}
            />

            <AuctionCountdown
              hasEnded={hasEnded}
              startDate={auction.start_date}
              endDate={auction.end_date}
            />

            <AuctionSignin className="col-span-2" />

            <AuctionBidForm
              hasEnded={hasEnded}
              startAmount={auction.start_amount}
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
    </BidContextProvider>
  )
}

export default Auction
