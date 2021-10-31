import { useEffect, useState } from 'react'
import AuctionCard from '../components/AuctionCard'

function AuctionList(props) {
  const [auctions, setAuctions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAuctions()
  }, [])

  async function fetchAuctions () {
    // @todo decide what query makes auctions discoverable
    const { data, error } = await props.supabaseClient.from('auctions').select('id, name, slug, description, startAmount, bids (value)')
    setAuctions(data)
    setLoading(false)
  }

  if (loading) return <p className="text-2xl">Loading...</p>
  if (!auctions.length) return <p className="text-2xl">No Auctions</p>

  return (
    <div className="grid gap-4">
      {
        auctions.map(auction => (
          <AuctionCard
            key={auction.id.toString()}
            auction={auction}
            className="w-1/3"
          />
        ))
      }
    </div>
  )
}

export default AuctionList
