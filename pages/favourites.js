import { useEffect, useState } from 'react'
import { supabase } from '@/lib/initSupabase'
import Head from 'next/head'
import AuctionList from '../components/AuctionList'
import useSubscribeToWatchlist from '@/hooks/useSubscribeToWatchlist'

function Favourites() {
  const [auctions, setAuctions] = useState([])
  const [loading, setLoading] = useState(true)
  const { watchlist } = useSubscribeToWatchlist({ supabase })

  useEffect(async () => {
    if (watchlist.length === 0) {
      setAuctions([])
      return
    }

    setLoading(true)
    const { data } = await supabase.from('auctions').select('id, name, slug, auction_images(public_url)').in('id', watchlist)
    setAuctions(data)
    setLoading(false)
  }, [watchlist])

  let component = <AuctionList />

  if (loading) {
    component = <div>Loading...</div>
  } else if (auctions.length) {
    component = <AuctionList auctions={auctions} />
  } else {
    component = <p className="text-gray-700">You are not currently watching any Auctions</p>
  }

  return (
    <>
      <Head>
        <title>Favourites - Realtime Auctions</title>
      </Head>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h1 className="font-semibold text-2xl mb-4">
          Favourites
        </h1>

        {component}
      </div>
    </>
  )
}

export default Favourites
