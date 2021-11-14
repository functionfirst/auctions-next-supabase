class AuctionAPIService {
  constructor (supabase) {
    this.collection = supabase.from('auctions')
  }

  discover () {
    return this.collection.select('id, name, slug').limit(10)
  }

  findAll () {
    return this.collection
      .select('id, slug')
  }

  async findById (id) {
    return this.collection
      .select(this.allowedFields)
      .eq('id', id)
      .order('value', { foreignTable: 'bids', ascending: false })
      .single()
  }
}

export default AuctionAPIService
