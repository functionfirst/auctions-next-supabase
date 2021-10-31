import Layout from '../components/Layout'
import { supabase } from '../lib/initSupabase'
import AuctionList from '../components/AuctionList'

function Discover() {
  return (
    <Layout>
      <h1 className="font-semibold text-2xl mb-4">
        Discover
      </h1>

      <AuctionList supabaseClient={supabase} />
    </Layout>
  )
}

export default Discover