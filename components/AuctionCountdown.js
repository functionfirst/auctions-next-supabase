import formatDistance from 'date-fns/formatDistance'
import parseISO from 'date-fns/parseISO'
import toDate from 'date-fns/toDate'
import format from 'date-fns/format'

function AuctionCountdown ({
  endDate,
  hasEnded
}) {
  const now = toDate(new Date())
  const parsedEndDate = parseISO(endDate)
  const formattedEndDate = format(parsedEndDate, "io MMM yyyy 'at' HH:mmaaaa")
  let label, text, title

  if (hasEnded) {
    label = 'Closed'
    text = format(parsedEndDate, 'io MMMM yyyy')
    title = `Auction ended on ${formattedEndDate}`
  } else {
    label = 'Closing'
    title = `Auction ends on ${formattedEndDate}`
    text = formatDistance(now, parsedEndDate)
  }

  return (
    <dl className="flex gap-2">
      <dt>
        {label}:
      </dt>
      <dd className="font-semibold">
        <time title={title} dateTime={parsedEndDate}>
          {text}
        </time>
      </dd>
    </dl>
  )
}

export default AuctionCountdown
