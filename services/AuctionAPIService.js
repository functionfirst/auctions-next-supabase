class AuctionAPIService {
  allowedFields = `
    id,
    name,
    description,
    start_date,
    end_date,
    start_amount,
    featured,
    enabled,
    slug,
    estimate_min,
    estimate_max,
    auction_images(
      id,
      image_url
    )
  `

  constructor (supabase) {
    this.supabase = supabase
    this.collection = supabase.from('auctions')
  }

  discover () {
    return this.collection.select('id, name, slug, auction_images(image_url)').limit(10)
  }

  myAuctions (user_id) {
    return this.collection.select('id, name, description').eq('owner_id', user_id)
  }

  findAll () {
    return this.collection.select('id, slug')
  }

  updateAuction(auction_id, user_id, payload) {
    return this.collection.update(payload).eq('id', auction_id).eq('owner_id', user_id)
  }

  findById (auction_id) {
    return this.collection.select(this.allowedFields).eq('id', auction_id).single()
  }
}

export default AuctionAPIService
