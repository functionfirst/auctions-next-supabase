class WatchlistAPIService {
  constructor (supabase) {
    this.collection = supabase.from('watchlist')
  }

  getWatchById ({ auction_id, user_id }) {
    return this.collection
      .select('user_id, auction_id')
      .eq('auction_id', auction_id)
      .eq('user_id', user_id)
  }

  addWatch ({ auction_id, user_id }) {
    return this.collection
      .insert({ auction_id, user_id })
      .single()
  }

  removeWatch ({ auction_id, user_id }) {
    return this.collection
      .delete()
      .eq('auction_id', auction_id)
      .eq('user_id', user_id)
  }
}

export default WatchlistAPIService
