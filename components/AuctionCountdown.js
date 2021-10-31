import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const config = {
  compact: true,
  words_connector: ' ',
  two_words_connector: ' ',
  last_word_connector: ' '
}

function AuctionCountdown ({ endDate }) {
  const distanceOfTimeInWords = formatDistanceToNow(endDate)

  return (
    <h3 class="flex flex-col-reverse ml-3 items-end">
      <span class="text-gray-600 text-sm">
        Auction ends
      </span>

      <span class="text-indigo-900 font-medium text-xl">
        {distanceOfTimeInWords}
      </span>
    </h3>
  )
}

export default AuctionCountdown
