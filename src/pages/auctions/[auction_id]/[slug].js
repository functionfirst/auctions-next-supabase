import { supabase } from '@/lib/initSupabase'
import ErrorPage from 'next/error'
import Head from 'next/head'
import Auction from '@/components/Auction'

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

export async function getServerSideProps({ params, res }) {
  const allowedFields = `
    id,
    name,
    description,
    start_date,
    end_date,
    start_amount,
    featured,
    enabled,
    slug,
    estimate_min,
    estimate_max,
    auction_images(
      id,
      image_url,
      public_url
    )
  `

  const {
    data: auction,
    error,
    status,
  } = await supabase
    .from('auctions')
    .select(allowedFields)
    .eq('id', params.auction_id)
    .single()

  if (error) {
    res.statusCode = status

    return {
      props: {
        error: error.message,
        status,
      },
    }
  }

  return {
    props: {
      auction,
    },
  }
}

export default AuctionDetails
