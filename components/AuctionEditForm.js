import { useEffect } from 'react'
import Link from 'next/link'
import BaseLabel from '@/components/BaseLabel'
import BaseToggle from '@/components/BaseToggle'
import BaseInput from '@/components/BaseInput'
import BaseText from '@/components/BaseText'
import LoadingButton from '@/components/LoadingButton'
import { useAuction } from '@/contexts/AuctionContext'

function AuctionEditForm ({ className }) {
  const { auction, saving, fetchAuction, setAuction, saveAuction } = useAuction()

  useEffect(() => {
    fetchAuction()
  }, [fetchAuction])

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target

    setAuction(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }))
    setDirtyAuction(setData)
  }

  async function submit(e) {
    e.preventDefault()
    await saveAuction()
  }

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
          attributes={{
            id: 'name',
            name: 'name',
            value: auction.name,
            onChange: handleChange,
            required: true
          }}
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

        <BaseText
          attributes={{
            id: 'description',
            name: 'description',
            rows: 6,
            value: auction.description,
            onChange: handleChange
          }}
        />
      </div>

      <div className="flex gap-6 m-4">
        <div className="w-54">
          <BaseLabel htmlFor="start_date">
            Start Date
          </BaseLabel>

          <BaseInput
            attributes={{
              id: 'start_date',
              name: 'start_date',
              value: auction.start_date,
              onChange: handleChange,
              type: 'datetime-local'
            }}
          />
        </div>

        <div className="w-54">
          <BaseLabel htmlFor="end_date">
            End Date
          </BaseLabel>

          <BaseInput
            attributes={{
              id: 'end_date',
              name: 'end_date',
              value: auction.end_date,
              onChange: handleChange,
              type: 'datetime-local'
            }}
          />
        </div>
      </div>

      <div className="w-48 m-4">
        <BaseLabel htmlFor="start_amount">
          Start Amount (£)
        </BaseLabel>

        <BaseInput
          attributes={{
            id: 'start_amount',
            name: 'start_amount',
            value: auction.start_amount,
            onChange: handleChange,
            min: 0,
            type: 'number',
            required: true
          }}
        />
      </div>

      <div className="flex gap-6 m-4">
        <div className="w-48">
          <BaseLabel htmlFor="estimate_min">
            Estimate Min (£)
          </BaseLabel>

          <BaseInput
            attributes={{
              id: 'estimate_min',
              name: 'estimate_min',
              value: auction.estimate_min,
              onChange: handleChange,
              min: 0,
              type: 'number',
              required: true
            }}
          />
        </div>

        <div className="w-48">
          <BaseLabel htmlFor="estimate_max">
            Estimate Max (£)
          </BaseLabel>

          <BaseInput
            attributes={{
              id: 'estimate_max',
              name: 'estimate_max',
              value: auction.estimate_max,
              onChange: handleChange,
              min: 0,
              type: 'number',
              required: true
            }}
          />
        </div>
      </div>

      <div className="m-4">
        <BaseToggle
          attributes={{
            id: 'enabled',
            name: 'enabled',
            checked: auction.enabled,
            onChange: handleChange
          }}
        >
          Allow users to find this auction
        </BaseToggle>
      </div>

      <div className="m-4">
        <BaseToggle
          attributes={{
            id: 'featured',
            name: 'featured',
            checked: auction.featured,
            onChange: handleChange
          }}
        >
          Display as a featured auction
        </BaseToggle>
      </div>

      <div className="flex items-center justify-end mt-6 bg-gray-50 border-t p-6">
        <LoadingButton
          saving={saving}
          loadingText="Saving changes.."
        >
          Update Auction
        </LoadingButton>
      </div>
    </form>
  )
}

export default AuctionEditForm
