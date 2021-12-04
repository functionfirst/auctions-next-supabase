import { useRouter } from 'next/router'
import { useAuction } from '@/contexts/AuctionContext'
import AuctionAddEditForm from '@/components/AuctionAddEditForm'

function AuctionAddForm({ className = '' }) {
  const router = useRouter()
  const { auction, saving, setAuction, createAuction } = useAuction()

  const onAuctionChange = (e) => {
    const { name, value, checked, type } = e.target

    setAuction((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  async function submit(data) {
    await createAuction(data)
    router.push('/my-auctions')
  }

  return (
    <AuctionAddEditForm
      auction={auction}
      className={className}
      onAuctionChange={onAuctionChange}
      saving={saving}
      submit={submit}
    />
  )
}

export default AuctionAddForm
