import { useState } from 'react'
import { supabase } from '@/lib/initSupabase'
import { formatCurrency } from '@/lib/filters'
import BaseLabel from '@/components/BaseLabel'
import BaseInput from '@/components/BaseInput'
import BidAPIService from '@/services/BidAPIService'
import { useUser } from '@/contexts/UserContext'

const bidAPIService = new BidAPIService(supabase)

function AuctionBidForm ({
  auctionId,
  className,
  hasEnded,
  highestBid,
  startAmount
}) {
  const { user } = useUser()
  const [error, setError] = useState(null)
  const [amount, setAmount] = useState('')
  const [saving, setSaving] = useState(false)
  const snackbar = error ? <p className="text-red-600 mt-2" role="alert">{error}</p> : null
  const minimumBid = highestBid ? highestBid + 1 : startAmount

  if (!user || hasEnded) {
    return null
  }

  async function submit (e) {
    e.preventDefault()

    setError(null)
    setSaving(true)

    const payload = {
      auction_id: auctionId,
      user_id: user.id,
      amount
    }

    const { error: err } = await bidAPIService.addBid(payload)

    if (err) {
      setError(err.message)
    } else {
      // @todo add a confirmation snackbar
      setAmount('')
    }

    setSaving(false)
  }

  return (
    <form
      className={`${className} bg-gray-100 p-4 rounded-sm`}
      onSubmit={submit}
    >
      <BaseLabel htmlFor="amount">
        Enter a bid amount
      </BaseLabel>

      <div className="flex items-stretch relative gap-2">
        <label
          htmlFor="amount"
          className="cursor-pointer flex items-center px-4 absolute left-0 inset-y-0"
        >
          £
        </label>

        <BaseInput
          attributes={{
            id: 'amount',
            value: amount,
            name: 'amount',
            min: minimumBid,
            onChange: (e) => { setAmount(e.target.value) },
            placeholder: `Minimum bid amount ${formatCurrency(minimumBid)}`,
            type: 'number',
            required: true
          }}
          className="rounded pl-9"
        />

        <button className="px-6 py-2 rounded-sm shadow-md text-sm whitespace-nowrap bg-indigo-600 text-white hover:bg-indigo-700">
          Place a Bid
        </button>
      </div>

      {snackbar}
    </form>
  )
}

export default AuctionBidForm
