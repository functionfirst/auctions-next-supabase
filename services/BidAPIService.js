class BidAPIService {
  constructor (supabase) {
    this.supabase = supabase
  }

  addBid (payload) {
    return this.supabase.rpc('create_bid', payload)
  }

  subscribeToAuctionBids(auction_id, callback = () => {}) {
    const collection = `bids:auction_id=eq.${auction_id}`
    const event = 'INSERT'
    const subscription = this.supabase
      .from(collection)
      .on(event, callback)
      .subscribe()

    return () => {
      this.supabase.removeSubscription(subscription)
    }
  }
}

export default BidAPIService
