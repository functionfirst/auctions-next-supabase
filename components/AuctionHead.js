import Head from 'next/head'
import { useAuction } from '@/contexts/AuctionContext'

function AuctionHead() {
  const { auction } = useAuction()

  return (
    <Head>
      <title>{auction.name || 'Create an Auction'} - Realtime Auctions</title>
    </Head>
  )
}

export default AuctionHead
