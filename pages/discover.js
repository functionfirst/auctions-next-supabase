import { supabase } from '@/lib/initSupabase'
import Head from 'next/head'
import AuctionList from '../components/AuctionList'
import AuctionAPIService from '@/services/AuctionAPIService'

const auctionAPIService = new AuctionAPIService(supabase)

function Discover ({ auctions }) {
  return (
    <>
      <Head>
        <title>Discover - Realtime Auctions</title>
      </Head>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h1 className="font-semibold text-2xl mb-4">
          Discover
        </h1>

        <AuctionList auctions={auctions} />
      </div>
    </>
  )
}

export async function getServerSideProps ({
  res
}) {
  const { error, data: auctions, status } = await auctionAPIService.discover()

  if (error) {
    res.statusCode = 400

    return {
      props: {
        error: error.message,
        status
      }
    }
  }

  return {
    props: {
      auctions
    }
  }
}

export default Discover
