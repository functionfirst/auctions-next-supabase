import { createContext, useContext, useCallback, useEffect, useState } from 'react'

const BidContext = createContext()

export const BidContextProvider = (props) => {
  const { auction_id, supabase } = props
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [totalBids, setTotalBids] = useState(0)
  const [highestBid, setHighestBid] = useState(0)
  const [highestBidder, setHighestBidder] = useState(null)

  const updateBids = (payload) => {
    setHighestBid(payload.new.amount)
    setHighestBidder(payload.new.user_id)
    setTotalBids(prevState => prevState + 1)
  }

  const submitBid = async ({ user_id, amount }) => {
    setSaving(true)

    const { data, error } = await supabase.rpc('create_bid', {
      auction_id,
      user_id,
      amount
    })

    if (error) {
      return [null, error.message]
    }

    setSaving(false)

    return [data]
  }

  const fetchBidCount = useCallback(async () => {
    setLoading(true)

    const { count, error } = await supabase.from('bids').select('id', { count: 'exact', head: true }).eq('auction_id', auction_id)

    if (error) {
      return [null, error.message]
    }



    setTotalBids(count)
    setLoading(false)
    return [count]
  }, [auction_id])

  const fetchHighestBid = useCallback(async () => {
    setLoading(true)

    const { data, error } = await supabase.from('bids').select('amount, user_id').eq('auction_id', auction_id).limit(1).order('amount', { ascending: false })

    if (error) {
      return [null, error.message]
    }

    setLoading(false)

    if (data.length) {
      const [highest] = data
      const { amount, user_id } = highest
      setHighestBid(amount)
      setHighestBidder(user_id)
      return [highest]
    }
  }, [auction_id])

  useEffect(() => {
    fetchBidCount()
  }, [fetchBidCount])

  useEffect(() => {
    fetchHighestBid()
  }, [fetchHighestBid])

  useEffect(() => {
    const collection = `bids:auction_id=eq.${auction_id}`
    const event = 'INSERT'
    const subscription = supabase.from(collection).on(event, updateBids).subscribe()

    return () => {
      supabase.removeSubscription(subscription)
    }
  }, [auction_id])


  const value = {
    highestBid,
    highestBidder,
    loading,
    saving,
    submitBid,
    totalBids
  }

  return (
    <BidContext.Provider value={value} {...props} />
  )
}

export const useBid = () => {
  const context = useContext(BidContext)

  if (context === undefined) {
    throw new Error('useBid must be used within a BidContextProvider')
  }

  return context
}
