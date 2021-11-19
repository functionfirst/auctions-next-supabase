import { useEffect, useState } from 'react'
import { supabase } from '@/lib/initSupabase'
import Image from 'next/image'
import Link from 'next/link'

function AuctionCard({ className, auction }) {
  const [image, setImage] = useState('')

  useEffect(() => {
    const fetchImage = () => {
      if (auction.auction_images.length) {
        const imageUrl = auction.auction_images[0].image_url
        const { publicURL, error} = supabase.storage.from('auction-images').getPublicUrl(imageUrl)
  
        if (error) {
          throw error
        }
  
        setImage(<Image src={publicURL} alt='' width="250" height="250" layout="intrinsic" />)
      }
    }

    fetchImage()
  }, [auction.auction_images])

  return (
    <Link href={`/auctions/${auction.id}/${auction.slug}`}>
      <a
        title={auction.name}
        className={`shadow-sm rounded p-3 border border-gray-100 ${className}`}
      >
        {image}

        <h3 className="text-lg font-medium overflow-ellipsis overflow-hidden truncate">
          {auction.name}
        </h3>
      </a>
    </Link>
  )
}

export default AuctionCard
