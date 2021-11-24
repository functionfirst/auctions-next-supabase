import Image from 'next/image'
import Link from 'next/link'
import { BlurData } from '@/components/BlurImage'

function AuctionCard({ className, auction }) {
  const imageUrl = auction.auction_images.length ? auction.auction_images[0].public_url : null

  return (
    <Link href={`/auctions/${auction.id}/${auction.slug}`}>
      <a
        title={auction.name}
        className={`shadow-sm rounded p-3 border border-gray-100 ${className}`}
      >
        <Image
          src={imageUrl}
          title={auction.name}
          alt={auction.name}
          width="250"
          height="250"
          layout="intrinsic"
          placeholder="blur"
          blurDataURL={BlurData}
          priority
        />

        <h2 className="text-lg font-medium overflow-ellipsis overflow-hidden truncate">
          {auction.name}
        </h2>
      </a>
    </Link>
  )
}

export default AuctionCard
