import { useRouter } from 'next/router'
import { supabase } from '@/lib/initSupabase'
import Layout from '@/components/Layout'
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
    <Layout>
      <Head>
        <title>{auction.name} - Realtime Auctions</title>
      </Head>
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
  const { data } = await auctionAPIService.findAll()
  const paths = data.map(getParams)

  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps ({ params }) {
  const { data: auction } = await auctionAPIService.findById(params.id)

  return {
    props: {
      auction
    }
  }
}

export default AuctionDetails
