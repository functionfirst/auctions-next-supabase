import Image from 'next/image'
import Link from 'next/link'

function AuctionCard({ className, auction }) {
  const image = auction.image ? <Image src={auction.image} alt='' /> :null

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
