import Layout from '../components/Layout'
import { supabase } from '../lib/initSupabase'
import AuctionList from '../components/AuctionList'
import Head from 'next/head'

function Discover () {
  return (
    <Layout>
      <Head>
        <title>Discover - Realtime Auctions</title>
      </Head>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h1 className="font-semibold text-2xl mb-4">
          Discover
        </h1>

        <AuctionList supabaseClient={supabase} />
      </div>
    </Layout>
  )
}

export default Discover
