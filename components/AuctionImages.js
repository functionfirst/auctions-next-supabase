import useAuctionImages from '@/hooks/useAuctionImages'
import Image from 'next/image'

function AuctionImages ({ auctionId }) {
  const { error, images } = useAuctionImages(auctionId)

  if (error) {
    return (
      <p className="text-red-600 text-sm">
        There was an error trying to load your auction images.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-5 gap-2">
      {
        images.map(
          (src) => (
            <Image
              src={src}
              alt=""
              key="src"
              width="64"
              height="64"
              layout="responsive"
            />
          )
        )
      }
    </div>
  )
}

export default AuctionImages
