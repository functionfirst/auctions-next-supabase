class AuctionAPIService {
  constructor (supabase) {
    this.supabase = supabase
    this.collection = supabase.from('auctions')
  }

  discover () {
    return this.collection.select('id, name, slug').limit(10)
  }

  findAll () {
    return this.collection
      .select('id, slug')
  }

  findById (auction_id) {
    return this.supabase.rpc('auction_by_id', { auction_id })
  }
}

export default AuctionAPIService
