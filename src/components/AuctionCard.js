import Card from '@/components/Card'

export default function AuctionCard({ auction }) {
  const imageUrl = auction.auction_images.length ? auction.auction_images[0].public_url : null

  return (
    <Card
      href={`/auctions/${auction.id}/${auction.slug}`}
      title={auction.name}
      className='border'
    >
      <Card.Image
        imageUrl={imageUrl}
        name={auction.name}
      />

      <Card.Title>
        {auction.name}
      </Card.Title>
    </Card>
  )
}
