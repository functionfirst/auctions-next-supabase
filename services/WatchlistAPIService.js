class WatchlistAPIService {
  constructor (supabase) {
    this.collection = supabase.from('watchlist')
  }

  getWatchById ({ auctionId, uid }) {
    return this.collection
      .select('uid, auctionId')
      .eq('auctionId', auctionId)
      .eq('uid', uid)
  }

  addWatch ({ auctionId, uid }) {
    return this.collection
      .insert({ auctionId, uid })
      .single()
  }

  removeWatch ({ auctionId, uid }) {
    return this.collection
      .delete()
      .eq('auctionId', auctionId)
      .eq('uid', uid)
  }
}

export default WatchlistAPIService
