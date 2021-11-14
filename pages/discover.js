import { useRouter } from 'next/router'
import { supabase } from '@/lib/initSupabase'
import Layout from '../components/Layout'
import Head from 'next/head'
import AuctionList from '../components/AuctionList'
import AuctionAPIService from '@/services/AuctionAPIService'

const auctionAPIService = new AuctionAPIService(supabase)

function Discover ({ auctions }) {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <Layout>
      <Head>
        <title>Discover - Realtime Auctions</title>
      </Head>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h1 className="font-semibold text-2xl mb-4">
          Discover
        </h1>

        <AuctionList auctions={auctions} />
      </div>
    </Layout>
  )
}

export async function getStaticProps () {
  const { error, data: auctions } = await auctionAPIService.discover()

  return {
    props: {
      auctions
    }
  }
}

export default Discover
