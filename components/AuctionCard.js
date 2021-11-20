import Image from 'next/image'
import Link from 'next/link'

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
        />

        <h3 className="text-lg font-medium overflow-ellipsis overflow-hidden truncate">
          {auction.name}
        </h3>
      </a>
    </Link>
  )
}

export default AuctionCard
