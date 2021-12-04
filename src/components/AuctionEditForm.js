import { useCallback, useEffect } from 'react'
import { useAuction } from '@/contexts/AuctionContext'
import AuctionAddEditForm from '@/components/AuctionAddEditForm'

function AuctionEditForm({ className = '' }) {
  const { auction, saving, fetchAuction, setAuction, updateAuction } =
    useAuction()

  const onAuctionChange = (e) => {
    const { name, value, checked, type } = e.target

    setAuction((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const fetchData = useCallback(() => {
    fetchAuction()
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <AuctionAddEditForm
      auction={auction}
      className={className}
      onAuctionChange={onAuctionChange}
      saving={saving}
      submit={updateAuction}
    />
  )
}

export default AuctionEditForm
