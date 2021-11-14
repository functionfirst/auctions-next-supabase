import WatchlistAPIService from '@/services/WatchlistAPIService'
import { supabase } from '../lib/initSupabase'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import IconHeart from './IconHeart'
import IconHeartFull from './IconHeartFull'
import IconSpinner from './IconSpinner'

const watchlistAPIService = new WatchlistAPIService(supabase)

const AuctionWatch = ({ className }) => {
  const user = supabase.auth.user()

  if (!user) {
    return null
  }

  const router = useRouter()
  const { id } = router.query
  const [loading, setLoading] = useState(false)
  const [watching, setWatching] = useState(false)
  const [error, setError] = useState(null)
  const payload = { auction_id: id, user_id: user.id }

  useEffect(() => {
    getWatchlist()
  }, [])

  async function getWatchlist () {
    const { data } = await watchlistAPIService.getWatchById(payload)

    if (data) {
      setWatching(true)
    }
  }

  async function toggleWatchlist() {
    setError(null)
    setLoading(true)

    const action = watching ? 'removeWatch' : 'addWatch'
    const { error: err } = await watchlistAPIService[action](payload)

    if (err) {
      setError(err.message)
    } else {
      setWatching(Boolean(!watching))
    }

    setLoading(false)
  }

  let classes = ['flex gap-2 items-center justify-center shadow-sm border py-1.5 px-3 text-sm rounded-sm shadow-sm', className]
  let icon, text

  if (watching) {
    classes.push('border-transparent bg-indigo-600 text-white hover:bg-indigo-800')
    icon = <IconHeartFull className="w-4 h-4" />
    text = 'Added to Watchlist'
  } else {
    classes.push('border-indigo-600 bg-white text-indigo-600 hover:text-indigo-900 hover:border-indigo-900')
    icon = <IconHeart className="w-4 h-4" />
    text = 'Add to Watchlist'
  }

  if (loading) {
    icon = <IconSpinner className="w-4 h-4" />
  }

  return (
    <button
      type="button"
      disabled={loading}
      className={classes.join(' ')}
      onClick={toggleWatchlist}
    >
      {icon}
      {text}
    </button>
  )
}

export default AuctionWatch
