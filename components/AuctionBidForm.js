import { formatCurrency } from '@/lib/filters'
import { useState } from 'react'
import BaseLabel from '@/components/BaseLabel'

// @todo replace this with auction specific increments
const increments = [1, 5, 10, 20, 50, 100, 125, 175, 200, 250, 300, 350, 400, 450, 500, 600, 700, 800, 900, 1000]

function ConfirmPanel ({ bidAmount, setConfirm }) {
  const confirmBid = async event => {
    event.preventDefault()
    console.log('confirm my bid')
  }

  return (
    <form onSubmit={confirmBid}>
      <div className="my-4">
        <BaseLabel>
          You are about to place a bid for:
        </BaseLabel>

        <span class="text-2xl font-bold mb-4">
          {formatCurrency(bidAmount)}
        </span>

        <input type="hidden" name="formInput" value={bidAmount} />

        <div class="flex flex-col gap-2 items-center justify-between">
          <button class="w-full bg-indigo-600 hover:bg-indigo-800 rounded py-4 text-white">
            Confirm Bid
          </button>

          <button
            type="button"
            class="w-full bg-gray-100 text-gray-700 hover:bg-gray-300 rounded py-4"
            onClick={() => setConfirm(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  )
}

function BidForm ({ incrementAmount, increments, setConfirm, minimumBidAmount, setIncrementAmount }) {
  return (
    <div className="my-4" key="initialPanel">
      <BaseLabel
        htmlFor="bidIncrement"
        class="mb-2"
      >
        Select a bid increment
      </BaseLabel>

      <div class="flex">
        <select
          id="bidIncrement"
          v-model="incrementAmount"
          class="appearance-none border px-3 py-3 w-full text-lg"
          value={incrementAmount}
          onChange={(event) => setIncrementAmount(event.target.value)}
        >
          {increments.map(increment => (
            <option
              key={increment}
              value={increment}
            >
              + {formatCurrency(increment)}
            </option>
          ))}
          
        </select>

        <button
          type="button"
          class="bg-indigo-600 hover:bg-indigo-800 px-6 py-4 rounded-r shadow-md text-center text-sm text-white whitespace-nowrap"
          onClick={() => setConfirm(true)}
        >
          Place a Bid
        </button>
      </div>

      <p class="my-2 text-xs text-indigo-900 xtext-center">
        You'll be able confirm this bid in the next step
      </p>
    </div>
  )
}


function AuctionBidForm ({ minimumBid = 1 }) {
  const [incrementAmount, setIncrementAmount] = useState(minimumBid) // @todo - replace this with value received via supabase subscription
  const bidAmount = minimumBid + incrementAmount
  const [confirm, setConfirm] = useState(false)
  
  if (confirm) {
    return (
      <ConfirmPanel
        bidAmount={bidAmount}
        setConfirm={setConfirm}
      />
    )
  }

  return (
    <BidForm
      incrementAmount={incrementAmount}
      increments={increments}
      minimumBidAmount={minimumBid}
      setConfirm={setConfirm}
      setIncrementAmount={setIncrementAmount}
    />
  )
}

export default AuctionBidForm
