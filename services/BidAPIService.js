class BidAPIService {
  constructor (supabase) {
    this.supabase = supabase
  }

  addBid (payload) {
    return this.supabase
      .from('bids')
      .insert(payload)
      .single()
  }

  subscribeToAuctionBids(auctionId, fn = () => {}) {
    const subscriber = `bids:auctionId=eq.${auctionId}`

    const subscription = this.supabase
      .from(subscriber)
      .on('INSERT', payload => fn(payload.new.value))
      .subscribe()

    return () => {
      this.supabase.removeSubscription(subscription)
    }
  }
}

export default BidAPIService
