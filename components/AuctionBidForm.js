import { useState } from 'react'
import { formatCurrency } from '@/lib/filters'
import BaseLabel from '@/components/BaseLabel'
import BaseInput from '@/components/BaseInput'
import { useUser } from '@/contexts/UserContext'
import { useBid } from '@/contexts/BidContext'
import { IconPlusCircle, IconSpinner } from '@/components/Icon'

function AuctionBidForm ({
  className,
  hasEnded,
  startAmount
}) {
  const { highestBid, saving, submitBid } = useBid()
  const { user } = useUser()
  const [error, setError] = useState(null)
  const [amount, setAmount] = useState('')
  const snackbar = error ? <p className="text-red-600 mt-2" role="alert">{error}</p> : null
  const minimumBid = highestBid ? highestBid + 1 : startAmount

  if (!user || hasEnded) {
    return null
  }

  async function submit (e) {
    e.preventDefault()

    const [_data, submitError] = await submitBid({
      user_id: user.id,
      amount
    })

    if (submitError) {
      setError(submitError.message)
    } else {
      // @todo add a confirmation snackbar
      // success
      setAmount('')
    }
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
            required: true,
            disabled: saving
          }}
          className="rounded pl-9"
        />

        <button
          className="flex items-center gap-2 px-6 py-2 rounded-sm shadow-md text-sm whitespace-nowrap bg-indigo-600 text-white hover:bg-indigo-700"
          disabled={saving}
        >
          { saving ?
            <IconSpinner className="h-6 w-6" /> :
            <IconPlusCircle className="h-6 w-6" />
          }
          Place a Bid
        </button>
      </div>

      {snackbar}
    </form>
  )
}

export default AuctionBidForm
