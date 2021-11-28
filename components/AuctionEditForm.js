import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import BaseLabel from '@/components/BaseLabel'
import BaseToggle from '@/components/BaseToggle'
import BaseInput from '@/components/BaseInput'
import BaseTextarea from '@/components/BaseTextarea'
import LoadingButton from '@/components/LoadingButton'
import { useAuction } from '@/contexts/AuctionContext'

function AuctionEditForm ({ className }) {
  const { auction, saving, fetchAuction, setAuction, saveAuction } = useAuction()
  const [dirtyAuction, setDirtyAuction] = useState({})

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target

    const setData = prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    })

    setAuction(setData)
    setDirtyAuction(setData)
  }

  const isFormDirty = Boolean(Object.values(dirtyAuction).length)

  async function submit(e) {
    e.preventDefault()

    if (isFormDirty) {
      await saveAuction(dirtyAuction)
      setDirtyAuction({})
    }
  }

  const fetchData = useCallback(() => {
    fetchAuction()
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <form
      onSubmit={submit}
      className={className}
    >
      <div className="m-6">
        <BaseLabel htmlFor="name">
          Name
        </BaseLabel>

        <BaseInput
          value={auction.name}
          onChange={handleChange}
          id="name"
          name="name"
          required
        />

        <p className="text-sm mt-1">
          Auction url:
          {' '}
          <Link href={`/auctions/${auction.id}/${auction.slug}`}>
            <a className="text-indigo-600 hover:text-indigo-800" target="_blank">
              /auctions/{auction.id}/{auction.slug}
            </a>
          </Link>
        </p>
      </div>

      <div className="m-6">
        <BaseLabel htmlFor="description">
          Description
        </BaseLabel>

        <BaseTextarea
          value={auction.description}
          onChange={handleChange}
          id="description"
          name="description"
          rows="10"
        />
      </div>

      <div className="flex gap-6 m-4">
        <div className="w-54">
          <BaseLabel htmlFor="start_date">
            Start Date
          </BaseLabel>

          <BaseInput
            id="start_date"
            name="start_date"
            value={auction.start_date}
            onChange={handleChange}
            type="datetime-local"
          />
        </div>

        <div className="w-54">
          <BaseLabel htmlFor="end_date">
            End Date
          </BaseLabel>

          <BaseInput
            id="end_date"
            name="end_date"
            value={auction.end_date}
            onChange={handleChange}
            type="datetime-local"
          />
        </div>
      </div>

      <div className="w-48 m-4">
        <BaseLabel htmlFor="start_amount">
          Start Amount (£)
        </BaseLabel>

        <BaseInput
          id="start_amount"
          name="start_amount"
          value={auction.start_amount}
          onChange={handleChange}
          min="0"
          type="number"
          required
        />
      </div>

      <div className="flex gap-6 m-4">
        <div className="w-48">
          <BaseLabel htmlFor="estimate_min">
            Estimate Min (£)
          </BaseLabel>

          <BaseInput
            id="estimate_min"
            name="estimate_min"
            value={auction.estimate_min}
            onChange={handleChange}
            min="0"
            type="number"
            required
          />
        </div>

        <div className="w-48">
          <BaseLabel htmlFor="estimate_max">
            Estimate Max (£)
          </BaseLabel>

          <BaseInput
            id="estimate_max"
            name="estimate_max"
            value={auction.estimate_max}
            onChange={handleChange}
            min="0"
            type="number'"
            required
          />
        </div>
      </div>

      <div className="m-4">
        <BaseToggle
          id="enabled"
          name="enabled"
          label="Allow users to find this auction"
          checked={auction.enabled}
          onChange={handleChange}
        />
      </div>

      <div className="m-4">
        <BaseToggle
          id="featured"
          name="featured"
          label="Display as a featured auction"
          checked={auction.featured}
          onChange={handleChange}
        />
       
      </div>

      <div className="flex items-center justify-end mt-6 bg-gray-50 border-t p-6">
        <LoadingButton
          loading={saving}
          loadingText="Saving changes.."
          disabled={!isFormDirty}
        >
          Update Auction
        </LoadingButton>
      </div>
    </form>
  )
}

export default AuctionEditForm
