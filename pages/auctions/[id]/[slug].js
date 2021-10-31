import { useRouter } from 'next/router'
import { supabase } from '@/lib/initSupabase'
import Layout from '@/components/Layout'
import AuctionWatch from '@/components/AuctionWatch'
import AuctionGallery from '@/components/AuctionGallery'
import AuctionCurrentBid from '@/components/AuctionCurrentBid'
import AuctionCountdown from '@/components/AuctionCountdown'
import AuctionBidForm from '@/components/AuctionBidForm'

function Auction ({ auction }) {
  const countdown = auction.isLive ? <AuctionCountdown end-date={auction.endDate} /> : null

  return (
    <div className="flex flex-col h-full">
      <div className="flex gap-4">
        <div className="flex-1">
          <AuctionGallery images={[]} />
        </div>

        <div className="flex-1">
          <h1 className="text-2xl mb-3 font-semibold text-indigo-900">
            {auction.name}
          </h1>

          <AuctionWatch />

          <div className="flex items-center justify-between">
            <AuctionCurrentBid
              bids={auction.bids}
              minimum-bid={auction.minimumBid}
            />

            {countdown}
          </div>

          <AuctionBidForm minimum-bid={auction.minimumBid} />
        </div>
      </div>
    </div>
  )
}

export default function AuctionDetails({ auction }) {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <Layout>
      <Auction auction={auction} />
    </Layout>
  )
}

const getParams = auction => ({
  params: {
    id: JSON.stringify(auction.id),
    slug: auction.slug
  }
})

export async function getStaticPaths () {
  const { data, error } = await supabase.from('auctions').select('id, slug')
  const paths = data.map(getParams)

  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps ({ params }) {
  const { id } = params

  const { data } = await supabase.from('auctions')
    .select('id, name, description, startAmount, bids (value)')
    .eq('id', id)
    .single()

  return {
    props: {
      auction: data
    }
  }
}
