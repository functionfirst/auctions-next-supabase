import { useRouter } from 'next/router'
import { supabase } from '@/lib/initSupabase'
import Head from 'next/head'
import AuctionAPIService from '@/services/AuctionAPIService'
import Auction from '@/components/Auction'

const auctionAPIService = new AuctionAPIService(supabase)

function AuctionDetails({ auction }) {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Head>
        <title>{auction.name} - Realtime Auctions</title>
      </Head>
      <Auction auction={auction} />
    </>
  )
}

const getParams = auction => ({
  params: {
    id: JSON.stringify(auction.id),
    slug: auction.slug
  }
})

export async function getStaticPaths () {
  const { data } = await auctionAPIService.findAll()
  const paths = data.map(getParams)

  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps ({ params }) {
  const { data: auction } = await auctionAPIService.findById(params.id)
  const { data: images } = await supabase.from('auction_images').select('id, image_url').eq('auction_id', params.id)

  auction.images = images

  return {
    props: {
      auction,
      images
    }
  }
}

export default AuctionDetails
