class AuctionAPIService {
  allowedFields = `
    id,
    name,
    slug,
    description,
    endDate,
    startDate,
    estimateMin,
    estimateMax,
    startAmount,
    bids (
      id,
      value,
      uid
    )
  `

  constructor (supabase) {
    this.collection = supabase.from('auctions')
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
