import { useCallback, useEffect, useState } from 'react'
import { useUser } from '@/contexts/UserContext'

function useSubscribeToWatchlist ({ supabase }) {
  const { user_id } = useUser()
  const [watchlist, setWatchlist] = useState([])

  const fetchWatchlist = useCallback(async() => {
    const { data } = await supabase.from('watchlist').select('auction_id')
    const watch = data.map(item => item.auction_id)
    setWatchlist(watch)
  }, [])

  useEffect(() => {
    fetchWatchlist()
  }, [])

  useEffect(() => {
    const collection = `watchlist:user_id=eq.${user_id}`
    const subscription = supabase
      .from(collection)
      .on('INSERT', fetchWatchlist)
      .on('DELETE', fetchWatchlist)
      .subscribe()

    return () => {
      supabase.removeSubscription(subscription)
    }
  }, [user_id])

  return {
    watchlist
  }
}

export default useSubscribeToWatchlist
