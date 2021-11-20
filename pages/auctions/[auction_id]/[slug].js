import { supabase } from '@/lib/initSupabase'
import ErrorPage from 'next/error'
import Head from 'next/head'
import AuctionAPIService from '@/services/AuctionAPIService'
import Auction from '@/components/Auction'
import { getPublicUrl } from '@/lib/auctionImages'

const auctionAPIService = new AuctionAPIService(supabase)

function AuctionDetails({ auction, error, status }) {
  if (!auction) {
    return <ErrorPage statusCode={status} title={error} />
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

export async function getServerSideProps ({
  params,
  res
}) {
  const { data: auction, error, status } = await auctionAPIService.findById(params.auction_id)

  if (error) {
    res.statusCode = status

    return {
      props: {
        error: error.message,
        status
      }
    }
  }

  auction.auction_images = auction.auction_images.map(image => {
    image.public_url = getPublicUrl(image.image_url)
    return image
  })

  return {
    props: {
      auction
    }
  }
}

export default AuctionDetails
