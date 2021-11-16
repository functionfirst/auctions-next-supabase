import { supabase } from '@/lib/initSupabase'
import ErrorPage from 'next/error'
import Head from 'next/head'
import AuctionAPIService from '@/services/AuctionAPIService'
import Auction from '@/components/Auction'

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
  const { data: auction, error, status } = await auctionAPIService.findById(params.id)

  if (error) {
    res.statusCode = status

    return {
      props: {
        error: error.message,
        status
      }
    }
  }

  return {
    props: {
      auction
    }
  }
}

export default AuctionDetails
