import { supabase } from '../lib/initSupabase'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import IconHeart from './IconHeart'
import IconHeartFull from './IconHeartFull'
import IconSpinner from './IconSpinner'

const AuctionWatch = () => {
  const collection = supabase.from('watchlist')
  const user = supabase.auth.user()
  const router = useRouter()
  const { id } = router.query
  const [loading, setLoading] = useState(false)
  const [watching, setWatching] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    getWatchlist()
  }, [])

  async function getWatchlist () {
    if (!user) { return }

    const payload = {
      auctionId: id,
      uid: user.id
    }

    const { data } = await collection
      .select('uid, auctionId')
      .eq('auctionId', payload.auctionId)
      .eq('uid', payload.uid)

    if (data) {
      setWatching(true)
    }
  }

  function createWatchlist (payload) {
    return collection.insert(payload).single()
  }

  function deleteWatchlist(payload) {
    return collection.delete().match(payload)
  }

  async function updateWatchListForUser() {
    if (!user) { return }

    const fn = watching ? deleteWatchlist : createWatchlist
    const { error } = await fn(payload)

    if (error) {
      throw new Error(error)
    }

    setWatching(Boolean(!watching))
  }

  async function toggleWatchlist () {
    if (loading) { return }
    setLoading(true)

    try {
      await updateWatchListForUser()
    } catch (error) {
      setError(error)
    }

    setLoading(false)
  }

  let heartIcon = <IconHeart className="w-4 h-4" />
  let heartFullIcon = <IconHeartFull className="w-4 h-4" />

  if (loading) {
    heartIcon = heartFullIcon = <IconSpinner className="w-4 h-4" />
  }

  if (watching) {
    return (
      <button
        type="button"
        className="gap-2 w-48 flex items-center justify-center shadow-sm border border-transparent py-2 px-3 text-xs uppercase rounded-full bg-indigo-600 hover:bg-indigo-800 text-white"
        onClick={() => toggleWatchlist()}
      >
        {heartFullIcon}
        Added to watchlist
      </button>
    )
  }

  return (
    <button
      type="button"
      className="gap-2 w-48 flex items-center justify-center shadow-sm border border-indigo-600 hover:border-indigo-800 py-2 px-3 text-xs uppercase rounded-full text-indigo-600 hover:text-indigo-800 bg-white"
      onClick={() => toggleWatchlist()}
    >
      {heartIcon}
      Add to Watchlist
    </button>
  )
}

export default AuctionWatch
