import { createContext, useContext, useCallback, useEffect, useState } from 'react'

const WatchContext = createContext()

export const WatchContextProvider = (props) => {
  const { auction_id, supabase, user_id } = props
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [watching, setWatching] = useState(false)

  async function toggleWatch() {
    setError(null)
    setLoading(true)

    const { data, error: toggleError } = await supabase.rpc('toggle_watchlist', {
      auction_id,
      user_id
    })

    if (toggleError) {
      setError(toggleError.message)
    } else {
      setWatching(data)
    }

    setLoading(false)
  }

  const fetchData = useCallback(async () => {
    if (!user_id) { return }

    setLoading(true)

    const { data, error: fetchError } = await supabase.rpc('watchlist_by_user_id', {
      auction_id,
      user_id
    })

    if (fetchError) {
      setError(fetchError.message)
    } else {
      setWatching(data)
    }

    setLoading(false)
  }, [auction_id, user_id])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const value = {
    error,
    loading,
    watching,
    toggleWatch
  }

  return (
    <WatchContext.Provider value={value} {...props} />
  )
}

export const useWatch = () => {
  const context = useContext(WatchContext)

  if (context === undefined) {
    throw new Error('useWatch must be used within a WatchContextProvider')
  }

  return context
}
